import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_DISEASES } from './src/data/defaultDiseases';
import { CropType } from './src/types';
import { createAuthRouter } from './server/authRoutes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const parsed = Number(process.argv[portArgIndex + 1]);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 3000;
}

const app = express();
const PORT = getPort();

// Body parser with 30mb limit for high-res camera captures
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use('/api/auth', createAuthRouter());

// Lazy Initialize Gemini Client to avoid warning when API key is not yet set
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Scientific Knowledge Base Prompt Context for North Central Vietnam (concise format for 30+ diseases)
const REGIONAL_KNOWLEDGE_CONTEXT = DEFAULT_DISEASES.map(d => `- [${d.id}] (${d.cropType}) ${d.vietnameseName} (${d.englishName}) | Bộ phận: ${d.affectedPlantParts.join(', ')} | Triệu chứng: ${d.symptoms} | Nguyên nhân: ${d.causes} | Xử lý: ${d.safeManagement}`).join('\n');

// Models to try in order of availability and speed
const CANDIDATE_MODELS = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'];

// Helper to detect 403 / billing / permission errors from Google Cloud Gemini API
function isPermissionOrBillingError(err: any): boolean {
  const msg = (err?.message || String(err || '')).toLowerCase();
  const status = String(err?.status || '').toLowerCase();
  const code = err?.code ?? err?.status;
  return (
    code === 403 ||
    status === 'permission_denied' ||
    msg.includes('permission_denied') ||
    msg.includes('free tier is not available') ||
    msg.includes('billing')
  );
}

// Smart regional knowledge base query for North Central Vietnam
function searchRegionalKnowledge(queryText: string, cropFilter?: string): string {
  const queryLower = (queryText || '').toLowerCase();

  const matches = DEFAULT_DISEASES.filter((d) => {
    return (
      queryLower.includes(d.vietnameseName.toLowerCase()) ||
      queryLower.includes(d.id.toLowerCase()) ||
      queryLower.includes(d.englishName.toLowerCase()) ||
      d.symptoms.toLowerCase().includes(queryLower) ||
      (d.affectedPlantParts && d.affectedPlantParts.some((p) => queryLower.includes(p)))
    );
  });

  const cropFilteredMatches = cropFilter
    ? matches.filter((d) => d.cropType === cropFilter)
    : matches;

  const target = cropFilteredMatches[0] || matches[0];

  if (target) {
    return `[Cơ sở dữ liệu Bệnh học Cây trồng Bắc Trung Bộ - Viện BVTV]:
Về **${target.vietnameseName}** (${target.englishName}) trên ${target.cropType === 'citrus' ? 'Cam chanh' : target.cropType === 'rice' ? 'Lúa nước' : 'Lạc'}:

• **Bộ phận gây hại**: ${target.affectedPlantParts.join(', ')}
• **Triệu chứng nhận biết**: ${target.symptoms}
• **Tác nhân gây bệnh**: ${target.causes}
• **Điều kiện phát sinh tại Bắc Trung Bộ**: ${target.favorableConditions}
• **Biện pháp phòng ngừa**: ${target.preventionMethods}
• **Quản lý an toàn sinh học (IPM)**: ${target.safeManagement}
• **Tài liệu kiểm chứng**: ${target.references} (${target.standardCode})`;
  }

  const cropName =
    cropFilter === 'citrus'
      ? 'cây Cam chanh / cây có múi'
      : cropFilter === 'rice'
      ? 'cây Lúa nước'
      : cropFilter === 'peanut'
      ? 'cây Lạc (Đậu phộng)'
      : 'cây trồng';

  return `[Khuyến cáo Bệnh học Nông nghiệp Vùng Bắc Trung Bộ - Viện BVTV]:
Cảm ơn bạn đã đặt câu hỏi. Đối với ${cropName} trong điều kiện vi khí hậu Bắc Trung Bộ (Nghệ An, Hà Tĩnh, Quảng Bình):
1. **Đặc thù thời tiết**: Vùng chịu ảnh hưởng lớn của gió Tây Nam khô nóng (gió Lào) mùa hè và sương muối, mưa phùn kéo dài mùa đông xuân, độ ẩm >85% tạo điều kiện thuận lợi cho nấm khuẩn lây lan.
2. **Nguyên tắc quản lý dịch hại tổng hợp (IPM)**:
   - Thường xuyên thăm đồng/vườn để phát hiện vết bệnh sớm khi tỷ lệ nhiễm dưới 5%.
   - Vệ sinh đồng ruộng, thu gom tiêu hủy triệt để tàn dư cây bệnh sau thu hoạch.
   - Bón phân cân đối N-P-K, hạn chế bón thừa đạm khi thời tiết âm u sương mù.
   - Ưu tiên sử dụng các chế phẩm sinh học đối kháng (Trichoderma, Bacillus, Booc-đô...).
3. Bạn có thể tra cứu chi tiết từng loại bệnh trong mục **"Thư viện bệnh"** hoặc gửi ảnh chụp mẫu lá/thân để đối chiếu trực tiếp.`;
}

