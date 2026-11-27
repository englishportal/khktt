import React, { useState, useEffect } from 'react';
import {
  Trash2,
  X,
  Camera,
  MessageCircle,
  GitCompareArrows,
  Check,
  ExternalLink,
} from 'lucide-react';
import { DiagnosisHistoryItem, CropType } from '../../types';
import { fetchUserDiagnoses, deleteDiagnosisRecord } from '../../services/diagnosisService';
import { useAuth } from '../../context/AuthContext';
import { cleanVietnameseText, stripEnglishParentheticals } from '../../utils/vietnameseText';
import { DiagnosisReportView } from '../scanner/DiagnosisReportView';

interface DiagnosisHistoryViewProps {
  onScanNew: () => void;
  onViewAssistantWithDiagnosis?: (context: any) => void;
}

export const DiagnosisHistoryView: React.FC<DiagnosisHistoryViewProps> = ({
  onScanNew,
  onViewAssistantWithDiagnosis,
}) => {
  const { user, isResearcher } = useAuth();
  const [historyItems, setHistoryItems] = useState<DiagnosisHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [viewItem, setViewItem] = useState<DiagnosisHistoryItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  useEffect(() => {
    loadHistory();
  }, [user]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const items = await fetchUserDiagnoses(user?.uid, isResearcher);
      setHistoryItems(items);
    } catch (err) {
      console.error('Error loading diagnosis history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteDiagnosisRecord(id);
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    setCompareIds((prev) => prev.filter((cid) => cid !== id));
    if (viewItem?.id === id) setViewItem(null);
  };

  const toggleCompareSelection = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cid) => cid !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const getCropLabel = (crop: CropType) =>
    crop === 'citrus' ? 'Cây Cam, Bưởi' : crop === 'rice' ? 'Cây Lúa' : 'Cây Lạc';

  const getReliabilityLabel = (item: DiagnosisHistoryItem) => {
    const level = item.assessment?.reliability?.overallLevel;
    if (level === 'high') return 'Độ tin cậy cao';
    if (level === 'low') return 'Độ tin cậy thấp';
    if (level === 'medium') return 'Độ tin cậy trung bình';
    const conf = item.assessment?.possibleDiagnoses?.[0]?.confidenceLevel;
    if (conf === 'high') return 'Độ tin cậy cao';
    if (conf === 'low' || conf === 'insufficient_evidence') return 'Độ tin cậy thấp';
    return 'Độ tin cậy trung bình';
  };

  const getDifferentials = (item: DiagnosisHistoryItem): string[] => {
    if (item.differentialDiseases && item.differentialDiseases.length > 0) {
      return item.differentialDiseases.map((d) => cleanVietnameseText(d));
    }
    if (item.assessment?.differentialDiseases && item.assessment.differentialDiseases.length > 0) {
      return item.assessment.differentialDiseases.map((d) => cleanVietnameseText(d.diseaseName));
    }
    if (item.assessment?.alternativeCauses && item.assessment.alternativeCauses.length > 0) {
      return item.assessment.alternativeCauses.map((d) => cleanVietnameseText(d));
    }
    return [];
  };

  const getSources = (item: DiagnosisHistoryItem) => {
    const list =
      item.referenceSources && item.referenceSources.length > 0
        ? item.referenceSources
        : item.assessment?.groundingSources || [];
    return list.filter((s) => s.url && (s.url.startsWith('http://') || s.url.startsWith('https://')));
  };

  const formatDateTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const filteredItems = historyItems.filter(
    (item) => selectedCrop === 'all' || item.cropType === selectedCrop
  );

  const comparedPair = compareIds
    .map((id) => historyItems.find((item) => item.id === id))
    .filter((x): x is DiagnosisHistoryItem => Boolean(x));

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Lịch sử nhận diện & so sánh
          </h1>
          <p className="text-base text-stone-600 mt-1">
            Xem lại ảnh, bệnh cần phân biệt, nguồn tham khảo và so sánh giữa các lần kiểm tra trước.
          </p>
        </div>

        <button
          type="button"
          onClick={onScanNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-bold bg-emerald-700 text-white hover:bg-emerald-800 min-h-[48px] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Camera className="w-5 h-5" />
          <span>Chụp khám cây mới</span>
        </button>
      </div>

      {/* Crop Filter + Comparison Trigger Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'citrus', label: 'Cây Cam, Bưởi' },
            { id: 'rice', label: 'Cây Lúa' },
            { id: 'peanut', label: 'Cây Lạc' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCrop(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm sm:text-base font-semibold min-h-[44px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCrop === tab.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white border border-stone-200 text-stone-800 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {historyItems.length >= 2 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-stone-600 tabular-nums">
              Đã chọn so sánh: <strong>{compareIds.length}/2</strong>
            </span>
            {compareIds.length === 2 && (
              <button
                type="button"
                onClick={() => setShowCompareModal(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <GitCompareArrows className="w-4 h-4 shrink-0" />
                <span>So sánh 2 lần khám</span>
              </button>
            )}
            {compareIds.length > 0 && (
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="min-h-[44px] px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-sm font-semibold cursor-pointer whitespace-nowrap shrink-0"
              >
                Bỏ chọn
              </button>
            )}
          </div>
        )}
      </div>

      {/* History Grid */}
      {loading ? (
        <div className="py-16 text-center text-base text-stone-500">
          Đang tải lịch sử các lần nhận diện...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-14 text-center bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <p className="text-lg font-bold text-stone-800">Chưa có lần khám nào được lưu.</p>
          <p className="text-base text-stone-600">
            Khi bác chụp ảnh kiểm tra bệnh, toàn bộ ảnh, bệnh cần phân biệt và nguồn tham khảo sẽ tự động lưu tại đây.
          </p>
          <button
            type="button"
            onClick={onScanNew}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-base font-bold bg-emerald-700 text-white hover:bg-emerald-800 min-h-[48px] cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>Chụp ảnh khám ngay</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isSelectedForCompare = compareIds.includes(item.id);
            const differentials = getDifferentials(item);
            const sources = getSources(item);
            const primaryName =
              stripEnglishParentheticals(item.suspectedDiseases[0] || '') || 'Kết quả kiểm tra cây';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border overflow-hidden flex flex-col justify-between transition-colors ${
                  isSelectedForCompare
                    ? 'border-emerald-600 ring-1 ring-emerald-600'
                    : 'border-stone-200 hover:border-emerald-400'
                }`}
              >
                <div>
                  <div className="h-44 bg-stone-100 overflow-hidden flex items-center justify-center">
                    {item.imageUrl && !failedImages[item.id] ? (
                      <img
                        src={item.imageUrl}
                        alt={primaryName}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-stone-500">Không có ảnh xem trước</span>
                    )}
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-semibold text-emerald-800">
                        {getCropLabel(item.cropType)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{formatDateTime(item.createdAt)}</span>
                    </div>

                    <h3 className="font-bold text-lg text-stone-900 leading-snug">
                      {primaryName}
                    </h3>

                    <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-medium text-stone-800">{getReliabilityLabel(item)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{sources.length} nguồn tham khảo</span>
                    </div>

                    {differentials.length > 0 && (
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        <strong className="text-stone-800">Cần phân biệt: </strong>
                        {differentials.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewItem(item)}
                    className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-sm border border-emerald-200 cursor-pointer whitespace-nowrap"
                  >
                    Xem chi tiết
                  </button>
                  {historyItems.length >= 2 && (
                    <button
                      type="button"
                      onClick={() => toggleCompareSelection(item.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-1.5 border cursor-pointer whitespace-nowrap ${
                        isSelectedForCompare
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {isSelectedForCompare ? (
                        <Check className="w-4 h-4 shrink-0" />
                      ) : (
                        <GitCompareArrows className="w-4 h-4 shrink-0" />
                      )}
                      <span>{isSelectedForCompare ? 'Đã chọn' : 'So sánh'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-700 font-semibold text-sm inline-flex items-center gap-1 cursor-pointer"
                    title="Xóa lần khám này"
                    aria-label="Xóa lần khám này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Single-Record Detail Modal (reusing DiagnosisReportView A-I) */}
      {viewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-stone-50 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="sticky top-0 bg-white border-b border-stone-200 px-5 py-4 flex items-center justify-between gap-3 z-10">
              <div className="min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-stone-900 truncate">
                  {stripEnglishParentheticals(viewItem.suspectedDiseases[0] || '') || 'Chi tiết lần khám'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  {getCropLabel(viewItem.cropType)} · {formatDateTime(viewItem.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewItem(null)}
                className="p-2 rounded-xl hover:bg-stone-100 text-stone-600 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
                aria-label="Đóng cửa sổ chi tiết"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {viewItem.assessment ? (
                <DiagnosisReportView
                  result={viewItem.assessment}
                  selectedCrop={viewItem.cropType}
                  selectedPart={viewItem.plantPart}
                  imagePreview={failedImages[viewItem.id] ? null : viewItem.imageUrl}
                  compact
                />
              ) : (
                <p className="text-sm text-stone-600">Không có dữ liệu chi tiết cho lần khám này.</p>
              )}

              {viewItem.expertNotes && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-stone-800">
                  <span className="font-bold text-amber-950">Ghi chú của cán bộ kỹ thuật: </span>
                  <span>{viewItem.expertNotes}</span>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 border-t border-stone-200 p-4 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {onViewAssistantWithDiagnosis && (
                <button
                  type="button"
                  onClick={() => {
                    onViewAssistantWithDiagnosis({
                      crop: getCropLabel(viewItem.cropType),
                      suspectedDisease: viewItem.suspectedDiseases[0],
                      symptoms: viewItem.assessment?.symptoms || [],
                    });
                    setViewItem(null);
                  }}
                  className="min-h-[46px] px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Hỏi thêm về bệnh này</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setViewItem(null)}
                className="min-h-[46px] px-5 py-2.5 rounded-xl text-sm sm:text-base font-semibold bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal for 2 Saved Diagnoses */}
      {showCompareModal && comparedPair.length === 2 && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="sticky top-0 bg-white border-b border-stone-200 px-5 py-4 flex items-center justify-between gap-3 z-10">
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-stone-900">
                  So sánh 2 lần nhận diện trước
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Đối chiếu tiến triển bệnh, dấu hiệu trên ảnh, độ tin cậy và nguồn tham khảo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="p-2 rounded-xl hover:bg-stone-100 text-stone-600 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Đóng cửa sổ so sánh"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              {comparedPair.map((item, idx) => {
                const diffs = getDifferentials(item);
                const sources = getSources(item);
                const primaryName =
                  stripEnglishParentheticals(item.suspectedDiseases[0] || '') || 'Kết quả kiểm tra';

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 space-y-4"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-stone-500">
                        Lần khám {idx + 1} · {getCropLabel(item.cropType)} · {formatDateTime(item.createdAt)}
                      </p>
                      <h4 className="text-lg font-bold text-stone-900">{primaryName}</h4>
                      <p className="text-xs font-semibold text-emerald-800">
                        {getReliabilityLabel(item)}
                      </p>
                    </div>

                    <div className="rounded-lg overflow-hidden aspect-4/3 bg-white border border-stone-200 flex items-center justify-center">
                      {item.imageUrl && !failedImages[item.id] ? (
                        <img
                          src={item.imageUrl}
                          alt={primaryName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-stone-500">Không có ảnh</span>
                      )}
                    </div>

                    <div className="space-y-1.5 text-sm">
                      <p className="font-bold text-stone-900">Bệnh cần phân biệt:</p>
                      <p className="text-stone-700 leading-relaxed">
                        {diffs.length > 0 ? diffs.join(', ') : 'Không ghi nhận thêm'}
                      </p>
                    </div>

                    {item.assessment?.symptoms && item.assessment.symptoms.length > 0 && (
                      <div className="space-y-1.5 text-sm">
                        <p className="font-bold text-stone-900">Dấu hiệu quan sát trên ảnh:</p>
                        <ul className="list-disc list-inside space-y-1 text-stone-700">
                          {item.assessment.symptoms.slice(0, 4).map((s, sIdx) => (
                            <li key={sIdx}>{cleanVietnameseText(s)}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.assessment?.verification?.finalConclusion && (
                      <div className="space-y-1 text-sm">
                        <p className="font-bold text-stone-900">Kết luận kiểm chứng:</p>
                        <p className="text-stone-700 leading-relaxed">
                          {cleanVietnameseText(item.assessment.verification.finalConclusion)}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1.5 text-sm">
                      <p className="font-bold text-stone-900">
                        Nguồn tham khảo ({sources.length}):
                      </p>
                      {sources.length > 0 ? (
                        <ul className="space-y-1">
                          {sources.slice(0, 4).map((src, sIdx) => (
                            <li key={sIdx}>
                              <a
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:underline break-all"
                              >
                                <span>{src.title || src.url}</span>
                                <ExternalLink className="w-3 h-3 shrink-0" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-stone-500">Chưa có nguồn trực tuyến lưu kèm.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-stone-200 p-4 bg-stone-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold cursor-pointer"
              >
                Đóng bảng so sánh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
