import type { CropType, DiseaseRecord, PlantPart } from '../types/index.js';
import { EXTENDED_DISEASE_IMAGES } from './extendedDiseaseImages.js';

interface ExtendedDiseaseSeed {
  id: string;
  cropType: CropType;
  vietnameseName: string;
  englishName: string;
  affectedPlantParts: PlantPart[];
  symptoms: string;
  checklist: string[];
  causes: string;
  favorableConditions: string;
  preventionMethods: string;
  safeManagement: string;
  immediate: string[];
  biologicalAndCare: string[];
  caution: string[];
  references: string;
  standardCode: string;
}

function makeRecord(item: ExtendedDiseaseSeed): DiseaseRecord {
  const verifiedImg = EXTENDED_DISEASE_IMAGES[item.id];
  return {
    id: item.id,
    cropType: item.cropType,
    vietnameseName: item.vietnameseName,
    englishName: item.englishName,
    symptoms: item.symptoms,
    symptomChecklist: item.checklist,
    affectedPlantParts: item.affectedPlantParts,
    causes: item.causes,
    favorableConditions: item.favorableConditions,
    preventionMethods: item.preventionMethods,
    safeManagement: item.safeManagement,
    treatmentSteps: {
      immediate: item.immediate,
      biologicalAndCare: item.biologicalAndCare,
      caution: item.caution,
    },
    references: item.references,
    verificationStatus: 'verified',
    sampleImageUrl: verifiedImg?.url,
    galleryImages: verifiedImg ? [verifiedImg] : undefined,
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam & Viện ASIR',
    standardCode: item.standardCode,
    reviewDate: '2026-04-01',
    createdAt: '2026-04-01T00:00:00.000Z',
    updatedAt: '2026-04-01T00:00:00.000Z',
  };
}