// Helper to resolve image to base64 if it's a local path, external URL, or data URL
async function resolveImageBase64(input: string, fallbackMime: string = 'image/jpeg'): Promise<{ base64: string; mimeType: string }> {
  if (input.startsWith('/images/')) {
    const filePath = path.resolve(__dirname, 'public', input.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      const base64 = fs.readFileSync(filePath).toString('base64');
      return { base64, mimeType: fallbackMime };
    }
  }

  if (input.startsWith('/src/')) {
    const filePath = path.resolve(__dirname, input.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      const base64 = fs.readFileSync(filePath).toString('base64');
      return { base64, mimeType: fallbackMime };
    }
  }

  if (input.startsWith('http://') || input.startsWith('https://')) {
    const res = await fetch(input);
    const contentType = res.headers.get('content-type') || fallbackMime;
    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return { base64, mimeType: contentType };
  }

  // Check data URL
  const match = input.match(/^data:([a-zA-Z0-9/+-]+);base64,/);
  const mimeType = match ? match[1] : fallbackMime;
  const base64 = input.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
  return { base64, mimeType };
}

// 1. Diagnose Plant Image Endpoint (supports main image + up to 2 extra angles + field quiz answers)
app.post('/api/diagnose', async (req, res) => {
  try {
    const {
      imageBase64,
      mimeType = 'image/jpeg',
      cropType = 'citrus',
      plantPart = 'leaf',
      extraImages = [],
      quizAnswers,
    } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Hình ảnh là bắt buộc để tiến hành phân tích.' });
    }

    const mainImage = await resolveImageBase64(imageBase64, mimeType);
    const resolvedExtras: { base64: string; mimeType: string; angleLabel: string }[] = [];
    if (Array.isArray(extraImages)) {
      for (const extra of extraImages.slice(0, 2)) {
        if (extra && typeof extra.imageBase64 === 'string' && extra.imageBase64.trim()) {
          const resolved = await resolveImageBase64(extra.imageBase64, extra.mimeType || 'image/jpeg');
          resolvedExtras.push({
            base64: resolved.base64,
            mimeType: resolved.mimeType,
            angleLabel: typeof extra.angleLabel === 'string' ? extra.angleLabel : 'Góc chụp bổ sung',
          });
        }
      }
    }

    const cropNameVi = cropType === 'citrus' ? 'Cam chanh / Cây có múi' : cropType === 'rice' ? 'Lúa nước' : 'Lạc (Đậu phộng)';
    const partNameVi = plantPart === 'leaf' ? 'Lá' : plantPart === 'stem' ? 'Thân/Cành' : plantPart === 'fruit' ? 'Quả/Củ' : 'Khác';

    const systemInstruction = `
Bạn là chuyên gia chẩn đoán bệnh học thực vật cao cấp thuộc Viện Khoa học Nông nghiệp Bắc Trung Bộ và Viện Bảo vệ Thực vật Việt Nam.
Nhiệm vụ của bạn là kiểm tra, sàng lọc và đánh giá hình ảnh mẫu thực vật do nông dân hoặc nghiên cứu viên cung cấp với tinh thần khoa học nghiêm túc, cẩn trọng, khách quan và có trách nhiệm.

CÁC NGUYÊN TẮC KHOA HỌC TỐI THƯỢNG (BẮT BUỘC):
1. PHÂN BIỆT RÕ RÀNG GIỮA CÂY KHỎE MẠNH VÀ CÂY BỊ BỆNH (TỐI QUAN TRỌNG):
   - NẾU ẢNH LÀ LÁ/CÂY KHỎE MẠNH (phiến lá xanh tươi, màu sắc đồng đều, không có vết đốm nâu, không cháy bìa, không có quầng vàng loang lổ, gân lá bình thường, không xoăn mép):
     -> BẮT BUỘC chẩn đoán là CÂY KHỎE MẠNH:
        + possibleDiagnoses: [{ "diseaseId": "healthy", "diseaseName": "Cây khỏe mạnh (Không phát hiện dấu hiệu bệnh hại)", "evidence": ["Phiến lá xanh tốt, màu sắc lục diệp bình thường", "Không có vết đốm hoại tử, không bị biến dạng mô hay gân lá"], "confidenceLevel": "high" }]
        + severityAssessment: "mild"
        + alternativeCauses: []
        + recommendations: ["Duy trì chế độ tưới tiêu và phân bón cân đối N-P-K", "Tiếp tục thăm vườn định kỳ để bảo vệ các đợt lộc non"]
     -> TUYỆT ĐỐI KHÔNG gán bệnh (như vàng lá gân xanh, loét, đạo ôn...) cho một chiếc lá hoặc cành khỏe mạnh!
2. ĐÁNH GIÁ CHẤT LƯỢNG ẢNH & XỬ LÝ ẢNH MỜ (BLURRY IMAGES):
   - Kiểm tra xem ảnh có bị mờ (blurry), out nét, rung tay, thiếu sáng, cháy sáng, chụp quá xa hay không.
   - NẾU ẢNH BỊ MỜ / OUT NÉT / RUNG TAY (BLURRY):
     + BẮT BUỘC đặt imageQuality: "poor".
     + qualityIssues: ["Ảnh chụp bị mờ nét hoặc rung tay (out-of-focus). Các tế bào mô lá và viền tổn thương bị nhòe, không thể quan sát chi tiết vi thể."]
     + possibleDiagnoses: [{
         "diseaseId": "unclear_due_to_blur",
         "diseaseName": "Chưa đủ bằng chứng chẩn đoán do ảnh bị mờ nét",
         "evidence": ["Độ sắc nét của ảnh không đạt yêu cầu để phân biệt vết đốm nấm, vết loét vi khuẩn hay rệp hại", "Cần mẫu ảnh rõ nét để đối chứng"],
         "confidenceLevel": "insufficient_evidence"
       }]
     + needsMoreImages: true
     + additionalImageInstructions: [
         "Giữ chắc tay cầm máy ở khoảng cách 15-25cm từ mặt lá",
         "Chạm ngón tay vào màn hình đúng vị trí vết bệnh để camera lấy nét tự động trước khi bấm chụp",
         "Chụp dưới ánh sáng ban ngày tự nhiên, tránh bóng râm che khuất"
       ]
     + recommendations: [
         "Vui lòng chụp lại ảnh rõ nét hơn để AI và chuyên gia có thể chẩn đoán chính xác.",
         "Tuyệt đối không vội phun thuốc bảo vệ thực vật khi chưa xác định rõ nguyên nhân bệnh."
       ]
   - Nếu ảnh chỉ hơi mờ nhẹ nhưng vẫn nhận diện được vết bệnh, đặt imageQuality là "fair" và nêu rõ trong qualityIssues.
3. XÁC THỰC CÂY TRỒNG VÀ PHÁT HIỆN LỆCH LOÀI:
   - Xác định xem ảnh có chứa thực vật hay không (isPlantImage). Nếu ảnh không phải thực vật (ví dụ: đồ vật, người, động vật, phong cảnh không rõ cây), đặt isPlantImage = false, selectedCropMatches = false, possibleDiagnoses = [].
   - Kiểm tra xem loài cây trong ảnh có khớp với cây người dùng chọn (${cropNameVi}) hay không:
     1. CAM CHANH / CÂY CÓ MÚI: Cây thân gỗ, lá đơn hình bầu dục dày bóng, cuống lá có cánh dẹp, gân lá phân nhánh mạng lưới; quả có múi vỏ có túi tinh dầu.
     2. LÚA NƯỚC: Cây một lá mầm họ Hòa thảo, lá dạng dải dài hẹp (linear blade), gân lá chạy song song, bông/gié lúa.
     3. LẠC / ĐẬU PHỘNG: Cây thân thảo bò lan hoặc mọc bụi thấp, lá kép lông chim chẵn gồm 4 lá chét tròn đầu mọc đối xứng.
   - CHỈ đặt selectedCropMatches = false và possibleDiagnoses = [] khi ảnh RÕ RÀNG thuộc loài cây khác (ví dụ: chọn Lúa nhưng ảnh là lá Lạc hoặc lá Cam). Với ảnh chụp cận cảnh vết bệnh trên vỏ quả, thân hoặc một góc lá không thấy rõ hình thái toàn lá, hãy tin tưởng loài cây người dùng đã chọn và chẩn đoán dựa trên triệu chứng quan sát được.
4. CHẨN ĐOÁN ĐÚNG BỆNH THỰC TẾ TRÊN ẢNH (KHÔNG ÉP VÀO DANH SÁCH MẪU):
   - Quan sát kỹ hình dạng vết bệnh, màu sắc, viền quầng, lớp phấn/bào tử nấm, đường hầm sâu đục, biến dạng mô hay dấu hiệu thiếu dinh dưỡng trên ảnh.
   - Nếu triệu chứng khớp với một trong ${DEFAULT_DISEASES.length} bệnh/dịch hại trong cơ sở dữ liệu vùng Bắc Trung Bộ bên dưới, hãy dùng đúng mã diseaseId và tên bệnh tương ứng.
   - NẾU triệu chứng trên ảnh là một bệnh hại, sâu hại hoặc rối loạn dinh dưỡng KHÁC ngoài danh sách tham khảo (ví dụ: thiếu đạm/kali/kẽm/magie, cháy nắng, ngộ độc phèn...), TUYỆT ĐỐI KHÔNG gán ép sai bệnh. Hãy chẩn đoán đúng tên bệnh/sâu hại/thiếu chất thực tế đó bằng tiếng Việt chính xác kèm mã diseaseId mô tả phù hợp (ví dụ: nutrient_deficiency_zinc, sunscald).
5. KHÔNG TỰ BỊA ĐẶT PHẦN TRĂM XÁC SUẤT:
   - Tuyệt đối KHÔNG gán con số phần trăm (như 95%, 80%).
   - Mức độ tin cậy (confidenceLevel) CHỈ ĐƯỢC CHỌN TRONG 4 MỨC: "high" (Cao), "medium" (Trung bình), "low" (Thấp), "insufficient_evidence" (Chưa đủ bằng chứng).
6. KHÔNG KHIÊN CƯỠNG CHẨN ĐOÁN (TRANSPARENT UNCERTAINTY):
   - Nếu triệu chứng chưa rõ ràng hoặc tương đồng giữa 2 nguyên nhân (ví dụ đốm nâu vs đạo ôn non, hoặc vàng lá HLB vs thiếu vi lượng kẽm), phải nêu rõ trong alternativeCauses và needsMoreImages = true kèm hướng dẫn chụp bổ sung (additionalImageInstructions).
   - Không được khẳng định các triệu chứng không nhìn thấy trên ảnh.
7. CƠ SỞ DỮ LIỆU THAM KHẢO KHU VỰC BẮC TRUNG BỘ:
   Sử dụng cơ sở dữ liệu bệnh thực vật đã được xác thực sau đây để đối chiếu khi triệu chứng phù hợp:
   ${REGIONAL_KNOWLEDGE_CONTEXT}
8. HƯỚNG DẪN XỬ LÝ RÕ RÀNG, DỄ LÀM CHO NÔNG DÂN (QUAN TRỌNG):
   - Trình bày phần actionPlan thật cụ thể, câu ngắn gọn, dễ hiểu với bà con nông dân:
     + immediateSteps (2-3 bước): Việc cần làm NGAY HÔM NAY (ví dụ: ngắt bỏ lá bệnh cho vào túi kín, tháo/giữ mực nước ruộng mấy cm, ngừng bón đạm ngay...).
     + safeCareAndPrevention (2-3 bước): Chăm sóc phục hồi, điều chỉnh phân bón, biện pháp sinh học/IPM an toàn (Trichoderma, Bacillus, Booc-đô, bẫy dính...).
     + importantWarnings (1-2 ý): Điều tuyệt đối tránh (không phun trộn thuốc khi chưa rõ bệnh, không bón thừa đạm lúc sương mù...) và khi nào cần mang mẫu tới Trạm Bảo vệ Thực vật gần nhất.
   - Đồng thời liệt kê tóm tắt các bước chính vào trường recommendations để tương thích lịch sử khám.
   - Tuyệt đối không tự bịa đặt tên hóa chất độc hại hay nồng độ pha chế tùy tiện.
    `.trim();

    const quizLines: string[] = [];
    if (quizAnswers && typeof quizAnswers === 'object') {
      if (quizAnswers.spreadLevel) quizLines.push(`- Mức độ lây lan ngoài vườn/ruộng: ${quizAnswers.spreadLevel}`);
      if (quizAnswers.recentWeather) quizLines.push(`- Thời tiết gần đây: ${quizAnswers.recentWeather}`);
      if (quizAnswers.extraSymptom) quizLines.push(`- Dấu hiệu nông dân quan sát thêm trực tiếp: ${quizAnswers.extraSymptom}`);
      if (quizAnswers.fertilizerOrWater) quizLines.push(`- Tình trạng phân bón / nước tưới: ${quizAnswers.fertilizerOrWater}`);
    }

    const angleSummary = resolvedExtras.length > 0
      ? `Người dùng cung cấp tổng cộng ${1 + resolvedExtras.length} ảnh (Ảnh 1: Ảnh chính; ${resolvedExtras.map((e, i) => `Ảnh ${i + 2}: ${e.angleLabel}`).join('; ')}). Hãy đối chiếu chéo triệu chứng trên tất cả các ảnh để tăng độ chính xác.`
      : 'Người dùng cung cấp 1 ảnh.';

    const userPrompt = `
Hãy phân tích tổng hợp hình ảnh và thông tin thực địa sau:
- Cây trồng người dùng đã chọn: ${cropNameVi} (Mã: ${cropType})
- Bộ phận quan sát chính: ${partNameVi}
- Số lượng góc ảnh: ${angleSummary}
- Khu vực địa lý trọng tâm: Vùng Bắc Trung Bộ Việt Nam (Nghệ An, Hà Tĩnh, Quảng Bình, Quảng Trị, Thừa Thiên Huế).
${quizLines.length > 0 ? `- Thông tin trắc nghiệm thực địa do nông dân cung cấp:\n${quizLines.join('\n')}` : '- Chưa có thêm thông tin trắc nghiệm thực địa.'}

Vui lòng kết hợp chặt chẽ hình ảnh ở mọi góc chụp và câu trả lời thực địa để chẩn đoán chính xác nhất, và xuất kết quả theo định dạng JSON chuẩn.
    `.trim();

    let parsedResult: any = null;
    let lastError: any = null;
    let permissionOrBillingFailure = false;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error:
          'Hệ thống phân tích ảnh AI chưa sẵn sàng do chưa được cấp cấu hình kết nối máy chủ. Vui lòng thử lại sau hoặc tra cứu trực tiếp trong mục Sổ bệnh.',
      });
    }

    const imageParts = [
      {
        inlineData: {
          mimeType: mainImage.mimeType,
          data: mainImage.base64,
        },
      },
      ...resolvedExtras.map((extra) => ({
        inlineData: {
          mimeType: extra.mimeType,
          data: extra.base64,
        },
      })),
    ];

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [
            ...imageParts,
            {
              text: userPrompt,
            },
          ],
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                isPlantImage: { type: Type.BOOLEAN },
                cropDetected: { type: Type.STRING },
                selectedCropMatches: { type: Type.BOOLEAN },
                imageQuality: { type: Type.STRING },
                qualityIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
                symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
                possibleDiagnoses: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      diseaseId: { type: Type.STRING },
                      diseaseName: { type: Type.STRING },
                      evidence: { type: Type.ARRAY, items: { type: Type.STRING } },
                      confidenceLevel: { type: Type.STRING },
                    },
                    required: ['diseaseId', 'diseaseName', 'evidence', 'confidenceLevel'],
                  },
                },
                alternativeCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
                severityAssessment: { type: Type.STRING },
                needsMoreImages: { type: Type.BOOLEAN },
                additionalImageInstructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                actionPlan: {
                  type: Type.OBJECT,
                  properties: {
                    immediateSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
                    safeCareAndPrevention: { type: Type.ARRAY, items: { type: Type.STRING } },
                    importantWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['immediateSteps', 'safeCareAndPrevention', 'importantWarnings'],
                },
                expertVerificationRecommended: { type: Type.BOOLEAN },
                disclaimer: { type: Type.STRING },
              },
              required: [
                'isPlantImage',
                'cropDetected',
                'selectedCropMatches',
                'imageQuality',
                'qualityIssues',
                'symptoms',
                'possibleDiagnoses',
                'alternativeCauses',
                'severityAssessment',
                'needsMoreImages',
                'additionalImageInstructions',
                'recommendations',
                'actionPlan',
                'expertVerificationRecommended',
                'disclaimer',
              ],
            },
          },
        });

        if (response.text) {
          const cleanJson = response.text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
          parsedResult = JSON.parse(cleanJson);
          break;
        }
      } catch (apiErr: any) {
        lastError = apiErr;
        if (isPermissionOrBillingError(apiErr)) {
          permissionOrBillingFailure = true;
          console.error('[AgriVision AI] Gemini API permission or billing error:', apiErr?.message || apiErr);
          break;
        }
        console.warn(`[AgriVision AI] Model ${model} failed:`, apiErr?.message || apiErr);
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    if (parsedResult) {
      return res.json(parsedResult);
    }

    if (permissionOrBillingFailure) {
      return res.status(503).json({
        error: 'Dịch vụ phân tích ảnh AI tạm thời chưa được kích hoạt quyền truy cập trên máy chủ.',
        details: lastError?.message || String(lastError || ''),
      });
    }

    return res.status(502).json({
      error: 'Không thể phân tích hình ảnh qua dịch vụ AI lúc này. Bác vui lòng thử lại sau ít phút.',
      details: lastError?.message || String(lastError || ''),
    });
  } catch (error: any) {
    console.error('Error during Gemini plant diagnosis:', error);
    return res.status(500).json({
      error: 'Không thể hoàn thành chẩn đoán ảnh lúc này.',
      details: error.message || String(error),
    });
  }
});

