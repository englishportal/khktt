import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import { DEFAULT_DISEASES } from '../src/data/defaultDiseases.js';
import {
  cleanVietnameseText,
  sanitizeDiagnosisResultToVietnamese,
  stripEnglishParentheticals,
} from '../src/utils/vietnameseText.js';
import { extractMedicinesFromText } from '../src/utils/googleMedicineSearch.js';
import { createAuthRouter } from './authRoutes.js';

dotenv.config();

interface ScanTrustStats {
  totalSuccessfulScans: number;
  byCrop: {
    citrus: number;
    rice: number;
    peanut: number;
  };
  updatedAt: string;
}

const SCAN_STATS_FILE = path.join(os.tmpdir(), 'agrivision-successful-scans.json');

function loadInitialScanStats(): ScanTrustStats {
  const empty: ScanTrustStats = {
    totalSuccessfulScans: 0,
    byCrop: { citrus: 0, rice: 0, peanut: 0 },
    updatedAt: new Date().toISOString(),
  };
  try {
    if (fs.existsSync(SCAN_STATS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(SCAN_STATS_FILE, 'utf-8'));
      if (parsed && typeof parsed.totalSuccessfulScans === 'number') {
        return {
          totalSuccessfulScans: Math.max(0, Math.floor(parsed.totalSuccessfulScans)),
          byCrop: {
            citrus: Math.max(0, Math.floor(parsed.byCrop?.citrus || 0)),
            rice: Math.max(0, Math.floor(parsed.byCrop?.rice || 0)),
            peanut: Math.max(0, Math.floor(parsed.byCrop?.peanut || 0)),
          },
          updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
        };
      }
    }
  } catch {
    // Ignore read issues on ephemeral/read-only filesystems
  }
  return empty;
}

const scanTrustStats: ScanTrustStats = loadInitialScanStats();

function recordSuccessfulScan(cropType: string) {
  scanTrustStats.totalSuccessfulScans += 1;
  if (cropType === 'citrus' || cropType === 'rice' || cropType === 'peanut') {
    scanTrustStats.byCrop[cropType] += 1;
  }
  scanTrustStats.updatedAt = new Date().toISOString();
  try {
    fs.writeFileSync(SCAN_STATS_FILE, JSON.stringify(scanTrustStats), 'utf-8');
  } catch {
    // Safe fallback in read-only environments
  }
}

// Lazy Initialize Gemini Client (also tracks API key fingerprint & short-term quota cooldowns)
let aiClient: GoogleGenAI | null = null;
let aiClientKeyFingerprint = '';
let searchQuotaCooldownUntil = 0;
const modelDailyExhaustedUntil = new Map<string, number>();
const diagnosisResultCache = new Map<string, { result: any; cachedAt: number }>();
const diseaseGroundingCache = new Map<string, { payload: any; cachedAt: number }>();

const PERSISTENT_DIAG_CACHE_FILE = path.join(os.tmpdir(), 'agrivision-diag-cache-v11.json');
const PERSISTENT_GROUNDING_CACHE_FILE = path.join(os.tmpdir(), 'agrivision-grounding-cache-v11.json');

function hydratePersistentCaches() {
  const now = Date.now();
  try {
    if (fs.existsSync(PERSISTENT_DIAG_CACHE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(PERSISTENT_DIAG_CACHE_FILE, 'utf-8'));
      if (Array.isArray(parsed)) {
        for (const entry of parsed.slice(0, 120)) {
          if (entry?.key && entry?.result && typeof entry?.cachedAt === 'number' && now - entry.cachedAt < 24 * 60 * 60 * 1000) {
            diagnosisResultCache.set(entry.key, { result: entry.result, cachedAt: entry.cachedAt });
          }
        }
      }
    }
  } catch {
    // Ignore tmp cache read errors
  }
  try {
    if (fs.existsSync(PERSISTENT_GROUNDING_CACHE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(PERSISTENT_GROUNDING_CACHE_FILE, 'utf-8'));
      if (Array.isArray(parsed)) {
        for (const entry of parsed.slice(0, 200)) {
          if (entry?.key && entry?.payload && typeof entry?.cachedAt === 'number' && now - entry.cachedAt < 24 * 60 * 60 * 1000) {
            diseaseGroundingCache.set(entry.key, { payload: entry.payload, cachedAt: entry.cachedAt });
          }
        }
      }
    }
  } catch {
    // Ignore tmp cache read errors
  }
}

hydratePersistentCaches();

function persistDiagCache() {
  try {
    const entries = Array.from(diagnosisResultCache.entries())
      .slice(-100)
      .map(([key, val]) => ({ key, result: val.result, cachedAt: val.cachedAt }));
    fs.writeFileSync(PERSISTENT_DIAG_CACHE_FILE, JSON.stringify(entries), 'utf-8');
  } catch {
    // Safe fallback on read-only filesystems
  }
}

function persistGroundingCache() {
  try {
    const entries = Array.from(diseaseGroundingCache.entries())
      .slice(-150)
      .map(([key, val]) => ({ key, payload: val.payload, cachedAt: val.cachedAt }));
    fs.writeFileSync(PERSISTENT_GROUNDING_CACHE_FILE, JSON.stringify(entries), 'utf-8');
  } catch {
    // Safe fallback on read-only filesystems
  }
}

function buildModelGenConfig(
  model: string,
  options: {
    systemInstruction?: string;
    thinkingLevel?: ThinkingLevel;
    responseMimeType?: string;
    responseSchema?: any;
    tools?: any[];
    abortSignal?: AbortSignal;
  }
): Record<string, any> {
  const lower = model.toLowerCase();
  const isGemini4 = lower.includes('gemini-4');
  const isGemini3 = lower.includes('gemini-3');
  const cfg: Record<string, any> = {
    seed: 42,
  };
  if (options.systemInstruction) cfg.systemInstruction = options.systemInstruction;
  if (options.responseMimeType) cfg.responseMimeType = options.responseMimeType;
  if (options.responseSchema) cfg.responseSchema = options.responseSchema;
  if (options.tools) cfg.tools = options.tools;
  if (options.abortSignal) cfg.abortSignal = options.abortSignal;

  if (isGemini4 || isGemini3) {
    if (options.thinkingLevel) {
      const safeLevel =
        isGemini4 && options.thinkingLevel === ThinkingLevel.MINIMAL
          ? ThinkingLevel.LOW
          : options.thinkingLevel;
      cfg.thinkingConfig = { thinkingLevel: safeLevel };
    }
  } else {
    // For custom Gemini 2.x models configured via GEMINI_MODEL on Vercel, enforce deterministic greedy decoding
    cfg.temperature = 0;
    cfg.topP = 1;
    cfg.topK = 1;
  }
  return cfg;
}

function syncQuotaKeyFingerprint() {
  const key = process.env.GEMINI_API_KEY || '';
  const fp = `${key.slice(0, 6)}:${key.length}`;
  if (fp !== aiClientKeyFingerprint) {
    aiClientKeyFingerprint = fp;
    aiClient = null;
    searchQuotaCooldownUntil = 0;
    modelDailyExhaustedUntil.clear();
    diagnosisResultCache.clear();
    diseaseGroundingCache.clear();
  }
}

function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  syncQuotaKeyFingerprint();
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

// Build token-efficient knowledge context for Assistant based on user query & active diagnosis across 132+ diseases
function buildAssistantKnowledgeContext(queryText: string, cropFilter?: string, suspectedDisease?: string): string {
  const tokens = `${queryText || ''} ${suspectedDisease || ''}`
    .toLowerCase()
    .split(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+/)
    .filter((t) => t.length >= 2);

  const normalizedCrop =
    cropFilter && cropFilter.toLowerCase().includes('cam')
      ? 'citrus'
      : cropFilter && cropFilter.toLowerCase().includes('lúa')
      ? 'rice'
      : cropFilter && cropFilter.toLowerCase().includes('lạc')
      ? 'peanut'
      : cropFilter;

  const scored = DEFAULT_DISEASES.map((d) => {
    let score = 0;
    if (normalizedCrop && d.cropType === normalizedCrop) score += 4;
    const hay = `${d.id} ${d.vietnameseName} ${d.englishName} ${d.symptoms} ${d.causes}`.toLowerCase();
    for (const tok of tokens) {
      if (hay.includes(tok)) score += 3;
    }
    if (suspectedDisease && d.vietnameseName.toLowerCase().includes(suspectedDisease.toLowerCase())) {
      score += 12;
    }
    return { d, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topDetailed = scored.slice(0, 12).map(({ d }) => {
    const cleanName = stripEnglishParentheticals(d.vietnameseName);
    const cropLabel = d.cropType === 'citrus' ? 'Cam, Bưởi' : d.cropType === 'rice' ? 'Lúa' : 'Lạc';
    return `- [${d.id}] (${cropLabel}) ${cleanName} | Bộ phận: ${d.affectedPlantParts.join(', ')} | Triệu chứng: ${cleanVietnameseText(d.symptoms)} | Nguyên nhân: ${cleanVietnameseText(d.causes)} | Xử lý: ${cleanVietnameseText(d.safeManagement)}`;
  });

  const extraIndex = scored
    .slice(12, 50)
    .filter((x) => !normalizedCrop || x.d.cropType === normalizedCrop)
    .slice(0, 24)
    .map(({ d }) => `[${d.id}] ${stripEnglishParentheticals(d.vietnameseName)}`)
    .join(', ');

  return `${topDetailed.join('\n')}${extraIndex ? `\n- Danh mục liên quan khác trong kho (${DEFAULT_DISEASES.length} bệnh): ${extraIndex}` : ''}`;
}

// Models to try in order of availability and speed
const ENV_GEMINI_MODEL = (process.env.GEMINI_MODEL || '').trim();
const CANDIDATE_MODELS = Array.from(
  new Set([...(ENV_GEMINI_MODEL ? [ENV_GEMINI_MODEL] : []), 'gemini-4-hydrogen', 'gemini-3.1-flash-lite'])
);

// Helper to detect 403 / billing / permission errors from Google Cloud Gemini API (never treat 429 rate-limits as 403)
function isPermissionOrBillingError(err: any): boolean {
  const msg = (err?.message || String(err || '')).toLowerCase();
  const status = String(err?.status || '').toLowerCase();
  const code = err?.code ?? err?.status;
  if (code === 429 || status === 'resource_exhausted' || msg.includes('429') || msg.includes('resource_exhausted') || msg.includes('quota')) {
    return false;
  }
  return (
    code === 403 ||
    status === 'permission_denied' ||
    msg.includes('permission_denied') ||
    msg.includes('free tier is not available')
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
      (d.affectedPlantParts && d.affectedPlantParts.some((p: string) => queryLower.includes(p)))
    );
  });

  const cropFilteredMatches = cropFilter
    ? matches.filter((d) => d.cropType === cropFilter)
    : matches;

  const target = cropFilteredMatches[0] || matches[0];

  if (target) {
    return `[Cơ sở dữ liệu Bệnh học Cây trồng Bắc Trung Bộ - Viện Bảo vệ Thực vật]:
Về **${stripEnglishParentheticals(target.vietnameseName)}** trên ${
      target.cropType === 'citrus' ? 'Cây Cam, Bưởi' : target.cropType === 'rice' ? 'Cây Lúa' : 'Cây Lạc'
    }:

• **Bộ phận gây hại**: ${target.affectedPlantParts.map((p: string) => (p === 'leaf' ? 'Lá' : p === 'stem' ? 'Thân, cành' : p === 'fruit' ? 'Quả, củ' : 'Gốc, rễ')).join(', ')}
• **Triệu chứng nhận biết**: ${cleanVietnameseText(target.symptoms)}
• **Tác nhân gây bệnh**: ${cleanVietnameseText(target.causes)}
• **Điều kiện phát sinh tại Bắc Trung Bộ**: ${cleanVietnameseText(target.favorableConditions)}
• **Biện pháp phòng ngừa**: ${cleanVietnameseText(target.preventionMethods)}
• **Quản lý an toàn sinh học**: ${cleanVietnameseText(target.safeManagement)}`;
  }

  const cropName =
    cropFilter === 'citrus'
      ? 'cây Cam, Bưởi'
      : cropFilter === 'rice'
      ? 'cây Lúa'
      : cropFilter === 'peanut'
      ? 'cây Lạc'
      : 'cây trồng';

  return `[Khuyến cáo Bệnh học Nông nghiệp Vùng Bắc Trung Bộ - Viện Bảo vệ Thực vật]:
Cảm ơn bác đã đặt câu hỏi. Đối với ${cropName} trong điều kiện thời tiết Bắc Trung Bộ (Nghệ An, Hà Tĩnh, Quảng Bình):
1. **Đặc thù thời tiết**: Vùng chịu ảnh hưởng lớn của gió Tây Nam khô nóng mùa hè và sương muối, mưa phùn kéo dài mùa đông xuân, độ ẩm cao dễ làm nấm khuẩn lây lan.
2. **Nguyên tắc phòng trừ tổng hợp an toàn**:
   - Thường xuyên thăm đồng, thăm vườn để phát hiện vết bệnh sớm.
   - Vệ sinh đồng ruộng, thu gom tiêu hủy tàn dư cây bệnh sau thu hoạch.
   - Bón phân cân đối đạm, lân, ka-li, hạn chế bón thừa đạm khi trời âm u sương mù.
   - Ưu tiên dùng chế phẩm sinh học đối kháng an toàn.
3. Bác có thể tra cứu chi tiết từng loại bệnh trong mục **"Sổ bệnh"** hoặc gửi ảnh chụp mẫu lá, thân để đối chiếu trực tiếp.`;
}

function isDisallowedHostname(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/^\[|\]$/g, '');
  if (!host) return true;
  if (
    host === 'localhost' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host.endsWith('.local') ||
    host.endsWith('.internal')
  ) {
    return true;
  }
  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, a, b] = ipv4Match.map(Number);
    if (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    ) {
      return true;
    }
  }
  if (host.startsWith('fe80:') || host.startsWith('fc') || host.startsWith('fd')) {
    return true;
  }
  return false;
}

