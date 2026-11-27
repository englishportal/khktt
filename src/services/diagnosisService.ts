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

const COLLECTION_NAME = 'diagnoses';
const LOCAL_STORAGE_KEY = 'agrivision_local_diagnoses';

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
      return parsedErr as DiagnosisResult;
    }
    if (parsedErr && !response.ok) {
      throw new Error(parsedErr.error || parsedErr.details || 'Lỗi khi gửi ảnh phân tích đến máy chủ.');
    }
    if (response.status === 413) {
      throw new Error('Ảnh có dung lượng quá lớn. Bác vui lòng chọn ảnh nhẹ hơn hoặc chụp lại nhé.');
    }
    if (response.status === 404) {
      throw new Error(
        'Không tìm thấy cổng API phân tích (/api/diagnose - 404). Nếu đang chạy trên Vercel, vui lòng đẩy code mới nhất (kèm thư mục api/ và vercel.json) lên GitHub và Redeploy.'
      );
    }
    if (response.status === 504) {
      throw new Error(
        'Máy chủ phân tích phản hồi quá thời gian chờ (504). Bác vui lòng thử lại với 1 ảnh rõ nét nhé.'
      );
    }
    throw new Error(
      `Máy chủ phân tích đang bận hoặc kết nối tạm gián đoạn (Mã ${response.status}). Bác vui lòng bấm thử lại sau vài giây nhé.`
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

  return parsed as DiagnosisResult;
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
  const fullItem: DiagnosisHistoryItem = {
    ...item,
    id,
    createdAt: new Date().toISOString(),
  };

  // Always cache in localStorage for immediate offline access
  try {
    const local = getLocalDiagnoses();
    local.unshift(fullItem);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local.slice(0, 50)));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  // Save to Firestore only if signed into Firebase Auth
  if (item.userId && auth.currentUser && auth.currentUser.uid === item.userId) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, fullItem);
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
