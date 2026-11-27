import React from 'react';
import { ShieldCheck, Camera, History } from 'lucide-react';
import { ScanTrustSummary } from '../../services/diagnosisService';

interface SuccessfulScansBannerProps {
  stats: ScanTrustSummary | null;
  loading?: boolean;
  onStartScan: () => void;
  onViewHistory: () => void;
}

export const SuccessfulScansBanner: React.FC<SuccessfulScansBannerProps> = ({
  stats,
  loading = false,
  onStartScan,
  onViewHistory,
}) => {
  const totalScans = stats?.totalSuccessfulScans ?? 0;
  const userScans = stats?.userSuccessfulScans ?? 0;
  const verifiedDiseases = stats?.verifiedDiseaseCount ?? 132;
  const citrusCount = stats?.byCrop.citrus ?? 0;
  const riceCount = stats?.byCrop.rice ?? 0;
  const peanutCount = stats?.byCrop.peanut ?? 0;

  return (
    <section
      aria-label="Thống kê lượt quét bệnh thành công"
      className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Prominent Verified Scan Count */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-emerald-800">
              Tin cậy cùng bà con nhà nông
            </p>
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums tracking-tight">
                {loading ? '—' : totalScans.toLocaleString('vi-VN')}
              </span>
              <span className="text-base sm:text-lg font-bold text-stone-800">
                lượt quét bệnh thành công
              </span>
            </div>
            <p className="text-sm sm:text-base text-stone-600 leading-snug">
              Đối chiếu trực tiếp từ kho {verifiedDiseases.toLocaleString('vi-VN')} bệnh chuẩn trên cây Cam, Lúa và Lạc.
            </p>
          </div>
        </div>

        {/* Right: Clean Unboxed Breakdown & Direct Action */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row sm:items-center md:items-end lg:items-center justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-stone-200 md:pl-6 shrink-0">
          <div className="space-y-1 text-sm text-stone-600 md:text-right lg:text-left">
            {totalScans > 0 ? (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-stone-700 tabular-nums">
                <span>Cam, Bưởi: {citrusCount.toLocaleString('vi-VN')}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Lúa: {riceCount.toLocaleString('vi-VN')}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Lạc: {peanutCount.toLocaleString('vi-VN')}</span>
              </div>
            ) : (
              <p className="font-medium text-stone-700">
                Sẵn sàng ghi nhận lượt khám đầu tiên của bác
              </p>
            )}
            <p className="text-xs sm:text-sm text-stone-500">
              {userScans > 0
                ? `Trong máy của bác đã lưu ${userScans.toLocaleString('vi-VN')} lần khám thành công`
                : 'Kết quả hoàn toàn bằng tiếng Việt, dễ đọc và dễ làm theo'}
            </p>
          </div>

          {userScans > 0 ? (
            <button
              type="button"
              onClick={onViewHistory}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-400 text-stone-800 hover:text-emerald-900 text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <History className="w-4 h-4 shrink-0" />
              <span>Xem các lần đã khám</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartScan}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span>Chụp khám ngay</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