// Helper to resolve image to base64 if it's a local path, external URL, or data URL
async function resolveImageBase64(
  input: string,
  fallbackMime: string = 'image/jpeg',
  reqOrigin?: string
): Promise<{ base64: string; mimeType: string }> {
  const rootDir = process.cwd();

  if (input.startsWith('/images/')) {
    const rel = input.replace(/^\/images\//, '');
    const publicImagesDir = path.resolve(rootDir, 'public', 'images');
    const resolvedPublic = path.resolve(publicImagesDir, rel);
    if (resolvedPublic.startsWith(publicImagesDir + path.sep) && fs.existsSync(resolvedPublic)) {
      const base64 = fs.readFileSync(resolvedPublic).toString('base64');
      return { base64, mimeType: fallbackMime };
    }

    const distImagesDir = path.resolve(rootDir, 'dist', 'images');
    const resolvedDist = path.resolve(distImagesDir, rel);
    if (resolvedDist.startsWith(distImagesDir + path.sep) && fs.existsSync(resolvedDist)) {
      const base64 = fs.readFileSync(resolvedDist).toString('base64');
      return { base64, mimeType: fallbackMime };
    }

    // Fallback for serverless platforms where public assets are served via CDN origin
    if (reqOrigin && /^\/images\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp)$/i.test(input)) {
      const cdnRes = await fetch(`${reqOrigin}${input}`, { signal: AbortSignal.timeout(8000) });
      if (cdnRes.ok) {
        const contentType = cdnRes.headers.get('content-type') || fallbackMime;
        const arrayBuffer = await cdnRes.arrayBuffer();
        return { base64: Buffer.from(arrayBuffer).toString('base64'), mimeType: contentType };
      }
    }
  }

  if (input.startsWith('/src/')) {
    const srcDir = path.resolve(rootDir, 'src');
    const resolvedSrc = path.resolve(srcDir, input.replace(/^\/src\//, ''));
    if (resolvedSrc.startsWith(srcDir + path.sep) && fs.existsSync(resolvedSrc)) {
      const base64 = fs.readFileSync(resolvedSrc).toString('base64');
      return { base64, mimeType: fallbackMime };
    }
  }

  if (input.startsWith('http://') || input.startsWith('https://')) {
    const parsedUrl = new URL(input);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error('Giao thức URL hình ảnh không hợp lệ.');
    }
    if (isDisallowedHostname(parsedUrl.hostname)) {
      throw new Error('Không cho phép tải ảnh từ địa chỉ mạng nội bộ.');
    }
    const res = await fetch(parsedUrl.toString(), { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      throw new Error(`Không tải được ảnh tham chiếu (HTTP ${res.status}).`);
    }
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

function getRequestOrigin(req: Request): string | undefined {
  const host = req.get('x-forwarded-host') || req.get('host');
  if (!host) return undefined;
  const protoHeader = (req.get('x-forwarded-proto') || req.protocol || 'https').split(',')[0].trim();
  const proto = protoHeader === 'http' ? 'http' : 'https';
  return `${proto}://${host}`;
}

function buildCropDiagnosisContext(cropType: string, plantPart?: string): string {
  const filtered = DEFAULT_DISEASES.filter((d) => d.cropType === cropType);
  const pool = filtered.length > 0 ? filtered : DEFAULT_DISEASES;
  const shouldPrioritizePart = Boolean(plantPart && plantPart !== 'other');
  const prioritized = [...pool].sort((a, b) => {
    if (shouldPrioritizePart) {
      const aMatch = a.affectedPlantParts.includes(plantPart as any) ? 1 : 0;
      const bMatch = b.affectedPlantParts.includes(plantPart as any) ? 1 : 0;
      if (bMatch !== aMatch) return bMatch - aMatch;
    }
    return a.id.localeCompare(b.id);
  });

  return prioritized
    .map((d) => {
      const cleanName = stripEnglishParentheticals(d.vietnameseName);
      const cleanSymptoms = cleanVietnameseText(d.symptoms);
      const shortSymptoms = cleanSymptoms.length > 175 ? `${cleanSymptoms.slice(0, 172)}...` : cleanSymptoms;
      return `- [${d.id}] ${cleanName} [${d.affectedPlantParts.join('/')}] | Dấu hiệu: ${shortSymptoms}`;
    })
    .join('\n');
}

export function createApiApp() {
  const app = express();
  app.set('trust proxy', 1);

  // If a serverless host (e.g. Vercel @vercel/node) already pre-parsed req.body,
  // mark _body so express.json() does not wait on a consumed request stream.
  app.use((req: Request, _res: Response, next: NextFunction) => {
    try {
      const preParsed = (req as any).body;
      if (preParsed !== undefined && preParsed !== null && typeof preParsed === 'object') {
        (req as any)._body = true;
      }
    } catch {
      // Ignore lazy req.body getter errors so Express middleware can handle/report JSON cleanly
    }
    next();
  });

  // Body parser with 30mb limit for local/Cloud Run captures (Vercel enforces 4.5mb at edge)
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));
  app.use('/api/auth', createAuthRouter());

  // 1. Diagnose Plant Image Endpoint (supports main image + up to 2 extra angles + field quiz answers)
  app.post('/api/diagnose', async (req: Request, res: Response) => {
    try {
      const {
        imageBase64,
        mimeType = 'image/jpeg',
        cropType = 'citrus',
        plantPart = 'other',
        visualMetrics,
        extraImages = [],
        quizAnswers,
      } = req.body || {};

      if (!imageBase64 || typeof imageBase64 !== 'string') {
        return res.status(400).json({ error: 'Hình ảnh là bắt buộc để tiến hành phân tích.' });
      }

      const origin = getRequestOrigin(req);
      const mainImage = await resolveImageBase64(imageBase64, mimeType, origin);
      const resolvedExtras: { base64: string; mimeType: string; angleLabel: string }[] = [];
      if (Array.isArray(extraImages)) {
        for (const extra of extraImages.slice(0, 2)) {
          if (extra && typeof extra.imageBase64 === 'string' && extra.imageBase64.trim()) {
            const resolved = await resolveImageBase64(
              extra.imageBase64,
              extra.mimeType || 'image/jpeg',
              origin
            );
            resolvedExtras.push({
              base64: resolved.base64,
              mimeType: resolved.mimeType,
              angleLabel: typeof extra.angleLabel === 'string' ? extra.angleLabel : 'Góc chụp bổ sung',
            });
          }
        }
      }

      const cropNameVi =
        cropType === 'citrus'
          ? 'Cam chanh / Cây có múi'
          : cropType === 'rice'
          ? 'Lúa nước'
          : 'Lạc (Đậu phộng)';
      const hasSpecificPart = plantPart === 'leaf' || plantPart === 'stem' || plantPart === 'fruit';
      const partNameVi =
        plantPart === 'leaf'
          ? 'Lá'
          : plantPart === 'stem'
          ? 'Thân/Cành'
          : plantPart === 'fruit'
          ? 'Quả/Củ'
          : 'Tự nhận diện qua ảnh (lá, thân, cành, quả hoặc toàn cây)';
      const cropKnowledgeContext = buildCropDiagnosisContext(cropType, plantPart);

      const systemInstruction = `
Bạn là chuyên gia chẩn đoán bệnh học thực vật cao cấp thuộc Viện Khoa học Nông nghiệp Bắc Trung Bộ và Viện Bảo vệ Thực vật Việt Nam.
Nhiệm vụ của bạn là quan sát thật kỹ hình ảnh, đối chiếu chặt chẽ với kho dữ liệu bệnh học thực vật và trả lời chính xác, nhất quán, dễ hiểu cho bà con nông dân.

NGUYÊN TẮC NGÔN NGỮ BẮT BUỘC (100% TIẾNG VIỆT THUẦN TÚY):
- Toàn bộ nội dung ở MỌI trường trả về (tên cây cropDetected, tên bệnh diseaseName, dấu hiệu symptoms, bằng chứng evidence, nguyên nhân dễ nhầm alternativeCauses, giải thích phân biệt differentialExplanation, hướng dẫn actionPlan, khuyến cáo recommendations, lưu ý disclaimer) PHẢI viết 100% bằng tiếng Việt thuần túy, mộc mạc, dễ hiểu cho nông dân.
- TUYỆT ĐỐI KHÔNG chèn tiếng Anh, KHÔNG mở ngoặc tên tiếng Anh hay tên khoa học Latinh, KHÔNG dùng từ viết tắt tiếng Anh (như Citrus, Rice, Peanut, HLB, Huanglongbing, Thrips, Scab, Canker, IPM, PCR, blotchy mottle, Zinc deficiency, out-of-focus).
- Ví dụ đúng: cropDetected ghi "Cây Cam, Bưởi" (hoặc "Cây Lúa", "Cây Lạc"); diseaseName ghi "Bệnh Vàng lá gân xanh", "Bệnh Loét cam quýt", "Bệnh Ghẻ sẹo cam quýt", "Thiếu kẽm".

CÁC NGUYÊN TẮC KHOA HỌC TỐI THƯỢNG (BẮT BUỘC):
1. PHÂN BIỆT RÕ RÀNG GIỮA CÂY KHỎE MẠNH VÀ CÂY BỊ BỆNH:
   - Nếu ảnh là lá hoặc cây khỏe mạnh (phiến lá xanh tươi, màu sắc đồng đều, không có vết đốm nâu, không cháy bìa, không có quầng vàng loang lổ, gân lá bình thường, không xoăn biến dạng):
     -> Bắt buộc chẩn đoán là CÂY KHỎE MẠNH với diseaseId là "healthy", diseaseName là "Cây khỏe mạnh, không phát hiện dấu hiệu bệnh hại", confidenceLevel là "high", severityAssessment là "mild", alternativeCauses là [].
     -> Tuyệt đối không gán bệnh cho một chiếc lá hoặc cành khỏe mạnh.
2. ĐÁNH GIÁ CHẤT LƯỢNG ẢNH & XỬ LÝ ẢNH MỜ:
   - Nếu ảnh bị mờ nét, rung tay, chụp quá xa không nhìn rõ bề mặt vết bệnh:
     + Đặt imageQuality là "poor", diseaseId là "unclear_due_to_blur", diseaseName là "Chưa đủ bằng chứng chẩn đoán do ảnh bị mờ nét", confidenceLevel là "insufficient_evidence", needsMoreImages là true.
     + Hướng dẫn bà con chụp lại cách lá khoảng 20 cm, chạm màn hình lấy nét chỗ vết bệnh và chụp nơi đủ ánh sáng ban ngày.
   - Nếu ảnh chỉ hơi mờ nhẹ nhưng vẫn nhận diện được vết bệnh, đặt imageQuality là "fair".
3. XÁC THỰC CÂY TRỒNG VÀ PHÁT HIỆN LỆCH LOÀI:
   - Xác định xem ảnh có chứa thực vật hay không (isPlantImage). Nếu không phải thực vật, đặt isPlantImage = false, selectedCropMatches = false, cropDetected = "Không phải cây trồng", possibleDiagnoses = [].
   - Kiểm tra loài cây thực tế trong ảnh có khớp với cây người dùng chọn (${cropNameVi}) hay không:
     1. Cây Cam, Bưởi: Cây thân gỗ, lá đơn hình bầu dục dày bóng, cuống lá có cánh dẹp, gân lá mạng lưới; quả vỏ có túi tinh dầu.
     2. Cây Lúa: Lá dạng dải dài hẹp, gân lá chạy song song, bông hoặc gié lúa.
     3. Cây Lạc: Cây thân thảo, lá kép gồm 4 lá chét tròn đầu mọc đối xứng.
   - Nếu ảnh rõ ràng thuộc một loài cây KHÁC (ví dụ Cây ổi có gân lá hình lông chim nổi rõ mặt dưới, lá mọc đối không có cánh cuống, quả ổi có đài hoa ở đỉnh; hoặc Cây xoài, Cây mít, Cây chuối, Cây cà phê, rau màu, hay 1 trong 2 cây còn lại khác với ${cropNameVi}):
     + BẮT BUỘC đặt selectedCropMatches = false, possibleDiagnoses = [].
     + Ghi ĐÚNG tên tiếng Việt thực tế của loài cây nhìn thấy vào cropDetected (ví dụ: "Cây Ổi", "Cây Xoài", "Cây Lúa", "Cây Lạc", hoặc "Loại cây trồng khác"). TUYỆT ĐỐI không ghi tên cây người dùng đang chọn vào cropDetected khi selectedCropMatches = false.
   - Với ảnh chụp quá cận cảnh một mảng vỏ quả, thân gỗ hoặc một góc nhỏ phiến lá không thể phân biệt loài, hãy tin tưởng loài cây người dùng chọn.
4. PHÂN BIỆT CHÍNH XÁC TỪNG BỆNH VÀ SÂU HẠI (TRÁNH NHẦM LẪN VÀ KHÔNG THIÊN LỆCH):
   - Quan sát khách quan đúng những gì thực sự có trên ảnh trước khi chọn mã bệnh. TUYỆT ĐỐI không vội gán "Bọ trĩ" nếu không thấy dấu hiệu đặc trưng của bọ trĩ!
   - Đối chiếu cẩn thận trên Cây Cam, Bưởi:
     + **Bệnh loét cam quýt** ("citrus_canker"): Vết sần nứt màu nâu gồ lên ở cả hai mặt lá hoặc vỏ quả, xung quanh có **quầng vàng chanh rất rõ**.
     + **Bệnh ghẻ sẹo cam quýt** ("citrus_scab"): Nốt sùi nhám màu vàng nâu hoặc xám nổi gồ hẳn lên mặt lá/vỏ quả như mụn cóc, làm lá nhăn nhúm biến dạng gồ ghề, **KHÔNG có quầng vàng chanh**.
     + **Bệnh vàng lá gân xanh** ("citrus_greening"): Lá vàng loang lổ **không đối xứng** hai bên gân chính, gân lá nổi gồ xanh đậm, quả nhỏ méo lệch tâm.
     + **Thiếu kẽm / Thiếu ma-giê / Thiếu sắt** ("citrus_deficiency_zinc", "citrus_deficiency_magnesium", "citrus_deficiency_iron"): Lá vàng **đối xứng đều** hai bên gân chính (thiếu kẽm: lá non nhỏ hẹp vàng giữa các gân; thiếu ma-giê: lá già vàng hình chữ V ngược xanh ở gốc lá).
     + **Sâu vẽ bùa hại cam chanh** ("citrus_leafminer"): Đường hầm **ngoằn ngoèo màu trắng bạc** uốn lượn dưới lớp da lá non, giữa đường hầm có vệt phân đen mảnh.
     + **Nhện đỏ / Nhện trắng / Nhện vàng hại cam** ("citrus_spider_mite_aphid", "citrus_broad_mite", "citrus_rust_mite"): Vết chích hút **li ti trắng bạc hoặc vàng xám xỉn màu** phủ đều mặt lá, hoặc vỏ quả sạm màu **da cám / da lu**, đôi khi có tơ mỏng.
     + **Rệp muội** ("citrus_spider_mite_aphid"): Đám rệp nhỏ màu đen/nâu/xanh bám dày ở ngọn non làm quăn lá non, thường có kiến và lớp muội đen.
     + **Bệnh đốm đen / Sẹo mạng nhện / Thán thư** ("citrus_black_spot", "citrus_melanose", "citrus_anthracnose"): Vết đốm lõm tối màu có viền sẫm, vết rỉ nâu li ti như cát nhám, hoặc mảng cháy khô màu nâu từ chóp/mép lá.
     + **Bọ trĩ hại cam chanh** ("citrus_thrips"): CHỈ kết luận khi nhìn thấy rõ **vết sẹo cạp phẳng màu xám bạc dạng vòng cung quanh cuống quả non** hoặc **hai dải sẹo bạc dọc sát hai bên gân chính mặt dưới lá non** làm lá non hẹp dài, cuộn úp mép vào trong. Nếu là đốm nấm, vết loét sần, nốt sùi ghẻ, vàng lá hay đốm chích hút xỉn màu thì KHÔNG phải bọ trĩ.
     + **Rầy chổng cánh hại cam chanh** ("citrus_psyllid"): CHỈ kết luận khi nhìn thấy rõ con rầy nhỏ đậu chúc đầu nghiêng trên đọt non hoặc ấu trùng màu vàng cam kèm sợi sáp trắng xoắn.
   - Đối chiếu cẩn thận trên Cây Lúa:
     + Phân biệt rõ vết hình thoi tâm xám tro viền nâu (**Bệnh đạo ôn lúa**), đốm bầu dục nâu đều không có tâm xám lớn (**Bệnh đốm nâu lúa**), vết vằn da hổ trên bẹ (**Bệnh khô vằn lúa**), vết cháy dọc mép lá gợn sóng vàng (**Bệnh bạc lá lúa**).
   - Đối chiếu cẩn thận trên Cây Lạc:
     + Phân biệt rõ đốm nâu nhạt có quầng vàng rõ (**Bệnh đốm nâu sớm lá lạc**), đốm tròn đen sẫm mặt dưới nhiều bào tử (**Bệnh đốm đen muộn lá lạc**), ổ bào tử màu nâu gỉ cam nổi gồ (**Bệnh gỉ sắt lạc**).
   - Quy tắc nhất quán: Nếu triệu chứng khớp với một bệnh/sâu hại/thiếu chất trong kho dữ liệu ${cropNameVi} bên dưới, dùng đúng mã diseaseId tương ứng nhưng luôn viết diseaseName hoàn toàn bằng tiếng Việt. Nếu còn phân vân giữa hai đối tượng gần nhau trên 1 góc chụp, chọn đối tượng khớp nhiều dấu hiệu nhất làm chẩn đoán chính, ghi đối tượng còn lại vào alternativeCauses và bật needsMoreImages = true.
   - Bắt buộc điền trường differentialExplanation bằng 1-2 câu thuần tiếng Việt giải thích rõ vì sao kết luận bệnh này và vì sao loại trừ các bệnh dễ nhầm khác.
5. KHÔNG BỊA ĐẶT PHẦN TRĂM XÁC SUẤT:
   - Không ghi con số phần trăm. confidenceLevel chỉ chọn trong: "high", "medium", "low", "insufficient_evidence".
6. CƠ SỞ DỮ LIỆU THAM KHẢO (${cropNameVi}):
   ${cropKnowledgeContext}
7. HƯỚNG DẪN XỬ LÝ THỰC TẾ, CẦM TAY CHỈ VIỆC CHO NÔNG DÂN (TRÁNH NÓI CHUNG CHUNG):
   - Viết bằng tiếng Việt mộc mạc, cụ thể từng thao tác làm ngoài vườn/ruộng, KHÔNG nói chung chung kiểu "chăm sóc hợp lý" hay "phun thuốc đặc trị" mà phải chỉ rõ làm gì, vào lúc nào, làm ra sao:
     + immediate24hSteps (2-4 việc làm cụ thể trong 24 giờ đầu: cắt bỏ lá/cành bệnh cách vết bệnh bao xa, gom vào bao mang ra khỏi vườn tiêu hủy, lau khử kéo bằng cồn hoặc nước vôi, tạm ngừng bón đạm/tưới phun mưa lên tán, rút bớt nước hay giữ mực nước nông tùy bệnh...).
     + careNext3To7Days (2-3 việc chăm sóc và phục hồi trong 3-7 ngày tới: bón bổ sung phân hữu cơ hoai mục, chế phẩm nấm đối kháng, vôi bột khử chua, phun vào sáng sớm hoặc chiều mát ướt đều hai mặt lá nếu cần).
     + mildVsSevereGuide: Tách rõ mildCase (cách xử lý khi mới chớm bị nhẹ vài lá hoặc vài khóm/cây) và severeCase (cách xử lý khi đã bị nặng, lan rộng; ĐẶC BIỆT với bệnh nan y không có thuốc chữa khỏi như Vàng lá gân xanh nặng hay vi-rút lùn xoắn lá nặng thì phải nói thẳng không tốn tiền mua thuốc phun mà cần chặt bỏ/nhổ tiêu hủy cây nặng để cứu cả vườn).
     + suggestedActiveIngredients (1-3 tên thuốc hoặc nhóm hoạt chất chính được phép lưu hành tại Việt Nam phù hợp đúng bệnh và đúng cây trồng — có thể kèm tên hoạt chất chuẩn để bà con ra đại lý vật tư nông nghiệp hỏi mua đúng loại).
     + suggestedPesticides (1-4 mục chi tiết đối chiếu từ dữ liệu tìm kiếm Google và tài liệu Cục Bảo vệ Thực vật / Khuyến nông: ghi rõ productOrIngredientName, activeIngredient chuẩn, category: "biological" | "chemical" | "mineral" | "none", targetUse, sprayGuidance — hướng dẫn thời điểm và cách phun ngoài vườn nhưng TUYỆT ĐỐI KHÔNG tự bịa liều lượng pha chế nếu không có trên nhãn, và googleSearchQuery để bà con bấm tìm ngay thông tin thuốc đó trên Google). Nếu cây khỏe mạnh, ảnh mờ, hoặc lệch loài thì trả về []. Nếu là bệnh nan y như vàng lá gân xanh nặng không có thuốc chữa khỏi bệnh thì ghi rõ category "none" hoặc chỉ gợi ý thuốc/dầu khoáng diệt côn trùng môi giới rầy chổng cánh.
     + doList (2-3 việc NÊN làm) và dontList (2-3 việc TUYỆT ĐỐI TRÁNH để khỏi làm bệnh bùng nặng hơn).
     + recoveryCheckSigns (2-3 dấu hiệu cụ thể sau 5-7 ngày để bà con tự kiểm tra xem vết bệnh đã khô "đứng vết" hay vẫn đang lan rộng thêm).
     + pesticideSafetyNote: Nhắc rõ Nguyên tắc 4 đúng (đúng thuốc, đúng lúc, đúng liều in trên nhãn bao bì, đúng cách) và khuyên hỏi thêm cán bộ bảo vệ thực vật địa phương.
   - Đồng thời tóm tắt ngắn gọn vào actionPlan (immediateSteps, safeCareAndPrevention, importantWarnings) và recommendations. Không tự ý bịa nồng độ hay liều pha hóa chất.
      `.trim();

      const quizLines: string[] = [];
      if (quizAnswers && typeof quizAnswers === 'object') {
        if (quizAnswers.spreadLevel) quizLines.push(`- Mức độ lây lan ngoài vườn/ruộng: ${quizAnswers.spreadLevel}`);
        if (quizAnswers.recentWeather) quizLines.push(`- Thời tiết gần đây: ${quizAnswers.recentWeather}`);
        if (quizAnswers.extraSymptom)
          quizLines.push(`- Dấu hiệu nông dân quan sát thêm trực tiếp: ${quizAnswers.extraSymptom}`);
        if (quizAnswers.fertilizerOrWater)
          quizLines.push(`- Tình trạng phân bón / nước tưới: ${quizAnswers.fertilizerOrWater}`);
      }

      const angleSummary =
        resolvedExtras.length > 0
          ? `Người dùng cung cấp tổng cộng ${1 + resolvedExtras.length} ảnh (Ảnh 1: Ảnh chính; ${resolvedExtras
              .map((e, i) => `Ảnh ${i + 2}: ${e.angleLabel}`)
              .join('; ')}). Hãy đối chiếu chéo triệu chứng trên tất cả các ảnh để tăng độ chính xác.`
          : 'Người dùng cung cấp 1 ảnh.';

      const metricsSummary =
        visualMetrics && typeof visualMetrics === 'object'
          ? `- Chỉ số ảnh đo được tự động: độ nét ${Math.round(Number(visualMetrics.sharpnessScore || 0))}/100 (${
              visualMetrics.isBlurry ? 'có dấu hiệu mờ nét' : 'rõ nét'
            }), tỷ lệ vùng xanh khỏe ${Math.round(Number(visualMetrics.healthyGreenRatio || 0) * 100)}%, vùng vàng ${Math.round(
              Number(visualMetrics.yellowRatio || 0) * 100
            )}%, vùng đốm/cháy ${Math.round(Number(visualMetrics.lesionRatio || 0) * 100)}%. (Chỉ dùng làm tín hiệu tham khảo phụ trợ; quyết định cuối cùng phải dựa trực tiếp vào quan sát hình ảnh.)`
          : '';

      const userPrompt = `
Hãy phân tích tổng hợp hình ảnh và thông tin thực địa sau đây theo QUY TRÌNH CỐ ĐỊNH, KHÁCH QUAN, NHẤT QUÁN (TRẢ LỜI 100% THUẦN TIẾNG VIỆT, KHÔNG DÙNG TIẾNG ANH):
- Cây trồng người dùng đã chọn: ${cropNameVi}
- Bộ phận quan sát: ${hasSpecificPart ? partNameVi : 'Tự nhận diện trực tiếp từ ảnh chụp (có thể là lá, thân, cành, quả, củ hoặc toàn cây).'}
- Số lượng góc ảnh: ${angleSummary}
- Khu vực địa lý trọng tâm: Vùng Bắc Trung Bộ Việt Nam (Nghệ An, Hà Tĩnh, Quảng Bình, Quảng Trị, Thừa Thiên Huế).
${metricsSummary ? `${metricsSummary}\n` : ''}${
  quizLines.length > 0
    ? `- Thông tin thực địa do nông dân cung cấp:\n${quizLines.join('\n')}`
    : '- Chưa có thêm thông tin thực địa.'
}

Yêu cầu phân tích nhất quán (bắt buộc theo đúng trình tự 4 bước):
1. Kiểm tra ảnh có phải thực vật không, và loài cây thực tế trong ảnh có đúng là ${cropNameVi} không.
2. Quan sát kỹ chi tiết trên ảnh (hình dạng vết đốm, vết loét sần có quầng vàng hay không, nốt sùi ghẻ không quầng, màu gân lá đối xứng hay loang lổ, vết chích hút, sẹo cạp hoặc côn trùng nếu có) và đối chiếu chặt chẽ với bảng mã bệnh chuẩn ở trên để chọn đúng nhất 1 mã diseaseId chính.
3. Phân tích tối đa 3 bệnh/tác nhân có biểu hiện tương tự (nếu cây có dấu hiệu bất thường), chỉ ra điểm giống nhau, điểm phân biệt cốt lõi, và đối chiếu triệu chứng trên ảnh với tài liệu tham khảo.
4. Tuyệt đối KHÔNG bịa phần trăm chính xác, KHÔNG bịa đường dẫn/nguồn giả, KHÔNG tự ý đưa liều lượng thuốc bảo vệ thực vật. Trả về JSON nhất quán, 100% tiếng Việt (riêng tên hoạt chất hóa học/sinh học trong suggestedPesticides giữ chuẩn để nông dân mua đúng thuốc).
      `.trim();

      let parsedResult: any = null;
      let lastError: any = null;
      let permissionOrBillingFailure = false;

      interface CollectedSource {
        title: string;
        url: string;
        domain: string;
        sourceCategory: string;
        priority: number;
        excerpts: string[];
      }

      const collectedSources: CollectedSource[] = [];
      const collectedQueries: string[] = [];

      const classifySourceAuthority = (title: string, url: string): { domain: string; sourceCategory: string; priority: number } => {
        let domain = '';
        const cleanTitle = (title || '').trim();
        if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(cleanTitle)) {
          domain = cleanTitle.toLowerCase().replace(/^www\./, '');
        } else {
          try {
            const u = new URL(url);
            const host = u.hostname.toLowerCase().replace(/^www\./, '');
            domain = host.includes('vertexaisearch.cloud.google.com')
              ? cleanTitle.slice(0, 60) || host
              : host;
          } catch {
            domain = cleanTitle.slice(0, 60) || 'nguồn trực tuyến';
          }
        }

        const checkStr = `${domain} ${cleanTitle} ${url}`.toLowerCase();
        if (
          checkStr.includes('.gov.vn') ||
          checkStr.includes('.gov') ||
          checkStr.includes('khuyennong') ||
          checkStr.includes('bvtv') ||
          checkStr.includes('ppd.') ||
          checkStr.includes('mard') ||
          checkStr.includes('fao.org') ||
          checkStr.includes('cục bảo vệ thực vật')
        ) {
          return { domain, sourceCategory: 'Cơ quan nông nghiệp nhà nước', priority: 1 };
        }
        if (
          checkStr.includes('.edu.vn') ||
          checkStr.includes('.edu') ||
          checkStr.includes('vnua') ||
          checkStr.includes('vaas') ||
          checkStr.includes('ppri') ||
          checkStr.includes('ctu.edu') ||
          checkStr.includes('irri') ||
          checkStr.includes('plantwise') ||
          checkStr.includes('cabi') ||
          checkStr.includes('apsnet') ||
          checkStr.includes('researchgate') ||
          checkStr.includes('sciencedirect') ||
          checkStr.includes('springer') ||
          checkStr.includes('ncbi') ||
          checkStr.includes('viện bảo vệ thực vật') ||
          checkStr.includes('học viện nông nghiệp')
        ) {
          return { domain, sourceCategory: 'Trường đại học & Viện nghiên cứu', priority: 2 };
        }
        return { domain, sourceCategory: 'Tài liệu chuyên ngành nông nghiệp', priority: 3 };
      };

      const extractGroundingFromResponse = (resp: any) => {
        const meta = resp?.candidates?.[0]?.groundingMetadata;
        if (Array.isArray(meta?.webSearchQueries)) {
          for (const q of meta.webSearchQueries) {
            if (typeof q === 'string' && q.trim() && !collectedQueries.includes(q.trim())) {
              collectedQueries.push(q.trim());
            }
          }
        }

        const chunkToSourceIdx = new Map<number, number>();
        if (Array.isArray(meta?.groundingChunks)) {
          meta.groundingChunks.forEach((chunk: any, idx: number) => {
            const uri = chunk?.web?.uri;
            const title = String(chunk?.web?.title || uri || '').trim();
            if (typeof uri === 'string' && (uri.startsWith('http://') || uri.startsWith('https://'))) {
              let existingIdx = collectedSources.findIndex((s) => s.url === uri);
              if (existingIdx === -1) {
                const { domain, sourceCategory, priority } = classifySourceAuthority(title, uri);
                collectedSources.push({
                  title: title || domain,
                  url: uri,
                  domain,
                  sourceCategory,
                  priority,
                  excerpts: [],
                });
                existingIdx = collectedSources.length - 1;
              }
              chunkToSourceIdx.set(idx, existingIdx);
            }
          });
        }

        if (Array.isArray(meta?.groundingSupports)) {
          for (const support of meta.groundingSupports) {
            const segText = String(support?.segment?.text || '').trim();
            const indices: number[] = Array.isArray(support?.groundingChunkIndices)
              ? support.groundingChunkIndices
              : [];
            if (!segText || segText.length < 15) continue;
            for (const chunkIdx of indices) {
              const sourceIdx = chunkToSourceIdx.get(chunkIdx);
              if (sourceIdx !== undefined) {
                const src = collectedSources[sourceIdx];
                if (src && src.excerpts.length < 2 && !src.excerpts.includes(segText)) {
                  src.excerpts.push(segText);
                }
              }
            }
          }
        }
      };

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error:
            'Hệ thống phân tích ảnh AI chưa sẵn sàng do chưa được cấp cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng thử lại sau hoặc tra cứu trực tiếp trong mục Sổ bệnh.',
        });
      }

      const normalizedQuizKey = quizAnswers && typeof quizAnswers === 'object'
        ? JSON.stringify({
            spreadLevel: quizAnswers.spreadLevel || '',
            recentWeather: quizAnswers.recentWeather || '',
            extraSymptom: quizAnswers.extraSymptom || '',
            fertilizerOrWater: quizAnswers.fertilizerOrWater || '',
          })
        : '';
      const clientPhash =
        typeof visualMetrics?.perceptualHash === 'string' && /^[a-f0-9]{64,128}$/i.test(visualMetrics.perceptualHash)
          ? visualMetrics.perceptualHash.toLowerCase()
          : '';
      const cacheHasher = crypto.createHash('sha256');
      cacheHasher.update(
        `v11|${aiClientKeyFingerprint}|${ENV_GEMINI_MODEL || 'default'}|${cropType}|${plantPart}|${normalizedQuizKey}|`
      );
      if (clientPhash) {
        cacheHasher.update(`phash:${clientPhash}`);
      } else {
        cacheHasher.update(mainImage.base64);
      }
      for (const extra of resolvedExtras) {
        cacheHasher.update(`|${extra.angleLabel}|${extra.base64}`);
      }
      const diagnosisCacheKey = cacheHasher.digest('hex');

      const cachedEntry = diagnosisResultCache.get(diagnosisCacheKey);
      if (cachedEntry) {
        const ttlMs =
          cachedEntry.result?.googleSearchStatus === 'verified' ? 24 * 60 * 60 * 1000 : 30 * 60 * 1000;
        if (Date.now() - cachedEntry.cachedAt < ttlMs) {
          return res.json(cachedEntry.result);
        }
        diagnosisResultCache.delete(diagnosisCacheKey);
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

      const diagnosisSchema = {
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
          differentialExplanation: { type: Type.STRING },
          differentialDiseases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                diseaseId: { type: Type.STRING },
                diseaseName: { type: Type.STRING },
                likelihood: { type: Type.STRING },
                matchingSignsOnImage: { type: Type.ARRAY, items: { type: Type.STRING } },
                distinguishingFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
                referenceComparison: { type: Type.STRING },
                whyRankedHere: { type: Type.STRING },
              },
              required: [
                'diseaseId',
                'diseaseName',
                'likelihood',
                'matchingSignsOnImage',
                'distinguishingFeatures',
                'referenceComparison',
                'whyRankedHere',
              ],
            },
          },
          comparisonMatrix: {
            type: Type.OBJECT,
            properties: {
              sharedSymptoms: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Danh sách 2-3 dấu hiệu tương đồng giữa các bệnh dễ nhầm lẫn.',
              },
              rows: {
                type: Type.ARRAY,
                description: 'BẮT BUỘC có 3 đến 4 tiêu chí so sánh rõ ràng (ví dụ: 1. Màu sắc & hình dạng vết bệnh, 2. Vị trí & tính đối xứng trên lá/quả, 3. Bề mặt mô bệnh / dấu vết phụ, 4. Dấu hiệu đặc trưng giúp chốt phân biệt).',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    criterion: { type: Type.STRING },
                    observedOnPhoto: { type: Type.STRING },
                    diseaseDetails: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          diseaseName: { type: Type.STRING },
                          detail: { type: Type.STRING },
                        },
                        required: ['diseaseName', 'detail'],
                      },
                    },
                  },
                  required: ['criterion', 'observedOnPhoto', 'diseaseDetails'],
                },
              },
            },
            required: ['sharedSymptoms', 'rows'],
          },
          verification: {
            type: Type.OBJECT,
            properties: {
              initialHypothesis: { type: Type.STRING },
              finalConclusion: { type: Type.STRING },
              agreementStatus: { type: Type.STRING },
              consistentPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              contradictionsOrUncertainties: { type: Type.ARRAY, items: { type: Type.STRING } },
              limitations: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              'initialHypothesis',
              'finalConclusion',
              'agreementStatus',
              'consistentPoints',
              'contradictionsOrUncertainties',
              'limitations',
            ],
          },
          reliability: {
            type: Type.OBJECT,
            properties: {
              overallLevel: { type: Type.STRING },
              evidenceCompleteness: { type: Type.STRING },
              evidenceCompletenessNote: { type: Type.STRING },
              sourceAgreement: { type: Type.STRING },
              sourceAgreementNote: { type: Type.STRING },
              visualSimilarityNote: { type: Type.STRING },
              summary: { type: Type.STRING },
              lowConfidenceAction: { type: Type.STRING },
            },
            required: [
              'overallLevel',
              'evidenceCompleteness',
              'evidenceCompletenessNote',
              'sourceAgreement',
              'sourceAgreementNote',
              'visualSimilarityNote',
              'summary',
            ],
          },
          treatmentGuide: {
            type: Type.OBJECT,
            properties: {
              cause: { type: Type.STRING },
              recognitionSigns: { type: Type.ARRAY, items: { type: Type.STRING } },
              favorableConditions: { type: Type.STRING },
              cultivationAndPrevention: { type: Type.ARRAY, items: { type: Type.STRING } },
              professionalHandling: { type: Type.ARRAY, items: { type: Type.STRING } },
              pesticideSafetyNote: { type: Type.STRING },
              immediate24hSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2-4 việc làm cụ thể ngay trong 24 giờ đầu ngoài vườn/ruộng (cắt tỉa, thu gom, khử dụng cụ, điều chỉnh nước/phân...).',
              },
              careNext3To7Days: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2-3 bước chăm sóc, phục hồi cây và theo dõi trong 3-7 ngày tiếp theo.',
              },
              mildVsSevereGuide: {
                type: Type.OBJECT,
                properties: {
                  mildCase: {
                    type: Type.STRING,
                    description: 'Hướng xử lý cụ thể khi mới chớm bị nhẹ vài lá hoặc vài cây/khóm.',
                  },
                  severeCase: {
                    type: Type.STRING,
                    description: 'Hướng xử lý cụ thể khi đã bị nặng lan rộng (nói thẳng nếu bệnh nan y không chữa được cần chặt/nhổ tiêu hủy tránh tốn tiền thuốc).',
                  },
                },
                required: ['mildCase', 'severeCase'],
              },
              suggestedActiveIngredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '1-3 tên thuốc hoặc hoạt chất phổ biến được phép lưu hành tại Việt Nam để nông dân hỏi mua ở đại lý vật tư (không tự bịa liều lượng pha chế).',
              },
              suggestedPesticides: {
                type: Type.ARRAY,
                description: '1-4 gợi ý thuốc bảo vệ thực vật / hoạt chất / chế phẩm sinh học chính xác đối chiếu từ Google Search và tài liệu Cục BVTV / Khuyến nông Việt Nam.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productOrIngredientName: { type: Type.STRING },
                    activeIngredient: { type: Type.STRING },
                    category: { type: Type.STRING },
                    targetUse: { type: Type.STRING },
                    sprayGuidance: { type: Type.STRING },
                    googleSearchQuery: { type: Type.STRING },
                  },
                  required: [
                    'productOrIngredientName',
                    'activeIngredient',
                    'category',
                    'targetUse',
                    'sprayGuidance',
                    'googleSearchQuery',
                  ],
                },
              },
              doList: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2-3 việc NÊN làm để chặn bệnh nhanh và an toàn.',
              },
              dontList: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2-3 việc TUYỆT ĐỐI TRÁNH vì dễ làm bệnh lây lan nặng hơn hoặc lãng phí.',
              },
              recoveryCheckSigns: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '2-3 dấu hiệu dễ nhìn sau 5-7 ngày giúp nông dân kiểm tra bệnh đã đứng vết hay đang lan thêm.',
              },
            },
            required: [
              'cause',
              'recognitionSigns',
              'favorableConditions',
              'cultivationAndPrevention',
              'professionalHandling',
              'pesticideSafetyNote',
              'immediate24hSteps',
              'careNext3To7Days',
              'mildVsSevereGuide',
              'suggestedActiveIngredients',
              'suggestedPesticides',
              'doList',
              'dontList',
              'recoveryCheckSigns',
            ],
          },
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
          'differentialExplanation',
          'differentialDiseases',
          'comparisonMatrix',
          'verification',
          'reliability',
          'treatmentGuide',
          'severityAssessment',
          'needsMoreImages',
          'additionalImageInstructions',
          'recommendations',
          'actionPlan',
          'expertVerificationRecommended',
          'disclaimer',
        ],
      };

      const requestDeadline = Date.now() + 55000;
      const getTimeoutMs = (capMs: number) => Math.max(0, Math.min(capMs, requestDeadline - Date.now()));
      const now = Date.now();
      let googleSearchQuotaExceeded = searchQuotaCooldownUntil > now;
      let googleSearchAttempted = false;

      // PHASE 1: Deterministic High-Reasoning Visual Pathology Analysis (NO stochastic web search during visual classification!)
      // Always use the strongest available primary model (never downgrade to flash-lite unless primary fails).
      let primaryModelUsed = '';
      if (!permissionOrBillingFailure) {
        for (const model of CANDIDATE_MODELS) {
          const dailyCooldown = modelDailyExhaustedUntil.get(model) || 0;
          if (dailyCooldown > Date.now()) {
            if (!lastError) {
              lastError = new Error(`Model ${model} đã đạt giới hạn lượt miễn phí trong ngày (429 GenerateRequestsPerDay).`);
            }
            continue;
          }

          for (let attempt = 0; attempt < 2; attempt++) {
            const phase1Timeout = getTimeoutMs(model.includes('flash-lite') ? 22000 : 32000);
            if (phase1Timeout < 5000) break;

            try {
              const thinkingLevel = model.includes('flash-lite')
                ? attempt > 0
                  ? ThinkingLevel.LOW
                  : ThinkingLevel.MEDIUM
                : attempt > 0
                ? ThinkingLevel.MEDIUM
                : ThinkingLevel.HIGH;

              const response = await ai.models.generateContent({
                model,
                contents: [...imageParts, { text: userPrompt }],
                config: buildModelGenConfig(model, {
                  systemInstruction,
                  thinkingLevel,
                  responseMimeType: 'application/json',
                  responseSchema: diagnosisSchema,
                  abortSignal: AbortSignal.timeout(phase1Timeout),
                }),
              });

              if (response.text) {
                const cleanJson = response.text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
                parsedResult = JSON.parse(cleanJson);
                primaryModelUsed = model;
                break;
              }
            } catch (apiErr: any) {
              lastError = apiErr;
              if (isPermissionOrBillingError(apiErr)) {
                permissionOrBillingFailure = true;
                console.error('[AgriVision AI] Gemini API permission or billing error:', apiErr?.message || apiErr);
                break;
              }
              const errMsg = String(apiErr?.message || apiErr || '').toLowerCase();
              const isDailyLimit = errMsg.includes('perday') || errMsg.includes('requestsperday');
              const isQuota429 =
                apiErr?.code === 429 ||
                apiErr?.status === 429 ||
                errMsg.includes('429') ||
                errMsg.includes('resource_exhausted') ||
                errMsg.includes('quota');
              if (isDailyLimit) {
                modelDailyExhaustedUntil.set(model, Date.now() + 10 * 60 * 1000);
              }
              if (isQuota429) {
                console.info(`[AgriVision AI] Model ${model} reached quota limit (429); trying fallback model.`);
                break;
              }
              const isTransient =
                errMsg.includes('503') ||
                errMsg.includes('unavailable') ||
                errMsg.includes('timeout') ||
                errMsg.includes('abort');
              console.info(`[AgriVision AI] Phase 1 vision model ${model} (attempt ${attempt + 1}) error:`, apiErr?.message || apiErr);
              if (isTransient && attempt === 0 && getTimeoutMs(10000) > 6000) {
                await new Promise((r) => setTimeout(r, 600));
                continue;
              }
              break;
            }
          }
          if (parsedResult || permissionOrBillingFailure) {
            break;
          }
        }
      }

      if (parsedResult) {
        const primaryDiag = parsedResult.possibleDiagnoses?.[0];
        const primaryId = String(primaryDiag?.diseaseId || '').trim();
        const primaryName = stripEnglishParentheticals(String(primaryDiag?.diseaseName || '')).trim();
        const secondaryDiag = parsedResult.possibleDiagnoses?.[1] || parsedResult.differentialDiseases?.[1];
        const secondaryName = stripEnglishParentheticals(String(secondaryDiag?.diseaseName || '')).trim();
        const isHealthyOrSpecial =
          parsedResult.isPlantImage === false ||
          parsedResult.selectedCropMatches === false ||
          primaryId === 'healthy' ||
          primaryId === 'unclear_due_to_blur';

        // PHASE 2: Focused Google Search Verification & Registered Pesticide Grounding
        // Runs ONLY after Phase 1 deterministically locked the disease, and caches per (crop, primaryId, secondaryId)
        // so repeated scans of the same image NEVER flip diagnoses or pesticide guidance.
        if (!isHealthyOrSpecial && primaryName) {
          const groundingCacheKey = `${aiClientKeyFingerprint}|${cropType}|${primaryId || primaryName}|${secondaryDiag?.diseaseId || secondaryName}`;
          const cachedGrounding = diseaseGroundingCache.get(groundingCacheKey);
          let searchPayload: any = null;

          if (cachedGrounding && Date.now() - cachedGrounding.cachedAt < 12 * 60 * 60 * 1000) {
            searchPayload = cachedGrounding.payload;
            googleSearchAttempted = true;
          } else if (!googleSearchQuotaExceeded && getTimeoutMs(18000) >= 5000) {
            googleSearchAttempted = true;
            const searchModel = primaryModelUsed || CANDIDATE_MODELS[0];
            const searchTimeout = getTimeoutMs(15000);
            try {
              const searchPrompt = `BẮT BUỘC gọi công cụ Google Search để rà soát kỹ tài liệu nông nghiệp chính thống tại Việt Nam (Cục Bảo vệ Thực vật, Viện Bảo vệ Thực vật, Trung tâm Khuyến nông Quốc gia, Học viện Nông nghiệp Việt Nam, Đại học Cần Thơ) và Danh mục thuốc BVTV được phép lưu hành tại Việt Nam cho trường hợp:
- Cây trồng: ${cropNameVi}
- Bệnh nghi ngờ chính: ${primaryName}${secondaryName ? `\n- Bệnh dễ nhầm cần phân biệt: ${secondaryName}` : ''}

Hãy tìm kiếm cả triệu chứng phân biệt lẫn thuốc đặc trị/hoạt chất được phép lưu hành tại Việt Nam, sau đó xuất duy nhất 1 khối JSON theo cấu trúc:
\`\`\`json
{
  "agreementStatus": "confirmed | partially_consistent | conflicting",
  "verificationNote": "1-2 câu tiếng Việt tóm tắt kết quả đối chiếu từ các nguồn vừa tìm được",
  "consistentPoints": ["điểm thống nhất 1", "điểm thống nhất 2"],
  "suggestedActiveIngredients": ["Tên hoạt chất hoặc thuốc chuẩn 1", "Tên hoạt chất 2"],
  "suggestedPesticides": [
    {
      "productOrIngredientName": "Tên thuốc hoặc chế phẩm chuẩn",
      "activeIngredient": "Hoạt chất chuẩn",
      "category": "biological | chemical | mineral | none",
      "targetUse": "Công dụng cụ thể cho bệnh này",
      "sprayGuidance": "Thời điểm và cách phun an toàn, nhắc đọc kỹ liều trên nhãn",
      "googleSearchQuery": "cụm từ tìm kiếm Google tiếng Việt chuẩn xác"
    }
  ]
}
\`\`\``;

              const searchResp = await ai.models.generateContent({
                model: searchModel,
                contents: searchPrompt,
                config: buildModelGenConfig(searchModel, {
                  thinkingLevel: ThinkingLevel.LOW,
                  tools: [{ googleSearch: {} }],
                  abortSignal: AbortSignal.timeout(searchTimeout),
                }),
              });

              extractGroundingFromResponse(searchResp);

              // Phase 2B: If fewer than 2 distinct domains were retrieved, run one targeted pesticide/institute Google Search
              const currentDomains = new Set(collectedSources.map((s) => s.domain.toLowerCase()));
              const phase2bTimeout = getTimeoutMs(9000);
              if (currentDomains.size < 2 && phase2bTimeout >= 4500) {
                try {
                  const extraResp = await ai.models.generateContent({
                    model: searchModel,
                    contents: `Hãy gọi Google Search tìm "thuốc trừ bệnh ${primaryName} ${cropNameVi} Cục Bảo vệ Thực vật khuyến nông" để bổ sung thêm nguồn chính thống và tên hoạt chất được phép lưu hành tại Việt Nam. Tóm tắt ngắn trong 3-4 câu.`,
                    config: buildModelGenConfig(searchModel, {
                      thinkingLevel: ThinkingLevel.LOW,
                      tools: [{ googleSearch: {} }],
                      abortSignal: AbortSignal.timeout(phase2bTimeout),
                    }),
                  });
                  extractGroundingFromResponse(extraResp);
                } catch {
                  // Supplementary search is best-effort
                }
              }

              let parsedSearchJson: any = null;
              if (searchResp.text) {
                const jsonBlockMatch = searchResp.text.match(/```(?:json)?\s*([\s\S]*?)```/i) || searchResp.text.match(/(\{[\s\S]*\})/);
                if (jsonBlockMatch) {
                  try {
                    parsedSearchJson = JSON.parse(jsonBlockMatch[1].trim());
                  } catch {
                    parsedSearchJson = null;
                  }
                }
                if (!parsedSearchJson) {
                  const detectedMeds = extractMedicinesFromText(searchResp.text);
                  if (detectedMeds.length > 0) {
                    parsedSearchJson = {
                      agreementStatus: collectedSources.length >= 2 ? 'confirmed' : 'partially_consistent',
                      suggestedActiveIngredients: detectedMeds.slice(0, 3),
                    };
                  }
                }
              }

              collectedSources.sort((a, b) => a.priority - b.priority);
              const fetchedSources = collectedSources.slice(0, 6);
              searchPayload = {
                sources: fetchedSources,
                queries: collectedQueries.slice(0, 5),
                parsed: parsedSearchJson,
              };

              if (fetchedSources.length > 0) {
                if (diseaseGroundingCache.size >= 200) {
                  const oldest = diseaseGroundingCache.keys().next().value;
                  if (oldest) diseaseGroundingCache.delete(oldest);
                }
                diseaseGroundingCache.set(groundingCacheKey, { payload: searchPayload, cachedAt: Date.now() });
                persistGroundingCache();
              }
            } catch (searchErr: any) {
              const sErrLower = String(searchErr?.message || searchErr || '').toLowerCase();
              if (
                searchErr?.code === 429 ||
                searchErr?.status === 429 ||
                sErrLower.includes('429') ||
                sErrLower.includes('resource_exhausted') ||
                sErrLower.includes('quota')
              ) {
                googleSearchQuotaExceeded = true;
                searchQuotaCooldownUntil = Date.now() + 5 * 60 * 1000;
              }
              console.info(`[AgriVision AI] Phase 2 grounding search skipped/unavailable:`, searchErr?.message || searchErr);
            }
          }

          if (searchPayload) {
            if (Array.isArray(searchPayload.sources) && searchPayload.sources.length > 0 && collectedSources.length === 0) {
              for (const src of searchPayload.sources) {
                collectedSources.push(src);
              }
            }
            if (Array.isArray(searchPayload.queries) && searchPayload.queries.length > 0) {
              for (const q of searchPayload.queries) {
                if (!collectedQueries.includes(q)) collectedQueries.push(q);
              }
            }

            const sp = searchPayload.parsed;
            if (sp && typeof sp === 'object') {
              if (Array.isArray(sp.suggestedPesticides) && sp.suggestedPesticides.length > 0 && parsedResult.treatmentGuide) {
                parsedResult.treatmentGuide.suggestedPesticides = sp.suggestedPesticides;
              }
              if (Array.isArray(sp.suggestedActiveIngredients) && sp.suggestedActiveIngredients.length > 0 && parsedResult.treatmentGuide) {
                parsedResult.treatmentGuide.suggestedActiveIngredients = sp.suggestedActiveIngredients;
              }
              if (parsedResult.verification && typeof parsedResult.verification === 'object') {
                if (['confirmed', 'partially_consistent', 'conflicting'].includes(sp.agreementStatus)) {
                  parsedResult.verification.agreementStatus = sp.agreementStatus;
                }
                if (typeof sp.verificationNote === 'string' && sp.verificationNote.trim()) {
                  parsedResult.verification.finalConclusion = sp.verificationNote.trim();
                }
                if (Array.isArray(sp.consistentPoints) && sp.consistentPoints.length > 0) {
                  parsedResult.verification.consistentPoints = sp.consistentPoints;
                }
              }
            }
          }
        }

        // Sort collected real sources by authority priority
        collectedSources.sort((a, b) => a.priority - b.priority);
        const topRealSources = collectedSources.slice(0, 6);
        const distinctDomains = new Set(topRealSources.map((s) => s.domain.toLowerCase()));

        if (topRealSources.length > 0) {
          parsedResult.groundingSources = topRealSources.map((s) => ({
            title: s.title,
            url: s.url,
            domain: s.domain,
            sourceCategory: s.sourceCategory,
            evidenceExcerpt: s.excerpts.length > 0 ? s.excerpts.join(' ') : undefined,
          }));
          parsedResult.evidenceItems = topRealSources.map((s) => ({
            sourceTitle: s.title,
            domain: s.domain,
            sourceCategory: s.sourceCategory,
            url: s.url,
            evidenceExcerpt:
              s.excerpts.length > 0
                ? s.excerpts.join(' ')
                : 'Nguồn tài liệu được truy xuất trực tiếp qua tìm kiếm trực tuyến để đối chiếu triệu chứng và thuốc điều trị.',
          }));
          parsedResult.googleSearchStatus = 'verified';
        } else if (googleSearchQuotaExceeded) {
          parsedResult.evidenceItems = [];
          parsedResult.googleSearchStatus = 'quota_exceeded';
          parsedResult.googleSearchNotice =
            'Lượt tra cứu đối chiếu trực tuyến tạm thời hết hạn mức. Kết quả trên dựa trên ảnh chụp và bộ dữ liệu 132 bệnh nội bộ.';
        } else if (googleSearchAttempted) {
          parsedResult.evidenceItems = [];
          parsedResult.googleSearchStatus = 'unavailable';
          parsedResult.googleSearchNotice =
            'Chưa truy xuất được nguồn tài liệu trực tuyến cho lượt quét này. Kết quả trên dựa trên phân tích ảnh chuyên sâu và kho dữ liệu tích hợp sẵn.';
        }

        if (collectedQueries.length > 0) {
          parsedResult.searchQueries = collectedQueries.slice(0, 5);
        }

        // Transparent verification metadata
        if (parsedResult.verification && typeof parsedResult.verification === 'object') {
          parsedResult.verification.independentModelUsed = topRealSources.length >= 2;
          parsedResult.verification.verifierModelLabel =
            topRealSources.length > 0
              ? 'Phân tích hình ảnh chuyên sâu nhất quán kết hợp đối chiếu tài liệu đa nguồn từ Internet'
              : 'Phân tích hình ảnh chuyên sâu kết hợp kho dữ liệu 132 bệnh chuẩn';

          const validStatuses = ['confirmed', 'partially_consistent', 'conflicting', 'insufficient'];
          if (!validStatuses.includes(parsedResult.verification.agreementStatus)) {
            parsedResult.verification.agreementStatus =
              topRealSources.length >= 2 ? 'confirmed' : topRealSources.length === 1 ? 'partially_consistent' : 'insufficient';
          }
        }

        // Strict server-side Reliability Calibration Guard
        if (!isHealthyOrSpecial) {
          const rel = parsedResult.reliability && typeof parsedResult.reliability === 'object'
            ? parsedResult.reliability
            : {
                overallLevel: 'medium',
                evidenceCompleteness: 'partial',
                evidenceCompletenessNote: '',
                sourceAgreement: 'partial_consensus',
                sourceAgreementNote: '',
                visualSimilarityNote: '',
                summary: '',
              };

          const agreeStatus = parsedResult.verification?.agreementStatus;
          const hasContradictions =
            Array.isArray(parsedResult.verification?.contradictionsOrUncertainties) &&
            parsedResult.verification.contradictionsOrUncertainties.length > 0;

          let calibratedLevel: 'high' | 'medium' | 'low' =
            rel.overallLevel === 'high' || rel.overallLevel === 'medium' || rel.overallLevel === 'low'
              ? rel.overallLevel
              : 'medium';

          if (
            parsedResult.imageQuality === 'poor' ||
            agreeStatus === 'conflicting' ||
            agreeStatus === 'insufficient' ||
            primaryDiag?.confidenceLevel === 'insufficient_evidence' ||
            primaryDiag?.confidenceLevel === 'low'
          ) {
            calibratedLevel = 'low';
          } else if (
            distinctDomains.size < 2 ||
            agreeStatus !== 'confirmed' ||
            parsedResult.imageQuality === 'fair' ||
            primaryDiag?.confidenceLevel !== 'high'
          ) {
            if (calibratedLevel === 'high') {
              calibratedLevel = 'medium';
            }
          }

          if (distinctDomains.size === 0 && hasContradictions) {
            calibratedLevel = 'low';
          }

          rel.overallLevel = calibratedLevel;

          if (distinctDomains.size === 0) {
            rel.sourceAgreement = 'insufficient_sources';
            if (!rel.sourceAgreementNote) {
              rel.sourceAgreementNote = 'Chưa truy xuất được nguồn tài liệu trực tuyến để đối chiếu chéo nhiều nguồn.';
            }
          } else if (agreeStatus === 'conflicting') {
            rel.sourceAgreement = 'conflicting';
          } else if (distinctDomains.size >= 2 && agreeStatus === 'confirmed') {
            rel.sourceAgreement = 'high_consensus';
          } else {
            rel.sourceAgreement = 'partial_consensus';
          }

          if (calibratedLevel === 'low') {
            rel.evidenceCompleteness = 'insufficient';
            parsedResult.needsMoreImages = true;
            parsedResult.expertVerificationRecommended = true;
            if (!rel.lowConfidenceAction) {
              rel.lowConfidenceAction =
                'Độ tin cậy hiện ở mức thấp do thiếu bằng chứng hoặc ảnh chưa đủ rõ nét. Bác vui lòng chụp lại cận cảnh rõ nét hơn (thêm mặt dưới lá và cả tán cây) hoặc hỏi cán bộ bảo vệ thực vật địa phương trước khi xử lý.';
            }
          } else if (calibratedLevel === 'medium') {
            if (rel.evidenceCompleteness === 'sufficient' && distinctDomains.size < 2) {
              rel.evidenceCompleteness = 'partial';
            }
          } else {
            rel.evidenceCompleteness = 'sufficient';
          }

          parsedResult.reliability = rel;
        }

        // Enforce mandatory pesticide safety disclaimer
        if (parsedResult.treatmentGuide && typeof parsedResult.treatmentGuide === 'object') {
          const defaultSafety =
            'Không tự ý pha trộn hoặc tăng liều thuốc bảo vệ thực vật. Nếu cần dùng thuốc đặc trị, bác chỉ sử dụng thuốc nằm trong danh mục được phép lưu hành cho đúng loại cây, đọc kỹ hướng dẫn trên nhãn bao bì và tham khảo cán bộ bảo vệ thực vật địa phương.';
          if (!parsedResult.treatmentGuide.pesticideSafetyNote || parsedResult.treatmentGuide.pesticideSafetyNote.length < 30) {
            parsedResult.treatmentGuide.pesticideSafetyNote = defaultSafety;
          }
        }

        const cleanResult = sanitizeDiagnosisResultToVietnamese(parsedResult, cropType);
        const finalPrimaryId = cleanResult.possibleDiagnoses?.[0]?.diseaseId;
        const isSuccessfulScan =
          cleanResult.isPlantImage !== false &&
          cleanResult.selectedCropMatches !== false &&
          finalPrimaryId !== 'unclear_due_to_blur';

        if (isSuccessfulScan) {
          recordSuccessfulScan(cropType);
        }

        if (finalPrimaryId !== 'unclear_due_to_blur') {
          if (diagnosisResultCache.size >= 300) {
            const oldestKey = diagnosisResultCache.keys().next().value;
            if (oldestKey) diagnosisResultCache.delete(oldestKey);
          }
          diagnosisResultCache.set(diagnosisCacheKey, { result: cleanResult, cachedAt: Date.now() });
          persistDiagCache();
        }
        return res.json(cleanResult);
      }

      if (permissionOrBillingFailure) {
        return res.status(503).json({
          error: 'Dịch vụ phân tích ảnh tạm thời chưa được kích hoạt quyền truy cập trên máy chủ.',
          details: lastError?.message || String(lastError || ''),
        });
      }

      const rawErrMsg = String(lastError?.message || lastError || '');
      const errLower = rawErrMsg.toLowerCase();
      const isQuotaExceeded =
        lastError?.code === 429 ||
        lastError?.status === 429 ||
        errLower.includes('429') ||
        errLower.includes('quota') ||
        errLower.includes('resource_exhausted');

      if (isQuotaExceeded) {
        return res.status(429).json({
          error:
            'Hệ thống phân tích ảnh đã hết lượt miễn phí tạm thời. Bác vui lòng chờ ít phút rồi thử lại nhé.',
          details: rawErrMsg,
        });
      }

      let friendly502 = 'Không thể phân tích hình ảnh lúc này. Bác vui lòng thử lại sau ít phút.';
      if (errLower.includes('api key not valid') || errLower.includes('api_key_invalid') || errLower.includes('invalid api key')) {
        friendly502 = 'Khóa kết nối trên máy chủ không hợp lệ. Vui lòng kiểm tra lại cấu hình hệ thống.';
      } else if (errLower.includes('not found') || errLower.includes('not_found') || errLower.includes('is not supported')) {
        friendly502 = 'Dịch vụ phân tích hiện chưa khả dụng với cấu hình máy chủ hiện tại.';
      }

      return res.status(502).json({
        error: friendly502,
        details: rawErrMsg,
      });
    } catch (error: any) {
      console.error('Error during Gemini plant diagnosis:', error);
      return res.status(500).json({
        error: 'Không thể hoàn thành chẩn đoán ảnh lúc này.',
        details: error.message || String(error),
      });
    }
  });

  // 2. Agricultural AI Assistant Chat Endpoint (with Google Search Grounding for accurate pesticide guidance)
  app.post('/api/assistant', async (req: Request, res: Response) => {
    try {
      const { message, history = [], diagnosisContext } = req.body || {};

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Nội dung câu hỏi là bắt buộc.' });
      }

      const assistantKnowledge = buildAssistantKnowledgeContext(
        message,
        diagnosisContext?.crop,
        diagnosisContext?.suspectedDisease
      );

      const systemInstruction = `
Bạn là Bác sĩ Cây trồng chuyên sâu về cây trồng vùng Bắc Trung Bộ (Cây Cam Bưởi, Cây Lúa, Cây Lạc) với kho dữ liệu ${DEFAULT_DISEASES.length} bệnh, sâu hại và thiếu dinh dưỡng đã kiểm chứng, kết hợp tra cứu Google Search trực tiếp theo tài liệu Cục Bảo vệ Thực vật và Khuyến nông Việt Nam.
Mục tiêu của bạn là đồng hành cùng bà con nông dân, giải đáp thắc mắc rõ ràng, mộc mạc, dễ hiểu và chuẩn xác.

NGUYÊN TẮC BẮT BUỘC:
1. TRẢ LỜI BẰNG TIẾNG VIỆT DỄ HIỂU: Giải thích mộc mạc cho bà con nông dân. Khi bà con hỏi về **thuốc phun, thuốc đặc trị hoặc hoạt chất**, BẮT BUỘC gọi công cụ Google Search để kiểm chứng đúng tên hoạt chất và thuốc bảo vệ thực vật được phép lưu hành tại Việt Nam cho đúng bệnh và đúng cây trồng (có thể giữ nguyên tên hoạt chất quốc tế chuẩn như Tricyclazole, Azoxystrobin, Difenoconazole, Copper Hydroxide, Abamectin, Validamycin, Trichoderma... để bà con ra đại lý mua cho đúng).
2. Phân biệt rõ thông tin đã xác thực từ tài liệu nông nghiệp và gợi ý cần kiểm tra thêm ngoài vườn.
3. Không tự ý bịa liều lượng pha hóa chất độc hại; luôn nhắc Nguyên tắc 4 đúng và đọc kỹ liều lượng trên nhãn bao bì.
4. Nếu người dùng đang hỏi về một lần khám bệnh gần nhất, hãy giải thích dựa đúng trên ngữ cảnh đó.
5. Nếu trong câu trả lời có gợi ý tên thuốc hoặc hoạt chất cụ thể để phun/trị, ở dòng cuối cùng hãy thêm đúng 1 thẻ định dạng:
   [GOI_Y_THUOC: Tên thuốc hoặc hoạt chất 1 | Tên thuốc hoặc hoạt chất 2]
   (tối đa 4 mục, ngăn cách bởi dấu |). Nếu câu hỏi không liên quan đến thuốc thì không cần thêm thẻ này.

CƠ SỞ DỮ LIỆU ĐÃ KIỂM CHỨNG LIÊN QUAN:
${assistantKnowledge}
      `.trim();

      let contextPrompt = '';
      if (diagnosisContext) {
        contextPrompt = `
[Ngữ cảnh chẩn đoán hiện tại]:
- Cây trồng: ${diagnosisContext.crop}${diagnosisContext.part ? `\n- Bộ phận: ${diagnosisContext.part}` : ''}
- Bệnh nghi ngờ: ${diagnosisContext.suspectedDisease || 'Chưa xác định'}
- Triệu chứng ghi nhận: ${JSON.stringify(diagnosisContext.symptoms || [])}
- Mức độ tin cậy: ${diagnosisContext.confidenceLevel || 'Trung bình'}
\n`;
      }

      const conversationPrompt = Array.isArray(history)
        ? history
            .slice(-6)
            .map((h: { sender: string; content: string }) => `${h.sender === 'user' ? 'Người dùng' : 'Trợ lý'}: ${h.content}`)
            .join('\n')
        : '';

      const fullPrompt = `${contextPrompt}${conversationPrompt ? conversationPrompt + '\n' : ''}Người dùng: ${message}\nTrợ lý:`;

      let replyText = '';
      const assistantSources: { title: string; url: string; domain?: string; sourceCategory?: string }[] = [];

      const ai = getGeminiClient();
      if (ai) {
        for (const model of CANDIDATE_MODELS) {
          if ((modelDailyExhaustedUntil.get(model) || 0) > Date.now()) {
            continue;
          }
          try {
            const response = await ai.models.generateContent({
              model,
              contents: fullPrompt,
              config: buildModelGenConfig(model, {
                systemInstruction,
                thinkingLevel: model.includes('flash-lite') ? ThinkingLevel.MINIMAL : ThinkingLevel.LOW,
                tools: [{ googleSearch: {} }],
                abortSignal: AbortSignal.timeout(15000),
              }),
            });
            if (response.text) {
              replyText = response.text;
              const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
              if (Array.isArray(chunks)) {
                for (const chunk of chunks) {
                  const uri = chunk?.web?.uri;
                  const title = String(chunk?.web?.title || uri || '').trim();
                  if (typeof uri === 'string' && (uri.startsWith('http://') || uri.startsWith('https://'))) {
                    if (!assistantSources.some((s) => s.url === uri)) {
                      let domain = '';
                      try {
                        domain = new URL(uri).hostname.replace(/^www\./, '');
                      } catch {
                        domain = title;
                      }
                      assistantSources.push({
                        title: title || domain,
                        url: uri,
                        domain: domain.includes('vertexaisearch.cloud.google.com') ? title : domain,
                      });
                    }
                  }
                }
              }
              break;
            }
          } catch (apiErr: any) {
            if (isPermissionOrBillingError(apiErr)) {
              console.info('[AgriVision AI] Live Gemini API requires billing setup on Google Cloud. Using regional botanical assistant knowledge.');
              break;
            }
            const errMsg = String(apiErr?.message || apiErr || '').toLowerCase();
            if (errMsg.includes('perday') || errMsg.includes('requestsperday')) {
              modelDailyExhaustedUntil.set(model, Date.now() + 10 * 60 * 1000);
            }
            console.info(`Assistant model ${model} unavailable, trying next candidate...`);
          }
        }
      }

      if (!replyText) {
        replyText = searchRegionalKnowledge(message, diagnosisContext?.crop);
      }

      // Extract [GOI_Y_THUOC: ...] tag + known medicine patterns
      const parsedMedicines: { name: string; searchQuery: string }[] = [];
      const tagMatch = replyText.match(/\[GOI_Y_THUOC:\s*([^\]]+)\]/i);
      if (tagMatch) {
        const rawList = tagMatch[1]
          .split('|')
          .map((s) => s.trim())
          .filter((s) => s.length >= 2);
        for (const med of rawList.slice(0, 4)) {
          if (!parsedMedicines.some((m) => m.name.toLowerCase() === med.toLowerCase())) {
            const cropHint = diagnosisContext?.crop ? ` ${diagnosisContext.crop}` : '';
            const diseaseHint = diagnosisContext?.suspectedDisease ? ` ${diagnosisContext.suspectedDisease}` : '';
            parsedMedicines.push({
              name: med,
              searchQuery: `thuốc bảo vệ thực vật ${med}${diseaseHint}${cropHint} cách dùng`.replace(/\s+/g, ' ').trim(),
            });
          }
        }
        replyText = replyText.replace(/\[GOI_Y_THUOC:\s*[^\]]+\]/gi, '').trim();
      }

      if (parsedMedicines.length === 0) {
        const detected = extractMedicinesFromText(replyText);
        for (const med of detected.slice(0, 4)) {
          const cropHint = diagnosisContext?.crop ? ` ${diagnosisContext.crop}` : '';
          const diseaseHint = diagnosisContext?.suspectedDisease ? ` ${diagnosisContext.suspectedDisease}` : '';
          parsedMedicines.push({
            name: med,
            searchQuery: `${med}${diseaseHint}${cropHint} cách dùng`.replace(/\s+/g, ' ').trim(),
          });
        }
      }

      return res.json({
        reply: cleanVietnameseText(replyText),
        suggestedMedicines: parsedMedicines,
        sources: assistantSources.slice(0, 4),
      });
    } catch (error: any) {
      console.error('Error during AI assistant response:', error);
      return res.status(500).json({
        error: 'Không thể kết nối với Trợ lý nông nghiệp lúc này.',
        details: error.message || String(error),
      });
    }
  });

  // 3. Verified Disease Database API
  app.get('/api/diseases', (_req: Request, res: Response) => {
    res.json({ diseases: DEFAULT_DISEASES });
  });

  // 3b. Real Successful Diagnosis Counter API (for HomeDashboard farmer trust banner)
  app.get('/api/stats', (_req: Request, res: Response) => {
    res.json({
      totalSuccessfulScans: scanTrustStats.totalSuccessfulScans,
      byCrop: scanTrustStats.byCrop,
      verifiedDiseaseCount: DEFAULT_DISEASES.length,
      updatedAt: scanTrustStats.updatedAt,
    });
  });

  // 4. Text-to-Speech Endpoint for reading diagnosis results aloud in Vietnamese
  app.post('/api/tts', async (req: Request, res: Response) => {
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
      const errMsg = String(error?.message || error || '').toLowerCase();
      const isQuotaExceeded =
        error?.code === 429 ||
        error?.status === 429 ||
        errMsg.includes('429') ||
        errMsg.includes('resource_exhausted') ||
        errMsg.includes('quota');
      if (isQuotaExceeded) {
        console.info('[AgriVision AI] TTS quota reached (429).');
        return res.status(429).json({
          error: 'Giọng đọc AI tạm thời hết lượt miễn phí (Mã 429). Bác vui lòng đọc trực tiếp kết quả trên màn hình hoặc thử lại sau.',
          details: error?.message || String(error),
        });
      }
      console.error('[AgriVision AI] TTS error:', error?.message || error);
      return res.status(502).json({
        error: 'Không thể tạo giọng đọc lúc này.',
        details: error?.message || String(error),
      });
    }
  });

  // 5. Server Health Check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      app: 'AgriVision AI',
      timestamp: new Date().toISOString(),
      geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Ensure any unmatched /api/* route returns JSON instead of SPA HTML
  app.use('/api', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  // Ensure Express errors on /api/* always return JSON instead of HTML
  app.use('/api', (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[AgriVision AI] API middleware error:', err);
    const status = typeof err?.status === 'number' ? err.status : err?.type === 'entity.too.large' ? 413 : 500;
    res.status(status).json({
      error:
        status === 413
          ? 'Ảnh gửi lên vượt quá dung lượng cho phép.'
          : 'Máy chủ gặp lỗi khi xử lý yêu cầu.',
      details: err?.message || String(err),
    });
  });

  return app;
}