// 2. Agricultural AI Assistant Chat Endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, history = [], diagnosisContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Nội dung câu hỏi là bắt buộc.' });
    }

    const systemInstruction = `
Bạn là "Trợ lý Khoa học Nông nghiệp AgriVision AI" chuyên sâu về cây trồng vùng Bắc Trung Bộ (Cam chanh Nghệ An/Hà Tĩnh, Lúa nước, Cây Lạc).
Mục tiêu của bạn là đồng hành cùng nông dân, khuyến nông viên và nghiên cứu sinh, giải đáp thắc mắc khoa học rõ ràng, dễ hiểu nhưng chuẩn xác.

NGUYÊN TẮC:
1. LUÔN PHÂN BIỆT RÕ RÀNG giữa:
   - [THÔNG TIN ĐÃ XÁC THỰC]: Dữ liệu từ tài liệu kiểm chứng nông nghiệp (Viện BVTV, Viện ASIR, FAO, IRRI).
   - [GỢI Ý / SUY LUẬN AI]: Các quan sát hoặc phán đoán cần thẩm tra thêm tại thực địa.
2. KHÔNG tự ý kê đơn hóa chất độc hại, nồng độ tùy tiện. Luôn hướng tới nguyên tắc Quản lý Dịch hại Tổng hợp (IPM) và an toàn sinh thái.
3. Nếu người dùng đang hỏi về một mẫu chẩn đoán gần nhất, hãy phân tích dựa trên ngữ cảnh được cung cấp.

CƠ SỞ DỮ LIỆU ĐÃ KIỂM CHỨNG:
${REGIONAL_KNOWLEDGE_CONTEXT}
    `.trim();

    let contextPrompt = '';
    if (diagnosisContext) {
      contextPrompt = `
[Ngữ cảnh chẩn đoán hiện tại]:
- Cây trồng: ${diagnosisContext.crop}
- Bộ phận: ${diagnosisContext.part || 'Lá'}
- Bệnh nghi ngờ: ${diagnosisContext.suspectedDisease || 'Chưa xác định'}
- Triệu chứng ghi nhận: ${JSON.stringify(diagnosisContext.symptoms || [])}
- Mức độ tin cậy: ${diagnosisContext.confidenceLevel || 'Trung bình'}
\n`;
    }

    const conversationPrompt = history
      .slice(-6)
      .map((h: { sender: string; content: string }) => `${h.sender === 'user' ? 'Người dùng' : 'Trợ lý'}: ${h.content}`)
      .join('\n');

    const fullPrompt = `${contextPrompt}${conversationPrompt ? conversationPrompt + '\n' : ''}Người dùng: ${message}\nTrợ lý:`;

    let replyText = '';

    const ai = getGeminiClient();
    if (ai) {
      for (const model of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: fullPrompt,
            config: {
              systemInstruction,
            },
          });
          if (response.text) {
            replyText = response.text;
            break;
          }
        } catch (apiErr: any) {
          if (isPermissionOrBillingError(apiErr)) {
            console.info('[AgriVision AI] Live Gemini API requires billing setup on Google Cloud. Using regional botanical assistant knowledge.');
            break; // Stop immediately
          }
          console.info(`Assistant model ${model} unavailable, trying next candidate...`);
        }
      }
    }

    if (!replyText) {
      replyText = searchRegionalKnowledge(message, diagnosisContext?.crop);
    }

    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error during AI assistant response:', error);
    return res.status(500).json({
      error: 'Không thể kết nối với Trợ lý AI nông nghiệp.',
      details: error.message || String(error),
    });
  }
});

