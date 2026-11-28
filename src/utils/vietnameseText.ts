const VIETNAMESE_DIACRITIC_REGEX =
  /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

/**
 * Removes parentheticals that contain only English/Latin words (no Vietnamese diacritics)
 * while preserving Vietnamese explanations such as "(Đạo ôn lá & Cổ bông)" or "(20 cm)".
 */
export function stripEnglishParentheticals(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let text = input.replace(/\s*\(([^()]*)\)/g, (fullMatch, inner: string) => {
    const trimmed = inner.trim();
    if (!trimmed) return '';
    // Keep purely numeric / measurement notes like (20 cm), (15-25 cm), (1-2 ngày)
    if (/^\d[\d\s.,/-]*(?:cm|mm|m|kg|g|ml|l|%)?$/i.test(trimmed)) {
      return fullMatch;
    }
    // Keep if it contains Vietnamese diacritics and is not predominantly English/Latin with a hyphen
    if (VIETNAMESE_DIACRITIC_REGEX.test(trimmed)) {
      // Remove trailing English/code suffix after " - " inside Vietnamese parenthetical, e.g. "(Cây cao vống thối gốc - Bakanae)"
      const cleanedInner = trimmed.replace(/\s*[-–]\s*[A-Za-z][A-Za-z0-9\s/.'-]*$/, '').trim();
      return cleanedInner ? ` (${cleanedInner})` : '';
    }
    // Contains ASCII letters without Vietnamese diacritics -> English/Latin name or acronym
    if (/[A-Za-z]/.test(trimmed)) {
      return '';
    }
    return fullMatch;
  });

  text = text.replace(/\s{2,}/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
  return text;
}

const COMMON_OTHER_CROPS_VI: [RegExp, string][] = [
  [/\bguava\b|psidium\s+guajava/i, 'Cây Ổi'],
  [/\bmango\b|mangifera\s+indica/i, 'Cây Xoài'],
  [/\bbanana\b|musa\b/i, 'Cây Chuối'],
  [/\bjackfruit\b|artocarpus/i, 'Cây Mít'],
  [/\bpapaya\b|carica\s+papaya/i, 'Cây Đu đủ'],
  [/\b(?:lychee|litchi)\b/i, 'Cây Vải'],
  [/\blongan\b|dimocarpus/i, 'Cây Nhãn'],
  [/\bdragon\s*fruit\b|pitaya/i, 'Cây Thanh long'],
  [/\bdurian\b/i, 'Cây Sầu riêng'],
  [/\bavocado\b/i, 'Cây Bơ'],
  [/\btomato\b/i, 'Cây Cà chua'],
  [/\b(?:chili|chilli|pepper)\b/i, 'Cây Ớt'],
  [/\b(?:corn|maize)\b/i, 'Cây Ngô'],
  [/\bcoffee\b/i, 'Cây Cà phê'],
  [/\btea\s+plant\b|camellia\s+sinensis/i, 'Cây Chè'],
  [/\bcassava\b/i, 'Cây Sắn'],
  [/\bsweet\s+potato\b/i, 'Cây Khoai lang'],
  [/\bsoybean\b/i, 'Cây Đậu tương'],
  [/\bapple\b/i, 'Cây Táo'],
  [/\bgrape\b/i, 'Cây Nho'],
  [/\bcucumber\b/i, 'Cây Dưa chuột'],
  [/\bwatermelon\b/i, 'Cây Dưa hấu'],
  [/\bstar\s*fruit\b|carambola/i, 'Cây Khế'],
  [/\bcustard\s*apple\b|soursop/i, 'Cây Na / Mãng cầu'],
  [/\bpersimmon\b/i, 'Cây Hồng'],
  [/\bplum\b/i, 'Cây Mận'],
  [/\bpeach\b/i, 'Cây Đào'],
  [/\brose\b/i, 'Cây Hoa hồng'],
  [/\borchid\b/i, 'Cây Hoa lan'],
];

export function resolveSupportedCropType(cropDetected?: string): 'citrus' | 'rice' | 'peanut' | null {
  const raw = (cropDetected || '').trim().toLowerCase();
  if (!raw) return null;

  if (
    /(^|[\s,(/-])cam($|[\s,)/-])/.test(raw) ||
    raw.includes('bưởi') ||
    raw.includes('chanh') ||
    raw.includes('quýt') ||
    raw.includes('có múi') ||
    raw.includes('citrus') ||
    raw.includes('orange') ||
    raw.includes('pomelo') ||
    raw.includes('lemon') ||
    raw.includes('mandarin') ||
    raw.includes('tangerine')
  ) {
    return 'citrus';
  }
  if (
    /(^|[\s,(/-])lúa($|[\s,)/-])/.test(raw) ||
    raw.includes('cây lúa') ||
    raw.includes('rice') ||
    raw.includes('paddy') ||
    raw.includes('oryza')
  ) {
    return 'rice';
  }
  if (
    /(^|[\s,(/-])lạc($|[\s,)/-])/.test(raw) ||
    raw.includes('cây lạc') ||
    raw.includes('đậu phộng') ||
    raw.includes('peanut') ||
    raw.includes('groundnut') ||
    raw.includes('arachis')
  ) {
    return 'peanut';
  }
  return null;
}

export function toPureVietnameseCropLabel(
  cropDetected?: string,
  fallbackCrop?: string,
  selectedCropMatches: boolean = true
): string {
  const supported = resolveSupportedCropType(cropDetected);
  if (supported) {
    // Guard against illogical contradiction: if selectedCropMatches is false,
    // never label the detected crop as the exact same crop the user selected.
    if (!selectedCropMatches && fallbackCrop && supported === fallbackCrop) {
      return 'một loại cây trồng khác';
    }
    if (supported === 'citrus') return 'Cây Cam, Bưởi';
    if (supported === 'rice') return 'Cây Lúa';
    if (supported === 'peanut') return 'Cây Lạc';
  }

  const rawTrimmed = (cropDetected || '').trim();
  if (rawTrimmed) {
    for (const [pattern, viName] of COMMON_OTHER_CROPS_VI) {
      if (pattern.test(rawTrimmed)) {
        return viName;
      }
    }
    const cleaned = stripEnglishParentheticals(rawTrimmed);
    if (cleaned && VIETNAMESE_DIACRITIC_REGEX.test(cleaned)) {
      return cleaned;
    }
  }

  if (!selectedCropMatches) {
    return 'một loại cây trồng khác';
  }

  if (fallbackCrop === 'citrus') return 'Cây Cam, Bưởi';
  if (fallbackCrop === 'rice') return 'Cây Lúa';
  if (fallbackCrop === 'peanut') return 'Cây Lạc';
  return stripEnglishParentheticals(rawTrimmed) || 'Cây trồng';
}

const ENGLISH_TERM_REPLACEMENTS: [RegExp, string][] = [
  [/\bGoogle\s+Search\b/gi, 'tra cứu đối chiếu trực tuyến'],
  [/\bSearch\s+Grounding\b/gi, 'đối chiếu tài liệu trực tuyến'],
  [/\bHuanglongbing\b/gi, 'vàng lá gân xanh'],
  [/\bHLB\b/g, 'vàng lá gân xanh'],
  [/\bIPM\b/g, 'phòng trừ tổng hợp'],
  [/\bPCR\b/g, 'xét nghiệm chuyên sâu'],
  [/\bCandidatus\s+Liberibacter(?:\s+asiaticus)?\b/gi, 'vi khuẩn gây bệnh vàng lá gân xanh'],
  [/\bXanthomonas(?:\s+citri|\s+oryzae)?\b/gi, 'vi khuẩn gây hại'],
  [/\bPhytophthora\b/gi, 'nấm gây thối gốc chảy nhựa'],
  [/\bMagnaporthe\s+oryzae\b/gi, 'nấm đạo ôn'],
  [/\bRhizoctonia\s+solani\b/gi, 'nấm khô vằn'],
  [/\bCercospora\b/gi, 'nấm đốm lá'],
  [/\bPuccinia\b/gi, 'nấm gỉ sắt'],
  [/\bAspergillus(?:\s+flavus|\s+niger)?\b/gi, 'nấm mốc'],
  [/\bAflatoxin\b/gi, 'độc tố nấm mốc'],
  [/\bTristeza\s*\/\s*/gi, ''],
  [/\bTristeza\b/gi, 'tàn lụi vi-rút'],
  [/\bExocortis\s*\/\s*/gi, ''],
  [/\bExocortis\b/gi, 'vỏ tróc vi-rút'],
  [/\bFusarium\b/gi, 'nấm héo rũ'],
  [/\bScirtothrips\b/gi, 'hại cam chanh'],
  [/\bVirus\b/gi, 'vi-rút'],
  [/\bblotchy\s+mottle\b/gi, 'vàng loang lổ không đều'],
  [/\bZinc\s+deficiency\b/gi, 'thiếu kẽm'],
  [/\bMagnesium\s+deficiency\b/gi, 'thiếu ma-giê'],
  [/\bIron\s+deficiency\b/gi, 'thiếu sắt'],
  [/\bNitrogen\s+deficiency\b/gi, 'thiếu đạm'],
  [/\bPotassium\s+deficiency\b/gi, 'thiếu ka-li'],
  [/\bout-of-focus\b/gi, 'mất nét'],
  [/\bblurry\b/gi, 'bị mờ'],
  [/\bAPI\b/g, 'hệ thống'],
];

export function cleanVietnameseText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let text = stripEnglishParentheticals(input);
  for (const [pattern, replacement] of ENGLISH_TERM_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  return text.replace(/\s{2,}/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
}

export function sanitizeDiagnosisResultToVietnamese(result: any, fallbackCrop?: string): any {
  if (!result || typeof result !== 'object') return result;

  const cleanArray = (arr: any): string[] =>
    Array.isArray(arr)
      ? arr
          .map((item) => cleanVietnameseText(String(item || '')))
          .filter((item) => item.length > 0)
      : [];

  return {
    ...result,
    cropDetected: toPureVietnameseCropLabel(
      result.cropDetected,
      fallbackCrop,
      result.selectedCropMatches !== false
    ),
    qualityIssues: cleanArray(result.qualityIssues),
    symptoms: cleanArray(result.symptoms),
    possibleDiagnoses: Array.isArray(result.possibleDiagnoses)
      ? result.possibleDiagnoses.slice(0, 3).map((diag: any) => ({
          ...diag,
          diseaseName: cleanVietnameseText(String(diag?.diseaseName || '')),
          evidence: cleanArray(diag?.evidence),
        }))
      : [],
    alternativeCauses: cleanArray(result.alternativeCauses),
    differentialExplanation: result.differentialExplanation
      ? cleanVietnameseText(String(result.differentialExplanation))
      : '',
    differentialDiseases: Array.isArray(result.differentialDiseases)
      ? result.differentialDiseases.slice(0, 3).map((item: any) => ({
          ...item,
          diseaseName: cleanVietnameseText(String(item?.diseaseName || '')),
          matchingSignsOnImage: cleanArray(item?.matchingSignsOnImage),
          distinguishingFeatures: cleanArray(item?.distinguishingFeatures),
          referenceComparison: cleanVietnameseText(String(item?.referenceComparison || '')),
          whyRankedHere: cleanVietnameseText(String(item?.whyRankedHere || '')),
        }))
      : undefined,
    comparisonMatrix: result.comparisonMatrix
      ? {
          sharedSymptoms: cleanArray(result.comparisonMatrix.sharedSymptoms),
          rows: Array.isArray(result.comparisonMatrix.rows)
            ? result.comparisonMatrix.rows.map((row: any) => ({
                criterion: cleanVietnameseText(String(row?.criterion || '')),
                observedOnPhoto: cleanVietnameseText(String(row?.observedOnPhoto || '')),
                diseaseDetails: Array.isArray(row?.diseaseDetails)
                  ? row.diseaseDetails.slice(0, 3).map((dd: any) => ({
                      diseaseName: cleanVietnameseText(String(dd?.diseaseName || '')),
                      detail: cleanVietnameseText(String(dd?.detail || '')),
                    }))
                  : [],
              }))
            : [],
        }
      : undefined,
    evidenceItems: Array.isArray(result.evidenceItems)
      ? result.evidenceItems.map((ev: any) => ({
          sourceTitle: String(ev?.sourceTitle || '').trim(),
          domain: String(ev?.domain || '').trim(),
          sourceCategory: cleanVietnameseText(String(ev?.sourceCategory || 'Tài liệu trực tuyến')),
          url: String(ev?.url || '').trim(),
          evidenceExcerpt: cleanVietnameseText(String(ev?.evidenceExcerpt || '')),
        }))
      : undefined,
    verification: result.verification
      ? {
          ...result.verification,
          initialHypothesis: cleanVietnameseText(String(result.verification.initialHypothesis || '')),
          finalConclusion: cleanVietnameseText(String(result.verification.finalConclusion || '')),
          verifierModelLabel: cleanVietnameseText(String(result.verification.verifierModelLabel || '')),
          consistentPoints: cleanArray(result.verification.consistentPoints),
          contradictionsOrUncertainties: cleanArray(result.verification.contradictionsOrUncertainties),
          limitations: cleanArray(result.verification.limitations),
        }
      : undefined,
    reliability: result.reliability
      ? {
          ...result.reliability,
          evidenceCompletenessNote: cleanVietnameseText(
            String(result.reliability.evidenceCompletenessNote || '')
          ),
          sourceAgreementNote: cleanVietnameseText(String(result.reliability.sourceAgreementNote || '')),
          visualSimilarityNote: cleanVietnameseText(String(result.reliability.visualSimilarityNote || '')),
          summary: cleanVietnameseText(String(result.reliability.summary || '')),
          lowConfidenceAction: result.reliability.lowConfidenceAction
            ? cleanVietnameseText(String(result.reliability.lowConfidenceAction))
            : undefined,
        }
      : undefined,
    treatmentGuide: result.treatmentGuide
      ? {
          cause: cleanVietnameseText(String(result.treatmentGuide.cause || '')),
          recognitionSigns: cleanArray(result.treatmentGuide.recognitionSigns),
          favorableConditions: cleanVietnameseText(String(result.treatmentGuide.favorableConditions || '')),
          cultivationAndPrevention: cleanArray(result.treatmentGuide.cultivationAndPrevention),
          professionalHandling: cleanArray(result.treatmentGuide.professionalHandling),
          pesticideSafetyNote: cleanVietnameseText(String(result.treatmentGuide.pesticideSafetyNote || '')),
          immediate24hSteps: cleanArray(result.treatmentGuide.immediate24hSteps),
          careNext3To7Days: cleanArray(result.treatmentGuide.careNext3To7Days),
          mildVsSevereGuide: result.treatmentGuide.mildVsSevereGuide
            ? {
                mildCase: cleanVietnameseText(String(result.treatmentGuide.mildVsSevereGuide.mildCase || '')),
                severeCase: cleanVietnameseText(String(result.treatmentGuide.mildVsSevereGuide.severeCase || '')),
              }
            : undefined,
          suggestedActiveIngredients: Array.isArray(result.treatmentGuide.suggestedActiveIngredients)
            ? result.treatmentGuide.suggestedActiveIngredients
                .map((item: any) => String(item || '').trim())
                .filter((item: string) => item.length > 0)
            : [],
          suggestedPesticides: Array.isArray(result.treatmentGuide.suggestedPesticides)
            ? result.treatmentGuide.suggestedPesticides
                .filter((p: any) => p && typeof p === 'object' && String(p.productOrIngredientName || '').trim())
                .map((p: any) => ({
                  productOrIngredientName: String(p.productOrIngredientName || '').trim(),
                  activeIngredient: String(p.activeIngredient || '').trim(),
                  category: ['biological', 'chemical', 'mineral', 'none'].includes(p.category)
                    ? p.category
                    : 'chemical',
                  targetUse: cleanVietnameseText(String(p.targetUse || '')),
                  sprayGuidance: cleanVietnameseText(String(p.sprayGuidance || '')),
                  googleSearchQuery: String(p.googleSearchQuery || p.productOrIngredientName || '').trim(),
                }))
            : undefined,
          doList: cleanArray(result.treatmentGuide.doList),
          dontList: cleanArray(result.treatmentGuide.dontList),
          recoveryCheckSigns: cleanArray(result.treatmentGuide.recoveryCheckSigns),
        }
      : undefined,
    additionalImageInstructions: cleanArray(result.additionalImageInstructions),
    recommendations: cleanArray(result.recommendations),
    actionPlan: result.actionPlan
      ? {
          immediateSteps: cleanArray(result.actionPlan.immediateSteps),
          safeCareAndPrevention: cleanArray(result.actionPlan.safeCareAndPrevention),
          importantWarnings: cleanArray(result.actionPlan.importantWarnings),
        }
      : undefined,
    disclaimer: result.disclaimer ? cleanVietnameseText(String(result.disclaimer)) : '',
    googleSearchNotice: result.googleSearchNotice
      ? cleanVietnameseText(String(result.googleSearchNotice))
      : undefined,
  };
}
