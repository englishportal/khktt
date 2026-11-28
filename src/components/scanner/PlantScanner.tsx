import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  HelpCircle,
  Plus,
  X,
} from 'lucide-react';
import { CropType, PlantPart, DiagnosisResult, FieldQuizAnswers } from '../../types';
import { runServerDiagnosis, saveDiagnosisRecord, fetchDiagnosisAudio } from '../../services/diagnosisService';
import { useAuth } from '../../context/AuthContext';
import { resolveSupportedCropType } from '../../utils/vietnameseText';
import { DiagnosisReportView } from './DiagnosisReportView';

interface PlantScannerProps {
  initialCrop?: CropType;
  onNavigateToAssistant: (context: any) => void;
  onNavigateToLibrary: (crop?: CropType) => void;
}

export const PlantScanner: React.FC<PlantScannerProps> = ({
  initialCrop = 'citrus',
  onNavigateToAssistant,
  onNavigateToLibrary,
}) => {
  const { user } = useAuth();

  const [selectedCrop, setSelectedCrop] = useState<CropType>(initialCrop);
  const [selectedPart, setSelectedPart] = useState<PlantPart>('leaf');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');

  // Camera capture modal state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Analysis states
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanStepMessage, setScanStepMessage] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [sourceSampleCrop, setSourceSampleCrop] = useState<CropType | null>(null);
  const [refImgError, setRefImgError] = useState<boolean>(false);

  // Real-time blur and lighting pre-check
  const [previewQuality, setPreviewQuality] = useState<{
    imageQuality: 'good' | 'fair' | 'poor';
    qualityIssues: string[];
    isBlurry: boolean;
    isTooDark: boolean;
    isOverexposed: boolean;
    sharpnessScore: number;
  } | null>(null);

  const [showTips, setShowTips] = useState<boolean>(false);

  // Additional angle images (up to 2 extra angles)
  const [extraImages, setExtraImages] = useState<({ imageBase64: string; angleLabel: string } | null)[]>([
    null,
    null,
  ]);
  const extraInputRef0 = useRef<HTMLInputElement | null>(null);
  const extraInputRef1 = useRef<HTMLInputElement | null>(null);

  // Multiple-choice field quiz for farmers
  const [quizAnswers, setQuizAnswers] = useState<FieldQuizAnswers>({});

  // Vietnamese Voice Read-Aloud (TTS)
  const [isTtsLoading, setIsTtsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [ttsError, setTtsError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraCaptureInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelectedCrop(initialCrop);
  }, [initialCrop]);

  const cropOptions: { id: CropType; label: string; icon: string }[] = [
    { id: 'citrus', label: 'Cây Cam, Bưởi', icon: '🍊' },
    { id: 'rice', label: 'Cây Lúa', icon: '🌾' },
    { id: 'peanut', label: 'Cây Lạc (Đậu)', icon: '🥜' },
  ];

  const partOptions: { id: PlantPart; label: string }[] = [
    { id: 'leaf', label: 'Lá cây' },
    { id: 'stem', label: 'Thân / Cành' },
    { id: 'fruit', label: 'Quả / Củ' },
    { id: 'other', label: 'Toàn cây' },
  ];

  const getCropLabel = (crop: CropType) =>
    crop === 'citrus' ? 'Cây Cam, Bưởi' : crop === 'rice' ? 'Cây Lúa' : 'Cây Lạc';

  const getPartLabel = (part: PlantPart) =>
    partOptions.find((p) => p.id === part)?.label || 'Lá cây';

  const compressImageDataUrl = (dataUrl: string, maxDim = 1280, quality = 0.86): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width || 1, img.height || 1));
          const targetW = Math.max(1, Math.round(img.width * scale));
          const targetH = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(dataUrl);
          ctx.drawImage(img, 0, 0, targetW, targetH);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setAnalysisError('Bác vui lòng chọn ảnh chụp thông thường (JPG hoặc PNG).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setAnalysisError('Ảnh này hơi lớn quá (trên 15MB). Bác vui lòng chọn ảnh nhẹ hơn.');
      return;
    }

    setAnalysisError(null);
    setImageFileName(file.name);
    setSourceSampleCrop(null);
    setMimeType('image/jpeg');
    setResult(null);
    setIsSaved(false);
    setRefImgError(false);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const rawUrl = reader.result as string;
      const compressed = await compressImageDataUrl(rawUrl);
      setImagePreview(compressed);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    setAnalysisError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cameraCaptureInputRef.current?.click();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.warn('Camera fallback to native input:', err);
      cameraCaptureInputRef.current?.click();
    }
  };

  const captureCameraSnapshot = () => {
    if (!videoRef.current) return;
    const rawW = videoRef.current.videoWidth || 640;
    const rawH = videoRef.current.videoHeight || 480;
    const scale = Math.min(1, 1280 / Math.max(rawW, rawH));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(rawW * scale));
    canvas.height = Math.max(1, Math.round(rawH * scale));
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.86);
      setImagePreview(dataUrl);
      setImageFileName('camera_snapshot.jpg');
      setSourceSampleCrop(null);
      setMimeType('image/jpeg');
      setResult(null);
      setIsSaved(false);
      setRefImgError(false);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (isCameraActive && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraActive, cameraStream]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsTtsLoading(false);
  };

  const handleExtraAngleFileChange = (slotIndex: 0 | 1, angleLabel: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type.toLowerCase())) {
      setAnalysisError('Bác vui lòng chọn ảnh chụp thông thường (JPG hoặc PNG).');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const compressed = await compressImageDataUrl(reader.result as string, 1024, 0.82);
      setExtraImages((prev) => {
        const next = [...prev];
        next[slotIndex] = { imageBase64: compressed, angleLabel };
        return next;
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const buildDiagnosisSpeechText = (res: DiagnosisResult): string => {
    const primaryDiag = res.possibleDiagnoses[0];
    if (!res.isPlantImage) {
      return 'Ảnh này chưa thấy rõ lá hoặc thân cây trồng. Bác vui lòng chụp lại cận cảnh phần lá hoặc thân cây bị bệnh nhé.';
    }
    if (!res.selectedCropMatches) {
      const supportedTarget = resolveSupportedCropType(res.cropDetected);
      if (supportedTarget && supportedTarget !== selectedCrop) {
        return `Nhầm loại cây rồi bác ơi. Bác đang chọn ${getCropLabel(selectedCrop)}, nhưng ảnh này giống ${getCropLabel(supportedTarget)}. Bác bấm nút chuyển sang đúng loại cây để xem kết quả nhé.`;
      }
      return `Loại cây này chưa được hỗ trợ khám bác ơi. Bác đang chọn ${getCropLabel(selectedCrop)}, nhưng ảnh này trông giống ${res.cropDetected}. Hiện hệ thống chỉ hỗ trợ khám Cây Cam Bưởi, Cây Lúa và Cây Lạc thôi ạ.`;
    }
    if (primaryDiag?.diseaseId === 'unclear_due_to_blur' || (res.imageQuality === 'poor' && primaryDiag?.confidenceLevel === 'insufficient_evidence')) {
      return 'Ảnh bị mờ nên máy chưa nhìn rõ bệnh. Bác đưa điện thoại cách lá khoảng 20 xăng ti mét, chạm tay lấy nét vào vết bệnh rồi chụp lại nơi đủ sáng nhé.';
    }
    if (primaryDiag?.diseaseId === 'healthy') {
      const care = res.recommendations.slice(0, 2).join('. ');
      return `Tin vui cho bác, mẫu ${getCropLabel(selectedCrop)} này khỏe mạnh, không thấy dấu hiệu bệnh hại. ${care}`;
    }

    const diseaseName = primaryDiag?.diseaseName || 'Chưa xác định rõ bệnh';
    const symptomsText = (primaryDiag?.evidence?.length ? primaryDiag.evidence : res.symptoms).slice(0, 2).join('. ');
    const immediateSteps =
      res.treatmentGuide?.immediate24hSteps?.length
        ? res.treatmentGuide.immediate24hSteps
        : res.actionPlan?.immediateSteps || [];
    const careSteps =
      res.treatmentGuide?.careNext3To7Days?.length
        ? res.treatmentGuide.careNext3To7Days
        : res.actionPlan?.safeCareAndPrevention || [];
    const warnings =
      res.treatmentGuide?.dontList?.length
        ? res.treatmentGuide.dontList
        : res.actionPlan?.importantWarnings || [];

    const immediate = immediateSteps.length
      ? `Việc cần làm ngay trong 24 giờ đầu: ${immediateSteps.slice(0, 3).join('. ')}.`
      : '';
    const care = careSteps.length
      ? `Chăm sóc trong 3 đến 7 ngày tới: ${careSteps.slice(0, 2).join('. ')}.`
      : res.recommendations.length
      ? `Cách xử lý bác nên làm: ${res.recommendations.slice(0, 3).join('. ')}.`
      : '';
    const warn = warnings.length
      ? `Lưu ý cần tránh: ${warnings.slice(0, 2).join('. ')}.`
      : '';

    return `Kết quả kiểm tra ${getCropLabel(selectedCrop)}: Nghi ngờ ${diseaseName}. Dấu hiệu trên ảnh: ${symptomsText}. ${immediate} ${care} ${warn}`.trim();
  };

  const handleToggleSpeak = async (res: DiagnosisResult) => {
    if (isSpeaking || isTtsLoading) {
      stopSpeaking();
      return;
    }
    setTtsError(null);
    const speechText = buildDiagnosisSpeechText(res);
    if (!speechText) return;

    setIsTtsLoading(true);
    try {
      const { audioBase64, mimeType: audioMime } = await fetchDiagnosisAudio(speechText);
      const audio = new Audio(`data:${audioMime};base64,${audioBase64}`);
      audioRef.current = audio;
      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        audioRef.current = null;
        setTtsError('Không phát được âm thanh trên thiết bị này.');
      };
      setIsTtsLoading(false);
      setIsSpeaking(true);
      await audio.play();
    } catch {
      setIsTtsLoading(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(speechText);
          utterance.lang = 'vi-VN';
          utterance.rate = 0.95;
          const voices = window.speechSynthesis.getVoices();
          const viVoice = voices.find((v) => v.lang.toLowerCase().startsWith('vi'));
          if (viVoice) utterance.voice = viVoice;
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => {
            setIsSpeaking(false);
            setTtsError('Thiết bị chưa hỗ trợ đọc giọng tiếng Việt lúc này.');
          };
          setIsSpeaking(true);
          window.speechSynthesis.speak(utterance);
          return;
        } catch {
          // ignore fallback error
        }
      }
      setTtsError('Không tạo được giọng đọc lúc này. Bác thử lại sau nhé.');
    }
  };

  useEffect(() => {
    if (imagePreview) {
      extractVisualMetrics(imagePreview, imageFileName, sourceSampleCrop).then((metrics) => {
        setPreviewQuality({
          imageQuality: metrics.imageQuality,
          qualityIssues: metrics.qualityIssues,
          isBlurry: metrics.isBlurry,
          isTooDark: metrics.isTooDark,
          isOverexposed: metrics.isOverexposed,
          sharpnessScore: metrics.sharpnessScore,
        });
      });
    } else {
      setPreviewQuality(null);
    }
  }, [imagePreview, imageFileName, sourceSampleCrop]);

  const extractVisualMetrics = async (
    dataUrl: string,
    fileNameHint?: string,
    sampleCropHint?: CropType | null
  ): Promise<{
    healthyGreenRatio: number;
    yellowRatio: number;
    lesionRatio: number;
    leafShape: 'broadleaf_oval' | 'slender_blade' | 'compound_rounded_leaflets';
    detectedCropHint: 'citrus' | 'rice' | 'peanut' | 'unknown';
    sharpnessScore: number;
    imageQuality: 'good' | 'fair' | 'poor';
    qualityIssues: string[];
    isBlurry: boolean;
    isTooDark: boolean;
    isOverexposed: boolean;
    sourceSampleId?: string;
    filenameHint?: string;
  }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 128;
          canvas.height = 128;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve({
              healthyGreenRatio: 0.5,
              yellowRatio: 0,
              lesionRatio: 0,
              leafShape: 'broadleaf_oval',
              detectedCropHint: 'unknown',
              sharpnessScore: 80,
              imageQuality: 'good',
              qualityIssues: [],
              isBlurry: false,
              isTooDark: false,
              isOverexposed: false,
            });
          }
          ctx.drawImage(img, 0, 0, 128, 128);
          const imgData = ctx.getImageData(0, 0, 128, 128).data;
          let plantPixels = 0;
          let greenPixels = 0;
          let yellowPixels = 0;
          let lesionPixels = 0;
          let soilPixels = 0;
          let minX = 128, maxX = 0, minY = 128, maxY = 0;
          const gray = new Float32Array(128 * 128);
          let sumBrightness = 0;

          for (let i = 0; i < imgData.length; i += 4) {
            const pixelIndex = Math.floor(i / 4);
            const px = pixelIndex % 128;
            const py = Math.floor(pixelIndex / 128);
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            const a = imgData[i + 3];
            const gVal = 0.299 * r + 0.587 * g + 0.114 * b;
            gray[pixelIndex] = gVal;

            if (a < 50) continue;

            const isWhiteBg = r > 240 && g > 240 && b > 240;
            const isPitchBlack = r < 20 && g < 20 && b < 20;
            if (isWhiteBg || isPitchBlack) continue;

            if (r > 75 && r > g * 1.05 && r > b * 1.25 && b < 125) {
              soilPixels++;
            }

            plantPixels++;
            sumBrightness += gVal;

            if (g > r * 1.15 && g > b * 1.15 && g > 45) {
              greenPixels++;
              minX = Math.min(minX, px);
              maxX = Math.max(maxX, px);
              minY = Math.min(minY, py);
              maxY = Math.max(maxY, py);
            } else if (r > 130 && g > 120 && b < 100 && Math.abs(r - g) < 55) {
              yellowPixels++;
              minX = Math.min(minX, px);
              maxX = Math.max(maxX, px);
              minY = Math.min(minY, py);
              maxY = Math.max(maxY, py);
            } else if ((r > 60 && g < r * 0.9 && b < g) || (r < 65 && g < 65 && b < 65)) {
              lesionPixels++;
            }
          }

          let lapSum = 0;
          let lapCount = 0;
          const lapList: number[] = [];
          for (let y = 1; y < 127; y++) {
            for (let x = 1; x < 127; x++) {
              const idx = y * 128 + x;
              const lap = 4 * gray[idx] - gray[idx + 1] - gray[idx - 1] - gray[idx + 128] - gray[idx - 128];
              lapList.push(lap);
              lapSum += lap;
              lapCount++;
            }
          }
          const lapMean = lapSum / Math.max(lapCount, 1);
          let varSum = 0;
          for (let i = 0; i < lapCount; i++) {
            const diff = lapList[i] - lapMean;
            varSum += diff * diff;
          }
          const rawVariance = Math.round(varSum / Math.max(lapCount, 1));
          const sharpnessScore = Math.min(100, Math.max(5, Math.round((rawVariance / 160) * 100)));

          const total = Math.max(plantPixels, 1);
          const avgBrightness = sumBrightness / total;
          const isTooDark = avgBrightness < 40 && plantPixels > 100;
          const isOverexposed = avgBrightness > 220 && plantPixels > 100;
          const isBlurry = rawVariance < 35;

          const qualityIssues: string[] = [];
          if (isBlurry) {
            qualityIssues.push('Ảnh hơi bị mờ nét hoặc rung tay khi chụp.');
          }
          if (isTooDark) {
            qualityIssues.push('Ảnh chụp bị tối, thiếu ánh sáng.');
          }
          if (isOverexposed) {
            qualityIssues.push('Ảnh bị lóa nắng quá sáng.');
          }

          const imageQuality: 'good' | 'fair' | 'poor' =
            isBlurry || isTooDark || isOverexposed ? 'poor' : sharpnessScore < 60 ? 'fair' : 'good';

          const fn = (fileNameHint || imageFileName || '').toLowerCase();
          const isSamplePeanut = sampleCropHint === 'peanut' || sourceSampleCrop === 'peanut';
          const isSampleRice = sampleCropHint === 'rice' || sourceSampleCrop === 'rice';
          const isSampleCitrus = sampleCropHint === 'citrus' || sourceSampleCrop === 'citrus';

          const detectedCropHint: 'citrus' | 'rice' | 'peanut' | 'unknown' = isSamplePeanut
            ? 'peanut'
            : isSampleRice
            ? 'rice'
            : isSampleCitrus
            ? 'citrus'
            : 'unknown';

          const leafShape: 'broadleaf_oval' | 'slender_blade' | 'compound_rounded_leaflets' =
            detectedCropHint === 'rice'
              ? 'slender_blade'
              : detectedCropHint === 'peanut'
              ? 'compound_rounded_leaflets'
              : 'broadleaf_oval';

          resolve({
            healthyGreenRatio: greenPixels / total,
            yellowRatio: yellowPixels / total,
            lesionRatio: lesionPixels / total,
            leafShape,
            detectedCropHint,
            sharpnessScore,
            imageQuality,
            qualityIssues,
            isBlurry,
            isTooDark,
            isOverexposed,
            sourceSampleId: sourceSampleCrop || undefined,
            filenameHint: fn || undefined,
          });
        } catch {
          resolve({
            healthyGreenRatio: 0.5,
            yellowRatio: 0,
            lesionRatio: 0,
            leafShape: 'broadleaf_oval',
            detectedCropHint: 'unknown',
            sharpnessScore: 80,
            imageQuality: 'good',
            qualityIssues: [],
            isBlurry: false,
            isTooDark: false,
            isOverexposed: false,
          });
        }
      };
      img.onerror = () => {
        resolve({
          healthyGreenRatio: 0.5,
          yellowRatio: 0,
          lesionRatio: 0,
          leafShape: 'broadleaf_oval',
          detectedCropHint: 'unknown',
          sharpnessScore: 80,
          imageQuality: 'good',
          qualityIssues: [],
          isBlurry: false,
          isTooDark: false,
          isOverexposed: false,
        });
      };
      img.src = dataUrl;
    });
  };

  const handleRunDiagnosis = async () => {
    if (!imagePreview) {
      setAnalysisError('Bác vui lòng chụp ảnh hoặc chọn ảnh lá cây trước nhé.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setResult(null);
    setRefImgError(false);
    stopSpeaking();

    setScanStepMessage('Bước 1/3: Đang phân tích dấu hiệu trên ảnh và lập giả thuyết ban đầu...');
    const step1 = setTimeout(
      () => setScanStepMessage('Bước 2/3: Đang truy xuất tài liệu nông nghiệp từ nhiều nguồn trực tuyến...'),
      2000
    );
    const step2 = setTimeout(
      () => setScanStepMessage('Bước 3/3: Đang kiểm chứng độc lập kết quả và đánh giá độ tin cậy...'),
      7500
    );

    try {
      const visualMetrics = await extractVisualMetrics(imagePreview, imageFileName, sourceSampleCrop);
      const validExtras = extraImages
        .filter((x): x is { imageBase64: string; angleLabel: string } => Boolean(x && x.imageBase64))
        .map((x) => ({
          imageBase64: x.imageBase64,
          mimeType: 'image/jpeg',
          angleLabel: x.angleLabel,
        }));

      const diagnosisResult = await runServerDiagnosis(
        imagePreview,
        selectedCrop,
        selectedPart,
        mimeType,
        visualMetrics,
        validExtras,
        quizAnswers
      );

      clearTimeout(step1);
      clearTimeout(step2);

      setResult(diagnosisResult);

      await saveDiagnosisRecord({
        userId: user?.uid || 'guest_user',
        userEmail: user?.email || '',
        cropType: selectedCrop,
        plantPart: selectedPart,
        imageUrl: imagePreview,
        assessment: diagnosisResult,
        suspectedDiseases: diagnosisResult.possibleDiagnoses.map((d) => d.diseaseName),
        differentialDiseases: diagnosisResult.differentialDiseases
          ? diagnosisResult.differentialDiseases.map((d) => d.diseaseName)
          : diagnosisResult.alternativeCauses,
        referenceSources: diagnosisResult.groundingSources || [],
        imageQuality: diagnosisResult.imageQuality,
        verificationStatus: 'unverified',
      });
      setIsSaved(true);
    } catch (err: any) {
      clearTimeout(step1);
      clearTimeout(step2);
      console.error('Diagnosis failed:', err);
      setAnalysisError(err.message || 'Chưa kiểm tra được ảnh này. Bác vui lòng chụp lại ảnh rõ hơn nhé.');
    } finally {
      setIsAnalyzing(false);
      setScanStepMessage('');
    }
  };

  const handleSwitchCropAndDiagnose = async (newCrop: CropType) => {
    setSelectedCrop(newCrop);
    setQuizAnswers({});
    stopSpeaking();
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    setResult(null);
    setRefImgError(false);
    setScanStepMessage(`Đang chuyển sang khám ${getCropLabel(newCrop)}...`);

    try {
      const visualMetrics = await extractVisualMetrics(imagePreview, imageFileName, sourceSampleCrop);
      const validExtras = extraImages
        .filter((x): x is { imageBase64: string; angleLabel: string } => Boolean(x && x.imageBase64))
        .map((x) => ({
          imageBase64: x.imageBase64,
          mimeType: 'image/jpeg',
          angleLabel: x.angleLabel,
        }));
      const diagnosisResult = await runServerDiagnosis(
        imagePreview,
        newCrop,
        selectedPart,
        mimeType,
        visualMetrics,
        validExtras,
        {}
      );
      setResult(diagnosisResult);

      await saveDiagnosisRecord({
        userId: user?.uid || 'guest_user',
        userEmail: user?.email || '',
        cropType: newCrop,
        plantPart: selectedPart,
        imageUrl: imagePreview,
        assessment: diagnosisResult,
        suspectedDiseases: diagnosisResult.possibleDiagnoses.map((d) => d.diseaseName),
        differentialDiseases: diagnosisResult.differentialDiseases
          ? diagnosisResult.differentialDiseases.map((d) => d.diseaseName)
          : diagnosisResult.alternativeCauses,
        referenceSources: diagnosisResult.groundingSources || [],
        imageQuality: diagnosisResult.imageQuality,
        verificationStatus: 'unverified',
      });
      setIsSaved(true);
    } catch (err: any) {
      setAnalysisError(err.message || 'Có lỗi khi chuyển sang loại cây khác.');
    } finally {
      setIsAnalyzing(false);
      setScanStepMessage('');
    }
  };

  const resetScanner = () => {
    stopSpeaking();
    setImagePreview(null);
    setExtraImages([null, null]);
    setQuizAnswers({});
    setImageFileName('');
    setSourceSampleCrop(null);
    setResult(null);
    setPreviewQuality(null);
    setAnalysisError(null);
    setTtsError(null);
    setIsSaved(false);
    setRefImgError(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickSamples = [
    {
      crop: 'citrus' as CropType,
      part: 'leaf' as PlantPart,
      label: 'Mẫu lá Cam',
      url: '/images/citrus_leaf_hlb.jpg',
      icon: '🍊',
    },
    {
      crop: 'rice' as CropType,
      part: 'leaf' as PlantPart,
      label: 'Mẫu lá Lúa',
      url: '/images/rice_leaf_blast.jpg',
      icon: '🌾',
    },
    {
      crop: 'peanut' as CropType,
      part: 'leaf' as PlantPart,
      label: 'Mẫu lá Lạc',
      url: '/images/peanut_leaf_spot.jpg',
      icon: '🥜',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      {/* Simple Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Chụp ảnh khám bệnh cây
          </h1>
          <p className="text-base text-stone-600 mt-1">
            Chỉ cần 2 bước đơn giản: chọn cây và chụp ảnh chỗ bị bệnh.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowTips(!showTips)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors w-fit min-h-[44px] cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>{showTips ? 'Ẩn mẹo chụp rõ' : 'Cách chụp ảnh cho rõ'}</span>
        </button>
      </div>

      {showTips && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2 text-base text-stone-800">
          <p className="font-bold text-emerald-950">3 mẹo nhỏ giúp máy nhìn rõ bệnh nhất:</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Đưa điện thoại cách lá hoặc quả khoảng <strong>1 gang tay (20 cm)</strong>.</li>
            <li>Giữ chắc tay khoảng 1 giây rồi mới bấm chụp để ảnh không bị rung mờ.</li>
            <li>Chụp nơi đủ sáng ngoài trời, tránh để bóng tay che lên vết bệnh.</li>
          </ul>
        </div>
      )}

      {/* Step 1: Choose Crop */}
      <section className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">
          Bước 1: Bác đang khám cây gì?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {cropOptions.map((crop) => {
            const isSelected = selectedCrop === crop.id;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => {
                  setSelectedCrop(crop.id);
                  setResult(null);
                }}
                className={`min-h-[68px] p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950'
                    : 'border-stone-200 hover:border-emerald-300 bg-white text-stone-800'
                }`}
              >
                <span className="text-3xl shrink-0" aria-hidden="true">
                  {crop.icon}
                </span>
                <span className="text-base sm:text-lg font-bold leading-tight">
                  {crop.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Unobtrusive 1-row part selector */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-stone-600 mr-1">Chụp bộ phận:</span>
          {partOptions.map((part) => (
            <button
              key={part.id}
              type="button"
              onClick={() => setSelectedPart(part.id)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold min-h-[40px] transition-colors cursor-pointer ${
                selectedPart === part.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {part.label}
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Capture or Upload Photo */}
      <section className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-5">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">
          Bước 2: Chụp ảnh hoặc chọn ảnh
        </h2>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />

        <input
          type="file"
          ref={cameraCaptureInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        {isCameraActive ? (
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 flex flex-col items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-8 border-2 border-dashed border-white/70 rounded-xl pointer-events-none flex items-center justify-center">
              <span className="text-sm font-semibold text-white bg-black/60 px-3 py-1.5 rounded-lg">
                Đưa lá bệnh vào giữa khung hình
              </span>
            </div>

            <div className="absolute bottom-4 flex items-center gap-4">
              <button
                type="button"
                onClick={stopCamera}
                className="px-5 py-3 rounded-xl bg-stone-900/90 text-white text-base font-bold min-h-[48px] cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={captureCameraSnapshot}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold flex items-center gap-2 min-h-[52px] shadow-lg cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>Chụp ảnh này</span>
              </button>
            </div>
          </div>
        ) : imagePreview ? (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-16/10 sm:aspect-2/1 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Ảnh bác vừa chọn"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Easy Retake / Replace Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={startCamera}
                className="min-h-[48px] px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-5 h-5 text-emerald-700" />
                <span>Chụp lại ảnh khác</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[48px] px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-5 h-5 text-emerald-700" />
                <span>Chọn ảnh khác trong máy</span>
              </button>
            </div>

            {/* Friendly Blur / Light Check */}
            {previewQuality && (
              <div>
                {previewQuality.isBlurry ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-lg font-bold">
                          Ảnh bị mờ rồi!
                        </p>
                        <p className="text-base text-stone-800">
                          Bác giữ chắc tay, để máy cách lá khoảng 1 gang tay (20cm) rồi chụp lại cho rõ nhé.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-base font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Chụp lại ảnh rõ hơn</span>
                    </button>
                  </div>
                ) : previewQuality.isTooDark ? (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-stone-800 text-base flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>Ảnh hơi tối. Bác đưa cây ra chỗ sáng hơn một chút sẽ dễ xem bệnh hơn.</span>
                  </div>
                ) : previewQuality.isOverexposed ? (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-stone-800 text-base flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>Ảnh hơi bị chói nắng. Bác nghiêng máy tránh ánh nắng rọi thẳng nhé.</span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-base font-semibold flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>Ảnh đã rõ nét, sẵn sàng kiểm tra.</span>
                  </div>
                )}
              </div>
            )}

            {/* Optional 1-2 Extra Angles for Higher Accuracy */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 space-y-3">
              <div>
                <p className="text-base font-bold text-stone-900">
                  Thêm 1–2 ảnh góc khác để máy đoán chính xác hơn (không bắt buộc)
                </p>
                <p className="text-sm text-stone-600">
                  Chụp thêm mặt dưới lá hoặc cả thân/tán cây giúp phân biệt bệnh rất chuẩn.
                </p>
              </div>

              <input
                type="file"
                ref={extraInputRef0}
                onChange={(e) => handleExtraAngleFileChange(0, 'Mặt dưới lá / Cận vết bệnh', e)}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
              <input
                type="file"
                ref={extraInputRef1}
                onChange={(e) => handleExtraAngleFileChange(1, 'Thân, gốc hoặc cả tán cây', e)}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { idx: 0 as const, label: 'Ảnh góc 2: Mặt dưới lá / Cận cảnh', ref: extraInputRef0 },
                  { idx: 1 as const, label: 'Ảnh góc 3: Thân, gốc / Cả cây', ref: extraInputRef1 },
                ].map((slot) => {
                  const current = extraImages[slot.idx];
                  return (
                    <div
                      key={slot.idx}
                      className="rounded-xl border border-dashed border-stone-300 bg-white p-3 flex items-center justify-between gap-3"
                    >
                      {current ? (
                        <>
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={current.imageBase64}
                              alt={slot.label}
                              className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-emerald-900 truncate">{slot.label}</p>
                              <p className="text-xs text-stone-500">Đã thêm ảnh</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setExtraImages((prev) => {
                                const next = [...prev];
                                next[slot.idx] = null;
                                return next;
                              })
                            }
                            className="p-2 rounded-lg text-stone-500 hover:text-red-700 hover:bg-red-50 cursor-pointer shrink-0"
                            aria-label="Xóa ảnh góc này"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => slot.ref.current?.click()}
                          className="w-full min-h-[48px] flex items-center justify-center gap-2 text-sm font-semibold text-stone-700 hover:text-emerald-800 cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>{slot.label}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Short Multiple-Choice Field Quiz */}
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Bước 3 (Không bắt buộc): Trả lời nhanh để tăng độ chính xác
                </h3>
                <p className="text-sm text-stone-600">
                  Bác bấm chọn nhanh những gì mình quan sát thấy ngoài vườn/ruộng:
                </p>
              </div>

              {[
                {
                  key: 'spreadLevel' as const,
                  question: '1. Bệnh đang xuất hiện nhiều chưa?',
                  options: ['Mới lác đác vài lá/cây', 'Đang lan sang nhiều cây bên cạnh', 'Bị rộng gần hết vườn/ruộng'],
                },
                {
                  key: 'recentWeather' as const,
                  question: '2. Thời tiết mấy hôm nay thế nào?',
                  options: ['Mưa ẩm, sương mù nhiều', 'Nắng nóng, khô hạn', 'Mới có gió mạnh / mưa bão'],
                },
                {
                  key: 'extraSymptom' as const,
                  question: '3. Nhìn tận mắt bác thấy thêm dấu hiệu nào?',
                  options:
                    selectedCrop === 'citrus'
                      ? ['Có rầy nhảy ở đọt non', 'Vết sần sùi có quầng vàng', 'Lá vàng loang lổ không đều', 'Không thấy rõ']
                      : selectedCrop === 'rice'
                      ? ['Vết hình thoi (mắt én)', 'Khô trắng từ chóp/mép lá', 'Đốm nâu nhỏ rải rác', 'Thối vằn ở bẹ sát nước']
                      : ['Dưới lá có bột màu gỉ sắt', 'Gốc thân có mốc trắng như bông', 'Đốm tròn nâu/đen làm rụng lá', 'Không thấy rõ'],
                },
                {
                  key: 'fertilizerOrWater' as const,
                  question: '4. Nước tưới và phân bón gần đây?',
                  options: ['Mới bón nhiều phân đạm (Urê)', 'Đất bị đọng nước / ngập úng', 'Chăm sóc bình thường'],
                },
              ].map((q) => (
                <div key={q.key} className="space-y-2">
                  <p className="text-sm font-bold text-stone-800">{q.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => {
                      const active = quizAnswers[q.key] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [q.key]: prev[q.key] === opt ? undefined : opt,
                            }))
                          }
                          className={`px-3.5 py-2 rounded-xl text-sm font-semibold min-h-[40px] border transition-colors cursor-pointer ${
                            active
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-emerald-400'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Giant Primary Diagnose CTA */}
            <button
              type="button"
              onClick={handleRunDiagnosis}
              disabled={isAnalyzing}
              className={`w-full min-h-[58px] py-4 px-6 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 transition-all cursor-pointer ${
                isAnalyzing
                  ? 'bg-stone-400 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin shrink-0" />
                  <span>{scanStepMessage || 'Đang kiểm tra ảnh...'}</span>
                </>
              ) : (
                <span>XEM BỆNH CỦA CÂY NGAY</span>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Two Huge Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={startCamera}
                className="min-h-[88px] p-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-lg flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <Camera className="w-7 h-7 shrink-0" />
                <span>Mở máy ảnh chụp ngay</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[88px] p-5 rounded-2xl bg-white hover:bg-stone-50 active:scale-[0.99] text-stone-900 border-2 border-stone-300 font-bold text-lg flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <Upload className="w-7 h-7 text-emerald-700 shrink-0" />
                <span>Chọn ảnh trong máy</span>
              </button>
            </div>

            {/* 3 Quick Sample Photos */}
            <div className="pt-2 border-t border-stone-100 space-y-2.5">
              <p className="text-sm font-semibold text-stone-600">
                Hoặc bấm vào ảnh mẫu bên dưới để xem thử cách máy hoạt động:
              </p>
              <div className="grid grid-cols-3 gap-3">
                {quickSamples.map((sample) => (
                  <button
                    key={sample.crop}
                    type="button"
                    onClick={() => {
                      setSelectedCrop(sample.crop);
                      setSelectedPart(sample.part);
                      setImagePreview(sample.url);
                      setSourceSampleCrop(sample.crop);
                      setImageFileName(`${sample.crop}_sample.jpg`);
                      setMimeType('image/jpeg');
                      setResult(null);
                      setIsSaved(false);
                      setAnalysisError(null);
                      setRefImgError(false);
                    }}
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-400 transition-colors text-center flex flex-col items-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    <img
                      src={sample.url}
                      alt={sample.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-16 sm:h-20 object-cover rounded-lg border border-stone-200"
                    />
                    <span className="text-sm font-bold text-stone-800 leading-tight">
                      {sample.icon} {sample.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {analysisError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-base flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-700" />
            <span>{analysisError}</span>
          </div>
        )}
      </section>

      {/* Result Area */}
      {result && (
        <section className="space-y-5">
          {/* Case 0: Not a plant image */}
          {!result.isPlantImage ? (
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-7 h-7 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
                    Ảnh này chưa rõ là cây trồng!
                  </h2>
                  <p className="text-base text-stone-800 leading-relaxed">
                    Máy chưa nhận thấy lá, thân hoặc quả cây trong ảnh này. Bác vui lòng chụp cận cảnh phần lá hoặc thân cây bị bệnh nhé.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={startCamera}
                className="min-h-[48px] px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-base font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>Chụp lại ảnh lá cây</span>
              </button>
            </div>
          ) : !result.selectedCropMatches ? (() => {
            const detectedSupportedCrop = resolveSupportedCropType(result.cropDetected);
            const canSwitchToSupportedCrop =
              detectedSupportedCrop !== null && detectedSupportedCrop !== selectedCrop;
            const detectedDisplayLabel = canSwitchToSupportedCrop
              ? getCropLabel(detectedSupportedCrop)
              : result.cropDetected &&
                result.cropDetected.trim().toLowerCase() !== getCropLabel(selectedCrop).toLowerCase()
              ? result.cropDetected
              : 'một loại cây trồng khác';

            return (
              <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-7 h-7 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
                      {canSwitchToSupportedCrop
                        ? 'Nhầm loại cây rồi bác ơi!'
                        : 'Loại cây này chưa được hỗ trợ khám!'}
                    </h2>
                    {canSwitchToSupportedCrop ? (
                      <p className="text-base text-stone-800 leading-relaxed">
                        Bác đang chọn khám <strong>{getCropLabel(selectedCrop)}</strong>, nhưng ảnh này trông giống{' '}
                        <strong>{detectedDisplayLabel}</strong>. Máy tạm dừng để tránh báo nhầm bệnh cho bác.
                      </p>
                    ) : (
                      <p className="text-base text-stone-800 leading-relaxed">
                        Bác đang chọn khám <strong>{getCropLabel(selectedCrop)}</strong>, nhưng ảnh này là{' '}
                        <strong>{detectedDisplayLabel}</strong>. Hiện tại hệ thống chỉ hỗ trợ khám chính xác 3 loại cây:{' '}
                        <strong>Cây Cam, Bưởi</strong>, <strong>Cây Lúa</strong> và <strong>Cây Lạc</strong>, nên máy tạm dừng để tránh chẩn đoán sai cho bác.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  {canSwitchToSupportedCrop ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSwitchCropAndDiagnose(detectedSupportedCrop)}
                        className="flex-1 min-h-[54px] px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-base font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RefreshCw className="w-5 h-5" />
                        <span>Chuyển sang khám đúng {detectedDisplayLabel} ngay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="min-h-[54px] px-5 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-base font-semibold cursor-pointer"
                      >
                        Chọn lại ảnh khác
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 min-h-[54px] px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-base font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Chọn lại ảnh Cam, Bưởi / Lúa / Lạc</span>
                      </button>

                      <button
                        type="button"
                        onClick={startCamera}
                        className="min-h-[54px] px-5 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Camera className="w-5 h-5 text-emerald-700" />
                        <span>Chụp ảnh khác</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })() : (() => {
            const primaryDiag = result.possibleDiagnoses[0];
            const isHealthy = primaryDiag?.diseaseId === 'healthy';
            const isBlurryResult =
              primaryDiag?.diseaseId === 'unclear_due_to_blur' ||
              (result.imageQuality === 'poor' && primaryDiag?.confidenceLevel === 'insufficient_evidence');

            /* Case 2: Blurry Photo Result */
            if (isBlurryResult) {
              return (
                <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-7 h-7 text-amber-700 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
                        Ảnh bị mờ, chưa nhìn rõ bệnh!
                      </h2>
                      <p className="text-base text-stone-800">
                        Bác làm theo 3 bước sau rồi chụp lại để máy xem chính xác nhé:
                      </p>
                    </div>
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-base text-stone-800 bg-white rounded-xl p-4 border border-amber-200">
                    <li>Đặt điện thoại cách lá khoảng 1 gang tay (20 cm).</li>
                    <li>Chạm tay vào màn hình chỗ có đốm bệnh cho rõ nét.</li>
                    <li>Giữ yên tay 1 giây rồi bấm chụp nơi đủ sáng.</li>
                  </ol>

                  <button
                    type="button"
                    onClick={startCamera}
                    className="w-full min-h-[54px] px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-lg font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Chụp lại ảnh rõ hơn</span>
                  </button>
                </div>
              );
            }

            /* Case 3: Healthy Plant */
            if (isHealthy) {
              return (
                <div className="bg-white rounded-2xl border-2 border-emerald-300 p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-8 h-8 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">
                        Cây khỏe mạnh, không có bệnh!
                      </h2>
                      <p className="text-base text-stone-600">
                        Cây đang kiểm tra: <strong>{getCropLabel(selectedCrop)}</strong> ({getPartLabel(selectedPart)})
                      </p>
                    </div>
                  </div>

                  {result.recommendations.length > 0 && (
                    <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-2">
                      <h3 className="text-lg font-bold text-emerald-950">Cách chăm sóc giữ cây khỏe:</h3>
                      <ul className="list-disc list-inside space-y-1.5 text-base text-stone-800">
                        {result.recommendations.slice(0, 3).map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={resetScanner}
                      className="flex-1 min-h-[52px] px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-base font-bold cursor-pointer"
                    >
                      Chụp khám cây khác
                    </button>
                  </div>
                </div>
              );
            }

            /* Case 4: Disease Found — Full Structured A-I Verification Report */
            const activeExtraPreviews = extraImages.filter(
              (x): x is { imageBase64: string; angleLabel: string } => Boolean(x && x.imageBase64)
            );

            return (
              <DiagnosisReportView
                result={result}
                selectedCrop={selectedCrop}
                selectedPart={selectedPart}
                imagePreview={imagePreview}
                extraImages={activeExtraPreviews}
                isSaved={isSaved}
                isTtsLoading={isTtsLoading}
                isSpeaking={isSpeaking}
                ttsError={ttsError}
                onToggleSpeak={handleToggleSpeak}
                onRetakePhoto={startCamera}
                onResetScanner={resetScanner}
                onNavigateToAssistant={onNavigateToAssistant}
                onNavigateToLibrary={onNavigateToLibrary}
              />
            );
          })()}
        </section>
      )}
    </div>
  );
};