// 3. Verified Disease Database API
app.get('/api/diseases', (req, res) => {
  res.json({ diseases: DEFAULT_DISEASES });
});

// 4. Text-to-Speech Endpoint for reading diagnosis results aloud in Vietnamese
app.post('/api/tts', async (req, res) => {
  try {
    const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    if (!rawText) {
      return res.status(400).json({ error: 'Nội dung cần đọc là bắt buộc.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Dịch vụ giọng đọc AI chưa sẵn sàng trên máy chủ.',
      });
    }

    const clippedText = rawText.slice(0, 2400);
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: clippedText,
              speechMetadata: {
                style: 'Warm, clear, unhurried, friendly Vietnamese agricultural advisor explaining clearly to a farmer',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(502).json({ error: 'Không tạo được âm thanh giọng đọc lúc này.' });
    }

    return res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    console.error('[AgriVision AI] TTS error:', error?.message || error);
    return res.status(502).json({
      error: 'Không thể tạo giọng đọc lúc này.',
      details: error?.message || String(error),
    });
  }
});

// 5. Server Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'AgriVision AI',
    timestamp: new Date().toISOString(),
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Ensure any unmatched /api/* route returns JSON instead of SPA HTML
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

// Ensure Express errors on /api/* always return JSON instead of HTML
app.use('/api', (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[AgriVision AI] API middleware error:', err);
  const status = typeof err?.status === 'number' ? err.status : err?.type === 'entity.too.large' ? 413 : 500;
  res.status(status).json({
    error: status === 413
      ? 'Ảnh gửi lên vượt quá dung lượng cho phép.'
      : 'Máy chủ gặp lỗi khi xử lý yêu cầu.',
    details: err?.message || String(err),
  });
});

// Setup Vite in Dev or Static in Production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AgriVision AI] Server running at http://0.0.0.0:${PORT}`);
  });
}

process.on('SIGTERM', () => {
  process.exit(0);
});

process.on('SIGINT', () => {
  process.exit(0);
});

startServer().catch((err) => {
  console.error('[AgriVision AI] Failed to start server:', err);
  process.exit(1);
});
