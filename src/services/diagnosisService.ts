import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { DiagnosisResult, DiagnosisHistoryItem, CropType, PlantPart, FieldQuizAnswers } from '../types';
import { DEFAULT_DISEASES } from '../data/defaultDiseases';
import { sanitizeDiagnosisResultToVietnamese } from '../utils/vietnameseText';

const COLLECTION_NAME = 'diagnoses';
const LOCAL_STORAGE_KEY = 'agrivision_local_diagnoses';
const DIAGNOSIS_CACHE_KEY = 'agrivision_diag_cache_v9';

export interface ScanTrustSummary {
  totalSuccessfulScans: number;
  userSuccessfulScans: number;
  byCrop: {
    citrus: number;
    rice: number;
    peanut: number;
  };
  verifiedDiseaseCount: number;
}

export function isSuccessfulDiagnosisRecord(item: DiagnosisHistoryItem): boolean {
  const assessment = item?.assessment;
  if (!assessment) return true;
  if (assessment.isPlantImage === false || assessment.selectedCropMatches === false) return false;
  const primaryId = assessment.possibleDiagnoses?.[0]?.diseaseId;
  return primaryId !== 'unclear_due_to_blur';
}

interface CachedDiagnosisEntry {
  key: string;
  cachedAt: number;
  result: DiagnosisResult;
}

async function computeDiagnosisCacheKey(
  imageBase64: string,
  cropType: CropType,
  plantPart: PlantPart,
  extraImages?: ExtraAngleImageInput[],
  quizAnswers?: FieldQuizAnswers
): Promise<string> {
  const normalizedQuiz = quizAnswers
    ? JSON.stringify({
        spreadLevel: quizAnswers.spreadLevel || '',
        recentWeather: quizAnswers.recentWeather || '',
        extraSymptom: quizAnswers.extraSymptom || '',
        fertilizerOrWater: quizAnswers.fertilizerOrWater || '',
      })
    : '';
  const extrasKey = Array.isArray(extraImages)
    ? extraImages.map((e) => `${e.angleLabel || ''}:${e.imageBase64}`).join('|')
    : '';
  const payload = `v9|${cropType}|${plantPart}|${normalizedQuiz}|${imageBase64}|${extrasKey}`;

  try {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof TextEncoder !== 'undefined') {
      const encoded = new TextEncoder().encode(payload);
      const digest = await crypto.subtle.digest('SHA-256', encoded);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
  } catch {
    // Fallback to deterministic FNV-1a hash below
  }

  let h1 = 0x811c9dc5;
  let h2 = 0x811c9dc5;
  for (let i = 0; i < payload.length; i++) {
    const c = payload.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= c ^ (i & 0xff);
    h2 = Math.imul(h2, 0x01000193);
  }
  return `${(h1 >>> 0).toString(16)}_${(h2 >>> 0).toString(16)}_${payload.length}`;
}

function getCachedDiagnosis(key: string): DiagnosisResult | null {
  try {
    const raw = localStorage.getItem(DIAGNOSIS_CACHE_KEY);
    if (!raw) return null;
    const entries: CachedDiagnosisEntry[] = JSON.parse(raw);
    if (!Array.isArray(entries)) return null;
    const hit = entries.find((e) => e.key === key);
    if (!hit) return null;
    const ttlMs =
      hit.result?.googleSearchStatus === 'verified'
        ? 12 * 60 * 60 * 1000
        : 5 * 60 * 1000;
    if (Date.now() - hit.cachedAt > ttlMs) return null;
    return hit.result;
  } catch {
    return null;
  }
}

