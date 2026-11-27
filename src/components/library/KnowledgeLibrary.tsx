import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  RefreshCw,
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { DiseaseRecord, CropType, GalleryImage } from '../../types';
import { fetchDiseases, saveDisease, deleteDisease, syncVerifiedDiseases } from '../../services/diseaseService';
import { useAuth } from '../../context/AuthContext';

interface KnowledgeLibraryProps {
  initialCrop?: CropType;
  onScanWithDisease?: (crop: CropType) => void;
}

function getDiseaseImages(disease: DiseaseRecord): GalleryImage[] {
  const list: GalleryImage[] = [];
  if (Array.isArray(disease.galleryImages)) {
    for (const img of disease.galleryImages) {
      if (img && img.url && !list.some((x) => x.url === img.url)) {
        list.push(img);
      }
    }
  }
  if (disease.sampleImageUrl && !list.some((x) => x.url === disease.sampleImageUrl)) {
    list.unshift({
      url: disease.sampleImageUrl,
      caption: disease.vietnameseName,
      source: disease.verifiedBy || 'Tài liệu đối chứng nông nghiệp',
    });
  }
  return list;
}

export const KnowledgeLibrary: React.FC<KnowledgeLibraryProps> = ({
  initialCrop,
  onScanWithDisease,
}) => {
  const { isAdmin } = useAuth();
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>(initialCrop || 'all');
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});

  // Detail modal & gallery index
  const [selectedDisease, setSelectedDisease] = useState<DiseaseRecord | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Admin editor modal
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingDisease, setEditingDisease] = useState<Partial<DiseaseRecord>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    loadDiseases();
  }, []);

  useEffect(() => {
    if (initialCrop) setSelectedCropFilter(initialCrop);
  }, [initialCrop]);

  const loadDiseases = async () => {
    setLoading(true);
    try {
      const data = await fetchDiseases();
      setDiseases(data);
    } catch (err) {
      console.error('Failed to load diseases:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncStandard = async () => {
    setIsSyncing(true);
    setSyncSuccessMsg(null);
    try {
      const updated = await syncVerifiedDiseases();
      setDiseases(updated);
      setSyncSuccessMsg(`Đã cập nhật đủ ${updated.length} bệnh chuẩn vào sổ tra cứu.`);
      setTimeout(() => setSyncSuccessMsg(null), 4000);
    } catch (err: any) {
      console.error('Lỗi đồng bộ:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const cropCounts = useMemo(() => {
    return {
      all: diseases.length,
      citrus: diseases.filter((d) => d.cropType === 'citrus').length,
      rice: diseases.filter((d) => d.cropType === 'rice').length,
      peanut: diseases.filter((d) => d.cropType === 'peanut').length,
    };
  }, [diseases]);

  const filteredDiseases = diseases.filter((d) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      d.vietnameseName.toLowerCase().includes(q) ||
      d.englishName.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q) ||
      d.causes.toLowerCase().includes(q) ||
      (d.symptomChecklist && d.symptomChecklist.some((s) => s.toLowerCase().includes(q)));

    const matchesCrop = selectedCropFilter === 'all' || d.cropType === selectedCropFilter;
    return matchesSearch && matchesCrop;
  });

  const handleOpenDetail = (disease: DiseaseRecord) => {
    setSelectedDisease(disease);
    setActiveImageIndex(0);
  };

  const handleOpenAdd = () => {
    setEditingDisease({
      id: `disease_${Date.now()}`,
      cropType: 'citrus',
      vietnameseName: '',
      englishName: '',
      symptoms: '',
      affectedPlantParts: ['leaf'],
      causes: '',
      favorableConditions: '',
      preventionMethods: '',
      safeManagement: '',
      references: 'Viện Bảo vệ Thực vật Việt Nam',
      verificationStatus: 'verified',
      sampleImageUrl: '/images/citrus_leaf_hlb.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (disease: DiseaseRecord) => {
    setEditingDisease({ ...disease });
    setIsEditorOpen(true);
  };

  const handleSaveDisease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDisease.id || !editingDisease.vietnameseName || !editingDisease.cropType) return;

    setIsSaving(true);
    try {
      await saveDisease(editingDisease as DiseaseRecord);
      await loadDiseases();
      setIsEditorOpen(false);
      if (selectedDisease?.id === editingDisease.id) {
        setSelectedDisease(editingDisease as DiseaseRecord);
      }
    } catch (err) {
      console.error('Error saving disease:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDisease = async (id: string) => {
    await deleteDisease(id);
    await loadDiseases();
    if (selectedDisease?.id === id) setSelectedDisease(null);
  };

  const getCropInfo = (crop: CropType) => {
    switch (crop) {
      case 'citrus':
        return { label: 'Cây Cam, Bưởi', icon: '🍊' };
      case 'rice':
        return { label: 'Cây Lúa', icon: '🌾' };
      case 'peanut':
        return { label: 'Cây Lạc', icon: '🥜' };
    }
  };

  const getPlantPartLabel = (part: string) => {
    switch (part) {
      case 'leaf':
        return 'Lá';
      case 'stem':
        return 'Thân / Cành / Bẹ';
      case 'fruit':
        return 'Quả / Hạt / Củ';
      default:
        return 'Gốc / Rễ';
    }
  };

  const selectedImages = selectedDisease ? getDiseaseImages(selectedDisease) : [];
  const validSelectedImages = selectedImages.filter((img) => !failedUrls[img.url]);
  const currentDetailImage =
    validSelectedImages[activeImageIndex] || validSelectedImages[0] || selectedImages[0];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Sổ Tra Cứu Bệnh Cây ({diseases.length} bệnh)
          </h1>
          <p className="text-base text-stone-600 mt-1">
            Đối chiếu nhiều ảnh thực tế rõ nét, kiểm tra dấu hiệu và xem hướng dẫn xử lý từng bước cho Cam, Lúa, Lạc.
          </p>
        </div>

        {isAdmin && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSyncStandard}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 min-h-[44px] cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-700 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Đang cập nhật...' : 'Đồng bộ dữ liệu'}</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-700 text-white hover:bg-emerald-800 min-h-[44px] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm bệnh mới</span>
            </button>
          </div>
        )}
      </div>

      {syncSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-base text-emerald-900 font-semibold">
          {syncSuccessMsg}
        </div>
      )}

      {/* Search & Crop Filter Buttons */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Gõ tên bệnh hoặc dấu hiệu (ví dụ: vàng lá, đạo ôn, rầy nâu, thối gốc, sâu vẽ bùa)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-stone-300 text-base focus:outline-none focus:border-emerald-700 bg-stone-50/50"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
              aria-label="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `Tất cả cây (${cropCounts.all})` },
            { id: 'citrus', label: `🍊 Cây Cam, Bưởi (${cropCounts.citrus})` },
            { id: 'rice', label: `🌾 Cây Lúa (${cropCounts.rice})` },
            { id: 'peanut', label: `🥜 Cây Lạc (${cropCounts.peanut})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCropFilter(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold min-h-[44px] transition-colors cursor-pointer ${
                selectedCropFilter === tab.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards */}
      {loading ? (
        <div className="py-16 text-center text-base text-stone-500">Đang mở sổ bệnh cây...</div>
      ) : filteredDiseases.length === 0 ? (
        <div className="py-14 text-center bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
          <p className="text-lg font-bold text-stone-800">Không tìm thấy bệnh nào phù hợp.</p>
          <p className="text-base text-stone-600">Bác thử xóa ô tìm kiếm hoặc chọn "Tất cả cây" nhé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDiseases.map((disease) => {
            const crop = getCropInfo(disease.cropType);
            const images = getDiseaseImages(disease);
            const primaryImg = images.find((img) => !failedUrls[img.url]);
            return (
              <div
                key={disease.id}
                className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 overflow-hidden flex flex-col justify-between transition-colors shadow-2xs"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(disease)}
                    className="relative h-48 w-full bg-stone-100 overflow-hidden flex items-center justify-center cursor-pointer group text-left"
                  >
                    {primaryImg ? (
                      <img
                        src={primaryImg.url}
                        alt={disease.vietnameseName}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() =>
                          setFailedUrls((prev) => ({ ...prev, [primaryImg.url]: true }))
                        }
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-5xl" aria-hidden="true">
                        {crop.icon}
                      </span>
                    )}

                    {images.length > 1 && (
                      <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/80 text-white text-xs font-semibold backdrop-blur-xs">
                        <Images className="w-3.5 h-3.5" />
                        <span>{images.length} ảnh đối chiếu</span>
                      </span>
                    )}
                  </button>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-sm font-semibold text-emerald-800">
                      <span>
                        {crop.icon} {crop.label}
                      </span>
                      <span className="text-xs font-medium text-stone-500">
                        {disease.affectedPlantParts.map(getPlantPartLabel).slice(0, 2).join(' • ')}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-stone-900 leading-snug">
                      {disease.vietnameseName}
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600 line-clamp-3 leading-relaxed">
                      {disease.symptoms}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenDetail(disease)}
                    className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-base font-bold border border-emerald-200 cursor-pointer"
                  >
                    Xem ảnh đối chiếu & cách chữa
                  </button>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(disease)}
                        className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl cursor-pointer min-h-[44px]"
                        title="Sửa"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDisease(disease.id)}
                        className="p-2.5 text-stone-500 hover:text-red-700 hover:bg-red-50 rounded-xl cursor-pointer min-h-[44px]"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal with Multi-Photo Gallery, Symptom Checklist & Step-by-Step Treatment */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="sticky top-0 bg-white border-b border-stone-200 px-5 sm:px-6 py-4 flex items-start justify-between gap-3 z-20">
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none mt-0.5">
                  {getCropInfo(selectedDisease.cropType).icon}
                </span>
                <div>
                  <h3 className="font-bold text-xl text-stone-900 leading-tight">
                    {selectedDisease.vietnameseName}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    {selectedDisease.englishName} • Bộ phận hại:{' '}
                    {selectedDisease.affectedPlantParts.map(getPlantPartLabel).join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDisease(null)}
                className="p-2 rounded-xl hover:bg-stone-100 text-stone-600 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
                aria-label="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 text-base text-stone-800 leading-relaxed">
              {/* Multi-Photo Reference Gallery */}
              {selectedImages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                      <Images className="w-5 h-5 text-emerald-700" />
                      <span>Ảnh mẫu đối chiếu thực tế ({selectedImages.length} ảnh)</span>
                    </h4>
                    {selectedImages.length > 1 && (
                      <span className="text-sm font-semibold text-stone-500">
                        Ảnh {Math.min(activeImageIndex + 1, selectedImages.length)} / {selectedImages.length}
                      </span>
                    )}
                  </div>

                  <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
                    <div className="aspect-16/10 sm:aspect-16/9 flex items-center justify-center bg-stone-900">
                      {currentDetailImage && !failedUrls[currentDetailImage.url] ? (
                        <img
                          src={currentDetailImage.url}
                          alt={currentDetailImage.caption}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedUrls((prev) => ({
                              ...prev,
                              [currentDetailImage.url]: true,
                            }))
                          }
                          className="w-full h-full object-contain bg-stone-900"
                        />
                      ) : (
                        <div className="p-8 text-center text-stone-300 text-sm">
                          Không tải được ảnh đối chiếu này. Bác hãy bấm chọn ảnh khác bên dưới.
                        </div>
                      )}
                    </div>

                    {selectedImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev === 0 ? selectedImages.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
                          aria-label="Ảnh trước"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev === selectedImages.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
                          aria-label="Ảnh tiếp theo"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {currentDetailImage && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                      <span className="font-medium text-stone-800">
                        {currentDetailImage.caption}
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 shrink-0">
                        Nguồn: {currentDetailImage.source}
                      </span>
                    </div>
                  )}

                  {selectedImages.length > 1 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {selectedImages.map((img, idx) => {
                        const isActive = idx === activeImageIndex;
                        return (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative rounded-xl overflow-hidden aspect-4/3 border-2 transition-all cursor-pointer bg-stone-100 ${
                              isActive
                                ? 'border-emerald-700 ring-2 ring-emerald-200'
                                : 'border-stone-200 opacity-80 hover:opacity-100'
                            }`}
                          >
                            {!failedUrls[img.url] ? (
                              <img
                                src={img.url}
                                alt={img.caption}
                                referrerPolicy="no-referrer"
                                onError={() =>
                                  setFailedUrls((prev) => ({ ...prev, [img.url]: true }))
                                }
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-stone-500 p-1 block">Ảnh {idx + 1}</span>
                            )}
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/65 text-white text-[11px] font-bold">
                              Ảnh {idx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Signs & Symptom Checklist */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Dấu hiệu nhận biết ngoài đồng</span>
                </h4>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                  <p>{selectedDisease.symptoms}</p>
                  {selectedDisease.symptomChecklist && selectedDisease.symptomChecklist.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-stone-200">
                      {selectedDisease.symptomChecklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-stone-800">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Causes & Favorable Conditions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-base sm:text-lg text-stone-900">
                    Nguyên nhân gây bệnh
                  </h4>
                  <p className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-sm sm:text-base h-full">
                    {selectedDisease.causes}
                  </p>
                </div>

                {selectedDisease.favorableConditions && (
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-base sm:text-lg text-amber-950">
                      Điều kiện bệnh dễ phát sinh
                    </h4>
                    <p className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-sm sm:text-base h-full">
                      {selectedDisease.favorableConditions}
                    </p>
                  </div>
                )}
              </div>

              {/* Step-by-step Treatment Instructions */}
              <div className="space-y-3">
                <h4 className="font-bold text-lg text-emerald-950 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-emerald-700" />
                  <span>Hướng dẫn xử lý & phòng ngừa rõ ràng</span>
                </h4>

                {selectedDisease.treatmentSteps ? (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                      <p className="font-bold text-emerald-950">
                        1. Việc cần làm ngay hôm nay:
                      </p>
                      <ul className="space-y-1.5 list-disc pl-5 text-stone-800">
                        {selectedDisease.treatmentSteps.immediate.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200 space-y-2">
                      <p className="font-bold text-teal-950">
                        2. Cách trị an toàn & chăm sóc phục hồi:
                      </p>
                      <ul className="space-y-1.5 list-disc pl-5 text-stone-800">
                        {selectedDisease.treatmentSteps.biologicalAndCare.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                      {selectedDisease.preventionMethods && (
                        <p className="pt-2 border-t border-teal-200 text-stone-800">
                          <strong>Phòng cho vụ sau:</strong> {selectedDisease.preventionMethods}
                        </p>
                      )}
                    </div>

                    {selectedDisease.treatmentSteps.caution.length > 0 && (
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
                        <p className="font-bold text-amber-950 flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-amber-700" />
                          <span>3. Lưu ý quan trọng cần tránh:</span>
                        </p>
                        <ul className="space-y-1.5 list-disc pl-5 text-stone-800">
                          {selectedDisease.treatmentSteps.caution.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
                    <p>{selectedDisease.safeManagement}</p>
                    {selectedDisease.preventionMethods && (
                      <p className="pt-2 border-t border-emerald-200 text-stone-800">
                        <strong>Phòng ngừa:</strong> {selectedDisease.preventionMethods}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Authoritative References */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs sm:text-sm text-stone-600 flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-800">Tài liệu kiểm chứng: </span>
                  <span>{selectedDisease.references}</span>
                  {selectedDisease.standardCode && (
                    <span className="text-stone-500"> ({selectedDisease.standardCode})</span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 p-4 bg-stone-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {onScanWithDisease && (
                <button
                  onClick={() => {
                    onScanWithDisease(selectedDisease.cropType);
                    setSelectedDisease(null);
                  }}
                  className="min-h-[48px] px-5 py-2.5 rounded-xl text-base font-bold bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>Chụp ảnh kiểm tra cây này</span>
                </button>
              )}
              <button
                onClick={() => setSelectedDisease(null)}
                className="min-h-[48px] px-5 py-2.5 rounded-xl text-base font-semibold bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Editor Modal */}
      {isEditorOpen && isAdmin && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveDisease}
            className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-bold text-lg text-stone-900">
                {editingDisease.id ? 'Sửa thông tin bệnh' : 'Thêm bệnh mới'}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Loại cây *</label>
                <select
                  value={editingDisease.cropType || 'citrus'}
                  onChange={(e) => setEditingDisease({ ...editingDisease, cropType: e.target.value as CropType })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white"
                >
                  <option value="citrus">Cây Cam, Bưởi</option>
                  <option value="rice">Cây Lúa</option>
                  <option value="peanut">Cây Lạc</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Tên bệnh tiếng Việt *</label>
                <input
                  type="text"
                  required
                  value={editingDisease.vietnameseName || ''}
                  onChange={(e) => setEditingDisease({ ...editingDisease, vietnameseName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Dấu hiệu nhận biết *</label>
                <textarea
                  required
                  rows={3}
                  value={editingDisease.symptoms || ''}
                  onChange={(e) => setEditingDisease({ ...editingDisease, symptoms: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Nguyên nhân</label>
                <input
                  type="text"
                  value={editingDisease.causes || ''}
                  onChange={(e) => setEditingDisease({ ...editingDisease, causes: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Cách phòng ngừa</label>
                <textarea
                  rows={2}
                  value={editingDisease.preventionMethods || ''}
                  onChange={(e) => setEditingDisease({ ...editingDisease, preventionMethods: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Cách xử lý an toàn</label>
                <textarea
                  rows={2}
                  value={editingDisease.safeManagement || ''}
                  onChange={(e) => setEditingDisease({ ...editingDisease, safeManagement: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Đường dẫn ảnh mẫu chính</label>
                <input
                  type="text"
                  value={editingDisease.sampleImageUrl || ''}
                  onChange={(e) => setEditingDisease({ ...editingDisease, sampleImageUrl: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="min-h-[44px] px-4 py-2 rounded-xl font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="min-h-[44px] px-5 py-2 rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer disabled:opacity-50"
              >
                {isSaving ? 'Đang lưu...' : 'Lưu lại'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
