export function buildGoogleMedicineSearchUrl(
  medicineOrIngredient: string,
  diseaseName?: string,
  cropLabel?: string
): string {
  const cleanMed = (medicineOrIngredient || '').trim();
  const cleanDisease = (diseaseName || '')
    .replace(/^Bệnh\s+/i, '')
    .replace(/\([^)]*\)/g, '')
    .trim();
  const cleanCrop = (cropLabel || '').trim();

  const parts: string[] = [];
  if (cleanMed) {
    parts.push(cleanMed);
  }
  if (!/thuốc|chế phẩm|dầu khoáng|booc-đô|nấm đối kháng/i.test(cleanMed)) {
    parts.unshift('thuốc bảo vệ thực vật');
  }
  if (cleanDisease && !cleanMed.toLowerCase().includes(cleanDisease.toLowerCase())) {
    parts.push(`trị ${cleanDisease}`);
  }
  if (cleanCrop && !cleanMed.toLowerCase().includes(cleanCrop.toLowerCase())) {
    parts.push(cleanCrop);
  }
  parts.push('cách dùng');

  const query = parts.join(' ').replace(/\s+/g, ' ').trim();
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function buildRawGoogleSearchUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent((query || '').trim())}`;
}

const KNOWN_MEDICINE_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /booc-đô|bordeaux/i, label: 'Dung dịch Booc-đô 1% (gốc đồng)' },
  { pattern: /đồng\s*oxy\s*clorua|copper\s*oxychloride/i, label: 'Thuốc gốc đồng Copper Oxychloride' },
  { pattern: /đồng\s*hydro\s*xit|copper\s*hydroxide/i, label: 'Thuốc gốc đồng Copper Hydroxide' },
  { pattern: /thuốc\s*gốc\s*đồng|gốc\s*đồng/i, label: 'Thuốc gốc đồng sinh học' },
  { pattern: /dầu\s*khoáng\s*nông\s*nghiệp|dầu\s*khoáng/i, label: 'Dầu khoáng nông nghiệp' },
  { pattern: /trichoderma/i, label: 'Chế phẩm nấm đối kháng Trichoderma' },
  { pattern: /bacillus\s*subtilis/i, label: 'Chế phẩm vi khuẩn đối kháng Bacillus subtilis' },
  { pattern: /tricyclazole/i, label: 'Thuốc đặc trị Tricyclazole' },
  { pattern: /isoprothiolane/i, label: 'Thuốc đặc trị Isoprothiolane' },
  { pattern: /azoxystrobin/i, label: 'Hoạt chất Azoxystrobin' },
  { pattern: /difenoconazole/i, label: 'Hoạt chất Difenoconazole' },
  { pattern: /propiconazole/i, label: 'Hoạt chất Propiconazole' },
  { pattern: /hexaconazole/i, label: 'Hoạt chất Hexaconazole' },
  { pattern: /tebuconazole/i, label: 'Hoạt chất Tebuconazole' },
  { pattern: /validamycin/i, label: 'Thuốc đặc trị Validamycin' },
  { pattern: /kasugamycin/i, label: 'Thuốc đặc trị Kasugamycin' },
  { pattern: /streptomycin|oxytetracycline/i, label: 'Thuốc trừ vi khuẩn nông nghiệp' },
  { pattern: /mancozeb/i, label: 'Hoạt chất Mancozeb' },
  { pattern: /chlorothalonil/i, label: 'Hoạt chất Chlorothalonil' },
  { pattern: /metalaxyl|fosetyl/i, label: 'Hoạt chất Metalaxyl / Fosetyl-Al' },
  { pattern: /abamectin/i, label: 'Hoạt chất sinh học Abamectin' },
  { pattern: /emamectin/i, label: 'Hoạt chất Emamectin benzoate' },
  { pattern: /spinosad|spinetoram/i, label: 'Hoạt chất sinh học Spinetoram / Spinosad' },
  { pattern: /imidacloprid/i, label: 'Hoạt chất Imidacloprid' },
  { pattern: /thiamethoxam/i, label: 'Hoạt chất Thiamethoxam' },
  { pattern: /dinotefuran/i, label: 'Hoạt chất Dinotefuran' },
  { pattern: /pymetrozine/i, label: 'Hoạt chất Pymetrozine' },
  { pattern: /buprofezin/i, label: 'Hoạt chất Buprofezin' },
  { pattern: /propargite|pyridaben|fenpyroximate|diafenthiuron/i, label: 'Thuốc đặc trị nhện hại cây' },
  { pattern: /lưu\s*huỳnh|sulfur/i, label: 'Thuốc gốc lưu huỳnh sinh học' },
  { pattern: /nano\s*bạc|chitosan/i, label: 'Chế phẩm sinh học Chitosan / Nano' },
  { pattern: /tinh\s*dầu\s*neem|neem|azadirachtin/i, label: 'Chế phẩm sinh học dầu Neem (Azadirachtin)' },
  { pattern: /nấm\s*xanh|metarhizium|beauveria/i, label: 'Chế phẩm nấm xanh / nấm trắng diệt sâu rầy' },
  { pattern: /bt\b|bacillus\s*thuringiensis/i, label: 'Chế phẩm vi sinh Bt (Bacillus thuringiensis)' },
  { pattern: /vôi\s*bột|nước\s*vôi/i, label: 'Vôi bột nông nghiệp khử khuẩn đất' },
];

export function extractMedicinesFromText(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const found: string[] = [];
  for (const item of KNOWN_MEDICINE_PATTERNS) {
    if (item.pattern.test(text) && !found.includes(item.label)) {
      found.push(item.label);
    }
  }
  return found.slice(0, 5);
}