function setCachedDiagnosis(key: string, result: DiagnosisResult) {
  try {
    if (result?.possibleDiagnoses?.[0]?.diseaseId === 'unclear_due_to_blur') return;
    const raw = localStorage.getItem(DIAGNOSIS_CACHE_KEY);
    const existing: CachedDiagnosisEntry[] = raw ? JSON.parse(raw) : [];
    const filtered = Array.isArray(existing) ? existing.filter((e) => e.key !== key) : [];
    filtered.unshift({ key, cachedAt: Date.now(), result });
    localStorage.setItem(DIAGNOSIS_CACHE_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch {
    // Ignore storage quota errors
  }
}

export interface ExtraAngleImageInput {
  imageBase64: string;
  mimeType?: string;
  angleLabel?: string;
}

export async function runServerDiagnosis(
  imageBase64: string,
  cropType: CropType,
  plantPart: PlantPart,
  mimeType: string = 'image/jpeg',
  visualMetrics?: {
    healthyGreenRatio: number;
    yellowRatio: number;
    lesionRatio: number;
    leafShape?: 'broadleaf_oval' | 'slender_blade' | 'compound_rounded_leaflets';
    detectedCropHint?: 'citrus' | 'rice' | 'peanut' | 'unknown';
    sharpnessScore?: number;
    imageQuality?: 'good' | 'fair' | 'poor';
    qualityIssues?: string[];
    isBlurry?: boolean;
    isTooDark?: boolean;
    isOverexposed?: boolean;
    sourceSampleId?: string;
    filenameHint?: string;
  },
  extraImages?: ExtraAngleImageInput[],
  quizAnswers?: FieldQuizAnswers
): Promise<DiagnosisResult> {
  const cacheKey = await computeDiagnosisCacheKey(
    imageBase64,
    cropType,
    plantPart,
    extraImages,
    quizAnswers
  );
  const cachedResult = getCachedDiagnosis(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }

  const response = await fetch('/api/diagnose', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageBase64,
      mimeType,
      cropType,
      plantPart,
      visualMetrics,
      extraImages,
      quizAnswers,
    }),
  });

  const rawText = await response.text();
  const contentType = response.headers.get('content-type') || '';
  const trimmed = rawText.trim();

  if (!trimmed || trimmed.startsWith('<') || !contentType.includes('application/json')) {
    let parsedErr: any = null;
    try {
      parsedErr = JSON.parse(trimmed);
    } catch {
      parsedErr = null;
    }
    if (parsedErr && response.ok) {
      const res = sanitizeDiagnosisResultToVietnamese(parsedErr, cropType) as DiagnosisResult;
      setCachedDiagnosis(cacheKey, res);
      return res;
    }
    if (parsedErr && !response.ok) {
      throw new Error(parsedErr.error || parsedErr.details || 'Lỗi khi gửi ảnh phân tích đến máy chủ.');
    }
    if (response.status === 413) {
      throw new Error('Ảnh có dung lượng quá lớn. Bác vui lòng chọn ảnh nhẹ hơn hoặc chụp lại nhé.');
    }
    if (response.status === 429) {
      throw new Error(
        'Hệ thống phân tích đã hết lượt miễn phí tạm thời. Bác vui lòng chờ ít phút rồi thử lại nhé.'
      );
    }
    if (response.status === 404) {
      throw new Error(
        'Không tìm thấy cổng kết nối phân tích trên máy chủ. Bác vui lòng tải lại trang và thử lại nhé.'
      );
    }
    if (response.status === 504) {
      throw new Error(
        'Máy chủ phân tích phản hồi quá lâu. Bác vui lòng thử lại với một ảnh rõ nét nhé.'
      );
    }
    throw new Error(
      `Máy chủ phân tích đang bận hoặc kết nối tạm gián đoạn. Bác vui lòng bấm thử lại sau vài giây nhé.`
    );
  }

  let parsed: any;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    throw new Error('Phản hồi từ máy chủ không hợp lệ. Bác vui lòng thử lại nhé.');
  }

  if (!response.ok) {
    throw new Error(parsed?.error || parsed?.details || 'Lỗi khi gửi ảnh phân tích đến máy chủ.');
  }

  const finalResult = sanitizeDiagnosisResultToVietnamese(parsed, cropType) as DiagnosisResult;
  setCachedDiagnosis(cacheKey, finalResult);
  return finalResult;
}

export async function fetchScanTrustStats(
  userId?: string,
  isResearcher: boolean = false
): Promise<ScanTrustSummary> {
  const [userHistory, serverStats] = await Promise.all([
    fetchUserDiagnoses(userId, isResearcher).catch(() => [] as DiagnosisHistoryItem[]),
    fetch('/api/stats')
      .then(async (res) => (res.ok ? res.json() : null))
      .catch(() => null),
  ]);

  const userSuccessful = userHistory.filter(isSuccessfulDiagnosisRecord);
  const userByCrop = {
    citrus: userSuccessful.filter((d) => d.cropType === 'citrus').length,
    rice: userSuccessful.filter((d) => d.cropType === 'rice').length,
    peanut: userSuccessful.filter((d) => d.cropType === 'peanut').length,
  };

  const serverTotal = typeof serverStats?.totalSuccessfulScans === 'number' ? serverStats.totalSuccessfulScans : 0;
  const byCrop = {
    citrus: Math.max(serverStats?.byCrop?.citrus || 0, userByCrop.citrus),
    rice: Math.max(serverStats?.byCrop?.rice || 0, userByCrop.rice),
    peanut: Math.max(serverStats?.byCrop?.peanut || 0, userByCrop.peanut),
  };

  const totalSuccessfulScans = Math.max(
    serverTotal,
    userSuccessful.length,
    byCrop.citrus + byCrop.rice + byCrop.peanut
  );

  return {
    totalSuccessfulScans,
    userSuccessfulScans: userSuccessful.length,
    byCrop,
    verifiedDiseaseCount:
      typeof serverStats?.verifiedDiseaseCount === 'number'
        ? serverStats.verifiedDiseaseCount
        : DEFAULT_DISEASES.length,
  };
}

