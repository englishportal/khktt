import React, { useState } from 'react';
import {
  AlertTriangle,
  Ban,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileSearch,
  Globe,
  HelpCircle,
  MessageCircle,
  RefreshCw,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sprout,
  Square,
  Volume2,
} from 'lucide-react';
import { CropType, DiagnosisResult, PlantPart } from '../../types';
import { DEFAULT_DISEASES } from '../../data/defaultDiseases';
import { cleanVietnameseText, stripEnglishParentheticals } from '../../utils/vietnameseText';

interface ExtraAnglePreview {
  imageBase64: string;
  angleLabel: string;
}

interface DiagnosisReportViewProps {
  result: DiagnosisResult;
  selectedCrop: CropType;
  selectedPart: PlantPart;
  imagePreview: string | null;
  extraImages?: ExtraAnglePreview[];
  isSaved?: boolean;
  isTtsLoading?: boolean;
  isSpeaking?: boolean;
  ttsError?: string | null;
  onToggleSpeak?: (res: DiagnosisResult) => void;
  onRetakePhoto?: () => void;
  onResetScanner?: () => void;
  onNavigateToAssistant?: (context: any) => void;
  onNavigateToLibrary?: (crop?: CropType) => void;
  compact?: boolean;
}

export const DiagnosisReportView: React.FC<DiagnosisReportViewProps> = ({
  result,
  selectedCrop,
  selectedPart,
  imagePreview,
  extraImages = [],
  isSaved = false,
  isTtsLoading = false,
  isSpeaking = false,
  ttsError = null,
  onToggleSpeak,
  onRetakePhoto,
  onResetScanner,
  onNavigateToAssistant,
  onNavigateToLibrary,
  compact = false,
}) => {
  const [failedRefIds, setFailedRefIds] = useState<Record<string, boolean>>({});

  const getCropLabel = (crop: CropType) =>
    crop === 'citrus' ? 'Cây Cam, Bưởi' : crop === 'rice' ? 'Cây Lúa' : 'Cây Lạc';

  const getPartLabel = (part: PlantPart) =>
    part === 'leaf'
      ? 'Lá cây'
      : part === 'stem'
      ? 'Thân / Cành'
      : part === 'fruit'
      ? 'Quả / Củ'
      : 'Toàn cây';

  const getImageQualityLabel = (q: DiagnosisResult['imageQuality']) =>
    q === 'good' ? 'Ảnh rõ nét' : q === 'fair' ? 'Ảnh rõ ở mức vừa' : 'Ảnh mờ hoặc thiếu sáng';

  const primaryDiag = result.possibleDiagnoses?.[0];
  const primaryDiseaseName =
    stripEnglishParentheticals(primaryDiag?.diseaseName || '') || 'Chưa xác định rõ bệnh';

  // Build up to 3 differential diseases cleanly (with backwards compatibility for older records)
  const differentialList =
    result.differentialDiseases && result.differentialDiseases.length > 0
      ? result.differentialDiseases.slice(0, 3)
      : (result.possibleDiagnoses || []).slice(0, 3).map((d, idx) => ({
          diseaseId: d.diseaseId,
          diseaseName: stripEnglishParentheticals(d.diseaseName),
          likelihood:
            idx === 0
              ? ('most_likely' as const)
              : idx === 1
              ? ('possible_differential' as const)
              : ('less_likely' as const),
          matchingSignsOnImage: d.evidence || [],
          distinguishingFeatures: [],
          referenceComparison: '',
          whyRankedHere:
            idx === 0 && result.differentialExplanation ? result.differentialExplanation : '',
        }));

  // Derive other diseases to distinguish (excluding primary if listed)
  const otherDifferentialNames = Array.from(
    new Set([
      ...differentialList
        .slice(1)
        .map((d) => d.diseaseName)
        .filter(Boolean),
      ...(result.alternativeCauses || []).filter(Boolean),
    ])
  ).slice(0, 3);

  // Match verified local botanical reference records for visual comparison (up to 2)
  const findLibraryRecord = (diseaseId?: string, diseaseName?: string) =>
    DEFAULT_DISEASES.find(
      (d) =>
        (diseaseId && d.id === diseaseId) ||
        (diseaseName &&
          (stripEnglishParentheticals(d.vietnameseName).toLowerCase().includes(diseaseName.toLowerCase()) ||
            diseaseName.toLowerCase().includes(stripEnglishParentheticals(d.vietnameseName).toLowerCase())))
    );

  const primaryRefRecord = findLibraryRecord(primaryDiag?.diseaseId, primaryDiseaseName);
  const visualReferenceRecords = differentialList
    .map((d) => findLibraryRecord(d.diseaseId, d.diseaseName))
    .filter((rec, idx, arr): rec is NonNullable<typeof rec> =>
      Boolean(rec && rec.sampleImageUrl && arr.findIndex((x) => x?.id === rec.id) === idx)
    )
    .slice(0, 2);

  // Real retrieved sources (strictly from server grounding metadata)
  const realSources = (result.groundingSources || []).filter(
    (src) => src.url && (src.url.startsWith('https://') || src.url.startsWith('http://'))
  );
  const evidenceItems =
    result.evidenceItems && result.evidenceItems.length > 0
      ? result.evidenceItems.filter(
          (ev) => ev.url && (ev.url.startsWith('https://') || ev.url.startsWith('http://'))
        )
      : realSources.map((s) => ({
          sourceTitle: s.title,
          domain: s.domain || s.title,
          sourceCategory: s.sourceCategory || 'Tài liệu trực tuyến',
          url: s.url,
          evidenceExcerpt:
            s.evidenceExcerpt || 'Nguồn tài liệu được đối chiếu trực tiếp từ kết quả tìm kiếm nông nghiệp.',
        }));

  // Reliability mapping (strict 3-state system: high / medium / low, NO fake %)
  const derivedReliabilityLevel: 'high' | 'medium' | 'low' =
    result.reliability?.overallLevel ||
    (primaryDiag?.confidenceLevel === 'high' && realSources.length >= 2
      ? 'high'
      : primaryDiag?.confidenceLevel === 'low' || primaryDiag?.confidenceLevel === 'insufficient_evidence'
      ? 'low'
      : 'medium');

  const reliabilityMeta =
    derivedReliabilityLevel === 'high'
      ? {
          label: 'Độ tin cậy cao',
          desc: 'Có nhiều bằng chứng hình ảnh và tài liệu phù hợp, thống nhất.',
          toneText: 'text-emerald-900',
          toneBg: 'bg-emerald-50 border-emerald-200',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />,
        }
      : derivedReliabilityLevel === 'medium'
      ? {
          label: 'Độ tin cậy trung bình',
          desc: 'Có một số bằng chứng phù hợp nhưng vẫn còn điểm chưa rõ, nên đối chiếu kỹ thêm.',
          toneText: 'text-amber-950',
          toneBg: 'bg-amber-50 border-amber-200',
          icon: <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />,
        }
      : {
          label: 'Độ tin cậy thấp',
          desc: 'Thiếu bằng chứng rõ ràng hoặc các nguồn có điểm chưa thống nhất — chưa đủ cơ sở khẳng định bệnh.',
          toneText: 'text-red-950',
          toneBg: 'bg-red-50 border-red-200',
          icon: <ShieldAlert className="w-5 h-5 text-red-700 shrink-0" />,
        };

  const getEvidenceCompletenessLabel = (val?: string) =>
    val === 'sufficient'
      ? 'Đầy đủ bằng chứng'
      : val === 'partial'
      ? 'Đầy đủ ở mức tương đối'
      : 'Còn thiếu bằng chứng';

  const getSourceAgreementLabel = (val?: string) =>
    val === 'high_consensus'
      ? 'Thống nhất cao giữa nhiều nguồn'
      : val === 'partial_consensus'
      ? 'Thống nhất một phần'
      : val === 'conflicting'
      ? 'Có điểm mâu thuẫn giữa các nguồn'
      : 'Chưa đủ nguồn đối chiếu trực tuyến';

  const getAgreementStatusMeta = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return { label: 'Thống nhất cao với ảnh và tài liệu đa nguồn', color: 'text-emerald-800' };
      case 'partially_consistent':
        return { label: 'Phù hợp một phần, còn chi tiết cần kiểm tra thêm', color: 'text-amber-800' };
      case 'conflicting':
        return { label: 'Có điểm chưa thống nhất giữa giả thuyết và bằng chứng', color: 'text-red-800' };
      default:
        return { label: 'Chưa đủ bằng chứng để kết luận chắc chắn', color: 'text-stone-700' };
    }
  };

  const getLikelihoodLabel = (val: string) =>
    val === 'most_likely'
      ? 'Khả năng phù hợp nhất'
      : val === 'possible_differential'
      ? 'Bệnh tương tự cần phân biệt'
      : 'Ít khả năng hơn';

  // Treatment guide with fallback to matched library record & actionPlan
  const treatment = {
    cause:
      result.treatmentGuide?.cause ||
      (primaryRefRecord?.causes ? cleanVietnameseText(primaryRefRecord.causes) : ''),
    recognitionSigns:
      result.treatmentGuide?.recognitionSigns && result.treatmentGuide.recognitionSigns.length > 0
        ? result.treatmentGuide.recognitionSigns
        : primaryDiag?.evidence && primaryDiag.evidence.length > 0
        ? primaryDiag.evidence
        : result.symptoms || [],
    favorableConditions:
      result.treatmentGuide?.favorableConditions ||
      (primaryRefRecord?.favorableConditions ? cleanVietnameseText(primaryRefRecord.favorableConditions) : ''),
    immediate24hSteps:
      result.treatmentGuide?.immediate24hSteps && result.treatmentGuide.immediate24hSteps.length > 0
        ? result.treatmentGuide.immediate24hSteps
        : result.actionPlan?.immediateSteps && result.actionPlan.immediateSteps.length > 0
        ? result.actionPlan.immediateSteps
        : [],
    careNext3To7Days:
      result.treatmentGuide?.careNext3To7Days && result.treatmentGuide.careNext3To7Days.length > 0
        ? result.treatmentGuide.careNext3To7Days
        : result.actionPlan?.safeCareAndPrevention && result.actionPlan.safeCareAndPrevention.length > 0
        ? result.actionPlan.safeCareAndPrevention
        : [],
    mildVsSevereGuide:
      result.treatmentGuide?.mildVsSevereGuide &&
      (result.treatmentGuide.mildVsSevereGuide.mildCase || result.treatmentGuide.mildVsSevereGuide.severeCase)
        ? result.treatmentGuide.mildVsSevereGuide
        : null,
    suggestedActiveIngredients:
      result.treatmentGuide?.suggestedActiveIngredients &&
      result.treatmentGuide.suggestedActiveIngredients.length > 0
        ? result.treatmentGuide.suggestedActiveIngredients
        : [],
    doList:
      result.treatmentGuide?.doList && result.treatmentGuide.doList.length > 0
        ? result.treatmentGuide.doList
        : [],
    dontList:
      result.treatmentGuide?.dontList && result.treatmentGuide.dontList.length > 0
        ? result.treatmentGuide.dontList
        : result.actionPlan?.importantWarnings && result.actionPlan.importantWarnings.length > 0
        ? result.actionPlan.importantWarnings
        : [],
    recoveryCheckSigns:
      result.treatmentGuide?.recoveryCheckSigns && result.treatmentGuide.recoveryCheckSigns.length > 0
        ? result.treatmentGuide.recoveryCheckSigns
        : [],
    cultivationAndPrevention:
      result.treatmentGuide?.cultivationAndPrevention && result.treatmentGuide.cultivationAndPrevention.length > 0
        ? result.treatmentGuide.cultivationAndPrevention
        : result.actionPlan?.safeCareAndPrevention && result.actionPlan.safeCareAndPrevention.length > 0
        ? result.actionPlan.safeCareAndPrevention
        : primaryRefRecord?.preventionMethods
        ? [cleanVietnameseText(primaryRefRecord.preventionMethods)]
        : [],
    professionalHandling:
      result.treatmentGuide?.professionalHandling && result.treatmentGuide.professionalHandling.length > 0
        ? result.treatmentGuide.professionalHandling
        : result.recommendations || [],
    pesticideSafetyNote:
      result.treatmentGuide?.pesticideSafetyNote ||
      'Thực hiện đúng Nguyên tắc 4 đúng (đúng thuốc, đúng lúc, đúng liều lượng in trên nhãn bao bì, đúng cách). Không tự ý pha trộn nhiều loại thuốc hoặc tăng liều; nên hỏi thêm cán bộ bảo vệ thực vật tại địa phương trước khi phun.',
  };

  const comparisonColumns =
    result.comparisonMatrix?.rows?.[0]?.diseaseDetails?.map((d) => d.diseaseName) ||
    differentialList.map((d) => d.diseaseName);

  const verificationStatusMeta = getAgreementStatusMeta(result.verification?.agreementStatus);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-200">
      {/* A & B: Original Image + Primary Identification */}
      <div className={compact ? 'p-4 sm:p-5 space-y-5' : 'p-5 sm:p-7 space-y-6'}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* A. Ảnh gốc người dùng tải lên */}
          <div className="md:col-span-5 space-y-2.5">
            <p className="text-xs font-semibold text-stone-500">
              A. Ảnh gốc bác đã tải lên
            </p>
            <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50 aspect-4/3 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Ảnh gốc bác đã tải lên"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-sm text-stone-500 p-4 text-center">
                  Không có ảnh xem trước
                </span>
              )}
            </div>
            {extraImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {extraImages.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border border-stone-200 bg-stone-50"
                  >
                    <img
                      src={ex.imageBase64}
                      alt={ex.angleLabel}
                      referrerPolicy="no-referrer"
                      className="w-full h-16 object-cover"
                    />
                    <p className="text-xs text-stone-600 px-2 py-1 truncate">{ex.angleLabel}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{getCropLabel(selectedCrop)}</span>
              <span aria-hidden="true">·</span>
              <span>{getPartLabel(selectedPart)}</span>
              <span aria-hidden="true">·</span>
              <span>{getImageQualityLabel(result.imageQuality)}</span>
            </div>
            {result.qualityIssues && result.qualityIssues.length > 0 && (
              <p className="text-xs text-amber-800 leading-relaxed">
                Lưu ý ảnh chụp: {result.qualityIssues.join(' ')}
              </p>
            )}
          </div>

          {/* B. Kết quả nhận diện chính */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-stone-600">
                <span className="font-semibold text-stone-500">B. Kết quả nhận diện chính</span>
                <span aria-hidden="true">·</span>
                <span className={`font-semibold ${reliabilityMeta.toneText}`}>
                  {reliabilityMeta.label}
                </span>
                {realSources.length > 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums text-emerald-800 font-medium">
                      Đối chiếu {realSources.length} nguồn trực tuyến
                    </span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight [text-wrap:balance]">
                {primaryDiseaseName}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {derivedReliabilityLevel === 'low'
                  ? 'Đây mới là giả thuyết nghi ngờ ban đầu do bằng chứng chưa đủ rõ. Bác chưa nên khẳng định bệnh hay vội phun thuốc.'
                  : derivedReliabilityLevel === 'medium'
                  ? 'Bệnh có nhiều đặc điểm tương đồng nhất với ảnh chụp, nhưng bác nên xem thêm mục phân biệt bên dưới để chắc chắn.'
                  : 'Bệnh phù hợp cao với các dấu hiệu quan sát trên ảnh và thống nhất với nhiều tài liệu nông nghiệp đối chiếu.'}
              </p>
            </div>

            {/* Observed signs on photo */}
            {(result.symptoms?.length > 0 || (primaryDiag?.evidence && primaryDiag.evidence.length > 0)) && (
              <div className="space-y-1.5 pt-1">
                <p className="text-sm font-bold text-stone-900">
                  Đặc điểm bất thường quan sát thấy trên ảnh:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-stone-800 leading-relaxed">
                  {(primaryDiag?.evidence?.length ? primaryDiag.evidence : result.symptoms).map(
                    (item, idx) => (
                      <li key={idx}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Voice Read-Aloud Button */}
            {onToggleSpeak && (
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onToggleSpeak(result)}
                  className={`min-h-[46px] px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSpeaking
                      ? 'bg-amber-700 hover:bg-amber-800 text-white'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  {isTtsLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>Đang tạo giọng đọc...</span>
                    </>
                  ) : isSpeaking ? (
                    <>
                      <Square className="w-4 h-4 fill-current shrink-0" />
                      <span>Dừng nghe đọc</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 shrink-0" />
                      <span>Nghe đọc kết quả & cách xử lý</span>
                    </>
                  )}
                </button>
                {ttsError && <span className="text-sm text-amber-800">{ttsError}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* C. Các bệnh có biểu hiện tương tự (tối đa 3 bệnh) */}
      {differentialList.length > 0 && (
        <div className={compact ? 'p-4 sm:p-5 space-y-4' : 'p-5 sm:p-7 space-y-4'}>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>C. Các bệnh có biểu hiện tương tự (tối đa 3 bệnh)</span>
            </h3>
            <p className="text-sm text-stone-600">
              Đối chiếu các bệnh dễ nhầm lẫn để thấy rõ vì sao một bệnh được đánh giá phù hợp hơn các bệnh còn lại.
            </p>
          </div>

          {result.differentialExplanation && (
            <p className="text-sm sm:text-base text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-4 leading-relaxed">
              <strong className="text-stone-900">Lý do xếp hạng ưu tiên: </strong>
              {result.differentialExplanation}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {differentialList.map((item, idx) => {
              const isPrimary = idx === 0;
              return (
                <div
                  key={`${item.diseaseName}-${idx}`}
                  className={`rounded-xl border p-4 space-y-3 flex flex-col ${
                    isPrimary
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs text-stone-600 flex items-center gap-1.5">
                      <span className="font-mono tabular-nums font-semibold">0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className={isPrimary ? 'text-emerald-800 font-semibold' : 'text-stone-600 font-medium'}>
                        {getLikelihoodLabel(item.likelihood)}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {item.diseaseName}
                    </h4>
                  </div>

                  {item.matchingSignsOnImage.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-stone-700">Dấu hiệu khớp trên ảnh:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-stone-800 leading-relaxed">
                        {item.matchingSignsOnImage.map((s, sIdx) => (
                          <li key={sIdx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.distinguishingFeatures.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-stone-700">Đặc điểm giúp phân biệt:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-stone-800 leading-relaxed">
                        {item.distinguishingFeatures.map((f, fIdx) => (
                          <li key={fIdx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.referenceComparison && (
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1 border-t border-stone-200/80">
                      <strong className="text-stone-900">Đối chiếu tài liệu: </strong>
                      {item.referenceComparison}
                    </p>
                  )}

                  {item.whyRankedHere && (
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mt-auto pt-1">
                      <strong className="text-stone-900">Đánh giá: </strong>
                      {item.whyRankedHere}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* D. Bảng so sánh đặc điểm và triệu chứng */}
      {result.comparisonMatrix &&
        (result.comparisonMatrix.sharedSymptoms.length > 0 ||
          result.comparisonMatrix.rows.length > 0) && (
          <div className={compact ? 'p-4 sm:p-5 space-y-4' : 'p-5 sm:p-7 space-y-4'}>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                D. Bảng so sánh đặc điểm và triệu chứng
              </h3>
              <p className="text-sm text-stone-600">
                So sánh trực tiếp triệu chứng trên ảnh chụp của bác với đặc trưng của từng bệnh trong tài liệu.
              </p>
            </div>

            {result.comparisonMatrix.sharedSymptoms.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
                <p className="text-sm font-bold text-stone-900">
                  Điểm giống nhau dễ gây nhầm lẫn giữa các bệnh:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-stone-800">
                  {result.comparisonMatrix.sharedSymptoms.map((sym, idx) => (
                    <li key={idx}>{sym}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.comparisonMatrix.rows.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full min-w-[640px] text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-900">
                      <th className="py-3 px-3.5 font-bold w-40">Tiêu chí so sánh</th>
                      <th className="py-3 px-3.5 font-bold bg-emerald-50/70 text-emerald-950">
                        Quan sát trên ảnh
                      </th>
                      {comparisonColumns.slice(0, 3).map((colName, idx) => (
                        <th key={idx} className="py-3 px-3.5 font-bold">
                          {colName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {result.comparisonMatrix.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="align-top">
                        <td className="py-3 px-3.5 font-semibold text-stone-900 bg-stone-50/40">
                          {row.criterion}
                        </td>
                        <td className="py-3 px-3.5 text-stone-900 bg-emerald-50/30 leading-relaxed">
                          {row.observedOnPhoto}
                        </td>
                        {comparisonColumns.slice(0, 3).map((colName, cIdx) => {
                          const cell =
                            row.diseaseDetails.find((d) => d.diseaseName === colName) ||
                            row.diseaseDetails[cIdx];
                          return (
                            <td key={cIdx} className="py-3 px-3.5 text-stone-700 leading-relaxed">
                              {cell?.detail || '—'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      {/* E. Bằng chứng hình ảnh và tài liệu từ Internet */}
      <div className={compact ? 'p-4 sm:p-5 space-y-5' : 'p-5 sm:p-7 space-y-5'}>
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>E. Bằng chứng hình ảnh và tài liệu từ Internet</span>
          </h3>
          <p className="text-sm text-stone-600">
            Đối chiếu ảnh bác chụp với ảnh mẫu bệnh học đã kiểm duyệt và trích đoạn thực tế từ nhiều nguồn nông nghiệp trực tuyến.
          </p>
        </div>

        {/* Visual Reference Photos Comparison */}
        {visualReferenceRecords.length > 0 && (
          <div className="space-y-2.5">
            <p className="text-sm font-bold text-stone-900">
              Đối chiếu hình ảnh mẫu bệnh học:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 space-y-2">
                <p className="text-xs font-bold text-stone-800">Ảnh bác đã chụp</p>
                <div className="rounded-lg overflow-hidden aspect-4/3 bg-white border border-stone-200 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Ảnh bác chụp"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-stone-500">Chưa có ảnh</span>
                  )}
                </div>
              </div>

              {visualReferenceRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-3 space-y-2"
                >
                  <p className="text-xs font-bold text-stone-800 truncate">
                    Ảnh mẫu: {stripEnglishParentheticals(rec.vietnameseName)}
                  </p>
                  <div className="rounded-lg overflow-hidden aspect-4/3 bg-white border border-stone-200 flex items-center justify-center">
                    {rec.sampleImageUrl && !failedRefIds[rec.id] ? (
                      <img
                        src={rec.sampleImageUrl}
                        alt={stripEnglishParentheticals(rec.vietnameseName)}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedRefIds((prev) => ({ ...prev, [rec.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-stone-500 p-3 text-center">
                        Ảnh mẫu đối chiếu đang cập nhật
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    Nguồn lưu trữ: {cleanVietnameseText(rec.verifiedBy || 'Kho tài liệu bệnh học cây trồng')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Real Internet Evidence Items */}
        {evidenceItems.length > 0 ? (
          <div className="space-y-2.5">
            <p className="text-sm font-bold text-stone-900">
              Trích đoạn bằng chứng truy xuất trực tiếp từ Internet ({evidenceItems.length} nguồn):
            </p>
            <div className="space-y-3">
              {evidenceItems.map((ev, idx) => (
                <div
                  key={`${ev.url}-${idx}`}
                  className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-mono tabular-nums font-bold text-stone-800">
                        Nguồn {idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-emerald-800">{ev.sourceCategory}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ev.domain}</span>
                    </div>
                    <a
                      href={ev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 whitespace-nowrap shrink-0"
                    >
                      <span>Mở tài liệu gốc</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                  <p className="text-sm font-semibold text-stone-900">{ev.sourceTitle}</p>
                  <p className="text-sm text-stone-700 leading-relaxed">{ev.evidenceExcerpt}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-amber-950">
              <p className="font-bold">Chưa truy xuất được bằng chứng trực tuyến ở lượt này</p>
              <p className="leading-relaxed">
                {result.googleSearchNotice ||
                  'Hệ thống chưa lấy được liên kết đối chiếu từ Internet trong lượt phân tích này. Các nhận định hiện chỉ dựa trên ảnh chụp và bộ dữ liệu nội bộ nên chưa được xem là đã xác thực đa nguồn.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* F. Kết quả kiểm chứng */}
      {result.verification && (
        <div className={compact ? 'p-4 sm:p-5 space-y-4' : 'p-5 sm:p-7 space-y-4'}>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              F. Kết quả kiểm chứng độc lập
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              {result.verification.verifierModelLabel ||
                'Đánh giá giả thuyết ban đầu dựa trên bằng chứng hình ảnh và tài liệu thu thập được.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <p className="text-xs font-bold text-stone-600">1. Giả thuyết ban đầu (AI phân tích ảnh)</p>
              <p className="text-sm sm:text-base text-stone-900 leading-relaxed">
                {result.verification.initialHypothesis || primaryDiseaseName}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-1.5">
              <p className="text-xs font-bold text-stone-600">2. Kết luận sau kiểm chứng độc lập</p>
              <p className="text-sm sm:text-base text-stone-900 font-medium leading-relaxed">
                {result.verification.finalConclusion}
              </p>
              <p className={`text-xs font-semibold pt-1 ${verificationStatusMeta.color}`}>
                Trạng thái đối chiếu: {verificationStatusMeta.label}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {result.verification.consistentPoints.length > 0 && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1.5">
                <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Điểm thống nhất</span>
                </p>
                <ul className="list-disc list-inside space-y-1 text-stone-800 leading-relaxed">
                  {result.verification.consistentPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-1.5">
              <p className="font-bold text-amber-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Điểm chưa thống nhất / mâu thuẫn</span>
              </p>
              {result.verification.contradictionsOrUncertainties.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-stone-800 leading-relaxed">
                  {result.verification.contradictionsOrUncertainties.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-stone-700 leading-relaxed">
                  Chưa ghi nhận mâu thuẫn rõ rệt giữa dấu hiệu trên ảnh và tài liệu đối chiếu.
                </p>
              )}
            </div>

            {result.verification.limitations.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
                <p className="font-bold text-stone-900">Giới hạn cần lưu ý</p>
                <ul className="list-disc list-inside space-y-1 text-stone-700 leading-relaxed">
                  {result.verification.limitations.map((lim, i) => (
                    <li key={i}>{lim}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* G. Đánh giá độ tin cậy */}
      <div className={compact ? 'p-4 sm:p-5 space-y-4' : 'p-5 sm:p-7 space-y-4'}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            G. Đánh giá độ tin cậy của kết quả
          </h3>
          <span className="text-xs text-stone-500">
            Đánh giá theo bằng chứng thực tế — không tự tạo phần trăm dự đoán
          </span>
        </div>

        <div className={`rounded-xl border p-4 sm:p-5 space-y-3 ${reliabilityMeta.toneBg}`}>
          <div className="flex items-start gap-3">
            {reliabilityMeta.icon}
            <div className="space-y-1">
              <p className={`text-base sm:text-lg font-bold ${reliabilityMeta.toneText}`}>
                Mức độ tin cậy tổng thể: {reliabilityMeta.label}
              </p>
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
                {result.reliability?.summary || reliabilityMeta.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-black/10 text-sm">
            <div>
              <span className="font-bold text-stone-900">Bệnh nghi ngờ phù hợp nhất: </span>
              <span className="text-stone-800">{primaryDiseaseName}</span>
            </div>
            <div>
              <span className="font-bold text-stone-900">Các bệnh cần phân biệt: </span>
              <span className="text-stone-800">
                {otherDifferentialNames.length > 0
                  ? otherDifferentialNames.join(', ')
                  : 'Chưa ghi nhận bệnh trùng lặp nổi bật'}
              </span>
            </div>
            <div>
              <span className="font-bold text-stone-900">Mức độ đầy đủ của bằng chứng: </span>
              <span className="text-stone-800">
                {getEvidenceCompletenessLabel(result.reliability?.evidenceCompleteness)}
                {result.reliability?.evidenceCompletenessNote
                  ? ` — ${result.reliability.evidenceCompletenessNote}`
                  : ''}
              </span>
            </div>
            <div>
              <span className="font-bold text-stone-900">Sự thống nhất giữa các nguồn: </span>
              <span className="text-stone-800">
                {getSourceAgreementLabel(result.reliability?.sourceAgreement)}
                {result.reliability?.sourceAgreementNote
                  ? ` — ${result.reliability.sourceAgreementNote}`
                  : ''}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-bold text-stone-900">Mức độ tương đồng hình ảnh: </span>
              <span className="text-stone-800">
                {result.reliability?.visualSimilarityNote ||
                  `Ảnh chụp đạt mức ${getImageQualityLabel(result.imageQuality).toLowerCase()}, đối chiếu trực tiếp theo hình thái vết bệnh trên ảnh.`}
              </span>
            </div>
          </div>

          {derivedReliabilityLevel === 'low' && (
            <div className="mt-2 pt-3 border-t border-red-200 space-y-3">
              <p className="text-sm sm:text-base font-semibold text-red-950 leading-relaxed">
                Khuyến nghị khi độ tin cậy thấp:{' '}
                {result.reliability?.lowConfidenceAction ||
                  'Bác nên chụp lại ảnh cận cảnh rõ nét hơn (thêm mặt dưới lá và góc chụp cả cây) hoặc mang mẫu thực tế hỏi trực tiếp cán bộ nông nghiệp / trạm bảo vệ thực vật gần nhất.'}
              </p>
              {onRetakePhoto && (
                <button
                  type="button"
                  onClick={onRetakePhoto}
                  className="min-h-[46px] px-4 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white text-sm sm:text-base font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 shrink-0" />
                  <span>Chụp lại ảnh rõ hơn để kiểm chứng</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* H. Hướng dẫn xử lý và phòng ngừa ngoài vườn / ruộng */}
      <div className={compact ? 'p-4 sm:p-5 space-y-5' : 'p-5 sm:p-7 space-y-5'}>
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            H. Hướng dẫn xử lý thực tế ngoài vườn / ruộng
          </h3>
          <p className="text-sm text-stone-600">
            Sắp xếp theo trình tự dễ làm từng bước để bác xử lý kịp thời, tiết kiệm công và tránh phun nhầm thuốc.
          </p>
        </div>

        {/* 1. Lộ trình thao tác theo thời gian: 24 giờ đầu -> 3-7 ngày tới -> Kiểm tra đứng vết */}
        {(treatment.immediate24hSteps.length > 0 ||
          treatment.careNext3To7Days.length > 0 ||
          treatment.recoveryCheckSigns.length > 0) && (
          <div className="space-y-3.5">
            {treatment.immediate24hSteps.length > 0 && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 space-y-2.5">
                <p className="font-bold text-emerald-950 text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Bước 1 · Việc làm ngay trong 24 giờ đầu</span>
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-stone-800 leading-relaxed">
                  {treatment.immediate24hSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {treatment.careNext3To7Days.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 space-y-2.5">
                <p className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Bước 2 · Chăm sóc và phục hồi trong 3–7 ngày tới</span>
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-stone-800 leading-relaxed">
                  {treatment.careNext3To7Days.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {treatment.recoveryCheckSigns.length > 0 && (
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5 space-y-2">
                <p className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Bước 3 · Cách kiểm tra sau 5–7 ngày xem bệnh đã &ldquo;đứng vết&rdquo; chưa</span>
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-stone-800 leading-relaxed">
                  {treatment.recoveryCheckSigns.map((sign, idx) => (
                    <li key={idx}>{sign}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 2. Xử lý theo mức độ nặng / nhẹ */}
        {treatment.mildVsSevereGuide && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            {treatment.mildVsSevereGuide.mildCase && (
              <div className="rounded-xl border border-emerald-200 bg-white p-4 space-y-1.5">
                <p className="font-bold text-emerald-950">
                  Khi mới chớm bị nhẹ (vài lá hoặc vài cây)
                </p>
                <p className="text-stone-800 leading-relaxed">
                  {treatment.mildVsSevereGuide.mildCase}
                </p>
              </div>
            )}
            {treatment.mildVsSevereGuide.severeCase && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-1.5">
                <p className="font-bold text-amber-950">
                  Khi đã bị nặng, lan rộng nhiều cây
                </p>
                <p className="text-stone-800 leading-relaxed">
                  {treatment.mildVsSevereGuide.severeCase}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 3. Gợi ý nhóm hoạt chất / chế phẩm sinh học để hỏi đại lý vật tư (KHÔNG tự bịa liều pha) */}
        {treatment.suggestedActiveIngredients.length > 0 && (
          <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 space-y-2.5">
            <p className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Gợi ý nhóm hoạt chất / chế phẩm sinh học để hỏi đại lý vật tư</span>
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-stone-800 leading-relaxed">
              {treatment.suggestedActiveIngredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="text-xs sm:text-sm text-stone-600 pt-2 border-t border-stone-100 leading-relaxed">
              Bác có thể đưa tên nhóm hoạt chất hoặc chế phẩm trên để hỏi đại lý vật tư nông nghiệp uy tín hoặc cán bộ khuyến nông chọn đúng sản phẩm được phép lưu hành cho {getCropLabel(selectedCrop)}. Hệ thống không tự kê liều pha — bác pha đúng liều in trên nhãn bao bì.
            </p>
          </div>
        )}

        {/* 4. Bảng ghi nhớ nhanh: Nên làm / Tuyệt đối tránh */}
        {(treatment.doList.length > 0 || treatment.dontList.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            {treatment.doList.length > 0 && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
                <p className="font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Việc NÊN làm</span>
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-stone-800 leading-relaxed">
                  {treatment.doList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {treatment.dontList.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 space-y-2">
                <p className="font-bold text-red-950 flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-700 shrink-0" />
                  <span>Việc TUYỆT ĐỐI TRÁNH</span>
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-stone-800 leading-relaxed">
                  {treatment.dontList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 5. Kiến thức gốc & tài liệu chuyên môn (Nguyên nhân, Điều kiện thuận lợi, Dấu hiệu, Canh tác phòng ngừa, Xử lý chuyên môn) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
          {treatment.cause && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <p className="font-bold text-stone-900">Nguyên nhân gây bệnh</p>
              <p className="text-stone-800 leading-relaxed">{treatment.cause}</p>
            </div>
          )}

          {treatment.favorableConditions && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-1.5">
              <p className="font-bold text-stone-900">Điều kiện thuận lợi cho bệnh phát triển</p>
              <p className="text-stone-800 leading-relaxed">{treatment.favorableConditions}</p>
            </div>
          )}
        </div>

        {treatment.recognitionSigns.length > 0 && (
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-2">
            <p className="font-bold text-stone-900 text-base">Dấu hiệu nhận biết ngoài vườn / ruộng</p>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-stone-800 leading-relaxed">
              {treatment.recognitionSigns.map((sign, idx) => (
                <li key={idx}>{sign}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
          {treatment.cultivationAndPrevention.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <p className="font-bold text-stone-900">Biện pháp canh tác và phòng ngừa vụ sau</p>
              <ol className="list-decimal list-inside space-y-1.5 text-stone-800 leading-relaxed">
                {treatment.cultivationAndPrevention.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {treatment.professionalHandling.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <p className="font-bold text-stone-900">Hướng dẫn xử lý theo tài liệu chuyên môn</p>
              <ol className="list-decimal list-inside space-y-1.5 text-stone-800 leading-relaxed">
                {treatment.professionalHandling.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Pesticide Safety Guard - Nguyên tắc 4 đúng */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-2 text-sm text-amber-950">
          <p className="font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Nguyên tắc 4 đúng & An toàn thuốc bảo vệ thực vật</span>
          </p>
          <p className="text-xs sm:text-sm font-semibold text-amber-900">
            Đúng thuốc · Đúng lúc · Đúng liều lượng in trên nhãn · Đúng cách phun
          </p>
          <p className="leading-relaxed">{treatment.pesticideSafetyNote}</p>
        </div>
      </div>

      {/* I. Danh sách nguồn tham khảo có thể truy cập */}
      <div className={compact ? 'p-4 sm:p-5 space-y-3' : 'p-5 sm:p-7 space-y-3'}>
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>I. Danh sách nguồn tham khảo có thể truy cập</span>
        </h3>

        {realSources.length > 0 ? (
          <ol className="space-y-2.5">
            {realSources.map((src, idx) => (
              <li
                key={`${src.url}-${idx}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2 border-b border-stone-100 last:border-b-0 text-sm"
              >
                <div className="min-w-0">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 break-words"
                  >
                    <span className="font-mono tabular-nums text-stone-500 no-underline">
                      {idx + 1}.
                    </span>
                    <span>{src.title || src.url}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  <div className="text-xs text-stone-500 mt-0.5 flex flex-wrap items-center gap-x-2">
                    {src.sourceCategory && <span>{src.sourceCategory}</span>}
                    {src.domain && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{src.domain}</span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-stone-600 leading-relaxed">
            Chưa có đường dẫn tham khảo trực tuyến nào được truy xuất trong lượt kiểm tra này. Hệ thống không tự tạo nguồn giả; bác có thể tra cứu thêm trong mục Sổ bệnh hoặc thử quét lại khi đường truyền ổn định.
          </p>
        )}

        {result.disclaimer && (
          <p className="text-xs text-stone-500 pt-2 border-t border-stone-100 leading-relaxed">
            Lưu ý chuyên môn: {result.disclaimer}
          </p>
        )}
      </div>

      {/* Bottom Actions */}
      {!compact && (onNavigateToAssistant || onResetScanner || onNavigateToLibrary) && (
        <div className="p-5 sm:px-7 sm:py-5 bg-stone-50/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            {onNavigateToAssistant && (
              <button
                type="button"
                onClick={() =>
                  onNavigateToAssistant({
                    crop: result.cropDetected,
                    part: getPartLabel(selectedPart),
                    suspectedDisease: primaryDiseaseName,
                    symptoms: result.symptoms,
                    confidenceLevel: reliabilityMeta.label,
                  })
                }
                className="min-h-[48px] px-5 py-2.5 rounded-xl font-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Hỏi thêm chuyên gia AI</span>
              </button>
            )}

            {onResetScanner && (
              <button
                type="button"
                onClick={onResetScanner}
                className="min-h-[48px] px-5 py-2.5 rounded-xl font-bold text-base bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 cursor-pointer"
              >
                Chụp khám cây khác
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            {onNavigateToLibrary && (
              <button
                type="button"
                onClick={() => onNavigateToLibrary(selectedCrop)}
                className="text-sm font-semibold text-emerald-800 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Mở sổ bệnh</span>
              </button>
            )}
            {isSaved && (
              <span className="text-sm font-semibold text-emerald-700">
                Đã lưu vào lịch sử
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