const EXTENDED_SEEDS: ExtendedDiseaseSeed[] = [
  // =========================================================================
  // I. CÂY CAM, QUÝT, BƯỞI (+35 BỆNH / SÂU HẠI / THIẾU DINH DƯỠNG)
  // =========================================================================
  {
    id: 'citrus_thrips',
    cropType: 'citrus',
    vietnameseName: 'Bọ trĩ hại cam chanh (Citrus Thrips)',
    englishName: 'Citrus Thrips (Scirtothrips citri)',
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    symptoms:
      'Trên quả non xuất hiện vệt sẹo cạp màu xám bạc hoặc nâu xám hình vòng cung đặc trưng quanh cuống quả hoặc lan xuống má quả. Trên lá non, bọ trĩ chích dọc hai bên gân chính mặt dưới làm lá hẹp dài, mép lá xoăn úp cứng bóng.',
    checklist: [
      'Có vệt sẹo cạp xám bạc hình vòng tròn quanh núm cuống quả non.',
      'Lá non bị hẹp lại, xoăn mép cứng vào trong kèm đường sẹo bạc dọc gân chính.',
      'Gõ nhẹ đọt hoa/lộc non lên giấy trắng thấy bọ trĩ nhỏ dài màu vàng cam bò rất nhanh.',
    ],
    causes: 'Bọ trĩ Scirtothrips citri và Thrips hawaiiensis (chỉ dài 0,7–1 mm).',
    favorableConditions: 'Nắng nóng khô hanh đầu vụ xuân hè (tháng 3–6), trùng giai đoạn ra hoa rộ và rụng cánh hoa.',
    preventionMethods: 'Tưới giữ ẩm hợp lý vào mùa khô, cắt tỉa cành vượt để hạn chế lộc non ra rải rác.',
    safeManagement: 'Treo bẫy dính màu xanh dương hoặc vàng theo dõi; phun dầu khoáng nông nghiệp, dịch tỏi ớt hoặc Spinetoram/Abamectin khi cây vừa rụng 2/3 cánh hoa.',
    immediate: [
      'Kiểm tra ngay chùm hoa sắp rụng cánh và quả non mới đậu cỡ hạt ngô xem có bọ trĩ ẩn dưới đài hoa không.',
      'Đặt bẫy dính xanh dương quanh tán vườn để đánh giá mật độ trước khi xử lý.',
    ],
    biologicalAndCare: [
      'Phun luân phiên chế phẩm sinh học Spinetoram, Abamectin hoặc dầu khoáng nông nghiệp vào sáng sớm/chiều mát.',
      'Bảo vệ thiên địch tự nhiên như bọ rùa và nhện bắt mồi trong vườn.',
    ],
    caution: [
      'Vết sẹo trên vỏ quả do bọ trĩ cạp sẽ tồn tại vĩnh viễn đến lúc thu hoạch; phun khi quả đã lớn bằng nắm tay không xóa được sẹo cũ.',
      'Tránh phun thuốc hóa học phổ rộng lúc ong mật đang thụ phấn.',
    ],
    references: 'UC IPM Citrus Thrips Guidelines; Viện Bảo vệ Thực vật Việt Nam.',
    standardCode: 'QCVN IPM Cam Chanh',
  },
  {
    id: 'citrus_psyllid',
    cropType: 'citrus',
    vietnameseName: 'Rầy chổng cánh hại cam chanh (Asian Citrus Psyllid)',
    englishName: 'Asian Citrus Psyllid (Diaphorina citri)',
    affectedPlantParts: ['leaf', 'stem'],
    symptoms:
      'Rầy trưởng thành nhỏ màu nâu xám có đốm nâu trên cánh, đặc trưng đậu chúc đầu cắm vòi xuống mô lá và chổng đuôi lên nghiêng góc 45°. Ấu trùng dẹt màu vàng cam bám thành đám trên đọt non kèm các sợi phân sáp trắng xoắn đặc trưng, là môi giới truyền bệnh Vàng lá gân xanh (HLB).',
    checklist: [
      'Thấy con rầy trưởng thành đậu chúc đầu chổng đuôi góc 45 độ trên ngọn lộc non.',
      'Ấu trùng màu vàng cam nằm bẹp trên chồi non có tiết ra sợi sáp trắng xoắn.',
      'Lá non bị quăn queo, biến dạng tại các đỉnh chồi mới nhú.',
    ],
    causes: 'Rầy chổng cánh Diaphorina citri (họ Psyllidae).',
    favorableConditions: 'Các đợt cây cam chanh bật lộc non tập trung (lộc xuân, lộc hè, lộc thu), nhiệt độ 25–30°C.',
    preventionMethods: 'Điều khiển cây ra lộc tập trung đồng loạt để dễ bảo vệ; trồng cây ổi xen canh hoặc dải cây chắn gió quanh vườn để xua rầy.',
    safeManagement: 'Treo bẫy dính vàng kiểm tra; bảo vệ thiên địch kiến vàng, ong ký sinh Tamarixia radiata; phun dầu khoáng hoặc thuốc sinh học khi lộc vừa nhú 1–2 cm.',
    immediate: [
      'Kiểm tra tất cả các mũi lộc non mới nhú 1–3 cm xem có rầy chổng cánh hoặc sợi sáp trắng không.',
      'Ngắt tiêu hủy cành chồi non có dấu hiệu vàng lá gân xanh kèm rầy mật độ cao.',
    ],
    biologicalAndCare: [
      'Phun dầu khoáng SK Enspray hoặc nấm ký sinh côn trùng Beauveria / Metarhizium kết hợp chăm sóc lộc đồng loạt.',
      'Nuôi dưỡng kiến vàng tự nhiên trên tán cam để săn bắt ấu trùng rầy chổng cánh.',
    ],
    caution: [
      'Không nhầm rầy chổng cánh với bọ trĩ (chủ yếu làm sẹo xám bạc quanh cuống quả non) hay nhện đỏ (gây chấm trắng bạc li ti trên lá bánh tẻ).',
      'Không bón thúc đạm rải rác làm cây ra lộc non quanh năm.',
    ],
    references: 'Viện Bảo vệ Thực vật; USDA Asian Citrus Psyllid Field Guide.',
    standardCode: 'QCVN 01-165:2014/BNNPTNT',
  },
  {
    id: 'citrus_broad_mite',
    cropType: 'citrus',
    vietnameseName: 'Nhện trắng hại cam chanh (Citrus Broad Mite)',
    englishName: 'Citrus Broad Mite (Polyphagotarsonemus latus)',
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    symptoms:
      'Nhện trắng kích thước cực nhỏ chích hút chủ yếu ở mặt dưới lá non và vỏ quả non. Lá non bị hẹp nhỏ, cong cúp xuống dưới, bề mặt dưới lá ánh màu đồng bóng hoặc xám bạc; quả non bị sần sùi màu nâu xám loang lổ.',
    checklist: [
      'Lá non nhỏ hẹp lại, cong cụp xuống mặt dưới, mặt dưới lá óng ánh màu đồng nâu.',
      'Đỉnh chồi non bị chùn đọt, lá non biến dạng cứng giòn.',
      'Quả non mọc vảy nâu xám phủ kín bề mặt vỏ.',
    ],
    causes: 'Nhện trắng Polyphagotarsonemus latus (Tarsonemidae).',
    favorableConditions: 'Độ ẩm không khí cao xen kẽ nắng ấm trong mùa mưa hoặc vườn rậm rạp thiếu ánh sáng.',
    preventionMethods: 'Cắt tỉa cành tạo tán thông thoáng, giữ khoảng cách tán hợp lý.',
    safeManagement: 'Phun lưu huỳnh sinh học hoặc dầu khoáng / thuốc đặc trị nhện thế hệ mới tập trung ướt đẫm mặt dưới lá non.',
    immediate: [
      'Lật mặt dưới các đọt lá non bị cong cụp, dùng kính lúp 10x kiểm tra sự xuất hiện của nhện trắng li ti.',
      'Tách tỉa bớt các chồi tăm rậm rạp trong tán.',
    ],
    biologicalAndCare: [
      'Phun kỹ dung dịch dầu khoáng nông nghiệp hoặc hoạt chất trừ nhện (Abamectin, Pyridaben, Lưu huỳnh) vào mặt dưới lá non.',
    ],
    caution: [
      'Không dùng thuốc trừ sâu thông thường (nhóm cúc tổng hợp) vì không diệt được nhện mà còn tiêu diệt thiên địch bắt nhện.',
    ],
    references: 'CABI Crop Protection Compendium; UC IPM Citrus Mites.',
    standardCode: 'TCVN IPM Nhện hại cây có múi',
  },
  {
    id: 'citrus_rust_mite',
    cropType: 'citrus',
    vietnameseName: 'Nhện vàng / Nhện gỉ sắt hại quả cam (Citrus Rust Mite)',
    englishName: 'Citrus Rust Mite (Phyllocoptruta oleivora)',
    affectedPlantParts: ['fruit', 'leaf'],
    symptoms:
      'Nhện chích phá vỡ các túi tinh dầu ở lớp biểu bì vỏ quả non làm quả chuyển dần sang màu nâu xỉn, đen sạm như màu da lu / gỉ sắt ("cam da lu", "bưởi rám nắng"). Quả chậm lớn, vỏ dày cứng và mất giá trị thương phẩm.',
    checklist: [
      'Vỏ quả bị xỉn màu nâu đồng hoặc đen xám loang rộng (rám gỉ sắt) thường bắt đầu từ phía có nắng.',
      'Quả non mới lớn bị sần vỏ, mất độ bóng xanh bình thường.',
      'Dùng kính lúp 10–20x thấy rất nhiều nhện hình con sâu nhỏ xíu màu vàng rơm bò trên vỏ quả.',
    ],
    causes: 'Nhện gỉ sắt Phyllocoptruta oleivora.',
    favorableConditions: 'Thời tiết nóng ẩm xen kẽ nắng mưa từ tháng 5 đến tháng 9 khi quả đang phát triển kích thước.',
    preventionMethods: 'Bổ sung đủ nước mùa khô, cắt tỉa cành sát đất để hạn chế bụi bám tạo môi trường cho nhện.',
    safeManagement: 'Phun dầu khoáng nông nghiệp, lưu huỳnh thấm nước hoặc thuốc sinh học Abamectin ngay khi phát hiện quả bắt đầu mất bóng.',
    immediate: [
      'Soi kính lúp kiểm tra bề mặt vỏ các chùm quả ngoài bìa tán hướng nắng.',
      'Nếu mật độ nhện cao trên 5 con/cm² vỏ quả thì xử lý phun ngay.',
    ],
    biologicalAndCare: [
      'Phun phủ đều lên chùm quả bằng dầu khoáng nông nghiệp hoặc chế phẩm lưu huỳnh vào lúc chiều mát.',
    ],
    caution: [
      'Không pha dầu khoáng chung với thuốc chứa lưu huỳnh hoặc phun cách nhau dưới 14 ngày để tránh gây cháy nám vỏ quả.',
    ],
    references: 'UF/IFAS Citrus Rust Mite Guide; Viện Cây ăn quả Miền Nam.',
    standardCode: 'TCVN IPM Cây có múi',
  },
  {
    id: 'citrus_mealybug',
    cropType: 'citrus',
    vietnameseName: 'Rệp sáp phấn hại cam quýt (Citrus Mealybug)',
    englishName: 'Citrus Mealybug (Planococcus citri)',
    affectedPlantParts: ['fruit', 'stem', 'leaf'],
    symptoms:
      'Rệp cơ thể bầu dục phủ lớp phấn sáp trắng xốp sống thành đám ở kẽ cuống quả, nách lá, chồi non và vùng rễ. Rệp tiết mật ngọt thu hút nhiều kiến cộng sinh và làm phát sinh nấm muội đen phủ đen vỏ quả.',
    checklist: [
      'Thấy các ổ bông phấn trắng xốp bám dày ở kẽ cuống quả và nách cành.',
      'Có nhiều kiến đen/kiến hôi bò qua lại quanh ổ rệp và xuất hiện lớp bồ hóng đen trên lá quả.',
      'Quả non bị rệp bám lâu thường còi cọc, biến vàng hoặc rụng sớm.',
    ],
    causes: 'Rệp sáp Planococcus citri.',
    favorableConditions: 'Vườn cây rậm rạp, mùa khô nóng kéo dài, nhiều kiến cộng sinh tha rệp phát tán.',
    preventionMethods: 'Cắt tỉa cành giao tán, quét vôi hoặc bôi keo chặn kiến leo từ gốc lên thân cây.',
    safeManagement: 'Dùng vòi nước áp lực vừa rửa trôi ổ rệp; phun dầu khoáng kết hợp nước rửa chén sinh học hoặc nấm ký sinh Metarhizium, đồng thời đặt bả diệt kiến quanh gốc.',
    immediate: [
      'Diệt kiến cộng sinh quanh gốc và thân cây trước để cắt nguồn bảo vệ và vận chuyển rệp sáp.',
      'Cắt bỏ các chùm quả hoặc cành bị rệp bám kín không còn khả năng phục hồi.',
    ],
    biologicalAndCare: [
      'Phun dầu khoáng nông nghiệp (1–1,5%) làm tan lớp sáp bảo vệ của rệp, có thể kết hợp bọ rùa ăn rệp (Cryptolaemus).',
    ],
    caution: [
      'Lớp phấn sáp chống thấm nước rất tốt; khi phun cần dùng vòi tơi mịn phun trực tiếp ướt đẫm vào kẽ cuống quả.',
    ],
    references: 'UC IPM Citrus Mealybugs; FAO Citrus Pest Management.',
    standardCode: 'TCVN IPM Rệp sáp',
  },
  {
    id: 'citrus_scale_insects',
    cropType: 'citrus',
    vietnameseName: 'Rệp vảy nâu / Rệp vảy đỏ hại cam (Citrus Scale Insects)',
    englishName: 'California Red & Soft Brown Scale',
    affectedPlantParts: ['stem', 'leaf', 'fruit'],
    symptoms:
      'Rệp có lớp vỏ giáp cứng dẹt màu nâu, đỏ cam hoặc trắng xám bám chặt bất động dọc theo cành bánh tẻ, mặt lá và vỏ quả như những vảy nhỏ. Chỗ rệp bám bị quầng vàng, cành khô chết dần và quả sần sùi mất thẩm mỹ.',
    checklist: [
      'Trên cành, lá và vỏ quả có hàng loạt vảy tròn/bầu dục màu nâu đỏ hoặc xám bám lì, cạo nhẹ mới bong.',
      'Lá xung quanh vảy chuyển vàng cục bộ và rụng dần.',
      'Cành nhiễm nặng bị khô chết từ đầu ngọn.',
    ],
    causes: 'Rệp vảy đỏ (Aonidiella aurantii), rệp vảy nâu mềm (Coccus hesperidum) và rệp vảy trắng.',
    favorableConditions: 'Vườn lâu năm ít tỉa tán, khô hạn kéo dài, thiếu thiên địch ong ký sinh.',
    preventionMethods: 'Tỉa cành thông thoáng sau thu hoạch, quét nước vôi pha loãng lên thân cành lớn.',
    safeManagement: 'Phun dầu khoáng nông nghiệp 1–1,5% làm ngạt lớp vỏ giáp của rệp ở giai đoạn rệp non mới nở bò ra ngoài.',
    immediate: [
      'Cắt tỉa tiêu hủy các cành già bị rệp vảy đóng dày đặc.',
      'Chà sạch thân cành chính bằng bàn chải mềm và nước sạch kết hợp quét vôi.',
    ],
    biologicalAndCare: [
      'Phun dầu khoáng nông nghiệp 2 lần cách nhau 10–14 ngày để tiêu diệt cả lứa rệp non mới nở từ dưới vỏ giáp.',
    ],
    caution: [
      'Không phun lúc trời nắng trên 33°C hoặc cây đang suy kiệt thiếu nước vì dầu khoáng dễ gây cháy lá.',
    ],
    references: 'UC IPM Citrus Scales; Viện BVTV Việt Nam.',
    standardCode: 'TCVN IPM Cây có múi',
  },
  {
    id: 'citrus_fruit_fly',
    cropType: 'citrus',
    vietnameseName: 'Ruồi vàng đục quả cam bưởi (Oriental Fruit Fly)',
    englishName: 'Oriental Fruit Fly (Bactrocera dorsalis)',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Trên vỏ quả có vết châm kim nhỏ li ti (lỗ đẻ trứng), xung quanh thâm mềm dần và có giọt nhựa trong tiết ra. Bổ quả thấy dòi trắng không chân đục khoét làm thịt quả thối nhũn chua và rụng hàng loạt trước khi chín.',
    checklist: [
      'Vỏ quả có lỗ châm nhỏ bằng đầu kim kèm quầng vàng thâm mềm.',
      'Bóp nhẹ vào vết châm thấy mềm nhũn hoặc rỉ nước.',
      'Bổ quả ra thấy dòi màu trắng kem bò bên trong phần tép bị thối.',
    ],
    causes: 'Ruồi vàng đục quả Bactrocera dorsalis.',
    favorableConditions: 'Giai đoạn quả bước vào thời kỳ tích đường sắp chín (tháng 8–12), thời tiết ấm ẩm.',
    preventionMethods: 'Bao quả sớm bằng túi chuyên dụng; thu gom toàn bộ quả rụng cho vào túi nilon buộc kín hoặc ngâm nước vôi để diệt dòi.',
    safeManagement: 'Treo bẫy dẫn dụ Methyl Eugenol kết hợp bẫy bả protein sinh học quanh chu vi vườn (treo cách nhau 25–30m) từ lúc quả bắt đầu ngả màu.',
    immediate: [
      'Thu gom sạch quả bị chích và quả rụng dưới gốc đem ủ kín hoặc chôn sâu với vôi bột để cắt vòng đời nhộng dưới đất.',
      'Treo bổ sung bẫy dẫn dụ ruồi đực Methyl Eugenol ở rìa vườn.',
    ],
    biologicalAndCare: [
      'Phun điểm bả protein sinh học (Ento-pro / So-lu-bait) lên một phần tán cây để tiêu diệt ruồi cái trước khi đẻ trứng.',
      'Thực hiện bao quả đối với bưởi Diễn, bưởi Phúc Trạch, cam Vinh chất lượng cao.',
    ],
    caution: [
      'Không vứt quả rụng xuống mương nước hoặc bìa vườn vì dòi sẽ chui xuống đất hóa nhộng và nở thành ruồi mới.',
      'Không phun thuốc trừ sâu lên toàn bộ quả gần ngày thu hoạch gây tồn dư độc hại.',
    ],
    references: 'Viện Bảo vệ Thực vật; FAO Fruit Fly Control Manual.',
    standardCode: 'QCVN Quản lý Ruồi đục quả',
  },
  {
    id: 'citrus_stem_borer',
    cropType: 'citrus',
    vietnameseName: 'Sâu đục thân xén tóc hại cam (Citrus Longhorned Beetle)',
    englishName: 'Citrus Longhorned / Stem Borer (Anoplophora chinensis)',
    affectedPlantParts: ['stem'],
    symptoms:
      'Thân cây gần mặt đất hoặc chạc ba có lỗ đục tròn kèm đống mùn cưa và phân sâu màu nâu vàng đùn ra ngoài. Cây bị mất mạch dẫn nhựa, lá vàng úa dần từng nhánh rồi chết khô cả cây khi rễ gốc bị đục rỗng.',
    checklist: [
      'Thấy đống mùn cưa tươi và phân xơ gỗ đùn ra dưới gốc hoặc trên vỏ thân cành.',
      'Dùng dao gạt vỏ chỗ có mùn thấy đường hầm đục sâu vào lõi gỗ.',
      'Tán lá phía trên nhánh bị đục vàng héo dù đất gốc vẫn đủ ẩm.',
    ],
    causes: 'Ấu trùng xén tóc (Anoplophora chinensis, Nadezhdiella cantori) và sâu đục cành.',
    favorableConditions: 'Vườn cam bưởi lâu năm vỏ gốc già nứt nẻ, cỏ mọc rậm sát gốc vào mùa nắng tháng 5–8.',
    preventionMethods: 'Làm sạch cỏ quanh gốc, quét nước vôi hoặc dung dịch đồng lên thân cây cao 1m từ mặt đất vào đầu mùa hè để ngăn xén tóc đẻ trứng.',
    safeManagement: 'Bắt xén tóc trưởng thành vào sáng sớm/chiều mát; dùng dây thép khều sâu trong lỗ đục rồi nhét bông tẩm tinh dầu hoặc chế phẩm nấm xanh vào bịt lỗ bằng đất sét.',
    immediate: [
      'Kiểm tra toàn bộ phần gốc cây cách mặt đất 0–80 cm để tìm các lỗ đùn mùn cưa mới.',
      'Dùng dây kẽm mềm luồn sâu vào đường đục kéo tiêu diệt sâu non, sau đó dùng đất dẻo trét kín miệng lỗ.',
    ],
    biologicalAndCare: [
      'Quét hỗn hợp vôi tôi + muối + gốc đồng lên gốc thân định kỳ 2 lần/năm trước mùa xén tóc đẻ trứng.',
    ],
    caution: [
      'Phun thuốc ngoài mặt vỏ thân thường không diệt được sâu đã chui vào trong lõi gỗ.',
    ],
    references: 'Viện BVTV Việt Nam; EPPO Anoplophora chinensis Protocol.',
    standardCode: 'TCVN IPM Cây ăn quả có múi',
  },
  {
    id: 'citrus_swallowtail_caterpillar',
    cropType: 'citrus',
    vietnameseName: 'Sâu ăn lá / Sâu bướm phượng hại lộc cam (Citrus Swallowtail)',
    englishName: 'Citrus Swallowtail Caterpillar (Papilio demoleus)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Sâu non tuổi nhỏ có màu nâu trắng trông giống phân chim bám trên mặt lá non; sâu lớn màu xanh lục tươi với vệt nâu ngang lưng ăn khuyết từ mép lá vào, chỉ để lại gân chính. Cây con vườn ươm có thể bị ăn trụi sạch lá.',
    checklist: [
      'Phiến lá non bị gặm khuyết nham nhở từ rìa mép vào đến tận gân chính.',
      'Trên lá non thấy sâu màu nâu loang trắng (tuổi nhỏ) hoặc sâu xanh to có hai chấm mắt giả ở đầu (tuổi lớn).',
      'Khi chạm vào đầu sâu lớn thấy nhú ra cặp sừng mềm màu đỏ cam có mùi tinh dầu cam.',
    ],
    causes: 'Sâu non bướm phượng Papilio demoleus và Papilio polytes.',
    favorableConditions: 'Giai đoạn vườn ươm, cây cam mới trồng 1–2 năm tuổi hoặc các đợt lộc non phát triển.',
    preventionMethods: 'Thường xuyên thăm vườn bắt bằng tay ở vườn cây con; bảo vệ ong ký sinh trứng và ong kén.',
    safeManagement: 'Bắt tay trực tiếp nếu số lượng ít; phun chế phẩm vi khuẩn Bt (Bacillus thuringiensis) rất nhạy và an toàn hoàn toàn với môi trường.',
    immediate: [
      'Đi kiểm tra các cành lộc non trên cây mới trồng để bắt bằng tay các con sâu non đang ăn lá.',
    ],
    biologicalAndCare: [
      'Phun chế phẩm sinh học vi khuẩn Bt (Bacillus thuringiensis) nếu mật độ sâu ở vườn ươm cao.',
    ],
    caution: [
      'Không cần dùng thuốc hóa học độc hại cho loại sâu này vì bắt tay và chế phẩm Bt kiểm soát hiệu quả gần 100%.',
    ],
    references: 'Viện Bảo vệ Thực vật; CABI Papilio demoleus Datasheet.',
    standardCode: 'TCVN IPM Sâu hại lá',
  },
  {
    id: 'citrus_stink_bug',
    cropType: 'citrus',
    vietnameseName: 'Bọ xít xanh hại quả cam quýt (Citrus Green Stink Bug)',
    englishName: 'Spined Citrus Bug / Green Stink Bug (Biprorulus bibax)',
    affectedPlantParts: ['fruit', 'stem'],
    symptoms:
      'Bọ xít xanh trưởng thành và bọ non chích vòi xuyên sâu vào vỏ quả non để hút dịch tép. Chỗ vết chích thâm nâu nhỏ, bên trong tép quả bị khô xốp, hóa bần đắng và quả bị rụng non hàng loạt.',
    checklist: [
      'Quả non rụng nhiều dù cuống vẫn còn xanh, bổ quả ra thấy các múi tép bên trong bị khô thâm nâu cục bộ.',
      'Quan sát trên tán cây thấy bọ xít màu xanh lục hình khiên to bằng đầu ngón tay.',
      'Chạm vào có mùi hăng đặc trưng của bọ xít.',
    ],
    causes: 'Bọ xít xanh (Rhynchocoris humeralis, Nezara viridula).',
    favorableConditions: 'Giai đoạn quả non phát triển bằng quả chanh đến quả trứng gà (tháng 5–8), vườn gần rừng hoặc cây bụi.',
    preventionMethods: 'Phát quang bụi rậm ven vườn; rung nhẹ cành vào sáng sớm khi bọ xít còn tê lạnh để thu bắt thủ công.',
    safeManagement: 'Thu bắt ổ trứng dưới mặt lá; dùng bẫy đèn hoặc phun chế phẩm thảo mộc (tỏi ớt gừng, dầu neem) hoặc hoạt chất sinh học khi mật độ cao.',
    immediate: [
      'Rung nhẹ tán cây vào buổi sáng sớm và trải bạt hứng bắt bọ xít rơi xuống.',
      'Kiểm tra mặt dưới lá tìm các ổ trứng tròn xếp thành hàng đều như hạt ngọc để tiêu hủy.',
    ],
    biologicalAndCare: [
      'Phun dầu neem hoặc chế phẩm thảo mộc xua đuổi vào buổi chiều mát.',
    ],
    caution: [
      'Vết chích của bọ xít xanh khó thấy trên mặt ngoài vỏ quả nhỏ nhưng làm rụng quả rất nhanh.',
    ],
    references: 'Viện Cây ăn quả; UC IPM Stink Bugs on Citrus.',
    standardCode: 'TCVN IPM Cây có múi',
  },
  {
    id: 'citrus_anthracnose',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Thán thư cam quýt (Citrus Anthracnose)',
    englishName: 'Citrus Anthracnose (Colletotrichum gloeosporioides)',
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    symptoms:
      'Trên lá có đốm lớn màu nâu xám nhạt ở đầu chóp hoặc mép lá, bề mặt có các vòng đồng tâm chứa nhiều chấm nhỏ màu đen xếp vòng, ranh giới vết bệnh phân biệt rõ với phần xanh. Trên quả gây thối khô nâu đen và rụng quả non.',
    checklist: [
      'Vết cháy khô màu nâu xám ở chóp lá hoặc mép lá có vòng đồng tâm và chấm đen li ti.',
      'Hoa và quả non bị thối đen rụng kèm nhựa cam trên đài hoa.',
      'Cành non bị chết khô từ ngọn lan xuống màu xám trắng.',
    ],
    causes: 'Nấm Colletotrichum gloeosporioides và C. acutatum.',
    favorableConditions: 'Cây suy yếu, bón thừa đạm, mưa ẩm kéo dài hoặc sau các đợt gió Lào nóng làm tổn thương mô lá.',
    preventionMethods: 'Tỉa cành khô, bón phân cân đối đủ Kali và Canxi, tăng cường hữu cơ vi sinh.',
    safeManagement: 'Cắt bỏ cành lá bệnh nặng; phun dung dịch Booc-đô, gốc đồng sinh học hoặc hoạt chất Azoxystrobin, Difenoconazole khi ẩm độ cao.',
    immediate: [
      'Cắt tỉa cành chết khô và thu gom lá rụng mang ra khỏi vườn tiêu hủy.',
      'Kiểm tra độ thoát nước quanh gốc tránh ngập úng làm cây suy yếu.',
    ],
    biologicalAndCare: [
      'Phun phòng trừ bằng thuốc gốc đồng sinh học hoặc Azoxystrobin giai đoạn ra hoa và sau mưa lớn.',
      'Bổ sung phân hữu cơ hoai mục + Trichoderma cải tạo rễ giúp cây tăng đề kháng.',
    ],
    caution: [
      'Không bón thúc đạm liều cao khi cây đang bị thán thư vì mô lá non mềm rất dễ bị nấm xâm nhập.',
    ],
    references: 'Viện Bảo vệ Thực vật; UF/IFAS Citrus Anthracnose Guide.',
    standardCode: 'QCVN Bệnh hại cây ăn quả',
  },
  {
    id: 'citrus_tristeza',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Tristeza / Tàn lụi virus hại cam (Citrus Tristeza Virus)',
    englishName: 'Citrus Tristeza Virus (CTV)',
    affectedPlantParts: ['leaf', 'stem', 'fruit'],
    symptoms:
      'Lá chuyển vàng nhợt từ gân chính lan ra (gân lá trong suốt khi soi lên ánh nắng), cây ra hoa trái mùa rộ một cách bất thường nhưng quả nhỏ và rụng nhiều. Bóc vỏ thân vùng gốc ghép thấy các rãnh lõm gỗ ("lõm thân" / stem pitting) và cây suy kiệt chết dần.',
    checklist: [
      'Soi lá non ngược ánh sáng mặt trời thấy hệ thống gân phụ có các đoạn trong suốt (vein clearing).',
      'Bóc thử mảng vỏ nhỏ trên cành bánh tẻ thấy phần gỗ bên trong có nhiều rãnh khía lõm dọc.',
      'Cây ra hoa rất nhiều nhưng tán lá thưa, cành khô chết từ từ.',
    ],
    causes: 'Virus Citrus Tristeza Virus (CTV), lây truyền nhanh qua rệp muội nâu (Toxoptera citricida) và mắt ghép nhiễm bệnh.',
    favorableConditions: 'Sử dụng giống ghép không sạch bệnh, gốc ghép mẫn cảm (cam chua), vườn có mật độ rệp muội cao.',
    preventionMethods: 'Sử dụng cây giống sạch bệnh từ nhà lưới chứng nhận; ghép trên gốc ghép chống chịu như cam ba lá, chanh Volkameriana.',
    safeManagement: 'Quản lý triệt để rệp muội nâu trên đọt non; tiêu hủy sớm cây suy kiệt nặng không có khả năng phục hồi.',
    immediate: [
      'Kiểm tra mật độ rệp muội nâu trên toàn vườn để phun xử lý cắt nguồn truyền virus.',
      'Đánh dấu cây suy kiệt nặng và tuyệt đối không lấy mắt ghép/cành chiết từ cây này.',
    ],
    biologicalAndCare: [
      'Bón phân hữu cơ vi sinh + vi lượng giúp giảm stress ở cây nhiễm nhẹ trên gốc ghép chống chịu.',
    ],
    caution: [
      'Bệnh do virus gây ra nên không có thuốc đặc trị tiêu diệt virus trong cây.',
    ],
    references: 'Viện Bảo vệ Thực vật; USDA-ARS Citrus Tristeza Compendium.',
    standardCode: 'QCVN Cây giống sạch bệnh',
  },
  {
    id: 'citrus_powdery_mildew',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Phấn trắng hại lá non cam quýt (Citrus Powdery Mildew)',
    englishName: 'Citrus Powdery Mildew (Oidium tingitaninum)',
    affectedPlantParts: ['leaf', 'stem', 'fruit'],
    symptoms:
      'Trên bề mặt lá non, chồi non và quả nhỏ phủ một lớp bột phấn mịn màu trắng xám như phấn rôm. Lá bị bệnh biến dạng xoăn mép, mô lá dưới lớp phấn chuyển vàng úa rồi khô cháy và rụng sớm.',
    checklist: [
      'Lớp bột phấn màu trắng xám phủ từng mảng trên mặt lá non và đỉnh chồi.',
      'Lá non bị cong vênh, mất màu xanh và dễ rụng khi chạm nhẹ.',
      'Quả non bị lớp phấn bám làm khô rụng hoặc để lại sẹo nâu.',
    ],
    causes: 'Nấm Oidium tingitaninum (Acrosporium tingitaninum).',
    favorableConditions: 'Sáng sớm có sương mù ẩm ướt xen kẽ trưa nắng hanh (20–26°C), vườn rậm tán khuất gió.',
    preventionMethods: 'Tỉa tán thông thoáng, tránh trồng quá dày và không tưới lên tán lá vào buổi chiều tối.',
    safeManagement: 'Phun lưu huỳnh sinh học (Wettable Sulfur), chế phẩm Bacillus subtilis hoặc Hexaconazole khi lớp phấn mới xuất hiện.',
    immediate: [
      'Phun rửa nhẹ tán lộc non vào buổi sáng nắng lên hoặc dùng thuốc sinh học gốc lưu huỳnh/Bacillus.',
    ],
    biologicalAndCare: [
      'Cắt tỉa cành tăm trong tán để ánh nắng chiếu vào thân lá nhanh khô sương sớm.',
    ],
    caution: [
      'Không phun lưu huỳnh khi trời nắng nóng gay gắt trên 32°C hoặc vừa mới phun dầu khoáng trong vòng 2 tuần.',
    ],
    references: 'Viện Bảo vệ Thực vật; CABI Citrus Powdery Mildew.',
    standardCode: 'TCVN IPM Cây có múi',
  },
  {
    id: 'citrus_pink_disease',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Nấm hồng hại thân cành cam bưởi (Pink Disease)',
    englishName: 'Citrus Pink Disease (Erythricium salmonicolor)',
    affectedPlantParts: ['stem'],
    symptoms:
      'Trên vỏ các chạc ba hoặc cành bánh tẻ xuất hiện lớp tơ nấm ban đầu trắng bạc sau chuyển sang lớp phấn màu hồng cá hồi đặc trưng ôm quanh vỏ cành. Vỏ cành bị nứt nẻ thối khô làm toàn bộ lá phía trên cành đột ngột vàng héo chết rũ.',
    checklist: [
      'Lớp phấn mịn màu hồng nhạt đến hồng cá hồi bám quanh vị trí chạc cành.',
      'Vỏ gỗ bên dưới lớp phấn hồng bị thối nâu, bong tróc.',
      'Một cành lớn xanh tốt bỗng vàng khô chết nhanh trong khi các cành khác vẫn xanh.',
    ],
    causes: 'Nấm Corticium salmonicolor (Erythricium salmonicolor).',
    favorableConditions: 'Mùa mưa ẩm kéo dài, độ ẩm vườn >85%, cành tán rậm rạp thiếu ánh sáng.',
    preventionMethods: 'Cắt tỉa cành giao tán thông thoáng, quét nước vôi lên chạc ba và thân chính trước mùa mưa.',
    safeManagement: 'Cạo nhẹ vỏ chỗ bị nấm hồng rồi quét dung dịch Booc-đô đặc (1 phần đồng + 1 phần vôi + 10 phần nước) hoặc thuốc gốc đồng/Validamycin.',
    immediate: [
      'Cắt bỏ ngay các cành nhỏ đã khô chết hẳn đem đốt, tránh phát tán bào tử hồng.',
      'Với cành lớn mới chớm, dùng dao cạo sạch lớp nấm hồng rồi quét kín thuốc gốc đồng hoặc Booc-đô đặc.',
    ],
    biologicalAndCare: [
      'Tỉa thưa tán vườn định kỳ giúp gió và ánh nắng lọt vào giữa chạc ba thân cành.',
    ],
    caution: [
      'Cẩn thận phân biệt với bệnh chảy nhựa Phytophthora (thường xảy ra sát gốc có chảy nhựa nâu đen nặng mùi chứ không có lớp phấn hồng).',
    ],
    references: 'Viện Cây ăn quả Miền Nam; Viện BVTV Việt Nam.',
    standardCode: 'TCVN Bệnh hại cây ăn quả',
  },
  {
    id: 'citrus_root_rot_fusarium',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Vàng lá thối rễ cam quýt (Citrus Root Rot / Decline)',
    englishName: 'Fusarium & Pythium Citrus Root Rot',
    affectedPlantParts: ['leaf', 'stem', 'other'],
    symptoms:
      'Lá trên toàn cây chuyển vàng đều từ gân lá (khác với vàng loang lổ lệch gân của HLB), lá rủ xuống và rụng nhiều khi chạm nhẹ. Đào kiểm tra vùng rễ cám thấy vỏ rễ bị thối nhũn tuột khỏi lõi rễ, rễ màu nâu đen có mùi hôi.',
    checklist: [
      'Gân lá chuyển màu vàng sáng đồng đều đối xứng trên nhiều lá già và bánh tẻ.',
      'Đào đất quanh tán kiểm tra thấy rễ tơ thối đen, dùng tay tuốt nhẹ vỏ rễ tụt khỏi lõi gỗ.',
      'Đất quanh gốc thường bị bí chặt, chua hoặc ngập úng cục bộ.',
    ],
    causes: 'Phức hợp nấm đất Fusarium solani, Pythium spp. và Phytophthora spp. kết hợp tuyến trùng làm tổn thương rễ.',
    favorableConditions: 'Đất trũng thoát nước kém, mưa ngập úng kéo dài, đất chua pH < 5 hoặc lạm dụng phân hóa học làm chai đất.',
    preventionMethods: 'Trồng cây trên mô cao, đào rãnh thoát nước tốt; bón phân hữu cơ hoai mục ủ nấm đối kháng Trichoderma hàng năm.',
    safeManagement: 'Xới xáo nhẹ vùng đất quanh rễ giúp thông khí, bón vôi nâng pH lên 5,5–6,5; tưới xử lý nấm đối kháng Trichoderma hoặc hoạt chất Metalaxyl/Fosetyl-Al khi bệnh mới chớm.',
    immediate: [
      'Khơi rãnh thoát nước ngay nếu gốc đang đọng nước và cào nhẹ lớp đất váng trên mặt.',
      'Tưới thuốc trừ nấm gốc rễ (Metalaxyl-M hoặc Fosetyl-Aluminium) theo đúng khuyến cáo vùng rễ.',
    ],
    biologicalAndCare: [
      'Sau khi xử lý nấm 7–10 ngày, tưới kích rễ sinh học (Humic + nấm đối kháng Trichoderma) kết hợp phân hữu cơ hoai mục.',
      'Phun phân bón lá trung vi lượng nhẹ qua tán để nuôi cây trong thời gian rễ chưa hồi phục.',
    ],
    caution: [
      'Tuyệt đối không bón phân đạm/NPK hóa học vào gốc khi bộ rễ đang bị thối vì sẽ làm xót rễ chết cây nhanh hơn.',
    ],
    references: 'Viện ASIR Bắc Trung Bộ; Viện Cây ăn quả Miền Nam.',
    standardCode: 'QCVN 01-165:2014/BNNPTNT',
  },
  {
    id: 'citrus_brown_rot',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Thối nâu quả cam (Phytophthora Brown Rot)',
    englishName: 'Citrus Phytophthora Brown Rot',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Quả ở các cành thấp gần mặt đất xuất hiện mảng thối màu nâu nhạt lan rộng nhanh nhưng mô vỏ vẫn giữ chắc chứ không nhũn bẹp ngay, có mùi hăng chua đặc trưng. Trong điều kiện ẩm ướt có lớp tơ mốc trắng mỏng phủ trên vết nâu.',
    checklist: [
      'Mảng vỏ quả chuyển màu nâu da bò đồng nhất, sờ vào thấy cứng chắc chứ không lún nhũn.',
      'Chủ yếu xuất hiện ở các chùm quả tầng thấp gần mặt đất sau mưa lớn.',
      'Có mùi hăng đặc trưng và có thể nổi lớp tơ trắng mịn khi ẩm cao.',
    ],
    causes: 'Nấm giả Phytophthora palmivora và P. citrophthora trong đất bắn lên quả theo giọt mưa.',
    favorableConditions: 'Mưa bão kéo dài, cành quả rủ sát mặt đất không có cỏ/rơm phủ chống bắn bùn.',
    preventionMethods: 'Cắt tỉa cành tầng thấp cách mặt đất ít nhất 40–50 cm; phủ rơm rạ hoặc bạt quanh gốc.',
    safeManagement: 'Thu gom quả bệnh tiêu hủy; phun gốc đồng sinh học hoặc Fosetyl-Al vào tầng tán thấp từ đầu mùa mưa.',
    immediate: [
      'Hái bỏ ngay những quả có vết thối nâu và cả quả rụng dưới gốc mang tiêu hủy.',
      'Chống hoặc cắt tỉa các cành sai quả rủ chạm mặt đất.',
    ],
    biologicalAndCare: [
      'Phun dung dịch Booc-đô hoặc gốc đồng sinh học bảo vệ vùng quả tầng thấp trước các đợt mưa bão.',
    ],
    caution: [
      'Không xếp chung quả bị chớm thối nâu vào sọt bảo quản sau thu hoạch vì bệnh lây rất nhanh trong kho.',
    ],
    references: 'UC IPM Citrus Brown Rot; FAO Postharvest Citrus Guide.',
    standardCode: 'TCVN Bệnh hại quả có múi',
  },
  {
    id: 'citrus_diplodia_stem_end_rot',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Thối cuống quả cam (Diplodia Stem-End Rot)',
    englishName: 'Citrus Diplodia Stem-End Rot (Lasiodiplodia theobromae)',
    affectedPlantParts: ['fruit', 'stem'],
    symptoms:
      'Quả bắt đầu mềm thối từ vòng đài cuống quả, sau đó vùng vỏ thâm nâu lan nhanh xuống hai bên sườn theo đường múi quả thành các dải sọc rõ rệt. Cành mang quả cũng có thể bị khô đầu cành.',
    checklist: [
      'Vết thối màu nâu sẫm bắt đầu đúng từ đầu cuống quả lan tỏa đều xuống dưới.',
      'Vết thối có xu hướng chạy theo các khe rãnh giữa các múi cam.',
      'Thường gặp nhiều trên quả già gần thu hoạch hoặc sau khi hái vào kho.',
    ],
    causes: 'Nấm Lasiodiplodia theobromae (Diplodia natalensis).',
    favorableConditions: 'Thời tiết nóng ẩm (28–32°C), vườn nhiều cành chết khô chứa nguồn bào tử nấm.',
    preventionMethods: 'Cắt tỉa sạch cành chết khô trên cây; khi thu hoạch dùng kéo cắt sát đài cuống không giật rách vỏ.',
    safeManagement: 'Cắt tỉa cành khô kết hợp phun gốc đồng sau thu hoạch; bảo quản quả nơi thoáng mát khô ráo.',
    immediate: [
      'Thu hái loại bỏ các quả bị thối cuống trên cây và vệ sinh cành khô phía trên.',
    ],
    biologicalAndCare: [
      'Xử lý quả sau thu hoạch bằng nước ấm hoặc chế phẩm sinh học an toàn thực phẩm trước khi đóng thùng.',
    ],
    caution: [
      'Tránh giật quả bằng tay làm bong đài cuống tạo vết hở cho nấm xâm nhập.',
    ],
    references: 'UF/IFAS Postharvest Stem-End Rot; Viện Cơ điện NN & CNSTH.',
    standardCode: 'TCVN Bảo quản quả có múi',
  },
  {
    id: 'citrus_algal_spot',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Đốm rong / Rong rêu thân lá cam (Citrus Algal Spot)',
    englishName: 'Citrus Red Algal Spot (Cephaleuros virescens)',
    affectedPlantParts: ['leaf', 'stem'],
    symptoms:
      'Trên mặt trên lá già và vỏ cành xuất hiện các đốm tròn hơi nổi gồ mượt như nhung, ban đầu màu xanh xám sau chuyển sang màu nâu đỏ gỉ sắt hoặc cam sáng đặc trưng. Lớp đốm rong có thể cạo bong được khỏi mặt lá.',
    checklist: [
      'Đốm tròn nổi mượt như nhung màu cam đỏ gỉ sắt hoặc xám xanh trên mặt trên lá già.',
      'Trên cành bánh tẻ có các mảng rong mốc xanh xám hoặc nâu đỏ làm vỏ cành nứt nẻ.',
      'Có thể dùng móng tay cạo nhẹ lớp bào tử rong trên mặt lá.',
    ],
    causes: 'Tảo ký sinh Cephaleuros virescens.',
    favorableConditions: 'Vườn lâu năm tán rậm, độ ẩm cao kéo dài, cây thiếu dinh dưỡng và ánh sáng.',
    preventionMethods: 'Tỉa cành tạo tán thông thoáng; bón phân cân đối giúp cây khỏe.',
    safeManagement: 'Phun rửa vườn bằng dung dịch Booc-đô 1% hoặc thuốc gốc đồng sinh học sau mùa thu hoạch.',
    immediate: [
      'Cắt tỉa bỏ bớt các cành giao tán quá rậm trong lòng tán cây.',
    ],
    biologicalAndCare: [
      'Phun thuốc gốc đồng (Đồng Hydroxit / Booc-đô 1%) 2 lần cách nhau 14 ngày vào đầu mùa mưa để tiêu diệt tảo.',
    ],
    caution: [
      'Các loại thuốc trừ nấm thông thường ít có tác dụng với tảo đỏ; thuốc gốc đồng cho hiệu quả kiểm soát tốt nhất.',
    ],
    references: 'Viện Bảo vệ Thực vật; UF/IFAS Algal Leaf Spot.',
    standardCode: 'TCVN IPM Cây có múi',
  },
  {
    id: 'citrus_greasy_spot',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Đốm nhờn / Đốm dầu lá cam (Citrus Greasy Spot)',
    englishName: 'Citrus Greasy Spot (Zasmidium citri-griseum)',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Mặt trên lá xuất hiện các đốm vàng nhạt loang, tương ứng ở mặt dưới lá là các vết phồng màu nâu đen bóng như bôi mỡ dầu ("đốm nhờn"). Bệnh nặng làm lá vàng rụng hàng loạt vào mùa đông làm cây trơ cành.',
    checklist: [
      'Mặt dưới lá già có vết đốm nâu sẫm bóng nhờn như thấm dầu mỡ, hơi phồng.',
      'Mặt trên tương ứng hơi ố vàng mờ.',
      'Vào cuối thu đầu đông, lá già bị rụng rất nhanh sau vài cơn gió lạnh.',
    ],
    causes: 'Nấm Zasmidium citri-griseum (Mycosphaerella citri).',
    favorableConditions: 'Độ ẩm ban đêm cao trên 90% kết hợp nhiệt độ ấm 25–30°C, nhiều lá rụng ẩm mục dưới gốc.',
    preventionMethods: 'Thu gom hoặc xới vùi lớp lá rụng dưới gốc để ngăn phóng thích bào tử.',
    safeManagement: 'Phun dầu khoáng nông nghiệp hoặc gốc đồng sinh học vào mặt dưới lá ở giai đoạn lá hè thu vừa chuyển bánh tẻ.',
    immediate: [
      'Thu dọn lá rụng dưới tán gốc đem ủ phân hữu cơ với vôi và Trichoderma.',
    ],
    biologicalAndCare: [
      'Phun phủ mặt dưới lá bằng dầu khoáng nông nghiệp hoặc thuốc gốc đồng sinh học từ tháng 6–8.',
    ],
    caution: [
      'Bệnh tấn công qua khí khổng ở MẶT DƯỚI lá nên khi phun bắt buộc phải ngửa vòi hướng từ dưới lên.',
    ],
    references: 'UF/IFAS Citrus Greasy Spot; UC IPM.',
    standardCode: 'TCVN Bệnh hại cây có múi',
  },
  {
    id: 'citrus_twig_blight',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Khô cành / Chết đầu cành cam (Citrus Twig Dieback)',
    englishName: 'Citrus Twig Blight & Dieback (Botryodiplodia / Phomopsis)',
    affectedPlantParts: ['stem', 'leaf'],
    symptoms:
      'Các cành nhỏ ngoài ngọn đột ngột héo lá rồi khô chết dần từ đỉnh ngọn lan xuống thân cành, ranh giới giữa phần gỗ khô nâu và phần vỏ còn xanh hiện rõ, đôi khi rỉ giọt nhựa nhỏ tại vết ranh giới.',
    checklist: [
      'Ngọn cành chết khô xám từ trên xuống trong khi phần thân gốc vẫn xanh.',
      'Lá trên cành chết thường héo quắt bám lại trên cành một thời gian mới rụng.',
      'Cạo vỏ chỗ tiếp giáp khô-tươi thấy mô gỗ chuyển nâu sẫm.',
    ],
    causes: 'Nấm Phomopsis citri, Lasiodiplodia hoặc hệ quả suy rễ, thiếu nước cục bộ.',
    favorableConditions: 'Sau thu hoạch cây mang quả quá sai bị kiệt sức, gặp gió Lào nắng gắt hoặc úng rễ.',
    preventionMethods: 'Điều tiết lượng quả vừa sức cây, bón phân phục hồi kịp thời ngay sau thu hoạch.',
    safeManagement: 'Cắt bỏ phần cành khô lùi sâu xuống đoạn gỗ còn xanh tươi 5–10 cm, bôi keo liền sẹo gốc đồng lên vết cắt.',
    immediate: [
      'Dùng kéo sắc cắt sâu qua phần gỗ nâu vào đoạn cành còn xanh khỏe và quét thuốc gốc đồng vào vết cắt.',
    ],
    biologicalAndCare: [
      'Bón phân hữu cơ kết hợp lân và kali phục hồi tán rễ sau vụ thu hoạch.',
    ],
    caution: [
      'Không cắt cụt ngay sát ranh giới thâm nâu vì nấm vẫn còn trong mạch gỗ sẽ tiếp tục lan xuống.',
    ],
    references: 'Viện Bảo vệ Thực vật; FAO Citrus Orchard Management.',
    standardCode: 'TCVN IPM Cây có múi',
  },
  {
    id: 'citrus_exocortis_viroid',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Nứt bong vỏ gốc ghép (Citrus Exocortis Viroid)',
    englishName: 'Citrus Exocortis Viroid (CEVd)',
    affectedPlantParts: ['stem'],
    symptoms:
      'Vỏ cây phía dưới vết ghép bị nứt dọc từng dải mỏng, bong tróc ra thành mảng vảy dài từ gốc đến mối ghép, cây lùn thấp còi cọc rõ rệt so với cây cùng lứa.',
    checklist: [
      'Lớp vỏ ở phần gốc ghép phía dưới bị nứt nẻ, bong từng dải dài.',
      'Cây phát triển chậm, tán thấp nhỏ còi cọc dù chăm sóc bình thường.',
      'Không thấy chảy nhựa thối mùi hôi như bệnh Phytophthora.',
    ],
    causes: 'Viroid Citrus Exocortis (CEVd), lây lan rất mạnh qua kéo cắt cành, dao ghép không khử trùng.',
    favorableConditions: 'Dùng kéo cắt tỉa từ cây bệnh sang cây khỏe mà không sát khuẩn dụng cụ.',
    preventionMethods: 'Dùng mắt ghép sạch bệnh; sát khuẩn dao kéo cắt tỉa bằng dung dịch Javel 1–2% khi chuyển sang cây khác.',
    safeManagement: 'Không nhân giống từ cây nhiễm bệnh; tách chăm sóc riêng và nhổ bỏ cây còi cọc nặng.',
    immediate: [
      'Khử trùng ngay dao kéo cắt cành bằng nước Javel pha loãng hoặc cồn trước khi tỉa cây khỏe kế bên.',
    ],
    biologicalAndCare: [
      'Chăm sóc dinh dưỡng cân đối và tuyệt đối không lấy cành chiết từ cây có triệu chứng bong vỏ gốc.',
    ],
    caution: [
      'Viroid bám rất dai trên lưỡi kéo cắt tỉa kim loại; lau bằng cồn thường không diệt sạch bằng ngâm dung dịch Javel loãng.',
    ],
    references: 'UC IPM Citrus Exocortis; USDA Citrus Certification Manual.',
    standardCode: 'QCVN Cây giống sạch bệnh',
  },
  {
    id: 'citrus_nematode',
    cropType: 'citrus',
    vietnameseName: 'Tuyến trùng rễ cam quýt / Suy thoái chậm (Citrus Nematode)',
    englishName: 'Citrus Nematode (Tylenchulus semipenetrans)',
    affectedPlantParts: ['other', 'leaf'],
    symptoms:
      'Cây suy thoái chậm kéo dài nhiều năm ("Slow Decline"): lá nhỏ, hơi vàng nhợt, héo rũ nhẹ vào buổi trưa nắng, quả nhỏ ít nước. Nhổ rễ tơ thấy rễ thô ngắn, bám dính đầy các hạt đất nhỏ rửa nước cũng khó trôi hết do chất nhầy trứng tuyến trùng.',
    checklist: [
      'Cây còi cọc dần qua từng vụ, lá thưa và nhỏ dần ở ngọn tán.',
      'Rửa nhẹ chùm rễ tơ dưới vòi nước vẫn thấy các hạt đất bám dính thành vỏ bọc quanh rễ con.',
      'Rễ tơ ít, đầu rễ sưng thô và chuyển màu nâu sẫm.',
    ],
    causes: 'Tuyến trùng Tylenchulus semipenetrans.',
    favorableConditions: 'Vườn trồng cam lâu năm trên nền đất cát pha, đất trồng tái canh nhiều lần không xử lý.',
    preventionMethods: 'Trồng cây giống sạch tuyến trùng; luân canh hoặc phơi đất trồng hoa vạn thọ, bón nhiều phân hữu cơ hoai mục.',
    safeManagement: 'Bón phân hữu cơ kết hợp chế phẩm sinh học nấm săn tuyến trùng (Paecilomyces lilacinus) và Trichoderma; dùng thuốc sinh học Abamectin/Chitosan tưới gốc khi mật độ cao.',
    immediate: [
      'Kiểm tra mẫu rễ tơ và đất vùng rễ tầng 10–30 cm ở những cây suy yếu kéo dài.',
    ],
    biologicalAndCare: [
      'Tăng cường bón phân chuồng hoai mục có ủ nấm đối kháng Paecilomyces và Trichoderma quanh vùng rễ.',
    ],
    caution: [
      'Không bứng cây con từ đất cũ đang nhiễm tuyến trùng sang trồng ở vườn mới.',
    ],
    references: 'UC IPM Citrus Nematode; Viện Bảo vệ Thực vật.',
    standardCode: 'TCVN IPM Tuyến trùng',
  },
  {
    id: 'citrus_snail_slug',
    cropType: 'citrus',
    vietnameseName: 'Ốc sên & Sên nhớt hại lộc non vỏ cam (Snails & Slugs)',
    englishName: 'Brown Garden Snail on Citrus',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Vào ban đêm hoặc sau mưa, ốc sên bò lên cắn gặm khuyết lá non, cạp tróc vỏ xanh ở chồi non và tạo vết gặm lõm sần sùi trên vỏ quả, để lại vệt dịch nhớt óng ánh bạc trên bề mặt lá quả.',
    checklist: [
      'Có vết gặm lỗ to trên lá non và vết sẹo lõm trên vỏ quả kèm vệt dịch nhớt khô óng ánh bạc.',
      'Thấy ốc sên bám ở mặt dưới lá, chạc cành hoặc ẩn dưới lớp cỏ rơm ẩm quanh gốc.',
    ],
    causes: 'Ốc sên đồng, sên trần nhớt.',
    favorableConditions: 'Mùa mưa ẩm ướt, vườn để cỏ rậm sát gốc và cành sát đất.',
    preventionMethods: 'Cắt tỉa cành cách mặt đất 50 cm, dọn sạch gạch đá/rác ẩm quanh gốc, quét vòng đồng hoặc vôi quanh thân.',
    safeManagement: 'Thu bắt thủ công vào sáng sớm/chiều tối hoặc đặt bả sinh học Iron Phosphate (Sắt Photphat) an toàn với vật nuôi quanh gốc.',
    immediate: [
      'Thu bắt ốc sên vào lúc chập tối hoặc sau cơn mưa và phát dọn cành chạm đất.',
    ],
    biologicalAndCare: [
      'Rải vòng vôi bột mỏng hoặc đặt bả sinh học gốc Sắt Photphat quanh gốc cây non.',
    ],
    caution: [
      'Hạn chế rải thuốc ốc chứa Metaldehyde ở vườn có thả gà vịt hoặc gần nguồn nước sinh hoạt.',
    ],
    references: 'UC IPM Citrus Snails and Slugs.',
    standardCode: 'TCVN IPM Cây ăn quả',
  },
  {
    id: 'citrus_woolly_whitefly',
    cropType: 'citrus',
    vietnameseName: 'Bọ phấn trắng bông hại mặt dưới lá cam (Woolly Whitefly)',
    englishName: 'Citrus Woolly Whitefly (Aleurothrixus floccosus)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Mặt dưới lá non có nhiều cụm tơ trắng xoắn như sợi len bông bọc lấy ấu trùng bọ phấn và giọt mật dính. Gây lá quăn, phát sinh nấm bồ hóng đen kịt trên lá tầng dưới.',
    checklist: [
      'Mặt dưới lá phủ các mảng tơ xoắn màu trắng giống sợi len bông.',
      'Chạm tay vào cụm bông thấy dính nhớt và bay lên các con bọ phấn trắng nhỏ xíu.',
      'Mặt trên các lá phía dưới phủ đầy nấm muội đen.',
    ],
    causes: 'Bọ phấn trắng bông Aleurothrixus floccosus.',
    favorableConditions: 'Thời tiết nóng ẩm kéo dài, lạm dụng thuốc trừ sâu làm chết ong ký sinh Cales noacki.',
    preventionMethods: 'Tránh phun thuốc trừ sâu phổ rộng bừa bãi để bảo tồn ong ký sinh tự nhiên.',
    safeManagement: 'Dùng vòi nước xịt rửa mặt dưới lá; phun dầu khoáng nông nghiệp hoặc nước xà phòng sinh học.',
    immediate: [
      'Xịt rửa mạnh mặt dưới các lá bám dày lớp bông trắng và treo bẫy dính vàng.',
    ],
    biologicalAndCare: [
      'Phun dầu khoáng sinh học kết hợp bảo vệ thiên địch bọ rùa và ong ký sinh.',
    ],
    caution: [
      'Lớp sợi len bông ngăn thuốc thấm vào ấu trùng nên cần pha dầu khoáng hoặc chất bám dính sinh học.',
    ],
    references: 'UC IPM Woolly Whitefly on Citrus.',
    standardCode: 'TCVN IPM Cây có múi',
  },
  {
    id: 'citrus_leaf_beetle',
    cropType: 'citrus',
    vietnameseName: 'Bọ cánh cứng ăn lá non & cạp vỏ quả (Citrus Leaf Beetle)',
    englishName: 'Citrus Leaf-Eating Weevil & Beetle (Hypomeces squamosus)',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Bọ cánh cứng (như câu cấu xanh, bọ cánh cứng nâu) ăn khuyết mép lá non thành hình răng cưa nham nhở hoặc cạp xước vỏ quả non tạo vết sẹo thô.',
    checklist: [
      'Mép lá non bị ăn khuyết thành nhiều răng cưa nhỏ đều nhau.',
      'Thấy bọ câu cấu màu xanh ánh kim hoặc bọ cánh cứng bám trên chồi non (thường giả chết rơi xuống khi động vào).',
    ],
    causes: 'Bọ câu cấu xanh (Hypomeces squamosus) và bọ cánh cứng hại lá.',
    favorableConditions: 'Đầu mùa mưa tháng 4–6 khi bọ trưởng thành vũ hóa từ đất lên ăn lộc non.',
    preventionMethods: 'Xới xáo đất quanh gốc diệt nhộng đầu mùa mưa; rung cành trải bạt bắt vào sáng sớm.',
    safeManagement: 'Bắt thủ công lúc sáng sớm; phun nấm xanh Metarhizium hoặc dầu neem xua đuổi.',
    immediate: [
      'Rung nhẹ cành lộc non vào sáng sớm để thu bắt bọ giả chết rơi xuống bạt.',
    ],
    biologicalAndCare: [
      'Xới đất kết hợp rải chế phẩm nấm xanh Metarhizium quanh gốc đầu mùa mưa.',
    ],
    caution: [
      'Bọ có phản xạ buông mình giả chết rất nhanh khi thấy bóng người, nên đặt bạt phía dưới trước khi rung cành.',
    ],
    references: 'Viện Bảo vệ Thực vật Việt Nam.',
    standardCode: 'TCVN IPM Cây ăn quả',
  },
  {
    id: 'citrus_rind_borer',
    cropType: 'citrus',
    vietnameseName: 'Sâu đục vỏ quả / Ngài chích hút quả cam bưởi (Citrus Rind Borer)',
    englishName: 'Citrus Rind Borer (Prays endocarpa)',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Trên vỏ quả bưởi, cam xuất hiện các nốt u sần lồi cục bộ to bằng hạt đậu, trên đỉnh nốt sần có lỗ đục nhỏ xíu kèm ít phân sâu màu nâu sẫm (khác với vết loét không có lỗ đục). Nốt sần làm vỏ quả sần sùi mất giá trị.',
    checklist: [
      'Vỏ quả mọc nhiều u cục nổi sần màu xanh sẫm hoặc vàng nâu giống mụn cóc.',
      'Đỉnh u sần có lỗ nhỏ li ti rỉ nhựa hoặc phân sâu (cắt u vỏ thấy sâu non nhỏ bên trong lớp cùi trắng).',
    ],
    causes: 'Sâu non bướm Prays endocarpa (Citripestis sagittiferella).',
    favorableConditions: 'Giai đoạn quả non bằng quả chanh đến khi vỏ cứng, thời tiết ấm ẩm.',
    preventionMethods: 'Thu gom quả bị đục rụng sớm ngâm nước hoặc chôn lấp; bao quả bưởi ngay từ khi quả đường kính 4–5 cm.',
    safeManagement: 'Bắt và tiêu hủy quả nhiễm; treo bẫy pheromone hoặc bẫy đèn thu hút ngài trưởng thành; phun chế phẩm Bt hoặc dầu khoáng giai đoạn quả non.',
    immediate: [
      'Cắt bỏ các quả non đã mọc nhiều u sần và kiểm tra bao quả kịp thời cho các quả còn lại.',
    ],
    biologicalAndCare: [
      'Bao quả bằng túi chuyên dụng sau khi phun phòng chế phẩm sinh học Bt.',
    ],
    caution: [
      'Cần phân biệt với bệnh ghẻ sẹo (do nấm tạo lớp vảy xám nâu trên mặt chứ cắt ra không có sâu hay lỗ đục bên trong cùi).',
    ],
    references: 'Viện Cây ăn quả Miền Nam; CABI Prays endocarpa.',
    standardCode: 'TCVN IPM Bưởi & Cam',
  },
  {
    id: 'citrus_blue_mold',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Mốc xanh lam thối quả cam (Citrus Blue Mold)',
    englishName: 'Citrus Blue Mold (Penicillium italicum)',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Vết úng nước mềm nhũn trên vỏ quả nhanh chóng mọc lớp mốc tơ trắng bên ngoài và khối bào tử màu xanh lam (xanh nước biển) ở giữa, viền trắng xung quanh hẹp hơn so với mốc xanh lục. Lây lan nhanh giữa các quả tiếp xúc nhau trong kho.',
    checklist: [
      'Vỏ quả mềm nhũn có lớp bột bào tử màu xanh lam (xanh nước biển) ở tâm vết thối.',
      'Có thể lây sang quả lành nằm kế bên trong sọt bảo quản.',
    ],
    causes: 'Nấm Penicillium italicum.',
    favorableConditions: 'Quả bị trầy xước khi thu hoạch/vận chuyển, bảo quản ở nơi ẩm bí.',
    preventionMethods: 'Cắt cuống gọn không để cuống nhọn đâm vào quả khác; vệ sinh khử trùng sọt đựng quả.',
    safeManagement: 'Loại bỏ quả dập xước trước khi đóng gói; bảo quản thoáng mát ở nhiệt độ phù hợp.',
    immediate: [
      'Tách ngay các quả bắt đầu mềm nhũn hoặc mốc xanh lam ra khỏi sọt quả lành.',
    ],
    biologicalAndCare: [
      'Lau rửa khử trùng khu vực đóng gói và rổ đựng bằng nước sạch pha thuốc sát khuẩn an toàn thực phẩm.',
    ],
    caution: [
      'Chỉ một quả thối mốc xanh lam có thể làm hỏng cả thùng cam nếu để chung nhiều ngày.',
    ],
    references: 'UC Postharvest Technology Center.',
    standardCode: 'TCVN Bảo quản nông sản',
  },
  {
    id: 'citrus_damping_off',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Lở cổ rễ chết rạp cây con vườn ươm (Seedling Damping-Off)',
    englishName: 'Citrus Seedling Damping-Off (Rhizoctonia / Pythium)',
    affectedPlantParts: ['stem', 'other'],
    symptoms:
      'Cây cam con trong bầu ươm bị thắt tóp đen phần thân sát mặt giá thể, cây ngã gục hàng loạt trong khi lá vẫn còn xanh hoặc héo rũ nhanh chóng.',
    checklist: [
      'Thân cây con ngay sát mặt bầu đất bị thâm đen, teo tóp lại.',
      'Cây ngã rạp thành từng đám trong luống ươm sau tưới ẩm.',
    ],
    causes: 'Nấm Rhizoctonia solani, Pythium spp. và Phytophthora trong giá thể chưa xử lý.',
    favorableConditions: 'Giá thể ươm quá ẩm, gieo hạt quá dày, che nắng quá tối.',
    preventionMethods: 'Trộn nấm Trichoderma vào giá thể bầu ươm; không tưới nước quá đẫm vào chiều tối.',
    safeManagement: 'Tách loại bầu cây bệnh; tưới giảm ẩm và bổ sung chế phẩm Trichoderma hoặc gốc đồng liều nhẹ cho vườn ươm.',
    immediate: [
      'Ngưng tưới 1–2 ngày, loại bỏ ngay các bầu cây đã gục chết và giãn thưa khoảng cách bầu.',
    ],
    biologicalAndCare: [
      'Tưới bổ sung nấm đối kháng Trichoderma vào toàn bộ các bầu cây còn lại.',
    ],
    caution: [
      'Không lấy đất vườn cam cũ chưa phơi ải xử lý vôi để đóng bầu ươm cây giống.',
    ],
    references: 'Viện Bảo vệ Thực vật; USDA Citrus Nursery Guide.',
    standardCode: 'QCVN Vườn ươm cây có múi',
  },
  {
    id: 'citrus_deficiency_nitrogen',
    cropType: 'citrus',
    vietnameseName: 'Thiếu Đạm (N) làm vàng lá đồng loạt trên cam bưởi',
    englishName: 'Nitrogen Deficiency on Citrus',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Toàn bộ phiến lá (cả gân lá lẫn thịt lá) chuyển sang màu xanh nhạt rồi vàng đều đồng nhất, bắt đầu từ các lá già phía dưới trước. Cây còi cọc, cành non mảnh, ít hoa và tỷ lệ đậu quả kém.',
    checklist: [
      'Lá vàng đều từ đầu đến cuống kể cả phần gân lá (không có kiểu loang lổ xanh-vàng lệch gân).',
      'Xuất hiện trước ở các lá già bên dưới, sau lan dần lên lá non.',
      'Lộc mới ra thưa, nhỏ lá và sinh trưởng chậm.',
    ],
    causes: 'Thiếu dinh dưỡng Đạm (N), đất rửa trôi sau mưa lũ hoặc rễ kém hấp thu.',
    favorableConditions: 'Vườn đất cát nghèo hữu cơ, sau mưa lũ kéo dài hoặc không bón phục hồi sau thu hoạch.',
    preventionMethods: 'Chia nhiều lần bón phân hữu cơ kết hợp NPK cân đối theo từng giai đoạn lộc - hoa - nuôi quả.',
    safeManagement: 'Bổ sung phân hữu cơ hoai mục, phân cá thủy phân hoặc bón bổ sung Urê/SA đúng liều chia nhỏ lần tưới kết hợp kiểm tra bộ rễ.',
    immediate: [
      'Kiểm tra xem rễ cây có bị úng thối không trước khi bón phân.',
      'Nếu rễ khỏe, phun phân bón lá giàu đạm hữu cơ/amino acid giúp lá nhanh xanh trở lại.',
    ],
    biologicalAndCare: [
      'Bón bổ sung phân hữu cơ hoai mục kết hợp NPK cân đối quanh tán cây khi đất đủ ẩm.',
    ],
    caution: [
      'Tránh bón dồn lượng đạm quá lớn một lần dễ làm cây ra lộc non bùng phát sâu vẽ bùa và bệnh loét.',
    ],
    references: 'UF/IFAS Citrus Nutrition Guide; Viện Thổ nhưỡng Nông hóa.',
    standardCode: 'TCVN Dinh dưỡng cây có múi',
  },
  {
    id: 'citrus_deficiency_phosphorus',
    cropType: 'citrus',
    vietnameseName: 'Thiếu Lân (P) trên cây cam bưởi',
    englishName: 'Phosphorus Deficiency on Citrus',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Lá già xỉn màu xanh tối hơi ánh đồng hoặc tím đỏ nhẹ, lá nhỏ hẹp, cây ra hoa ít. Quả cam bưởi có vỏ dày xốp, ruột khô ít nước, vị chua gắt và lõi quả thường bị xốp bọng.',
    checklist: [
      'Lá già mất độ bóng, chuyển màu xanh xỉn pha ánh đồng tím nhẹ và dễ rụng sớm.',
      'Quả thu hoạch có vỏ rất dày, múi khô xốp ít nước.',
    ],
    causes: 'Thiếu Lân (P) dễ tiêu do đất quá chua (pH < 5,0) làm cố định lân.',
    favorableConditions: 'Đất đồi feralit chua vùng Nghệ An, Hà Tĩnh không bón vôi và lân định kỳ.',
    preventionMethods: 'Bón vôi cải tạo pH đất lên 5,5–6,5 kết hợp phân lân nung chảy / super lân trộn cùng phân chuồng hoai.',
    safeManagement: 'Rải vôi nông nghiệp đầu mùa mưa, sau 15 ngày bón lân kết hợp phân hữu cơ vi sinh giúp giải phóng lân.',
    immediate: [
      'Đo hoặc kiểm tra độ chua đất vườn; bón lót vôi cải tạo pH nếu đất chua.',
    ],
    biologicalAndCare: [
      'Bổ sung phân hữu cơ ủ vi sinh phân giải lân kết hợp lân nung chảy.',
    ],
    caution: [
      'Nếu đất quá chua mà chỉ bón phân lân hóa học thì lân sẽ nhanh chóng bị keo đất giữ chặt, cây vẫn không ăn được.',
    ],
    references: 'Viện Thổ nhưỡng Nông hóa; UF/IFAS Citrus Nutrition.',
    standardCode: 'TCVN Dinh dưỡng cây có múi',
  },
  {
    id: 'citrus_deficiency_potassium',
    cropType: 'citrus',
    vietnameseName: 'Thiếu Kali (K) gây cháy mép lá & quả nhỏ cam bưởi',
    englishName: 'Potassium Deficiency on Citrus',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Lá già uốn cong xoắn nhẹ, chóp và mép lá ngả vàng đồng rồi cháy khô màu nâu; cây rụng lá nhiều và rụng quả non trước khi chín. Quả nhỏ, vỏ mỏng nhưng dễ bị nứt quả khi gặp mưa.',
    checklist: [
      'Vàng và cháy khô từ đầu chóp hoặc mép các lá già trên cành mang nhiều quả.',
      'Quả nhỏ hơn bình thường, dễ bị rụng hoặc nứt vỏ.',
    ],
    causes: 'Thiếu Kali (K), thường xảy ra ở cây mang quá nhiều quả mà bón ít kali.',
    favorableConditions: 'Giai đoạn nuôi quả lớn tích đường (tháng 7–10) trên đất cát nghèo dinh dưỡng.',
    preventionMethods: 'Bón đủ phân Kali (Kali Sunfat hoặc Kali Clorua phù hợp giai đoạn) chia đều lúc quả lớn.',
    safeManagement: 'Bổ sung Kali Sunfat (K2SO4) hoặc tro bếp sạch ủ phân hữu cơ kết hợp phun phân bón lá giàu Kali trung lượng.',
    immediate: [
      'Bón bổ sung ngay Kali Sunfat quanh tán và tưới đủ nước cho cây hấp thu.',
    ],
    biologicalAndCare: [
      'Tỉa bớt quả còi trên các cành quá sai quả để tập trung dinh dưỡng.',
    ],
    caution: [
      'Không nhầm cháy mép lá do thiếu Kali với bệnh Bạc lá hay cháy nắng do phun thuốc quá liều.',
    ],
    references: 'UF/IFAS Citrus Nutrition Guide.',
    standardCode: 'TCVN Dinh dưỡng cây có múi',
  },
  {
    id: 'citrus_deficiency_zinc',
    cropType: 'citrus',
    vietnameseName: 'Thiếu Kẽm (Zn) làm lá nhỏ vàng gân xanh đối xứng (Cam bưởi)',
    englishName: 'Zinc Deficiency (Mottle-Leaf) on Citrus',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Lá non mọc nhỏ hẹp, đầu nhọn, chồi ngắn co cụm dạng chổi. Trên phiến lá có các mảng vàng sáng nằm giữa các gân phụ ĐỐI XỨNG RÕ RỆT hai bên gân chính (trong khi các dải hẹp dọc gân chính vẫn giữ màu xanh đậm, rất dễ nhầm với bệnh Vàng lá gân xanh HLB).',
    checklist: [
      'Các dải vàng nằm đối xứng đều nhau giữa các xương gân lá (hình xương cá rất cân đối).',
      'Xảy ra đồng loạt trên các lá non của nhiều cành phía hướng nắng.',
      'Khác với HLB: HLB vàng loang lổ BẤT ĐỐI XỨNG và làm gân lá sưng nổi bần gồ ghề.',
    ],
    causes: 'Thiếu vi lượng Kẽm (Zn) do đất bạc màu, đất pH quá cao (>7,5) hoặc bón thừa quá nhiều Lân.',
    favorableConditions: 'Đất cát pha rửa trôi, lạm dụng phân lân đơn kéo dài hoặc sau mùa mưa bão.',
    preventionMethods: 'Bón phân hữu cơ định kỳ và phun bổ sung vi lượng tổng hợp (Zn, Mg, Bo) vào các đợt lộc non.',
    safeManagement: 'Phun qua lá phân vi lượng Kẽm Chelate (Zn-EDTA) hoặc Kẽm Sunfat trung tính vào các đợt lá non vừa mở phiến 2–3 lần cách nhau 10–14 ngày.',
    immediate: [
      'So sánh kỹ 2 bên gân chính: nếu vàng đối xứng đều như hình xương cá và cây không có rầy chổng cánh -> phun thử phân lá Kẽm Chelate lên 1–2 cành để kiểm chứng hồi xanh sau 2 tuần.',
    ],
    biologicalAndCare: [
      'Phun phân bón lá chứa Kẽm (Zn-EDTA) vào sáng sớm hoặc chiều mát khi lộc non mở 2/3 kích thước.',
    ],
    caution: [
      'Rất hay bị chẩn đoán nhầm thành bệnh HLB; luôn kiểm tra tính ĐỐI XỨNG của vết vàng và tình trạng rầy chổng cánh trước khi chặt bỏ cây.',
    ],
    references: 'UC IPM Citrus Zinc Deficiency; Viện ASIR Bắc Trung Bộ.',
    standardCode: 'TCVN Vi lượng cây có múi',
  },
  {
    id: 'citrus_deficiency_magnesium',
    cropType: 'citrus',
    vietnameseName: 'Thiếu Magie (Mg) vàng hình chữ V ngược trên lá già cam bưởi',
    englishName: 'Magnesium Deficiency on Citrus',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Xuất hiện trên các lá già gần chùm quả: phần thịt lá hai bên mép và chóp lá chuyển màu vàng rực, chừa lại vùng màu xanh đậm hình chữ V ngược (hình tam giác cân) ở phần gốc cuống lá.',
    checklist: [
      'Phần xanh đậm còn lại ở gốc cuống lá tạo thành hình tam giác / chữ V ngược rất đặc trưng.',
      'Chỉ bị trên lá già, nhất là lá nằm cạnh chùm nhiều quả; lá non trên ngọn vẫn xanh.',
    ],
    causes: 'Thiếu trung lượng Magie (Mg) do đất chua nghèo Mg hoặc bón quá nhiều Kali cạnh tranh hấp thu Mg.',
    favorableConditions: 'Đất cát chua vùng đồi, cây nuôi nhiều quả vụ thu hoạch.',
    preventionMethods: 'Bón vôi Dolomite (chứa cả Ca và Mg) định kỳ hàng năm.',
    safeManagement: 'Bón Dolomite vào gốc kết hợp phun phân bón lá Magie Sunfat (MgSO4) hoặc Magie Nitrat qua tán.',
    immediate: [
      'Phun bổ sung phân trung lượng chứa Magie qua lá vào chiều mát để chặn rụng lá già nuôi quả.',
    ],
    biologicalAndCare: [
      'Rải vôi Dolomite cải tạo đất vào đầu mùa mưa thay vì chỉ dùng vôi nung CaO đơn thuần.',
    ],
    caution: [
      'Tránh bón dư Kali quá mức khi chưa cân đối Magie trong đất.',
    ],
    references: 'UF/IFAS Citrus Magnesium Deficiency.',
    standardCode: 'TCVN Dinh dưỡng cây có múi',
  },
  {
    id: 'citrus_deficiency_iron',
    cropType: 'citrus',
    vietnameseName: 'Thiếu Sắt (Fe) làm lá non trắng bệch nổi mạng lưới gân xanh',
    englishName: 'Iron Chlorosis on Citrus',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Chỉ xảy ra trên các lá NON mới ra: toàn bộ thịt lá chuyển màu vàng chanh đến trắng bệch, trong khi hệ thống gân chính và gân phụ nhỏ li ti vẫn giữ màu xanh nổi lên thành mạng lưới cực kỳ rõ nét.',
    checklist: [
      'Xảy ra TRÊN LÁ NON mới ra ở đỉnh cành (lá già bên dưới vẫn xanh).',
      'Thịt lá vàng sáng hoặc gần trắng nhưng toàn bộ mạng lưới gân lá nhỏ vẫn xanh nét.',
    ],
    causes: 'Thiếu Sắt (Fe) hữu hiệu do đất kiềm (bón quá nhiều vôi), đất úng bí hoặc rễ tơ bị lạnh/hư.',
    favorableConditions: 'Đất bón quá nhiều vôi nâng pH > 7,2, đất úng nước kéo dài mùa mưa.',
    preventionMethods: 'Kiểm soát lượng vôi bón đúng độ pH đất (5,5–6,5), giữ đất tơi xốp thoát nước tốt.',
    safeManagement: 'Phun phân vi lượng Sắt Chelate (Fe-EDDHA hoặc Fe-EDTA) qua lá non và tưới cải tạo rễ.',
    immediate: [
      'Ngưng bón thêm vôi và kiểm tra độ thoát nước gốc cây.',
      'Phun phân bón lá chứa Sắt Chelate 2 lần cách nhau 10 ngày.',
    ],
    biologicalAndCare: [
      'Tăng cường phân hữu cơ hoai mục giúp pH đất ổn định và rễ dễ hấp thu vi lượng.',
    ],
    caution: [
      'Không nhầm thiếu Sắt (bị trên lá non, gân nhỏ xanh nét) với thiếu Magie (chữ V ngược trên lá già).',
    ],
    references: 'UC IPM Citrus Iron Deficiency.',
    standardCode: 'TCVN Vi lượng cây có múi',
  },
  {
    id: 'citrus_deficiency_boron',
    cropType: 'citrus',
    vietnameseName: 'Thiếu Bo (B) gây quả cứng sượng, chảy nhựa trong ruột & nứt quả',
    englishName: 'Boron Deficiency (Hard Fruit) on Citrus',
    affectedPlantParts: ['fruit', 'leaf'],
    symptoms:
      'Quả non biến dạng nhỏ cứng ("quả đá"), vỏ dày sượng không đều; cắt ngang quả thấy các đốm nhựa màu nâu đọng trong phần cùi trắng và trục lõi giữa, hạt lép thui đen. Lá dày giòn, cong xuống dưới, gân chính phồng nứt hóa bần.',
    checklist: [
      'Quả cứng, méo mó, cắt ra thấy các đốm nhựa nâu sẫm trong phần cùi trắng (không phải do sâu đục).',
      'Gân giữa mặt trên lá dày nứt hóa bần và lá uốn cong ngược về phía dưới.',
      'Cây hay bị rụng hoa rụng quả non hàng loạt lúc hạn hán.',
    ],
    causes: 'Thiếu vi lượng Bo (B) do đất cát nghèo mùn và hạn hán kéo dài làm cây không hút được Bo.',
    favorableConditions: 'Vườn cam đất đồi khô hạn mùa nắng gió Lào không đủ ẩm.',
    preventionMethods: 'Giữ ẩm gốc mùa khô bằng phủ rơm cỏ; phun bổ sung Bo hữu cơ/chelate trước khi ra hoa và lúc quả nhỏ.',
    safeManagement: 'Phun phân bón lá chứa Bo (Solubor / Canxi-Bo) đúng liều lượng lúc chuẩn bị phân hóa mầm hoa và sau đậu quả.',
    immediate: [
      'Tưới đủ ẩm đất và phun bổ sung Canxi-Bo qua tán vào lúc chiều mát.',
    ],
    biologicalAndCare: [
      'Bổ sung phân hữu cơ giữ ẩm cho vùng rễ để cây hấp thu Bo ổn định tự nhiên.',
    ],
    caution: [
      'Ngưỡng an toàn giữa thiếu Bo và NGỘ ĐỘC Bo rất hẹp — tuyệt đối không pha quá liều khuyến cáo trên bao bì vì sẽ gây cháy rụng lá.',
    ],
    references: 'UF/IFAS Boron Deficiency in Citrus; Viện ASIR.',
    standardCode: 'TCVN Vi lượng cây có múi',
  },

  // =========================================================================
  // II. CÂY LÚA NƯỚC (+35 BỆNH / SÂU HẠI / SINH LÝ DINH DƯỠNG)
  // =========================================================================
  {
    id: 'rice_whitebacked_planthopper',
    cropType: 'rice',
    vietnameseName: 'Rầy lưng trắng hại lúa (White-Backed Planthopper)',
    englishName: 'White-Backed Planthopper (Sogatella furcifera)',
    affectedPlantParts: ['stem', 'leaf'],
    symptoms:
      'Rầy nhỏ màu đen xám có dải sọc trắng rõ chạy dọc giữa lưng, tụ tập chích hút ở phần gốc và bẹ lá lúa làm cây mất sức, vàng lá, nặng gây "cháy rầy" giống rầy nâu và truyền virus bệnh Lùn sọc đen phương Nam.',
    checklist: [
      'Con rầy trưởng thành bám ở gốc thân lúa có vệt sọc trắng sáng rõ ở giữa lưng.',
      'Xuất hiện sớm từ giai đoạn lúa đẻ nhánh đến làm đòng.',
      'Có lớp mật ngọt và muội đen bám quanh bẹ lúa gần gốc.',
    ],
    causes: 'Rầy lưng trắng Sogatella furcifera.',
    favorableConditions: 'Vụ Hè Thu hoặc lúa bón thừa đạm, ruộng rậm rạp âm u, thời tiết ấm ẩm 25–30°C.',
    preventionMethods: 'Sạ cấy mật độ vừa phải, bón phân cân đối, không lạm dụng thuốc sâu sớm để bảo vệ nhện và bọ rùa.',
    safeManagement: 'Giữ mực nước vừa phải; khi mật độ vượt ngưỡng (>1.500–2.000 con/m²) phun nấm xanh Metarhizium hoặc thuốc đặc trị rầy nội hấp đúng liều.',
    immediate: [
      'Vạch gốc khóm lúa kiểm tra tỷ lệ rầy lưng trắng và xem lúa có triệu chứng xoắn lá xanh đậm (Lùn sọc đen) không.',
    ],
    biologicalAndCare: [
      'Phun chế phẩm nấm xanh Metarhizium hoặc hoạt chất trừ rầy chọn lọc vào sát phần gốc thân lúa.',
    ],
    caution: [
      'Khi lúa còn nhỏ dưới 40 ngày, tránh phun thuốc phổ rộng diệt thiên địch làm rầy lứa sau bùng phát mạnh hơn.',
    ],
    references: 'Cục Bảo vệ Thực vật; IRRI Rice Knowledge Bank.',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
  },
  {
    id: 'rice_southern_black_streaked_dwarf',
    cropType: 'rice',
    vietnameseName: 'Bệnh Lùn sọc đen phương Nam hại lúa (SRBSDV)',
    englishName: 'Southern Rice Black-Streaked Dwarf Virus',
    affectedPlantParts: ['stem', 'leaf'],
    symptoms:
      'Khóm lúa lùn thấp lè tè, lá có màu xanh ĐẬM bất thường, lá ngắn dày cứng và hơi xoắn vặn ở gốc lá. Mặt sau gân lá và bẹ lúa nổi lên các u sáp nhỏ chạy dọc thành sọc màu trắng sau chuyển nâu đen; trên đốt thân có thể mọc rễ phụ và đẻ nhánh trên đốt.',
    checklist: [
      'Cây lúa thấp lùn hẳn xuống nhưng lá màu XANH ĐẬM cứng giòn (khác với vàng lùn lá màu cam).',
      'Vuốt dọc mặt sau gân lá và bẹ lúa thấy gờ u sưng chạy sọc dọc màu trắng hoặc đen.',
      'Các đốt thân gần gốc có rễ phụ mọc tua tủa hoặc đẻ nhánh phụ trên đốt.',
    ],
    causes: 'Virus SRBSDV do rầy lưng trắng di trú truyền từ lúa chét, cỏ dại sang lúa non.',
    favorableConditions: 'Vụ Mùa và Vụ Xuân có đợt rầy lưng trắng mang virus bay rộ khi lúa đang mạ đến đẻ nhánh.',
    preventionMethods: 'Cày vùi sạch lúa chét cỏ bờ; gieo sạ né rầy; che phủ nilon mạ xuân.',
    safeManagement: 'Phun trừ ngay rầy lưng trắng khi phát hiện trên đồng; nhổ vùi sâu xuống bùn ngay những khóm bị lùn sọc đen sớm khi tỷ lệ <10%.',
    immediate: [
      'Nhổ bỏ vùi sâu xuống bùn các khóm lúa bị lùn xanh đậm có u sưng sọc đen để chặn nguồn rầy chích lây lan.',
      'Phun trừ rầy lưng trắng trên toàn ruộng theo khuyến cáo của trạm BVTV địa phương.',
    ],
    biologicalAndCare: [
      'Chăm sóc giữ ấm và bón thêm lân/kali giúp các khóm khỏe còn lại đẻ nhánh bù.',
    ],
    caution: [
      'Bệnh do virus không có thuốc chữa khỏi khóm đã lùn; tuyệt đối không giữ khóm bệnh trên ruộng làm ổ virus.',
    ],
    references: 'Cục Bảo vệ Thực vật Việt Nam; Viện BVTV.',
    standardCode: 'QCVN Quản lý Lùn sọc đen',
  },
  {
    id: 'rice_ragged_stunt_grassy_stunt',
    cropType: 'rice',
    vietnameseName: 'Bệnh Lùn xoắn lá hại lúa (Rice Ragged Stunt)',
    englishName: 'Rice Ragged Stunt Virus (RRSV)',
    affectedPlantParts: ['leaf', 'stem'],
    symptoms:
      'Cây lúa thấp lùn, lá màu xanh đậm và ngắn lại; mép lá bị rách lởm chởm răng cưa ("rách mép") và chóp lá xoắn vặn như lò xo. Mặt dưới gân lá sưng phù, trỗ bông nghẹn không thoát hết.',
    checklist: [
      'Mép lá lúa bị rách khuyết nham nhở răng cưa dù không thấy sâu cắn.',
      'Đầu chóp lá xoắn xoáy tròn và lá ngắn dày màu xanh sẫm.',
      'Xuất hiện đồng thời với sự có mặt của rầy nâu trên ruộng.',
    ],
    causes: 'Virus RRSV do rầy nâu (Nilaparvata lugens) truyền.',
    favorableConditions: 'Ruộng gieo sạ liên tục gối vụ nhiều trà, mật độ rầy nâu mang virus cao.',
    preventionMethods: 'Áp dụng gieo sạ đồng loạt né rầy, vệ sinh rơm rạ lúa chét giữa hai vụ ít nhất 20 ngày.',
    safeManagement: 'Kiểm soát rầy nâu kịp thời và nhổ tiêu hủy các khóm lùn xoắn lá sớm.',
    immediate: [
      'Kiểm tra mật độ rầy nâu ở gốc lúa và nhổ vùi khóm bị xoắn lá rách mép.',
    ],
    biologicalAndCare: [
      'Thăm đồng thường xuyên giai đoạn 15–45 ngày sau sạ để chặn lứa rầy nâu di trú.',
    ],
    caution: [
      'Phun phân bón lá kích thích không thể làm cây bị virus trỗ thoát hay phục hồi bình thường.',
    ],
    references: 'IRRI Rice Ragged Stunt Guide; Cục BVTV.',
    standardCode: 'TCVN Quản lý Virus hại lúa',
  },
  {
    id: 'rice_stem_rot',
    cropType: 'rice',
    vietnameseName: 'Bệnh Tiêm hạch / Thối thân bẹ lúa (Rice Stem Rot)',
    englishName: 'Rice Stem Rot (Sclerotium oryzae)',
    affectedPlantParts: ['stem'],
    symptoms:
      'Bẹ lá ngoài sát mực nước xuất hiện các vết đốm đen dài chạy dọc, sau đó lan vào làm thân lúa mềm thối mục đen. Tách bẹ lúa thấy dày đặc các hạt hạch nấm nhỏ li ti tròn bóng màu đen như hạt cải bám bên trong khoang thân.',
    checklist: [
      'Thân và bẹ lúa ngang mực nước bị thâm đen, dễ đổ ngã gãy ngang gốc trước thu hoạch.',
      'Xé dọc thân hoặc bẹ lúa thấy rất nhiều hạch nấm tròn đen nhỏ li ti như đầu kim.',
    ],
    causes: 'Nấm Magnaporthe salvinii (Sclerotium oryzae).',
    favorableConditions: 'Ruộng ngập nước sâu liên tục, bón thừa đạm thiếu Kali, nhiều rơm rạ mục.',
    preventionMethods: 'Rút nước phơi ruộng xen kẽ (tưới ướt khô xen kẽ), bón đủ Kali giúp cứng cây, cày vùi rơm rạ với Trichoderma.',
    safeManagement: 'Rút cạn nước ruộng để giữ gốc khô ráo; phun Validamycin hoặc Difenoconazole vào phần gốc thân khi bệnh mới xuất hiện.',
    immediate: [
      'Tháo bớt nước trong ruộng xuống mức nông hoặc rút cạn nhẹ để mặt bùn se ráo.',
    ],
    biologicalAndCare: [
      'Bổ sung phân Kali kết hợp chế phẩm nấm đối kháng Trichoderma phân hủy rơm rạ sau thu hoạch.',
    ],
    caution: [
      'Hạch nấm nổi trên mặt nước có thể trôi sang ruộng lân cận và tồn tại nhiều năm trong đất.',
    ],
    references: 'IRRI Stem Rot Compendium; Viện Lúa ĐBSCL.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_iron_toxicity_root_suffocation',
    cropType: 'rice',
    vietnameseName: 'Bệnh Ngộ độc phèn / Nghẹt rễ lúa (Vàng đỏ lá sinh lý)',
    englishName: 'Iron Toxicity & Root Suffocation in Rice',
    affectedPlantParts: ['leaf', 'other'],
    symptoms:
      'Trên lá già xuất hiện nhiều chấm nhỏ màu nâu đỏ gỉ sắt từ chóp lá lan xuống, sau cả lá chuyển màu vàng cam hoặc nâu đỏ ("bệnh vàng đỏ lá / lúa bị bầm"). Nhổ khóm lúa lên thấy rễ có màu nâu đen hoặc vàng phèn phủ lớp gỉ sắt, có mùi trứng thối, ít rễ trắng mới.',
    checklist: [
      'Chấm nhỏ nâu đỏ gỉ sắt rải rác từ chóp lá già lan dần xuống giữa lá, không có tâm xám như đạo ôn.',
      'Nhổ khóm lúa lên thấy rễ màu đen sẫm hoặc vàng gỉ phèn bết bùn, ngửi có mùi hôi chua.',
      'Thường bị thành từng chòm ở chỗ ruộng trũng hoặc sau khi nắng gắt xen mưa đầu vụ.',
    ],
    causes: 'Đất chua phèn giàu sắt (Fe2+) khử hoặc đất yếm khí sinh khí độc H2S làm nghẹt rễ.',
    favorableConditions: 'Ruộng trũng thoát phèn kém, đất vùi rơm rạ tươi chưa hoai mục khi cấy.',
    preventionMethods: 'Cày bừa sục bùn rửa phèn, bón vôi lót và lân nung chảy, ủ rơm rạ bằng Trichoderma.',
    safeManagement: 'Tháo thay nước mới để rửa độc chất vùng rễ, rải vôi bột hoặc lân nung chảy kết hợp sục bùn; phun phân bón lá giàu Lân-Kali-Kẽm giúp rễ ra trắng mới.',
    immediate: [
      'Tháo cạn bớt nước cũ chua phèn rồi lấy nước ngọt mới vào ruộng ngay để rửa phèn.',
      'Tạm ngưng bón phân Urê vì đạm làm rễ ngộ độc thêm.',
    ],
    biologicalAndCare: [
      'Bón thêm phân Lân (super lân hoặc lân nung chảy) kết hợp phân bón lá kích ra rễ trắng.',
    ],
    caution: [
      'Rất dễ nhầm với bệnh Đốm nâu hoặc Đạo ôn; tuyệt đối phải nhổ kiểm tra bộ rễ xem rễ trắng hay rễ đen hôi trước khi phun thuốc nấm.',
    ],
    references: 'Viện KHKT Nông nghiệp Bắc Trung Bộ; IRRI Iron Toxicity.',
    standardCode: 'TCVN Cải tạo đất lúa',
  },
  {
    id: 'rice_organic_toxicity',
    cropType: 'rice',
    vietnameseName: 'Ngộ độc hữu cơ lúa mới cấy/sạ (Organic Acid Toxicity)',
    englishName: 'Organic Toxicity (H2S / Acetic Acid Injury)',
    affectedPlantParts: ['other', 'leaf'],
    symptoms:
      'Lúa 10–25 ngày sau sạ/cấy ngừng đẻ nhánh, đứng cây không phát triển, lá già vàng đỏ từ chóp rồi khô héo. Rễ lúa đen tuyền toàn bộ, mềm nhũn và có mùi hôi bùn thối đặc trưng.',
    checklist: [
      'Ruộng mới cày vùi nhiều rơm rạ tươi của vụ trước chưa kịp phân hủy.',
      'Rễ lúa đen sẫm toàn bộ và bốc mùi hôi thối như cống rãnh khi nhổ lên.',
      'Cây lúa còi cọc không ra rễ trắng và không đẻ nhánh mới.',
    ],
    causes: 'Rơm rạ tươi phân hủy yếm khí dưới nước sinh axit hữu cơ và khí H2S gây chết rễ.',
    favorableConditions: 'Gieo sạ vụ Hè Thu hoặc Vụ Mùa liền kề ngay sau thu hoạch vụ trước mà không kịp thời gian phân hủy rơm rạ.',
    preventionMethods: 'Dùng chế phẩm Trichoderma hoặc vôi xử lý rơm rạ ngay sau thu hoạch ít nhất 2–3 tuần trước khi gieo.',
    safeManagement: 'Tháo cạn nước phơi ruộng cho nứt chân chim 3–5 ngày để thoát khí độc H2S và oxy hóa vùng rễ, sau đó đưa nước sạch vào và bón lân + kích rễ.',
    immediate: [
      'Tháo cạn hết nước ruộng ngay để bùn tiếp xúc với oxy không khí trong 3–4 ngày.',
    ],
    biologicalAndCare: [
      'Khi thấy lá hơi hồi xanh thì lấy nước mới vào, bón super lân + phân bón lá kích rễ.',
    ],
    caution: [
      'Không giữ nước ngập sâu và không bón thêm phân chuồng tươi hay đạm khi lúa đang ngộ độc hữu cơ.',
    ],
    references: 'Viện Lúa ĐBSCL; Cục Trồng trọt.',
    standardCode: 'TCVN Canh tác lúa bền vững',
  },
  {
    id: 'rice_grain_discoloration',
    cropType: 'rice',
    vietnameseName: 'Bệnh Lem lép hạt lúa (Grain Discoloration Complex)',
    englishName: 'Rice Grain Discoloration / Dirty Panicle',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Vỏ trấu hạt lúa xuất hiện các đốm nâu, đen, tím sẫm hoặc trắng xám loang lổ, hạt bị lép lửng hoặc đen nhân gạo bên trong khi xay xát.',
    checklist: [
      'Nhiều hạt trên bông có vỏ trấu biến màu nâu đen hoặc loang lổ mốc xám.',
      'Hạt lúa nhẹ, bị lép hoặc gạo bên trong có vết đen/vỡ vụn.',
    ],
    causes: 'Phức hợp nhiều nấm (Bipolaris, Curvularia, Fusarium, Sarocladium, Alternaria) và vi khuẩn kết hợp nhện gié chích hút.',
    favorableConditions: 'Mưa dầm kéo dài đúng lúc lúa trỗ bông phơi màu và vào chắc, ẩm độ cao >85%.',
    preventionMethods: 'Sử dụng giống sạch bệnh, không bón thừa đạm giai đoạn đón đòng, xử lý hạt giống trước gieo.',
    safeManagement: 'Phun phòng trừ 2 lần ở giai đoạn lúa trỗ lác đác 5% và khi lúa trỗ đều bằng hoạt chất Propiconazole, Difenoconazole hoặc Azoxystrobin kết hợp kiểm tra nhện gié.',
    immediate: [
      'Kiểm tra xem trên bông lúa có nhện gié hay bọ xít hôi đi kèm không để xử lý đồng bộ.',
    ],
    biologicalAndCare: [
      'Phun phòng trừ ở giai đoạn trỗ lác đác và trỗ thoát đều, kết hợp phân bón lá Kali-Silic giúp vỏ trấu dày chắc.',
    ],
    caution: [
      'Phun khi hạt lúa đã chín đỏ đuôi sẽ không kịp phục hồi vỏ trấu đã bị lem đen.',
    ],
    references: 'Viện Bảo vệ Thực vật; IRRI Dirty Panicle Guide.',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
  },
  {
    id: 'rice_sheath_rot',
    cropType: 'rice',
    vietnameseName: 'Bệnh Thối bẹ lá cờ hại lúa (Rice Sheath Rot)',
    englishName: 'Rice Sheath Rot (Sarocladium oryzae)',
    affectedPlantParts: ['stem', 'fruit'],
    symptoms:
      'Bẹ lá đòng (bẹ ôm bông lúa) xuất hiện các vết thối hình bầu dục màu nâu xám viền nâu đỏ sẫm hợp lại thành mảng lớn. Bông lúa bị nghẹn không trỗ thoát ra được hoặc hạt lúa bị lép đen phủ lớp phấn mốc trắng hồng bên trong bẹ.',
    checklist: [
      'Bẹ lá trên cùng ôm lấy bông lúa bị thối mảng lớn màu nâu sẫm viền nâu đỏ.',
      'Bông lúa bị kẹt nghẹn chỉ thò ra một phần đầu bông, hạt đen lép.',
      'Tách bẹ lá cờ ra thấy có lớp bột nấm trắng đến hồng nhạt và thường đi kèm nhện gié hoặc vết sâu đục.',
    ],
    causes: 'Nấm Sarocladium oryzae (thường xâm nhập cộng sinh qua vết chích của nhện gié Steneotarsonemus spinki).',
    favorableConditions: 'Thời tiết nóng ẩm khi lúa làm đòng – trỗ, ruộng bị nhện gié hoặc rầy phá.',
    preventionMethods: 'Sạ thưa vừa phải, xử lý hạt giống và quản lý tốt nhện gié giai đoạn làm đòng.',
    safeManagement: 'Phun kết hợp trừ nấm (Azoxystrobin / Propiconazole) với thuốc trừ nhện gié vào giai đoạn lúa ôm đòng sắp trỗ.',
    immediate: [
      'Xé bẹ lá cờ kiểm tra xem có nhện gié li ti bò bên trong bẹ không.',
    ],
    biologicalAndCare: [
      'Phun kết hợp bảo vệ đòng lúc lúa thấp tho trỗ bằng thuốc trừ nấm an toàn và dầu khoáng/đặc trị nhện nếu có nhện gié.',
    ],
    caution: [
      'Phân biệt với bệnh Khô vằn: Khô vằn tạo vết vằn da hổ xanh xám ở bẹ dưới sát mặt nước trước rồi mới leo lên.',
    ],
    references: 'IRRI Rice Sheath Rot; Viện BVTV.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_narrow_brown_leaf_spot',
    cropType: 'rice',
    vietnameseName: 'Bệnh Cháy lá vằn nhỏ / Đốm nâu hẹp lá lúa (Narrow Brown Leaf Spot)',
    englishName: 'Rice Narrow Brown Leaf Spot (Sphaerulina oryzina)',
    affectedPlantParts: ['leaf', 'stem'],
    symptoms:
      'Trên phiến lá xuất hiện nhiều vết đốm rất hẹp và dài chạy song song theo gân lá (dài 2–10 mm, rộng chỉ ~1 mm), màu nâu đỏ hoặc nâu quế, hai đầu vết nhọn (dễ phân biệt với bệnh Đạo ôn rộng hình thoi tâm xám).',
    checklist: [
      'Vết bệnh rất hẹp như sợi chỉ ngắn màu nâu quế chạy dọc theo gân lá.',
      'KHÔNG có tâm màu xám tro phình to giữa vết bệnh như bệnh Đạo ôn.',
      'Thường xuất hiện nhiều vào giai đoạn lúa trỗ – chín trên ruộng thiếu Kali.',
    ],
    causes: 'Nấm Sphaerulina oryzina (Cercospora janseana).',
    favorableConditions: 'Lúa giai đoạn trỗ chín, ruộng đất thiếu kali và dinh dưỡng kém.',
    preventionMethods: 'Trồng giống kháng, bón đủ phân Kali giai đoạn đón đòng.',
    safeManagement: 'Bổ sung phân bón lá Kali nếu lúa đang vào chắc; phun phòng khi bệnh xuất hiện sớm ở giống nhiễm.',
    immediate: [
      'Kiểm tra xem có phải Đạo ôn không dựa vào độ rộng vết bệnh (đốm nâu hẹp chỉ mảnh như sợi tăm).',
    ],
    biologicalAndCare: [
      'Tăng cường Kali và Silic giúp lá đòng bền lâu nuôi hạt chắc.',
    ],
    caution: [
      'Nếu lúa sắp chín trong vòng 10–15 ngày thì không cần phun thuốc nấm tránh tốn kém và tồn dư.',
    ],
    references: 'IRRI Narrow Brown Leaf Spot; USDA Rice Compendium.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_leaf_scald',
    cropType: 'rice',
    vietnameseName: 'Bệnh Cháy đầu lá / Đốm vòng lúa (Rice Leaf Scald)',
    englishName: 'Rice Leaf Scald (Microdochium albescens)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Từ chóp lá hoặc rìa mép lá xuất hiện mảng cháy xám ô-liu lan xuống, trên mảng cháy có các đường vân gợn sóng đồng tâm màu nâu sẫm và nâu nhạt xen kẽ như vân gỗ hoặc vảy cá.',
    checklist: [
      'Mảng cháy ở chóp lá có nhiều đường vằn sọc gợn sóng xen kẽ đậm-nhạt hình chữ V rất rõ.',
      'Ranh giới giữa phần cháy và phần lá xanh khá nét.',
    ],
    causes: 'Nấm Monographella albescens (Microdochium oryzae).',
    favorableConditions: 'Giai đoạn làm đòng – trỗ gặp mưa ẩm gió lớn, bón thừa phân đạm.',
    preventionMethods: 'Không bón quá nhiều đạm ở lần bón đón đòng, cấy mật độ thoáng.',
    safeManagement: 'Cân đối lại nước và phân kali; trường hợp bệnh lan nhanh xuống lá đòng dùng thuốc gốc Strobilurin hoặc Triazole.',
    immediate: [
      'Quan sát kỹ vết vân vòng đồng tâm ở đầu lá để phân biệt với bệnh Bạc lá vi khuẩn (bạc lá không có vân sóng rõ và có giọt dịch vi khuẩn).',
    ],
    biologicalAndCare: [
      'Ngưng bón đạm và tăng cường bón bổ sung Kali qua gốc hoặc qua lá.',
    ],
    caution: [
      'Thuốc kháng sinh trị vi khuẩn (như thuốc trừ bạc lá) sẽ không diệt được nấm Cháy đầu lá này.',
    ],
    references: 'IRRI Rice Leaf Scald Guide.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_neck_blast',
    cropType: 'rice',
    vietnameseName: 'Bệnh Đạo ôn cổ bông / Thối cổ gié lúa (Rice Neck Blast)',
    englishName: 'Rice Neck & Panicle Blast (Pyricularia oryzae)',
    affectedPlantParts: ['stem', 'fruit'],
    symptoms:
      'Ngay tại đốt cổ bông lúa xuất hiện vết thâm màu nâu đen hoặc xám tro bóp thắt lại làm cắt đứt mạch vận chuyển dinh dưỡng lên bông. Bông lúa bị gãy gục ngang cổ bông và trắng lép hoàn toàn nếu nhiễm sớm.',
    checklist: [
      'Đoạn cổ bông ngay dưới bông lúa bị thâm đen, teo thắt và phủ lớp mốc xám nhẹ khi ẩm.',
      'Toàn bộ bông lúa phía trên chuyển trắng bạc, hạt lép hoàn toàn ("bông bạc") nhưng gốc thân vẫn xanh (khác sâu đục thân kéo rút được đọt).',
    ],
    causes: 'Nấm Pyricularia oryzae (Magnaporthe oryzae).',
    favorableConditions: 'Thời tiết âm u nhiều mây, sương mù ẩm >90%, nhiệt độ 22–26°C đúng lúc lúa trỗ bông.',
    preventionMethods: 'Chọn giống ít nhiễm đạo ôn, không bón thừa đạm lúc trỗ, giữ mực nước ruộng ổn định.',
    safeManagement: 'BẮT BUỘC phun phòng trước khi lúa trỗ 5% và lặp lại sau khi trỗ xong 7 ngày bằng Tricyclazole, Isoprothiolane hoặc Azoxystrobin trên những ruộng đã có đạo ôn lá.',
    immediate: [
      'Kiểm tra xem ruộng lúa chuẩn bị trỗ có vết đạo ôn lá hay thời tiết đang âm u sương mù không để phun ngừa cổ bông ngay.',
      'Thử rút nhẹ bông bạc lên: nếu không rút được gốc cổ bông mà thấy cổ bông thâm đen là Đạo ôn cổ bông.',
    ],
    biologicalAndCare: [
      'Phun phòng ngừa bằng hoạt chất đặc trị đạo ôn trước khi lúa trỗ thoát hoàn toàn.',
    ],
    caution: [
      'Khi cổ bông đã thâm đen và bông đã trắng lép thì mọi loại thuốc phun đều không thể cứu lại hạt của bông đó.',
    ],
    references: 'Cục Bảo vệ Thực vật; Viện ASIR Bắc Trung Bộ.',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
  },
  {
    id: 'rice_thrips',
    cropType: 'rice',
    vietnameseName: 'Bọ trĩ hại mạ & lúa non (Rice Thrips)',
    englishName: 'Rice Thrips (Stenchaetothrips biformis)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Chóp lá lúa non hoặc mạ bị cuốn tròn lại thành ống nhọn như kim, chuyển màu vàng bạc rồi khô héo trắng. Khi tách ống lá cuốn ra hoặc vỗ nhẹ vào lòng bàn tay ẩm thấy rất nhiều bọ trĩ nhỏ dài màu đen nâu bò nhanh.',
    checklist: [
      'Đầu chóp lá lúa non (giai đoạn 7–25 ngày) bị se xoắn tròn lại và cháy trắng bạc.',
      'Ruộng bị khô nước cục bộ khiến cây mạ/lúa non cằn cỗi vàng bạc.',
      'Tách mép lá cuốn thấy bọ trĩ màu nâu đen nhỏ như đầu kim.',
    ],
    causes: 'Bọ trĩ Stenchaetothrips biformis.',
    favorableConditions: 'Đầu vụ gặp nắng hạn khô kéo dài, ruộng mạ/lúa sạ bị thiếu nước mặt ruộng.',
    preventionMethods: 'Giữ ruộng đủ ẩm, không để ruộng lúa mới sạ bị khô nứt nẻ kéo dài.',
    safeManagement: 'Cho nước ngập nhẹ qua ruộng 2–3 ngày (chỉ chừa phần ngọn lá) kết hợp bón nhử phân lân đạm nhẹ; chỉ phun thuốc sinh học khi mật độ quá cao gây cháy rộng.',
    immediate: [
      'Dẫn nước vào ruộng nâng mực nước lên sát cổ lá để đẩy trôi và giảm nhiệt làm bọ trĩ chết ngạt.',
    ],
    biologicalAndCare: [
      'Sau khi nâng nước 2 ngày, tháo nước vừa phải và bón nhẹ phân thúc giúp lúa bung lá mới.',
    ],
    caution: [
      'Rất hay nhầm với ngộ độc thuốc cỏ hoặc cháy đầu lá; luôn tách phần chóp lá cuốn xem có bọ trĩ đen nhỏ bên trong không.',
    ],
    references: 'IRRI Rice Thrips; Viện Bảo vệ Thực vật.',
    standardCode: 'TCVN IPM Lúa mới gieo',
  },
  {
    id: 'rice_gall_midge',
    cropType: 'rice',
    vietnameseName: 'Muỗi hành / Sâu năn hại lúa (Rice Gall Midge)',
    englishName: 'Asian Rice Gall Midge (Orseolia oryzae)',
    affectedPlantParts: ['stem', 'leaf'],
    symptoms:
      'Dảnh lúa bị dòi muỗi hành đục vào đỉnh sinh trưởng khiến bẹ lá biến dạng mọc thẳng đứng lên thành ống tròn rỗng màu trắng bạc hoặc xanh nhạt giống như cọng hành lá ("ống hành"). Dảnh bị ống hành sẽ không bao giờ trỗ bông.',
    checklist: [
      'Giữa khóm lúa mọc lên những cọng lá tròn thẳng tắp rỗng ruột giống hệt cọng hành tươi.',
      'Đỉnh ống hành khép kín, đôi khi có lỗ nhỏ chui ra của con muỗi trưởng thành.',
      'Khóm lúa đẻ bù rất nhiều nhánh nhưng lùn và ít bông.',
    ],
    causes: 'Dòi của muỗi hành Orseolia oryzae.',
    favorableConditions: 'Thời tiết nhiều sương mù, mưa phùn ẩm độ >85%, nhiệt độ mát 24–28°C ở giai đoạn lúa đẻ nhánh.',
    preventionMethods: 'Làm sạch cỏ bờ (cỏ lồng vực là ký chủ phụ), gieo cấy đúng thời vụ, bảo vệ ong ký sinh Platygaster oryzae.',
    safeManagement: 'Khi đã thấy ống hành thì dòi bên trong đã hóa nhộng sắp bay ra, cần chăm sóc bón phân giúp cây đẻ nhánh mới bù kịp.',
    immediate: [
      'Kiểm tra xem trong ống hành đã có lỗ chui ra chưa; nếu tỷ lệ chớm cao đầu vụ đẻ nhánh, theo dõi lịch bẫy đèn muỗi trưởng thành.',
    ],
    biologicalAndCare: [
      'Bón thêm phân Kali và lân kích thích lúa đẻ dảnh hữu hiệu bù lại dảnh ống hành.',
    ],
    caution: [
      'Phun thuốc khi ống hành đã lộ rõ trên mặt ruộng hầu như KHÔNG có tác dụng vì sâu đã xong chu kỳ phá hại.',
    ],
    references: 'Cục Bảo vệ Thực vật; IRRI Gall Midge.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_striped_stem_borer',
    cropType: 'rice',
    vietnameseName: 'Sâu đục thân 5 vạch hại lúa (Striped Stem Borer)',
    englishName: 'Asiatic Rice Striped Stem Borer (Chilo suppressalis)',
    affectedPlantParts: ['stem'],
    symptoms:
      'Sâu non màu trắng kem có 5 sọc nâu chạy dọc lưng sống tập trung trong bẹ rồi đục vào ống rạ gây "dảnh héo" lúc lúa đẻ nhánh và "bông bạc" lúc lúa trỗ. Khác sâu đục thân 2 chấm, mỗi thân lúa có thể có nhiều con sâu nằm cùng lúc.',
    checklist: [
      'Đọt non héo khô hoặc bông lúa trỗ ra trắng bạc, rút nhẹ là tuột ra khỏi bẹ.',
      'Tách thân rạ bị hại thấy nhiều con sâu non có 5 đường sọc nâu dọc lưng.',
    ],
    causes: 'Sâu đục thân 5 vạch Chilo suppressalis.',
    favorableConditions: 'Giai đoạn lúa đẻ nhánh rộ đến làm đòng, nhiệt độ 25–30°C.',
    preventionMethods: 'Cày vùi gốc rạ ngay sau thu hoạch để diệt nhộng; bẫy đèn diệt ngài trưởng thành.',
    safeManagement: 'Ngắt dảnh héo sớm kết hợp bảo vệ ong ký sinh trứng Trichogramma; xử lý chế phẩm sinh học hoặc thuốc nội hấp khi mật độ ổ trứng vượt ngưỡng.',
    immediate: [
      'Kiểm tra mật độ ổ trứng ở lá lúa theo thông báo dự tính dự báo của địa phương để xử lý đúng lúc sâu mới nở.',
    ],
    biologicalAndCare: [
      'Cắt sát gốc rạ sau thu hoạch hoặc cày vùi ngập nước diệt nhộng trú đông.',
    ],
    caution: [
      'Khi bông đã trắng bạc thì sâu đã đục vào sâu trong lõi thân, phun thuốc lúc này không cứu được bông.',
    ],
    references: 'Viện Bảo vệ Thực vật; IRRI Stem Borers.',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
  },
  {
    id: 'rice_ear_cutting_caterpillar',
    cropType: 'rice',
    vietnameseName: 'Sâu cắn gié / Sâu keo hại lúa chín (Rice Ear-Cutting Caterpillar)',
    englishName: 'Rice Armyworm / Ear-Cutting Caterpillar (Mythimna separata)',
    affectedPlantParts: ['fruit', 'leaf'],
    symptoms:
      'Sâu non to mập màu nâu xám xanh có sọc dọc thân, ban ngày trốn dưới gốc rạ, ban đêm bò lên cắn đứt lìa từng gié lúa và cuống hạt làm hạt lúa rụng đầy mặt ruộng giống như chuột cắn nhưng vết cắt phẳng gọn.',
    checklist: [
      'Nhiều gié lúa hoặc hạt gần chín bị cắt đứt rơi vãi đầy gốc ruộng.',
      'Bới nhẹ gốc khóm lúa vào ban ngày thấy sâu to mập nằm cuộn tròn và nhiều phân sâu xanh đen.',
    ],
    causes: 'Sâu cắn gié Mythimna separata.',
    favorableConditions: 'Cuối vụ gần thu hoạch sau các đợt mưa bão ngập lụt ngắn ngày hoặc ruộng rậm rạp.',
    preventionMethods: 'Dọn cỏ bờ ruộng, theo dõi đồng vào giai đoạn lúa chín sáp – đỏ đuôi.',
    safeManagement: 'Tháo nước nhẹ nếu ruộng còn khô hoặc soi đèn bắt thủ công; nếu mật độ cao khi lúa còn >15 ngày mới gặt thì phun chế phẩm Bt hoặc Emamectin vào chiều tối.',
    immediate: [
      'Ra đồng lúc chập tối soi đèn kiểm tra mật độ sâu đang bò lên cắt gié.',
    ],
    biologicalAndCare: [
      'Nếu lúa đã chín vàng trên 80% nên tranh thủ thu hoạch sớm thay vì phun thuốc.',
    ],
    caution: [
      'Tuyệt đối tuân thủ thời gian cách ly thuốc trước thu hoạch; không phun thuốc hóa học khi lúa chuẩn bị gặt trong vòng 7–10 ngày.',
    ],
    references: 'Viện Bảo vệ Thực vật Việt Nam.',
    standardCode: 'TCVN IPM Lúa giai đoạn chín',
  },
  {
    id: 'rice_ear_bug',
    cropType: 'rice',
    vietnameseName: 'Bọ xít hôi hại hạt lúa sữa (Rice Ear Bug)',
    englishName: 'Rice Bug (Leptocorisa oratorius)',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Bọ xít thân mảnh dài màu xanh nâu (có mùi hôi hắc đặc trưng) chích hút chất sữa bên trong hạt lúa ở giai đoạn ngậm sữa – chắc xanh. Hạt bị chích trở nên lép hoàn toàn hoặc xuất hiện vết chấm nâu trên vỏ trấu làm gạo gãy đắng.',
    checklist: [
      'Thấy nhiều bọ xít thon dài bay rào rào khi đi dọc bờ ruộng lúa đang ngậm sữa.',
      'Hạt lúa có chấm đen nhỏ ở giữa khe vỏ trấu, bóp thử thấy trống rỗng không có bột sữa.',
    ],
    causes: 'Bọ xít hôi Leptocorisa oratorius và L. acuta.',
    favorableConditions: 'Ruộng lúa trỗ sớm hoặc trỗ muộn hơn xung quanh, nhiều cỏ lồng vực ven bờ.',
    preventionMethods: 'Gieo sạ đồng loạt trong cánh đồng để tránh bọ xít tập trung vào ruộng trỗ lẻ; phát sạch cỏ bờ.',
    safeManagement: 'Dùng vợt bắt bọ xít vào sáng sớm, đặt bả cua ốc/mắm thối dụ bọ xít tập trung tiêu diệt.',
    immediate: [
      'Đặt bẫy bả mồi tự nhiên (xác cua ốc thối đặt trên cọc ven bờ) để gom bắt bọ xít vào sáng sớm.',
    ],
    biologicalAndCare: [
      'Chỉ xử lý thuốc sinh học hoặc hoạt chất được phép vào sáng sớm/chiều mát khi mật độ >6 con/m² lúc lúa ngậm sữa.',
    ],
    caution: [
      'Khi hạt lúa đã cứng chắc (chín sáp cuối) bọ xít không còn chích hút được nữa, không cần phun thuốc.',
    ],
    references: 'IRRI Rice Bug; Viện BVTV Việt Nam.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_black_bug',
    cropType: 'rice',
    vietnameseName: 'Bọ xít đen hại gốc lúa (Malayan Rice Black Bug)',
    englishName: 'Rice Black Bug (Scotinophara coarctata)',
    affectedPlantParts: ['stem', 'leaf'],
    symptoms:
      'Bọ xít hình bầu dục màu đen tuyền sống ẩn kín ở gốc khóm lúa ngay sát mặt nước ban ngày, đêm bò lên chích hút nhựa thân bẹ làm lúa còi cọc, lá ngả vàng cam nâu và cháy rụi từng đám ("chết gục gốc") giống cháy rầy.',
    checklist: [
      'Vạch gốc lúa sát mặt nước thấy các con bọ xít dẹt màu đen tuyền có mùi hôi.',
      'Cây lúa bị héo rũ đỏ lá, trỗ bông trắng lép hoặc không thoát khỏi bẹ.',
    ],
    causes: 'Bọ xít đen Scotinophara coarctata.',
    favorableConditions: 'Vùng ruộng gần sông suối hoặc sau các đợt trăng sáng khi bọ xít bay vào bẫy đèn rộ.',
    preventionMethods: 'Thắp bẫy đèn diệt bọ xít trưởng thành vào các đêm trăng; giữ vịt thả ruộng khi lúa lớn.',
    safeManagement: 'Dâng nước ngập gốc khóm lúa 2–3 ngày để bọ xít bò lên cao rồi phun nấm xanh Metarhizium hoặc thu bắt.',
    immediate: [
      'Dâng mực nước ruộng lên cao trong 24–48 giờ buộc bọ xít đen rời gốc nổi lên mặt nước để xử lý.',
    ],
    biologicalAndCare: [
      'Phun chế phẩm nấm xanh Metarhizium anisopliae kết hợp dọn cỏ bờ sau thu hoạch.',
    ],
    caution: [
      'Phun sương phía trên ngọn lá khi ruộng cạn nước sẽ không chạm tới bọ xít đang trốn ở sát gốc.',
    ],
    references: 'IRRI Rice Black Bug Compendium.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_hispa',
    cropType: 'rice',
    vietnameseName: 'Bọ gai / Sâu gai hại lá lúa (Rice Hispa)',
    englishName: 'Rice Hispa (Dicladispa armigera)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Con trưởng thành màu xanh đen có nhiều gai nhọn trên lưng cạp phần mô xanh trên mặt lá thành từng sọc trắng song song gân lá. Ấu trùng đục chui vào giữa hai lớp biểu bì lá tạo thành các túi phồng trắng rộng làm ruộng lúa trắng bạc xơ xác.',
    checklist: [
      'Trên lá có nhiều vệt sọc trắng dài hoặc mảng phồng rộp trắng do lớp diệp lục bị gặm sạch.',
      'Thấy con bọ cánh cứng nhỏ màu xanh đen có gai nhọn khắp lưng bám trên lá.',
    ],
    causes: 'Bọ gai lúa Dicladispa armigera.',
    favorableConditions: 'Đầu mùa mưa, ruộng bón quá nhiều đạm và rậm rạp.',
    preventionMethods: 'Sạ cấy thưa hợp lý, cắt tỉa chỏm lá mạ có ấu trùng trước khi nhổ đi cấy.',
    safeManagement: 'Dùng vợt bắt bọ trưởng thành; ngắt lá bị phồng nặng; phun chế phẩm sinh học nếu mật độ gây hại >10% diện tích lá.',
    immediate: [
      'Kiểm tra xem trong mảng trắng phồng lá có dòi dẹt màu trắng vàng nằm bên trong không.',
    ],
    biologicalAndCare: [
      'Giảm bón phân đạm và giữ nước ổn định kết hợp bảo vệ ong ký sinh.',
    ],
    caution: [
      'Không cắt trụi lá lúa khi cây đang giai đoạn làm đòng.',
    ],
    references: 'IRRI Rice Hispa; Viện BVTV.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_whorl_maggot',
    cropType: 'rice',
    vietnameseName: 'Ruồi đục nõn / Dòi đục lá lúa non (Rice Whorl Maggot)',
    englishName: 'Rice Whorl Maggot (Hydrellia philippina)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Dòi nhỏ chui vào ăn phần mép lá non khi lá còn cuộn trong nõn; khi lá mở xòe ra thấy các mảng vệt dài màu trắng vàng thủng rách dọc mép lá, làm lá non biến dạng xơ xác ở giai đoạn 10–30 ngày sau cấy.',
    checklist: [
      'Lá non mới xòe ra bị khuyết mảng trắng vàng dọc rìa mép lá.',
      'Chủ yếu gặp ở ruộng lúa mới cấy có nước ngập liên tục.',
    ],
    causes: 'Dòi ruồi đục nõn Hydrellia philippina.',
    favorableConditions: 'Ruộng luôn ngập nước ngay từ ngày đầu sau cấy/sạ, ruộng ít bèo hoa dâu che phủ.',
    preventionMethods: 'Rút nước cạn xen kẽ trong 2–3 tuần đầu sau cấy sẽ làm giảm đẻ trứng rõ rệt.',
    safeManagement: 'Thường cây lúa tự phục hồi đẻ nhánh khỏe sau 30 ngày mà KHÔNG cần phun thuốc.',
    immediate: [
      'Rút bớt nước ruộng cho cạn xâm xấp 3–4 ngày và bón phân thúc nhẹ giúp lúa bung lá mới.',
    ],
    biologicalAndCare: [
      'Duy trì chế độ ướt khô xen kẽ để hạn chế ruồi đến đẻ trứng trên mặt nước.',
    ],
    caution: [
      'Không cần phun thuốc trừ sâu khi mật độ dưới ngưỡng vì lúa đẻ nhánh hoàn toàn tự bù đắp được.',
    ],
    references: 'IRRI Rice Whorl Maggot Guidelines.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_caseworm',
    cropType: 'rice',
    vietnameseName: 'Sâu phao đục bẹ / Sâu ống hại lúa nước (Rice Caseworm)',
    englishName: 'Rice Caseworm (Parapoynx stagnalis)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Sâu cắt ngang các đoạn chóp lá lúa dài 1–2 cm rồi cuốn tròn thành cái ống ("phao") chui vào bên trong để nổi trên mặt nước ruộng. Phiến lá bị gặm mất chất xanh chỉ còn màng trắng mỏng như bậc thang.',
    checklist: [
      'Thấy nhiều đoạn lá cuốn thành ống nhỏ nổi lềnh bềnh trên mặt nước hoặc bám vào thân lúa.',
      'Đầu lá lúa bị cắt cụt ngang đều tăm tắp.',
    ],
    causes: 'Sâu phao Parapoynx stagnalis.',
    favorableConditions: 'Ruộng lúa non ngập nước sâu kéo dài giai đoạn đầu vụ.',
    preventionMethods: 'Không giữ nước quá sâu ở giai đoạn lúa non mới cấy.',
    safeManagement: 'Tháo cạn sạch nước ruộng trong 2–3 ngày là sâu phao sẽ chết khô hoàn toàn mà không cần phun thuốc.',
    immediate: [
      'Tháo cạn nước ruộng trong 48–72 giờ để tiêu diệt toàn bộ sâu trong ống phao.',
    ],
    biologicalAndCare: [
      'Vớt bỏ các ống phao dạt vào góc bờ ruộng sau khi tháo nước.',
    ],
    caution: [
      'Tháo cạn nước là biện pháp rẻ tiền và triệt để nhất; tránh lạm dụng thuốc trừ sâu xuống nước gây chết cá tôm.',
    ],
    references: 'IRRI Rice Caseworm.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_panicle_mite',
    cropType: 'rice',
    vietnameseName: 'Nhện gié hại lúa / Bệnh cạo gió bẹ lúa (Rice Panicle Mite)',
    englishName: 'Rice Panicle Mite (Steneotarsonemus spinki)',
    affectedPlantParts: ['stem', 'fruit'],
    symptoms:
      'Nhện siêu nhỏ sống bên trong kẽ bẹ lá chích hút tạo thành các vết sọc thâm tím nâu sẫm chạy dọc bẹ lá ("vết cạo gió"). Bông lúa trỗ ra cong vẹo xoắn, hạt lép đen lốm đốm màu nâu đen (hiện tượng "bông lúa đứng thẳng" vì hạt lép nhẹ).',
    checklist: [
      'Mặt ngoài bẹ lá có các sọc dài thâm nâu tím như vết cạo gió.',
      'Lúc lúa chín, nhiều bông lúa bị lép nhẹ nên không cúi đầu mà dựng đứng thẳng lên.',
      'Hạt lúa bị xoắn vặn mỏ vẹt và lốm đốm đen.',
    ],
    causes: 'Nhện gié Steneotarsonemus spinki kết hợp nấm thối bẹ Sarocladium.',
    favorableConditions: 'Nắng nóng kéo dài xen mưa rào lúc lúa làm đòng – trỗ, ruộng sạ dày bón thừa đạm.',
    preventionMethods: 'Xử lý hạt giống trước khi gieo, cày vùi rơm rạ triệt để sau thu hoạch.',
    safeManagement: 'Khi lúa đứng cái – làm đòng thấy vết cạo gió trên bẹ, phun thuốc đặc trị nhện (Abamectin, Propargite hoặc dầu khoáng) kết hợp trừ nấm lem lép hạt.',
    immediate: [
      'Kiểm tra các bẹ lá giữa thân giai đoạn làm đòng xem có sọc thâm cạo gió không.',
    ],
    biologicalAndCare: [
      'Phun thuốc trừ nhện chọn lọc ướt đẫm thân bẹ vào giai đoạn lúa ôm đòng trước khi trỗ.',
    ],
    caution: [
      'Nhện gié nằm rất kín trong bẹ; khi lúa đã trỗ xong và hạt đã lép thì phun thuốc không còn tác dụng.',
    ],
    references: 'Cục Bảo vệ Thực vật; Viện Lúa ĐBSCL.',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
  },
  {
    id: 'rice_mealybug',
    cropType: 'rice',
    vietnameseName: 'Rệp sáp ẩn bẹ hại lúa khô hạn (Rice Mealybug)',
    englishName: 'Rice Mealybug (Brevennia rehi)',
    affectedPlantParts: ['stem'],
    symptoms:
      'Rệp cơ thể màu hồng nhạt phủ phấn trắng sống chui kín trong bẹ lá gần mặt đất ở các ruộng lúa thiếu nước. Cây lúa bị từng chòm còi cọc vàng lá héo xoăn.',
    checklist: [
      'Ruộng bị từng chòm tròn lúa thấp còi, lá vàng héo do thiếu nước.',
      'Bóc bẹ lá ra thấy các đám phấn trắng hồng bám quanh thân lúa.',
    ],
    causes: 'Rệp sáp lúa Brevennia rehi.',
    favorableConditions: 'Hạn hán kéo dài, ruộng gò cao khô nẻ nứt chân chim.',
    preventionMethods: 'Giữ ruộng không bị khô hạn quá lâu, dọn sạch cỏ bờ giữa 2 vụ.',
    safeManagement: 'Đưa nước vào ruộng ngập nhẹ phần gốc 2–3 ngày kết hợp nhổ tỉa chòm nặng.',
    immediate: [
      'Dẫn nước tưới ngay cho ruộng đang khô hạn để cắt điều kiện phát triển của rệp sáp.',
    ],
    biologicalAndCare: [
      'Bón bổ sung nhẹ phân NPK sau khi tưới nước giúp lúa phục hồi xanh tốt.',
    ],
    caution: [
      'Thường xảy ra cục bộ ở góc ruộng gò cao thiếu nước, không cần phun thuốc cả cánh đồng.',
    ],
    references: 'IRRI Rice Mealybug.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_kernel_smut',
    cropType: 'rice',
    vietnameseName: 'Bệnh Than đen hạt lúa (Rice Kernel Smut)',
    englishName: 'Rice Kernel Smut (Tilletia barclayana)',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Một số hạt lúa trên bông bị thay thế một phần hoặc toàn bộ nội nhũ thành khối bột bào tử màu đen tuyền như muội than, làm nứt vỏ trấu và bám đen dính lên các hạt xung quanh.',
    checklist: [
      'Vài hạt trên bông bị nứt vỏ trấu phun ra bột đen tuyền như than củi.',
      'Bột đen dây bẩn lên áo quần khi đi thăm đồng lúc lúa chín.',
    ],
    causes: 'Nấm Tilletia barclayana (Neovossia horrida).',
    favorableConditions: 'Bón dư đạm muộn giai đoạn đón đòng, thời tiết ẩm ướt lúc lúa trỗ.',
    preventionMethods: 'Không lấy hạt từ ruộng bị bệnh làm giống; xử lý ngâm ủ hạt giống đúng kỹ thuật.',
    safeManagement: 'Điều chỉnh giảm lượng đạm ở vụ sau và phun phòng ở giai đoạn trỗ lác đác nếu ruộng có tiền sử nặng.',
    immediate: [
      'Đánh dấu ruộng bị than đen hạt để không giữ thóc này làm giống cho vụ sau.',
    ],
    biologicalAndCare: [
      'Xử lý hạt giống vụ mới bằng nước nóng 54°C trong 15 phút hoặc thuốc xử lý hạt giống được phép.',
    ],
    caution: [
      'Phân biệt với bệnh Hoa cúc (False Smut): Bệnh Hoa cúc mọc thành cục tròn lớn màu vàng cam rồi xanh đen bao bọc bên ngoài hạt.',
    ],
    references: 'USDA Rice Kernel Smut; IRRI.',
    standardCode: 'TCVN Bệnh hại hạt giống lúa',
  },
  {
    id: 'rice_seedling_blight',
    cropType: 'rice',
    vietnameseName: 'Bệnh Chết rạp cây mạ / Lở cổ rễ mạ (Rice Seedling Blight)',
    englishName: 'Rice Seedling Blight (Fusarium / Pythium / Rhizoctonia)',
    affectedPlantParts: ['stem', 'other'],
    symptoms:
      'Cây mạ non ở giai đoạn 1–3 lá bị thối nhũn hoặc thắt nâu ngay gốc cổ rễ sát mặt bùn, trên bề mặt có tơ nấm trắng mỏng; mạ héo rũ chết thành từng chòm trắng.',
    checklist: [
      'Mạ non chết rũ hàng loạt thành từng đám trên luống mạ.',
      'Phần thân gốc ngay sát mặt đất bị thâm nâu hoặc thối mềm.',
    ],
    causes: 'Nấm đất Pythium, Rhizoctonia và Fusarium khi gặp rét đậm rét hại vụ Xuân.',
    favorableConditions: 'Vụ Đông Xuân Bắc Trung Bộ gặp rét kéo dài <15°C, gieo mạ quá dày thiếu ánh sáng.',
    preventionMethods: 'Che phủ nilon giữ ấm luống mạ vụ Xuân, trộn tro bếp + phân chuồng hoai và Trichoderma khi làm đất mạ.',
    safeManagement: 'Giữ nước ấm chân mạ vừa phải ban đêm, ban ngày mở hé nilon thoáng khí nếu nắng ấm; phun Validamycin hoặc Trichoderma.',
    immediate: [
      'Rắc tro bếp sạch mỏng lên luống mạ bị chớm thối gốc để hút ẩm và giữ ấm.',
    ],
    biologicalAndCare: [
      'Phun chế phẩm nấm Trichoderma hoặc hoạt chất trừ nấm cổ rễ an toàn nếu bệnh lan rộng.',
    ],
    caution: [
      'Tuyệt đối không bón đạm Urê cho mạ khi trời đang rét đậm dưới 15°C.',
    ],
    references: 'Viện KHKT Nông nghiệp Bắc Trung Bộ; Khuyến nông Quốc gia.',
    standardCode: 'TCVN Kỹ thuật làm mạ Xuân',
  },
  {
    id: 'rice_early_yellowing_leaf_blight',
    cropType: 'rice',
    vietnameseName: 'Bệnh Vàng lá chín sớm hại lúa (Early Leaf Yellowing / Curvularia)',
    englishName: 'Rice Early Yellowing & Leaf Blight Complex',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Giai đoạn lúa làm đòng – trỗ xuất hiện vết vàng cam từ chóp lá chạy dọc xuống theo gân lá thành vệt dài rồi khô cháy sớm, làm bộ lá đòng khô sớm trước khi hạt vào chắc hoàn toàn.',
    checklist: [
      'Vệt màu vàng cam sáng chạy từ đầu lá hoặc vết bệnh cũ lan xuống dọc lá.',
      'Bộ lá đứng bị vàng khô nhanh khi lúa mới trỗ hoặc đang ngậm sữa.',
    ],
    causes: 'Nấm Gonatophragmium / Curvularia kết hợp suy dinh dưỡng lá đòng.',
    favorableConditions: 'Thời tiết nóng ẩm cuối vụ, ruộng thiếu Kali – Trung vi lượng.',
    preventionMethods: 'Bón cân đối Kali lúc đón đòng, chọn giống khỏe cây sạch lá.',
    safeManagement: 'Phun phân bón lá Kali-Silic giữ xanh lá đòng hoặc kết hợp hoạt chất Azoxystrobin / Propiconazole khi mới chớm.',
    immediate: [
      'Kiểm tra xem có dịch vi khuẩn tiết ra không để loại trừ bệnh Bạc lá và Sọc trong vi khuẩn.',
    ],
    biologicalAndCare: [
      'Bổ sung Kali + Silic qua lá giai đoạn trỗ thoát để giữ 3 lá trên cùng xanh bền nuôi hạt.',
    ],
    caution: [
      'Tránh nhầm với lá lúa chín sinh lý bình thường khi hạt đã vào chắc đỏ đuôi.',
    ],
    references: 'Cục Bảo vệ Thực vật; Viện Lúa.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_root_knot_nematode',
    cropType: 'rice',
    vietnameseName: 'Tuyến trùng bướu rễ lúa (Rice Root-Knot Nematode)',
    englishName: 'Rice Root-Knot Nematode (Meloidogyne graminicola)',
    affectedPlantParts: ['other', 'leaf'],
    symptoms:
      'Cây lúa lùn thấp còi cọc thành từng chòm gò cao thiếu nước, lá vàng dần từ chóp. Nhổ lên thấy trên rễ mọc rất nhiều cục bướu sưng phồng hình móc câu hoặc chuỗi hạt đặc trưng ở đầu chóp rễ.',
    checklist: [
      'Đầu chóp rễ lúa phồng to thành những nốt bướu tròn hoặc cong như móc câu.',
      'Lá lúa vàng úa từng đám ở các ruộng đất cát nhẹ hoặc khô hạn.',
    ],
    causes: 'Tuyến trùng Meloidogyne graminicola.',
    favorableConditions: 'Ruộng đất cát pha nhẹ, lúa sạ khô hoặc ruộng thường xuyên để khô cạn nước kéo dài.',
    preventionMethods: 'Cày ngập nước luân phiên, vệ sinh cỏ dại ký chủ, bón phân hữu cơ hoai mục.',
    safeManagement: 'Đưa nước vào ngập ruộng 3–5 cm liên tục trong 1–2 tuần để ức chế tuyến trùng kết hợp bón phân thúc kích ra rễ mới.',
    immediate: [
      'Nhổ 3–5 khóm lúa ở chỗ vàng còi rửa sạch bùn xem đầu rễ có bị u bướu móc câu không.',
      'Dẫn nước vào ruộng giữ ngập ổn định nếu ruộng đang bị khô.',
    ],
    biologicalAndCare: [
      'Bón thêm phân hữu cơ hoai mục có nấm đối kháng Paecilomyces hoặc Trichoderma.',
    ],
    caution: [
      'Nếu chỉ nhìn lá mà nhổ lên không xem rễ sẽ dễ chẩn đoán nhầm sang thiếu đạm.',
    ],
    references: 'IRRI Rice Root-Knot Nematode.',
    standardCode: 'TCVN IPM Tuyến trùng lúa',
  },
  {
    id: 'rice_white_tip_nematode',
    cropType: 'rice',
    vietnameseName: 'Bệnh Tiêm đọt trắng hại lúa (Rice White-Tip Nematode)',
    englishName: 'Rice White-Tip Nematode (Aphelenchoides besseyi)',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Đầu chóp lá lúa chuyển màu trắng bạc hay vàng nhạt dài 2–5 cm rồi khô xoăn rách tơi như sợi tua. Lá cờ thường bị xoắn vặn gần cổ bông làm bông lúa ngắn và tỷ lệ hạt lép cao.',
    checklist: [
      'Đầu chóp của nhiều lá chuyển màu trắng bạc rõ nét rồi khô xoăn lại.',
      'Lá cờ xoắn vòng quanh cổ bông cản trở bông trỗ.',
    ],
    causes: 'Tuyến trùng hạt giống Aphelenchoides besseyi sống bên trong vỏ trấu hạt giống.',
    favorableConditions: 'Sử dụng thóc giống tự để vụ trước bị nhiễm tuyến trùng.',
    preventionMethods: 'Xử lý ngâm hạt giống trong nước ấm 54–55°C trong 15 phút trước khi ngâm ủ.',
    safeManagement: 'Không để làm giống cho vụ sau; chọn nguồn thóc giống xác nhận sạch bệnh.',
    immediate: [
      'Kiểm tra tỷ lệ khóm bị trắng chóp lá và tách bỏ khỏi nguồn thóc giống vụ sau.',
    ],
    biologicalAndCare: [
      'Áp dụng xử lý nhiệt nước ấm hạt giống ở vụ tiếp theo để diệt sạch tuyến trùng trong vỏ hạt.',
    ],
    caution: [
      'Phun thuốc trừ nấm hoặc trừ sâu lên lá không diệt được tuyến trùng sống ẩn trong hạt giống.',
    ],
    references: 'IRRI White Tip Disease; FAO Phytosanitary Guide.',
    standardCode: 'QCVN Hạt giống lúa',
  },
  {
    id: 'rice_field_rat_damage',
    cropType: 'rice',
    vietnameseName: 'Chuột đồng cắn phá thân bông lúa (Field Rat Damage)',
    englishName: 'Rice Field Rat Damage (Rattus argentiventer)',
    affectedPlantParts: ['stem', 'fruit'],
    symptoms:
      'Khóm lúa bị cắn gãy ngang gốc từng mảng ở giữa ruộng, vết cắt thân lúa nghiêng góc 45° sắc gọn (rất khác với vết thối nhũn do nấm hay sâu đục thân). Giai đoạn chín chuột cắn kéo gãy bông ăn hạt.',
    checklist: [
      'Thân lúa bị cắn đứt ngang gốc với vết cắt xiên vát góc 45 độ rất sắc.',
      'Tạo thành những khoảng trống loang lổ giữa ruộng, thường kèm dấu chân và hang chuột ở bờ vùng.',
    ],
    causes: 'Chuột đồng phá hại.',
    favorableConditions: 'Ruộng gần gò đồi, khu dân cư, bờ ruộng lớn nhiều bụi rậm.',
    preventionMethods: 'Phát quang bờ ruộng, tổ chức đánh bắt chuột đồng loạt toàn cánh đồng đầu vụ, dùng rào nilon bẫy hom (TBS).',
    safeManagement: 'Đặt bẫy bán nguyệt, bẫy lồng hoặc dùng bả sinh học chống đông máu thế hệ mới đặt có kiểm soát tại các đường mòn.',
    immediate: [
      'Tìm dấu đường mòn và hang chuột quanh bờ để đặt bẫy cơ học hoặc bả sinh học tập trung.',
    ],
    biologicalAndCare: [
      'Phối hợp với các hộ xung quanh đánh bắt đồng loạt để chuột không chạy từ ruộng này sang ruộng khác.',
    ],
    caution: [
      'Tuyệt đối KHÔNG dùng điện giăng lưới bẫy chuột vì cực kỳ nguy hiểm đến tính mạng người đi đồng.',
    ],
    references: 'Cục Bảo vệ Thực vật; IRRI Rodent Management.',
    standardCode: 'QCVN Quản lý chuột đồng',
  },
  {
    id: 'rice_swarming_caterpillar',
    cropType: 'rice',
    vietnameseName: 'Sâu keo / Sâu năn sọc đàn ăn trụi lá lúa (Rice Swarming Caterpillar)',
    englishName: 'Rice Swarming Caterpillar (Spodoptera mauritia)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Sâu non xuất hiện thành đàn hàng loạt ăn trụi lá mạ hoặc lá lúa non trong đêm chỉ chừa lại gốc thân lúa trơ trụi như trâu gặm.',
    checklist: [
      'Cả ruộng mạ hoặc lúa non bị ăn trụi phần lá rất nhanh trong 1–2 đêm.',
      'Thấy đàn sâu non màu xanh xám đen bò dày đặc trên thân lúa lúc chiều tối hoặc sáng sớm.',
    ],
    causes: 'Sâu keo Spodoptera mauritia.',
    favorableConditions: 'Sau mưa lụt đầu vụ hoặc nắng hạn kéo dài chuyển sang mưa.',
    preventionMethods: 'Làm sạch cỏ quanh bờ ruộng, theo dõi mạ và lúa non hàng ngày.',
    safeManagement: 'Cho nước ngập ruộng để đẩy sâu nổi lên cho vịt ăn hoặc phun chế phẩm Bt / Emamectin vào chiều tối.',
    immediate: [
      'Nếu điều kiện cho phép, dâng nước nhẹ và phun chế phẩm sinh học Bt vào lúc chiều mát khi sâu bò lên ăn lá.',
    ],
    biologicalAndCare: [
      'Bón thúc nhẹ sau khi hết sâu để lúa nhanh ra chồi lá mới.',
    ],
    caution: [
      'Sâu ăn rất nhanh vào ban đêm, cần kiểm tra xử lý ngay trong ngày phát hiện.',
    ],
    references: 'IRRI Swarming Caterpillar.',
    standardCode: 'TCVN IPM Cây lúa',
  },
  {
    id: 'rice_deficiency_nitrogen',
    cropType: 'rice',
    vietnameseName: 'Thiếu Đạm (N) làm lúa vàng còi đẻ nhánh ít',
    englishName: 'Nitrogen Deficiency in Rice',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Toàn ruộng có màu xanh vàng nhạt đồng nhất, lá già phía dưới chuyển vàng đều từ chóp xuống và rụi sớm, cây lúa đứng thẳng lá hẹp ngắn, đẻ nhánh rất ít.',
    checklist: [
      'Lá lúa hẹp, dựng đứng màu xanh nhạt ánh vàng, lá già gốc vàng đều và khô sớm.',
      'Khóm lúa ít nhánh, thân gầy yếu.',
    ],
    causes: 'Thiếu phân Đạm hoặc đất cát rửa trôi phân nhanh.',
    favorableConditions: 'Đất cát pha, mưa to rửa trôi sau bón hoặc bón lót thiếu.',
    preventionMethods: 'Sử dụng bảng so màu lá lúa (LCC) để bón đạm đúng thời điểm và đủ lượng.',
    safeManagement: 'Kiểm tra rễ còn trắng khỏe rồi bón bổ sung Urê hoặc NPK cân đối đúng giai đoạn đẻ nhánh / đón đòng.',
    immediate: [
      'Đối chiếu màu lá trên đồng với bảng so màu lá lúa (LCC) trước khi quyết định bón thúc.',
    ],
    biologicalAndCare: [
      'Chia nhỏ lượng phân đạm bón thành nhiều lần kết hợp giữ mực nước ruộng nông ổn định 3–5 cm.',
    ],
    caution: [
      'Không bón bù quá nhiều đạm một lúc vào cuối giai đoạn đẻ nhánh vì sẽ kích thích đạo ôn và bạc lá.',
    ],
    references: 'IRRI Nitrogen Management & LCC; Khuyến nông Việt Nam.',
    standardCode: 'TCVN Canh tác lúa',
  },
  {
    id: 'rice_deficiency_phosphorus',
    cropType: 'rice',
    vietnameseName: 'Thiếu Lân (P) làm lúa xanh tối hẹp lá, đẻ nhánh kém ("Lúa đỏ lá tím")',
    englishName: 'Phosphorus Deficiency in Rice',
    affectedPlantParts: ['leaf', 'other'],
    symptoms:
      'Cây lúa lùn cằn, lá hẹp nhỏ dựng đứng màu xanh tối xỉn hoặc chuyển đỏ tím tía ở lá già, đẻ nhánh rất kém, bộ rễ mảnh ít rễ phụ và chín muộn.',
    checklist: [
      'Lá lúa dựng thẳng, mảnh hẹp có màu xanh xỉn pha ánh tím đỏ ở lá dưới.',
      'Cây đứng im chậm phát triển, rất ít nhánh.',
    ],
    causes: 'Thiếu Lân (P) do đất chua phèn cố định lân hoặc thời tiết rét đậm đầu vụ Xuân làm rễ không hút được lân.',
    favorableConditions: 'Đất chua phèn, vụ Đông Xuân trời rét kéo dài dưới 18°C.',
    preventionMethods: 'Bón lót đầy đủ phân lân trước khi bừa cấy.',
    safeManagement: 'Bón bổ sung phân lân dễ tiêu (Super Lân) kết hợp phun phân bón lá giàu Lân-Kali-Kẽm.',
    immediate: [
      'Kiểm tra pH đất và bón bổ sung Super Lân sớm ở giai đoạn lúa đẻ nhánh.',
    ],
    biologicalAndCare: [
      'Giữ mực nước vừa đủ ấm chân ruộng vào những ngày rét đậm.',
    ],
    caution: [
      'Nếu thiếu Lân ở vụ rét Xuân mà chỉ bón Urê thì cây càng yếu và dễ nhiễm đạo ôn.',
    ],
    references: 'IRRI Phosphorus Deficiency.',
    standardCode: 'TCVN Dinh dưỡng cây lúa',
  },
  {
    id: 'rice_deficiency_potassium',
    cropType: 'rice',
    vietnameseName: 'Thiếu Kali (K) gây cháy chóp lá già màu nâu gỉ sắt trên lúa',
    englishName: 'Potassium Deficiency in Rice',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Từ chóp và mép của các lá già xuất hiện màu vàng cam rồi chuyển cháy nâu từng mảng hoặc chấm nâu gỉ sắt nhỏ gần chóp lá; cây mềm yếu dễ bị bệnh Đốm nâu, Khô vằn và đổ ngã.',
    checklist: [
      'Chóp lá già chuyển vàng nâu và khô cháy giòn (lá non trên ngọn vẫn xanh).',
      'Thân lúa mềm yếu, hạt chắc ít và nhiều hạt lửng.',
    ],
    causes: 'Thiếu Kali (K) do nhiều vụ chỉ bón Urê và Lân hoặc rút nước rửa trôi.',
    favorableConditions: 'Đất cát nhẹ, ruộng thâm canh 2–3 vụ/năm không trả lại rơm rạ.',
    preventionMethods: 'Bón đủ Kali chia làm 2 lần (lót/đẻ nhánh và đón đòng); trả lại tro rơm rạ hoặc ủ phân hữu cơ từ rơm.',
    safeManagement: 'Bón bổ sung Kali Clorua hoặc phun Kali qua lá khi lúa làm đòng – trỗ.',
    immediate: [
      'Bón thúc bổ sung Kali ngay để tăng sức đề kháng bệnh Khô vằn và Đạo ôn.',
    ],
    biologicalAndCare: [
      'Ủ rơm rạ tại ruộng bằng Trichoderma trả lại nguồn Kali tự nhiên rất dồi dào cho đất.',
    ],
    caution: [
      'Không nhầm với bệnh Bạc lá vi khuẩn (bạc lá chạy dọc gợn sóng từ mép lá trên lá bánh tẻ và lá cờ).',
    ],
    references: 'IRRI Potassium Deficiency in Rice.',
    standardCode: 'TCVN Dinh dưỡng cây lúa',
  },
  {
    id: 'rice_deficiency_zinc',
    cropType: 'rice',
    vietnameseName: 'Thiếu Kẽm (Zn) làm lá lúa non bị bạc trắng giữa gân & đốm nâu gỉ',
    englishName: 'Zinc Deficiency (Khaira Disease) in Rice',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Xảy ra sau cấy/sạ 2–4 tuần: gốc phiến lá non mất màu chuyển trắng bạc hoặc vàng sáng, sau xuất hiện các đốm nâu đỏ gỉ sắt rải rác trên phiến lá giữa ("bệnh Khaira"). Cây còi cọc thấp hẳn xuống, lá giòn dễ gãy.',
    checklist: [
      'Phần gốc lá non chuyển màu trắng nhợt trong khi lá dưới mọc nhiều đốm nâu gỉ sắt.',
      'Thường xảy ra thành từng đám chỗ đất trũng ngập nước liên tục hoặc đất bón quá nhiều vôi.',
    ],
    causes: 'Thiếu vi lượng Kẽm (Zn) hữu hiệu trong đất ngập nước pH cao hoặc đất chua phèn nặng.',
    favorableConditions: 'Ruộng ngập nước sâu liên tục ngay sau gieo, đất kiềm hay đất giàu hữu cơ chưa phân hủy.',
    preventionMethods: 'Rút nước xen kẽ giúp thoáng đất; bón lót hoặc nhúng rễ mạ trong dung dịch Kẽm Oxit trước khi cấy.',
    safeManagement: 'Tháo cạn nhẹ nước ruộng 2–3 ngày kết hợp phun phân bón lá chứa Kẽm Chelate (Zn-EDTA) hoặc Kẽm Sunfat 0,5% (2 lần cách nhau 7 ngày).',
    immediate: [
      'Tháo bớt nước ngập ruộng và phun ngay phân bón lá Kẽm Chelate để cây hồi xanh sau 5–7 ngày.',
    ],
    biologicalAndCare: [
      'Tránh bón dồn quá nhiều phân lân và vôi cùng lúc ở ruộng có tiền sử thiếu Kẽm.',
    ],
    caution: [
      'Thiếu Kẽm hay bị phun nhầm thuốc trừ nấm Đốm nâu khiến lúa tốn tiền thuốc mà vẫn không khỏi.',
    ],
    references: 'IRRI Zinc Deficiency; Viện Lúa ĐBSCL.',
    standardCode: 'TCVN Vi lượng cây lúa',
  },
  {
    id: 'rice_deficiency_sulfur',
    cropType: 'rice',
    vietnameseName: 'Thiếu Lưu huỳnh (S) làm vàng đồng đều cả lá non trên lúa',
    englishName: 'Sulfur Deficiency in Rice',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Khác với thiếu Đạm vàng lá già trước, thiếu Lưu huỳnh làm CÁC LÁ NON trên ngọn chuyển vàng xanh nhạt trước rồi lan xuống toàn cây, khóm lúa ít nhánh và bông nhỏ.',
    checklist: [
      'Lá non phía trên chuyển màu vàng nhạt đồng đều trước lá già.',
      'Chiều cao cây thấp, đẻ nhánh thưa.',
    ],
    causes: 'Thiếu Lưu huỳnh (S) do liên tục chỉ dùng phân Urê, DAP và Kali không chứa lưu huỳnh.',
    favorableConditions: 'Đất cát pha nghèo hữu cơ, đốt bỏ hết rơm rạ ngoài đồng.',
    preventionMethods: 'Thay thế một phần Urê bằng phân Đạm Sunfat (SA) hoặc dùng Super Lân có chứa lưu huỳnh tự nhiên.',
    safeManagement: 'Bón bổ sung phân SA (Amoni Sunfat) hoặc phân bón lá có Lưu huỳnh.',
    immediate: [
      'Kiểm tra xem lá non trên ngọn hay lá già dưới gốc vàng trước để chọn đúng đạm SA hay Urê.',
    ],
    biologicalAndCare: [
      'Duy trì trả lại rơm rạ ủ phân hữu cơ giúp đất cân bằng trung vi lượng.',
    ],
    caution: [
      'Nếu ruộng quá chua (pH thấp) cần thận trọng liều lượng phân SA.',
    ],
    references: 'IRRI Sulfur Deficiency.',
    standardCode: 'TCVN Dinh dưỡng cây lúa',
  },
  {
    id: 'rice_salinity_heat_stress',
    cropType: 'rice',
    vietnameseName: 'Lúa bị cháy lá do gió Lào nóng hạn / Nhiễm mặn (Heat & Salinity Stress)',
    englishName: 'Rice Heat Scorch & Salinity Injury',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Chóp lá lúa bị cháy trắng hoặc bạc xoắn khô giòn đồng loạt sau đợt gió Tây Nam khô nóng (gió Lào >38°C) hoặc khi nước xâm nhập mặn làm đầu lá trắng cháy, nếu gặp lúc trỗ làm bông lúa trắng lép hàng loạt (lép sinh lý).',
    checklist: [
      'Đầu chóp lá cháy khô trắng đồng loạt trên cả ruộng hướng đón gió nóng hoặc gần cửa sông mặn.',
      'Lúc lúa trỗ gặp gió nóng >38°C làm hạt lép trắng không tạo sữa (không có vết đen cổ bông hay sâu đục).',
    ],
    causes: 'Sốc nhiệt gió Tây Nam khô nóng (gió Lào Bắc Trung Bộ) hoặc độ mặn nước tưới vượt >2‰.',
    favorableConditions: 'Vụ Hè Thu Nghệ An, Hà Tĩnh, Quảng Bình tháng 5–7 gió Lào thổi mạnh, hoặc ruộng ven biển thiếu nước ngọt.',
    preventionMethods: 'Bố trí lịch thời vụ tránh để lúa trỗ vào cao điểm nắng nóng; dùng giống chịu mặn, chịu nóng.',
    safeManagement: 'Dâng mực nước ruộng lên 7–10 cm để hạ nhiệt cho khóm lúa trong những ngày gió Lào; tuyệt đối không lấy nước mặn vượt ngưỡng vào ruộng; phun Kali-Silic hoặc Amino acid tăng chống chịu.',
    immediate: [
      'Đo độ mặn nước kênh trước khi bơm vào ruộng (phải <1,5–2‰ với lúa mẫn cảm).',
      'Giữ mực nước ngọt mát trong ruộng những ngày nắng nóng gay gắt.',
    ],
    biologicalAndCare: [
      'Phun bổ sung chế phẩm Silic, Amino Acid hoặc rong biển giúp lá giảm thoát hơi nước.',
    ],
    caution: [
      'Không phun thuốc BVTV hay phân bón nồng độ cao giữa lúc gió Lào nắng gắt trên 36°C.',
    ],
    references: 'Viện ASIR Bắc Trung Bộ; IRRI Abiotic Stress Guide.',
    standardCode: 'TCVN Ứng phó thời tiết Bắc Trung Bộ',
  },

  // =========================================================================
  // III. CÂY LẠC / ĐẬU PHỘNG (+30 BỆNH / SÂU HẠI / THIẾU DINH DƯỠNG)
  // =========================================================================
  {
    id: 'peanut_diplodia_collar_rot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Héo rũ mốc đen thân lạc (Diplodia Collar Rot)',
    englishName: 'Peanut Diplodia Collar Rot (Lasiodiplodia theobromae)',
    affectedPlantParts: ['stem', 'other'],
    symptoms:
      'Cây lạc đang xanh tốt bỗng héo rũ đột ngột và chết khô; vùng thân ngay sát mặt đất bị thối nâu nhũn rồi khô xơ tách sợi, trên bề mặt mọc các hạt chấm đen li ti (khác với thối trắng gốc có sợi mốc trắng và hạch nâu của nấm Sclerotium).',
    checklist: [
      'Thân sát gốc bị thối xám đen, tưa sợi gỗ và có nhiều chấm đen nhỏ bám trên vỏ gốc.',
      'Cây héo rũ từng cây hoặc cụm nhỏ vào những ngày nắng nóng sau mưa.',
    ],
    causes: 'Nấm Lasiodiplodia theobromae (Diplodia gossypina).',
    favorableConditions: 'Nắng nóng xen kẽ mưa giông, vết xước ở cổ rễ khi làm cỏ hoặc vun gốc.',
    preventionMethods: 'Tránh làm xước gốc khi vun xới; luân canh với cây lúa hoặc ngô; xử lý hạt giống trước khi gieo.',
    safeManagement: 'Nhổ bỏ cây bệnh tiêu hủy rắc vôi; giữ rãnh thoát nước tốt và bổ sung nấm đối kháng Trichoderma.',
    immediate: [
      'Nhổ bỏ ngay các cây lạc bị héo đen gốc đem ra khỏi ruộng, rắc vôi bột vào hốc vừa nhổ.',
    ],
    biologicalAndCare: [
      'Tưới bổ sung nấm đối kháng Trichoderma cho các hàng lạc xung quanh.',
    ],
    caution: [
      'Phân biệt với Héo xanh vi khuẩn (thân gốc vẫn còn xanh cứng, cắt ngang gốc ngâm vào ly nước thấy dòng dịch sữa trắng đục chảy ra).',
    ],
    references: 'ICRISAT Peanut Disease Compendium; APS Peanut Collar Rot.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_pythium_pod_rot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Thối ướt đen củ lạc (Pythium Pod Rot)',
    englishName: 'Peanut Pythium Pod Rot',
    affectedPlantParts: ['fruit', 'other'],
    symptoms:
      'Củ lạc non và củ đang vào chắc bị thối mềm ướt màu nâu đen, vỏ củ mục nát dễ vỡ khi nhổ lên, phần nhân bên trong thối nhớt đen (khác với thối khô của Rhizoctonia).',
    checklist: [
      'Nhổ bụi lạc lên thấy nhiều củ bị thối mềm mọng nước màu nâu đen.',
      'Vỏ củ tróc nát, bóp nhẹ xì nước nhớt mùi hôi.',
    ],
    causes: 'Nấm giả Pythium myriotylum và P. ultimum.',
    favorableConditions: 'Đất ẩm ướt đọng nước kéo dài giai đoạn củ phát triển, đất thiếu Canxi.',
    preventionMethods: 'Lên luống cao thoát nước tốt, bón đủ vôi/Canxi lúc ra hoa đâm tia.',
    safeManagement: 'Khơi rãnh thoát nước ngay nếu đất bị úng; xử lý đất bằng Trichoderma hoặc Metalaxyl-M giai đoạn đâm tia nếu ruộng có tiền sử nặng.',
    immediate: [
      'Rút kiệt nước đọng ở rãnh luống lạc ngay sau mưa lớn.',
    ],
    biologicalAndCare: [
      'Bón vôi (CaO hoặc thạch cao) vào hai bên mép luống lúc lạc ra hoa rộ để vỏ củ cứng chắc kháng nấm.',
    ],
    caution: [
      'Không nhổ thu hoạch chậm khi củ đã già gặp mưa dầm vì củ sẽ thối hàng loạt dưới đất.',
    ],
    references: 'APS Peanut Pod Rot Complex; Viện BVTV.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_fusarium_wilt',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Héo vàng Fusarium hại lạc (Peanut Fusarium Wilt)',
    englishName: 'Peanut Fusarium Wilt (Fusarium oxysporum)',
    affectedPlantParts: ['stem', 'leaf', 'other'],
    symptoms:
      'Lá lạc chuyển vàng nhạt rồi héo rũ dần từ nhánh dưới lên trong vài ngày (không héo đột ngột khi lá vẫn còn xanh như Héo xanh vi khuẩn). Bổ dọc phần gốc thân thấy các bó mạch dẫn gỗ bên trong chuyển màu nâu đen rõ rệt.',
    checklist: [
      'Cây héo kèm lá chuyển VÀNG dần trước khi rụng.',
      'Chẻ dọc thân gốc gần rễ thấy mạch dẫn gỗ bên trong bị thâm nâu sẫm.',
      'Ngâm thân vào nước trong KHÔNG thấy tia dịch vi khuẩn trắng đục chảy ra.',
    ],
    causes: 'Nấm đất Fusarium oxysporum.',
    favorableConditions: 'Đất chua trồng lạc độc canh nhiều vụ liên tiếp, đất nhiễm tuyến trùng.',
    preventionMethods: 'Luân canh lạc – lúa nước; bón phân hữu cơ ủ nấm đối kháng Trichoderma.',
    safeManagement: 'Nhổ bỏ cây bệnh rắc vôi; xử lý hốc đất bằng Trichoderma và kiểm soát tuyến trùng.',
    immediate: [
      'Kiểm tra phân biệt với Héo xanh vi khuẩn bằng cách ngâm đoạn gốc cắt vát vào cốc nước sạch trong 5 phút.',
      'Nhổ tiêu hủy cây bệnh và rắc vôi bột khử trùng chỗ hốc vừa nhổ.',
    ],
    biologicalAndCare: [
      'Luân canh vụ sau với cây Lúa nước hoặc Ngô để cắt nguồn nấm Fusarium tồn lưu trong đất.',
    ],
    caution: [
      'Thuốc kháng sinh trị vi khuẩn sẽ không có tác dụng nếu cây bị héo vàng do nấm Fusarium.',
    ],
    references: 'ICRISAT Peanut Wilt Diseases.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_cylindrocladium_black_rot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Thối đen rễ & cổ thân lạc (CBR - Cylindrocladium Black Rot)',
    englishName: 'Cylindrocladium Black Rot (Calonectria ilicicola)',
    affectedPlantParts: ['other', 'stem', 'fruit'],
    symptoms:
      'Cây lạc héo vàng lùn dần từng chòm trên ruộng; rễ cái và rễ con bị thối đen cụt hết, phần thân sát gốc chuyển màu nâu đen kèm nhiều cụm quả thể nấm nhỏ màu đỏ gạch li ti rất đặc trưng.',
    checklist: [
      'Toàn bộ rễ cọc và rễ phụ bị thối đen mủn gãy cụt.',
      'Sát mặt đất quanh gốc thân có các cụm chấm nhỏ li ti màu ĐỎ GẠCH (rất dễ nhận biết bằng mắt thường hoặc kính lúp).',
    ],
    causes: 'Nấm Calonectria ilicicola (Cylindrocladium parasiticum).',
    favorableConditions: 'Thời tiết mát ẩm (20–25°C) ở vụ Xuân, đất ẩm ướt.',
    preventionMethods: 'Dùng giống kháng, luân canh với cây ngô hoặc lúa, vệ sinh tàn dư triệt để.',
    safeManagement: 'Nhổ tiêu hủy cây bệnh sớm; giữ luống thoát nước tốt và không trồng lại lạc trên khu đất đó trong 2–3 năm.',
    immediate: [
      'Kiểm tra phần gốc thân sát mặt đất xem có cụm bào tử đỏ gạch li ti và thối đen cụt rễ không.',
    ],
    biologicalAndCare: [
      'Chuyển sang luân canh cây họ Hòa thảo (Lúa, Ngô) ở vụ tiếp theo.',
    ],
    caution: [
      'Tuyệt đối không dùng thân lá lạc từ ruộng bị bệnh CBR để ủ phân tươi bón lại cho ruộng lạc.',
    ],
    references: 'Virginia Tech & UF/IFAS Peanut CBR Guide.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_sclerotinia_blight',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Thối gốc thân hạch đen lạc (Sclerotinia Blight)',
    englishName: 'Peanut Sclerotinia Blight (Sclerotinia minor)',
    affectedPlantParts: ['stem'],
    symptoms:
      'Trên thân cành sát gốc xuất hiện vết úng màu xám nhạt sau khô trắng tưa xơ như rơm mục, kèm lớp tơ nấm trắng tinh và các hạch nấm màu ĐEN hình dạng bất định (khác hạch tròn màu nâu vàng của bệnh Thối trắng gốc Sclerotium rolfsii).',
    checklist: [
      'Cành thân bị tẩy trắng xơ xác dọc theo chiều dài cành sát mặt đất.',
      'Bên trong và trên thân bệnh có các cục hạch nấm màu ĐEN sẫm cứng.',
    ],
    causes: 'Nấm Sclerotinia minor và S. sclerotiorum.',
    favorableConditions: 'Nhiệt độ mát dưới 25°C kèm mưa phùn ẩm ướt, tán lạc rậm rạp kín luống.',
    preventionMethods: 'Gieo mật độ hợp lý không quá dày, giữ tán thoáng gió, luân canh lúa nước.',
    safeManagement: 'Ngưng tưới đẫm khi trời mát ẩm; phun nấm đối kháng Coniothyrium minitans / Trichoderma hoặc thuốc đặc trị hạch nấm khi mới phát hiện.',
    immediate: [
      'Thu gom loại bỏ các cành bị xơ trắng kèm hạch đen ra khỏi ruộng.',
    ],
    biologicalAndCare: [
      'Cày lật sâu hoặc cho ngập nước vụ lúa tiếp theo để tiêu diệt hạch đen lưu tồn.',
    ],
    caution: [
      'Phân biệt kỹ với Thối trắng gốc (hạch tròn đều như hạt cải màu vàng nâu).',
    ],
    references: 'APS Peanut Sclerotinia Blight.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_web_blotch',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Đốm mạng nhện / Đốm vằn lá lạc (Peanut Web Blotch)',
    englishName: 'Peanut Web Blotch (Phoma arachidicola)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Mặt trên lá lạc xuất hiện các vết đốm loang màu nâu tía hình mạng lưới mờ hoặc tia sọc phân nhánh như mạng nhện trước khi hợp lại thành vết nâu sẫm viền mờ làm rụng lá sớm.',
    checklist: [
      'Trên mặt trên lá có các vệt nâu tím phân nhánh dạng mạng lưới mờ.',
      'Vết bệnh mở rộng thành mảng nâu sẫm làm lá vàng rụng sớm.',
    ],
    causes: 'Nấm Peyronellaea arachidicola (Phoma arachidicola).',
    favorableConditions: 'Thời tiết mát ẩm (15–22°C), sương mù nhiều ở vụ Xuân.',
    preventionMethods: 'Dọn sạch tàn dư lá lạc vụ trước, luân canh cây trồng.',
    safeManagement: 'Phun các hoạt chất trừ nấm lá (Chlorothalonil, Azoxystrobin, Difenoconazole) khi bệnh bắt đầu xuất hiện.',
    immediate: [
      'Quan sát mặt trên lá chét tìm vết loang dạng mạng lưới phân biệt với vết tròn nét của Đốm nâu/Đốm đen.',
    ],
    biologicalAndCare: [
      'Phun luân phiên thuốc trừ nấm phổ rộng an toàn nếu bệnh lan lên tầng lá giữa.',
    ],
    caution: [
      'Thường dễ bị nhầm với Đốm đen muộn nên cần soi kỹ mặt dưới lá xem có ổ bào tử đen gồ hay không.',
    ],
    references: 'ICRISAT Peanut Foliar Diseases.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_anthracnose',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Thán thư hại lá thân lạc (Peanut Anthracnose)',
    englishName: 'Peanut Anthracnose (Colletotrichum dematium)',
    affectedPlantParts: ['leaf', 'stem'],
    symptoms:
      'Trên lá lạc xuất hiện các vết cháy khô màu nâu sáng viền nâu sẫm không đều, chủ yếu từ mép lá lan vào, giữa vết cháy có vòng đồng tâm và các chấm đen li ti. Trên cuống và thân có vết lõm dài màu nâu đen.',
    checklist: [
      'Vết khô cháy bắt đầu từ mép lá chét hoặc chóp lá có viền nâu đậm và chấm đen nhỏ.',
      'Cuống lá và thân non có vết thâm nâu lõm.',
    ],
    causes: 'Nấm Colletotrichum spp.',
    favorableConditions: 'Mưa gió giông làm dập lá, độ ẩm cao kéo dài.',
    preventionMethods: 'Thoát nước tốt, thu dọn tàn dư cây bệnh, bón cân đối Kali và Canxi.',
    safeManagement: 'Phun gốc đồng sinh học, Mancozeb hoặc Azoxystrobin khi bệnh chớm trên 5–10% số lá.',
    immediate: [
      'Ngưng phun phân bón lá giàu đạm và giữ rãnh thoát nước khô thoáng.',
    ],
    biologicalAndCare: [
      'Phun phòng trừ bằng chế phẩm sinh học hoặc hoạt chất Azoxystrobin vào chiều mát.',
    ],
    caution: [
      'Phân biệt với cháy nắng gió Lào (vết cháy bạc trắng đồng loạt không có chấm đen bào tử).',
    ],
    references: 'Viện Bảo vệ Thực vật Việt Nam.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_powdery_mildew',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Phấn trắng lá lạc (Peanut Powdery Mildew)',
    englishName: 'Peanut Powdery Mildew (Oidium arachidis)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Mặt trên lá lạc xuất hiện những đốm phủ lớp bột phấn màu trắng xám mịn, sau lan rộng toàn bộ phiến lá làm lá quăn nhẹ, vàng úa rồi khô rụng sớm.',
    checklist: [
      'Lớp bột phấn trắng mịn như rắc bột mì phủ trên mặt trên lá chét.',
      'Lau nhẹ lớp phấn thấy mô lá bên dưới bị ố vàng.',
    ],
    causes: 'Nấm Oidium arachidis.',
    favorableConditions: 'Giai đoạn chuyển mùa sáng có sương mù, trưa hanh khô, ruộng trồng dày rậm tán.',
    preventionMethods: 'Gieo đúng mật độ giúp thông thoáng tán ruộng.',
    safeManagement: 'Phun lưu huỳnh thấm nước, chế phẩm Bacillus subtilis hoặc Hexaconazole khi lớp phấn mới lác đác.',
    immediate: [
      'Phun phủ đều mặt trên tán lá vào lúc sáng sớm hoặc chiều mát.',
    ],
    biologicalAndCare: [
      'Không trồng quá dày để gió và nắng lọt xuống khe luống lạc.',
    ],
    caution: [
      'Tránh phun lưu huỳnh vào lúc nắng trưa gay gắt trên 33°C.',
    ],
    references: 'ICRISAT Compendium.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_pepper_spot_leaf_scorch',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Đốm tiêu & Cháy đầu lá lạc (Pepper Spot & Leaf Scorch)',
    englishName: 'Peanut Pepper Spot & Leaf Scorch (Leptosphaerulina crassiasca)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Trên lá xuất hiện dày đặc các chấm đen nâu li ti như rắc hạt tiêu ("đốm tiêu") hoặc mảng cháy hình chữ V màu nâu sẫm viền vàng bắt đầu từ đầu chóp lá lan xuống ("cháy đầu lá").',
    checklist: [
      'Mặt lá có nhiều chấm đen nhỏ xíu như hạt tiêu hoặc vết cháy hình nêm chữ V ở đỉnh lá chét.',
      'Phần mép vết cháy ở chóp lá có viền vàng hẹp.',
    ],
    causes: 'Nấm Leptosphaerulina crassiasca.',
    favorableConditions: 'Thời tiết ẩm ấm xen kẽ nắng mưa lúc lạc đang phát triển quả.',
    preventionMethods: 'Luân canh cây trồng và thu dọn sạch thân lá lạc sau thu hoạch.',
    safeManagement: 'Phun kết hợp trong lịch phòng trừ Đốm nâu/Đốm đen lá lạc bằng Chlorothalonil hoặc Difenoconazole.',
    immediate: [
      'Kiểm tra mật độ lá nhiễm ở tầng giữa để quyết định phun bảo vệ lá quang hợp nuôi củ.',
    ],
    biologicalAndCare: [
      'Bổ sung phân Kali qua lá giúp tăng độ dày biểu bì lá.',
    ],
    caution: [
      'Vết cháy hình chữ V ở chóp lá hay bị nhầm với vết chích hút của rầy xanh làm cháy mép lá (hopperburn).',
    ],
    references: 'APS Peanut Pepper Spot Guide.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_mottle_stripe_virus',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Khảm lá sọc virus hại lạc (Peanut Mottle / Stripe Virus)',
    englishName: 'Peanut Mottle & Peanut Stripe Virus (PMV / PStV)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Lá non xuất hiện các mảng màu xanh đậm và xanh nhạt/vàng xen kẽ loang lổ dạng khảm, hoặc có các vệt sọc xanh đậm dọc theo gân lá và vòng khoen xanh. Cây còi cọc thấp hơn bình thường, củ ít và nhỏ.',
    checklist: [
      'Lá non có hoa văn khảm loang lổ xanh đậm – xanh nhạt hoặc sọc xanh quanh gân lá.',
      'Phiến lá hơi cong vênh gợn sóng nhưng không có ổ phấn nấm hay bọ ăn lá.',
    ],
    causes: 'Virus PMV / PStV truyền qua hạt giống nhiễm bệnh và qua rệp muội đen (Aphis craccivora).',
    favorableConditions: 'Lấy hạt giống từ ruộng bị virus vụ trước và ruộng có nhiều rệp muội.',
    preventionMethods: 'Chọn giống sạch bệnh từ ruộng khỏe; diệt trừ rệp muội đen kịp thời từ đầu vụ.',
    safeManagement: 'Nhổ bỏ sớm các cây bị khảm virus nặng; phun phòng trừ rệp muội đen bằng dầu khoáng hoặc nước tỏi ớt.',
    immediate: [
      'Kiểm tra xem dưới ngọn non có rệp muội đen bu hút truyền virus không.',
      'Nhổ bỏ các cây còi khảm nặng để không lây lan sang cây khỏe qua rệp.',
    ],
    biologicalAndCare: [
      'Tuyệt đối không giữ hạt từ ruộng có tỷ lệ khảm virus cao để làm giống cho vụ sau.',
    ],
    caution: [
      'Không có thuốc hóa học chữa khỏi bệnh virus.',
    ],
    references: 'ICRISAT Peanut Viruses; Viện Bảo vệ Thực vật.',
    standardCode: 'TCVN Giống Lạc sạch bệnh',
  },
  {
    id: 'peanut_bud_necrosis_virus',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Hoại tử chồi ngọn / Chùn ngọn virus hại lạc (Bud Necrosis)',
    englishName: 'Peanut Bud Necrosis Virus (PBNV)',
    affectedPlantParts: ['leaf', 'stem'],
    symptoms:
      'Lá non xuất hiện các vòng tròn hoại tử vàng nâu, đỉnh chồi ngọn bị thâm đen chết hoại tử, các đốt thân ngắn lại khiến cây lạc chùn thấp xum xuê dạng bụi ("chùn ngọn") và gần như không có củ.',
    checklist: [
      'Đỉnh chồi ngọn bị chết đen thui ("hoại tử ngọn").',
      'Lá non có các đốm vòng tròn nhỏ màu vàng nhạt hoặc nâu hoại tử.',
      'Cây mọc lùn chùn thành bụi tròn nhỏ, lá nhỏ xoăn.',
    ],
    causes: 'Virus PBNV do bọ trĩ (Thrips palmi / Frankliniella) truyền.',
    favorableConditions: 'Mùa khô nóng nắng hạn nhiều bọ trĩ phá hại ở giai đoạn cây con 15–40 ngày.',
    preventionMethods: 'Gieo trồng đồng loạt, trồng xen ngô làm hàng rào cản bọ trĩ, quản lý bọ trĩ sớm.',
    safeManagement: 'Phun trừ bọ trĩ kịp thời ở giai đoạn cây con; nhổ tiêu hủy sớm cây chùn ngọn.',
    immediate: [
      'Nhổ bỏ ngay các cây lạc bị chết đen đỉnh ngọn và kiểm tra mật độ bọ trĩ trên các cây còn lại.',
    ],
    biologicalAndCare: [
      'Tưới đủ ẩm và phun dầu neem / Spinetoram kiểm soát bọ trĩ môi giới.',
    ],
    caution: [
      'Phun phân kích ngọn không giúp cây bị chùn ngọn virus bình phục được.',
    ],
    references: 'ICRISAT Peanut Bud Necrosis Virus.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_thrips',
    cropType: 'peanut',
    vietnameseName: 'Bọ trĩ hại lá non cây lạc (Peanut Thrips)',
    englishName: 'Peanut Thrips (Frankliniella schultzei / Thrips palmi)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Bọ trĩ chích hút nhựa ở lá non còn đang xếp nếp trong búp làm lá mở ra bị nhăn nhúm, rìa mép lá quăn cong lên, có nhiều vết sẹo xước màu trắng bạc hoặc nâu xám dọc gân lá mặt dưới.',
    checklist: [
      'Lá non bị nhăn rúm, mép lá cong gợn kèm các vệt sẹo bạc xước ở mặt dưới.',
      'Tách búp lá non đang gấp nếp thấy bọ trĩ nhỏ dài màu vàng nâu bò nhanh.',
    ],
    causes: 'Bọ trĩ (Thrips spp. / Frankliniella spp.).',
    favorableConditions: 'Nắng hạn khô kéo dài đầu vụ Hè Thu hoặc cuối vụ Xuân.',
    preventionMethods: 'Tưới giữ ẩm rãnh luống kịp thời khi trời khô hanh.',
    safeManagement: 'Treo bẫy dính xanh dương theo dõi; phun dầu khoáng hoặc Spinetoram/Abamectin khi mật độ làm quăn >15% ngọn.',
    immediate: [
      'Tách búp lá non kiểm tra xác nhận có bọ trĩ trước khi xử lý.',
    ],
    biologicalAndCare: [
      'Tưới phun giữ ẩm kết hợp phun chế phẩm sinh học Spinetoram vào chiều mát.',
    ],
    caution: [
      'Thường dễ nhầm với bệnh virus khảm lá hoặc ngộ độc thuốc cỏ tiền nảy mầm.',
    ],
    references: 'UC IPM & Virginia Tech Peanut Thrips.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_leafhopper_jassid',
    cropType: 'peanut',
    vietnameseName: 'Rầy xanh chích hút gây vàng mép lá lạc ("Cháy rầy lạc")',
    englishName: 'Peanut Potato Leafhopper / Jassid (Empoasca fabae)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Rầy xanh rất nhỏ (2–3 mm) chạy ngang ở mặt dưới lá chích hút nhựa làm chóp lá và rìa lá chuyển vàng thành hình chữ V ("hopperburn"), sau đó khô cháy nâu rìa lá làm ruộng lạc rực vàng khi gặp hạn.',
    checklist: [
      'Chóp lá lạc chuyển màu vàng hình tam giác chữ V rồi khô cháy dần vào trong.',
      'Lật mặt dưới lá thấy rầy màu xanh lục rất nhỏ bò ngang rất nhanh hoặc nhảy đi khi động tới.',
    ],
    causes: 'Rầy xanh chích hút Empoasca kerri / E. fabae.',
    favorableConditions: 'Thời tiết nóng ẩm xen kẽ nắng hạn kéo dài ở giai đoạn lạc ra hoa – đâm tia.',
    preventionMethods: 'Trồng giống lạc có lông lá nhiều kháng rầy, giữ ẩm ruộng.',
    safeManagement: 'Phun dầu khoáng sinh học hoặc chế phẩm thảo mộc/thuốc trừ rầy chọn lọc hướng vào mặt dưới lá.',
    immediate: [
      'Khua nhẹ tán lạc vào buổi sáng xem có nhiều rầy xanh nhỏ bay/nhảy ra từ mặt dưới lá không.',
    ],
    biologicalAndCare: [
      'Phun ướt mặt dưới lá bằng chế phẩm sinh học hoặc dầu khoáng vào lúc chiều mát.',
    ],
    caution: [
      'Rất dễ nhầm vết vàng chữ V ở chóp lá lạc do rầy xanh với bệnh Đốm tiêu cháy lá hoặc thiếu Kali.',
    ],
    references: 'ICRISAT Peanut Leafhopper; NCSU Peanut Portal.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_spider_mite',
    cropType: 'peanut',
    vietnameseName: 'Nhện đỏ hai chấm hại lá lạc (Two-Spotted Spider Mite)',
    englishName: 'Two-Spotted Spider Mite on Peanut (Tetranychus urticae)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Mặt trên lá lạc xuất hiện dày đặc các chấm nhỏ li ti màu trắng bạc hoặc vàng xám ("bạc lá"), lật mặt dưới lá thấy mạng tơ nhện cực mỏng và những con nhện li ti màu đỏ hoặc xanh vàng có hai chấm đen.',
    checklist: [
      'Mặt trên lá mất màu xanh bóng, lốm đốm bạc trắng li ti dày đặc.',
      'Mặt dưới lá có mạng tơ mỏng và nhện siêu nhỏ bò chậm.',
      'Thường khởi phát từ mép bờ ruộng nhiều bụi đất khi trời nắng hạn.',
    ],
    causes: 'Nhện đỏ hai chấm Tetranychus urticae.',
    favorableConditions: 'Hạn hán kéo dài, nắng nóng gió Lào khô hanh (>32°C), lạm dụng thuốc trừ sâu cúc tổng hợp.',
    preventionMethods: 'Tưới giữ ẩm định kỳ mùa khô hạn; không phun thuốc trừ sâu phổ rộng khi không có sâu ăn lá.',
    safeManagement: 'Tưới phun mưa rửa bụi kết hợp phun dầu khoáng nông nghiệp hoặc hoạt chất đặc trị nhện tập trung vào mặt dưới lá.',
    immediate: [
      'Tưới ẩm rãnh luống và phun ướt đẫm mặt dưới lá ở các chòm bờ ruộng nơi nhện mới phát sinh.',
    ],
    biologicalAndCare: [
      'Phun dầu khoáng hoặc thuốc trừ nhện chọn lọc 2 lần cách nhau 7 ngày để diệt cả nhện nở từ trứng.',
    ],
    caution: [
      'Phun thuốc trừ sâu thông thường lên ổ nhện đỏ sẽ tiêu diệt thiên địch và làm nhện bùng phát gấp bội.',
    ],
    references: 'UC IPM Spider Mites; NCSU Peanut Spider Mites.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_leaf_miner_folder',
    cropType: 'peanut',
    vietnameseName: 'Sâu cuốn lá / Sâu gập lá lạc (Peanut Leaf Miner & Folder)',
    englishName: 'Groundnut Leaf Miner (Aproaerema modicella)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Sâu non nhỏ màu xanh nâu gập đôi lá chét lạc lại hoặc đục một ổ phồng trắng nhỏ trên phiến lá rồi ăn sạch mô xanh bên trong làm lá khô trắng quắt lại như bị cháy nắng.',
    checklist: [
      'Nhiều lá chét bị gập đôi dính mép bằng tơ mỏng hoặc có túi phồng nâu trắng.',
      'Mở nếp lá gập ra thấy sâu non nhỏ dài 5–8 mm màu xanh xám đầu đen.',
    ],
    causes: 'Sâu cuốn lá/vẽ bùa lạc Aproaerema modicella.',
    favorableConditions: 'Nắng nóng khô hanh xen mưa nhẹ từ 30–70 ngày sau gieo.',
    preventionMethods: 'Luân canh với ngô hoặc lúa, vệ sinh cỏ bờ và tàn dư sau thu hoạch.',
    safeManagement: 'Khi mật độ trên 5–10 ổ/cây dùng chế phẩm vi khuẩn Bt, Abamectin hoặc Emamectin phun ướt đều tán lá.',
    immediate: [
      'Tách thử các lá lạc bị gập dính mép xem sâu còn nằm bên trong hay đã hóa nhộng.',
    ],
    biologicalAndCare: [
      'Phun chế phẩm trừ sâu sinh học vào chiều mát và giữ ruộng đủ ẩm.',
    ],
    caution: [
      'Chú ý bảo vệ ong ký sinh tự nhiên sống trong ổ sâu gập lá.',
    ],
    references: 'ICRISAT Groundnut Leaf Miner.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_black_cutworm',
    cropType: 'peanut',
    vietnameseName: 'Sâu xám cắt ngang gốc cây lạc con (Black Cutworm)',
    englishName: 'Black Cutworm on Peanut (Agrotis ipsilon)',
    affectedPlantParts: ['stem', 'other'],
    symptoms:
      'Cây lạc con mới mọc (1–3 tuần tuổi) bị cắn đứt ngang thân sát mặt đất vào ban đêm, sáng ra thấy cây ngã héo nằm rạp tại chỗ hoặc bị kéo lấp vào hang đất.',
    checklist: [
      'Cây lạc con bị cắt đứt lìa ngang gốc giống như bị dao cắt.',
      'Bới nhẹ lớp đất ẩm sâu 2–3 cm ngay sát gốc cây bị đứt thấy con sâu to béo màu xám đen cuộn tròn.',
    ],
    causes: 'Sâu xám Agrotis ipsilon.',
    favorableConditions: 'Đầu vụ Xuân trời mát ẩm, ruộng làm đất chưa kỹ còn nhiều cỏ dại.',
    preventionMethods: 'Cày ải phơi đất kỹ trước khi gieo tối thiểu 2 tuần, làm sạch cỏ dại trước xuống giống.',
    safeManagement: 'Bới đất bắt sâu xám thủ công vào sáng sớm ngay cạnh cây mới bị cắn; đặt bả sinh học hoặc phun chế phẩm Bt vào gốc lúc chiều tối.',
    immediate: [
      'Đi dọc luống lạc con vào sáng sớm tìm cây vừa héo ngã và bới đất ngay sát đó bắt tiêu diệt sâu xám.',
    ],
    biologicalAndCare: [
      'Dặm lại hạt lạc vào chỗ khuyết ngay khi còn đầu vụ.',
    ],
    caution: [
      'Phun thuốc lên tán lá ban ngày không có tác dụng vì sâu xám trốn hoàn toàn dưới đất đến đêm mới chui lên.',
    ],
    references: 'Viện Bảo vệ Thực vật; ICRISAT Cutworms.',
    standardCode: 'TCVN IPM Lạc giai đoạn cây con',
  },
  {
    id: 'peanut_white_grub',
    cropType: 'peanut',
    vietnameseName: 'Sùng trắng / Ấu trùng bọ hung cắn rễ & củ lạc (White Grub)',
    englishName: 'Peanut White Grub (Holotrichia spp.)',
    affectedPlantParts: ['other', 'fruit'],
    symptoms:
      'Khóm lạc héo vàng chết từng đám; nhổ lên thấy bộ rễ bị cắn đứt cụt hết hoặc vỏ củ lạc bị cạp thủng lỗ to ăn rỗng hạt bên trong. Đào đất dưới gốc thấy ấu trùng béo màu trắng sữa cong hình chữ C có đầu màu nâu cam.',
    checklist: [
      'Bụi lạc bị cắn đứt cụt phần rễ chính và rễ phụ nên nhổ lên rất dễ dàng.',
      'Đào đất quanh gốc gặp sâu trắng béo cong chữ C (sùng đất).',
      'Củ lạc dưới đất bị cạp nham nhở thủng lỗ to.',
    ],
    causes: 'Ấu trùng bọ hung (sùng đất) Holotrichia spp., Anomala spp.',
    favorableConditions: 'Đất cát nhẹ ven đồi hoặc ruộng bón phân chuồng tươi chưa ủ hoai mục.',
    preventionMethods: 'Ủ hoai mục phân chuồng hoàn toàn với nấm xanh Metarhizium; cày sâu phơi ải diệt nhộng.',
    safeManagement: 'Rải nấm xanh Metarhizium anisopliae trộn với phân hữu cơ vào rạch gieo trước khi xuống giống; tưới ngập nước 24–48 giờ nếu ruộng chủ động nước.',
    immediate: [
      'Bới kiểm tra đất ở các cụm lạc héo bất thường để xác định mật độ sùng trắng.',
    ],
    biologicalAndCare: [
      'Trộn chế phẩm nấm xanh Metarhizium anisopliae rải dọc gốc khi vun xới kết hợp giữ ẩm đất.',
    ],
    caution: [
      'Tuyệt đối không bón phân chuồng tươi sống chưa ủ vì mùi phân thu hút bọ hung cái đến đẻ trứng rất nhiều.',
    ],
    references: 'Viện Bảo vệ Thực vật; ICRISAT White Grubs.',
    standardCode: 'TCVN IPM Sâu đất hại Lạc',
  },
  {
    id: 'peanut_termite_cricket',
    cropType: 'peanut',
    vietnameseName: 'Mối & Dế mèn cắn vỏ củ lạc ngoài đồng (Termites & Crickets)',
    englishName: 'Peanut Termites & Soil Crickets',
    affectedPlantParts: ['fruit', 'stem'],
    symptoms:
      'Mối đục vào cổ rễ và cạp mỏng vỏ lụa bên ngoài vỏ củ lạc thành các đường ngoằn ngoèo màu nâu ("vỏ củ bị bóc rỗ"), nặng hơn thì đục thủng vào ăn hạt tạo đường cho nấm mốc vàng Aspergillus flavus xâm nhập.',
    checklist: [
      'Vỏ củ lạc bị cạp xước lớp màng ngoài loang lổ hoặc thủng lỗ nhỏ đầy bùn đất.',
      'Thấy mối đất hoặc lỗ hang dế quanh luống lạc ở vùng đất cát khô.',
    ],
    causes: 'Mối đất Odontotermes spp. và dế mèn.',
    favorableConditions: 'Đất cát đồi khô hạn vào giai đoạn củ lạc già sắp thu hoạch.',
    preventionMethods: 'Thu gom sạch cành gỗ mục rơm rạ khô trên đất trước khi cày; tưới giữ ẩm không để đất quá khô nẻ lúc củ già.',
    safeManagement: 'Thu hoạch lạc đúng độ chín sinh lý (không để quá lứa); tưới ẩm luống và dùng bả nấm xanh Metarhizium kiểm soát tổ mối.',
    immediate: [
      'Kiểm tra độ chín của củ lạc, nếu đã đạt trên 75–80% củ già nên thu hoạch sớm tránh mối cạp làm nhiễm nấm mốc Aflatoxin.',
    ],
    biologicalAndCare: [
      'Loại bỏ các củ bị mối đục thủng riêng ra khỏi lô lạc giữ giống hoặc làm thực phẩm.',
    ],
    caution: [
      'Củ bị mối cạp thủng rất dễ sinh độc tố nấm mốc vàng Aflatoxin gây hại sức khỏe.',
    ],
    references: 'ICRISAT Termite Damage & Aflatoxin Risk.',
    standardCode: 'TCVN An toàn thực phẩm Lạc',
  },
  {
    id: 'peanut_stem_borer',
    cropType: 'peanut',
    vietnameseName: 'Sâu đục thân củ lạc (Peanut Stem / Pod Borer)',
    englishName: 'Peanut Stem Borer',
    affectedPlantParts: ['stem', 'fruit'],
    symptoms:
      'Đỉnh nhánh lạc hoặc thân chính héo rũ gục xuống dù phần gốc dưới đất vẫn xanh tốt; tách dọc cành héo thấy có đường hầm rỗng kèm phân sâu nhỏ màu nâu và sâu/dòi đục thân bên trong.',
    checklist: [
      'Một nhánh lạc xanh bỗng héo rũ đột ngột từ giữa cành trở lên.',
      'Trên thân nhánh có lỗ đục nhỏ xíu đùn ít phân mịn.',
    ],
    causes: 'Sâu non đục thân / giòi đục thân cây họ đậu (Melanagromyza / Ostrinia).',
    favorableConditions: 'Vụ Hè Thu nóng ẩm, giai đoạn lạc phân cành rộ.',
    preventionMethods: 'Ngắt tiêu hủy ngay các nhánh héo có lỗ đục, luân canh cây trồng.',
    safeManagement: 'Ngắt bỏ cành bị đục; phun chế phẩm sinh học nếu tỷ lệ cành hại vượt >5%.',
    immediate: [
      'Bẻ kiểm tra cành lạc bị héo đơn lẻ: nếu gốc vẫn xanh mà giữa cành có lỗ đục rỗng thì ngắt tiêu hủy cành đó.',
    ],
    biologicalAndCare: [
      'Vun gốc nhẹ và chăm sóc các cành khỏe còn lại phát triển bù.',
    ],
    caution: [
      'Tránh nhầm với bệnh Héo xanh vi khuẩn (làm héo toàn bộ cây từ gốc lên).',
    ],
    references: 'Viện Bảo vệ Thực vật Việt Nam.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_whitefly',
    cropType: 'peanut',
    vietnameseName: 'Bọ phấn trắng hại lạc (Peanut Whitefly)',
    englishName: 'Silverleaf / Sweetpotato Whitefly on Peanut (Bemisia tabaci)',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Mặt dưới lá lạc có nhiều con bọ phấn trắng rất nhỏ (1 mm), vỗ nhẹ tán lá thấy bay lên hàng loạt như bụi phấn trắng. Bọ hút nhựa làm lá lốm đốm vàng, rỉ mật ngọt gây nấm muội đen và truyền bệnh virus.',
    checklist: [
      'Khua nhẹ lá lạc thấy đám côn trùng màu trắng nhỏ xíu bay tản ra.',
      'Mặt dưới lá có nhiều vảy trứng và ấu trùng dẹt màu trắng vàng.',
    ],
    causes: 'Bọ phấn trắng Bemisia tabaci.',
    favorableConditions: 'Nắng nóng khô hanh kéo dài, ruộng gần vườn rau màu (cà chua, dưa, đậu).',
    preventionMethods: 'Làm sạch cỏ dại ký chủ, treo bẫy dính màu vàng, luân canh với lúa.',
    safeManagement: 'Phun dầu khoáng nông nghiệp, dầu neem hoặc chế phẩm sinh học ướt mặt dưới lá vào sáng sớm khi bọ ít bay.',
    immediate: [
      'Treo bẫy dính vàng ven bờ ruộng lạc giáp ruộng rau màu.',
    ],
    biologicalAndCare: [
      'Phun phủ mặt dưới lá vào sáng sớm bằng dầu khoáng hoặc nước rửa tỏi ớt sinh học.',
    ],
    caution: [
      'Phun thuốc vào giữa trưa bọ bay tán loạn sẽ giảm hiệu quả.',
    ],
    references: 'UC IPM Whiteflies; ICRISAT.',
    standardCode: 'TCVN IPM Cây Lạc',
  },
  {
    id: 'peanut_root_knot_nematode',
    cropType: 'peanut',
    vietnameseName: 'Tuyến trùng nốt sưng rễ lạc (Peanut Root-Knot Nematode)',
    englishName: 'Peanut Root-Knot Nematode (Meloidogyne arenaria)',
    affectedPlantParts: ['other', 'fruit'],
    symptoms:
      'Ruộng lạc xuất hiện các chòm cây còi cọc, lá vàng xanh nhợt và héo rũ nhẹ vào buổi trưa nắng. Nhổ lên thấy rễ và cả vỏ củ non nổi nhiều cục u sần xù xì cứng (khác với nốt sần vi khuẩn cố định đạm tròn trơn nhẵn dễ bóp nát màu hồng bên trong).',
    checklist: [
      'Trên rễ lạc mọc các cục u sưng biến dạng liền mạch với trục rễ (bóp không tách rời ra dễ như nốt sần cố định đạm).',
      'Củ lạc bị nổi mụn u sần và sậm màu thối cục bộ.',
      'Ruộng bị còi cọc vàng lá thành từng khoảnh đất cát nhẹ.',
    ],
    causes: 'Tuyến trùng Meloidogyne arenaria và M. hapla.',
    favorableConditions: 'Đất cát pha ven biển trồng lạc liên tiếp nhiều năm.',
    preventionMethods: 'Luân canh lạc với lúa nước hoặc ngô/vừng; trồng xen vạn thọ hoặc cày phơi đất.',
    safeManagement: 'Bón nhiều phân hữu cơ hoai mục kết hợp chế phẩm nấm săn tuyến trùng Paecilomyces lilacinus trước khi gieo.',
    immediate: [
      'Nhổ kiểm tra kỹ sự khác biệt giữa NỐT SẦN CỐ ĐỊNH ĐẠM (hình cầu tròn đính bên hông rễ, bóp ra màu hồng tươi có lợi) và BƯỚU TUYẾN TRÙNG (sưng phình chính giữa trục rễ và củ).',
    ],
    biologicalAndCare: [
      'Bổ sung phân hữu cơ + chế phẩm sinh học Paecilomyces hoặc Trichoderma ở vụ gieo tiếp theo.',
    ],
    caution: [
      'Đừng nhầm nốt sần vi khuẩn Rhizobium màu hồng có lợi thành bệnh tuyến trùng!',
    ],
    references: 'NCSU & UF/IFAS Peanut Nematodes; Viện BVTV.',
    standardCode: 'TCVN IPM Tuyến trùng Lạc',
  },
  {
    id: 'peanut_seed_rot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Thối hạt lạc trước khi nảy mầm (Pre-Emergence Seed Rot)',
    englishName: 'Peanut Seed Rot & Damping-Off',
    affectedPlantParts: ['fruit', 'other'],
    symptoms:
      'Sau khi gieo 7–10 ngày hạt không mọc lên mặt đất; đào hốc kiểm tra thấy hạt lạc bị trương mềm thối nhũn, phủ lớp mốc trắng, đen hoặc vàng xanh.',
    checklist: [
      'Ruộng lạc mọc thưa thớt mất khoảng trống nhiều dù mới gieo.',
      'Bới hốc đất thấy hạt giống bị thối mềm mốc xanh/đen chưa kịp nhú mầm.',
    ],
    causes: 'Nấm Aspergillus niger, A. flavus, Rhizopus, Pythium nhiễm từ hạt giống ẩm hoặc đất rét ẩm.',
    favorableConditions: 'Hạt giống bảo quản ẩm, tách vỏ quá sớm trước khi gieo hoặc gặp mưa lạnh ngập hốc sau gieo.',
    preventionMethods: 'Chỉ tách vỏ hạt giống lạc sát ngày gieo (1–3 ngày); phơi nhẹ và chọn hạt chắc mẩy; trộn chế phẩm Trichoderma hoặc thuốc xử lý hạt trước khi trỉa.',
    safeManagement: 'Kiểm tra tỷ lệ nảy mầm trước khi gieo; giữ luống thoát nước rãnh tốt sau khi xuống giống.',
    immediate: [
      'Đào kiểm tra các hốc chưa mọc xem hạt bị thối mốc hay bị dế/chuột ăn để trỉa dặm kịp thời.',
    ],
    biologicalAndCare: [
      'Trộn hạt giống với chế phẩm nấm đối kháng Trichoderma trước khi gieo vụ sau.',
    ],
    caution: [
      'Tránh gieo lạc ngay trước khi có dự báo không khí lạnh kèm mưa dầm kéo dài.',
    ],
    references: 'Viện Cây lương thực & CTP; ICRISAT.',
    standardCode: 'TCVN Kỹ thuật gieo trồng Lạc',
  },
  {
    id: 'peanut_sunscald',
    cropType: 'peanut',
    vietnameseName: 'Cháy lá lạc do nắng gió Lào / Sốc nhiệt (Peanut Sunscald)',
    englishName: 'Peanut Heat & Sunscald Injury',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Mặt trên các lá ngọn hướng thẳng nắng xuất hiện các mảng cháy khô màu trắng ngà hoặc nâu nhạt đồng đều, không có vòng đồng tâm hay ổ bào tử nấm, thường xảy ra đồng loạt sau ngày nắng gắt trên 37°C hoặc vừa phun thuốc lúc trời nắng.',
    checklist: [
      'Mảng cháy trắng bạc hoặc nâu nhạt chỉ xuất hiện ở mặt lá ngửa lên hướng nắng gắt.',
      'Không thấy bào tử nấm, chấm đen hay quầng vàng lan rộng dần.',
    ],
    causes: 'Nhiệt độ cao cực đoan, gió Tây Nam khô nóng (gió Lào) hoặc cháy lá do phun phân/thuốc giữa trưa nắng.',
    favorableConditions: 'Tháng 4–6 vùng Bắc Trung Bộ gặp đợt gió Lào nóng khô trên đất cát thiếu ẩm.',
    preventionMethods: 'Tưới giữ ẩm luống lạc và che phủ rơm rạ giữ mát mặt luống.',
    safeManagement: 'Tưới rãnh giữ ẩm vào chiều mát và phun bổ sung Amino Acid / Kali-Silic nhẹ để cây phục hồi.',
    immediate: [
      'Tưới ẩm rãnh luống lạc vào chiều mát để hạ nhiệt vùng tán.',
    ],
    biologicalAndCare: [
      'Phủ rơm rạ giữa các hàng lạc vừa giữ ẩm vừa giúp tia lạc đâm xuống đất dễ dàng.',
    ],
    caution: [
      'Không cần phun thuốc trừ nấm vì đây là tổn thương thời tiết phi sinh vật.',
    ],
    references: 'Viện KHKT Nông nghiệp Bắc Trung Bộ.',
    standardCode: 'TCVN Canh tác Lạc Bắc Trung Bộ',
  },
  {
    id: 'peanut_deficiency_nitrogen',
    cropType: 'peanut',
    vietnameseName: 'Thiếu Đạm / Kém nốt sần cố định đạm trên cây lạc',
    englishName: 'Nitrogen Deficiency / Poor Nodulation in Peanut',
    affectedPlantParts: ['leaf', 'other'],
    symptoms:
      'Toàn bộ cây lạc có màu xanh vàng nhạt, lá già vàng đều trước, cây sinh trưởng còi cọc ít cành. Nhổ rễ kiểm tra thấy rất ít hoặc không có nốt sần tròn, hoặc bổ đôi nốt sần thấy bên trong màu trắng xanh chứ không có màu hồng đỏ tươi.',
    checklist: [
      'Toàn bộ thân lá vàng nhạt đồng đều, cây thấp yếu.',
      'Nhổ rễ thấy ít nốt sần hoặc nốt sần màu trắng xám bên trong (chứng tỏ vi khuẩn cố định đạm không hoạt động).',
    ],
    causes: 'Đất quá chua (pH < 5), thiếu Lân/Molypden hoặc đất chưa từng trồng lạc thiếu vi khuẩn Rhizobium.',
    favorableConditions: 'Ruộng mới chuyển đổi từ đất lúa sang trồng lạc hoặc đất cát chua không bón vôi.',
    preventionMethods: 'Bón vôi nâng pH đất, bón đủ lân và trộn chế phẩm vi khuẩn nốt sần Rhizobium vào hạt giống trước gieo.',
    safeManagement: 'Bón thúc bổ sung nhẹ đạm kết hợp lân và tưới ẩm nếu cây còn non; bổ sung vi lượng Molypden.',
    immediate: [
      'Nhổ 2–3 cây kiểm tra nốt sần ở rễ: nếu nốt sần ít/trắng bệch -> bổ sung nhẹ đạm + lân.',
    ],
    biologicalAndCare: [
      'Bón vôi và trộn chế phẩm Nitragin (Rhizobium) vào hạt giống ở vụ lạc tiếp theo.',
    ],
    caution: [
      'Không bón quá nhiều đạm hóa học liên tục vì sẽ làm vi khuẩn nốt sần tự nhiên của lạc ngừng hoạt động.',
    ],
    references: 'Viện Thổ nhưỡng Nông hóa; ICRISAT Peanut Nutrition.',
    standardCode: 'TCVN Dinh dưỡng Cây Lạc',
  },
  {
    id: 'peanut_deficiency_phosphorus',
    cropType: 'peanut',
    vietnameseName: 'Thiếu Lân (P) làm lá lạc xanh tối, ít hoa ít củ',
    englishName: 'Phosphorus Deficiency in Peanut',
    affectedPlantParts: ['leaf', 'fruit'],
    symptoms:
      'Cây lạc thấp còi, thân mảnh, lá nhỏ màu xanh tối sẫm hoặc ngả ánh tím đỏ nhẹ ở lá già; cây ra hoa thưa thớt, đâm tia kém và củ ít.',
    checklist: [
      'Lá nhỏ màu xanh tối sẫm hoặc có ánh đỏ tím ở lá gốc.',
      'Rễ phát triển yếu và nốt sần cố định đạm ít.',
    ],
    causes: 'Thiếu Lân (P) do đất chua phèn cố định lân hoặc bón lót thiếu.',
    favorableConditions: 'Đất đồi cát chua vùng Bắc Trung Bộ không bón lót vôi + lân.',
    preventionMethods: 'Bón lót đầy đủ phân lân nung chảy hoặc super lân kết hợp vôi và phân hữu cơ.',
    safeManagement: 'Bổ sung phân lân dễ tiêu kết hợp phun phân bón lá giàu Lân giai đoạn trước ra hoa.',
    immediate: [
      'Phun phân bón lá giàu Lân-Bo giúp kích thích ra hoa và hình thành nốt sần rễ.',
    ],
    biologicalAndCare: [
      'Bón lót đủ vôi + phân lân nung chảy ngay từ đầu vụ sau.',
    ],
    caution: [
      'Thiếu Lân kéo dài làm tỷ lệ tia đâm củ và nốt sần đạm giảm mạnh.',
    ],
    references: 'Viện Cây lương thực; ICRISAT.',
    standardCode: 'TCVN Dinh dưỡng Cây Lạc',
  },
  {
    id: 'peanut_deficiency_potassium',
    cropType: 'peanut',
    vietnameseName: 'Thiếu Kali (K) gây vàng mép và cháy rìa lá già cây lạc',
    englishName: 'Potassium Deficiency in Peanut',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Trên các lá già phía dưới bắt đầu xuất hiện viền vàng nhạt chạy quanh rìa mép lá chét, sau mép lá chuyển cháy nâu khô giòn và lá rụng sớm; củ lạc nhỏ và nhiều hạt lép.',
    checklist: [
      'Mép và chóp lá già cháy khô màu nâu viền vàng sáng.',
      'Cành yếu dễ đổ gục và củ nhiều hạt không mẩy.',
    ],
    causes: 'Thiếu Kali (K) trên đất cát rửa trôi mạnh.',
    favorableConditions: 'Đất cát biển hoặc đất bạc màu mưa lớn rửa trôi.',
    preventionMethods: 'Bón đủ Kali chia 2 đợt (bón lót và bón thúc lúc lạc ra hoa – xới vun gốc).',
    safeManagement: 'Bón bổ sung Kali hoặc tưới phân bón lá giàu Kali giai đoạn lạc đang nuôi củ.',
    immediate: [
      'Bón thúc ngay Kali (hoặc NPK cân đối giàu Kali) vào hai bên luống lúc đất đủ ẩm.',
    ],
    biologicalAndCare: [
      'Kết hợp tro bếp sạch hoặc phân hữu cơ để giữ Kali bền trong đất cát.',
    ],
    caution: [
      'Tránh nhầm với bệnh Đốm tiêu hoặc cháy mép do rầy xanh (cần lật mặt dưới lá xem có rầy xanh không).',
    ],
    references: 'NCSU Peanut Nutrition Guide.',
    standardCode: 'TCVN Dinh dưỡng Cây Lạc',
  },
  {
    id: 'peanut_deficiency_calcium',
    cropType: 'peanut',
    vietnameseName: 'Thiếu Canxi (Ca) gây lạc "ốp" lép hạt & vỏ củ đen mục ("Bệnh lạc lép")',
    englishName: 'Calcium Deficiency ("Pops" / Empty Pods) in Peanut',
    affectedPlantParts: ['fruit'],
    symptoms:
      'Thân lá lạc vẫn xanh tốt bình thường nhưng khi nhổ lên thu hoạch thấy rất nhiều củ bị "ốp" (củ to nhưng bên trong rỗng không có hạt hoặc hạt nhỏ lép teo đen rỗng - "black heart/pops"), vỏ củ mỏng yếu dễ bị thối đen.',
    checklist: [
      'Cây lạc xanh tốt rậm lá nhưng lúc nhổ rất nhiều củ bị lép rỗng hạt ("củ ốp").',
      'Vỏ củ mỏng yếu, dễ bị đen đầu củ khi gặp ẩm.',
    ],
    causes: 'Thiếu Canxi (Ca) hữu hiệu ngay tại tầng đất mặt 0–8 cm nơi tia lạc đâm xuống tạo củ (củ lạc hút Canxi trực tiếp từ đất quanh củ chứ ít nhận từ rễ chính).',
    favorableConditions: 'Đất cát chua không bón vôi/thạch cao vào vùng đâm tia, hoặc trời khô hạn đúng lúc lạc làm củ.',
    preventionMethods: 'Bón vôi bột (300–500 kg/ha) hoặc thạch cao (CaSO4) rải vào gốc luống đúng thời kỳ lạc ra hoa rộ bắt đầu đâm tia (30–40 ngày sau gieo).',
    safeManagement: 'Bổ sung Canxi-Bo dạng tưới gốc hoặc rải thạch cao mịn trực tiếp vào vùng tia đâm củ và giữ đất đủ ẩm.',
    immediate: [
      'Nếu lạc đang giai đoạn đâm tia làm củ non, rải ngay vôi bột loãng/thạch cao (hoặc tưới Canxi hòa tan) vào vùng gốc củ và tưới đủ ẩm.',
    ],
    biologicalAndCare: [
      'Luôn chuẩn bị vôi bột bón thúc đúng đợt lạc ra hoa rộ – xới vun gốc ở mọi vụ trồng trên đất cát.',
    ],
    caution: [
      'Phun Canxi lên LÁ lạc hầu như KHÔNG giúp hết bệnh củ lép, vì quả củ lạc hấp thu Canxi trực tiếp qua vỏ củ dưới đất.',
    ],
    references: 'Viện KHKT Nông nghiệp Bắc Trung Bộ; UF/IFAS Peanut Calcium Management.',
    standardCode: 'TCVN Kỹ thuật thâm canh Lạc',
  },
  {
    id: 'peanut_deficiency_iron',
    cropType: 'peanut',
    vietnameseName: 'Thiếu Sắt (Fe) gây bạc trắng lá non lạc (Vàng lá đất kiềm)',
    englishName: 'Iron Chlorosis in Peanut',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Các lá non mới nhú trên ngọn chuyển sang màu vàng chanh nhạt đến trắng bệch; ban đầu gân lá vẫn xanh nổi rõ, nặng hơn thì cả phiến lá non trắng bệch hoàn toàn và cháy khô rìa.',
    checklist: [
      'Xuất hiện trên CÁC LÁ NON trên ngọn cành trước (lá già bên dưới vẫn xanh).',
      'Thịt lá vàng sáng đến trắng trong khi các đường gân lá xanh nhạt vẫn hiện nét.',
    ],
    causes: 'Thiếu Sắt (Fe) hữu hiệu do bón quá nhiều vôi một lúc làm pH đất tăng quá cao (>7,3) hoặc đất úng lạnh.',
    favorableConditions: 'Đất cát ven biển giàu vỏ sò vôi hóa hoặc ruộng vừa rải lượng vôi quá lớn.',
    preventionMethods: 'Chia nhỏ lượng vôi bón lót đúng độ chua của đất; bổ sung nhiều phân hữu cơ hoai mục.',
    safeManagement: 'Phun phân bón lá chứa Sắt Chelate (Fe-EDTA / Fe-EDDHA) 0,1–0,2% lên tán lá 2 lần cách nhau 7–10 ngày.',
    immediate: [
      'Phun ngay phân vi lượng Sắt Chelate qua lá vào lúc chiều mát để ngọn non hồi xanh nhanh.',
    ],
    biologicalAndCare: [
      'Tăng cường phân hữu cơ ủ hoai để cân bằng pH vùng rễ cho vụ sau.',
    ],
    caution: [
      'Không bón thêm vôi bột vào luống lạc đang bị bạc trắng lá non kiểu này.',
    ],
    references: 'ICRISAT Iron Chlorosis in Groundnut.',
    standardCode: 'TCVN Vi lượng Cây Lạc',
  },
  {
    id: 'peanut_deficiency_sulfur',
    cropType: 'peanut',
    vietnameseName: 'Thiếu Lưu huỳnh (S) làm lá non lạc vàng nhạt & giảm dầu nhân hạt',
    englishName: 'Sulfur Deficiency in Peanut',
    affectedPlantParts: ['leaf'],
    symptoms:
      'Lá non trên ngọn chuyển vàng xanh đồng đều (kể cả gân lá, khác với thiếu Sắt còn gân xanh); cây phát triển chậm, ít cành nhánh, nhân hạt lạc nhỏ nhẹ kém béo.',
    checklist: [
      'Lá non trên ngọn vàng đều cả thịt lá lẫn gân lá.',
      'Cây nhỏ gọn ít cành, nốt sần cố định đạm kém phát triển.',
    ],
    causes: 'Thiếu Lưu huỳnh (S) do đất cát bạc màu và không dùng phân có gốc Sunfat.',
    favorableConditions: 'Đất cát ven biển mưa nhiều rửa trôi.',
    preventionMethods: 'Dùng phân Super Lân (chứa sẵn lưu huỳnh) hoặc bón thạch cao (CaSO4) vào giai đoạn đâm tia.',
    safeManagement: 'Bón bổ sung thạch cao (CaSO4) hoặc phân có chứa Lưu huỳnh (SA/Super Lân) kết hợp phun vi lượng.',
    immediate: [
      'Kiểm tra lại phân bón đầu vụ: nếu thiếu lưu huỳnh, bổ sung thạch cao hoặc phân bón lá chứa Lưu huỳnh.',
    ],
    biologicalAndCare: [
      'Duy trì bón Super Lân + phân hữu cơ hoai mục hàng vụ.',
    ],
    caution: [
      'Phân biệt thiếu Lưu huỳnh (vàng cả gân trên lá non) với thiếu Đạm (vàng trên lá già trước) và thiếu Sắt (gân vẫn xanh trên nền trắng).',
    ],
    references: 'ICRISAT Peanut Sulfur Nutrition.',
    standardCode: 'TCVN Dinh dưỡng Cây Lạc',
  },
  {
    id: 'peanut_deficiency_boron',
    cropType: 'peanut',
    vietnameseName: 'Thiếu Bo (B) gây bệnh "Thối tim đen nhân hạt" trên củ lạc (Hollow Heart)',
    englishName: 'Boron Deficiency ("Hollow Heart") in Peanut',
    affectedPlantParts: ['fruit', 'leaf'],
    symptoms:
      'Bên ngoài củ lạc trông bình thường nhưng khi tách đôi hạt nhân lạc ra thấy phần lõi giữa hai lá mầm bị lõm rỗng, thâm nâu hoặc đen ("thối tim hạt / lòng rỗng"). Trên cây có thể thấy lá nhỏ dày, đốt ngắn, nứt thân nhẹ.',
    checklist: [
      'Tách đôi nhân hạt lạc ra thấy vết lõm thâm nâu đen đúng ở giữa mặt trong hai mảnh hạt.',
      'Tỷ lệ hạt giống nảy mầm kém nếu lấy hạt này làm giống.',
    ],
    causes: 'Thiếu vi lượng Bo (B) trên đất cát rửa trôi và gặp hạn giai đoạn làm hạt.',
    favorableConditions: 'Đất cát pha nghèo mùn vùng Bắc Trung Bộ gặp nắng hạn lúc củ vào nhân.',
    preventionMethods: 'Phun phân bón lá chứa Bo (liều rất thấp) hoặc bón phân hỗn hợp NPK có bổ sung Bo ở giai đoạn ra hoa – làm củ.',
    safeManagement: 'Phun phân bón lá Canxi-Bo đúng liều hướng dẫn ở giai đoạn 35–45 ngày sau gieo.',
    immediate: [
      'Nếu đang giai đoạn ra hoa đâm tia, phun bổ sung ngay 1 lần phân bón lá Canxi-Bo đúng liều.',
    ],
    biologicalAndCare: [
      'Giữ ẩm luống lạc giai đoạn vào nhân để cây hấp thu Bo và Canxi hiệu quả.',
    ],
    caution: [
      'Cây lạc rất dễ bị NGỘ ĐỘC Bo (cháy mép lá rụng lá) nếu pha quá liều; tuyệt đối dùng đúng liều khuyến cáo trên nhãn.',
    ],
    references: 'NCSU & UF/IFAS Peanut Hollow Heart (Boron Deficiency).',
    standardCode: 'TCVN Vi lượng Cây Lạc',
  },
];

export const EXTENDED_DISEASES: DiseaseRecord[] = EXTENDED_SEEDS.map(makeRecord);