export async function fetchDiagnosisAudio(text: string): Promise<{ audioBase64: string; mimeType: string }> {
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const rawText = await response.text();
  const trimmed = rawText.trim();
  if (!trimmed || trimmed.startsWith('<')) {
    throw new Error('Không thể kết nối dịch vụ giọng đọc.');
  }

  const parsed = JSON.parse(trimmed);
  if (!response.ok || !parsed?.audioBase64) {
    throw new Error(parsed?.error || 'Không tạo được giọng đọc lúc này.');
  }

  return {
    audioBase64: parsed.audioBase64,
    mimeType: parsed.mimeType || 'audio/wav',
  };
}

export async function saveDiagnosisRecord(
  item: Omit<DiagnosisHistoryItem, 'id' | 'createdAt'>,
  customId?: string
): Promise<DiagnosisHistoryItem> {
  const id = customId || `diag_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const derivedDifferentials: string[] =
    item.differentialDiseases && item.differentialDiseases.length > 0
      ? item.differentialDiseases.slice(0, 3)
      : item.assessment?.differentialDiseases && item.assessment.differentialDiseases.length > 0
      ? item.assessment.differentialDiseases.map((d) => d.diseaseName).filter(Boolean).slice(0, 3)
      : item.assessment?.possibleDiagnoses && item.assessment.possibleDiagnoses.length > 1
      ? item.assessment.possibleDiagnoses.slice(1, 3).map((d) => d.diseaseName).filter(Boolean)
      : (item.assessment?.alternativeCauses || []).slice(0, 3);

  const derivedSources =
    item.referenceSources && item.referenceSources.length > 0
      ? item.referenceSources.slice(0, 6)
      : (item.assessment?.groundingSources || []).slice(0, 6);

  const fullItem: DiagnosisHistoryItem = {
    ...item,
    differentialDiseases: derivedDifferentials,
    referenceSources: derivedSources,
    id,
    createdAt: new Date().toISOString(),
  };

  // Always cache in localStorage for immediate offline access
  try {
    const local = getLocalDiagnoses();
    local.unshift(fullItem);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local.slice(0, 40)));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  // Save to Firestore only if signed into Firebase Auth (ensure document stays safely under 1MB)
  if (item.userId && auth.currentUser && auth.currentUser.uid === item.userId) {
    try {
      const firestorePayload: DiagnosisHistoryItem = {
        ...fullItem,
        imageUrl:
          fullItem.imageUrl && fullItem.imageUrl.length > 450000
            ? fullItem.imageUrl.slice(0, 0)
            : fullItem.imageUrl,
      };
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, firestorePayload);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${id}`);
    }
  }

  return fullItem;
}

export async function fetchUserDiagnoses(userId?: string, isAdminOrResearcher: boolean = false): Promise<DiagnosisHistoryItem[]> {
  try {
    if (!auth.currentUser) {
      return getLocalDiagnoses();
    }

    const colRef = collection(db, COLLECTION_NAME);
    let q;

    if (isAdminOrResearcher && !userId) {
      // Admin review mode: fetch latest across all users
      q = query(colRef, limit(100));
    } else if (userId && auth.currentUser.uid === userId) {
      q = query(colRef, where('userId', '==', userId), limit(50));
    } else {
      return getLocalDiagnoses();
    }

    const snap = await getDocs(q);
    if (snap.empty) {
      return getLocalDiagnoses();
    }

    const items: DiagnosisHistoryItem[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...(docSnap.data() as any) });
    });

    // Sort by createdAt desc
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    return getLocalDiagnoses();
  }
}

export async function updateDiagnosisVerification(
  id: string,
  status: 'unverified' | 'expert_verified' | 'corrected',
  expertNotes?: string,
  correctedDisease?: string
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updatePayload: any = {
      verificationStatus: status,
      updatedAt: new Date().toISOString(),
    };
    if (expertNotes !== undefined) updatePayload.expertNotes = expertNotes;
    if (correctedDisease !== undefined) updatePayload.correctedDisease = correctedDisease;

    await setDoc(docRef, updatePayload, { merge: true });

    // Update local storage copy as well
    const local = getLocalDiagnoses().map((item) => {
      if (item.id === id) {
        return {
          ...item,
          verificationStatus: status,
          expertNotes: expertNotes ?? item.expertNotes,
          correctedDisease: correctedDisease ?? item.correctedDisease,
        };
      }
      return item;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    throw error;
  }
}

export async function deleteDiagnosisRecord(id: string): Promise<void> {
  const local = getLocalDiagnoses().filter((item) => item.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));

  if (!auth.currentUser) return;

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
  }
}

function getLocalDiagnoses(): DiagnosisHistoryItem[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
