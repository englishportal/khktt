var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/vercelHandler.ts
var vercelHandler_exports = {};
__export(vercelHandler_exports, {
  default: () => handler
});
module.exports = __toCommonJS(vercelHandler_exports);

// server/app.ts
var import_express2 = __toESM(require("express"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");

// src/data/defaultDiseases.ts
var DEFAULT_DISEASES = [
  // ==========================================
  // 1. CÂY CAM, QUÝT, BƯỞI (10 BỆNH / DỊCH HẠI)
  // ==========================================
  {
    id: "citrus_greening",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh V\xE0ng l\xE1 g\xE2n xanh (Huanglongbing - HLB)",
    englishName: "Citrus Greening / Huanglongbing",
    symptoms: "L\xE1 xu\u1EA5t hi\u1EC7n c\xE1c m\u1EA3ng m\xE0u v\xE0ng loang l\u1ED5 (blotchy mottle) kh\xF4ng \u0111\u1ED1i x\u1EE9ng qua g\xE2n ch\xEDnh. G\xE2n l\xE1 n\u1ED5i g\u1ED3 gh\u1EC1, \u0111\xF4i khi h\xF3a b\u1EA7n. L\xE1 non m\u1ECDc th\u1EB3ng \u0111\u1EE9ng nh\u01B0 tai th\u1ECF. Qu\u1EA3 nh\u1ECF, m\xE9o m\xF3 l\u1EC7ch t\xE2m, khi ch\xEDn m\xE0u v\xE0ng \u1EDF cu\u1ED1ng tr\u01B0\u1EDBc, h\u1EA1t l\xE9p m\xE0u n\xE2u \u0111en, t\xE9p c\xF3 v\u1ECB chua \u0111\u1EAFng.",
    symptomChecklist: [
      "L\xE1 gi\xE0 c\xF3 \u0111\u1ED1m v\xE0ng loang l\u1ED5 kh\xF4ng \u0111\u1EC1u hai b\xEAn g\xE2n ch\xEDnh (kh\xE1c v\u1EDBi thi\u1EBFu k\u1EBDm th\u01B0\u1EDDng \u0111\u1ED1i x\u1EE9ng).",
      "G\xE2n l\xE1 s\u01B0ng n\u1ED5i g\u1ED3 gh\u1EC1, s\u1EDD h\u01A1i c\u1EE9ng; \u0111\u1ECDt non m\u1ECDc th\u1EB3ng \u0111\u1EE9ng nh\u1ECF h\u1EB9p nh\u01B0 tai th\u1ECF.",
      "Qu\u1EA3 nh\u1ECF, v\u1EB9o l\u1EC7ch t\xE2m, \u0111\xEDt qu\u1EA3 c\xF2n xanh trong khi ph\u1EA7n cu\u1ED1ng ng\u1EA3 v\xE0ng tr\u01B0\u1EDBc, h\u1EA1t b\u1ECB thui \u0111en.",
      "Quan s\xE1t m\u1EB7t d\u01B0\u1EDBi \u0111\u1ECDt non c\xF3 th\u1EC3 th\u1EA5y r\u1EA7y ch\u1ED5ng c\xE1nh nh\u1ECF m\xE0u n\xE2u x\xE1m \u0111\u1EADu ch\xE9o 45 \u0111\u1ED9."
    ],
    affectedPlantParts: ["leaf", "fruit", "stem"],
    causes: "Vi khu\u1EA9n n\u1ED9i b\xE0o Candidatus Liberibacter asiaticus s\u1ED1ng trong m\u1EA1ch libe, truy\u1EC1n lan qua c\xF4n tr\xF9ng m\xF4i gi\u1EDBi r\u1EA7y ch\u1ED5ng c\xE1nh (Diaphorina citri) v\xE0 qua m\u1EAFt gh\xE9p.",
    favorableConditions: "Th\u1EDDi ti\u1EBFt \u1EA5m \u1EA9m 25-30\xB0C trong c\xE1c \u0111\u1EE3t l\u1ED9c non c\xE2y cam qu\xFDt v\u1EE5 xu\xE2n v\xE0 v\u1EE5 thu t\u1EA1i Ngh\u1EC7 An (Cam Vinh, Qu\u1EF3 H\u1EE3p), H\xE0 T\u0129nh (H\u01B0\u01A1ng S\u01A1n, Khe M\xE2y).",
    preventionMethods: "S\u1EED d\u1EE5ng c\xE2y gi\u1ED1ng s\u1EA1ch b\u1EC7nh c\xF3 ch\u1EE9ng nh\u1EADn t\u1EEB nh\xE0 l\u01B0\u1EDBi c\xE1ch ly. Tr\u1ED3ng c\xE2y ch\u1EAFn gi\xF3 (nh\u01B0 \u1ED5i xen canh) v\xE0 gi\u1EEF ki\u1EBFn v\xE0ng t\u1EF1 nhi\xEAn \u0111\u1EC3 xua \u0111u\u1ED5i r\u1EA7y ch\u1ED5ng c\xE1nh.",
    safeManagement: "C\u1EAFt t\u1EC9a ho\u1EB7c ch\u1EB7t b\u1ECF ti\xEAu h\u1EE7y tri\u1EC7t \u0111\u1EC3 c\xE2y nhi\u1EC5m n\u1EB7ng \u0111\u1EC3 c\u1EAFt ngu\u1ED3n l\xE2y. Treo b\u1EABy d\xEDnh v\xE0ng theo d\xF5i r\u1EA7y ch\u1ED5ng c\xE1nh, b\u1EA3o v\u1EC7 c\xE1c \u0111\u1EE3t l\u1ED9c non b\u1EB1ng d\u1EA7u kho\xE1ng n\xF4ng nghi\u1EC7p ho\u1EB7c ch\u1EBF ph\u1EA9m sinh h\u1ECDc \u0111\xFAng th\u1EDDi \u0111i\u1EC3m.",
    treatmentSteps: {
      immediate: [
        "\u0110\xE1nh d\u1EA5u c\xE2y c\xF3 tri\u1EC7u ch\u1EE9ng l\xE1 v\xE0ng loang l\u1ED5 l\u1EC7ch g\xE2n v\xE0 ki\u1EC3m tra xem c\xF3 r\u1EA7y ch\u1ED5ng c\xE1nh tr\xEAn \u0111\u1ECDt non kh\xF4ng.",
        "N\u1EBFu c\xE2y m\u1EDBi ch\u1EDBm 1-2 c\xE0nh, c\u1EAFt b\u1ECF ngay c\xE0nh b\u1EC7nh; n\u1EBFu c\xE2y \u0111\xE3 v\xE0ng qu\xE1 1/3 t\xE1n, c\u1EA7n ch\u1EB7t b\u1ECF c\u1EA3 g\u1ED1c \u0111\u1EC3 tr\xE1nh l\xE2y sang c\u1EA3 v\u01B0\u1EDDn.",
        "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng l\u1EA5y m\u1EAFt gh\xE9p ho\u1EB7c c\xE0nh chi\u1EBFt t\u1EEB v\u01B0\u1EDDn \u0111ang c\xF3 bi\u1EC3u hi\u1EC7n b\u1EC7nh v\xE0ng l\xE1 g\xE2n xanh."
      ],
      biologicalAndCare: [
        "Phun d\u1EA7u kho\xE1ng n\xF4ng nghi\u1EC7p ho\u1EB7c ch\u1EBF ph\u1EA9m sinh h\u1ECDc tr\u1EEB r\u1EA7y ch\u1ED5ng c\xE1nh ngay khi c\xE2y v\u1EEBa nh\xFA m\u1EA7m l\u1ED9c non 1-2 cm.",
        "B\xF3n ph\xE2n h\u1EEFu c\u01A1 hoai m\u1EE5c k\u1EBFt h\u1EE3p ch\u1EBF ph\u1EA9m Trichoderma v\xE0 vi l\u01B0\u1EE3ng (k\u1EBDm, magie, bo) gi\xFAp b\u1ED9 r\u1EC5 kh\u1ECFe, h\u1EA1n ch\u1EBF suy c\xE2y.",
        "Treo b\u1EABy d\xEDnh m\xE0u v\xE0ng xung quanh r\xECa v\u01B0\u1EDDn \u0111\u1EC3 ph\xE1t hi\u1EC7n s\u1EDBm r\u1EA7y tr\u01B0\u1EDFng th\xE0nh bay v\xE0o."
      ],
      caution: [
        "B\u1EC7nh do vi khu\u1EA9n s\u1ED1ng trong m\u1EA1ch d\u1EABn n\xEAn KH\xD4NG c\xF3 thu\u1ED1c h\xF3a h\u1ECDc n\xE0o ch\u1EEFa kh\u1ECFi ho\xE0n to\xE0n c\xE2y \u0111\xE3 nhi\u1EC5m n\u1EB7ng.",
        "Kh\xF4ng phun ph\xE2n b\xF3n l\xE1 \u0111\u1EA1m cao li\xEAn t\u1EE5c khi ch\u01B0a x\u1EED l\xFD r\u1EA7y, v\xEC ra l\u1ED9c non nhi\u1EC1u s\u1EBD thu h\xFAt r\u1EA7y ch\u1ED5ng c\xE1nh b\xF9ng ph\xE1t m\u1EA1nh h\u01A1n."
      ]
    },
    references: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; Vi\u1EC7n KHKT N\xF4ng nghi\u1EC7p B\u1EAFc Trung B\u1ED9 (ASIR); USDA-APHIS.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam & Vi\u1EC7n ASIR",
    standardCode: "QCVN 01-165:2014/BNNPTNT",
    reviewDate: "2026-03-01",
    sampleImageUrl: "/images/citrus_leaf_hlb.jpg",
    galleryImages: [
      {
        url: "/images/citrus_leaf_hlb.jpg",
        caption: "L\xE1 cam b\u1ECB v\xE0ng loang l\u1ED5 g\xE2n xanh m\u1EABu th\u1EF1c \u0111\u1ECBa B\u1EAFc Trung B\u1ED9",
        source: "Vi\u1EC7n ASIR (M\u1EABu ki\u1EC3m ch\u1EE9ng)"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Citrus_greening.JPG/960px-Citrus_greening.JPG",
        caption: "V\u1EBFt v\xE0ng loang l\u1ED5 kh\xF4ng \u0111\u1ED1i x\u1EE9ng tr\xEAn l\xE1 v\xE0 qu\u1EA3 m\xE9o l\u1EC7ch t\xE2m do HLB",
        source: "USDA / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Citrus_greening_UGA5201066.jpg/960px-Citrus_greening_UGA5201066.jpg",
        caption: "Bi\u1EC3u hi\u1EC7n v\xE0ng g\xE2n l\xE1 v\xE0 l\xE1 non thu nh\u1ECF, m\u1ECDc d\u1EF1ng \u0111\u1EE9ng",
        source: "Bugwood.org / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Asian_citrus_psyllid_D._citri_adult.jpg/960px-Asian_citrus_psyllid_D._citri_adult.jpg",
        caption: "R\u1EA7y ch\u1ED5ng c\xE1nh (Diaphorina citri) - c\xF4n tr\xF9ng m\xF4i gi\u1EDBi truy\u1EC1n b\u1EC7nh HLB",
        source: "USDA-ARS / Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_canker",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh Lo\xE9t cam qu\xFDt (Bacterial Canker)",
    englishName: "Citrus Bacterial Canker",
    symptoms: "V\u1EBFt b\u1EC7nh ban \u0111\u1EA7u l\xE0 ch\u1EA5m nh\u1ECF trong su\u1ED1t nh\u01B0 gi\u1ECDt d\u1EA7u, sau ph\u1ED3ng l\xEAn th\xE0nh n\u1ED1t s\u1EA7n tr\xF2n m\xE0u n\xE2u x\xE1m, b\u1EC1 m\u1EB7t n\u1EE9t n\u1EBB. \u0110\u1EB7c tr\u01B0ng c\xF3 qu\u1EA7ng v\xE0ng s\xE1ng (halo) bao quanh v\u1EBFt lo\xE9t tr\xEAn c\u1EA3 hai m\u1EB7t l\xE1 v\xE0 v\u1ECF qu\u1EA3.",
    symptomChecklist: [
      "N\u1ED1t lo\xE9t n\u1ED5i g\u1ED3 l\xEAn \u1EDF C\u1EA2 HAI M\u1EB6T l\xE1 (kh\xE1c v\u1EDBi b\u1EC7nh gh\u1EBB th\u01B0\u1EDDng ch\u1EC9 g\u1ED3 m\u1ED9t m\u1EB7t v\xE0 l\xE0m nh\u0103n l\xE1).",
      "Xung quanh n\u1ED1t s\u1EA7n m\xE0u n\xE2u x\xE1m lu\xF4n c\xF3 qu\u1EA7ng v\xE0ng s\xE1ng r\xF5 r\u1EC7t nh\u01B0 vi\u1EC1n d\u1EA7u.",
      "Tr\xEAn v\u1ECF qu\u1EA3 v\xE0 c\xE0nh non c\xF3 v\u1EBFt s\xF9i n\u1EE9t n\u1EBB, s\u1EDD v\xE0o th\u1EA5y th\xF4 r\xE1p, d\u1EC5 l\xE0m qu\u1EA3 r\u1EE5ng non sau m\u01B0a b\xE3o."
    ],
    affectedPlantParts: ["leaf", "fruit", "stem"],
    causes: "Vi khu\u1EA9n Xanthomonas citri pv. citri, x\xE2m nh\u1EADp qua kh\xED kh\u1ED5ng t\u1EF1 nhi\xEAn v\xE0 c\xE1c v\u1EBFt th\u01B0\u01A1ng do m\u01B0a gi\xF3 va \u0111\u1EADp ho\u1EB7c s\xE2u v\u1EBD b\xF9a \u0111\u1EE5c ph\xE1.",
    favorableConditions: "M\u01B0a to gi\xF3 l\u1EDBn k\xE9o d\xE0i, b\xE3o nhi\u1EC7t \u0111\u1EDBi v\xF9ng B\u1EAFc Trung B\u1ED9 k\u1EBFt h\u1EE3p nhi\u1EC7t \u0111\u1ED9 cao 28-35\xB0C.",
    preventionMethods: "Ph\xF2ng tr\u1EEB tri\u1EC7t \u0111\u1EC3 s\xE2u v\u1EBD b\xF9a \u0111\u1EC3 kh\xF4ng t\u1EA1o c\u1EEDa ng\xF5 cho vi khu\u1EA9n x\xE2m nh\u1EADp. Tr\u1ED3ng c\xE2y ch\u1EAFn gi\xF3 quanh v\u01B0\u1EDDn cam.",
    safeManagement: "C\u1EAFt t\u1EC9a c\xE0nh l\xE1 b\u1ECB lo\xE9t n\u1EB7ng trong ng\xE0y n\u1EAFng r\xE1o \u0111em \u0111\u1ED1t ti\xEAu h\u1EE7y. Phun ph\xF2ng b\u1EB1ng dung d\u1ECBch Booc-\u0111\xF4 1% ho\u1EB7c thu\u1ED1c g\u1ED1c \u0111\u1ED3ng sinh h\u1ECDc, vi khu\u1EA9n \u0111\u1ED1i kh\xE1ng Bacillus subtilis ngay tr\u01B0\u1EDBc v\xE0 sau \u0111\u1EE3t m\u01B0a b\xE3o.",
    treatmentSteps: {
      immediate: [
        "C\u1EAFt b\u1ECF c\xE0nh, l\xE1 v\xE0 qu\u1EA3 b\u1ECB lo\xE9t n\u1EB7ng v\xE0o l\xFAc tr\u1EDDi n\u1EAFng r\xE1o, gom v\xE0o bao t\u1EA3i mang ra kh\u1ECFi v\u01B0\u1EDDn ti\xEAu h\u1EE7y.",
        "Kh\u1EED tr\xF9ng k\xE9o c\u1EAFt c\xE0nh b\u1EB1ng c\u1ED3n 70% ho\u1EB7c n\u01B0\u1EDBc javel pha lo\xE3ng khi chuy\u1EC3n t\u1EEB c\xE2y b\u1EC7nh sang c\xE2y kh\u1ECFe."
      ],
      biologicalAndCare: [
        "Phun dung d\u1ECBch Booc-\u0111\xF4 1% ho\u1EB7c thu\u1ED1c g\u1ED1c \u0111\u1ED3ng (\u0110\u1ED3ng Oxyclorua, \u0110\u1ED3ng Hydroxit) \u0111\xFAng li\u1EC1u \u0111\u1EC3 ph\u1EE7 k\xEDn b\u1EC1 m\u1EB7t l\xE1 non v\xE0 qu\u1EA3 nh\u1ECF.",
        "Ki\u1EC3m so\xE1t t\u1ED1t s\xE2u v\u1EBD b\xF9a \u1EDF m\u1ED7i \u0111\u1EE3t l\u1ED9c non \u0111\u1EC3 h\u1EA1n ch\u1EBF v\u1EBFt th\u01B0\u01A1ng c\u01A1 gi\u1EDBi.",
        "B\u1ED5 sung ph\xE2n Kali v\xE0 Canxi gi\xFAp bi\u1EC3u b\xEC l\xE1 d\xE0y, ch\u1ED1ng ch\u1ECBu m\u01B0a gi\xF3 t\u1ED1t h\u01A1n."
      ],
      caution: [
        "Kh\xF4ng phun thu\u1ED1c l\xFAc tr\u1EDDi n\u1EAFng g\u1EAFt ho\u1EB7c khi c\xE2y \u0111ang n\u1EDF hoa r\u1ED9 \u0111\u1EC3 tr\xE1nh ch\xE1y l\xE1, r\u1EE5ng hoa.",
        "Kh\xF4ng t\u01B0\u1EDBi phun m\u01B0a m\u1EA1nh tr\u1EF1c ti\u1EBFp l\xEAn t\xE1n v\xE0o bu\u1ED5i chi\u1EC1u t\u1ED1i v\xEC n\u01B0\u1EDBc b\u1EAFn s\u1EBD ph\xE1t t\xE1n vi khu\u1EA9n kh\u1EAFp v\u01B0\u1EDDn."
      ]
    },
    references: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt (NIPP); FAO Citrus Disease Management Guidelines.",
    verificationStatus: "verified",
    verifiedBy: "Ph\xF2ng B\u1EC7nh h\u1ECDc Th\u1EF1c v\u1EADt - Vi\u1EC7n BVTV",
    standardCode: "QCVN 01-19:2010/BNNPTNT",
    reviewDate: "2026-03-01",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Citrus_canker_on_foliage.jpg/500px-Citrus_canker_on_foliage.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Citrus_canker_on_foliage.jpg/500px-Citrus_canker_on_foliage.jpg",
        caption: "V\u1EBFt lo\xE9t s\u1EA7n s\xF9i c\xF3 qu\u1EA7ng v\xE0ng s\xE1ng \u0111\u1EB7c tr\u01B0ng tr\xEAn l\xE1 cam",
        source: "USDA / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Xanthomonas_axonopodis_canker_2_%288232130059%29.jpg/960px-Xanthomonas_axonopodis_canker_2_%288232130059%29.jpg",
        caption: "C\u1EADn c\u1EA3nh \u1ED5 lo\xE9t n\u1ED5i g\u1ED3, t\xE2m n\u1EE9t v\u1EE1 k\xE8m vi\u1EC1n v\xE0ng tr\xEAn l\xE1",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Xanthomonas_axonopodis_canker_1_%288233192838%29.jpg/960px-Xanthomonas_axonopodis_canker_1_%288233192838%29.jpg",
        caption: "V\u1EBFt lo\xE9t vi khu\u1EA9n Xanthomonas g\xE2y s\u1EA7n s\xF9i v\u1ECF qu\u1EA3 c\xF3 m\xFAi",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_scab",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh Gh\u1EBB s\u1EB9o cam qu\xFDt (Citrus Scab)",
    englishName: "Citrus Scab",
    symptoms: "V\u1EBFt b\u1EC7nh g\u1ED3 l\xEAn th\xE0nh c\xE1c gai u l\u1ED3i h\xECnh n\xF3n s\u1EEBng, m\xE0u v\xE0ng n\xE2u ho\u1EB7c x\xE1m tro. Phi\u1EBFn l\xE1 non b\u1ECB v\u1EB7n v\u1EB9o bi\u1EBFn d\u1EA1ng, nh\u0103n nheo, c\xF2i c\u1ECDc. Tr\xEAn v\u1ECF qu\u1EA3 non xu\u1EA5t hi\u1EC7n c\xE1c m\u1EE5n c\xF3c s\u1EA7n s\xF9i nh\xF4 cao.",
    symptomChecklist: [
      "\u0110\u1EC9nh m\u1EE5n gh\u1EBB g\u1ED3 cao \u1EDF m\u1ED9t m\u1EB7t l\xE1, m\u1EB7t \u0111\u1ED1i di\u1EC7n th\u01B0\u1EDDng l\xF5m v\xE0o (ph\xE2n bi\u1EC7t v\u1EDBi lo\xE9t s\u1EA7n c\u1EA3 hai m\u1EB7t).",
      "L\xE1 non b\u1ECB nh\u0103n nh\xFAm, cong queo, m\xE9p l\xE1 bi\u1EBFn d\u1EA1ng r\xF5 r\u1EC7t.",
      "Qu\u1EA3 non m\u1ECDc nhi\u1EC1u m\u1EE5n s\xF9i m\xE0u v\xE0ng r\u01A1m \u0111\u1EBFn n\xE2u x\xE1m l\xE0m v\u1ECF qu\u1EA3 x\u1EA5u, s\u1EA7n s\xF9i."
    ],
    affectedPlantParts: ["leaf", "fruit", "stem"],
    causes: "N\u1EA5m Elsino\xEB fawcettii (Sphaceloma fawcettii). B\xE0o t\u1EED n\u1EA5m ph\xE1t t\xE1n nh\u1EDD gi\u1ECDt n\u01B0\u1EDBc m\u01B0a b\u1EAFn v\xE0 gi\xF3.",
    favorableConditions: "Nhi\u1EC7t \u0111\u1ED9 m\xE1t 20-24\xB0C k\xE8m m\u01B0a ph\xF9n k\xE9o d\xE0i, s\u01B0\u01A1ng m\xF9, \u0111\u1ED9 \u1EA9m kh\xF4ng kh\xED tr\xEAn 90% v\u1EE5 \u0110\xF4ng Xu\xE2n B\u1EAFc Trung B\u1ED9.",
    preventionMethods: "T\u1EC9a c\xE0nh t\u1EA1o t\xE1n th\xF4ng tho\xE1ng sau thu ho\u1EA1ch. Kh\xF4ng t\u01B0\u1EDBi phun m\u01B0a l\xEAn t\xE1n c\xE2y v\xE0o chi\u1EC1u t\u1ED1i.",
    safeManagement: "Phun dung d\u1ECBch Booc-\u0111\xF4 ho\u1EB7c ch\u1EBF ph\u1EA9m sinh h\u1ECDc Trichoderma / ho\u1EA1t ch\u1EA5t Azoxystrobin, Mancozeb \u0111\xFAng giai \u0111o\u1EA1n l\u1ED9c non nh\xFA 1-2 cm v\xE0 khi r\u1EE5ng 2/3 c\xE1nh hoa.",
    treatmentSteps: {
      immediate: [
        "Thu gom v\xE0 c\u1EAFt b\u1ECF c\xE1c c\xE0nh l\xE1 non b\u1ECB gh\u1EBB nh\u0103n n\u1EB7ng, qu\u1EA3 non bi\u1EBFn d\u1EA1ng r\u1EE5ng d\u01B0\u1EDBi g\u1ED1c.",
        "T\u1EC9a b\u1EDBt c\xE0nh v\u01B0\u1EE3t, c\xE0nh t\u0103m trong t\xE1n gi\xFAp v\u01B0\u1EDDn th\xF4ng tho\xE1ng, nhanh kh\xF4 s\u01B0\u01A1ng v\xE0o bu\u1ED5i s\xE1ng."
      ],
      biologicalAndCare: [
        "Phun ph\xF2ng khi l\u1ED9c non m\u1EDBi nh\xFA d\xE0i 1-2 cm v\xE0 l\u1EB7p l\u1EA1i l\xFAc c\xE2y v\u1EEBa r\u1EE5ng 2/3 c\xE1nh hoa b\u1EB1ng dung d\u1ECBch Booc-\u0111\xF4 ho\u1EB7c thu\u1ED1c g\u1ED1c \u0111\u1ED3ng sinh h\u1ECDc.",
        "Lu\xE2n phi\xEAn ch\u1EBF ph\u1EA9m n\u1EA5m \u0111\u1ED1i kh\xE1ng Trichoderma v\xE0o \u0111\u1EA5t v\xE0 v\xF9ng t\xE1n \u0111\u1EC3 gi\u1EA3m ngu\u1ED3n b\xE0o t\u1EED l\u01B0u t\u1ED3n."
      ],
      caution: [
        "B\u1EC7nh ch\u1EC9 l\xE2y nhi\u1EC5m tr\xEAn m\xF4 non (l\xE1 non v\xE0 qu\u1EA3 non d\u01B0\u1EDBi 6-8 tu\u1EA7n tu\u1ED5i); phun khi l\xE1 \u0111\xE3 gi\xE0 s\u1EBD kh\xF4ng c\xF2n t\xE1c d\u1EE5ng ph\u1EE5c h\u1ED3i v\u1EBFt gh\u1EBB c\u0169.",
        "Tr\xE1nh l\u1EA1m d\u1EE5ng thu\u1ED1c g\u1ED1c \u0111\u1ED3ng qu\xE1 d\xE0y trong giai \u0111o\u1EA1n qu\u1EA3 non l\u1EDBn nhanh v\xEC d\u1EC5 g\xE2y n\xE1m v\u1ECF qu\u1EA3."
      ]
    },
    references: "Trung t\xE2m Khuy\u1EBFn n\xF4ng Qu\u1ED1c gia; USDA-APHIS Sweet Orange Scab Field Guide.",
    verificationStatus: "verified",
    verifiedBy: "Trung t\xE2m Khuy\u1EBFn n\xF4ng Qu\u1ED1c gia & Chi c\u1EE5c BVTV Ngh\u1EC7 An",
    standardCode: "TCVN 9308:2012",
    reviewDate: "2026-03-01",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg/960px-Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg/960px-Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg",
        caption: "V\u1EBFt gh\u1EBB s\u1EB9o n\u1ED5i m\u1EE5n b\u1EA7n s\u1EA7n s\xF9i tr\xEAn v\u1ECF qu\u1EA3 c\xF3 m\xFAi",
        source: "USDA-APHIS / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Sweet_Orange_Scab_%2820191218-APHIS-DB-0076%29.jpg/960px-Sweet_Orange_Scab_%2820191218-APHIS-DB-0076%29.jpg",
        caption: "C\xE1c m\u1EA3ng s\u1EA7n m\xE0u x\xE1m n\xE2u li\xEAn k\u1EBFt tr\xEAn b\u1EC1 m\u1EB7t qu\u1EA3",
        source: "USDA-APHIS / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Citrus_Nursery_%2820170421-APHIS-DB-0080%29.jpg/960px-Citrus_Nursery_%2820170421-APHIS-DB-0080%29.jpg",
        caption: "L\xE1 non trong v\u01B0\u1EDDn \u01B0\u01A1m b\u1ECB gh\u1EBB l\xE0m nh\u0103n v\u1EB7n v\xE0 bi\u1EBFn d\u1EA1ng phi\u1EBFn l\xE1",
        source: "USDA-APHIS / Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-20T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_black_spot",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh \u0110\u1ED1m \u0111en cam chanh (Citrus Black Spot)",
    englishName: "Citrus Black Spot",
    symptoms: "Tr\xEAn v\u1ECF qu\u1EA3 xu\u1EA5t hi\u1EC7n c\xE1c \u0111\u1ED1m tr\xF2n h\u01A1i l\xF5m, t\xE2m m\xE0u x\xE1m nh\u1EA1t \u0111\u1EBFn n\xE2u s\xE1ng c\xF3 ch\u1EA5m \u0111en nh\u1ECF (\u1ED5 b\xE0o t\u1EED n\u1EA5m), vi\u1EC1n ngo\xE0i m\xE0u n\xE2u s\u1EABm ho\u1EB7c \u0111en tuy\u1EC1n, \u0111\xF4i khi c\xF3 qu\u1EA7ng xanh l\u1EE5c ho\u1EB7c \u0111\u1ECF n\xE2u. G\xE2y r\u1EE5ng qu\u1EA3 s\u1EDBm tr\u01B0\u1EDBc khi thu ho\u1EA1ch.",
    symptomChecklist: [
      "\u0110\u1ED1m tr\xF2n k\xEDch th\u01B0\u1EDBc 3-10 mm tr\xEAn v\u1ECF qu\u1EA3, t\xE2m x\xE1m tr\u1EAFng h\u01A1i l\xF5m, vi\u1EC1n \u0111en s\u1EABm r\u1EA5t n\xE9t.",
      "D\xF9ng k\xEDnh l\xFAp th\u1EA5y c\xE1c ch\u1EA5m \u0111en li ti \u1EDF gi\u1EEFa t\xE2m v\u1EBFt b\u1EC7nh.",
      "Th\u01B0\u1EDDng xu\u1EA5t hi\u1EC7n r\xF5 \u1EDF ph\xEDa qu\u1EA3 h\u01B0\u1EDBng ra \xE1nh n\u1EAFng m\u1EB7t tr\u1EDDi khi qu\u1EA3 b\u1EAFt \u0111\u1EA7u gi\xE0."
    ],
    affectedPlantParts: ["fruit", "leaf"],
    causes: "N\u1EA5m Phyllosticta citricarpa (Guignardia citricarpa). B\xE0o t\u1EED t\u1ED3n t\u1EA1i tr\xEAn l\xE1 r\u1EE5ng m\u1EE5c d\u01B0\u1EDBi \u0111\u1EA5t v\xE0 b\u1EAFn l\xEAn qu\u1EA3 non \u0111\u1EA7u m\xF9a m\u01B0a.",
    favorableConditions: "N\u1EC1n nhi\u1EC7t cao 25-32\xB0C xen k\u1EBD m\u01B0a \u1EA9m v\xE0 n\u1EAFng g\u1EAFt; v\u01B0\u1EDDn nhi\u1EC1u l\xE1 r\u1EE5ng kh\xF4 m\u1EE5c kh\xF4ng \u0111\u01B0\u1EE3c thu gom.",
    preventionMethods: "Thu gom, \u1EE7 hoai m\u1EE5c ho\u1EB7c ph\u1EE7 ph\xE2n h\u1EEFu c\u01A1 vi sinh l\xEAn l\u1EDBp l\xE1 r\u1EE5ng d\u01B0\u1EDBi g\u1ED1c \u0111\u1EC3 ch\u1EB7n b\xE0o t\u1EED n\u1EA5m ph\xE1t t\xE1n l\xEAn t\xE1n.",
    safeManagement: "C\u1EAFt t\u1EC9a c\xE0nh kh\xF4, c\xE0nh g\u1EA7n m\u1EB7t \u0111\u1EA5t. Phun ph\xF2ng b\u1EB1ng thu\u1ED1c g\u1ED1c \u0111\u1ED3ng ho\u1EB7c Azoxystrobin giai \u0111o\u1EA1n qu\u1EA3 non sau khi r\u1EE5ng c\xE1nh hoa 4-6 tu\u1EA7n.",
    treatmentSteps: {
      immediate: [
        "Thu gom to\xE0n b\u1ED9 l\xE1 r\u1EE5ng v\xE0 qu\u1EA3 r\u1EE5ng d\u01B0\u1EDBi g\u1ED1c v\u01B0\u1EDDn \u0111em \u1EE7 v\u1EDBi v\xF4i v\xE0 n\u1EA5m Trichoderma ho\u1EB7c ti\xEAu h\u1EE7y.",
        "H\xE1i b\u1ECF c\xE1c qu\u1EA3 c\xF3 d\u1EA5u hi\u1EC7u \u0111\u1ED1m \u0111en s\u1EDBm \u0111\u1EC3 tr\xE1nh l\xE2y sang qu\u1EA3 b\xEAn c\u1EA1nh."
      ],
      biologicalAndCare: [
        "Ph\u1EE7 m\u1ED9t l\u1EDBp r\u01A1m r\u1EA1 kh\xF4 s\u1EA1ch ho\u1EB7c ph\xE2n h\u1EEFu c\u01A1 hoai m\u1EE5c c\xF3 Trichoderma l\xEAn m\u1EB7t li\u1EBFp \u0111\u1EC3 ch\u1EB7n b\xE0o t\u1EED n\u1EA5m t\u1EEB l\xE1 r\u1EE5ng bay l\xEAn.",
        "Phun b\u1EA3o v\u1EC7 qu\u1EA3 \u0111\u1ECBnh k\u1EF3 20-25 ng\xE0y/l\u1EA7n trong giai \u0111o\u1EA1n m\xF9a m\u01B0a \u0111\u1EA7u v\u1EE5 b\u1EB1ng g\u1ED1c \u0111\u1ED3ng sinh h\u1ECDc ho\u1EB7c ho\u1EA1t ch\u1EA5t \u0111\u01B0\u1EE3c c\u1EA5p ph\xE9p."
      ],
      caution: [
        "V\u1EBFt b\u1EC7nh c\xF3 th\u1EC3 \u1EE7 ti\u1EC1m \u1EA9n nhi\u1EC1u th\xE1ng t\u1EEB l\xFAc qu\u1EA3 c\xF2n nh\u1ECF v\xE0 ch\u1EC9 b\u1ED9c l\u1ED9 khi qu\u1EA3 gi\xE0 ho\u1EB7c g\u1EB7p n\u1EAFng n\xF3ng.",
        "Kh\xF4ng \u0111\u1EC3 c\u1ECF d\u1EA1i m\u1ECDc cao s\xE1t t\xE1n cam l\xE0m gi\u1EEF \u1EA9m k\xE9o d\xE0i quanh v\xF9ng g\u1ED1c."
      ]
    },
    references: "EFSA & USDA Citrus Black Spot Compendium; Vi\u1EC7n BVTV Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt & USDA Compendium",
    standardCode: "ISPM / FAO Citrus Phytosanitary Guide",
    reviewDate: "2026-03-05",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Citrus_Black_Spot.jpg/500px-Citrus_Black_Spot.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Citrus_Black_Spot.jpg/500px-Citrus_Black_Spot.jpg",
        caption: "V\u1EBFt \u0111\u1ED1m \u0111en t\xE2m x\xE1m h\u01A1i l\xF5m vi\u1EC1n \u0111en s\u1EABm tr\xEAn v\u1ECF cam",
        source: "USDA / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Citrus_Black_Spot_on_Valencia_orange.jpg/500px-Citrus_Black_Spot_on_Valencia_orange.jpg",
        caption: "\u0110\u1ED1m \u0111en nhi\u1EC1u k\xEDch c\u1EE1 ph\xE1t tri\u1EC3n tr\xEAn qu\u1EA3 cam Valencia s\u1EAFp ch\xEDn",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Citrus_Black_Spot_lesions.jpg/500px-Citrus_Black_Spot_lesions.jpg",
        caption: "C\u1EADn c\u1EA3nh v\u1EBFt \u0111\u1ED1m c\u1EE9ng v\xE0 \u0111\u1ED1m t\xE0n nhang c\u1EE7a n\u1EA5m Phyllosticta citricarpa",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_melanose",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh S\u1EB9o m\u1EA1ng nh\u1EC7n / R\u1EC9 s\u1EAFt n\xE2u (Citrus Melanose)",
    englishName: "Citrus Melanose",
    symptoms: "Tr\xEAn v\u1ECF qu\u1EA3 v\xE0 l\xE1 xu\u1EA5t hi\u1EC7n d\xE0y \u0111\u1EB7c c\xE1c ch\u1EA5m nh\u1ECF m\xE0u n\xE2u s\u1EABm \u0111\u1EBFn \u0111en n\u1ED5i nh\u1EB9 l\xEAn b\u1EC1 m\u1EB7t, s\u1EDD tay th\u1EA5y nh\xE1m nh\u01B0 gi\u1EA5y r\xE1p. V\u1EBFt b\u1EC7nh th\u01B0\u1EDDng x\u1EBFp th\xE0nh d\u1EA3i v\u1EC7t ch\u1EA3y theo d\xF2ng n\u01B0\u1EDBc m\u01B0a tr\xEAn v\u1ECF qu\u1EA3 (v\u1EBFt gi\u1ECDt n\u01B0\u1EDBc m\u1EAFt) ho\u1EB7c m\u1EA1ng nh\u1EC7n.",
    symptomChecklist: [
      "C\xE1c ch\u1EA5m n\xE2u nh\u1ECF li ti s\u1EDD th\u1EA5y nh\xE1m r\xE1p tay (kh\xE1c h\u1EB3n v\u1EBFt gh\u1EBB u l\u1ED3i to v\xE0 v\u1EBFt lo\xE9t c\xF3 qu\u1EA7ng v\xE0ng).",
      "Th\u01B0\u1EDDng t\u1EE5 l\u1EA1i th\xE0nh t\u1EEBng v\u1EC7t d\xE0i gi\u1ED1ng gi\u1ECDt n\u01B0\u1EDBc ch\u1EA3y ho\u1EB7c \u0111\u01B0\u1EDDng m\u1EA1ng nh\u1EC7n b\xF9n \u0111\u1EA5t tr\xEAn v\u1ECF qu\u1EA3.",
      "Ch\u1EE7 y\u1EBFu l\xE0m x\u1EA5u m\u1EABu m\xE3 v\u1ECF qu\u1EA3 v\xE0 gi\u1EA3m nh\u1EB9 kh\u1EA3 n\u0103ng quang h\u1EE3p c\u1EE7a l\xE1."
    ],
    affectedPlantParts: ["fruit", "leaf", "stem"],
    causes: "N\u1EA5m Diaporthe citri (Phomopsis citri). B\xE0o t\u1EED sinh s\u1EA3n m\u1EA1nh tr\xEAn c\xE1c c\xE0nh kh\xF4 ch\u1EBFt treo tr\xEAn t\xE1n c\xE2y.",
    favorableConditions: "M\u01B0a \u1EA9m k\xE9o d\xE0i sau m\xF9a xu\xE2n h\xE8, v\u01B0\u1EDDn cam nhi\u1EC1u n\u0103m tu\u1ED5i c\xF3 nhi\u1EC1u c\xE0nh kh\xF4 t\u0103m ch\u01B0a c\u1EAFt t\u1EC9a.",
    preventionMethods: "C\u1EAFt t\u1EC9a s\u1EA1ch to\xE0n b\u1ED9 c\xE0nh kh\xF4, c\xE0nh ch\u1EBFt tr\xEAn t\xE1n ngay sau thu ho\u1EA1ch v\xEC \u0111\xE2y l\xE0 n\u01A1i n\u1EA5m tr\xFA ng\u1EE5 ch\xEDnh.",
    safeManagement: "Phun thu\u1ED1c g\u1ED1c \u0111\u1ED3ng (Booc-\u0111\xF4, \u0110\u1ED3ng Oxyclorua) sau khi qu\u1EA3 non \u0111\u1EADu ho\xE0n to\xE0n 3-4 tu\u1EA7n \u0111\u1EC3 b\u1EA3o v\u1EC7 v\u1ECF qu\u1EA3.",
    treatmentSteps: {
      immediate: [
        "D\xF9ng k\xE9o c\u1EAFt t\u1EC9a s\u1EA1ch to\xE0n b\u1ED9 c\xE0nh kh\xF4 ch\u1EBFt, c\xE0nh b\u1ECB s\xE2u \u0111\u1EE5c tr\xEAn t\xE1n (n\u01A1i n\u1EA5m sinh b\xE0o t\u1EED nhi\u1EC1u nh\u1EA5t)."
      ],
      biologicalAndCare: [
        "Phun dung d\u1ECBch Booc-\u0111\xF4 ho\u1EB7c g\u1ED1c \u0111\u1ED3ng sinh h\u1ECDc b\u1EA3o v\u1EC7 v\u1ECF qu\u1EA3 non trong giai \u0111o\u1EA1n 1-3 th\xE1ng \u0111\u1EA7u sau \u0111\u1EADu qu\u1EA3.",
        "B\xF3n ph\xE2n c\xE2n \u0111\u1ED1i v\xE0 t\u01B0\u1EDBi \u1EA9m h\u1EE3p l\xFD \u0111\u1EC3 c\xE2y gi\u1EEF t\xE1n kh\u1ECFe, \xEDt ph\xE1t sinh c\xE0nh kh\xF4 ch\u1EBFt."
      ],
      caution: [
        "N\u1EBFu ch\u1EC9 phun thu\u1ED1c m\xE0 kh\xF4ng c\u1EAFt b\u1ECF c\xE0nh kh\xF4 ch\u1EBFt tr\xEAn c\xE2y th\xEC b\u1EC7nh v\u1EABn li\xEAn t\u1EE5c t\xE1i ph\xE1t sau m\u1ED7i tr\u1EADn m\u01B0a."
      ]
    },
    references: "C\u1EA9m nang b\u1EC7nh c\xE2y c\xF3 m\xFAi - FAO & Vi\u1EC7n C\xE2y \u0103n qu\u1EA3 Mi\u1EC1n Nam.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt & Vi\u1EC7n C\xE2y \u0103n qu\u1EA3",
    standardCode: "TCVN 9308:2012",
    reviewDate: "2026-03-05",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Citrus_natsudaidai_Melanose.jpg/960px-Citrus_natsudaidai_Melanose.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Citrus_natsudaidai_Melanose.jpg/960px-Citrus_natsudaidai_Melanose.jpg",
        caption: "V\u1EBFt s\u1EB9o n\xE2u li ti t\u1EA1o v\u1EC7t ch\u1EA3y theo \u0111\u01B0\u1EDDng n\u01B0\u1EDBc m\u01B0a tr\xEAn v\u1ECF qu\u1EA3",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/M%C3%A9lanose_de_la_mandarine.jpg/330px-M%C3%A9lanose_de_la_mandarine.jpg",
        caption: "M\u1EADt \u0111\u1ED9 ch\u1EA5m n\xE2u s\u1EABm s\u1EDD nh\xE1m tay tr\xEAn v\u1ECF qu\u1EA3 qu\xFDt",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-02T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_phytophthora_gummosis",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh Ch\u1EA3y nh\u1EF1a th\xE2n / Th\u1ED1i g\u1ED1c n\u1EE9t v\u1ECF (Phytophthora)",
    englishName: "Citrus Phytophthora Gummosis & Foot Rot",
    symptoms: "V\u1ECF th\xE2n \u1EDF v\xF9ng g\u1ED1c ho\u1EB7c ch\u1EA1c ba c\xE2y chuy\u1EC3n m\xE0u s\u1EABm \u01B0\u1EDBt, n\u1EE9t d\u1ECDc v\xE0 r\u1EC9 ra ch\u1EA5t nh\u1EF1a \u0111\u1EB7c m\xE0u h\u1ED5 ph\xE1ch \u0111\u1EBFn n\xE2u \u0111en. Khi c\u1EA1o nh\u1EB9 l\u1EDBp v\u1ECF th\u1EA5y ph\u1EA7n g\u1ED7 b\xEAn d\u01B0\u1EDBi b\u1ECB th\u1ED1i n\xE2u, c\xF3 m\xF9i chua \u0111\u1EB7c tr\u01B0ng. T\xE1n l\xE1 tr\xEAn c\xE0nh t\u01B0\u01A1ng \u1EE9ng b\u1ECB v\xE0ng g\xE2n v\xE0 r\u1EE5ng d\u1EA7n.",
    symptomChecklist: [
      "G\u1ED1c th\xE2n g\u1EA7n m\u1EB7t \u0111\u1EA5t ho\u1EB7c ch\u1EA1c ba c\xE0nh ch\xEDnh b\u1ECB n\u1EE9t v\u1ECF, ch\u1EA3y nh\u1EF1a n\xE2u s\u1EABm d\xEDnh b\u1EBFt.",
      "D\xF9ng dao s\u1EA1ch c\u1EA1o nh\u1EB9 l\u1EDBp v\u1ECF ch\u1ED7 ch\u1EA3y nh\u1EF1a th\u1EA5y ph\u1EA7n m\xF4 g\u1ED7 \u0111\u1ED5i m\xE0u n\xE2u th\xE2m (c\xE2y kh\u1ECFe c\xF3 m\xE0u xanh v\xE0ng s\xE1ng).",
      "L\xE1 tr\xEAn c\xE0nh ph\xEDa tr\xEAn v\u1EBFt lo\xE9t b\u1ECB v\xE0ng d\u1ECDc g\xE2n gi\u1EEFa tr\u01B0\u1EDBc r\u1ED3i c\xE2y ch\u1EBFt d\u1EA7n t\u1EEBng b\xEAn t\xE1n."
    ],
    affectedPlantParts: ["stem", "leaf", "fruit"],
    causes: "N\u1EA5m gi\u1EA3 (tr\u1EE9ng n\u1EA5m) Phytophthora palmivora / P. citrophthora t\u1ED3n t\u1EA1i trong \u0111\u1EA5t \u1EA9m v\xE0 n\u01B0\u1EDBc t\u01B0\u1EDBi.",
    favorableConditions: "V\u01B0\u1EDDn \u0111\u1EA5t th\u1EA5p tr\u0169ng \u0111\u1ECDng n\u01B0\u1EDBc m\xF9a m\u01B0a, tr\u1ED3ng c\xE2y qu\xE1 s\xE2u ng\u1EADp m\u1EAFt gh\xE9p, ho\u1EB7c d\xF9ng ph\xE2n chu\u1ED3ng ch\u01B0a hoai s\xE1t g\u1ED1c.",
    preventionMethods: "L\xEAn m\xF4 cao tho\xE1t n\u01B0\u1EDBc t\u1ED1t, tuy\u1EC7t \u0111\u1ED1i kh\xF4ng l\u1EA5p \u0111\u1EA5t qu\xE1 m\u1EAFt gh\xE9p. D\xF9ng g\u1ED1c gh\xE9p ch\u1ED1ng ch\u1ECBu t\u1ED1t nh\u01B0 cam ba l\xE1 ho\u1EB7c b\u01B0\u1EDFi chua. Qu\xE9t v\xF4i g\u1ED1c cao 40-50 cm \u0111\u1EA7u m\xF9a m\u01B0a.",
    safeManagement: "C\u1EA1o s\u1EA1ch ph\u1EA7n v\u1ECF th\u1ED1i \u0111\u1EBFn ph\u1EA7n g\u1ED7 l\xE0nh, qu\xE9t dung d\u1ECBch Booc-\u0111\xF4 \u0111\u1EB7c ho\u1EB7c Metalaxyl / Fosetyl-Al tr\u1EF1c ti\u1EBFp l\xEAn v\u1EBFt c\u1EA1o; t\u01B0\u1EDBi g\u1ED1c ch\u1EBF ph\u1EA9m n\u1EA5m \u0111\u1ED1i kh\xE1ng Trichoderma.",
    treatmentSteps: {
      immediate: [
        "Kh\u01A1i r\xE3nh tho\xE1t n\u01B0\u1EDBc ngay n\u1EBFu quanh g\u1ED1c b\u1ECB \u0111\u1ECDng \u1EA9m, g\u1EA1t b\u1ECF b\u1EDBt \u0111\u1EA5t v\xE0 c\u1ECF d\u1EA1i s\xE1t g\u1ED1c cho th\xF4ng tho\xE1ng.",
        "D\xF9ng dao s\u1EAFc s\u1EA1ch c\u1EA1o s\u1EA1ch ho\xE0n to\xE0n ph\u1EA7n v\u1ECF c\xE2y b\u1ECB th\xE2m th\u1ED1i cho t\u1EDBi khi ch\u1EA1m m\xF4 g\u1ED7 l\xE0nh, thu gom v\u1ECF b\u1EC7nh \u0111em \u0111\u1ED1t."
      ],
      biologicalAndCare: [
        "Qu\xE9t tr\u1EF1c ti\u1EBFp dung d\u1ECBch thu\u1ED1c g\u1ED1c \u0111\u1ED3ng (Booc-\u0111\xF4 \u0111\u1EADm \u0111\u1EB7c) ho\u1EB7c ch\u1EBF ph\u1EA9m \u0111\u1EB7c tr\u1ECB n\u1EA5m Phytophthora l\xEAn v\u1EBFt v\u1EEBa c\u1EA1o 2 l\u1EA7n c\xE1ch nhau 7 ng\xE0y.",
        "T\u01B0\u1EDBi b\u1ED5 sung n\u1EA5m \u0111\u1ED1i kh\xE1ng Trichoderma v\xE0o v\xF9ng r\u1EC5 quanh t\xE1n \u0111\u1EC3 \u1EE9c ch\u1EBF n\u1EA5m \u0111\u1EA5t l\xE2y lan.",
        "Khi c\xE2y \u0111ang y\u1EBFu kh\xF4ng b\xF3n ph\xE2n h\xF3a h\u1ECDc n\u1ED3ng \u0111\u1ED9 cao v\xE0o g\u1ED1c."
      ],
      caution: [
        "Kh\xF4ng \u0111\u1EAFp b\xF9n, \u0111\u1EA5t \u1EA9m ho\u1EB7c r\xE1c r\u01B0\u1EDFi s\xE1t c\u1ED5 r\u1EC5 c\xE2y cam b\u01B0\u1EDFi.",
        "N\u1EBFu v\u1EBFt th\u1ED1i \u0111\xE3 \u0103n v\xF2ng quanh h\u1EBFt chu vi th\xE2n g\u1ED1c th\xEC c\xE2y kh\xF4ng th\u1EC3 ph\u1EE5c h\u1ED3i, n\xEAn nh\u1ED5 b\u1ECF x\u1EED l\xFD v\xF4i b\u1ED9t tr\u01B0\u1EDBc khi tr\u1ED3ng d\u1EB7m."
      ]
    },
    references: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; Bugwood Phytophthora Field Manual.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n BVTV Vi\u1EC7t Nam & Vi\u1EC7n ASIR",
    standardCode: "TCVN 9308:2012",
    reviewDate: "2026-03-05",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg/960px-Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg/960px-Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg",
        caption: "G\u1ED1c c\xE2y c\xF3 m\xFAi b\u1ECB n\u1EE9t v\u1ECF v\xE0 r\u1EC9 nh\u1EF1a n\xE2u \u0111en \u0111\u1EB7c tr\u01B0ng c\u1EE7a Phytophthora",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815371984693%29.jpg/960px-Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815371984693%29.jpg",
        caption: "V\u1ECF th\xE2n bong tr\xF3c, m\xF4 g\u1ED7 th\xE2m n\xE2u v\xE0 r\u1EC9 d\u1ECBch nh\u1EF1a",
        source: "Bugwood.org / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815805881077%29.jpg/960px-Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815805881077%29.jpg",
        caption: "V\u1EBFt ho\u1EA1i t\u1EED lan r\u1ED9ng theo chi\u1EC1u d\u1ECDc tr\xEAn th\xE2n c\xE0nh cam",
        source: "Bugwood.org / Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-04T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_leafminer",
    cropType: "citrus",
    vietnameseName: "S\xE2u v\u1EBD b\xF9a h\u1EA1i cam chanh (Citrus Leafminer)",
    englishName: "Citrus Leafminer",
    symptoms: "S\xE2u non \u0111\u1EE5c th\xE0nh c\xE1c \u0111\u01B0\u1EDDng h\u1EA7m ngo\u1EB1n ngo\xE8o m\xE0u tr\u1EAFng b\u1EA1c \xF3ng \xE1nh d\u01B0\u1EDBi l\u1EDBp bi\u1EC3u b\xEC l\xE1 non v\xE0 ch\u1ED3i non. L\xE1 non b\u1ECB qu\u0103n queo, bi\u1EBFn d\u1EA1ng, r\xECa l\xE1 cu\u1ED1n v\xE0o trong n\u01A1i s\xE2u l\xE0m k\xE9n nh\u1ED9ng, t\u1EA1o \u0111i\u1EC1u ki\u1EC7n cho vi khu\u1EA9n b\u1EC7nh lo\xE9t x\xE2m nh\u1EADp.",
    symptomChecklist: [
      "\u0110\u01B0\u1EDDng r\xE3nh ngo\u1EB1n ngo\xE8o nh\u01B0 n\xE9t v\u1EBD m\xE0u b\u1EA1c ho\u1EB7c tr\u1EAFng m\u1EDD tr\xEAn m\u1EB7t l\xE1 non.",
      "\u1EDE cu\u1ED1i \u0111\u01B0\u1EDDng h\u1EA7m th\u01B0\u1EDDng c\xF3 nh\u1ED9ng nh\u1ECF l\xE0m m\xE9p l\xE1 cu\u1ED1n g\u1EADp l\u1EA1i.",
      "Ch\u1EE7 y\u1EBFu ph\xE1 h\u1EA1i m\u1EA1nh tr\xEAn l\xE1 non m\u1EDBi nh\xFA; l\xE1 gi\xE0 b\xE1nh t\u1EBB kh\xF4ng b\u1ECB \u0111\u1EE5c th\xEAm."
    ],
    affectedPlantParts: ["leaf", "stem"],
    causes: "\u1EA4u tr\xF9ng lo\xE0i b\u01B0\u1EDBm \u0111\xEAm nh\u1ECF Phyllocnistis citrella. Ng\xE0i c\xE1i \u0111\u1EBB tr\u1EE9ng tr\u1EF1c ti\u1EBFp l\xEAn ch\u1ED3i l\xE1 non m\u1EDBi nh\xFA.",
    favorableConditions: "C\xE1c \u0111\u1EE3t c\xE2y ra l\u1ED9c t\u1EADp trung (l\u1ED9c xu\xE2n, l\u1ED9c h\xE8, l\u1ED9c thu), th\u1EDDi ti\u1EBFt \u1EA5m 24-30\xB0C t\u1EA1i c\xE1c v\u01B0\u1EDDn cam B\u1EAFc Trung B\u1ED9.",
    preventionMethods: "\u0110i\u1EC1u khi\u1EC3n b\xF3n ph\xE2n v\xE0 t\u01B0\u1EDBi n\u01B0\u1EDBc \u0111\u1EC3 c\xE2y ra l\u1ED9c non \u0110\u1ED2NG LO\u1EA0T trong c\u1EA3 v\u01B0\u1EDDn gi\xFAp d\u1EC5 qu\u1EA3n l\xFD m\u1ED9t l\u1EA7n, c\u1EAFt \u0111\u1EE9t ngu\u1ED3n th\u1EE9c \u0103n li\xEAn t\u1EE5c c\u1EE7a s\xE2u.",
    safeManagement: "Phun d\u1EA7u kho\xE1ng sinh h\u1ECDc (SK Enspray) ho\u1EB7c ch\u1EBF ph\u1EA9m tr\u1EEB s\xE2u sinh h\u1ECDc Abamectin / Emamectin / Azadirachtin (chi\u1EBFt xu\u1EA5t neem) ngay khi m\u1EA7m l\u1ED9c non m\u1EDBi nh\xFA d\xE0i 1-2 cm; b\u1EA3o t\u1ED3n ki\u1EBFn v\xE0ng v\xE0 ong k\xFD sinh.",
    treatmentSteps: {
      immediate: [
        "Ng\u1EAFt b\u1ECF v\xE0 ti\xEAu h\u1EE7y c\xE1c ng\u1ECDn l\xE1 non b\u1ECB cu\u1ED1n n\u1EB7ng ch\u1EE9a nh\u1ED9ng s\xE2u n\u1EBFu di\u1EC7n t\xEDch v\u01B0\u1EDDn nh\u1ECF ho\u1EB7c c\xE2y m\u1EDBi tr\u1ED3ng.",
        "Ki\u1EC3m tra xem tr\xEAn v\u1EBFt s\xE2u v\u1EBD b\xF9a c\xF3 k\xE8m ch\u1EA5m lo\xE9t vi khu\u1EA9n qu\u1EA7ng v\xE0ng hay kh\xF4ng \u0111\u1EC3 k\u1EBFt h\u1EE3p ph\xF2ng lo\xE9t."
      ],
      biologicalAndCare: [
        "Khi th\u1EA5y 10-20% ch\u1ED3i non m\u1EDBi nh\xFA xu\u1EA5t hi\u1EC7n \u0111\u01B0\u1EDDng \u0111\u1EE5c nh\u1ECF, phun d\u1EA7u kho\xE1ng n\xF4ng nghi\u1EC7p ho\u1EB7c thu\u1ED1c sinh h\u1ECDc Abamectin/Neem v\xE0o chi\u1EC1u m\xE1t.",
        "T\u1EC9a c\xE0nh, b\xF3n ph\xE2n \u0111\u1ED3ng b\u1ED9 \u0111\u1EC3 c\u1EA3 v\u01B0\u1EDDn b\u1EADt l\u1ED9c c\xF9ng l\xFAc, r\xFAt ng\u1EAFn th\u1EDDi gian c\xF3 l\xE1 non."
      ],
      caution: [
        "Khi l\xE1 \u0111\xE3 xo\u0103n c\u1EE9ng v\xE0 chuy\u1EC3n sang m\xE0u xanh b\xE1nh t\u1EBB th\xEC s\xE2u \u0111\xE3 h\xF3a nh\u1ED9ng ho\u1EB7c bay \u0111i, kh\xF4ng c\u1EA7n phun thu\u1ED1c t\u1ED1n k\xE9m.",
        "Kh\xF4ng d\xF9ng thu\u1ED1c h\xF3a h\u1ECDc ph\u1ED5 r\u1ED9ng ti\xEAu di\u1EC7t m\u1EA5t ong k\xFD sinh v\xE0 ki\u1EBFn v\xE0ng c\xF3 l\u1EE3i trong v\u01B0\u1EDDn."
      ]
    },
    references: "C\u1EE5c B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; USDA Citrus Leafminer Fact Sheet.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "TCVN 9308:2012",
    reviewDate: "2026-03-06",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Phyllocnistis_citrella_pupa.jpg/960px-Phyllocnistis_citrella_pupa.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Phyllocnistis_citrella_pupa.jpg/960px-Phyllocnistis_citrella_pupa.jpg",
        caption: "\u0110\u01B0\u1EDDng h\u1EA7m ngo\u1EB1n ngo\xE8o m\xE0u b\u1EA1c tr\xEAn l\xE1 non v\xE0 nh\u1ED9ng cu\u1ED9n \u1EDF m\xE9p l\xE1",
        source: "USDA / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Phyllocnistis_citrella_pupa1.jpg/960px-Phyllocnistis_citrella_pupa1.jpg",
        caption: "Phi\u1EBFn l\xE1 non b\u1ECB xo\u0103n bi\u1EBFn d\u1EA1ng do \u1EA5u tr\xF9ng s\xE2u v\u1EBD b\xF9a \u0111\u1EE5c d\u01B0\u1EDBi bi\u1EC3u b\xEC",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Phyllocnistis_citrella_adult.jpg/960px-Phyllocnistis_citrella_adult.jpg",
        caption: "Ng\xE0i tr\u01B0\u1EDFng th\xE0nh Phyllocnistis citrella chuy\xEAn \u0111\u1EBB tr\u1EE9ng tr\xEAn \u0111\u1ECDt l\u1ED9c non",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-06T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_sooty_mold_blackfly",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh Mu\u1ED9i \u0111en & B\u1ECD ph\u1EA5n \u0111en h\u1EA1i cam (Sooty Mold & Blackfly)",
    englishName: "Citrus Blackfly & Sooty Mold",
    symptoms: "M\u1EB7t tr\xEAn l\xE1, c\xE0nh v\xE0 v\u1ECF qu\u1EA3 b\u1ECB ph\u1EE7 m\u1ED9t l\u1EDBp ph\u1EA5n m\xE0ng m\xE0u \u0111en nh\u01B0 b\u1ED3 h\xF3ng (n\u1EA5m mu\u1ED9i \u0111en), c\xF3 th\u1EC3 d\xF9ng tay lau tr\xF3c ra \u0111\u01B0\u1EE3c. L\u1EADt m\u1EB7t d\u01B0\u1EDBi l\xE1 th\u1EA5y b\u1ECD ph\u1EA5n \u0111en (ho\u1EB7c r\u1EC7p s\xE1p, r\u1EC7p mu\u1ED9i) b\xE1m d\xE0y \u0111\u1EB7c v\xE0 c\xE1c \u1ED5 tr\u1EE9ng x\u1EBFp h\xECnh xo\u1EAFn \u1ED1c.",
    symptomChecklist: [
      "M\u1EB7t tr\xEAn l\xE1 v\xE0 qu\u1EA3 ph\u1EE7 l\u1EDBp b\u1ED3 h\xF3ng \u0111en k\u1ECBt, khi lau tay \u1EA9m v\xE0o s\u1EBD tr\xF3c ra th\u1EA5y m\xF4 l\xE1 b\xEAn d\u01B0\u1EDBi c\xF2n xanh.",
      "M\u1EB7t d\u01B0\u1EDBi l\xE1 c\xF3 nhi\u1EC1u \u1EA5u tr\xF9ng b\u1ECD ph\u1EA5n \u0111en h\xECnh b\u1EA7u d\u1EE5c c\xF3 vi\u1EC1n s\xE1p tr\u1EAFng ho\u1EB7c r\u1EC7p s\xE1p ti\u1EBFt d\u1ECBch ng\u1ECDt.",
      "Th\u01B0\u1EDDng th\u1EA5y nhi\u1EC1u ki\u1EBFn \u0111en b\xF2 l\xEAn c\xE2y \u0111\u1EC3 b\u1EA3o v\u1EC7 r\u1EC7p v\xE0 \u0103n d\u1ECBch m\u1EADt ng\u1ECDt."
    ],
    affectedPlantParts: ["leaf", "fruit", "stem"],
    causes: "N\u1EA5m b\u1ED3 h\xF3ng (Capnodium spp.) m\u1ECDc tr\xEAn l\u1EDBp d\u1ECBch ng\u1ECDt do b\u1ECD ph\u1EA5n \u0111en (Aleurocanthus woglumi), r\u1EC7p s\xE1p, r\u1EC7p mu\u1ED9i ch\xEDch h\xFAt ti\u1EBFt ra.",
    favorableConditions: "V\u01B0\u1EDDn cam r\u1EADm r\u1EA1p, thi\u1EBFu \xE1nh s\xE1ng, \xEDt gi\xF3 l\xF9a, m\u1EADt \u0111\u1ED9 c\xF4n tr\xF9ng ch\xEDch h\xFAt v\xE0 ki\u1EBFn c\u1ED9ng sinh cao.",
    preventionMethods: "T\u1EC9a c\xE0nh t\u1EA1o t\xE1n th\xF4ng tho\xE1ng cho \xE1nh n\u1EAFng l\u1ECDt v\xE0o trong t\xE1n. D\u1ECDn c\u1ECF g\u1ED1c v\xE0 h\u1EA1n ch\u1EBF ki\u1EBFn c\u1ED9ng sinh \u0111\u01B0a r\u1EC7p l\xEAn c\xE2y.",
    safeManagement: "Mu\u1ED1n h\u1EBFt mu\u1ED9i \u0111en PH\u1EA2I tr\u1EEB b\u1ECD ph\u1EA5n/r\u1EC7p s\xE1p b\u1EB1ng d\u1EA7u kho\xE1ng n\xF4ng nghi\u1EC7p ho\u1EB7c x\xE0 ph\xF2ng sinh h\u1ECDc phun k\u1EF9 m\u1EB7t d\u01B0\u1EDBi l\xE1; khi h\u1EBFt d\u1ECBch m\u1EADt, l\u1EDBp mu\u1ED9i \u0111en t\u1EF1 bong tr\xF3c sau v\xE0i c\u01A1n m\u01B0a ho\u1EB7c khi r\u1EEDa t\xE1n.",
    treatmentSteps: {
      immediate: [
        "L\u1EADt m\u1EB7t d\u01B0\u1EDBi l\xE1 \u0111\u1EC3 x\xE1c \u0111\u1ECBnh \u0111\xFAng lo\u1EA1i c\xF4n tr\xF9ng ch\xEDch h\xFAt (b\u1ECD ph\u1EA5n, r\u1EC7p s\xE1p hay r\u1EC7p mu\u1ED9i) \u0111ang ti\u1EBFt d\u1ECBch ng\u1ECDt.",
        "C\u1EAFt b\u1ECF c\xE1c c\xE0nh v\u01B0\u1EE3t trong t\xE1n qu\xE1 r\u1EADm r\u1EA1p b\u1ECB mu\u1ED9i \u0111en b\xE1m d\xE0y \u0111\u1EB7c."
      ],
      biologicalAndCare: [
        "Phun d\u1EA7u kho\xE1ng n\xF4ng nghi\u1EC7p ho\u1EB7c ch\u1EBF ph\u1EA9m sinh h\u1ECDc tr\u1EEB b\u1ECD ph\u1EA5n/r\u1EC7p k\u1EF9 v\xE0o M\u1EB6T D\u01AF\u1EDAI L\xC1, sau 3-5 ng\xE0y c\xF3 th\u1EC3 phun r\u1EEDa t\xE1n b\u1EB1ng n\u01B0\u1EDBc s\u1EA1ch \xE1p l\u1EF1c v\u1EEBa.",
        "Di\u1EC7t ki\u1EBFn c\u1ED9ng sinh quanh g\u1ED1c \u0111\u1EC3 tr\xE1nh ki\u1EBFn tha r\u1EC7p ph\xE1t t\xE1n sang c\xE2y kh\xE1c."
      ],
      caution: [
        "Kh\xF4ng phun thu\u1ED1c tr\u1ECB n\u1EA5m li\xEAn t\u1EE5c m\xE0 b\u1ECF qua vi\u1EC7c tr\u1EEB r\u1EC7p/b\u1ECD ph\u1EA5n, v\xEC c\xF2n d\u1ECBch ng\u1ECDt th\xEC n\u1EA5m mu\u1ED9i \u0111en s\u1EBD m\u1ECDc l\u1EA1i ngay."
      ]
    },
    references: "USDA-ARS Citrus Blackfly Biological Control Guide; Vi\u1EC7n BVTV Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "TCVN 9308:2012",
    reviewDate: "2026-03-06",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aleurocanthus_woglumi_5194005.jpg/960px-Aleurocanthus_woglumi_5194005.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aleurocanthus_woglumi_5194005.jpg/960px-Aleurocanthus_woglumi_5194005.jpg",
        caption: "\u1ED4 tr\u1EE9ng xo\u1EAFn \u1ED1c v\xE0 \u1EA5u tr\xF9ng b\u1ECD ph\u1EA5n \u0111en b\xE1m m\u1EB7t d\u01B0\u1EDBi l\xE1 c\xF3 m\xFAi",
        source: "USDA-ARS / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Aleurocanthus_woglumi_5194004.jpg/960px-Aleurocanthus_woglumi_5194004.jpg",
        caption: "M\u1EADt \u0111\u1ED9 b\u1ECD ph\u1EA5n \u0111en g\xE2y h\u1EA1i v\xE0 ti\u1EBFt d\u1ECBch m\u1EADt l\xE0m ph\xE1t sinh n\u1EA5m mu\u1ED9i \u0111en",
        source: "USDA-ARS / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Sooty_mold_Schefflera_1.JPG/960px-Sooty_mold_Schefflera_1.JPG",
        caption: "L\u1EDBp n\u1EA5m b\u1ED3 h\xF3ng \u0111en ph\u1EE7 k\xEDn m\u1EB7t tr\xEAn phi\u1EBFn l\xE1 l\xE0m gi\u1EA3m quang h\u1EE3p",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-08T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_green_mold",
    cropType: "citrus",
    vietnameseName: "B\u1EC7nh Th\u1ED1i m\u1ED1c xanh qu\u1EA3 cam (Citrus Green Mold)",
    englishName: "Citrus Green Mold",
    symptoms: "V\u1ECF qu\u1EA3 xu\u1EA5t hi\u1EC7n v\xF9ng nh\u0169n n\u01B0\u1EDBc m\u1EC1m nh\xE3o, nhanh ch\xF3ng m\u1ECDc l\u1EDBp t\u01A1 n\u1EA5m m\xE0u tr\u1EAFng v\xE0 sinh kh\u1ED1i ph\u1EA5n b\xE0o t\u1EED m\xE0u xanh \xF4-liu (xanh l\xE1 c\xE2y b\u1EE5i ph\u1EA5n) \u1EDF ch\xEDnh gi\u1EEFa, bao quanh b\u1EDFi vi\u1EC1n t\u01A1 tr\u1EAFng r\u1ED9ng. Qu\u1EA3 th\u1ED1i m\u1EC1m nhanh v\xE0 l\xE2y sang c\xE1c qu\u1EA3 s\xE1t c\u1EA1nh khi thu ho\u1EA1ch b\u1EA3o qu\u1EA3n.",
    symptomChecklist: [
      "\u0110\u1ED1m m\u1EC1m nh\u0169n n\u01B0\u1EDBc tr\xEAn v\u1ECF qu\u1EA3, \u1EA5n nh\u1EB9 v\xE0o r\u1EA5t m\u1EC1m v\xE0 d\u1EC5 v\u1EE1.",
      "Trung t\xE2m v\u1EBFt th\u1ED1i ph\u1EE7 l\u1EDBp ph\u1EA5n m\u1ECBn m\xE0u xanh \xF4-liu, xung quanh lu\xF4n c\xF3 v\xF2ng vi\u1EC1n tr\u1EAFng r\xF5.",
      "B\u1EE5i b\xE0o t\u1EED xanh d\u1EC5 bay m\xF9 khi ch\u1EA1m tay, l\xE0m l\xE2y nhi\u1EC5m ch\xE9o r\u1EA5t nhanh trong s\u1ECDt ho\u1EB7c kho b\u1EA3o qu\u1EA3n."
    ],
    affectedPlantParts: ["fruit"],
    causes: "N\u1EA5m Penicillium digitatum. X\xE2m nh\u1EADp qua c\xE1c v\u1EBFt tr\u1EA7y x\u01B0\u1EDBc v\u1ECF qu\u1EA3 do c\xF4n tr\xF9ng ch\xEDch ho\u1EB7c va ch\u1EA1m khi thu h\xE1i v\u1EADn chuy\u1EC3n.",
    favorableConditions: "Qu\u1EA3 ch\xEDn g\u1EA7n thu ho\u1EA1ch g\u1EB7p m\u01B0a \u1EA9m, c\xF4n tr\xF9ng (ru\u1ED3i \u0111\u1EE5c qu\u1EA3, b\u01B0\u1EDBm ch\xEDch h\xFAt) g\xE2y v\u1EBFt th\u01B0\u01A1ng, ho\u1EB7c b\u1EA3o qu\u1EA3n n\u01A1i \u1EA9m b\xED.",
    preventionMethods: "Thu ho\u1EA1ch nh\u1EB9 tay b\u1EB1ng k\xE9o chuy\xEAn d\u1EE5ng (c\u1EAFt s\xE1t cu\u1ED1ng), tr\xE1nh l\xE0m tr\u1EA7y x\u01B0\u1EDBc v\u1ECF qu\u1EA3. Ph\xF2ng t\u1ED1t ru\u1ED3i \u0111\u1EE5c qu\u1EA3 tr\xEAn v\u01B0\u1EDDn.",
    safeManagement: "Lo\u1EA1i b\u1ECF ngay qu\u1EA3 th\u1ED1i kh\u1ECFi c\xE2y v\xE0 kh\u1ECFi s\u1ECDt \u0111\xF3ng g\xF3i. Kh\u1EED tr\xF9ng th\xF9ng s\u1ECDt b\u1EA3o qu\u1EA3n v\xE0 d\xF9ng ch\u1EBF ph\u1EA9m sinh h\u1ECDc ho\u1EB7c n\u01B0\u1EDBc \u1EA5m x\u1EED l\xFD sau thu ho\u1EA1ch theo ti\xEAu chu\u1EA9n an to\xE0n.",
    treatmentSteps: {
      immediate: [
        "Thu gom qu\u1EA3 b\u1ECB th\u1ED1i m\u1ED1c tr\xEAn c\xE2y v\xE0 d\u01B0\u1EDBi \u0111\u1EA5t cho v\xE0o bao k\xEDn ti\xEAu h\u1EE7y, tr\xE1nh rung l\u1EAFc l\xE0m ph\xE1t t\xE1n b\u1EE5i b\xE0o t\u1EED xanh.",
        "N\u1EBFu \u0111ang thu h\xE1i ho\u1EB7c tr\u1EEF qu\u1EA3, t\xE1ch ri\xEAng l\u1EADp t\u1EE9c qu\u1EA3 c\xF3 v\u1EBFt x\u01B0\u1EDBc ho\u1EB7c ch\u1EDBm th\u1ED1i kh\u1ECFi l\xF4 qu\u1EA3 l\xE0nh."
      ],
      biologicalAndCare: [
        "Ph\xF2ng tr\u1EEB ru\u1ED3i \u0111\u1EE5c qu\u1EA3 v\xE0 b\u1ECD x\xEDt ch\xEDch qu\u1EA3 giai \u0111o\u1EA1n qu\u1EA3 gi\xE0 \u0111\u1EC3 h\u1EA1n ch\u1EBF v\u1EBFt th\u01B0\u01A1ng m\u1EDF \u0111\u01B0\u1EDDng cho n\u1EA5m.",
        "V\u1EC7 sinh r\u1ED5 s\u1ECDt b\u1EB1ng n\u01B0\u1EDBc s\u1EA1ch pha thu\u1ED1c kh\u1EED tr\xF9ng an to\xE0n tr\u01B0\u1EDBc khi \u0111\u1EF1ng cam thu ho\u1EA1ch."
      ],
      caution: [
        "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng d\xF9ng h\xF3a ch\u1EA5t b\u1EA3o qu\u1EA3n ngo\xE0i danh m\u1EE5c cho ph\xE9p \u0111\u1EC3 ng\xE2m qu\u1EA3 sau thu ho\u1EA1ch."
      ]
    },
    references: "FAO Postharvest Citrus Handling Manual; Vi\u1EC7n C\u01A1 \u0111i\u1EC7n N\xF4ng nghi\u1EC7p & C\xF4ng ngh\u1EC7 Sau thu ho\u1EA1ch.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt & C\xF4ng ngh\u1EC7 Sau thu ho\u1EA1ch",
    standardCode: "TCVN B\u1EA3o qu\u1EA3n qu\u1EA3 t\u01B0\u01A1i",
    reviewDate: "2026-03-07",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Penicillium_digitatum_75779358.jpg/960px-Penicillium_digitatum_75779358.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Penicillium_digitatum_75779358.jpg/960px-Penicillium_digitatum_75779358.jpg",
        caption: "V\u1EBFt nh\u0169n n\u01B0\u1EDBc k\xE8m t\u01A1 n\u1EA5m tr\u1EAFng v\xE0 \u1ED5 b\xE0o t\u1EED xanh \xF4-liu tr\xEAn v\u1ECF cam",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Penicillium_digitatum_75779438.jpg/960px-Penicillium_digitatum_75779438.jpg",
        caption: "B\xE0o t\u1EED n\u1EA5m Penicillium digitatum ph\u1EE7 xanh g\u1EA7n h\u1EBFt b\u1EC1 m\u1EB7t qu\u1EA3",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Penicillium_digitatum_75779475.jpg/960px-Penicillium_digitatum_75779475.jpg",
        caption: "Giai \u0111o\u1EA1n qu\u1EA3 teo th\u1ED1i m\u1EC1m, ph\xE1t t\xE1n b\xE0o t\u1EED m\u1EA1nh trong m\xF4i tr\u01B0\u1EDDng \u1EA9m",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-10T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "citrus_spider_mite_aphid",
    cropType: "citrus",
    vietnameseName: "Nh\u1EC7n \u0111\u1ECF & R\u1EC7p mu\u1ED9i n\xE2u h\u1EA1i cam chanh (Mites & Brown Aphid)",
    englishName: "Citrus Red Mite & Brown Citrus Aphid",
    symptoms: 'Nh\u1EC7n \u0111\u1ECF ch\xEDch h\xFAt t\u1EA1o c\xE1c ch\u1EA5m tr\u1EAFng b\u1EA1c l\u1EA5m t\u1EA5m d\xE0y \u0111\u1EB7c khi\u1EBFn m\u1EB7t l\xE1 x\xE1m x\u1EC9n nh\u01B0 ph\u1EE7 b\u1EE5i c\xE1m, m\u1EA5t \u0111\u1ED9 b\xF3ng v\xE0 r\u1EE5ng l\xE1 khi n\u1EAFng h\u1EA1n; tr\xEAn v\u1ECF qu\u1EA3 g\xE2y hi\u1EC7n t\u01B0\u1EE3ng "da c\xE1m, da lu". R\u1EC7p mu\u1ED9i n\xE2u b\xE1m th\xE0nh \u0111\xE1m d\xE0y \u0111\u1EB7c \u1EDF ch\u1ED3i non l\xE0m l\xE1 xo\u0103n r\u0169 v\xE0 truy\u1EC1n b\u1EC7nh virus Tristeza.',
    symptomChecklist: [
      "L\xE1 chuy\u1EC3n m\xE0u x\xE1m b\u1EA1c m\u1EDD x\u1EC9n, m\u1EA5t \u0111\u1ED9 xanh b\xF3ng t\u1EF1 nhi\xEAn; soi k\xEDnh l\xFAp th\u1EA5y nh\u1EC7n nh\u1ECF m\xE0u \u0111\u1ECF/v\xE0ng b\xF2 l\u1ED5m ng\u1ED5m.",
      'Tr\xEAn v\u1ECF qu\u1EA3 b\u1ECB nh\u1EC7n t\u1EA5n c\xF4ng chuy\u1EC3n m\xE0u x\xE1m n\xE2u nh\u1EA1t s\u1EA7n nh\u1EB9 ("da lu / da c\xE1m").',
      "\u0110\u1ECDt non b\u1ECB r\u1EC7p mu\u1ED9i n\xE2u \u0111en b\xE1m d\xE0y \u0111\u1EB7c quanh cu\u1ED1ng l\xE1 l\xE0m l\xE1 xo\u0103n t\xEDt."
    ],
    affectedPlantParts: ["leaf", "fruit", "stem"],
    causes: "Nh\u1EC7n \u0111\u1ECF (Panonychus citri, Tetranychus spp.), nh\u1EC7n r\xE1m v\xE0ng v\xE0 r\u1EC7p mu\u1ED9i n\xE2u cam qu\xFDt (Toxoptera citricida).",
    favorableConditions: "M\xF9a n\u1EAFng n\xF3ng kh\xF4 h\u1EA1n, gi\xF3 L\xE0o B\u1EAFc Trung B\u1ED9 (th\xE1ng 4 - th\xE1ng 8) b\xF9ng ph\xE1t nh\u1EC7n \u0111\u1ECF; \u0111\u1EA7u c\xE1c \u0111\u1EE3t l\u1ED9c non \u1EA9m \u1EA5m b\xF9ng ph\xE1t r\u1EC7p mu\u1ED9i.",
    preventionMethods: "T\u01B0\u1EDBi phun m\u01B0a r\u1EEDa t\xE1n v\xE0o s\xE1ng s\u1EDBm trong m\xF9a kh\xF4 h\u1EA1n \u0111\u1EC3 gi\u1EA3m m\u1EADt \u0111\u1ED9 nh\u1EC7n. B\u1EA3o v\u1EC7 thi\xEAn \u0111\u1ECBch t\u1EF1 nhi\xEAn nh\u01B0 b\u1ECD r\xF9a v\xE0 nh\u1EC7n b\u1EAFt m\u1ED3i.",
    safeManagement: "Phun d\u1EA7u kho\xE1ng n\xF4ng nghi\u1EC7p ho\u1EB7c l\u01B0u hu\u1EF3nh sinh h\u1ECDc / ho\u1EA1t ch\u1EA5t sinh h\u1ECDc Abamectin khi m\u1EADt \u0111\u1ED9 nh\u1EC7n trung b\xECnh >3-5 con/l\xE1; lu\xE2n phi\xEAn ho\u1EA1t ch\u1EA5t \u0111\u1EC3 tr\xE1nh nh\u1EC7n kh\xE1ng thu\u1ED1c.",
    treatmentSteps: {
      immediate: [
        "Soi k\u1EF9 m\u1EB7t tr\xEAn v\xE0 m\u1EB7t d\u01B0\u1EDBi l\xE1 b\u1EB1ng k\xEDnh l\xFAp (ho\u1EB7c qu\u1EC7t t\u1EDD gi\u1EA5y tr\u1EAFng v\xE0o l\xE1) \u0111\u1EC3 ki\u1EC3m tra m\u1EADt \u0111\u1ED9 nh\u1EC7n tr\u01B0\u1EDBc khi phun.",
        "N\u1EBFu v\u01B0\u1EDDn \u0111ang kh\xF4 h\u1EA1n, ti\u1EBFn h\xE0nh t\u01B0\u1EDBi \u1EA9m v\u01B0\u1EDDn v\xE0 r\u1EEDa t\xE1n nh\u1EB9 v\xE0o bu\u1ED5i s\xE1ng."
      ],
      biologicalAndCare: [
        "Phun d\u1EA7u kho\xE1ng n\xF4ng nghi\u1EC7p k\u1EBFt h\u1EE3p thu\u1ED1c tr\u1EEB nh\u1EC7n sinh h\u1ECDc (Abamectin, Matrine ho\u1EB7c ho\u1EA1t ch\u1EA5t chuy\xEAn tr\u1ECB nh\u1EC7n c\u1EA3 tr\u1EE9ng v\xE0 tr\u01B0\u1EDFng th\xE0nh) phun \u01B0\u1EDBt \u0111\u1EC1u 2 m\u1EB7t l\xE1 v\xE0 ch\xF9m qu\u1EA3.",
        "Lu\xE2n phi\xEAn nh\xF3m ho\u1EA1t ch\u1EA5t gi\u1EEFa c\xE1c l\u1EA7n phun, kh\xF4ng phun l\u1EB7p \u0111i l\u1EB7p l\u1EA1i m\u1ED9t lo\u1EA1i thu\u1ED1c."
      ],
      caution: [
        "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng tr\u1ED9n d\u1EA7u kho\xE1ng v\u1EDBi thu\u1ED1c g\u1ED1c l\u01B0u hu\u1EF3nh ho\u1EB7c phun khi nhi\u1EC7t \u0111\u1ED9 v\u01B0\u1EDDn v\u01B0\u1EE3t qu\xE1 34\xB0C v\xEC d\u1EC5 g\xE2y ch\xE1y l\xE1, r\u1EE5ng qu\u1EA3."
      ]
    },
    references: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; USDA Brown Citrus Aphid & Mite Guide.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "TCVN 9308:2012",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Brown_citrus_aphid_5194050.png/500px-Brown_citrus_aphid_5194050.png",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Brown_citrus_aphid_5194050.png/500px-Brown_citrus_aphid_5194050.png",
        caption: "R\u1EC7p mu\u1ED9i n\xE2u (Toxoptera citricida) ch\xEDch h\xFAt \u0111\u1ECDt non v\xE0 truy\u1EC1n virus Tristeza",
        source: "USDA / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Tetranychus_urticae_with_silk_threads.jpg/960px-Tetranychus_urticae_with_silk_threads.jpg",
        caption: "Nh\u1EC7n h\u1EA1i ch\xEDch h\xFAt di\u1EC7p l\u1EE5c v\xE0 gi\u0103ng t\u01A1 m\u1ECBn tr\xEAn m\u1EB7t l\xE1 m\xF9a n\u1EAFng h\u1EA1n",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Panonychus_ulmi_adult_female.jpg/960px-Panonychus_ulmi_adult_female.jpg",
        caption: "C\u1EADn c\u1EA3nh h\xECnh th\xE1i nh\u1EC7n \u0111\u1ECF tr\u01B0\u1EDFng th\xE0nh g\xE2y h\u1EA1i l\xE0m l\xE1 b\u1EA1c m\xE0u",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-12T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  // ==========================================
  // 2. CÂY LÚA NƯỚC (12 BỆNH / DỊCH HẠI)
  // ==========================================
  {
    id: "rice_blast",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh \u0110\u1EA1o \xF4n l\xFAa (\u0110\u1EA1o \xF4n l\xE1 & C\u1ED5 b\xF4ng)",
    englishName: "Rice Blast",
    symptoms: "Tr\xEAn phi\u1EBFn l\xE1 xu\u1EA5t hi\u1EC7n v\u1EBFt b\u1EC7nh h\xECnh m\u1EAFt \xE9n (h\xECnh thoi nh\u1ECDn hai \u0111\u1EA7u), t\xE2m m\xE0u x\xE1m tro, vi\u1EC1n ngo\xE0i m\xE0u n\xE2u \u0111\u1EADm ho\u1EB7c \u0111\u1ECF n\xE2u. Nhi\u1EC1u v\u1EBFt li\xEAn k\u1EBFt l\xE0m l\xE1 kh\xF4 ch\xE1y r\u1EE5i. Tr\xEAn c\u1ED5 b\xF4ng, v\u1EBFt b\u1EC7nh m\xE0u n\xE2u \u0111en l\xF5m v\xE0o l\xE0m c\u1ED5 gi\xE9 g\xE3y g\u1EE5c, h\u1EA1t l\xE9p l\u1EEDng.",
    symptomChecklist: [
      "V\u1EBFt b\u1EC7nh h\xECnh thoi nh\u1ECDn hai \u0111\u1EA7u nh\u01B0 m\u1EAFt \xE9n, t\xE2m x\xE1m tro, vi\u1EC1n n\xE2u r\xF5.",
      "V\u1EBFt c\u1EA5p t\xEDnh h\xECnh tr\xF2n ho\u1EB7c thoi xanh t\xE1i \u01B0\u1EDBt n\u01B0\u1EDBc lan r\u1EA5t nhanh khi tr\u1EDDi \xE2m u s\u01B0\u01A1ng m\xF9.",
      "\u1EDE giai \u0111o\u1EA1n tr\u1ED7: c\u1ED5 b\xF4ng ho\u1EB7c gi\xE9 l\xFAa th\u1EAFt \u0111en m\xE0u n\xE2u x\xE1m, b\xF4ng l\xFAa b\u1EA1c tr\u1EAFng v\xE0 g\xE3y g\u1EE5c."
    ],
    affectedPlantParts: ["leaf", "stem", "other"],
    causes: "N\u1EA5m Magnaporthe oryzae (Pyricularia oryzae). B\xE0o t\u1EED ph\xE1t t\xE1n r\u1EA5t xa theo gi\xF3.",
    favorableConditions: "Tr\u1EDDi \xE2m u, m\u01B0a ph\xF9n, s\u01B0\u01A1ng m\xF9 nhi\u1EC1u, \u0111\xEAm l\u1EA1nh ng\xE0y \u1EA5m (18-26\xB0C), \u0111\u1ED9 \u1EA9m >90%, ru\u1ED9ng b\xF3n th\u1EEBa \u0111\u1EA1m.",
    preventionMethods: "D\xF9ng gi\u1ED1ng kh\xE1ng/ch\u1ED1ng ch\u1ECBu, c\u1EA5y m\u1EADt \u0111\u1ED9 h\u1EE3p l\xFD, b\xF3n c\xE2n \u0111\u1ED1i N-P-K v\xE0 b\u1ED5 sung Silic, Kali gi\xFAp l\xE1 \u0111\u1EE9ng c\u1EE9ng ch\u1EAFc.",
    safeManagement: "Khi th\u1EA5y v\u1EBFt c\u1EA5p t\xEDnh, NG\u1EEANG B\xD3N \u0110\u1EA0M ngay l\u1EADp t\u1EE9c v\xE0 gi\u1EEF n\u01B0\u1EDBc ru\u1ED9ng 3-5 cm. Phun Tricyclazole ho\u1EB7c Isoprothiolane theo nguy\xEAn t\u1EAFc 4 \u0111\xFAng, phun ph\xF2ng ng\u1EEBa \u0111\u1EA1o \xF4n c\u1ED5 b\xF4ng l\xFAc l\xFAa tr\u1ED7 th\u1EA5p tho\xE1ng 5% v\xE0 khi tr\u1ED7 \u0111\u1EC1u.",
    treatmentSteps: {
      immediate: [
        "D\u1EEBng ngay vi\u1EC7c b\xF3n ph\xE2n \u0111\u1EA1m (Ur\xEA) v\xE0 ph\xE2n b\xF3n l\xE1 c\xF3 h\xE0m l\u01B0\u1EE3ng \u0111\u1EA1m cao.",
        "Ki\u1EC3m tra m\u1EF1c n\u01B0\u1EDBc ru\u1ED9ng: gi\u1EEF \u1ED5n \u0111\u1ECBnh m\u1EF1c n\u01B0\u1EDBc n\xF4ng 3-5 cm, tuy\u1EC7t \u0111\u1ED1i kh\xF4ng \u0111\u1EC3 ru\u1ED9ng kh\xF4 c\u1EA1n ki\u1EC7t khi l\xFAa \u0111ang b\u1ECB \u0111\u1EA1o \xF4n."
      ],
      biologicalAndCare: [
        "Phun ngay thu\u1ED1c \u0111\u1EB7c tr\u1ECB \u0111\u1EA1o \xF4n (nh\u01B0 ho\u1EA1t ch\u1EA5t Tricyclazole, Isoprothiolane ho\u1EB7c ch\u1EBF ph\u1EA9m sinh h\u1ECDc Kasugamycin) khi ph\xE1t hi\u1EC7n v\u1EBFt c\u1EA5p t\xEDnh tr\xEAn l\xE1.",
        "N\u1EBFu l\xFAa s\u1EAFp tr\u1ED7 tr\xEAn ru\u1ED9ng \u0111\xE3 c\xF3 ti\u1EC1n s\u1EED \u0111\u1EA1o \xF4n l\xE1, b\u1EAFt bu\u1ED9c phun ph\xF2ng 1 l\u1EA7n l\xFAc l\xFAa tr\u1ED7 l\xE1c \u0111\xE1c 5% v\xE0 1 l\u1EA7n sau tr\u1ED7 xong."
      ],
      caution: [
        'B\u1EC7nh l\xE2y lan c\u1EF1c nhanh ch\u1EC9 trong 3-5 ng\xE0y tr\u1EDDi \xE2m u s\u01B0\u01A1ng m\xF9 \u2014 ch\u1EADm x\u1EED l\xFD d\u1EC5 g\xE2y "ch\xE1y \u1ED5" ho\u1EB7c g\xE3y c\u1ED5 b\xF4ng m\u1EA5t tr\u1EAFng.'
      ]
    },
    references: "Vi\u1EC7n Nghi\xEAn c\u1EE9u L\xFAa Qu\u1ED1c t\u1EBF (IRRI); Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "IRRI & Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "QCVN 01-36:2010/BNNPTNT",
    reviewDate: "2026-03-01",
    sampleImageUrl: "/images/rice_leaf_blast.jpg",
    galleryImages: [
      {
        url: "/images/rice_leaf_blast.jpg",
        caption: "V\u1EBFt b\u1EC7nh h\xECnh m\u1EAFt \xE9n (thoi nh\u1ECDn hai \u0111\u1EA7u) \u0111i\u1EC3n h\xECnh tr\xEAn l\xE1 l\xFAa",
        source: "Vi\u1EC7n ASIR (M\u1EABu ki\u1EC3m ch\u1EE9ng)"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Rice_blast_Magnaporthe_grisea.jpg/500px-Rice_blast_Magnaporthe_grisea.jpg",
        caption: "C\xE1c v\u1EBFt m\u1EAFt \xE9n t\xE2m x\xE1m tro vi\u1EC1n n\xE2u \u0111\u1EADm li\xEAn k\u1EBFt l\xE0m ch\xE1y kh\xF4 l\xE1 l\xFAa",
        source: "IRRI / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/J_Sendra_with_Magnaporthe_grisea.jpeg/960px-J_Sendra_with_Magnaporthe_grisea.jpeg",
        caption: "Hi\u1EC7n t\u01B0\u1EE3ng ch\xE1y ch\xF2m \u0111\u1EA1o \xF4n tr\xEAn ru\u1ED9ng l\xFAa ngo\xE0i th\u1EF1c \u0111\u1ECBa",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_bacterial_blight",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh B\u1EA1c l\xE1 l\xFAa (Ch\xE1y b\xECa l\xE1 vi khu\u1EA9n)",
    englishName: "Bacterial Leaf Blight of Rice",
    symptoms: "V\u1EBFt b\u1EC7nh b\u1EAFt \u0111\u1EA7u t\u1EEB ch\xF3p l\xE1 ho\u1EB7c m\xE9p l\xE1 lan d\u1EA7n xu\u1ED1ng d\u01B0\u1EDBi v\u1EDBi ranh gi\u1EDBi g\u1EE3n s\xF3ng l\u01B0\u1EE3n s\xF3ng r\xF5 r\u1EC7t. M\xF4 l\xE1 chuy\u1EC3n xanh t\xE1i \u01B0\u1EDBt n\u01B0\u1EDBc r\u1ED3i v\xE0ng l\u1EE5c v\xE0 tr\u1EAFng x\xE1m nh\u01B0 r\u01A1m kh\xF4. S\xE1ng s\u1EDBm c\xF3 gi\u1ECDt d\u1ECBch vi khu\u1EA9n m\xE0u v\xE0ng \u0111\u1EE5c \u1EE9a tr\xEAn m\u1EB7t v\u1EBFt b\u1EC7nh.",
    symptomChecklist: [
      "Ch\xE1y d\u1ECDc t\u1EEB ch\xF3p ho\u1EB7c m\xE9p hai b\xEAn l\xE1 lan v\xE0o gi\u1EEFa, \u0111\u01B0\u1EDDng ranh gi\u1EDBi v\u1EBFt b\u1EC7nh G\u1EE2N S\xD3NG.",
      "V\xF9ng l\xE1 ch\u1EBFt chuy\u1EC3n m\xE0u v\xE0ng r\u01A1m r\u1ED3i b\u1EA1c tr\u1EAFng x\xE1m.",
      "S\xE1ng s\u1EDBm c\xF2n s\u01B0\u01A1ng th\u1EA5y c\xE1c gi\u1ECDt d\u1ECBch vi khu\u1EA9n nh\u1ECF m\xE0u v\xE0ng \u0111\u1EE5c \u0111\u1ECDng tr\xEAn m\xE9p v\u1EBFt b\u1EC7nh."
    ],
    affectedPlantParts: ["leaf"],
    causes: "Vi khu\u1EA9n Xanthomonas oryzae pv. oryzae, x\xE2m nh\u1EADp qua th\u1EE7y kh\u1ED5ng \u1EDF m\xE9p l\xE1 v\xE0 v\u1EBFt x\u01B0\u1EDBc l\xE1 do gi\xF3 b\xE3o va \u0111\u1EADp.",
    favorableConditions: "Gi\xF3 m\u1EA1nh, m\u01B0a gi\xF4ng, b\xE3o v\u1EE5 H\xE8 Thu / M\xF9a (28-34\xB0C), ru\u1ED9ng ng\u1EADp s\xE2u n\u01B0\u1EDBc ho\u1EB7c b\xF3n th\u1EEBa \u0111\u1EA1m l\xFAc l\xE0m \u0111\xF2ng.",
    preventionMethods: "Ch\u1ECDn gi\u1ED1ng ch\u1ED1ng ch\u1ECBu b\u1EA1c l\xE1 trong v\u1EE5 H\xE8 Thu/M\xF9a. Kh\xF4ng b\xF3n th\u1EEBa \u0111\u1EA1m \u0111\xF3n \u0111\xF2ng khi d\u1EF1 b\xE1o c\xF3 m\u01B0a b\xE3o.",
    safeManagement: "Th\xE1o b\u1EDBt n\u01B0\u1EDBc khi ru\u1ED9ng b\u1EC7nh ng\u1EADp s\xE2u, ng\u1EEBng b\xF3n \u0111\u1EA1m. Kh\xF4ng l\u1ED9i v\xE0o ru\u1ED9ng l\xFAc s\xE1ng s\u1EDBm c\xF2n \u01B0\u1EDBt s\u01B0\u01A1ng. S\u1EED d\u1EE5ng ch\u1EBF ph\u1EA9m sinh h\u1ECDc kh\xE1ng khu\u1EA9n ho\u1EB7c h\u1EE3p ch\u1EA5t g\u1ED1c \u0111\u1ED3ng/k\u1EBDm an to\xE0n theo khuy\u1EBFn c\xE1o BVTV.",
    treatmentSteps: {
      immediate: [
        "Ng\u1EEBng b\xF3n ph\xE2n \u0111\u1EA1m v\xE0 tuy\u1EC7t \u0111\u1ED1i kh\xF4ng phun ph\xE2n b\xF3n l\xE1 k\xEDch sinh tr\u01B0\u1EDFng.",
        "R\xFAt b\u1EDBt n\u01B0\u1EDBc n\u1EBFu ru\u1ED9ng \u0111ang ng\u1EADp \xFAng, gi\u1EEF m\u1EF1c n\u01B0\u1EDBc th\u1EA5p v\u1EEBa ph\u1EA3i; tr\xE1nh l\u1ED9i th\u0103m ru\u1ED9ng l\xFAc l\xE1 c\xF2n \u01B0\u1EDBt s\u01B0\u01A1ng bu\u1ED5i s\xE1ng."
      ],
      biologicalAndCare: [
        "Phun ngay thu\u1ED1c \u0111\u1EB7c tr\u1ECB vi khu\u1EA9n ho\u1EB7c ch\u1EBF ph\u1EA9m sinh h\u1ECDc kh\xE1ng khu\u1EA9n (Oxolinic acid, Bronopol, ho\u1EB7c vi sinh \u0111\u1ED1i kh\xE1ng) sau c\xE1c tr\u1EADn m\u01B0a gi\xF4ng gi\xF3 l\u1EDBn khi b\u1EC7nh v\u1EEBa ch\u1EDBm \u1EDF m\xE9p l\xE1.",
        "B\u1ED5 sung nh\u1EB9 ph\xE2n Kali \u0111\u1EC3 t\u0103ng \u0111\u1ED9 c\u1EE9ng c\xE2y, gi\xFAp b\u1ED9 l\xE1 c\xF2n l\u1EA1i ph\u1EE5c h\u1ED3i."
      ],
      caution: [
        "Thu\u1ED1c tr\u1ECB n\u1EA5m (nh\u01B0 \u0111\u1EA1o \xF4n, kh\xF4 v\u1EB1n) KH\xD4NG di\u1EC7t \u0111\u01B0\u1EE3c vi khu\u1EA9n b\u1EA1c l\xE1 \u2014 c\u1EA7n nh\u1EADn di\u1EC7n \u0111\xFAng v\u1EBFt ch\xE1y g\u1EE3n s\xF3ng t\u1EEB m\xE9p l\xE1."
      ]
    },
    references: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt (VAAS); Chi c\u1EE5c Tr\u1ED3ng tr\u1ECDt & BVTV H\xE0 T\u0129nh, Ngh\u1EC7 An.",
    verificationStatus: "verified",
    verifiedBy: "VAAS & Chi c\u1EE5c BVTV H\xE0 T\u0129nh",
    standardCode: "QCVN 01-38:2010/BNNPTNT",
    reviewDate: "2026-03-01",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Bacterial_blight_of_rice.jpeg/960px-Bacterial_blight_of_rice.jpeg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Bacterial_blight_of_rice.jpeg/960px-Bacterial_blight_of_rice.jpeg",
        caption: "L\xE1 l\xFAa ch\xE1y b\u1EA1c t\u1EEB ch\xF3p v\xE0 m\xE9p l\xE1 v\u1EDBi \u0111\u01B0\u1EDDng ranh gi\u1EDBi g\u1EE3n s\xF3ng \u0111\u1EB7c tr\u01B0ng",
        source: "IRRI / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Xanthomonas-disease.jpg/500px-Xanthomonas-disease.jpg",
        caption: "V\u1EBFt ch\xE1y b\xECa l\xE1 lan d\u1ECDc g\xE2n l\xE1 tr\xEAn gi\u1ED1ng l\xFAa nhi\u1EC5m n\u1EB7ng",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-12T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_sheath_blight",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh Kh\xF4 v\u1EB1n l\xFAa (\u0110\u1ED1m v\u1EB1n da h\u1ED5)",
    englishName: "Rice Sheath Blight",
    symptoms: "V\u1EBFt b\u1EC7nh xu\u1EA5t hi\u1EC7n \u0111\u1EA7u ti\xEAn \u1EDF b\u1EB9 l\xE1 s\xE1t m\u1EB7t n\u01B0\u1EDBc ru\u1ED9ng, d\u1EA1ng v\u1EC7t loang l\u1ED5 nh\u01B0 da h\u1ED5 (v\xE2n m\xE2y), r\xECa m\xE0u n\xE2u \u0111\u1EADm, t\xE2m m\xE0u x\xE1m tr\u1EAFng. B\u1EC7nh lan d\u1EA7n l\xEAn c\xE1c b\u1EB9 tr\xEAn v\xE0 phi\u1EBFn l\xE1 \u0111\xF2ng, l\xE0m l\xFAa \u0111\u1ED5 ng\xE3 v\xE0 h\u1EA1t l\xE9p.",
    symptomChecklist: [
      "Kh\u1EDFi ph\xE1t t\u1EEB b\u1EB9 l\xE1 s\xE1t m\u1EB7t n\u01B0\u1EDBc th\xE0nh v\u1EBFt loang v\xE2n m\xE2y gi\u1ED1ng da h\u1ED5.",
      "T\xE2m v\u1EBFt b\u1EC7nh m\xE0u x\xE1m l\u1EE5c \u0111\u1EBFn tr\u1EAFng x\xE1m, vi\u1EC1n ngo\xE0i n\xE2u s\u1EABm u\u1ED1n l\u01B0\u1EE3n.",
      "Tr\xEAn b\u1EC1 m\u1EB7t v\u1EBFt b\u1EC7nh \u1EA9m \u01B0\u1EDBt c\xF3 th\u1EC3 th\u1EA5y s\u1EE3i n\u1EA5m tr\u1EAFng v\xE0 h\u1EA1ch n\u1EA5m tr\xF2n m\xE0u n\xE2u n\u1ED5i tr\xEAn m\u1EB7t n\u01B0\u1EDBc."
    ],
    affectedPlantParts: ["stem", "leaf"],
    causes: "N\u1EA5m Rhizoctonia solani. H\u1EA1ch n\u1EA5m t\u1ED3n t\u1EA1i r\u1EA5t l\xE2u trong \u0111\u1EA5t v\xE0 n\u1ED5i tr\xEAn m\u1EB7t n\u01B0\u1EDBc ru\u1ED9ng \u0111\u1EC3 b\xE1m v\xE0o b\u1EB9 l\xFAa.",
    favorableConditions: "Nhi\u1EC7t \u0111\u1ED9 n\xF3ng \u1EA9m 28-32\xB0C, c\u1EA5y/gieo s\u1EA1 qu\xE1 d\xE0y, ru\u1ED9ng r\u1EADm r\u1EA1p thi\u1EBFu n\u1EAFng v\xE0 b\xF3n th\u1EEBa \u0111\u1EA1m giai \u0111o\u1EA1n l\xE0m \u0111\xF2ng.",
    preventionMethods: "C\xE0y b\u1EEBa k\u1EF9, v\u1EDBt s\u1EA1ch r\xE1c r\u01A1m r\u1EA1 v\xE0 b\u1ECDt h\u1EA1ch n\u1EA5m d\u1ED3n v\u1EC1 g\xF3c ru\u1ED9ng khi l\xE0m \u0111\u1EA5t. Gieo c\u1EA5y m\u1EADt \u0111\u1ED9 v\u1EEBa ph\u1EA3i (hi\u1EC7u \u1EE9ng h\xE0ng bi\xEAn).",
    safeManagement: "R\xFAt c\u1EA1n n\u01B0\u1EDBc ph\u01A1i ru\u1ED9ng n\u1EE9t ch\xE2n chim nh\u1EB9 \u0111\u1EC3 h\u1EA1 \u1EA9m \u0111\u1ED9 g\u1ED1c l\xFAa. Phun Validamycin ho\u1EB7c Hexaconazole / Azoxystrobin h\u01B0\u1EDBng th\u1EB3ng v\xF2i xu\u1ED1ng ph\u1EA7n g\u1ED1c b\u1EB9 l\xFAa.",
    treatmentSteps: {
      immediate: [
        "T\u1EA1m th\u1EDDi th\xE1o r\xFAt b\u1EDBt n\u01B0\u1EDBc m\u1EB7t ru\u1ED9ng \u0111\u1EC3 h\u1EA1 \u0111\u1ED9 \u1EA9m v\xF9ng g\u1ED1c v\xE0 b\u1EB9 l\xFAa, ng\u1EEBng b\xF3n ph\xE2n \u0111\u1EA1m.",
        "V\u1EA1ch g\u1ED1c kh\xF3m l\xFAa ki\u1EC3m tra chi\u1EC1u cao v\u1EBFt b\u1EC7nh: n\u1EBFu \u0111\xE3 b\xF2 l\xEAn qu\xE1 1/3 th\xE2n c\xE2y c\u1EA7n x\u1EED l\xFD ngay."
      ],
      biologicalAndCare: [
        "Phun ch\u1EBF ph\u1EA9m sinh h\u1ECDc Validamycin ho\u1EB7c ho\u1EA1t ch\u1EA5t \u0111\u1EB7c tr\u1ECB n\u1EA5m kh\xF4 v\u1EB1n, ch\u1EC9nh b\xE9c phun h\u01B0\u1EDBng th\u1EB3ng v\xE0o ph\u1EA7n TH\xC2N B\u1EB8 s\xE1t g\u1ED1c (kh\xF4ng ch\u1EC9 phun l\u01B0\u1EDBt tr\xEAn ng\u1ECDn l\xE1).",
        "V\u1EE5 sau v\u1EDBt s\u1EA1ch b\u1ECDt r\u01A1m r\u1EA1 d\u1EA1t \u1EDF g\xF3c b\u1EDD ru\u1ED9ng tr\u01B0\u1EDBc khi c\u1EA5y \u0111\u1EC3 gi\u1EA3m ngu\u1ED3n h\u1EA1ch n\u1EA5m."
      ],
      caution: [
        "Phun thu\u1ED1c kh\xF4ng tr\xFAng v\xF9ng g\u1ED1c b\u1EB9 n\u01A1i n\u1EA5m \u0111ang b\xE1m th\xEC hi\u1EC7u qu\u1EA3 ph\xF2ng tr\u1EEB s\u1EBD r\u1EA5t th\u1EA5p."
      ]
    },
    references: "Vi\u1EC7n Khoa h\u1ECDc N\xF4ng nghi\u1EC7p Vi\u1EC7t Nam (VAAS); IRRI Sheath Blight Protocol.",
    verificationStatus: "verified",
    verifiedBy: "H\u1ED9i \u0111\u1ED3ng Khoa h\u1ECDc VAAS",
    standardCode: "QCVN 01-37:2010/BNNPTNT",
    reviewDate: "2026-03-01",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/RiceSheathArk.jpg/330px-RiceSheathArk.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/RiceSheathArk.jpg/330px-RiceSheathArk.jpg",
        caption: "V\u1EBFt b\u1EC7nh v\u1EB1n da h\u1ED5 \u0111\u1EB7c tr\u01B0ng tr\xEAn b\u1EB9 th\xE2n c\xE2y l\xFAa s\xE1t g\u1ED1c",
        source: "University of Arkansas / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Culture_of_soil_fungus_Thanatephorus_cucumeris_%28anamorphic_Rhizoctonia_solani%29.jpg/960px-Culture_of_soil_fungus_Thanatephorus_cucumeris_%28anamorphic_Rhizoctonia_solani%29.jpg",
        caption: "H\u1EC7 s\u1EE3i n\u1EA5m v\xE0 c\xE1c h\u1EA1ch n\u1EA5m n\xE2u Rhizoctonia solani g\xE2y b\u1EC7nh kh\xF4 v\u1EB1n",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-14T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_brown_spot",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh \u0110\u1ED1m n\xE2u l\xFAa (Ti\xEAm l\u1EEDa)",
    englishName: "Rice Brown Spot",
    symptoms: "C\xE1c \u0111\u1ED1m tr\xF2n ho\u1EB7c b\u1EA7u d\u1EE5c nh\u1ECF m\xE0u n\xE2u s\u1EABm r\u1EA3i r\xE1c kh\u1EAFp phi\u1EBFn l\xE1, k\xEDch th\u01B0\u1EDBc nh\u01B0 h\u1EA1t m\xE8 (v\u1EEBng), kh\xE1c v\u1EDBi h\xECnh m\u1EAFt \xE9n nh\u1ECDn hai \u0111\u1EA7u c\u1EE7a b\u1EC7nh \u0111\u1EA1o \xF4n. T\xE2m v\u1EBFt l\u1EDBn c\xF3 th\u1EC3 chuy\u1EC3n x\xE1m nh\u1EA1t v\u1EDBi vi\u1EC1n v\xE0ng nh\u1EB9. H\u1EA1t l\xFAa b\u1ECB nhi\u1EC5m chuy\u1EC3n m\xE0u n\xE2u \u0111en.",
    symptomChecklist: [
      "\u0110\u1ED1m tr\xF2n/b\u1EA7u d\u1EE5c \u0111\u1EA7u t\xF9 gi\u1ED1ng h\u1EA1t v\u1EEBng (KH\xD4NG nh\u1ECDn hai \u0111\u1EA7u nh\u01B0 b\u1EC7nh \u0111\u1EA1o \xF4n).",
      "M\xE0u n\xE2u s\u1EABm \u0111\u1ED3ng \u0111\u1EC1u, xung quanh c\xF3 th\u1EC3 c\xF3 qu\u1EA7ng v\xE0ng m\u1EDD h\u1EB9p.",
      "Th\u01B0\u1EDDng x\u1EA3y ra \u0111\u1ED3ng th\u1EDDi v\u1EDBi bi\u1EC3u hi\u1EC7n l\xE1 l\xFAa c\xF2i c\u1ECDc v\xE0ng \xFAa tr\xEAn \u0111\u1EA5t c\xE1t, \u0111\u1EA5t chua ph\xE8n ngh\xE8o dinh d\u01B0\u1EE1ng."
    ],
    affectedPlantParts: ["leaf", "fruit"],
    causes: "N\u1EA5m Bipolaris oryzae (Cochliobolus miyabeanus), b\xF9ng ph\xE1t m\u1EA1nh khi c\xE2y l\xFAa thi\u1EBFu Kali, Silic ho\u1EB7c \u0111\u1EA5t chua ph\xE8n.",
    favorableConditions: "\u0110\u1EA5t c\xE1t pha ngh\xE8o h\u1EEFu c\u01A1 v\xF9ng duy\xEAn h\u1EA3i mi\u1EC1n Trung (Qu\u1EA3ng B\xECnh, Qu\u1EA3ng Tr\u1ECB, H\xE0 T\u0129nh), \u0111\u1EA5t ph\xE8n nh\u1EB9 ho\u1EB7c ru\u1ED9ng thi\u1EBFu n\u01B0\u1EDBc k\xE9o d\xE0i.",
    preventionMethods: "X\u1EED l\xFD ng\xE2m \u1EE7 gi\u1ED1ng s\u1EA1ch b\u1EC7nh, b\xF3n l\xF3t v\xF4i kh\u1EED chua, ph\xE2n chu\u1ED3ng hoai m\u1EE5c v\xE0 b\xF3n \u0111\u1EE7 Kali, Silic ngay t\u1EEB \u0111\u1EA7u v\u1EE5.",
    safeManagement: "Gi\u1EEF n\u01B0\u1EDBc t\u01B0\u1EDBi \u1ED5n \u0111\u1ECBnh kh\xF4ng \u0111\u1EC3 ru\u1ED9ng n\u1EE9t n\u1EBB; b\xF3n b\u1ED5 sung Kali v\xE0 ph\xE2n b\xF3n l\xE1 vi l\u01B0\u1EE3ng \u0111\u1EC3 c\xE2y kh\u1ECFe t\u1EF1 kh\xE1ng b\u1EC7nh tr\u01B0\u1EDBc khi c\u1EA7n d\xF9ng thu\u1ED1c n\u1EA5m.",
    treatmentSteps: {
      immediate: [
        "C\u1EA5p n\u01B0\u1EDBc \u1EA9m \u0111\u1EC1u cho ru\u1ED9ng n\u1EBFu \u0111\u1EA5t \u0111ang b\u1ECB kh\xF4 h\u1EA1n n\u1EE9t n\u1EBB ho\u1EB7c ph\u01A1i n\u1EAFng qu\xE1 m\u1EE9c.",
        "Ki\u1EC3m tra l\u1EA1i l\u1ECBch b\xF3n ph\xE2n xem ru\u1ED9ng c\xF3 \u0111ang b\u1ECB thi\u1EBFu L\xE2n, Kali ho\u1EB7c b\u1ECB ng\u1ED9 \u0111\u1ED9c ph\xE8n hay kh\xF4ng."
      ],
      biologicalAndCare: [
        "B\xF3n b\u1ED5 sung ph\xE2n Kali v\xE0 ph\xE2n b\xF3n gi\xE0u Silic/vi l\u01B0\u1EE3ng gi\xFAp c\xE2y ph\u1EE5c h\u1ED3i b\u1ED9 r\u1EC5 v\xE0 l\xE1 m\u1EDBi.",
        "N\u1EBFu t\u1EF7 l\u1EC7 \u0111\u1ED1m b\u1EC7nh v\u01B0\u1EE3t 20% di\u1EC7n t\xEDch l\xE1 \u1EDF giai \u0111o\u1EA1n \u0111\xF2ng tr\u1ED7, c\xF3 th\u1EC3 phun b\u1ED5 tr\u1EE3 thu\u1ED1c tr\u1EEB n\u1EA5m ph\u1ED5 r\u1ED9ng \u0111\u01B0\u1EE3c ph\xE9p s\u1EED d\u1EE5ng."
      ],
      caution: [
        "Kh\xF4ng nh\u1EA7m \u0111\u1ED1m n\xE2u h\u1EA1t v\u1EEBng v\u1EDBi \u0111\u1EA1o \xF4n \u0111\u1EC3 tr\xE1nh x\u1EED l\xFD sai (c\u1EAFt ph\xE2n khi c\xE2y th\u1EF1c ch\u1EA5t \u0111ang \u0111\xF3i dinh d\u01B0\u1EE1ng s\u1EBD l\xE0m \u0111\u1ED1m n\xE2u n\u1EB7ng h\u01A1n)."
      ]
    },
    references: "Vi\u1EC7n KHKT N\xF4ng nghi\u1EC7p B\u1EAFc Trung B\u1ED9 (ASIR); IRRI Rice Brown Spot Guide.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n ASIR & IRRI",
    standardCode: "IRRI SES Standard",
    reviewDate: "2026-03-02",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Bipolaris_oryzae.jpg/500px-Bipolaris_oryzae.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Bipolaris_oryzae.jpg/500px-Bipolaris_oryzae.jpg",
        caption: "C\xE1c \u0111\u1ED1m tr\xF2n b\u1EA7u d\u1EE5c m\xE0u n\xE2u s\u1EABm gi\u1ED1ng h\u1EA1t m\xE8 tr\xEAn phi\u1EBFn l\xE1 l\xFAa",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Cochliobolus_miyabeanus.jpg/960px-Cochliobolus_miyabeanus.jpg",
        caption: "V\u1EBFt \u0111\u1ED1m n\xE2u c\xF3 vi\u1EC1n v\xE0ng nh\u1EA1t lan d\xE0y tr\xEAn l\xE1 l\xFAa gi\xE0",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Bipolaris_oryzae_173160073.jpg/960px-Bipolaris_oryzae_173160073.jpg",
        caption: "B\xE0o t\u1EED n\u1EA5m Bipolaris oryzae d\u01B0\u1EDBi k\xEDnh hi\u1EC3n vi ki\u1EC3m ch\u1EE9ng",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-18T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_false_smut",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh Hoa c\xFAc / Than \u0111en h\u1EA1t l\xFAa (False Smut)",
    englishName: "Rice False Smut",
    symptoms: "Ch\u1EC9 bi\u1EC3u hi\u1EC7n r\xF5 khi l\xFAa v\xE0o ch\u1EAFc: t\u1EEBng h\u1EA1t l\xFAa ri\xEAng l\u1EBB tr\xEAn b\xF4ng bi\u1EBFn th\xE0nh kh\u1ED1i u tr\xF2n to g\u1EA5p 2-3 l\u1EA7n h\u1EA1t b\xECnh th\u01B0\u1EDDng. Ban \u0111\u1EA7u kh\u1ED1i u b\u1ECDc m\xE0ng tr\u1EAFng r\u1ED3i v\u1EE1 ra kh\u1ED1i ph\u1EA5n nhung m\xE0u v\xE0ng cam r\u1EF1c r\u1EE1, sau chuy\u1EC3n sang m\xE0u xanh \u0111en \u0111\u1EADm.",
    symptomChecklist: [
      "H\u1EA1t l\xFAa ph\u1ED3ng to th\xE0nh c\u1EE5c tr\xF2n m\u1EC1m ph\u1EE7 l\u1EDBp b\u1ED9t nhung m\xE0u v\xE0ng cam r\u1EF1c r\u1EE1 r\u1ED3i chuy\u1EC3n xanh \u0111en.",
      "B\u1EE5i ph\u1EA5n b\xE0o t\u1EED b\xE1m b\u1EA9n ra c\xE1c h\u1EA1t l\xFAa l\xE0nh xung quanh.",
      "Th\u01B0\u1EDDng xu\u1EA5t hi\u1EC7n r\u1EA3i r\xE1c tr\xEAn ru\u1ED9ng l\xFAa t\u1ED1t b\u1EDDi b\u1EDDi, b\xF3n d\u01B0 \u0111\u1EA1m cu\u1ED1i v\u1EE5."
    ],
    affectedPlantParts: ["fruit"],
    causes: "N\u1EA5m Ustilaginoidea virens (Villosiclava virens). X\xE2m nh\u1EADp v\xE0o hoa l\xFAa giai \u0111o\u1EA1n \u0111\xF2ng s\u1EAFp tr\u1ED7.",
    favorableConditions: "Th\u1EDDi ti\u1EBFt m\u01B0a ph\xF9n \xE2m u k\xE9o d\xE0i \u0111\xFAng l\xFAc l\xFAa tr\u1ED7 ph\u01A1i m\xE0u (24-30\xB0C), \u1EA9m \u0111\u1ED9 >90%, b\xF3n th\u1EEBa ph\xE2n \u0111\u1EA1m mu\u1ED9n.",
    preventionMethods: "Kh\xF4ng l\u1EA5y gi\u1ED1ng t\u1EEB ru\u1ED9ng b\u1ECB b\u1EC7nh hoa c\xFAc. B\xF3n ph\xE2n c\xE2n \u0111\u1ED1i, d\u1EE9t \u0111\u1EA1m s\u1EDBm tr\u01B0\u1EDBc khi l\xFAa l\xE0m \u0111\xF2ng ho\xE0n to\xE0n.",
    safeManagement: "Ng\u1EAFt nh\u1EB9 c\xE1c b\xF4ng c\xF3 h\u1EA1t h\xF3a \u0111en cho v\xE0o t\xFAi nilon k\xEDn mang ra kh\u1ECFi ru\u1ED9ng (tr\xE1nh gi\u0169 r\u01A1i b\u1ED9t n\u1EA5m xu\u1ED1ng \u0111\u1EA5t cho v\u1EE5 sau). V\u1EE5 t\u1EDBi c\u1EA7n phun ph\xF2ng \u1EDF giai \u0111o\u1EA1n tr\u01B0\u1EDBc khi l\xFAa tr\u1ED7 5-7 ng\xE0y (\u0111\xF2ng gi\xE0 \xF4m b\u1EAFp).",
    treatmentSteps: {
      immediate: [
        "Khi ph\xE1t hi\u1EC7n h\u1EA1t h\xF3a kh\u1ED1i ph\u1EA5n v\xE0ng cam/\u0111en tr\xEAn b\xF4ng l\xFAc l\xFAa s\u1EAFp g\u1EB7t, d\xF9ng t\xFAi nilon ch\u1EE5p nh\u1EB9 t\u1EEB tr\xEAn xu\u1ED1ng ng\u1EAFt b\u1ECF mang \u0111i ti\xEAu h\u1EE7y (kh\xF4ng b\xF3p v\u1EE1 t\u1EA1i ru\u1ED9ng)."
      ],
      biologicalAndCare: [
        "V\u1EE5 sau x\u1EED l\xFD h\u1EA1t gi\u1ED1ng s\u1EA1ch tr\u01B0\u1EDBc khi gieo v\xE0 c\xE0y v\xF9i s\xE2u r\u01A1m r\u1EA1 k\u1EBFt h\u1EE3p v\xF4i b\u1ED9t \u0111\u1EC3 ti\xEAu di\u1EC7t h\u1EA1ch n\u1EA5m l\u01B0u t\u1ED3n.",
        "N\u1EBFu khu v\u1EF1c th\u01B0\u1EDDng xuy\xEAn b\u1ECB b\u1EC7nh hoa c\xFAc, phun ph\xF2ng n\u1EA5m l\xFAc l\xFAa \u0111ang l\xE0m \u0111\xF2ng gi\xE0 (tr\u01B0\u1EDBc tr\u1ED7 5-7 ng\xE0y)."
      ],
      caution: [
        "Khi h\u1EA1t \u0111\xE3 bi\u1EBFn th\xE0nh kh\u1ED1i b\u1ED9t v\xE0ng \u0111en ngo\xE0i b\xF4ng l\xFAa th\xEC m\u1ECDi thu\u1ED1c phun \u0111\u1EC1u KH\xD4NG ch\u1EEFa \u0111\u01B0\u1EE3c h\u1EA1t \u0111\xF3 n\u1EEFa; h\u1EA1t nhi\u1EC5m b\u1EC7nh c\xF3 th\u1EC3 ch\u1EE9a \u0111\u1ED9c t\u1ED1 n\u1EA5m, kh\xF4ng d\xF9ng l\xE0m th\u1EE9c \u0103n ch\u0103n nu\xF4i."
      ]
    },
    references: "Vi\u1EC7n Nghi\xEAn c\u1EE9u L\xFAa Qu\u1ED1c t\u1EBF (IRRI); Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "IRRI Diagnostic Reference",
    reviewDate: "2026-03-07",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Rice_false_smut.jpg/960px-Rice_false_smut.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Rice_false_smut.jpg/960px-Rice_false_smut.jpg",
        caption: "H\u1EA1t l\xFAa bi\u1EBFn th\xE0nh kh\u1ED1i u ph\u1EA5n nhung m\xE0u v\xE0ng cam \u0111\u1EBFn xanh \u0111en",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/U.Virens.jpg/960px-U.Virens.jpg",
        caption: "Nhi\u1EC1u h\u1EA1t tr\xEAn b\xF4ng l\xFAa b\u1ECB bi\u1EBFn d\u1EA1ng do n\u1EA5m b\u1EC7nh hoa c\xFAc",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Ustilaginoidea_virens_20151031-2.jpg/960px-Ustilaginoidea_virens_20151031-2.jpg",
        caption: "Kh\u1ED1i b\xE0o t\u1EED Ustilaginoidea virens giai \u0111o\u1EA1n ch\xEDn chuy\u1EC3n m\xE0u \u0111en s\u1EABm",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-05T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_bacterial_leaf_streak",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh S\u1ECDc trong vi khu\u1EA9n h\u1EA1i l\xFAa (Bacterial Leaf Streak)",
    englishName: "Rice Bacterial Leaf Streak",
    symptoms: "Tr\xEAn phi\u1EBFn l\xE1 xu\u1EA5t hi\u1EC7n c\xE1c v\u1EC7t s\u1ECDc r\u1EA5t m\u1EA3nh, h\u1EB9p ch\u1EA1y d\u1ECDc gi\u1EEFa hai g\xE2n l\xE1 ch\xEDnh. Ban \u0111\u1EA7u s\u1ECDc c\xF3 m\xE0u xanh \u0111\u1EADm trong m\u1EDD nh\u01B0 th\u1EA5m n\u01B0\u1EDBc khi soi ng\u01B0\u1EE3c \xE1nh s\xE1ng, sau chuy\u1EC3n v\xE0ng cam r\u1ED3i n\xE2u kh\xF4. S\xE1ng s\u1EDBm c\xF3 nhi\u1EC1u gi\u1ECDt d\u1ECBch vi khu\u1EA9n nh\u1ECF li ti d\u1ECDc theo s\u1ECDc.",
    symptomChecklist: [
      "V\u1EC7t s\u1ECDc h\u1EB9p ch\u1EA1y th\u1EB3ng theo g\xE2n l\xE1 (kh\xE1c v\u1EDBi b\u1EA1c l\xE1 ch\xE1y lan th\xE0nh m\u1EA3ng g\u1EE3n s\xF3ng t\u1EEB m\xE9p l\xE1).",
      "Gi\u01A1 l\xE1 ng\u01B0\u1EE3c l\xEAn \xE1nh n\u1EAFng th\u1EA5y c\xE1c v\u1EC7t s\u1ECDc trong m\u1EDD nh\u01B0 th\u1EA5m n\u01B0\u1EDBc.",
      "Khi n\u1EAFng l\xEAn, gi\u1ECDt d\u1ECBch vi khu\u1EA9n kh\xF4 l\u1EA1i th\xE0nh h\u1EA1t c\u01B0\u1EDDm nh\u1ECF m\xE0u v\xE0ng cam b\xE1m tr\xEAn m\u1EB7t l\xE1."
    ],
    affectedPlantParts: ["leaf"],
    causes: "Vi khu\u1EA9n Xanthomonas oryzae pv. oryzicola, x\xE2m nh\u1EADp qua kh\xED kh\u1ED5ng tr\xEAn to\xE0n m\u1EB7t l\xE1.",
    favorableConditions: "M\xF9a H\xE8 Thu / M\xF9a gi\xF3 m\u1EA1nh m\u01B0a gi\xF4ng l\xE0m l\xE1 c\u1ECD x\xE1t, nhi\u1EC7t \u0111\u1ED9 cao 28-34\xB0C, \u1EA9m \u0111\u1ED9 b\xE3o h\xF2a v\xE0 b\xF3n th\u1EEBa \u0111\u1EA1m.",
    preventionMethods: "S\u1EED d\u1EE5ng h\u1EA1t gi\u1ED1ng s\u1EA1ch b\u1EC7nh (x\u1EED l\xFD n\u01B0\u1EDBc n\xF3ng 54\xB0C ho\u1EB7c thu\u1ED1c x\u1EED l\xFD h\u1EA1t). Kh\xF4ng gieo s\u1EA1 qu\xE1 d\xE0y.",
    safeManagement: "Ng\u1EEBng b\xF3n ph\xE2n \u0111\u1EA1m ngay, r\xFAt n\u01B0\u1EDBc ru\u1ED9ng h\u1EE3p l\xFD v\xE0 s\u1EED d\u1EE5ng ch\u1EBF ph\u1EA9m kh\xE1ng khu\u1EA9n sinh h\u1ECDc t\u01B0\u01A1ng t\u1EF1 quy tr\xECnh ph\xF2ng tr\u1EEB b\u1EA1c l\xE1.",
    treatmentSteps: {
      immediate: [
        "D\u1EEBng b\xF3n \u0111\u1EA1m v\xE0 ph\xE2n b\xF3n l\xE1 \u0111\u1EA1m cao ngay khi th\u1EA5y s\u1ECDc trong tr\xEAn l\xE1.",
        "H\u1EA1n ch\u1EBF \u0111i l\u1EA1i l\xE0m x\xE2y x\xE1t l\xE1 l\xFAa v\xE0o s\xE1ng s\u1EDBm khi c\xF2n \u01B0\u1EDBt s\u01B0\u01A1ng."
      ],
      biologicalAndCare: [
        "Phun ch\u1EBF ph\u1EA9m kh\xE1ng khu\u1EA9n sinh h\u1ECDc ho\u1EB7c ho\u1EA1t ch\u1EA5t \u0111\u1EB7c tr\u1ECB vi khu\u1EA9n ngay khi b\u1EC7nh m\u1EDBi ch\u1EDBm 5-10% s\u1ED1 l\xE1.",
        "B\u1ED5 sung nh\u1EB9 ph\xE2n Kali \u0111\u1EC3 l\xE1 \u0111\u1EE9ng c\u1EE9ng v\xE0 mau ph\u1EE5c h\u1ED3i."
      ],
      caution: [
        "R\u1EA5t d\u1EC5 nh\u1EA7m v\u1EDBi b\u1EC7nh \u0111\u1EA1o \xF4n giai \u0111o\u1EA1n \u0111\u1EA7u ho\u1EB7c thi\u1EBFu ch\u1EA5t; h\xE3y soi l\xE1 ng\u01B0\u1EE3c s\xE1ng t\xECm v\u1EC7t trong m\u1EDD v\xE0 h\u1EA1t c\u01B0\u1EDDm d\u1ECBch khu\u1EA9n."
      ]
    },
    references: "IRRI Bacterial Leaf Streak Compendium; Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "IRRI & Vi\u1EC7n BVTV Vi\u1EC7t Nam",
    standardCode: "QCVN 01-38:2010/BNNPTNT",
    reviewDate: "2026-03-07",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Cruz_Xoc_penya.jpg/500px-Cruz_Xoc_penya.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Cruz_Xoc_penya.jpg/500px-Cruz_Xoc_penya.jpg",
        caption: "C\xE1c v\u1EC7t s\u1ECDc m\u1EA3nh ch\u1EA1y d\u1ECDc gi\u1EEFa g\xE2n l\xE1 trong m\u1EDD nh\u01B0 th\u1EA5m n\u01B0\u1EDBc",
        source: "IRRI / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Xoc_dia.jpg/500px-Xoc_dia.jpg",
        caption: "S\u1ECDc v\xE0ng cam li\xEAn k\u1EBFt d\u1ECDc phi\u1EBFn l\xE1 k\xE8m d\u1ECBch vi khu\u1EA9n kh\xF4",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/9H-XOC_%2851816944053%29.jpg/960px-9H-XOC_%2851816944053%29.jpg",
        caption: "Quan s\xE1t v\u1EC7t s\u1ECDc trong m\u1EDD tr\xEAn phi\u1EBFn l\xE1 l\xFAa d\u01B0\u1EDBi \xE1nh s\xE1ng",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-08T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_bakanae",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh L\xFAa von (C\xE2y cao v\u1ED1ng th\u1ED1i g\u1ED1c - Bakanae)",
    englishName: "Rice Bakanae Disease",
    symptoms: "C\xE2y l\xFAa b\u1EC7nh m\u1ECDc v\u1ED1ng cao v\u1ECDt h\u01A1n h\u1EB3n kh\xF3m l\xFAa kh\u1ECFe xung quanh (g\u1EA5p 1.5 l\u1EA7n), th\xE2n m\u1EA3nh, l\xE1 m\xE0u xanh nh\u1EA1t v\xE0ng \xFAa. C\xE1c \u0111\u1ED1t th\xE2n ph\xEDa tr\xEAn m\u1ECDc ra r\u1EC5 ph\u1EE5 tua t\u1EE7a, ph\u1EA7n g\u1ED1c th\xE2n b\u1ECB th\u1ED1i kh\xF4 v\xE0 ph\u1EE7 l\u1EDBp ph\u1EA5n n\u1EA5m m\xE0u tr\u1EAFng h\u1ED3ng nh\u1EA1t.",
    symptomChecklist: [
      "C\xE2y l\xFAa v\u1ECDt cao b\u1EA5t th\u01B0\u1EDDng v\u01B0\u1EE3t h\u1EB3n l\xEAn kh\u1ECFi m\u1EB7t ru\u1ED9ng nh\u01B0ng th\xE2n \u1ED1m y\u1EBFu, l\xE1 xanh v\xE0ng nh\u1EE3t.",
      "R\u1EC5 ph\u1EE5 m\u1ECDc ra nhi\u1EC1u t\u1EEB c\xE1c \u0111\u1ED1t th\xE2n \u1EDF tr\xEAn cao.",
      "G\u1ED1c th\xE2n g\u1EA7n m\u1EB7t n\u01B0\u1EDBc th\u1ED1i m\u1EE5c v\xE0 th\u01B0\u1EDDng c\xF3 l\u1EDBp t\u01A1 ph\u1EA5n m\xE0u tr\u1EAFng ph\u1EDBt h\u1ED3ng."
    ],
    affectedPlantParts: ["stem", "leaf"],
    causes: "N\u1EA5m Fusarium fujikuroi (Gibberella fujikuroi). N\u1EA5m ti\u1EBFt ch\u1EA5t k\xEDch th\xEDch sinh tr\u01B0\u1EDFng Gibberellin l\xE0m c\xE2y v\u1ED1ng cao r\u1ED3i ch\u1EBFt r\u1EE5i.",
    favorableConditions: "H\u1EA1t gi\u1ED1ng nhi\u1EC5m b\xE0o t\u1EED n\u1EA5m kh\xF4ng \u0111\u01B0\u1EE3c x\u1EED l\xFD k\u1EF9 khi ng\xE2m \u1EE7; th\u1EDDi ti\u1EBFt \u1EA5m 28-35\xB0C.",
    preventionMethods: "Ch\u1ECDn gi\u1ED1ng x\xE1c nh\u1EADn s\u1EA1ch b\u1EC7nh, x\u1EED l\xFD h\u1EA1t gi\u1ED1ng k\u1EF9 b\u1EB1ng n\u01B0\u1EDBc mu\u1ED1i 15% v\u1EDBt b\u1ECF h\u1EA1t l\u1EEDng v\xE0 ng\xE2m thu\u1ED1c tr\u1EEB n\u1EA5m tr\u01B0\u1EDBc khi \u1EE7.",
    safeManagement: "Nh\u1ED5 b\u1ECF ngay to\xE0n b\u1ED9 kh\xF3m l\xFAa von mang ra kh\u1ECFi ru\u1ED9ng ti\xEAu h\u1EE7y tr\u01B0\u1EDBc khi n\u1EA5m ph\xE1t t\xE1n ph\u1EA5n h\u1ED3ng sang b\xF4ng l\xFAa kh\u1ECFe b\xEAn c\u1EA1nh.",
    treatmentSteps: {
      immediate: [
        "Nh\u1ED5 b\u1ECF t\u1EADn g\u1ED1c to\xE0n b\u1ED9 c\xE1c kh\xF3m l\xFAa m\u1ECDc v\u1ECDt cao b\u1EA5t th\u01B0\u1EDDng tr\xEAn ru\u1ED9ng, b\u1ECF v\xE0o bao mang ra kh\u1ECFi b\u1EDD ru\u1ED9ng ti\xEAu h\u1EE7y."
      ],
      biologicalAndCare: [
        "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng \u0111\u1EC3 l\xFAa tr\xEAn ru\u1ED9ng c\xF3 nhi\u1EC1u l\xFAa von l\xE0m h\u1EA1t gi\u1ED1ng cho v\u1EE5 sau.",
        "V\u1EE5 sau ph\u1EA3i x\u1EED l\xFD h\u1EA1t gi\u1ED1ng b\u1EB1ng n\u01B0\u1EDBc n\xF3ng 54\xB0C trong 15 ph\xFAt ho\u1EB7c ch\u1EBF ph\u1EA9m x\u1EED l\xFD gi\u1ED1ng tr\u01B0\u1EDBc khi ng\xE2m \u1EE7."
      ],
      caution: [
        "Kh\xF4ng ch\u1EDD \u0111\u1EBFn khi l\xFAa tr\u1ED7 m\u1EDBi nh\u1ED5 v\xEC l\u1EDBp ph\u1EA5n b\xE0o t\u1EED m\xE0u h\u1ED3ng \u1EDF g\u1ED1c c\xE2y von s\u1EBD bay v\xE0o b\xE1m l\xEAn h\u1EA1t l\xFAa kh\u1ECFe v\xE0 l\xE2y sang c\u1EA3 v\u1EE5 sau."
      ]
    },
    references: "JIRCAS Bakanae Research; Vi\u1EC7n L\xFAa \u0110BSCL & Vi\u1EC7n BVTV Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "JIRCAS & Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt",
    standardCode: "IRRI Seed Health Standard",
    reviewDate: "2026-03-07",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Bakanae_Disease_sporulation_JIRCAS.jpg/960px-Bakanae_Disease_sporulation_JIRCAS.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Bakanae_Disease_sporulation_JIRCAS.jpg/960px-Bakanae_Disease_sporulation_JIRCAS.jpg",
        caption: "L\u1EDBp ph\u1EA5n b\xE0o t\u1EED n\u1EA5m m\xE0u tr\u1EAFng h\u1ED3ng ph\xE1t tri\u1EC3n tr\xEAn b\u1EB9 th\xE2n l\xFAa von",
        source: "JIRCAS / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Gibberella_fujikuroi.jpg/960px-Gibberella_fujikuroi.jpg",
        caption: "N\u1EA5m Gibberella fujikuroi (Fusarium fujikuroi) g\xE2y v\u1ECDt th\xE2n v\xE0 th\u1ED1i g\u1ED1c l\xFAa",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-09T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_tungro",
    cropType: "rice",
    vietnameseName: "B\u1EC7nh V\xE0ng l\xF9n / Tungro & R\u1EA7y xanh \u0111u\xF4i \u0111en h\u1EA1i l\xFAa",
    englishName: "Rice Tungro Virus & Green Leafhopper",
    symptoms: "Kh\xF3m l\xFAa b\u1ECB l\xF9n th\u1EA5p c\xF2i c\u1ECDc r\xF5 r\u1EC7t, \u0111\u1EBB nh\xE1nh \xEDt. L\xE1 non v\xE0 l\xE1 b\xE1nh t\u1EBB chuy\u1EC3n sang m\xE0u v\xE0ng da cam r\u1EF1c t\u1EEB ch\xF3p l\xE1 lan d\u1EA7n xu\u1ED1ng, \u0111\xF4i khi h\u01A1i xo\u1EAFn nh\u1EB9. Quan s\xE1t tr\xEAn ru\u1ED9ng th\u1EA5y r\u1EA7y xanh \u0111u\xF4i \u0111en bay r\u1ED9.",
    symptomChecklist: [
      "B\u1EE5i l\xFAa l\xF9n th\u1EA5p h\u1EB3n xu\u1ED1ng so v\u1EDBi kh\xF3m b\xEAn c\u1EA1nh.",
      "L\xE1 chuy\u1EC3n m\xE0u v\xE0ng cam s\xE1ng t\u1EEB ch\xF3p xu\u1ED1ng d\u01B0\u1EDBi (kh\xE1c v\u1EDBi v\xE0ng l\xE1 do thi\u1EBFu n\u01B0\u1EDBc ho\u1EB7c ngh\u1EB9t r\u1EC5 th\u01B0\u1EDDng v\xE0ng l\xE1 gi\xE0 d\u01B0\u1EDBi g\u1ED1c tr\u01B0\u1EDBc).",
      "Th\u1EA5y nhi\u1EC1u r\u1EA7y xanh c\xF3 ch\u1EA5m \u0111en \u1EDF ch\xF3p c\xE1nh (r\u1EA7y xanh \u0111u\xF4i \u0111en) b\xE1m h\xFAt nh\u1EF1a tr\xEAn l\xE1."
    ],
    affectedPlantParts: ["leaf", "stem"],
    causes: "Ph\u1EE9c h\u1EE3p virus Tungro (ho\u1EB7c virus L\xF9n xo\u1EAFn l\xE1/V\xE0ng l\xF9n) do c\xF4n tr\xF9ng m\xF4i gi\u1EDBi r\u1EA7y xanh \u0111u\xF4i \u0111en (Nephotettix virescens) v\xE0 r\u1EA7y n\xE2u truy\u1EC1n lan.",
    favorableConditions: "Gieo c\u1EA5y kh\xF4ng \u0111\u1ED3ng lo\u1EA1t (l\xFAa nhi\u1EC1u tr\xE0 \u0111an xen), ru\u1ED9ng c\xF3 nhi\u1EC1u c\u1ECF d\u1EA1i b\u1EDD m\u01B0\u01A1ng l\xE0m n\u01A1i tr\xFA ng\u1EE5 cho r\u1EA7y truy\u1EC1n virus.",
    preventionMethods: '\xC1p d\u1EE5ng gieo s\u1EA1 \u0111\u1ED3ng lo\u1EA1t, "n\xE9 r\u1EA7y" theo l\u1ECBch khuy\u1EBFn c\xE1o c\u1EE7a Chi c\u1EE5c BVTV \u0111\u1ECBa ph\u01B0\u01A1ng; l\xE0m s\u1EA1ch c\u1ECF l\u1ED3ng v\u1EF1c, c\u1ECF g\u1EA1o quanh b\u1EDD ru\u1ED9ng.',
    safeManagement: "Nh\u1ED5 v\xF9i ngay c\xE1c kh\xF3m l\xFAa b\u1ECB v\xE0ng l\xF9n c\xF2i c\u1ECDc xu\u1ED1ng b\xF9n n\u1EBFu t\u1EF7 l\u1EC7 th\u1EA5p, \u0111\u1ED3ng th\u1EDDi tr\u1EEB r\u1EA7y xanh/r\u1EA7y n\xE2u k\u1ECBp th\u1EDDi \u0111\u1EC3 kh\xF4ng truy\u1EC1n virus sang ru\u1ED9ng l\xE2n c\u1EADn.",
    treatmentSteps: {
      immediate: [
        "Ki\u1EC3m tra xem ru\u1ED9ng c\xF3 r\u1EA7y xanh \u0111u\xF4i \u0111en ho\u1EB7c r\u1EA7y n\xE2u \u0111ang ch\xEDch h\xFAt truy\u1EC1n b\u1EC7nh kh\xF4ng.",
        "N\u1EBFu ru\u1ED9ng ch\u1EC9 nhi\u1EC5m r\u1EA3i r\xE1c v\xE0i kh\xF3m, nh\u1ED5 v\xF9i s\xE2u xu\u1ED1ng b\xF9n ngay l\u1EADp t\u1EE9c."
      ],
      biologicalAndCare: [
        "Phun ch\u1EBF ph\u1EA9m tr\u1EEB r\u1EA7y m\xF4i gi\u1EDBi theo khuy\u1EBFn c\xE1o n\u1EBFu m\u1EADt \u0111\u1ED9 r\u1EA7y cao \u0111\u1EC3 ch\u1EB7n l\xE2y lan virus.",
        "B\xE1o Tr\u1EA1m Khuy\u1EBFn n\xF4ng/BVTV x\xE3 \u0111\u1EC3 ki\u1EC3m tra di\u1EC7n r\u1ED9ng n\u1EBFu nhi\u1EC1u ru\u1ED9ng xu\u1EA5t hi\u1EC7n tri\u1EC7u ch\u1EE9ng l\xF9n v\xE0ng \u0111\u1ED3ng lo\u1EA1t."
      ],
      caution: [
        "B\u1EC7nh do VIRUS kh\xF4ng c\xF3 thu\u1ED1c ch\u1EEFa kh\u1ECFi c\xE2y \u0111\xE3 nhi\u1EC5m \u2014 tuy\u1EC7t \u0111\u1ED1i kh\xF4ng mua ph\xE2n k\xEDch th\xEDch hay thu\u1ED1c n\u1EA5m phun v\xE0o c\xE2y \u0111\xE3 v\xE0ng l\xF9n v\xEC ch\u1EC9 t\u1ED1n ti\u1EC1n."
      ]
    },
    references: "IRRI Rice Tungro Diagnostic Manual; C\u1EE5c B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "IRRI & C\u1EE5c BVTV Vi\u1EC7t Nam",
    standardCode: "Quy tr\xECnh ph\xF2ng ch\u1ED1ng V\xE0ng l\xF9n - L\xF9n xo\u1EAFn l\xE1",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Rice_plants_affected_by_tungro_disease1.jpg/960px-Rice_plants_affected_by_tungro_disease1.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Rice_plants_affected_by_tungro_disease1.jpg/960px-Rice_plants_affected_by_tungro_disease1.jpg",
        caption: "Kh\xF3m l\xFAa c\xF2i c\u1ECDc, l\xE1 chuy\u1EC3n m\xE0u v\xE0ng cam r\u1EF1c do nhi\u1EC5m virus Tungro",
        source: "IRRI / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Green_leafhopper_%28Nephotettix_virescens%29_UGA5190052.jpg/500px-Green_leafhopper_%28Nephotettix_virescens%29_UGA5190052.jpg",
        caption: "R\u1EA7y xanh \u0111u\xF4i \u0111en (Nephotettix virescens) - c\xF4n tr\xF9ng ch\xEDnh truy\u1EC1n b\u1EC7nh Tungro",
        source: "Bugwood.org / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Fmicb-09-03235-g008.jpg/960px-Fmicb-09-03235-g008.jpg",
        caption: "So s\xE1nh c\xE2y l\xFAa nhi\u1EC5m b\u1EC7nh l\xF9n v\xE0ng v\xE0 kh\xF3m l\xFAa kh\u1ECFe \u0111\u1ED1i ch\u1EE9ng",
        source: "Frontiers / Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-11T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_brown_planthopper",
    cropType: "rice",
    vietnameseName: "R\u1EA7y n\xE2u h\u1EA1i l\xFAa & Ch\xE1y r\u1EA7y (Brown Planthopper)",
    englishName: "Rice Brown Planthopper (Hopperburn)",
    symptoms: 'R\u1EA7y n\xE2u tr\u01B0\u1EDFng th\xE0nh v\xE0 r\u1EA7y c\xE1m m\xE0u n\xE2u s\u1ED1ng t\u1EE5 t\u1EADp d\xE0y \u0111\u1EB7c \u1EDF ph\u1EA7n g\u1ED1c th\xE2n l\xFAa s\xE1t m\u1EB7t n\u01B0\u1EDBc, ch\xEDch h\xFAt nh\u1EF1a c\xE2y. Khi m\u1EADt \u0111\u1ED9 cao, kh\xF3m l\xFAa v\xE0ng h\xE9o kh\xF4 r\u1EE5i nhanh ch\xF3ng t\u1EA1o th\xE0nh c\xE1c v\u1EC7t tr\xF2n "ch\xE1y r\u1EA7y" lan r\u1ED9ng gi\u1EEFa ru\u1ED9ng.',
    symptomChecklist: [
      "V\u1EA1ch g\u1ED1c kh\xF3m l\xFAa th\u1EA5y r\u1EA5t nhi\u1EC1u r\u1EA7y nh\u1ECF m\xE0u n\xE2u b\xE1m s\xE1t b\u1EB9 th\xE2n tr\xEAn m\u1EB7t n\u01B0\u1EDBc ho\u1EB7c nh\u1EA3y r\xE0o r\xE0o xu\u1ED1ng n\u01B0\u1EDBc.",
      "Th\xE2n l\xFAa s\xE1t g\u1ED1c c\xF3 v\u1EBFt \u0111en nh\u0169n ho\u1EB7c l\u1EDBp mu\u1ED9i \u0111en do m\u1EADt ng\u1ECDt c\u1EE7a r\u1EA7y ti\u1EBFt ra.",
      'Ru\u1ED9ng l\xFAa xu\u1EA5t hi\u1EC7n t\u1EEBng ch\xF2m h\xECnh tr\xF2n h\xE9o ch\xE1y v\xE0ng n\xE2u ("ch\xE1y r\u1EA7y").'
    ],
    affectedPlantParts: ["stem", "leaf"],
    causes: "R\u1EA7y n\xE2u (Nilaparvata lugens), sinh s\u1EA3n c\u1EF1c nhanh v\xE0 truy\u1EC1n b\u1EC7nh virus v\xE0ng l\xF9n - l\xF9n xo\u1EAFn l\xE1.",
    favorableConditions: "Ru\u1ED9ng gieo s\u1EA1 d\xE0y, b\xF3n th\u1EEBa \u0111\u1EA1m, phun thu\u1ED1c tr\u1EEB s\xE2u ph\u1ED5 r\u1ED9ng qu\xE1 s\u1EDBm l\xE0m ch\u1EBFt h\u1EBFt thi\xEAn \u0111\u1ECBch (nh\u1EC7n, b\u1ECD x\xEDt m\xF9 xanh).",
    preventionMethods: 'C\xF4ng ngh\u1EC7 sinh th\xE1i "b\u1EDD hoa" thu h\xFAt thi\xEAn \u0111\u1ECBch; kh\xF4ng phun thu\u1ED1c tr\u1EEB s\xE2u h\xF3a h\u1ECDc trong 40 ng\xE0y \u0111\u1EA7u sau s\u1EA1 \u0111\u1EC3 b\u1EA3o v\u1EC7 nh\u1EC7n b\u1EAFt m\u1ED3i.',
    safeManagement: "D\xE2ng m\u1EF1c n\u01B0\u1EDBc ru\u1ED9ng l\xEAn ng\u1EADp m\u1ED9t ph\u1EA7n g\u1ED1c n\u1EBFu c\xE2y c\xF2n nh\u1ECF (ho\u1EB7c v\u1EA1ch h\xE0ng l\xFAa), phun thu\u1ED1c \u0111\u1EB7c tr\u1ECB r\u1EA7y (nh\u01B0 Pymetrozine, Dinotefuran ho\u1EB7c n\u1EA5m xanh Metarhizium) h\u01B0\u1EDBng th\u1EB3ng v\xF2i xu\u1ED1ng G\u1ED0C L\xDAA.",
    treatmentSteps: {
      immediate: [
        "V\u1EA1ch g\u1ED1c 5-10 kh\xF3m l\xFAa \u1EDF nhi\u1EC1u \u0111i\u1EC3m \u0111\u1EC3 \u0111\u1EBFm m\u1EADt \u0111\u1ED9 r\u1EA7y non (r\u1EA7y c\xE1m tu\u1ED5i 1-2 l\xE0 l\xFAc d\u1EC5 di\u1EC7t nh\u1EA5t).",
        "N\u1EBFu ru\u1ED9ng chu\u1EA9n b\u1ECB v\xE0o giai \u0111o\u1EA1n ch\xEDn s\u1EAFp thu ho\u1EA1ch b\u1ECB ch\xE1y r\u1EA7y ch\xF2m, gi\u1EEF n\u01B0\u1EDBc v\xE0 thu ho\u1EA1ch s\u1EDBm tr\xE1nh \u0111\u1ED5 ng\xE3."
      ],
      biologicalAndCare: [
        "Khi r\u1EA7y c\xE1m n\u1EDF r\u1ED9 (m\u1EADt \u0111\u1ED9 >1.500 con/m\xB2 ho\u1EB7c >20 con/kh\xF3m), phun thu\u1ED1c \u0111\u1EB7c tr\u1ECB r\u1EA7y ho\u1EB7c ch\u1EBF ph\u1EA9m n\u1EA5m xanh Metarhizium; ph\u1EA3i r\u1EBD h\xE0ng v\xE0 ch\u0129a v\xF2i phun xu\u1ED1ng G\u1ED0C L\xDAA.",
        "D\xE2ng m\u1EF1c n\u01B0\u1EDBc ru\u1ED9ng kho\u1EA3ng 5-7 cm trong l\xFAc phun \u0111\u1EC3 d\u1ED3n r\u1EA7y leo l\xEAn cao d\u1EC5 ti\u1EBFp x\xFAc thu\u1ED1c."
      ],
      caution: [
        "Phun l\u01B0\u1EDBt tr\xEAn ng\u1ECDn l\xE1 kh\xF4ng t\u1EDBi g\u1ED1c s\u1EBD kh\xF4ng di\u1EC7t \u0111\u01B0\u1EE3c r\u1EA7y n\xE2u m\xE0 c\xF2n l\xE0m r\u1EA7y kh\xE1ng thu\u1ED1c m\u1EA1nh h\u01A1n."
      ]
    },
    references: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; IRRI & CSIRO Rice Planthopper Manual.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n BVTV Vi\u1EC7t Nam & IRRI",
    standardCode: "QCVN 01-38:2010/BNNPTNT (\u0110i\u1EC1u tra d\u1ECBch h\u1EA1i l\xFAa)",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg/960px-Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg/960px-Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg",
        caption: "R\u1EA7y n\xE2u Nilaparvata lugens b\xE1m ch\xEDch h\xFAt nh\u1EF1a \u1EDF ph\u1EA7n b\u1EB9 g\u1ED1c l\xFAa",
        source: "Bugwood.org / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Rice_damage_caused_by_planthoppers_in_Ikaruga_-_Sep_24%2C_2020.jpg/500px-Rice_damage_caused_by_planthoppers_in_Ikaruga_-_Sep_24%2C_2020.jpg",
        caption: 'Hi\u1EC7n t\u01B0\u1EE3ng "ch\xE1y r\u1EA7y" th\xE0nh t\u1EEBng ch\xF2m v\xE0ng h\xE9o r\u1EE5i tr\xEAn ru\u1ED9ng l\xFAa',
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-12T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_yellow_stem_borer",
    cropType: "rice",
    vietnameseName: "S\xE2u \u0111\u1EE5c th\xE2n l\xFAa 2 ch\u1EA5m (Yellow Stem Borer)",
    englishName: "Rice Yellow Stem Borer",
    symptoms: 'Giai \u0111o\u1EA1n \u0111\u1EBB nh\xE1nh: s\xE2u non \u0111\u1EE5c v\xE0o b\xEAn trong n\xF5n th\xE2n l\xE0m d\u1EA3nh l\xFAa gi\u1EEFa b\u1ECB h\xE9o v\xE0ng g\u1ECDi l\xE0 "d\u1EA3nh h\xE9o" (d\xF9ng tay r\xFAt nh\u1EB9 n\xF5n th\u1EA5y tu\u1ED9t ra v\xE0 g\u1ED1c n\xF5n th\u1ED1i c\xF3 s\xE2u). Giai \u0111o\u1EA1n tr\u1ED7 b\xF4ng: g\xE2y hi\u1EC7n t\u01B0\u1EE3ng "b\xF4ng b\u1EA1c" d\u1EF1ng \u0111\u1EE9ng, h\u1EA1t l\xE9p tr\u1EAFng ho\xE0n to\xE0n.',
    symptomChecklist: [
      'C\xE2y l\xFAa b\u1ECB h\xE9o n\xF5n gi\u1EEFa trong khi c\xE1c l\xE1 b\u1EB9 ngo\xE0i v\u1EABn c\xF2n xanh ("d\u1EA3nh h\xE9o").',
      "R\xFAt nh\u1EB9 n\xF5n h\xE9o ho\u1EB7c b\xF4ng b\u1EA1c th\u1EA5y tu\u1ED9t r\u1EA5t d\u1EC5 v\xE0 c\xF3 l\u1ED7 \u0111\u1EE5c tr\xF2n nh\u1ECF tr\xEAn th\xE2n k\xE8m ph\xE2n s\xE2u.",
      "Th\u1EA5y b\u01B0\u1EDBm ng\xE0i m\xE0u v\xE0ng r\u01A1m c\xF3 2 ch\u1EA5m \u0111en r\xF5 tr\xEAn c\xE1nh tr\u01B0\u1EDBc \u0111\u1EADu tr\xEAn l\xE1 l\xFAa."
    ],
    affectedPlantParts: ["stem", "other"],
    causes: "S\xE2u non c\u1EE7a lo\xE0i ng\xE0i b\u01B0\u1EDBm hai ch\u1EA5m Scirpophaga incertulas. Ng\xE0i c\xE1i \u0111\u1EBB \u1ED5 tr\u1EE9ng c\xF3 l\u1EDBp l\xF4ng m\xE0u v\xE0ng n\xE2u tr\xEAn m\u1EB7t l\xE1 g\u1EA7n ch\xF3p.",
    favorableConditions: "Giao m\xF9a v\u1EE5 Xu\xE2n sang H\xE8 Thu, ru\u1ED9ng c\u1EA5y xanh t\u1ED1t r\u1EADm r\u1EA1p, v\xF9ng c\xF3 nhi\u1EC1u ru\u1ED9ng gieo c\u1EA5y l\u1EC7ch tr\xE0.",
    preventionMethods: "C\xE0y \u1EA3i ng\xE2m d\u1EA7m g\u1ED1c r\u1EA1 sau thu ho\u1EA1ch \u0111\u1EC3 di\u1EC7t nh\u1ED9ng s\xE2u n\u1EB1m trong g\u1ED1c r\u1EA1. D\xF9ng b\u1EABy \u0111\xE8n theo d\xF5i cao \u0111i\u1EC3m b\u01B0\u1EDBm ra.",
    safeManagement: "Ng\u1EAFt \u1ED5 tr\u1EE9ng m\xE0u v\xE0ng n\xE2u \u1EDF g\u1EA7n ch\xF3p l\xE1 khi th\u0103m \u0111\u1ED3ng. Khi m\u1EADt \u0111\u1ED9 \u1ED5 tr\u1EE9ng cao v\xE0o l\xFAc l\xFAa l\xE0m \u0111\xF2ng - tr\u1ED7 th\u1EA5p tho\xE1ng, phun ch\u1EBF ph\u1EA9m sinh h\u1ECDc Bt / Emamectin \u0111\xFAng cao \u0111i\u1EC3m s\xE2u non m\u1EDBi n\u1EDF tr\u01B0\u1EDBc khi chui v\xE0o th\xE2n.",
    treatmentSteps: {
      immediate: [
        "\u0110i d\u1ECDc b\u1EDD ru\u1ED9ng ng\u1EAFt ti\xEAu h\u1EE7y c\xE1c \u1ED5 tr\u1EE9ng c\xF3 l\xF4ng v\xE0ng n\xE2u b\xE1m tr\xEAn phi\u1EBFn l\xE1 v\xE0 nh\u1ED5 d\u1EA3nh h\xE9o c\xF3 s\xE2u.",
        "X\xE1c \u0111\u1ECBnh giai \u0111o\u1EA1n c\xE2y l\xFAa: n\u1EBFu l\xFAa \u0111ang l\xE0m \u0111\xF2ng \u0111\u1EBFn tr\u1ED7 th\u1EA5p tho\xE1ng l\xE0 th\u1EDDi \u0111i\u1EC3m nh\u1EA1y c\u1EA3m nh\u1EA5t g\xE2y b\xF4ng b\u1EA1c."
      ],
      biologicalAndCare: [
        "Phun ch\u1EBF ph\u1EA9m tr\u1EEB s\xE2u sinh h\u1ECDc ho\u1EB7c ho\u1EA1t ch\u1EA5t c\xF3 t\xEDnh l\u01B0u d\u1EABn cao \u0111\xFAng th\u1EDDi \u0111i\u1EC3m b\u01B0\u1EDBm n\u1EDF r\u1ED9 5-7 ng\xE0y (khi s\xE2u non m\u1EDBi n\u1EDF \u0111ang b\xF2 t\xECm ch\u1ED7 \u0111\u1EE5c v\xE0o th\xE2n).",
        "V\u1EE5 sau c\u1EAFt s\xE1t g\u1ED1c r\u1EA1 v\xE0 c\xE0y v\xF9i ng\u1EADp n\u01B0\u1EDBc di\u1EC7t nh\u1ED9ng."
      ],
      caution: [
        "Khi b\xF4ng \u0111\xE3 tr\u1ED7 ra v\xE0 h\xF3a b\u1EA1c tr\u1EAFng th\xEC s\xE2u \u0111\xE3 \u0111\u1EE5c \u0111\u1EE9t cu\u1ED1ng b\xF4ng b\xEAn trong th\xE2n \u2014 l\xFAc n\xE0y phun thu\u1ED1c kh\xF4ng c\u1EE9u l\u1EA1i \u0111\u01B0\u1EE3c b\xF4ng b\u1EA1c n\u1EEFa."
      ]
    },
    references: "C\u1EE5c B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; IRRI Stem Borer Management.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "QCVN 01-38:2010/BNNPTNT",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Rice_yellow_stem_borer.jpg/960px-Rice_yellow_stem_borer.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Rice_yellow_stem_borer.jpg/960px-Rice_yellow_stem_borer.jpg",
        caption: "B\u01B0\u1EDBm s\xE2u \u0111\u1EE5c th\xE2n 2 ch\u1EA5m v\u1EDBi hai ch\u1EA5m \u0111en \u0111\u1EB7c tr\u01B0ng tr\xEAn c\xE1nh v\xE0ng r\u01A1m",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Scirpophaga_incertulas_-_moth.jpg/960px-Scirpophaga_incertulas_-_moth.jpg",
        caption: "Ng\xE0i tr\u01B0\u1EDFng th\xE0nh Scirpophaga incertulas \u0111\u1EADu tr\xEAn t\xE1n l\xE1 l\xFAa t\xECm n\u01A1i \u0111\u1EBB tr\u1EE9ng",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-13T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_leaf_folder",
    cropType: "rice",
    vietnameseName: "S\xE2u cu\u1ED1n l\xE1 nh\u1ECF h\u1EA1i l\xFAa (Rice Leaffolder)",
    englishName: "Rice Leaffolder",
    symptoms: "S\xE2u non nh\u1EA3 t\u01A1 d\xEDnh hai m\xE9p l\xE1 l\xFAa cu\u1ED9n tr\xF2n l\u1EA1i th\xE0nh \u1ED1ng d\xE0i, \u1EA9n b\xEAn trong g\u1EB7m s\u1EA1ch ph\u1EA7n di\u1EC7p l\u1EE5c xanh ch\u1EC9 ch\u1EEBa l\u1EA1i l\u1EDBp bi\u1EC3u b\xEC tr\u1EAFng m\u1ECFng. C\u1EA3 ru\u1ED9ng nh\xECn t\u1EEB xa c\xF3 m\xE0u tr\u1EAFng x\xE1m x\u01A1 x\xE1c khi m\u1EADt \u0111\u1ED9 s\xE2u cao.",
    symptomChecklist: [
      "L\xE1 l\xFAa b\u1ECB cu\u1ED9n d\u1ECDc th\xE0nh \u1ED1ng tr\xF2n b\u1EB1ng t\u01A1 m\u1ECBn.",
      "B\xEAn trong \u1ED1ng l\xE1 c\xF3 s\xE2u nh\u1ECF m\xE0u xanh l\u1EE5c nh\u1EA1t k\xE8m ph\xE2n s\xE2u; ph\u1EA7n l\xE1 b\u1ECB \u0103n ch\u1EC9 c\xF2n v\u1EC7t tr\u1EAFng m\u1EDD.",
      "B\u01B0\u1EDBm nh\u1ECF m\xE0u v\xE0ng n\xE2u vi\u1EC1n c\xE1nh \u0111en bay l\u01B0\u1EE3n r\u1EE3p m\u1EB7t ru\u1ED9ng khi ch\u1EA1m v\xE0o t\xE1n l\xFAa."
    ],
    affectedPlantParts: ["leaf"],
    causes: "S\xE2u non lo\xE0i b\u01B0\u1EDBm Cnaphalocrocis medinalis.",
    favorableConditions: "Ru\u1ED9ng b\xF3n th\u1EEBa ph\xE2n \u0111\u1EA1m l\xE1 xanh non m\u01B0\u1EE3t, th\u1EDDi ti\u1EBFt m\xE1t c\xF3 m\u01B0a xen n\u1EAFng, giai \u0111o\u1EA1n l\xFAa \u0111\u1EBB nh\xE1nh r\u1ED9 \u0111\u1EBFn l\xE0m \u0111\xF2ng.",
    preventionMethods: "B\xF3n ph\xE2n c\xE2n \u0111\u1ED1i kh\xF4ng \u0111\u1EC3 l\xE1 l\xFAa qu\xE1 xanh r\u1EADm; b\u1EA3o v\u1EC7 ong m\u1EAFt \u0111\u1ECF v\xE0 b\u1ECD x\xEDt \u0103n th\u1ECBt tr\xEAn ru\u1ED9ng (kh\xF4ng phun thu\u1ED1c tr\u1EEB s\xE2u qu\xE1 s\u1EDBm).",
    safeManagement: "Giai \u0111o\u1EA1n l\xFAa \u0111\u1EBB nh\xE1nh d\u01B0\u1EDBi 40 ng\xE0y n\u1EBFu l\xE1 b\u1ECB cu\u1ED1n nh\u1EB9 c\xF3 th\u1EC3 t\u1EF1 b\xF9 \u0111\u01B0\u1EE3c kh\xF4ng c\u1EA7n phun. Ch\u1EC9 phun thu\u1ED1c sinh h\u1ECDc (Bt, Abamectin, Emamectin) khi s\xE2u non tu\u1ED5i 1-2 n\u1EDF r\u1ED9 \u0111\u1EA1t ng\u01B0\u1EE1ng (>20 con/m\xB2 giai \u0111o\u1EA1n l\xE0m \u0111\xF2ng - b\u1EA3o v\u1EC7 3 l\xE1 \u0111\xF2ng).",
    treatmentSteps: {
      immediate: [
        "M\u1EDF th\u1EED 10 \u1ED1ng l\xE1 cu\u1ED1n \u0111\u1EC3 ki\u1EC3m tra xem b\xEAn trong c\xF2n s\xE2u non s\u1ED1ng hay s\xE2u \u0111\xE3 h\xF3a nh\u1ED9ng/b\u1ECF \u0111i.",
        "\u0110\u1EBFm m\u1EADt \u0111\u1ED9 s\xE2u tr\xEAn 1 m\xB2 v\xE0 x\xE1c \u0111\u1ECBnh l\xFAa \u0111ang \u1EDF giai \u0111o\u1EA1n \u0111\u1EBB nh\xE1nh hay l\xE0m \u0111\xF2ng."
      ],
      biologicalAndCare: [
        "N\u1EBFu l\xFAa \u1EDF giai \u0111o\u1EA1n l\xE0m \u0111\xF2ng - tr\u1ED7 (c\u1EA7n b\u1EA3o v\u1EC7 b\u1ED9 l\xE1 \u0111\xF2ng) v\xE0 c\xF3 nhi\u1EC1u s\xE2u non tu\u1ED5i nh\u1ECF 1-2, phun ch\u1EBF ph\u1EA9m sinh h\u1ECDc Bt ho\u1EB7c Emamectin v\xE0o s\xE1ng s\u1EDBm ho\u1EB7c chi\u1EC1u m\xE1t.",
        "N\u1EBFu l\xFAa c\xF2n non d\u01B0\u1EDBi 35 ng\xE0y v\xE0 m\u1EADt \u0111\u1ED9 th\u1EA5p, gi\u1EEF n\u01B0\u1EDBc c\xE2n \u0111\u1ED1i \u0111\u1EC3 c\xE2y t\u1EF1 ra l\xE1 m\u1EDBi, ti\u1EBFt ki\u1EC7m ti\u1EC1n thu\u1ED1c."
      ],
      caution: [
        "Kh\xF4ng phun thu\u1ED1c khi s\xE2u \u0111\xE3 th\xE0nh b\u01B0\u1EDBm bay r\u1ED9 ho\u1EB7c \u0111\xE3 l\xE0m nh\u1ED9ng trong bao l\xE1; tr\xE1nh l\u1EA1m d\u1EE5ng thu\u1ED1c l\xE0m b\xF9ng ph\xE1t r\u1EA7y n\xE2u cu\u1ED1i v\u1EE5."
      ]
    },
    references: "C\u1EE5c B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; Ch\u01B0\u01A1ng tr\xECnh IPM 3 Gi\u1EA3m 3 T\u0103ng.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "Quy tr\xECnh IPM L\xFAa Qu\u1ED1c gia",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Rice_Leaf_Roller.JPG/500px-Rice_Leaf_Roller.JPG",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Rice_Leaf_Roller.JPG/500px-Rice_Leaf_Roller.JPG",
        caption: "Ng\xE0i b\u01B0\u1EDBm s\xE2u cu\u1ED1n l\xE1 nh\u1ECF Cnaphalocrocis medinalis tr\xEAn l\xE1 l\xFAa",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Cnaphalocrocis_medinalis.jpg/960px-Cnaphalocrocis_medinalis.jpg",
        caption: "\u0110\u1EB7c \u0111i\u1EC3m v\u1EA1ch n\xE2u s\u1EABm tr\xEAn c\xE1nh b\u01B0\u1EDBm s\xE2u cu\u1ED1n l\xE1 nh\u1ECF h\u1EA1i l\xFAa",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Cnaphalocrocis_medinalis_2.jpg/960px-Cnaphalocrocis_medinalis_2.jpg",
        caption: "C\u1EADn c\u1EA3nh h\xECnh th\xE1i ng\xE0i tr\u01B0\u1EDFng th\xE0nh \u0111\u1EBB tr\u1EE9ng m\u1EB7t tr\xEAn l\xE1 l\xFAa",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-14T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "rice_golden_apple_snail",
    cropType: "rice",
    vietnameseName: "\u1ED0c b\u01B0\u01A1u v\xE0ng h\u1EA1i l\xFAa non (Golden Apple Snail)",
    englishName: "Golden Apple Snail in Rice",
    symptoms: "\u1ED0c b\u01B0\u01A1u v\xE0ng c\u1EAFn ngang th\xE2n m\u1EA1 v\xE0 l\xFAa m\u1EDBi s\u1EA1/c\u1EA5y d\u01B0\u1EDBi m\u1EB7t n\u01B0\u1EDBc v\xE0o ban \u0111\xEAm v\xE0 s\xE1ng s\u1EDBm, t\u1EA1o ra c\xE1c kho\u1EA3ng tr\u1ED1ng m\u1EA5t c\xE2y loang l\u1ED5 tr\xEAn m\u1EB7t ru\u1ED9ng. Tr\xEAn b\u1EDD c\u1ECF, c\u1ECDc tre ho\u1EB7c th\xE2n l\xFAa nh\xF4 kh\u1ECFi m\u1EB7t n\u01B0\u1EDBc c\xF3 c\xE1c ch\xF9m tr\u1EE9ng m\xE0u h\u1ED3ng c\xE1nh sen r\u1EF1c r\u1EE1.",
    symptomChecklist: [
      "Ru\u1ED9ng l\xFAa m\u1EDBi gieo c\u1EA5y b\u1ECB khuy\u1EBFt t\u1EEBng kho\u1EA3ng l\u1EDBn, th\u1EA5y th\xE2n m\u1EA1 \u0111\u1EE9t ngang n\u1ED5i l\u1EC1nh b\u1EC1nh tr\xEAn m\u1EB7t n\u01B0\u1EDBc.",
      "Ch\xF9m tr\u1EE9ng m\xE0u h\u1ED3ng c\xE1nh sen t\u01B0\u01A1i b\xE1m tr\xEAn th\xE2n l\xFAa, c\u1ECDc tre ho\u1EB7c c\u1ECF b\u1EDD ru\u1ED9ng.",
      "Chi\u1EC1u m\xE1t ho\u1EB7c s\xE1ng s\u1EDBm th\u1EA5y nhi\u1EC1u \u1ED1c v\u1ECF v\xE0ng n\xE2u b\xF2 d\u01B0\u1EDBi l\u1EDBp n\u01B0\u1EDBc n\xF4ng."
    ],
    affectedPlantParts: ["stem", "leaf"],
    causes: "\u1ED0c b\u01B0\u01A1u v\xE0ng (Pomacea canaliculata), lo\xE0i ngo\u1EA1i lai sinh s\u1EA3n c\u1EF1c nhanh v\xE0 ph\xE0m \u0103n m\u1EA1 non.",
    favorableConditions: "Ru\u1ED9ng m\u1EDBi gieo s\u1EA1 ho\u1EB7c m\u1EDBi c\u1EA5y 1-20 ng\xE0y b\u1ECB ng\u1EADp n\u01B0\u1EDBc s\xE2u li\xEAn t\u1EE5c sau m\u01B0a.",
    preventionMethods: "\u0110\u1EB7t l\u01B0\u1EDBi ch\u1EAFn \u1EDF c\u1ED1ng d\u1EABn n\u01B0\u1EDBc v\xE0o ru\u1ED9ng \u0111\u1EC3 ng\u0103n \u1ED1c theo n\u01B0\u1EDBc tr\xE0n v\xE0o. L\xE0m r\xE3nh tho\xE1t n\u01B0\u1EDBc quanh ru\u1ED9ng v\xE0 th\u1EA3 v\u1ECBt ch\u1EA1y \u0111\u1ED3ng b\u1EAFt \u1ED1c con tr\u01B0\u1EDBc khi c\u1EA5y.",
    safeManagement: "R\xFAt n\u01B0\u1EDBc ru\u1ED9ng n\xF4ng x\u0103m x\u1EAFp b\xF9n \u0111\u1EC3 \u1ED1c kh\xF4ng di chuy\u1EC3n \u0111\u01B0\u1EE3c; c\u1EAFm c\u1ECDc tre d\u1ECDc b\u1EDD thu h\xFAt \u1ED1c \u0111\u1EBB tr\u1EE9ng r\u1ED3i thu gom ti\xEAu h\u1EE7y tr\u1EE9ng h\u1ED3ng h\xE0ng ng\xE0y; b\u1EAFt tay v\xE0o s\xE1ng s\u1EDBm ho\u1EB7c chi\u1EC1u m\xE1t.",
    treatmentSteps: {
      immediate: [
        "Th\xE1o r\xFAt n\u01B0\u1EDBc ru\u1ED9ng ch\u1EC9 \u0111\u1EC3 x\xE2m x\u1EA5p m\u1EB7t b\xF9n ho\u1EB7c kh\u01A1i r\xE3nh d\u1ED3n \u1ED1c t\u1EADp trung xu\u1ED1ng r\xE3nh \u0111\u1EC3 nh\u1EB7t tay.",
        "\u0110\u1EADp n\xE1t ho\u1EB7c gom to\xE0n b\u1ED9 c\xE1c \u1ED5 tr\u1EE9ng m\xE0u h\u1ED3ng c\xE1nh sen b\xE1m tr\xEAn c\u1ECF b\u1EDD v\xE0 th\xE2n c\xE2y cho g\xE0 v\u1ECBt \u0103n."
      ],
      biologicalAndCare: [
        "C\u1EAFm c\xE0nh \u0111u \u0111\u1EE7, l\xE1 khoai m\xEC ho\u1EB7c v\u1ECF m\xEDt r\u1EA3i d\u1ECDc r\xE3nh ru\u1ED9ng \u0111\u1EC3 d\u1EABn d\u1EE5 \u1ED1c t\u1EE5 l\u1EA1i r\u1ED3i b\u1EAFt b\u1ECF th\u1EE7 c\xF4ng.",
        "D\u1EB7m b\u1ED5 sung m\u1EA1 \u1EDF c\xE1c kho\u1EA3ng tr\u1ED1ng, \u0111\u1EB7t l\u01B0\u1EDBi ch\u1EAFn m\u1EAFt nh\u1ECF t\u1EA1i c\u1EEDa l\u1EA5y n\u01B0\u1EDBc \u0111\u1EA7u ru\u1ED9ng."
      ],
      caution: [
        "H\u1EA1n ch\u1EBF r\u1EA3i b\u1EEBa b\xE3i h\xF3a ch\u1EA5t di\u1EC7t \u1ED1c n\u1ED3ng \u0111\u1ED9 cao xu\u1ED1ng ru\u1ED9ng ng\u1EADp n\u01B0\u1EDBc v\xEC d\u1EC5 l\xE0m ch\u1EBFt c\xE1, cua \u0111\u1ED3ng v\xE0 g\xE2y ng\u1ED9 \u0111\u1ED9c r\u1EC5 m\u1EA1 non."
      ]
    },
    references: "C\u1EE5c B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; FAO Golden Apple Snail Management.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "TCVN Ph\xF2ng tr\u1EEB \u1ED0c b\u01B0\u01A1u v\xE0ng",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg/960px-A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg/960px-A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg",
        caption: "\u1ED0c b\u01B0\u01A1u v\xE0ng tr\u01B0\u1EDFng th\xE0nh thu t\u1EA1i ru\u1ED9ng l\xFAa g\xE2y c\u1EAFn \u0111\u1EE9t m\u1EA1 non",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Eggs_of_Golden_apple_snails_%28Pomacea_canaliculata%29_collected_in_rice_paddies%2C_Hunan_Province%2C_China._Photo_by_Linda_Wong.jpg/960px-Eggs_of_Golden_apple_snails_%28Pomacea_canaliculata%29_collected_in_rice_paddies%2C_Hunan_Province%2C_China._Photo_by_Linda_Wong.jpg",
        caption: "\u1ED4 tr\u1EE9ng m\xE0u h\u1ED3ng c\xE1nh sen \u0111\u1EB7c tr\u01B0ng c\u1EE7a \u1ED1c b\u01B0\u01A1u v\xE0ng b\xE1m tr\xEAn th\xE2n l\xFAa",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-15T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  // ==========================================
  // 3. CÂY LẠC / ĐẬU PHỘNG (10 BỆNH / DỊCH HẠI)
  // ==========================================
  {
    id: "peanut_leaf_spot",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh \u0110\u1ED1m n\xE2u s\u1EDBm l\xE1 l\u1EA1c (Early Leaf Spot)",
    englishName: "Peanut Early Leaf Spot",
    symptoms: "Xu\u1EA5t hi\u1EC7n s\u1EDBm t\u1EEB 30-45 ng\xE0y sau gieo: c\xE1c \u0111\u1ED1m tr\xF2n m\xE0u n\xE2u nh\u1EA1t \u0111\u1EBFn n\xE2u \u0111\u1ECF tr\xEAn m\u1EB7t tr\xEAn l\xE1, xung quanh c\xF3 qu\u1EA7ng v\xE0ng s\xE1ng r\u1EA5t r\xF5 n\xE9t. B\u1EC7nh n\u1EB7ng l\xE0m l\xE1 v\xE0ng s\u1EDBm v\xE0 r\u1EE5ng h\xE0ng lo\u1EA1t t\u1EEB g\u1ED1c l\xEAn.",
    symptomChecklist: [
      "V\u1EBFt \u0111\u1ED1m h\xECnh tr\xF2n m\xE0u n\xE2u \u0111\u1ECF ho\u1EB7c n\xE2u s\xE1ng \u1EDF m\u1EB7t tr\xEAn l\xE1.",
      "\u0110\u1EB7c tr\u01B0ng c\xF3 VI\u1EC0N QU\u1EA6NG V\xC0NG S\xC1NG r\u1ED9ng bao quanh v\u1EBFt \u0111\u1ED1m.",
      "Th\u01B0\u1EDDng xu\u1EA5t hi\u1EC7n s\u1EDBm t\u1EEB giai \u0111o\u1EA1n l\u1EA1c ra hoa \u0111\u1EBFn \u0111\xE2m tia."
    ],
    affectedPlantParts: ["leaf", "stem"],
    causes: "N\u1EA5m Passalora arachidicola (Cercospora arachidicola). B\xE0o t\u1EED l\u01B0u t\u1ED3n trong t\xE0n d\u01B0 th\xE2n l\xE1 l\u1EA1c v\u1EE5 tr\u01B0\u1EDBc.",
    favorableConditions: "Th\u1EDDi ti\u1EBFt \u1EA5m 24-28\xB0C, m\u01B0a \u1EA9m k\xE9o d\xE0i ho\u1EB7c s\u01B0\u01A1ng m\xF9 \u0111\xEAm nhi\u1EC1u trong v\u1EE5 Xu\xE2n v\xF9ng B\u1EAFc Trung B\u1ED9.",
    preventionMethods: "Lu\xE2n canh l\u1EA1c v\u1EDBi l\xFAa n\u01B0\u1EDBc ho\u1EB7c ng\xF4 \xEDt nh\u1EA5t 2 v\u1EE5. Thu gom \u0111\u1ED1t t\xE0n d\u01B0 th\xE2n l\xE1 l\u1EA1c sau thu ho\u1EA1ch. Ch\u1ECDn gi\u1ED1ng ch\u1ED1ng ch\u1ECBu kh\xE1 nh\u01B0 L14, L26.",
    safeManagement: "B\xF3n v\xF4i b\u1ED9t l\xFAc gieo v\xE0 \u0111\xE2m tia gi\xFAp c\xE2y c\u1EE9ng kh\u1ECFe. Khi b\u1EC7nh m\u1EDBi xu\u1EA5t hi\u1EC7n \u1EDF l\xE1 g\u1ED1c, phun ch\u1EBF ph\u1EA9m sinh h\u1ECDc ho\u1EB7c ho\u1EA1t ch\u1EA5t tr\u1EEB n\u1EA5m \u0111\u01B0\u1EE3c c\u1EA5p ph\xE9p theo nguy\xEAn t\u1EAFc 4 \u0111\xFAng.",
    treatmentSteps: {
      immediate: [
        "Ki\u1EC3m tra c\xE1c l\xE1 gi\xE0 t\u1EA7ng g\u1ED1c xem t\u1EF7 l\u1EC7 \u0111\u1ED1m n\xE2u c\xF3 v\u01B0\u1EE3t 10-15% s\u1ED1 l\xE1 hay kh\xF4ng.",
        "Kh\u01A1i r\xE3nh tho\xE1t n\u01B0\u1EDBc n\u1EBFu ru\u1ED9ng l\u1EA1c b\u1ECB \xFAng \u1EA9m sau m\u01B0a."
      ],
      biologicalAndCare: [
        "Phun ch\u1EBF ph\u1EA9m sinh h\u1ECDc ho\u1EB7c thu\u1ED1c tr\u1EEB n\u1EA5m (nh\u01B0 Azoxystrobin, Difenoconazole ho\u1EB7c g\u1ED1c \u0111\u1ED3ng sinh h\u1ECDc) k\u1ECBp th\u1EDDi khi b\u1EC7nh b\u1EAFt \u0111\u1EA7u leo l\xEAn t\u1EA7ng l\xE1 gi\u1EEFa.",
        "B\xF3n b\u1ED5 sung v\xF4i b\u1ED9t v\xE0 Kali giai \u0111o\u1EA1n \u0111\xE2m tia \u0111\u1EC3 t\u0103ng s\u1EE9c \u0111\u1EC1 kh\xE1ng th\xE0nh t\u1EBF b\xE0o l\xE1."
      ],
      caution: [
        "Kh\xF4ng ch\u1EDD \u0111\u1EBFn khi l\xE1 g\u1ED1c r\u1EE5ng tr\u1EE5i h\u1EBFt m\u1EDBi phun thu\u1ED1c v\xEC l\xFAc \u0111\xF3 c\u1EE7 l\u1EA1c s\u1EBD b\u1ECB l\xE9p n\u1EB7ng kh\xF4ng ch\u1EAFc h\u1EA1t."
      ]
    },
    references: "Vi\u1EC7n Khoa h\u1ECDc N\xF4ng nghi\u1EC7p B\u1EAFc Trung B\u1ED9 (ASIR); MycoKeys Passalora Monograph.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n ASIR & Vi\u1EC7n Di truy\u1EC1n N\xF4ng nghi\u1EC7p",
    standardCode: "Quy tr\xECnh th\xE2m canh L\u1EA1c Ngh\u1EC7 An",
    reviewDate: "2026-03-02",
    sampleImageUrl: "/images/peanut_leaf_spot.jpg",
    galleryImages: [
      {
        url: "/images/peanut_leaf_spot.jpg",
        caption: "V\u1EBFt \u0111\u1ED1m l\xE1 tr\xEAn c\xE2y l\u1EA1c m\u1EABu th\u1EF1c \u0111\u1ECBa B\u1EAFc Trung B\u1ED9",
        source: "Vi\u1EC7n ASIR (M\u1EABu ki\u1EC3m ch\u1EE9ng)"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Passalora_arachidicola_%2810.3897-mycokeys.81.67850%29_Figure_16.jpg/960px-Passalora_arachidicola_%2810.3897-mycokeys.81.67850%29_Figure_16.jpg",
        caption: "V\u1EBFt \u0111\u1ED1m n\xE2u s\u1EDBm Passalora arachidicola v\u1EDBi qu\u1EA7ng v\xE0ng r\xF5 \u1EDF m\u1EB7t tr\xEAn l\xE1 l\u1EA1c",
        source: "MycoKeys / Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-11T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_late_leaf_spot",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh \u0110\u1ED1m \u0111en mu\u1ED9n l\xE1 l\u1EA1c (Late Leaf Spot)",
    englishName: "Peanut Late Leaf Spot",
    symptoms: "Xu\u1EA5t hi\u1EC7n mu\u1ED9n h\u01A1n (t\u1EEB 50 ng\xE0y tr\u1EDF \u0111i) nh\u01B0ng t\xE0n ph\xE1 r\u1EA5t nhanh: \u0111\u1ED1m tr\xF2n m\xE0u n\xE2u s\u1EABm \u0111\u1EBFn \u0111en tuy\u1EC1n tr\xEAn c\u1EA3 hai m\u1EB7t l\xE1 (r\u1EA5t r\xF5 \u1EDF m\u1EB7t d\u01B0\u1EDBi l\xE1), qu\u1EA7ng v\xE0ng m\u1EDD ho\u1EB7c kh\xF4ng c\xF3. B\u1EC7nh l\xE0m r\u1EE5ng tr\u1EE5i to\xE0n b\u1ED9 t\xE1n l\xE1 ch\u1EC9 trong th\u1EDDi gian ng\u1EAFn tr\u01B0\u1EDBc thu ho\u1EA1ch.",
    symptomChecklist: [
      "\u0110\u1ED1m tr\xF2n m\xE0u \u0110EN TUY\u1EC0N ho\u1EB7c n\xE2u \u0111en s\u1EABm, th\u01B0\u1EDDng nh\u1ECF h\u01A1n \u0111\u1ED1m s\u1EDBm nh\u01B0ng d\xE0y \u0111\u1EB7c.",
      "Qu\u1EA7ng v\xE0ng b\xEAn ngo\xE0i m\u1EDD nh\u1EA1t ho\u1EB7c g\u1EA7n nh\u01B0 kh\xF4ng c\xF3.",
      "M\u1EB7t d\u01B0\u1EDBi l\xE1 s\u1EDD h\u01A1i g\u1ED3 do kh\u1ED1i b\xE0o t\u1EED n\u1EA5m m\xE0u \u0111en m\u1ECDc d\xE0y \u0111\u1EB7c."
    ],
    affectedPlantParts: ["leaf", "stem"],
    causes: "N\u1EA5m Nothopassalora personata (Cercosporidium personatum). L\xE2y lan c\u1EF1c nhanh cu\u1ED1i v\u1EE5 qua gi\xF3 v\xE0 gi\u1ECDt m\u01B0a b\u1EAFn.",
    favorableConditions: "\u1EA8m \u0111\u1ED9 kh\xF4ng kh\xED cao k\xE9o d\xE0i giai \u0111o\u1EA1n l\u1EA1c v\xE0o ch\u1EAFc c\u1EE7 \u0111\u1EBFn s\u1EAFp thu ho\u1EA1ch (25-30\xB0C).",
    preventionMethods: "V\u1EC7 sinh s\u1EA1ch \u0111\u1ED3ng ru\u1ED9ng, lu\xE2n canh v\u1EDBi c\xE2y tr\u1ED3ng kh\xE1c h\u1ECD \u0111\u1EADu, gieo m\u1EADt \u0111\u1ED9 h\u1EE3p l\xFD tr\xE1nh giao t\xE1n qu\xE1 r\u1EADm.",
    safeManagement: "Theo d\xF5i ru\u1ED9ng t\u1EEB ng\xE0y 45 sau gieo; phun ph\xF2ng tr\u1EEB ngay khi ph\xE1t hi\u1EC7n \u0111\u1ED1m \u0111en r\u1EA3i r\xE1c \u1EDF l\xE1 t\u1EA7ng d\u01B0\u1EDBi \u0111\u1EC3 gi\u1EEF xanh b\u1ED9 l\xE1 nu\xF4i c\u1EE7 ch\u1EAFc.",
    treatmentSteps: {
      immediate: [
        "Soi m\u1EB7t d\u01B0\u1EDBi c\xE1c l\xE1 g\u1EA7n g\u1ED1c \u0111\u1EC3 ph\xE2n bi\u1EC7t \u0111\u1ED1m \u0111en s\u1EABm kh\xF4ng qu\u1EA7ng v\xE0ng v\u1EDBi \u0111\u1ED1m n\xE2u s\u1EDBm.",
        "N\u1EBFu c\xE2y \u0111\xE3 \u0111\u1EBFn s\xE1t k\u1EF3 thu ho\u1EA1ch (<10 ng\xE0y) v\xE0 r\u1EE5ng l\xE1 n\u1EB7ng th\xEC ti\u1EBFn h\xE0nh thu ho\u1EA1ch k\u1ECBp th\u1EDDi, kh\xF4ng phun thu\u1ED1c h\xF3a h\u1ECDc."
      ],
      biologicalAndCare: [
        "Giai \u0111o\u1EA1n l\u1EA1c \u0111ang t\u1EA1o c\u1EE7 (50-80 ng\xE0y sau gieo), phun ph\xF2ng b\u1EB1ng thu\u1ED1c \u0111\u1EB7c tr\u1ECB n\u1EA5m \u0111\u1ED1m l\xE1 ho\u1EB7c g\u1ED1c \u0111\u1ED3ng/l\u01B0u hu\u1EF3nh an to\xE0n, ch\xFA \xFD phun ph\u1EE7 c\u1EA3 m\u1EB7t d\u01B0\u1EDBi l\xE1.",
        "Thu gom s\u1EA1ch th\xE2n l\xE1 l\u1EA1c sau nh\u1ED5 \u0111\u1EC3 c\u1EAFt ngu\u1ED3n n\u1EA5m cho v\u1EE5 sau."
      ],
      caution: [
        "B\u1EC7nh \u0111\u1ED1m \u0111en g\xE2y r\u1EE5ng l\xE1 nhanh g\u1EA5p \u0111\xF4i \u0111\u1ED1m s\u1EDBm; c\u1EA7n tu\xE2n th\u1EE7 \u0111\xFAng th\u1EDDi gian c\xE1ch ly thu\u1ED1c tr\u01B0\u1EDBc khi nh\u1ED5 c\u1EE7."
      ]
    },
    references: "ICRISAT Peanut Disease Compendium; MycoKeys Late Leaf Spot Study.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt & ICRISAT",
    standardCode: "ICRISAT Peanut Compendium",
    reviewDate: "2026-03-05",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg/960px-Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg/960px-Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg",
        caption: "Tri\u1EC7u ch\u1EE9ng \u0111\u1ED1m \u0111en s\u1EABm t\u1EADp trung d\xE0y l\xE0m v\xE0ng kh\xF4 l\xE1 l\u1EA1c",
        source: "MycoKeys / Wikimedia Commons"
      },
      {
        url: "/images/peanut_leaf_spot.jpg",
        caption: "\u0110\u1ED1i chi\u1EBFu ph\xE2n bi\u1EC7t \u0111\u1ED1m \u0111en d\xE0y \u0111\u1EB7c v\u1EDBi \u0111\u1ED1m n\xE2u tr\xEAn l\xE1 l\u1EA1c th\u1EF1c \u0111\u1ECBa",
        source: "Vi\u1EC7n ASIR (M\u1EABu ki\u1EC3m ch\u1EE9ng)"
      }
    ],
    createdAt: "2026-02-02T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_rust",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh G\u1EC9 s\u1EAFt l\u1EA1c (Peanut Rust)",
    englishName: "Peanut Rust",
    symptoms: "M\u1EB7t d\u01B0\u1EDBi l\xE1 xu\u1EA5t hi\u1EC7n v\xF4 s\u1ED1 n\u1ED1t m\u1EE5n nh\u1ECF li ti m\xE0u v\xE0ng cam \u0111\u1EBFn n\xE2u \u0111\u1ECF g\u1EC9 s\u1EAFt (\u1ED5 b\xE0o t\u1EED h\u1EA1). Khi v\u1EE1 ra gi\u1EA3i ph\xF3ng l\u1EDBp b\u1ED9t m\u1ECBn m\xE0u g\u1EC9 s\u1EAFt b\xE1m v\xE0o ng\xF3n tay. Kh\xE1c v\u1EDBi b\u1EC7nh \u0111\u1ED1m l\xE1, l\xE1 b\u1ECB g\u1EC9 s\u1EAFt kh\xF4ng r\u1EE5ng ngay m\xE0 kh\xF4 qu\u0103n gi\xF2n b\xE1m d\xEDnh tr\xEAn th\xE2n.",
    symptomChecklist: [
      "M\u1EB7t d\u01B0\u1EDBi l\xE1 n\u1ED5i d\xE0y \u0111\u1EB7c c\xE1c m\u1EE5n nh\u1ECF m\xE0u v\xE0ng cam - n\xE2u g\u1EC9 s\u1EAFt (nhi\u1EC1u khi c\u1EA3 m\u1EB7t tr\xEAn c\u0169ng c\xF3 ch\u1EA5m v\xE0ng nh\u1ECF t\u01B0\u01A1ng \u1EE9ng).",
      "Mi\u1EBFt nh\u1EB9 ng\xF3n tay v\xE0o m\u1EB7t d\u01B0\u1EDBi l\xE1 th\u1EA5y d\xEDnh b\u1EE5i b\u1ED9t m\xE0u n\xE2u \u0111\u1ECF nh\u01B0 g\u1EC9 s\u1EAFt.",
      "L\xE1 b\u1ECB n\u1EB7ng kh\xF4 ch\xE1y gi\xF2n nh\u01B0ng v\u1EABn b\xE1m tr\xEAn c\xE0nh, kh\xF4ng r\u1EE5ng h\xE0ng lo\u1EA1t nh\u01B0 b\u1EC7nh \u0111\u1ED1m l\xE1."
    ],
    affectedPlantParts: ["leaf", "stem"],
    causes: "N\u1EA5m Puccinia arachidis. B\xE0o t\u1EED ph\xE1t t\xE1n r\u1EA5t xa theo gi\xF3.",
    favorableConditions: "Nhi\u1EC7t \u0111\u1ED9 20-26\xB0C k\xE8m s\u01B0\u01A1ng \u01B0\u1EDBt \u0111\u1ECDng tr\xEAn m\u1EB7t l\xE1 k\xE9o d\xE0i >6 gi\u1EDD trong v\u1EE5 Xu\xE2n v\xE0 Thu \u0110\xF4ng.",
    preventionMethods: "L\xEAn lu\u1ED1ng cao, gieo m\u1EADt \u0111\u1ED9 h\u1EE3p l\xFD t\u1EA1o lu\u1ED1ng th\xF4ng tho\xE1ng mau kh\xF4 s\u01B0\u01A1ng; lu\xE2n canh v\u1EDBi c\xE2y kh\xE1c h\u1ECD \u0111\u1EADu.",
    safeManagement: "Phun dung d\u1ECBch l\u01B0u hu\u1EF3nh h\u1EEFu c\u01A1, Hexaconazole ho\u1EB7c Azoxystrobin s\u1EDBm khi m\u1EE5n g\u1EC9 m\u1EDBi xu\u1EA5t hi\u1EC7n \u1EDF t\u1EA7ng l\xE1 d\u01B0\u1EDBi, t\u1EADp trung phun k\u1EF9 v\xE0o m\u1EB7t d\u01B0\u1EDBi l\xE1.",
    treatmentSteps: {
      immediate: [
        "L\u1EADt m\u1EB7t d\u01B0\u1EDBi l\xE1 \u1EDF c\xE1c b\u1EE5i l\u1EA1c t\u1EA7ng th\u1EA5p ki\u1EC3m tra c\xE1c \u1ED5 m\u1EE5n m\xE0u n\xE2u cam.",
        "N\u1EBFu th\u1EA5y b\u1EC7nh m\u1EDBi ch\u1EDBm 5% l\xE1, ti\u1EBFn h\xE0nh phun ki\u1EC3m so\xE1t s\u1EDBm v\xEC b\xE0o t\u1EED g\u1EC9 s\u1EAFt bay theo gi\xF3 r\u1EA5t nhanh."
      ],
      biologicalAndCare: [
        "Phun ch\u1EBF ph\u1EA9m l\u01B0u hu\u1EF3nh ho\u1EB7c ho\u1EA1t ch\u1EA5t \u0111\u1EB7c tr\u1ECB g\u1EC9 s\u1EAFt ch\xFA \xFD ng\u1EEDa b\xE9c phun \u01B0\u1EDBt \u0111\u1EC1u M\u1EB6T D\u01AF\u1EDAI L\xC1.",
        "B\u1ED5 sung ph\xE2n Kali gi\xFAp l\xE1 d\xE0y v\xE0 gi\u1EA3m thi\u1EC7t h\u1EA1i l\xE9p c\u1EE7."
      ],
      caution: [
        "Tr\xE1nh \u0111\u1EC3 b\u1EC7nh g\u1EC9 s\u1EAFt \u0111i k\xE8m v\u1EDBi \u0111\u1ED1m l\xE1 mu\u1ED9n v\xEC hai b\u1EC7nh c\u1ED9ng h\u01B0\u1EDFng s\u1EBD l\xE0m m\u1EA5t n\u0103ng su\u1EA5t c\u1EE7 t\u1EDBi 50-70%."
      ]
    },
    references: "ICRISAT Peanut Disease Compendium; Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n BVTV & ICRISAT",
    standardCode: "ICRISAT Groundnut Rust Compendium",
    reviewDate: "2026-03-02",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Puccinia_arachidis.jpg/330px-Puccinia_arachidis.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Puccinia_arachidis.jpg/330px-Puccinia_arachidis.jpg",
        caption: "C\xE1c \u1ED5 b\xE0o t\u1EED m\xE0u n\xE2u g\u1EC9 s\u1EAFt d\xE0y \u0111\u1EB7c tr\xEAn l\xE1 l\u1EA1c",
        source: "ICRISAT / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Puccinia_arachidis2.jpg/330px-Puccinia_arachidis2.jpg",
        caption: "Tri\u1EC7u ch\u1EE9ng g\u1EC9 s\u1EAFt lan r\u1ED9ng l\xE0m l\xE1 kh\xF4 qu\u0103n nh\u01B0ng v\u1EABn d\xEDnh tr\xEAn c\xE0nh",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Puccinia_arachidis1.jpg/330px-Puccinia_arachidis1.jpg",
        caption: "C\u1EADn c\u1EA3nh c\xE1c m\u1EE5n b\xE0o t\u1EED n\u1EA5m Puccinia arachidis m\u1EB7t d\u01B0\u1EDBi l\xE1",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-16T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_stem_rot",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh Th\u1ED1i tr\u1EAFng th\xE2n / H\xE9o r\u0169 g\u1ED1c m\u1ED1c tr\u1EAFng l\u1EA1c",
    englishName: "Peanut Stem Rot / Southern Blight / White Mold",
    symptoms: "Ph\u1EA7n g\u1ED1c th\xE2n s\xE1t m\u1EB7t \u0111\u1EA5t b\u1ECB th\u1ED1i m\u1EE5c m\u1EC1m nh\u0169n, xu\u1EA5t hi\u1EC7n m\u1EA1ng s\u1EE3i n\u1EA5m m\xE0u tr\u1EAFng tinh nh\u01B0 b\xF4ng tuy\u1EBFt bao ph\u1EE7 xung quanh g\u1ED1c v\xE0 \u0111\u1EA5t. Tr\xEAn t\u01A1 n\u1EA5m h\xECnh th\xE0nh nhi\u1EC1u h\u1EA1t h\u1EA1ch n\u1EA5m tr\xF2n nh\u1ECF nh\u01B0 h\u1EA1t c\u1EA3i, ban \u0111\u1EA7u tr\u1EAFng sau chuy\u1EC3n v\xE0ng n\xE2u. C\xE2y l\u1EA1c h\xE9o r\u0169 nhanh khi l\xE1 v\u1EABn xanh.",
    symptomChecklist: [
      "C\u1ED5 th\xE2n s\xE1t m\u1EB7t \u0111\u1EA5t c\xF3 l\u1EDBp t\u01A1 n\u1EA5m m\xE0u TR\u1EAENG TINH nh\u01B0 s\u1EE3i b\xF4ng b\u1ECDc quanh.",
      "Tr\xEAn \u0111\xE1m t\u01A1 tr\u1EAFng c\xF3 nhi\u1EC1u h\u1EA1t tr\xF2n li ti gi\u1ED1ng h\u1EA1t c\u1EA3i m\xE0u tr\u1EAFng, v\xE0ng \u0111\u1EBFn n\xE2u s\u1EABm.",
      "C\u1EA3 kh\xF3m l\u1EA1c ho\u1EB7c t\u1EEBng nh\xE1nh b\u1ECB h\xE9o r\u0169 c\u1EE5p xu\u1ED1ng nhanh ch\xF3ng d\xF9 l\xE1 ch\u01B0a chuy\u1EC3n v\xE0ng."
    ],
    affectedPlantParts: ["stem", "fruit", "other"],
    causes: "N\u1EA5m \u0111\u1EA5t Sclerotium rolfsii (Athelia rolfsii). H\u1EA1ch n\u1EA5m t\u1ED3n t\u1EA1i nhi\u1EC1u n\u0103m trong \u0111\u1EA5t c\xE1t pha.",
    favorableConditions: "Nhi\u1EC7t \u0111\u1ED9 n\xF3ng \u1EA9m 28-35\xB0C, m\u01B0a r\xE0o xen k\u1EBD n\u1EAFng g\u1EAFt, \u0111\u1EA5t c\xE1t pha th\u1ECBt nh\u1EB9 gi\u1EEF \u1EA9m \u1EDF Ngh\u1EC7 An, H\xE0 T\u0129nh.",
    preventionMethods: "C\xE0y s\xE2u l\u1EADt \u0111\u1EA5t ch\xF4n v\xF9i h\u1EA1ch n\u1EA5m; l\xEAn lu\u1ED1ng cao tho\xE1t n\u01B0\u1EDBc t\u1ED1t; b\xF3n nhi\u1EC1u v\xF4i b\u1ED9t (30-40 kg/s\xE0o) n\xE2ng pH \u0111\u1EA5t v\xE0 b\xF3n Trichoderma.",
    safeManagement: "Nh\u1ED5 nh\u1EB9 c\xE2y b\u1EC7nh c\xF9ng \xEDt \u0111\u1EA5t quanh g\u1ED1c cho th\u1EB3ng v\xE0o t\xFAi k\xEDn mang ti\xEAu h\u1EE7y (tr\xE1nh l\xE0m r\u01A1i h\u1EA1ch n\u1EA5m ra ru\u1ED9ng). R\u1EAFc v\xF4i b\u1ED9t v\xE0 t\u01B0\u1EDBi n\u1EA5m \u0111\u1ED1i kh\xE1ng Trichoderma v\xE0o g\u1ED1c c\xE1c kh\xF3m l\xE2n c\u1EADn.",
    treatmentSteps: {
      immediate: [
        "D\xF9ng x\u1EBBng ho\u1EB7c tay nh\u1EB9 nh\xE0ng b\u1EE9ng c\xE2y b\u1EC7nh c\xF9ng ph\u1EA7n \u0111\u1EA5t ch\u1EE9a t\u01A1 tr\u1EAFng cho g\u1ECDn v\xE0o t\xFAi nilon bu\u1ED9c k\xEDn mang ra kh\u1ECFi ru\u1ED9ng.",
        "R\u1EAFc ngay m\u1ED9t \xEDt v\xF4i b\u1ED9t v\xE0o h\u1ED1 v\u1EEBa nh\u1ED5 \u0111\u1EC3 s\xE1t khu\u1EA9n ch\u1ED7 h\u1EA1ch n\u1EA5m."
      ],
      biologicalAndCare: [
        "H\xF2a ch\u1EBF ph\u1EA9m n\u1EA5m \u0111\u1ED1i kh\xE1ng Trichoderma harzianum ho\u1EB7c Bacillus subtilis t\u01B0\u1EDBi \u0111\u1EABm v\xE0o v\xF9ng g\u1ED1c c\xE1c h\xE0ng l\u1EA1c l\xE2n c\u1EADn.",
        "Kh\u01A1i th\xF4ng r\xE3nh tho\xE1t n\u01B0\u1EDBc, kh\xF4ng \u0111\u1EC3 g\u1ED1c l\u1EA1c \u1EA9m b\xED k\xE9o d\xE0i."
      ],
      caution: [
        "Kh\xF4ng k\xE9o l\xEA c\xE2y b\u1EC7nh tr\xEAn m\u1EB7t ru\u1ED9ng ho\u1EB7c n\xE9m xu\u1ED1ng m\u01B0\u01A1ng n\u01B0\u1EDBc v\xEC h\u1EA1ch n\u1EA5m r\u01A1i r\u1EE5ng s\u1EBD l\xE2y lan th\xE0nh \u1ED5 d\u1ECBch nhi\u1EC1u n\u0103m li\u1EC1n."
      ]
    },
    references: "\u0110\u1EA1i h\u1ECDc N\xF4ng L\xE2m Hu\u1EBF; USDA-ARS Peanut Stem Rot Field Guide.",
    verificationStatus: "verified",
    verifiedBy: "\u0110H N\xF4ng L\xE2m Hu\u1EBF & Vi\u1EC7n ASIR",
    standardCode: "\u0110\u1EC1 t\xE0i B\u1EC7nh h\xE9o r\u0169 c\xE2y \u0111\u1EADu \u0111\u1ED7 mi\u1EC1n Trung",
    reviewDate: "2026-03-03",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg/500px-White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg/500px-White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg",
        caption: "M\u1EA1ng s\u1EE3i n\u1EA5m tr\u1EAFng nh\u01B0 b\xF4ng v\xE0 h\u1EA1ch n\u1EA5m h\xECnh th\xE0nh \u1EDF v\xF9ng c\u1ED5 g\u1ED1c c\xE2y l\u1EA1c",
        source: "USDA-ARS / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Athelia.jpg/500px-Athelia.jpg",
        caption: "Th\xE2n g\u1ED1c b\u1ECB m\u1EE5c th\u1ED1i v\u1EDBi l\u1EDBp t\u01A1 n\u1EA5m tr\u1EAFng v\xE0 h\u1EA1ch m\xE0u v\xE0ng n\xE2u",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Athelia_rolfsii_sclerotia.jpg/330px-Athelia_rolfsii_sclerotia.jpg",
        caption: "C\u1EADn c\u1EA3nh c\xE1c h\u1EA1ch n\u1EA5m Athelia rolfsii tr\xF2n \u0111\u1EC1u nh\u01B0 h\u1EA1t c\u1EA3i",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-01-22T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_bacterial_wilt",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh H\xE9o xanh vi khu\u1EA9n l\u1EA1c (Bacterial Wilt)",
    englishName: "Peanut Bacterial Wilt",
    symptoms: "C\xE2y l\u1EA1c \u0111ang xanh t\u1ED1t b\u1ED7ng h\xE9o r\u0169 \u0111\u1ED9t ng\u1ED9t ban ng\xE0y, t\u1ED1i c\xF3 th\u1EC3 t\u01B0\u01A1i l\u1EA1i 1-2 h\xF4m r\u1ED3i ch\u1EBFt h\xE9o h\u1EB3n trong khi l\xE1 v\u1EABn gi\u1EEF m\xE0u xanh x\u1EC9n (KH\xD4NG c\xF3 t\u01A1 n\u1EA5m tr\u1EAFng \u1EDF g\u1ED1c). C\xE1ch th\u1EED chu\u1EA9n: c\u1EAFt ngang \u0111o\u1EA1n g\u1ED1c th\xE2n th\u1EA3 v\xE0o c\u1ED1c n\u01B0\u1EDBc s\u1EA1ch th\u1EA5y d\xF2ng d\u1ECBch vi khu\u1EA9n tr\u1EAFng \u0111\u1EE5c ch\u1EA3y th\xE0nh s\u1EE3i xu\u1ED1ng \u0111\xE1y.",
    symptomChecklist: [
      "C\xE2y h\xE9o r\u0169 \u0111\u1ED9t ng\u1ED9t khi l\xE1 v\u1EABn c\xF2n m\xE0u xanh, ph\u1EA7n g\u1ED1c th\xE2n KH\xD4NG c\xF3 m\u1ED1c tr\u1EAFng.",
      "Ch\u1EBB d\u1ECDc th\xE2n g\u1EA7n g\u1ED1c th\u1EA5y b\xF3 m\u1EA1ch d\u1EABn b\xEAn trong chuy\u1EC3n m\xE0u n\xE2u \u0111en.",
      "C\u1EAFt \u0111o\u1EA1n th\xE2n g\u1ED1c nh\xFAng v\xE0o ly n\u01B0\u1EDBc s\u1EA1ch sau 3-5 ph\xFAt th\u1EA5y c\xF3 s\u1EE3i kh\xF3i d\u1ECBch vi khu\u1EA9n m\xE0u tr\u1EAFng s\u1EEFa ch\u1EA3y xu\u1ED1ng."
    ],
    affectedPlantParts: ["stem", "leaf"],
    causes: "Vi khu\u1EA9n \u0111\u1EA5t Ralstonia solanacearum x\xE2m nh\u1EADp qua v\u1EBFt th\u01B0\u01A1ng r\u1EC5 do tuy\u1EBFn tr\xF9ng ho\u1EB7c x\u1EDBi \u0111\u1EA5t l\xE0m \u0111\u1EE9t r\u1EC5.",
    favorableConditions: "Nhi\u1EC7t \u0111\u1ED9 \u0111\u1EA5t cao 30-35\xB0C, \u0111\u1EA5t \u1EA9m \u01B0\u1EDBt \u0111\u1ECDng n\u01B0\u1EDBc sau m\u01B0a ho\u1EB7c tr\u1ED3ng l\u1EA1c li\xEAn t\u1EE5c nhi\u1EC1u n\u0103m kh\xF4ng lu\xE2n canh v\u1EDBi l\xFAa n\u01B0\u1EDBc.",
    preventionMethods: "LU\xC2N CANH v\u1EDBi l\xFAa n\u01B0\u1EDBc l\xE0 bi\u1EC7n ph\xE1p hi\u1EC7u qu\u1EA3 nh\u1EA5t \u0111\u1EC3 di\u1EC7t vi khu\u1EA9n trong \u0111\u1EA5t. S\u1EED d\u1EE5ng gi\u1ED1ng l\u1EA1c kh\xE1ng h\xE9o xanh nh\u01B0 L14, Sen Ngh\u1EC7 An. B\xF3n v\xF4i b\u1ED9t khi l\xE0m \u0111\u1EA5t.",
    safeManagement: "Nh\u1ED5 b\u1ECF ngay c\xE2y h\xE9o xanh, r\u1EAFc v\xF4i b\u1ED9t kh\u1EED h\u1ED1c \u0111\u1EA5t, tr\xE1nh x\u1EDBi x\xE1o l\xE0m \u0111\u1EE9t r\u1EC5 l\xE2n c\u1EADn v\xE0 ki\u1EC3m so\xE1t tuy\u1EBFn tr\xF9ng \u0111\u1EA5t b\u1EB1ng Trichoderma/ch\u1EBF ph\u1EA9m sinh h\u1ECDc.",
    treatmentSteps: {
      immediate: [
        "L\xE0m ph\xE9p th\u1EED c\u1EAFt g\u1ED1c nh\xFAng v\xE0o c\u1ED1c n\u01B0\u1EDBc trong: n\u1EBFu th\u1EA5y d\xF2ng d\u1ECBch tr\u1EAFng \u0111\u1EE5c ch\u1EA3y xu\u1ED1ng th\xEC ch\u1EAFc ch\u1EAFn l\xE0 h\xE9o xanh vi khu\u1EA9n.",
        "Nh\u1ED5 b\u1ECF ngay c\xE2y b\u1EC7nh, r\u1EAFc v\xF4i b\u1ED9t v\xE0o h\u1ED1 nh\u1ED5; tuy\u1EC7t \u0111\u1ED1i KH\xD4NG d\u1EABn n\u01B0\u1EDBc t\u01B0\u1EDBi r\xE3nh t\u1EEB ru\u1ED9ng b\u1EC7nh sang ru\u1ED9ng kh\u1ECFe."
      ],
      biologicalAndCare: [
        "Tr\xE1nh l\xE0m c\u1ECF x\u1EDBi x\xE1o s\xE2u s\xE1t g\u1ED1c khi ru\u1ED9ng \u0111ang c\xF3 c\xE2y h\xE9o xanh \u0111\u1EC3 kh\xF4ng g\xE2y \u0111\u1EE9t r\u1EC5 m\u1EDF \u0111\u01B0\u1EDDng cho vi khu\u1EA9n.",
        "V\u1EE5 sau lu\xE2n canh tr\u1ED3ng l\xFAa n\u01B0\u1EDBc ho\u1EB7c ng\xF4, k\u1EBFt h\u1EE3p b\xF3n v\xF4i v\xE0 ph\xE2n chu\u1ED3ng hoai m\u1EE5c c\xF3 Trichoderma."
      ],
      caution: [
        "C\xE2y l\u1EA1c \u0111\xE3 nhi\u1EC5m h\xE9o xanh vi khu\u1EA9n t\u1EAFc ngh\u1EBDn m\u1EA1ch d\u1EABn kh\xF4ng th\u1EC3 c\u1EE9u s\u1ED1ng b\u1EB1ng thu\u1ED1c phun l\xE1; thu\u1ED1c n\u1EA5m (Validamycin, Metalaxyl...) kh\xF4ng di\u1EC7t \u0111\u01B0\u1EE3c Ralstonia."
      ]
    },
    references: "ICRISAT Bacterial Wilt Guide; Vi\u1EC7n Khoa h\u1ECDc N\xF4ng nghi\u1EC7p B\u1EAFc Trung B\u1ED9.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt & Vi\u1EC7n ASIR",
    standardCode: "TCVN Canh t\xE1c L\u1EA1c b\u1EC1n v\u1EEFng",
    reviewDate: "2026-03-06",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Ralstonia_solanacearum_symptoms.jpg/960px-Ralstonia_solanacearum_symptoms.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Ralstonia_solanacearum_symptoms.jpg/960px-Ralstonia_solanacearum_symptoms.jpg",
        caption: "Bi\u1EC3u hi\u1EC7n c\xE2y h\xE9o r\u0169 \u0111\u1ED9t ng\u1ED9t khi l\xE1 v\u1EABn c\xF2n m\xE0u xanh \u0111\u1EB7c tr\u01B0ng c\u1EE7a b\u1EC7nh h\xE9o xanh",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Tomato_Bacterial_wilt_%28Pathogen_Ralstonia_solanacearum%29_%2812091835495%29.jpg/960px-Tomato_Bacterial_wilt_%28Pathogen_Ralstonia_solanacearum%29_%2812091835495%29.jpg",
        caption: "Ki\u1EC3m tra d\xF2ng d\u1ECBch vi khu\u1EA9n Ralstonia solanacearum tr\u1EAFng \u0111\u1EE5c ch\u1EA3y ra t\u1EEB m\u1EB7t c\u1EAFt th\xE2n",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-04T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_rhizoctonia_pod_rot",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh Kh\xF4 v\u1EB1n & Th\u1ED1i kh\xF4 v\u1ECF c\u1EE7 l\u1EA1c (Rhizoctonia Pod Rot)",
    englishName: "Peanut Rhizoctonia Limb and Pod Rot",
    symptoms: "Th\xE2n nh\xE1nh s\xE1t m\u1EB7t \u0111\u1EA5t xu\u1EA5t hi\u1EC7n v\u1EBFt th\u1ED1i kh\xF4 m\xE0u n\xE2u s\u1EABm \u0111\u1EBFn n\xE2u g\u1EC9 s\u1EAFt c\xF3 ranh gi\u1EDBi r\xF5, l\xE0m t\u1EEBng c\xE0nh ch\u1EBFt kh\xF4. D\u01B0\u1EDBi \u0111\u1EA5t, v\u1ECF c\u1EE7 l\u1EA1c chuy\u1EC3n m\xE0u n\xE2u \u0111en th\u1ED1i kh\xF4 gi\xF2n, h\u1EA1t b\xEAn trong b\u1ECB teo ho\u1EB7c th\u1ED1i h\u1ECFng.",
    symptomChecklist: [
      "C\xE1c c\xE0nh nh\xE1nh n\u1EB1m s\xE1t m\u1EB7t \u0111\u1EA5t b\u1ECB th\u1ED1i n\xE2u s\u1EABm th\xE0nh t\u1EEBng \u0111o\u1EA1n r\xF5 r\u1EC7t (kh\xF4ng c\xF3 l\u1EDBp b\xF4ng tr\u1EAFng d\xE0y nh\u01B0 m\u1ED1c tr\u1EAFng).",
      "Nh\u1ED5 kh\xF3m l\u1EA1c l\xEAn th\u1EA5y v\u1ECF c\u1EE7 c\xF3 m\u1EA3ng th\u1ED1i kh\xF4 m\xE0u n\xE2u g\u1EC9 ho\u1EB7c \u0111en s\u1EABm, cu\u1ED1ng c\u1EE7 m\u1EE5c d\u1EC5 \u0111\u1EE9t s\xF3t l\u1EA1i d\u01B0\u1EDBi \u0111\u1EA5t."
    ],
    affectedPlantParts: ["stem", "fruit"],
    causes: "N\u1EA5m \u0111\u1EA5t Rhizoctonia solani (Thanatephorus cucumeris) s\u1ED1ng ho\u1EA1i sinh tr\xEAn x\xE1c b\xE3 th\u1EF1c v\u1EADt trong \u0111\u1EA5t.",
    favorableConditions: "\u0110\u1EA5t \u1EA9m b\xED sau m\u01B0a l\u1EDBn k\u1EBFt h\u1EE3p nhi\u1EC7t \u0111\u1ED9 cao giai \u0111o\u1EA1n l\u1EA1c h\xECnh th\xE0nh tia v\xE0 ph\xE1t tri\u1EC3n c\u1EE7.",
    preventionMethods: "Lu\xE2n canh h\u1EE3p l\xFD, c\xE0y ph\u01A1i \u1EA3i \u0111\u1EA5t tr\u01B0\u1EDBc khi tr\u1ED3ng, kh\xF4ng gieo l\u1EA1c qu\xE1 d\xE0y v\xE0 kh\xF4ng vun \u0111\u1EA5t qu\xE1 cao l\u1EA5p k\xEDn nhi\u1EC1u c\xE0nh l\xE1.",
    safeManagement: "B\xF3n l\xF3t Trichoderma v\xE0 v\xF4i b\u1ED9t kh\u1EED \u0111\u1EA5t; gi\u1EEF ru\u1ED9ng tho\xE1t n\u01B0\u1EDBc t\u1ED1t v\xE0 phun Validamycin / Azoxystrobin h\u01B0\u1EDBng v\xE0o g\u1ED1c c\xE0nh khi ph\xE1t hi\u1EC7n s\u1EDBm.",
    treatmentSteps: {
      immediate: [
        "Kh\u01A1i r\xE3nh tho\xE1t n\u01B0\u1EDBc nhanh n\u1EBFu ru\u1ED9ng l\u1EA1c b\u1ECB \u1EE9 \u1EA9m l\xE2u ng\xE0y.",
        "Nh\u1ED5 ki\u1EC3m tra th\u1EED v\xE0i kh\xF3m \u1EDF v\xF9ng tr\u0169ng xem v\u1ECF c\u1EE7 v\xE0 c\xE0nh s\xE1t \u0111\u1EA5t c\xF3 b\u1ECB v\u1EBFt n\xE2u kh\xF4 kh\xF4ng."
      ],
      biologicalAndCare: [
        "T\u01B0\u1EDBi n\u1EA5m \u0111\u1ED1i kh\xE1ng Trichoderma v\xE0o v\xF9ng g\u1ED1c lu\u1ED1ng k\u1EBFt h\u1EE3p r\u1EAFc nh\u1EB9 v\xF4i b\u1ED9t v\xF9ng \u0111\u1EA5t \u1EA9m.",
        "N\u1EBFu di\u1EC7n t\xEDch c\xE0nh s\xE1t \u0111\u1EA5t b\u1ECB kh\xF4 v\u1EB1n t\u0103ng nhanh, phun thu\u1ED1c \u0111\u1EB7c tr\u1ECB Validamycin ho\u1EB7c Azoxystrobin xu\u1ED1ng v\xF9ng g\u1ED1c c\xE0nh."
      ],
      caution: [
        "Tr\xE1nh vun lu\u1ED1ng l\u1EA5p \u0111\u1EA5t ch\xF4n v\xF9i l\xE1 xanh c\u1EE7a c\xE2y l\u1EA1c v\xE0o \u0111\u1EA5t \u1EA9m v\xEC l\xE1 m\u1EE5c s\u1EBD l\xE0m n\u1EA5m Rhizoctonia ph\xE1t tri\u1EC3n m\u1EA1nh xu\u1ED1ng c\u1EE7."
      ]
    },
    references: "USDA-ARS Peanut Pod & Limb Rot Guide; Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt.",
    verificationStatus: "verified",
    verifiedBy: "USDA-ARS & Vi\u1EC7n BVTV Vi\u1EC7t Nam",
    standardCode: "ICRISAT Soilborne Disease Guide",
    reviewDate: "2026-03-06",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg/500px-Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg/500px-Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg",
        caption: "V\u1ECF c\u1EE7 l\u1EA1c b\u1ECB th\u1ED1i kh\xF4 m\xE0u n\xE2u g\u1EC9 s\u1EABm do n\u1EA5m Rhizoctonia solani",
        source: "USDA-ARS / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Thanatephorus_cucumeris_infected_peanuts.jpg/330px-Thanatephorus_cucumeris_infected_peanuts.jpg",
        caption: "C\u1EE7 v\xE0 ph\u1EA7n g\u1ED1c l\u1EA1c b\u1ECB n\u1EA5m Thanatephorus cucumeris t\u1EA5n c\xF4ng trong \u0111\u1EA5t \u1EA9m",
        source: "USDA / Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-07T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_crown_rot",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh Th\u1ED1i \u0111en c\u1ED5 r\u1EC5 c\xE2y l\u1EA1c con (Aspergillus Crown Rot)",
    englishName: "Peanut Aspergillus Crown Rot",
    symptoms: "G\xE2y h\u1EA1i n\u1EB7ng tr\xEAn c\xE2y l\u1EA1c con 10-30 ng\xE0y sau m\u1ECDc: c\xE2y con h\xE9o r\u0169 ch\u1EBFt ngang c\u1ED5 r\u1EC5 s\xE1t m\u1EB7t \u0111\u1EA5t. Ph\u1EA7n c\u1ED5 r\u1EC5 v\xE0 h\u1EA1t gi\u1ED1ng c\xF2n s\xF3t b\u1ECB th\u1ED1i m\u1EC1m v\xE0 ph\u1EE7 k\xEDn l\u1EDBp b\xE0o t\u1EED n\u1EA5m m\xE0u \u0110EN K\u1ECAT nh\u01B0 mu\u1ED9i than.",
    symptomChecklist: [
      "C\xE2y l\u1EA1c con h\xE9o g\u1EE5c nhanh ch\xF3ng khi m\u1EDBi m\u1ECDc \u0111\u01B0\u1EE3c 1-4 tu\u1EA7n.",
      "Nh\u1ED5 c\xE2y con l\xEAn th\u1EA5y ph\u1EA7n c\u1ED5 r\u1EC5 s\xE1t m\u1EB7t \u0111\u1EA5t m\u1EE5c n\xE1t v\xE0 b\xE1m \u0111\u1EA7y b\u1EE5i ph\u1EA5n M\xC0U \u0110EN K\u1ECAT."
    ],
    affectedPlantParts: ["stem", "other"],
    causes: "N\u1EA5m Aspergillus niger l\xE2y t\u1EEB h\u1EA1t gi\u1ED1ng nhi\u1EC5m b\u1EC7nh ho\u1EB7c t\u1ED3n t\u1EA1i trong \u0111\u1EA5t kh\xF4 n\xF3ng.",
    favorableConditions: "Th\u1EDDi ti\u1EBFt n\u1EAFng n\xF3ng kh\xF4 h\u1EA1n ngay sau khi gieo h\u1EA1t, h\u1EA1t gi\u1ED1ng b\u1ECB s\u1EE9t v\u1ECF l\u1EE5a tr\u01B0\u1EDBc khi tr\u1ED3ng ho\u1EB7c gieo qu\xE1 s\xE2u.",
    preventionMethods: "Ch\u1EC9 b\xF3c v\u1ECF c\u1EE7 l\u1EA5y h\u1EA1t l\xE0m gi\u1ED1ng ngay s\xE1t ng\xE0y gieo (kh\xF4ng b\xF3c tr\u01B0\u1EDBc l\xE2u ng\xE0y l\xE0m tr\u1EA7y v\u1ECF l\u1EE5a); tr\u1ED9n x\u1EED l\xFD h\u1EA1t gi\u1ED1ng tr\u01B0\u1EDBc khi gieo v\xE0 t\u01B0\u1EDBi \u0111\u1EE7 \u1EA9m sau gieo.",
    safeManagement: "Nh\u1ED5 b\u1ECF c\xE2y con ch\u1EBFt \u0111en, kh\xF4ng tr\u1ED3ng d\u1EB7m tr\u1EF1c ti\u1EBFp v\xE0o h\u1ED1c c\u0169 m\xE0 ch\u01B0a r\u1EAFc v\xF4i/Trichoderma; x\u1EED l\xFD h\u1EA1t gi\u1ED1ng s\u1EA1ch b\u1EB1ng ch\u1EBF ph\u1EA9m sinh h\u1ECDc v\u1EE5 t\u1EDBi.",
    treatmentSteps: {
      immediate: [
        "Nh\u1ED5 b\u1ECF c\xE1c c\xE2y con h\xE9o ch\u1EBFt \u0111en c\u1ED5 r\u1EC5, r\u1EAFc v\xF4i ho\u1EB7c t\u01B0\u1EDBi Trichoderma v\xE0o h\u1ED1 tr\u01B0\u1EDBc khi tr\u1ED3ng d\u1EB7m c\xE2y m\u1EDBi."
      ],
      biologicalAndCare: [
        "\u0110\u1EA3m b\u1EA3o \u0111\u1EA5t \u0111\u1EE7 \u1EA9m m\xE1t trong 2 tu\u1EA7n \u0111\u1EA7u sau gieo; tr\xE1nh \u0111\u1EC3 \u0111\u1EA5t qu\xE1 kh\xF4 n\xF3ng r\u1ED3i m\u1EDBi t\u01B0\u1EDBi d\u1EADp.",
        "V\u1EE5 sau ch\u1EC9 b\xF3c v\u1ECF l\u1EA1c gi\u1ED1ng 1-2 ng\xE0y tr\u01B0\u1EDBc khi gieo v\xE0 \xE1o h\u1EA1t gi\u1ED1ng b\u1EB1ng ch\u1EBF ph\u1EA9m sinh h\u1ECDc b\u1EA3o v\u1EC7 r\u1EC5."
      ],
      caution: [
        "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng d\xF9ng h\u1EA1t l\u1EA1c b\u1ECB n\u1EE9t v\u1EE1 v\u1ECF l\u1EE5a, \u0111\u1ED5i m\xE0u \u0111en m\u1ED1c \u0111\u1EC3 l\xE0m gi\u1ED1ng gieo."
      ]
    },
    references: "ICRISAT Peanut Crown Rot Compendium; Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt.",
    verificationStatus: "verified",
    verifiedBy: "ICRISAT & Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt",
    standardCode: "ICRISAT Seed & Seedling Manual",
    reviewDate: "2026-03-07",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aspergillus_niger_01.jpg/960px-Aspergillus_niger_01.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aspergillus_niger_01.jpg/960px-Aspergillus_niger_01.jpg",
        caption: "L\u1EDBp n\u1EA5m m\u1ED1c \u0111en k\u1ECBt \u0111\u1EB7c tr\u01B0ng c\u1EE7a Aspergillus niger g\xE2y th\u1ED1i c\u1ED5 r\u1EC5 l\u1EA1c con",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Aspergillus_niger_Micrograph.jpg/330px-Aspergillus_niger_Micrograph.jpg",
        caption: "C\u1EA5u tr\xFAc \u0111\u1EA7u b\xE0o t\u1EED n\u1EA5m Aspergillus niger d\u01B0\u1EDBi k\xEDnh hi\u1EC3n vi ki\u1EC3m ch\u1EE9ng",
        source: "CDC / Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-09T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_aflatoxin_mold",
    cropType: "peanut",
    vietnameseName: "B\u1EC7nh M\u1ED1c v\xE0ng h\u1EA1t l\u1EA1c & \u0110\u1ED9c t\u1ED1 Aflatoxin (Aspergillus flavus)",
    englishName: "Peanut Yellow Mold & Aflatoxin Contamination",
    symptoms: "Tr\xEAn v\u1ECF v\xE0 nh\xE2n h\u1EA1t l\u1EA1c b\u1ECB t\u1ED5n th\u01B0\u01A1ng ho\u1EB7c thu ho\u1EA1ch \u1EA9m \u01B0\u1EDBt xu\u1EA5t hi\u1EC7n l\u1EDBp m\u1ED1c m\u1ECBn m\xE0u V\xC0NG XANH L\u1EE4C (v\xE0ng chanh chuy\u1EC3n l\u1EE5c). Nh\xE2n h\u1EA1t bi\u1EBFn m\xE0u \u0111\u1EAFng, m\u1EC1m v\xE0 nhi\u1EC5m \u0111\u1ED9c t\u1ED1 Aflatoxin c\u1EF1c \u0111\u1ED9c \u0111\u1ED1i v\u1EDBi ng\u01B0\u1EDDi v\xE0 gia s\xFAc.",
    symptomChecklist: [
      "Nh\xE2n h\u1EA1t l\u1EA1c c\xF3 l\u1EDBp ph\u1EA5n m\u1ED1c m\xE0u v\xE0ng xanh l\u1EE5c (v\xE0ng chanh \u0111\u1EBFn xanh r\xEAu) \u0111\u1EB7c tr\u01B0ng.",
      "H\u1EA1t c\xF3 m\xF9i m\u1ED1c h\u0103ng, v\u1ECB \u0111\u1EAFng g\u1EAFt, th\u01B0\u1EDDng xu\u1EA5t hi\u1EC7n tr\xEAn c\u1EE7 b\u1ECB s\xE2u \u0111\u1EA5t \u0111\u1EE5c ho\u1EB7c ph\u01A1i s\u1EA5y kh\xF4ng k\u1ECBp l\xFAc m\u01B0a.",
      "\u0110\u1ED9c t\u1ED1 Aflatoxin KH\xD4NG m\u1EA5t \u0111i khi rang ho\u1EB7c lu\u1ED9c \u1EDF nhi\u1EC7t \u0111\u1ED9 n\u1EA5u \u0103n th\xF4ng th\u01B0\u1EDDng."
    ],
    affectedPlantParts: ["fruit"],
    causes: "N\u1EA5m Aspergillus flavus v\xE0 Aspergillus parasiticus x\xE2m nh\u1EADp v\xE0o c\u1EE7 ngo\xE0i \u0111\u1ED3ng l\xFAc kh\xF4 h\u1EA1n cu\u1ED1i v\u1EE5 ho\u1EB7c trong qu\xE1 tr\xECnh thu ho\u1EA1ch ph\u01A1i b\u1EA3o qu\u1EA3n \u1EA9m.",
    favorableConditions: "Kh\xF4 h\u1EA1n k\xE9o d\xE0i 3-4 tu\u1EA7n tr\u01B0\u1EDBc khi nh\u1ED5 l\u1EA1c (l\xE0m n\u1EE9t v\u1ECF c\u1EE7) ho\u1EB7c g\u1EB7p m\u01B0a d\u1EA7m kh\xF4ng ph\u01A1i kh\xF4 k\u1ECBp \u0111\u1ED9 \u1EA9m xu\u1ED1ng d\u01B0\u1EDBi 9% sau thu ho\u1EA1ch.",
    preventionMethods: "T\u01B0\u1EDBi gi\u1EEF \u1EA9m nh\u1EB9 giai \u0111o\u1EA1n c\u1EE7 v\xE0o ch\u1EAFc tr\xE1nh kh\xF4 h\u1EA1n n\u1EE9t \u0111\u1EA5t; nh\u1ED5 l\u1EA1c \u0111\xFAng \u0111\u1ED9 ch\xEDn, lo\u1EA1i s\u1EA1ch c\u1EE7 v\u1EE1 d\u1EADp th\u1ED1i v\xE0 ph\u01A1i th\u1EADt kh\xF4 ngay tr\xEAn b\u1EA1t s\u1EA1ch (\u0111\u1ED9 \u1EA9m h\u1EA1t <9%).",
    safeManagement: "Ph\xF2ng tr\u1EEB s\xE2u s\xF9ng \u0111\u1EA5t, m\u1ED1i h\u1EA1i c\u1EE7 d\u01B0\u1EDBi \u0111\u1EA5t. Khi b\u1EA3o qu\u1EA3n ph\u1EA3i \u0111\u1EF1ng trong bao k\xEDn l\xF3t t\xFAi PE n\u01A1i kh\xF4 tho\xE1ng, kh\xF4ng \u0111\u1EC3 tr\u1EF1c ti\u1EBFp xu\u1ED1ng n\u1EC1n xi m\u0103ng \u1EA9m.",
    treatmentSteps: {
      immediate: [
        "Nh\u1EB7t lo\u1EA1i b\u1ECF ngay to\xE0n b\u1ED9 c\u1EE7 l\u1EA1c l\xE9p, n\u1EE9t v\u1ECF, s\xE2u \u0111\u1EE5c ho\u1EB7c ch\u1EDBm c\xF3 m\u1ED1c v\xE0ng xanh l\u1EE5c kh\u1ECFi l\xF4 l\u1EA1c l\xE0nh; tuy\u1EC7t \u0111\u1ED1i KH\xD4NG \u0103n hay \xE9p d\u1EA7u l\u1EA1c \u0111\xE3 m\u1ED1c.",
        "Tr\u1EA3i m\u1ECFng l\u1EA1c s\u1EA1ch l\xEAn b\u1EA1t ph\u01A1i n\u1EAFng ho\u1EB7c s\u1EA5y kh\xF4 ngay sau khi nh\u1ED5."
      ],
      biologicalAndCare: [
        "B\u1EA3o qu\u1EA3n l\u1EA1c kh\xF4 (\u0111\u1ED9 \u1EA9m d\u01B0\u1EDBi 9%) trong bao k\xEDn k\xEA tr\xEAn gi\xE1 cao c\xE1ch m\u1EB7t \u0111\u1EA5t t\u1ED1i thi\u1EC3u 20 cm.",
        "Ngo\xE0i \u0111\u1ED3ng c\u1EA7n b\xF3n \u0111\u1EE7 v\xF4i b\u1ED9t v\xE0 gi\u1EEF \u1EA9m giai \u0111o\u1EA1n cu\u1ED1i v\u1EE5 \u0111\u1EC3 v\u1ECF c\u1EE7 ch\u1EAFc, h\u1EA1n ch\u1EBF n\u1EE9t v\u1ECF v\xE0 c\xF4n tr\xF9ng c\u1EAFn c\u1EE7."
      ],
      caution: [
        "Tuy\u1EC7t \u0111\u1ED1i KH\xD4NG t\u1EADn d\u1EE5ng l\u1EA1c m\u1ED1c v\xE0ng xanh \u0111\u1EC3 \u0103n, l\xE0m b\u01A1 l\u1EA1c hay cho l\u1EE3n g\xE0 \u0103n v\xEC Aflatoxin g\xE2y ng\u1ED9 \u0111\u1ED9c gan c\u1EF1c k\u1EF3 nguy hi\u1EC3m."
      ]
    },
    references: "FAO Aflatoxin Prevention Guidelines; C\u1EE5c An to\xE0n Th\u1EF1c ph\u1EA9m & Vi\u1EC7n BVTV.",
    verificationStatus: "verified",
    verifiedBy: "FAO & Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "Codex / FAO Aflatoxin Prevention Code",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Aspergillus_flavus_01.jpg/960px-Aspergillus_flavus_01.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Aspergillus_flavus_01.jpg/960px-Aspergillus_flavus_01.jpg",
        caption: "L\u1EDBp ph\u1EA5n n\u1EA5m m\u1ED1c m\xE0u v\xE0ng l\u1EE5c Aspergillus flavus sinh \u0111\u1ED9c t\u1ED1 Aflatoxin",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Aspergillus_flavus.jpg/960px-Aspergillus_flavus.jpg",
        caption: "T\u1EA3n n\u1EA5m m\u1ED1c v\xE0ng xanh \u0111\u1EB7c tr\u01B0ng c\u1EE7a Aspergillus flavus ph\xE1t tri\u1EC3n \u1EDF \u0111\u1ED9 \u1EA9m cao",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-10T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_aphid",
    cropType: "peanut",
    vietnameseName: "R\u1EC7p mu\u1ED9i \u0111en h\u1EA1i l\u1EA1c (Groundnut Aphid)",
    englishName: "Peanut / Cowpea Aphid",
    symptoms: "\u0110\xE0n r\u1EC7p nh\u1ECF m\xE0u \u0111en b\xF3ng b\xE1m d\xE0y \u0111\u1EB7c quanh ng\u1ECDn non, cu\u1ED1ng hoa v\xE0 m\u1EB7t d\u01B0\u1EDBi l\xE1 non \u0111\u1EC3 ch\xEDch h\xFAt nh\u1EF1a c\xE2y. Ng\u1ECDn l\u1EA1c b\u1ECB qu\u0103n r\u0169, c\xF2i c\u1ECDc, m\u1EB7t l\xE1 d\xEDnh d\u1ECBch ng\u1ECDt d\u1EC5 sinh n\u1EA5m mu\u1ED9i \u0111en. \u0110\u1EB7c bi\u1EC7t r\u1EC7p mu\u1ED9i truy\u1EC1n b\u1EC7nh virus kh\u1EA3m l\xE1 l\xE0m c\xE2y l\u1EA1c l\xF9n xo\u0103n ng\u1ECDn.",
    symptomChecklist: [
      "T\u1EEBng \u0111\xE1m r\u1EC7p nh\u1ECF m\xE0u \u0111en b\xF3ng (ho\u1EB7c xanh \u0111en) b\xE1m k\xEDn \u0111\u1ECDt non v\xE0 cu\u1ED1ng ch\u1ED3i.",
      "L\xE1 non b\u1ECB xo\u0103n l\u1EA1i, c\xE2y ch\u1EADm l\u1EDBn, hoa r\u1EE5ng nhi\u1EC1u.",
      "Th\u01B0\u1EDDng th\u1EA5y ki\u1EBFn b\xF2 qua l\u1EA1i tr\xEAn ng\u1ECDn l\u1EA1c v\xE0 c\xF3 b\u1ECD r\xF9a \u0111\u1ECF t\u1EF1 nhi\xEAn t\xECm \u0103n r\u1EC7p."
    ],
    affectedPlantParts: ["leaf", "stem"],
    causes: "R\u1EC7p mu\u1ED9i \u0111en Aphis craccivora. Sinh s\u1EA3n v\xF4 t\xEDnh c\u1EF1c nhanh trong \u0111i\u1EC1u ki\u1EC7n th\u1EDDi ti\u1EBFt kh\xF4 \u1EA5m.",
    favorableConditions: "Th\u1EDDi ti\u1EBFt n\u1EAFng \u1EA5m \xEDt m\u01B0a k\xE9o d\xE0i giai \u0111o\u1EA1n c\xE2y l\u1EA1c t\u1EEB 20-45 ng\xE0y (chu\u1EA9n b\u1ECB v\xE0 \u0111ang ra hoa r\u1ED9).",
    preventionMethods: "L\xE0m s\u1EA1ch c\u1ECF d\u1EA1i h\u1ECD \u0111\u1EADu quanh b\u1EDD ru\u1ED9ng, gieo tr\u1ED3ng \u0111\u1ED3ng lo\u1EA1t, b\u1EA3o v\u1EC7 thi\xEAn \u0111\u1ECBch t\u1EF1 nhi\xEAn nh\u01B0 b\u1ECD r\xF9a, ru\u1ED3i \u0103n r\u1EC7p.",
    safeManagement: "N\u1EBFu ru\u1ED9ng c\xF3 nhi\u1EC1u b\u1ECD r\xF9a th\xEC h\u1EA1n ch\u1EBF phun thu\u1ED1c. Khi m\u1EADt \u0111\u1ED9 r\u1EC7p cao l\xE0m xo\u0103n ng\u1ECDn (>20% c\xE2y nhi\u1EC5m), phun d\u1EA7u kho\xE1ng sinh h\u1ECDc, n\u01B0\u1EDBc x\xE0 ph\xF2ng sinh h\u1ECDc ho\u1EB7c ho\u1EA1t ch\u1EA5t tr\u1EEB r\u1EC7p nh\u1EB9 theo \u0111\xFAng h\u01B0\u1EDBng d\u1EABn.",
    treatmentSteps: {
      immediate: [
        "Ki\u1EC3m tra xem tr\xEAn ng\u1ECDn c\xF3 r\u1EC7p b\xE1m d\xE0y kh\xF4ng v\xE0 \u0111\u1EBFm xem \u0111\xE3 c\xF3 nhi\u1EC1u b\u1ECD r\xF9a \u0111\u1ECF \u0103n r\u1EC7p t\u1EF1 nhi\xEAn ch\u01B0a.",
        "N\u1EBFu ch\u1EC9 m\u1EDBi xu\u1EA5t hi\u1EC7n \u1EDF v\xE0i b\u1EE5i r\xECa b\u1EDD, c\xF3 th\u1EC3 ng\u1EAFt ng\u1ECDn ho\u1EB7c tu\u1ED1t b\u1ECF ti\xEAu h\u1EE7y ngay."
      ],
      biologicalAndCare: [
        "Phun d\u1EA7u kho\xE1ng sinh h\u1ECDc ho\u1EB7c ch\u1EBF ph\u1EA9m tr\u1EEB r\u1EC7p an to\xE0n (Imidacloprid / Pymetrozine / ch\u1EBF ph\u1EA9m th\u1EA3o m\u1ED9c t\u1ECFi \u1EDBt neem) v\xE0o chi\u1EC1u m\xE1t, phun \u01B0\u1EDBt \u0111\u1ECDt v\xE0 m\u1EB7t d\u01B0\u1EDBi l\xE1.",
        "T\u01B0\u1EDBi gi\u1EEF \u1EA9m ru\u1ED9ng l\u1EA1c khi tr\u1EDDi hanh kh\xF4 k\xE9o d\xE0i \u0111\u1EC3 h\u1EA1n ch\u1EBF r\u1EC7p b\xF9ng ph\xE1t."
      ],
      caution: [
        "Kh\xF4ng d\xF9ng thu\u1ED1c tr\u1EEB s\xE2u ph\u1ED5 r\u1ED9ng li\u1EC1u cao v\xEC s\u1EBD gi\u1EBFt h\u1EBFt b\u1ECD r\xF9a v\xE0 ong k\xFD sinh khi\u1EBFn r\u1EC7p b\xF9ng ph\xE1t tr\u1EDF l\u1EA1i nhanh h\u01A1n."
      ]
    },
    references: "CSIRO Entomology; Vi\u1EC7n Khoa h\u1ECDc N\xF4ng nghi\u1EC7p B\u1EAFc Trung B\u1ED9.",
    verificationStatus: "verified",
    verifiedBy: "CSIRO & Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt",
    standardCode: "ICRISAT Peanut IPM Guidelines",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg/960px-CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg/960px-CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg",
        caption: "\u0110\xE0n r\u1EC7p mu\u1ED9i t\u1EADp trung d\xE0y \u0111\u1EB7c ch\xEDch h\xFAt nh\u1EF1a tr\xEAn \u0111\u1ECDt v\xE0 m\u1EB7t d\u01B0\u1EDBi l\xE1",
        source: "CSIRO / Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Aphis_gossypii04.jpg/960px-Aphis_gossypii04.jpg",
        caption: "C\u1EADn c\u1EA3nh r\u1EC7p mu\u1ED9i ch\xEDch h\xFAt l\xE0m l\xE1 non xo\u0103n r\u0169",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Aphis_craccivora_apeterous_vipera_3rd_antennal.jpg/330px-Aphis_craccivora_apeterous_vipera_3rd_antennal.jpg",
        caption: "\u0110\u1EB7c \u0111i\u1EC3m nh\u1EADn d\u1EA1ng r\u1EC7p mu\u1ED9i \u0111en Aphis craccivora h\u1EA1i c\xE2y h\u1ECD \u0111\u1EADu",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-11T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  },
  {
    id: "peanut_armyworm_cutworm",
    cropType: "peanut",
    vietnameseName: "S\xE2u khoang & S\xE2u xanh \u0103n l\xE1 h\u1EA1i l\u1EA1c (Armyworm & Pod Borer)",
    englishName: "Peanut Tobacco Cutworm (Spodoptera litura)",
    symptoms: 'S\xE2u non m\u1EDBi n\u1EDF s\u1ED1ng t\u1EADp trung g\u1EB7m m\u1EB7t d\u01B0\u1EDBi l\xE1 t\u1EA1o th\xE0nh m\u1EA3ng m\xE0ng tr\u1EAFng x\u01A1 x\xE1c ("l\u1EE7ng l\u1ED7 m\u1EA1ng"). S\xE2u tu\u1ED5i l\u1EDBn (c\xF3 c\xE1c khoang tam gi\xE1c \u0111en \u0111\u1EB7c tr\u01B0ng d\u1ECDc hai b\xEAn l\u01B0ng) ph\xE2n t\xE1n \u0103n khuy\u1EBFt to\xE0n b\u1ED9 phi\u1EBFn l\xE1 ch\u1EC9 ch\u1EEBa g\xE2n, l\xE0m tr\u01A1 tr\u1EE5i ru\u1ED9ng l\u1EA1c ch\u1EC9 sau v\xE0i \u0111\xEAm.',
    symptomChecklist: [
      "L\xE1 non b\u1ECB \u0103n m\u1EA5t ph\u1EA7n xanh ch\u1EC9 c\xF2n m\xE0ng m\u1ECFng tr\u1EAFng x\u01A1 (s\xE2u m\u1EDBi n\u1EDF t\u1EADp trung h\xE0ng ch\u1EE5c con m\u1ED9t l\xE1).",
      "S\xE2u tu\u1ED5i l\u1EDBn d\xE0i 3-4 cm m\xE0u n\xE2u x\xE1m ho\u1EB7c xanh \u0111en c\xF3 c\xE1c v\u1EBFt tam gi\xE1c \u0111en r\xF5 d\u1ECDc hai b\xEAn th\xE2n.",
      "Ban ng\xE0y n\u1EAFng s\xE2u th\u01B0\u1EDDng chui xu\u1ED1ng d\u01B0\u1EDBi g\u1ED1c r\u01A1m r\u1EA1 ho\u1EB7c k\u1EBD \u0111\u1EA5t \u1EA9m, chi\u1EC1u t\u1ED1i m\u1EDBi b\xF2 l\xEAn c\u1EAFn ph\xE1 m\u1EA1nh."
    ],
    affectedPlantParts: ["leaf", "stem"],
    causes: "S\xE2u khoang (Spodoptera litura) v\xE0 s\xE2u xanh (Helicoverpa armigera).",
    favorableConditions: "Giai \u0111o\u1EA1n l\u1EA1c ph\xE1t tri\u1EC3n th\xE2n l\xE1 xanh r\u1EADm t\u1EEB 30-75 ng\xE0y sau gieo, th\u1EDDi ti\u1EBFt \u1EA5m \u1EA9m xen k\u1EBD n\u1EAFng.",
    preventionMethods: "C\xE0y \u1EA3i \u0111\u1EA5t ph\u01A1i n\u1EAFng di\u1EC7t nh\u1ED9ng sau thu ho\u1EA1ch; b\u1EAFt \u1ED5 tr\u1EE9ng c\xF3 l\u1EDBp l\xF4ng m\xE0u v\xE0ng r\u01A1m m\u1EB7t d\u01B0\u1EDBi l\xE1 v\xE0 ng\u1EAFt l\xE1 c\xF3 s\xE2u non m\u1EDBi n\u1EDF s\u1ED1ng t\u1EE5 t\u1EADp.",
    safeManagement: "Phun ch\u1EBF ph\u1EA9m vi khu\u1EA9n Bt, n\u1EA5m xanh/virus NPV ho\u1EB7c thu\u1ED1c sinh h\u1ECDc Emamectin v\xE0o CHI\u1EC0U M\xC1T ho\u1EB7c T\u1ED0I khi s\xE2u b\xF2 l\xEAn \u0103n l\xE1.",
    treatmentSteps: {
      immediate: [
        "\u0110i th\u0103m \u0111\u1ED3ng t\xECm c\xE1c l\xE1 l\u1EA1c b\u1ECB g\u1EB7m m\xE0ng tr\u1EAFng x\u01A1 \u0111\u1EC3 b\u1EAFt ti\xEAu h\u1EE7y ngay c\u1EA3 \u1ED5 s\xE2u non \u0111ang t\u1EE5 t\u1EADp tr\u01B0\u1EDBc khi ch\xFAng t\u1EA3n ra c\u1EA3 ru\u1ED9ng.",
        "B\u1EDBi nh\u1EB9 g\u1ED1c \u0111\u1EA5t d\u01B0\u1EDBi c\xE1c kh\xF3m l\u1EA1c b\u1ECB c\u1EAFn khuy\u1EBFt \u0111\u1EC3 ki\u1EC3m tra s\xE2u tu\u1ED5i l\u1EDBn tr\u1ED1n ban ng\xE0y."
      ],
      biologicalAndCare: [
        "Phun ch\u1EBF ph\u1EA9m tr\u1EEB s\xE2u sinh h\u1ECDc (Bt, NPV, Emamectin benzoate ho\u1EB7c Indoxacarb) v\xE0o l\xFAc CHI\u1EC0U T\u1ED0I khi s\xE2u b\u1EAFt \u0111\u1EA7u b\xF2 l\xEAn t\xE1n \u0103n l\xE1."
      ],
      caution: [
        "Phun thu\u1ED1c v\xE0o gi\u1EEFa tr\u01B0a n\u1EAFng khi s\xE2u \u0111ang tr\u1ED1n d\u01B0\u1EDBi k\u1EBD \u0111\u1EA5t s\u1EBD k\xE9m hi\u1EC7u qu\u1EA3; s\xE2u khoang tu\u1ED5i 4-5 r\u1EA5t kh\xF3 di\u1EC7t n\xEAn ph\u1EA3i ph\xE1t hi\u1EC7n s\u1EDBm t\u1EEB tu\u1ED5i 1-2."
      ]
    },
    references: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam; ICRISAT Defoliator Management.",
    verificationStatus: "verified",
    verifiedBy: "Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam",
    standardCode: "TCVN IPM C\xE2y L\u1EA1c",
    reviewDate: "2026-03-08",
    sampleImageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Spodoptera_litura_3.jpg/960px-Spodoptera_litura_3.jpg",
    galleryImages: [
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Spodoptera_litura_3.jpg/960px-Spodoptera_litura_3.jpg",
        caption: "S\xE2u khoang Spodoptera litura v\u1EDBi c\xE1c khoang tam gi\xE1c \u0111en \u0111\u1EB7c tr\u01B0ng d\u1ECDc l\u01B0ng",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Spodoptera_litura_late_instar_caterpillar.jpg/960px-Spodoptera_litura_late_instar_caterpillar.jpg",
        caption: "S\xE2u khoang tu\u1ED5i l\u1EDBn g\u1EB7m khuy\u1EBFt phi\u1EBFn l\xE1 v\xE0 \u0103n tr\u1EE5i t\xE1n c\xE2y",
        source: "Wikimedia Commons"
      },
      {
        url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Helicoverpa_armigera.jpg/500px-Helicoverpa_armigera.jpg",
        caption: "S\xE2u xanh Helicoverpa armigera th\u01B0\u1EDDng xu\u1EA5t hi\u1EC7n c\xF9ng s\xE2u khoang \u0103n n\u1EE5 hoa v\xE0 l\xE1 non",
        source: "Wikimedia Commons"
      }
    ],
    createdAt: "2026-02-12T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z"
  }
];

// server/authRoutes.ts
var import_express = __toESM(require("express"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_os = __toESM(require("os"), 1);
var import_path = __toESM(require("path"), 1);
function resolveDataDir() {
  if (process.env.VERCEL === "1") {
    return import_path.default.join(import_os.default.tmpdir(), "agrivision-data");
  }
  const localDir = import_path.default.resolve(process.cwd(), ".data");
  try {
    if (!import_fs.default.existsSync(localDir)) {
      import_fs.default.mkdirSync(localDir, { recursive: true });
    }
    import_fs.default.accessSync(localDir, import_fs.default.constants.W_OK);
    return localDir;
  } catch {
    return import_path.default.join(import_os.default.tmpdir(), "agrivision-data");
  }
}
var DATA_DIR = resolveDataDir();
var USERS_FILE = import_path.default.join(DATA_DIR, "users.json");
var SESSION_SECRET = process.env.AUTH_SESSION_SECRET || import_crypto.default.randomBytes(32).toString("hex");
var SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1e3;
function ensureDataDir() {
  if (!import_fs.default.existsSync(DATA_DIR)) {
    import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
  }
}
function readUsers() {
  try {
    ensureDataDir();
    if (!import_fs.default.existsSync(USERS_FILE)) {
      return [];
    }
    const raw = import_fs.default.readFileSync(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function writeUsers(users) {
  ensureDataDir();
  import_fs.default.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}
function normalizePhone(input) {
  if (typeof input !== "string") return null;
  let cleaned = input.replace(/[\s\-().]/g, "").trim();
  if (!cleaned) return null;
  if (cleaned.startsWith("0")) {
    cleaned = "+84" + cleaned.slice(1);
  } else if (cleaned.startsWith("84") && !cleaned.startsWith("+")) {
    cleaned = "+" + cleaned;
  } else if (!cleaned.startsWith("+")) {
    return null;
  }
  if (/^\+84\d{9,10}$/.test(cleaned) || /^\+[1-9]\d{8,14}$/.test(cleaned)) {
    return cleaned;
  }
  return null;
}
function normalizeUsername(input) {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().toLowerCase();
  if (!/^[a-z0-9_.-]{3,32}$/.test(trimmed)) return null;
  return trimmed;
}
function hashPassword(password) {
  const salt = import_crypto.default.randomBytes(16).toString("hex");
  const derived = import_crypto.default.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}
function verifyPassword(password, storedHash) {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, expectedHex] = parts;
  const actualBuf = import_crypto.default.scryptSync(password, salt, 64);
  const expectedBuf = Buffer.from(expectedHex, "hex");
  if (actualBuf.length !== expectedBuf.length) return false;
  return import_crypto.default.timingSafeEqual(actualBuf, expectedBuf);
}
function signSessionToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + SESSION_TTL_MS
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = import_crypto.default.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}
function verifySessionToken(token) {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  const expectedSig = import_crypto.default.createHmac("sha256", SESSION_SECRET).update(payloadB64).digest("base64url");
  const sigBuf = Buffer.from(sigB64);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !import_crypto.default.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }
  try {
    const decoded = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    if (!decoded || typeof decoded.exp !== "number" || decoded.exp < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}
function toPublicUser(user) {
  return {
    id: user.id,
    username: user.username,
    phone: user.phone,
    displayName: user.displayName,
    role: user.role,
    createdAt: user.createdAt
  };
}
function createAuthRouter() {
  const router = import_express.default.Router();
  router.post("/register", (req, res) => {
    const phone = normalizePhone(req.body?.phone);
    const username = normalizeUsername(req.body?.username);
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    const displayNameInput = typeof req.body?.displayName === "string" ? req.body.displayName.trim() : "";
    if (!phone) {
      return res.status(400).json({ error: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i ch\u01B0a \u0111\xFAng. B\xE1c nh\u1EADp 10 s\u1ED1 b\u1EAFt \u0111\u1EA7u b\u1EB1ng 0 nh\xE9 (v\xED d\u1EE5: 0912345678)." });
    }
    if (!username) {
      return res.status(400).json({ error: "T\xEAn \u0111\u0103ng nh\u1EADp c\u1EA7n t\u1EEB 3 \u0111\u1EBFn 32 k\xFD t\u1EF1 vi\u1EBFt li\u1EC1n kh\xF4ng d\u1EA5u (ch\u1EEF ho\u1EB7c s\u1ED1)." });
    }
    if (password.length < 6 || password.length > 128) {
      return res.status(400).json({ error: "M\u1EADt kh\u1EA9u c\u1EA7n c\xF3 \xEDt nh\u1EA5t 6 ch\u1EEF ho\u1EB7c s\u1ED1." });
    }
    const users = readUsers();
    if (users.some((u) => u.username === username)) {
      return res.status(409).json({ error: "T\xEAn \u0111\u0103ng nh\u1EADp n\xE0y \u0111\xE3 c\xF3 ng\u01B0\u1EDDi d\xF9ng. B\xE1c ch\u1ECDn t\xEAn kh\xE1c nh\xE9." });
    }
    if (users.some((u) => u.phone === phone)) {
      return res.status(409).json({ error: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i n\xE0y \u0111\xE3 \u0111\u0103ng k\xFD r\u1ED3i. B\xE1c quay l\u1EA1i \u0111\u0103ng nh\u1EADp ho\u1EB7c b\u1EA5m Qu\xEAn m\u1EADt kh\u1EA9u nh\xE9." });
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newUser = {
      id: `local_${import_crypto.default.randomUUID()}`,
      username,
      phone,
      displayName: displayNameInput || username,
      passwordHash: hashPassword(password),
      role: "user",
      createdAt: now,
      updatedAt: now
    };
    users.push(newUser);
    writeUsers(users);
    const token = signSessionToken(newUser);
    return res.status(201).json({
      ok: true,
      token,
      user: toPublicUser(newUser)
    });
  });
  router.post("/login", (req, res) => {
    const rawIdentifier = typeof req.body?.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!rawIdentifier || !password) {
      return res.status(400).json({ error: "B\xE1c vui l\xF2ng nh\u1EADp \u0111\u1EE7 t\xEAn \u0111\u0103ng nh\u1EADp v\xE0 m\u1EADt kh\u1EA9u." });
    }
    const asUsername = normalizeUsername(rawIdentifier);
    const asPhone = normalizePhone(rawIdentifier);
    const users = readUsers();
    const matchedUser = users.find(
      (u) => asUsername && u.username === asUsername || asPhone && u.phone === asPhone
    );
    if (!matchedUser || !verifyPassword(password, matchedUser.passwordHash)) {
      return res.status(401).json({ error: "T\xEAn \u0111\u0103ng nh\u1EADp ho\u1EB7c m\u1EADt kh\u1EA9u ch\u01B0a \u0111\xFAng." });
    }
    const token = signSessionToken(matchedUser);
    return res.json({
      ok: true,
      token,
      user: toPublicUser(matchedUser)
    });
  });
  router.post("/forgot/reset", (req, res) => {
    const username = normalizeUsername(req.body?.username);
    const phone = normalizePhone(req.body?.phone);
    const newPassword = typeof req.body?.newPassword === "string" ? req.body.newPassword : "";
    if (!username || !phone) {
      return res.status(400).json({ error: "B\xE1c nh\u1EADp \u0111\xFAng t\xEAn \u0111\u0103ng nh\u1EADp v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i \u0111\xE3 \u0111\u0103ng k\xFD nh\xE9." });
    }
    if (newPassword.length < 6 || newPassword.length > 128) {
      return res.status(400).json({ error: "M\u1EADt kh\u1EA9u m\u1EDBi c\u1EA7n c\xF3 \xEDt nh\u1EA5t 6 ch\u1EEF ho\u1EB7c s\u1ED1." });
    }
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.username === username && u.phone === phone);
    if (userIndex === -1) {
      return res.status(404).json({ error: "T\xEAn \u0111\u0103ng nh\u1EADp v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\xF4ng kh\u1EDBp v\u1EDBi t\xE0i kho\u1EA3n n\xE0o." });
    }
    const targetUser = users[userIndex];
    targetUser.passwordHash = hashPassword(newPassword);
    targetUser.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    users[userIndex] = targetUser;
    writeUsers(users);
    const token = signSessionToken(targetUser);
    return res.json({
      ok: true,
      token,
      user: toPublicUser(targetUser)
    });
  });
  router.get("/me", (req, res) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    if (!token) {
      return res.status(401).json({ error: "Ch\u01B0a \u0111\u0103ng nh\u1EADp." });
    }
    const decoded = verifySessionToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Phi\xEAn \u0111\u0103ng nh\u1EADp \u0111\xE3 h\u1EBFt h\u1EA1n." });
    }
    const users = readUsers();
    const found = users.find((u) => u.id === decoded.sub);
    if (!found) {
      return res.status(401).json({ error: "Kh\xF4ng t\xECm th\u1EA5y t\xE0i kho\u1EA3n." });
    }
    return res.json({ ok: true, user: toPublicUser(found) });
  });
  router.post("/logout", (_req, res) => {
    return res.json({ ok: true });
  });
  return router;
}

// server/app.ts
import_dotenv.default.config();
var aiClient = null;
function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var REGIONAL_KNOWLEDGE_CONTEXT = DEFAULT_DISEASES.map(
  (d) => `- [${d.id}] (${d.cropType}) ${d.vietnameseName} (${d.englishName}) | B\u1ED9 ph\u1EADn: ${d.affectedPlantParts.join(", ")} | Tri\u1EC7u ch\u1EE9ng: ${d.symptoms} | Nguy\xEAn nh\xE2n: ${d.causes} | X\u1EED l\xFD: ${d.safeManagement}`
).join("\n");
var CANDIDATE_MODELS = ["gemini-4-hydrogen", "gemini-3.1-flash-lite"];
function isPermissionOrBillingError(err) {
  const msg = (err?.message || String(err || "")).toLowerCase();
  const status = String(err?.status || "").toLowerCase();
  const code = err?.code ?? err?.status;
  return code === 403 || status === "permission_denied" || msg.includes("permission_denied") || msg.includes("free tier is not available") || msg.includes("billing");
}
function searchRegionalKnowledge(queryText, cropFilter) {
  const queryLower = (queryText || "").toLowerCase();
  const matches = DEFAULT_DISEASES.filter((d) => {
    return queryLower.includes(d.vietnameseName.toLowerCase()) || queryLower.includes(d.id.toLowerCase()) || queryLower.includes(d.englishName.toLowerCase()) || d.symptoms.toLowerCase().includes(queryLower) || d.affectedPlantParts && d.affectedPlantParts.some((p) => queryLower.includes(p));
  });
  const cropFilteredMatches = cropFilter ? matches.filter((d) => d.cropType === cropFilter) : matches;
  const target = cropFilteredMatches[0] || matches[0];
  if (target) {
    return `[C\u01A1 s\u1EDF d\u1EEF li\u1EC7u B\u1EC7nh h\u1ECDc C\xE2y tr\u1ED3ng B\u1EAFc Trung B\u1ED9 - Vi\u1EC7n BVTV]:
V\u1EC1 **${target.vietnameseName}** (${target.englishName}) tr\xEAn ${target.cropType === "citrus" ? "Cam chanh" : target.cropType === "rice" ? "L\xFAa n\u01B0\u1EDBc" : "L\u1EA1c"}:

\u2022 **B\u1ED9 ph\u1EADn g\xE2y h\u1EA1i**: ${target.affectedPlantParts.join(", ")}
\u2022 **Tri\u1EC7u ch\u1EE9ng nh\u1EADn bi\u1EBFt**: ${target.symptoms}
\u2022 **T\xE1c nh\xE2n g\xE2y b\u1EC7nh**: ${target.causes}
\u2022 **\u0110i\u1EC1u ki\u1EC7n ph\xE1t sinh t\u1EA1i B\u1EAFc Trung B\u1ED9**: ${target.favorableConditions}
\u2022 **Bi\u1EC7n ph\xE1p ph\xF2ng ng\u1EEBa**: ${target.preventionMethods}
\u2022 **Qu\u1EA3n l\xFD an to\xE0n sinh h\u1ECDc (IPM)**: ${target.safeManagement}
\u2022 **T\xE0i li\u1EC7u ki\u1EC3m ch\u1EE9ng**: ${target.references} (${target.standardCode})`;
  }
  const cropName = cropFilter === "citrus" ? "c\xE2y Cam chanh / c\xE2y c\xF3 m\xFAi" : cropFilter === "rice" ? "c\xE2y L\xFAa n\u01B0\u1EDBc" : cropFilter === "peanut" ? "c\xE2y L\u1EA1c (\u0110\u1EADu ph\u1ED9ng)" : "c\xE2y tr\u1ED3ng";
  return `[Khuy\u1EBFn c\xE1o B\u1EC7nh h\u1ECDc N\xF4ng nghi\u1EC7p V\xF9ng B\u1EAFc Trung B\u1ED9 - Vi\u1EC7n BVTV]:
C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 \u0111\u1EB7t c\xE2u h\u1ECFi. \u0110\u1ED1i v\u1EDBi ${cropName} trong \u0111i\u1EC1u ki\u1EC7n vi kh\xED h\u1EADu B\u1EAFc Trung B\u1ED9 (Ngh\u1EC7 An, H\xE0 T\u0129nh, Qu\u1EA3ng B\xECnh):
1. **\u0110\u1EB7c th\xF9 th\u1EDDi ti\u1EBFt**: V\xF9ng ch\u1ECBu \u1EA3nh h\u01B0\u1EDFng l\u1EDBn c\u1EE7a gi\xF3 T\xE2y Nam kh\xF4 n\xF3ng (gi\xF3 L\xE0o) m\xF9a h\xE8 v\xE0 s\u01B0\u01A1ng mu\u1ED1i, m\u01B0a ph\xF9n k\xE9o d\xE0i m\xF9a \u0111\xF4ng xu\xE2n, \u0111\u1ED9 \u1EA9m >85% t\u1EA1o \u0111i\u1EC1u ki\u1EC7n thu\u1EADn l\u1EE3i cho n\u1EA5m khu\u1EA9n l\xE2y lan.
2. **Nguy\xEAn t\u1EAFc qu\u1EA3n l\xFD d\u1ECBch h\u1EA1i t\u1ED5ng h\u1EE3p (IPM)**:
   - Th\u01B0\u1EDDng xuy\xEAn th\u0103m \u0111\u1ED3ng/v\u01B0\u1EDDn \u0111\u1EC3 ph\xE1t hi\u1EC7n v\u1EBFt b\u1EC7nh s\u1EDBm khi t\u1EF7 l\u1EC7 nhi\u1EC5m d\u01B0\u1EDBi 5%.
   - V\u1EC7 sinh \u0111\u1ED3ng ru\u1ED9ng, thu gom ti\xEAu h\u1EE7y tri\u1EC7t \u0111\u1EC3 t\xE0n d\u01B0 c\xE2y b\u1EC7nh sau thu ho\u1EA1ch.
   - B\xF3n ph\xE2n c\xE2n \u0111\u1ED1i N-P-K, h\u1EA1n ch\u1EBF b\xF3n th\u1EEBa \u0111\u1EA1m khi th\u1EDDi ti\u1EBFt \xE2m u s\u01B0\u01A1ng m\xF9.
   - \u01AFu ti\xEAn s\u1EED d\u1EE5ng c\xE1c ch\u1EBF ph\u1EA9m sinh h\u1ECDc \u0111\u1ED1i kh\xE1ng (Trichoderma, Bacillus, Booc-\u0111\xF4...).
3. B\u1EA1n c\xF3 th\u1EC3 tra c\u1EE9u chi ti\u1EBFt t\u1EEBng lo\u1EA1i b\u1EC7nh trong m\u1EE5c **"S\u1ED5 b\u1EC7nh"** ho\u1EB7c g\u1EEDi \u1EA3nh ch\u1EE5p m\u1EABu l\xE1/th\xE2n \u0111\u1EC3 \u0111\u1ED1i chi\u1EBFu tr\u1EF1c ti\u1EBFp.`;
}
function isDisallowedHostname(hostname) {
  const host = hostname.trim().toLowerCase().replace(/^\[|\]$/g, "");
  if (!host) return true;
  if (host === "localhost" || host === "0.0.0.0" || host === "::1" || host.endsWith(".local") || host.endsWith(".internal")) {
    return true;
  }
  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, a, b] = ipv4Match.map(Number);
    if (a === 10 || a === 127 || a === 0 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168) {
      return true;
    }
  }
  if (host.startsWith("fe80:") || host.startsWith("fc") || host.startsWith("fd")) {
    return true;
  }
  return false;
}
async function resolveImageBase64(input, fallbackMime = "image/jpeg", reqOrigin) {
  const rootDir = process.cwd();
  if (input.startsWith("/images/")) {
    const rel = input.replace(/^\/images\//, "");
    const publicImagesDir = import_path2.default.resolve(rootDir, "public", "images");
    const resolvedPublic = import_path2.default.resolve(publicImagesDir, rel);
    if (resolvedPublic.startsWith(publicImagesDir + import_path2.default.sep) && import_fs2.default.existsSync(resolvedPublic)) {
      const base642 = import_fs2.default.readFileSync(resolvedPublic).toString("base64");
      return { base64: base642, mimeType: fallbackMime };
    }
    const distImagesDir = import_path2.default.resolve(rootDir, "dist", "images");
    const resolvedDist = import_path2.default.resolve(distImagesDir, rel);
    if (resolvedDist.startsWith(distImagesDir + import_path2.default.sep) && import_fs2.default.existsSync(resolvedDist)) {
      const base642 = import_fs2.default.readFileSync(resolvedDist).toString("base64");
      return { base64: base642, mimeType: fallbackMime };
    }
    if (reqOrigin && /^\/images\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp)$/i.test(input)) {
      const cdnRes = await fetch(`${reqOrigin}${input}`, { signal: AbortSignal.timeout(8e3) });
      if (cdnRes.ok) {
        const contentType = cdnRes.headers.get("content-type") || fallbackMime;
        const arrayBuffer = await cdnRes.arrayBuffer();
        return { base64: Buffer.from(arrayBuffer).toString("base64"), mimeType: contentType };
      }
    }
  }
  if (input.startsWith("/src/")) {
    const srcDir = import_path2.default.resolve(rootDir, "src");
    const resolvedSrc = import_path2.default.resolve(srcDir, input.replace(/^\/src\//, ""));
    if (resolvedSrc.startsWith(srcDir + import_path2.default.sep) && import_fs2.default.existsSync(resolvedSrc)) {
      const base642 = import_fs2.default.readFileSync(resolvedSrc).toString("base64");
      return { base64: base642, mimeType: fallbackMime };
    }
  }
  if (input.startsWith("http://") || input.startsWith("https://")) {
    const parsedUrl = new URL(input);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new Error("Giao th\u1EE9c URL h\xECnh \u1EA3nh kh\xF4ng h\u1EE3p l\u1EC7.");
    }
    if (isDisallowedHostname(parsedUrl.hostname)) {
      throw new Error("Kh\xF4ng cho ph\xE9p t\u1EA3i \u1EA3nh t\u1EEB \u0111\u1ECBa ch\u1EC9 m\u1EA1ng n\u1ED9i b\u1ED9.");
    }
    const res = await fetch(parsedUrl.toString(), { signal: AbortSignal.timeout(1e4) });
    if (!res.ok) {
      throw new Error(`Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c \u1EA3nh tham chi\u1EBFu (HTTP ${res.status}).`);
    }
    const contentType = res.headers.get("content-type") || fallbackMime;
    const arrayBuffer = await res.arrayBuffer();
    const base642 = Buffer.from(arrayBuffer).toString("base64");
    return { base64: base642, mimeType: contentType };
  }
  const match = input.match(/^data:([a-zA-Z0-9/+-]+);base64,/);
  const mimeType = match ? match[1] : fallbackMime;
  const base64 = input.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, "");
  return { base64, mimeType };
}
function getRequestOrigin(req) {
  const host = req.get("x-forwarded-host") || req.get("host");
  if (!host) return void 0;
  const protoHeader = (req.get("x-forwarded-proto") || req.protocol || "https").split(",")[0].trim();
  const proto = protoHeader === "http" ? "http" : "https";
  return `${proto}://${host}`;
}
function buildCropDiagnosisContext(cropType) {
  const filtered = DEFAULT_DISEASES.filter((d) => d.cropType === cropType);
  const list = filtered.length > 0 ? filtered : DEFAULT_DISEASES;
  return list.map(
    (d) => `- [${d.id}] ${d.vietnameseName} (${d.englishName}) | B\u1ED9 ph\u1EADn: ${d.affectedPlantParts.join(", ")} | Tri\u1EC7u ch\u1EE9ng: ${d.symptoms}`
  ).join("\n");
}
function createApiApp() {
  const app = (0, import_express2.default)();
  app.set("trust proxy", 1);
  app.use((req, _res, next) => {
    try {
      const preParsed = req.body;
      if (preParsed !== void 0 && preParsed !== null && typeof preParsed === "object") {
        req._body = true;
      }
    } catch {
    }
    next();
  });
  app.use(import_express2.default.json({ limit: "30mb" }));
  app.use(import_express2.default.urlencoded({ extended: true, limit: "30mb" }));
  app.use("/api/auth", createAuthRouter());
  app.post("/api/diagnose", async (req, res) => {
    try {
      const {
        imageBase64,
        mimeType = "image/jpeg",
        cropType = "citrus",
        plantPart = "leaf",
        extraImages = [],
        quizAnswers
      } = req.body || {};
      if (!imageBase64 || typeof imageBase64 !== "string") {
        return res.status(400).json({ error: "H\xECnh \u1EA3nh l\xE0 b\u1EAFt bu\u1ED9c \u0111\u1EC3 ti\u1EBFn h\xE0nh ph\xE2n t\xEDch." });
      }
      const origin = getRequestOrigin(req);
      const mainImage = await resolveImageBase64(imageBase64, mimeType, origin);
      const resolvedExtras = [];
      if (Array.isArray(extraImages)) {
        for (const extra of extraImages.slice(0, 2)) {
          if (extra && typeof extra.imageBase64 === "string" && extra.imageBase64.trim()) {
            const resolved = await resolveImageBase64(
              extra.imageBase64,
              extra.mimeType || "image/jpeg",
              origin
            );
            resolvedExtras.push({
              base64: resolved.base64,
              mimeType: resolved.mimeType,
              angleLabel: typeof extra.angleLabel === "string" ? extra.angleLabel : "G\xF3c ch\u1EE5p b\u1ED5 sung"
            });
          }
        }
      }
      const cropNameVi = cropType === "citrus" ? "Cam chanh / C\xE2y c\xF3 m\xFAi" : cropType === "rice" ? "L\xFAa n\u01B0\u1EDBc" : "L\u1EA1c (\u0110\u1EADu ph\u1ED9ng)";
      const partNameVi = plantPart === "leaf" ? "L\xE1" : plantPart === "stem" ? "Th\xE2n/C\xE0nh" : plantPart === "fruit" ? "Qu\u1EA3/C\u1EE7" : "Kh\xE1c";
      const cropKnowledgeContext = buildCropDiagnosisContext(cropType);
      const systemInstruction = `
B\u1EA1n l\xE0 chuy\xEAn gia ch\u1EA9n \u0111o\xE1n b\u1EC7nh h\u1ECDc th\u1EF1c v\u1EADt cao c\u1EA5p thu\u1ED9c Vi\u1EC7n Khoa h\u1ECDc N\xF4ng nghi\u1EC7p B\u1EAFc Trung B\u1ED9 v\xE0 Vi\u1EC7n B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt Vi\u1EC7t Nam.
Nhi\u1EC7m v\u1EE5 c\u1EE7a b\u1EA1n l\xE0 ki\u1EC3m tra, s\xE0ng l\u1ECDc v\xE0 \u0111\xE1nh gi\xE1 h\xECnh \u1EA3nh m\u1EABu th\u1EF1c v\u1EADt do n\xF4ng d\xE2n ho\u1EB7c nghi\xEAn c\u1EE9u vi\xEAn cung c\u1EA5p v\u1EDBi tinh th\u1EA7n khoa h\u1ECDc nghi\xEAm t\xFAc, c\u1EA9n tr\u1ECDng, kh\xE1ch quan v\xE0 c\xF3 tr\xE1ch nhi\u1EC7m.

C\xC1C NGUY\xCAN T\u1EAEC KHOA H\u1ECCC T\u1ED0I TH\u01AF\u1EE2NG (B\u1EAET BU\u1ED8C):
1. PH\xC2N BI\u1EC6T R\xD5 R\xC0NG GI\u1EEEA C\xC2Y KH\u1ECEE M\u1EA0NH V\xC0 C\xC2Y B\u1ECA B\u1EC6NH (T\u1ED0I QUAN TR\u1ECCNG):
   - N\u1EBEU \u1EA2NH L\xC0 L\xC1/C\xC2Y KH\u1ECEE M\u1EA0NH (phi\u1EBFn l\xE1 xanh t\u01B0\u01A1i, m\xE0u s\u1EAFc \u0111\u1ED3ng \u0111\u1EC1u, kh\xF4ng c\xF3 v\u1EBFt \u0111\u1ED1m n\xE2u, kh\xF4ng ch\xE1y b\xECa, kh\xF4ng c\xF3 qu\u1EA7ng v\xE0ng loang l\u1ED5, g\xE2n l\xE1 b\xECnh th\u01B0\u1EDDng, kh\xF4ng xo\u0103n m\xE9p):
     -> B\u1EAET BU\u1ED8C ch\u1EA9n \u0111o\xE1n l\xE0 C\xC2Y KH\u1ECEE M\u1EA0NH:
        + possibleDiagnoses: [{ "diseaseId": "healthy", "diseaseName": "C\xE2y kh\u1ECFe m\u1EA1nh (Kh\xF4ng ph\xE1t hi\u1EC7n d\u1EA5u hi\u1EC7u b\u1EC7nh h\u1EA1i)", "evidence": ["Phi\u1EBFn l\xE1 xanh t\u1ED1t, m\xE0u s\u1EAFc l\u1EE5c di\u1EC7p b\xECnh th\u01B0\u1EDDng", "Kh\xF4ng c\xF3 v\u1EBFt \u0111\u1ED1m ho\u1EA1i t\u1EED, kh\xF4ng b\u1ECB bi\u1EBFn d\u1EA1ng m\xF4 hay g\xE2n l\xE1"], "confidenceLevel": "high" }]
        + severityAssessment: "mild"
        + alternativeCauses: []
        + recommendations: ["Duy tr\xEC ch\u1EBF \u0111\u1ED9 t\u01B0\u1EDBi ti\xEAu v\xE0 ph\xE2n b\xF3n c\xE2n \u0111\u1ED1i N-P-K", "Ti\u1EBFp t\u1EE5c th\u0103m v\u01B0\u1EDDn \u0111\u1ECBnh k\u1EF3 \u0111\u1EC3 b\u1EA3o v\u1EC7 c\xE1c \u0111\u1EE3t l\u1ED9c non"]
     -> TUY\u1EC6T \u0110\u1ED0I KH\xD4NG g\xE1n b\u1EC7nh (nh\u01B0 v\xE0ng l\xE1 g\xE2n xanh, lo\xE9t, \u0111\u1EA1o \xF4n...) cho m\u1ED9t chi\u1EBFc l\xE1 ho\u1EB7c c\xE0nh kh\u1ECFe m\u1EA1nh!
2. \u0110\xC1NH GI\xC1 CH\u1EA4T L\u01AF\u1EE2NG \u1EA2NH & X\u1EEC L\xDD \u1EA2NH M\u1EDC (BLURRY IMAGES):
   - Ki\u1EC3m tra xem \u1EA3nh c\xF3 b\u1ECB m\u1EDD (blurry), out n\xE9t, rung tay, thi\u1EBFu s\xE1ng, ch\xE1y s\xE1ng, ch\u1EE5p qu\xE1 xa hay kh\xF4ng.
   - N\u1EBEU \u1EA2NH B\u1ECA M\u1EDC / OUT N\xC9T / RUNG TAY (BLURRY):
     + B\u1EAET BU\u1ED8C \u0111\u1EB7t imageQuality: "poor".
     + qualityIssues: ["\u1EA2nh ch\u1EE5p b\u1ECB m\u1EDD n\xE9t ho\u1EB7c rung tay (out-of-focus). C\xE1c t\u1EBF b\xE0o m\xF4 l\xE1 v\xE0 vi\u1EC1n t\u1ED5n th\u01B0\u01A1ng b\u1ECB nh\xF2e, kh\xF4ng th\u1EC3 quan s\xE1t chi ti\u1EBFt vi th\u1EC3."]
     + possibleDiagnoses: [{
         "diseaseId": "unclear_due_to_blur",
         "diseaseName": "Ch\u01B0a \u0111\u1EE7 b\u1EB1ng ch\u1EE9ng ch\u1EA9n \u0111o\xE1n do \u1EA3nh b\u1ECB m\u1EDD n\xE9t",
         "evidence": ["\u0110\u1ED9 s\u1EAFc n\xE9t c\u1EE7a \u1EA3nh kh\xF4ng \u0111\u1EA1t y\xEAu c\u1EA7u \u0111\u1EC3 ph\xE2n bi\u1EC7t v\u1EBFt \u0111\u1ED1m n\u1EA5m, v\u1EBFt lo\xE9t vi khu\u1EA9n hay r\u1EC7p h\u1EA1i", "C\u1EA7n m\u1EABu \u1EA3nh r\xF5 n\xE9t \u0111\u1EC3 \u0111\u1ED1i ch\u1EE9ng"],
         "confidenceLevel": "insufficient_evidence"
       }]
     + needsMoreImages: true
     + additionalImageInstructions: [
         "Gi\u1EEF ch\u1EAFc tay c\u1EA7m m\xE1y \u1EDF kho\u1EA3ng c\xE1ch 15-25cm t\u1EEB m\u1EB7t l\xE1",
         "Ch\u1EA1m ng\xF3n tay v\xE0o m\xE0n h\xECnh \u0111\xFAng v\u1ECB tr\xED v\u1EBFt b\u1EC7nh \u0111\u1EC3 camera l\u1EA5y n\xE9t t\u1EF1 \u0111\u1ED9ng tr\u01B0\u1EDBc khi b\u1EA5m ch\u1EE5p",
         "Ch\u1EE5p d\u01B0\u1EDBi \xE1nh s\xE1ng ban ng\xE0y t\u1EF1 nhi\xEAn, tr\xE1nh b\xF3ng r\xE2m che khu\u1EA5t"
       ]
     + recommendations: [
         "Vui l\xF2ng ch\u1EE5p l\u1EA1i \u1EA3nh r\xF5 n\xE9t h\u01A1n \u0111\u1EC3 AI v\xE0 chuy\xEAn gia c\xF3 th\u1EC3 ch\u1EA9n \u0111o\xE1n ch\xEDnh x\xE1c.",
         "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng v\u1ED9i phun thu\u1ED1c b\u1EA3o v\u1EC7 th\u1EF1c v\u1EADt khi ch\u01B0a x\xE1c \u0111\u1ECBnh r\xF5 nguy\xEAn nh\xE2n b\u1EC7nh."
       ]
   - N\u1EBFu \u1EA3nh ch\u1EC9 h\u01A1i m\u1EDD nh\u1EB9 nh\u01B0ng v\u1EABn nh\u1EADn di\u1EC7n \u0111\u01B0\u1EE3c v\u1EBFt b\u1EC7nh, \u0111\u1EB7t imageQuality l\xE0 "fair" v\xE0 n\xEAu r\xF5 trong qualityIssues.
3. X\xC1C TH\u1EF0C C\xC2Y TR\u1ED2NG V\xC0 PH\xC1T HI\u1EC6N L\u1EC6CH LO\xC0I:
   - X\xE1c \u0111\u1ECBnh xem \u1EA3nh c\xF3 ch\u1EE9a th\u1EF1c v\u1EADt hay kh\xF4ng (isPlantImage). N\u1EBFu \u1EA3nh kh\xF4ng ph\u1EA3i th\u1EF1c v\u1EADt (v\xED d\u1EE5: \u0111\u1ED3 v\u1EADt, ng\u01B0\u1EDDi, \u0111\u1ED9ng v\u1EADt, phong c\u1EA3nh kh\xF4ng r\xF5 c\xE2y), \u0111\u1EB7t isPlantImage = false, selectedCropMatches = false, possibleDiagnoses = [].
   - Ki\u1EC3m tra xem lo\xE0i c\xE2y trong \u1EA3nh c\xF3 kh\u1EDBp v\u1EDBi c\xE2y ng\u01B0\u1EDDi d\xF9ng ch\u1ECDn (${cropNameVi}) hay kh\xF4ng:
     1. CAM CHANH / C\xC2Y C\xD3 M\xDAI: C\xE2y th\xE2n g\u1ED7, l\xE1 \u0111\u01A1n h\xECnh b\u1EA7u d\u1EE5c d\xE0y b\xF3ng, cu\u1ED1ng l\xE1 c\xF3 c\xE1nh d\u1EB9p, g\xE2n l\xE1 ph\xE2n nh\xE1nh m\u1EA1ng l\u01B0\u1EDBi; qu\u1EA3 c\xF3 m\xFAi v\u1ECF c\xF3 t\xFAi tinh d\u1EA7u.
     2. L\xDAA N\u01AF\u1EDAC: C\xE2y m\u1ED9t l\xE1 m\u1EA7m h\u1ECD H\xF2a th\u1EA3o, l\xE1 d\u1EA1ng d\u1EA3i d\xE0i h\u1EB9p (linear blade), g\xE2n l\xE1 ch\u1EA1y song song, b\xF4ng/gi\xE9 l\xFAa.
     3. L\u1EA0C / \u0110\u1EACU PH\u1ED8NG: C\xE2y th\xE2n th\u1EA3o b\xF2 lan ho\u1EB7c m\u1ECDc b\u1EE5i th\u1EA5p, l\xE1 k\xE9p l\xF4ng chim ch\u1EB5n g\u1ED3m 4 l\xE1 ch\xE9t tr\xF2n \u0111\u1EA7u m\u1ECDc \u0111\u1ED1i x\u1EE9ng.
   - CH\u1EC8 \u0111\u1EB7t selectedCropMatches = false v\xE0 possibleDiagnoses = [] khi \u1EA3nh R\xD5 R\xC0NG thu\u1ED9c lo\xE0i c\xE2y kh\xE1c (v\xED d\u1EE5: ch\u1ECDn L\xFAa nh\u01B0ng \u1EA3nh l\xE0 l\xE1 L\u1EA1c ho\u1EB7c l\xE1 Cam). V\u1EDBi \u1EA3nh ch\u1EE5p c\u1EADn c\u1EA3nh v\u1EBFt b\u1EC7nh tr\xEAn v\u1ECF qu\u1EA3, th\xE2n ho\u1EB7c m\u1ED9t g\xF3c l\xE1 kh\xF4ng th\u1EA5y r\xF5 h\xECnh th\xE1i to\xE0n l\xE1, h\xE3y tin t\u01B0\u1EDFng lo\xE0i c\xE2y ng\u01B0\u1EDDi d\xF9ng \u0111\xE3 ch\u1ECDn v\xE0 ch\u1EA9n \u0111o\xE1n d\u1EF1a tr\xEAn tri\u1EC7u ch\u1EE9ng quan s\xE1t \u0111\u01B0\u1EE3c.
4. CH\u1EA8N \u0110O\xC1N \u0110\xDANG B\u1EC6NH TH\u1EF0C T\u1EBE TR\xCAN \u1EA2NH (KH\xD4NG \xC9P V\xC0O DANH S\xC1CH M\u1EAAU):
   - Quan s\xE1t k\u1EF9 h\xECnh d\u1EA1ng v\u1EBFt b\u1EC7nh, m\xE0u s\u1EAFc, vi\u1EC1n qu\u1EA7ng, l\u1EDBp ph\u1EA5n/b\xE0o t\u1EED n\u1EA5m, \u0111\u01B0\u1EDDng h\u1EA7m s\xE2u \u0111\u1EE5c, bi\u1EBFn d\u1EA1ng m\xF4 hay d\u1EA5u hi\u1EC7u thi\u1EBFu dinh d\u01B0\u1EE1ng tr\xEAn \u1EA3nh.
   - N\u1EBFu tri\u1EC7u ch\u1EE9ng kh\u1EDBp v\u1EDBi m\u1ED9t trong c\xE1c b\u1EC7nh/d\u1ECBch h\u1EA1i c\u1EE7a ${cropNameVi} trong c\u01A1 s\u1EDF d\u1EEF li\u1EC7u b\xEAn d\u01B0\u1EDBi, h\xE3y d\xF9ng \u0111\xFAng m\xE3 diseaseId v\xE0 t\xEAn b\u1EC7nh t\u01B0\u01A1ng \u1EE9ng.
   - N\u1EBEU tri\u1EC7u ch\u1EE9ng tr\xEAn \u1EA3nh l\xE0 m\u1ED9t b\u1EC7nh h\u1EA1i, s\xE2u h\u1EA1i ho\u1EB7c r\u1ED1i lo\u1EA1n dinh d\u01B0\u1EE1ng KH\xC1C ngo\xE0i danh s\xE1ch tham kh\u1EA3o (v\xED d\u1EE5: thi\u1EBFu \u0111\u1EA1m/kali/k\u1EBDm/magie, ch\xE1y n\u1EAFng, ng\u1ED9 \u0111\u1ED9c ph\xE8n...), TUY\u1EC6T \u0110\u1ED0I KH\xD4NG g\xE1n \xE9p sai b\u1EC7nh. H\xE3y ch\u1EA9n \u0111o\xE1n \u0111\xFAng t\xEAn b\u1EC7nh/s\xE2u h\u1EA1i/thi\u1EBFu ch\u1EA5t th\u1EF1c t\u1EBF \u0111\xF3 b\u1EB1ng ti\u1EBFng Vi\u1EC7t ch\xEDnh x\xE1c k\xE8m m\xE3 diseaseId m\xF4 t\u1EA3 ph\xF9 h\u1EE3p (v\xED d\u1EE5: nutrient_deficiency_zinc, sunscald).
5. KH\xD4NG T\u1EF0 B\u1ECAA \u0110\u1EB6T PH\u1EA6N TR\u0102M X\xC1C SU\u1EA4T:
   - Tuy\u1EC7t \u0111\u1ED1i KH\xD4NG g\xE1n con s\u1ED1 ph\u1EA7n tr\u0103m (nh\u01B0 95%, 80%).
   - M\u1EE9c \u0111\u1ED9 tin c\u1EADy (confidenceLevel) CH\u1EC8 \u0110\u01AF\u1EE2C CH\u1ECCN TRONG 4 M\u1EE8C: "high" (Cao), "medium" (Trung b\xECnh), "low" (Th\u1EA5p), "insufficient_evidence" (Ch\u01B0a \u0111\u1EE7 b\u1EB1ng ch\u1EE9ng).
6. KH\xD4NG KHI\xCAN C\u01AF\u1EE0NG CH\u1EA8N \u0110O\xC1N (TRANSPARENT UNCERTAINTY):
   - N\u1EBFu tri\u1EC7u ch\u1EE9ng ch\u01B0a r\xF5 r\xE0ng ho\u1EB7c t\u01B0\u01A1ng \u0111\u1ED3ng gi\u1EEFa 2 nguy\xEAn nh\xE2n (v\xED d\u1EE5 \u0111\u1ED1m n\xE2u vs \u0111\u1EA1o \xF4n non, ho\u1EB7c v\xE0ng l\xE1 HLB vs thi\u1EBFu vi l\u01B0\u1EE3ng k\u1EBDm), ph\u1EA3i n\xEAu r\xF5 trong alternativeCauses v\xE0 needsMoreImages = true k\xE8m h\u01B0\u1EDBng d\u1EABn ch\u1EE5p b\u1ED5 sung (additionalImageInstructions).
   - Kh\xF4ng \u0111\u01B0\u1EE3c kh\u1EB3ng \u0111\u1ECBnh c\xE1c tri\u1EC7u ch\u1EE9ng kh\xF4ng nh\xECn th\u1EA5y tr\xEAn \u1EA3nh.
7. C\u01A0 S\u1EDE D\u1EEE LI\u1EC6U THAM KH\u1EA2O (${cropNameVi}):
   ${cropKnowledgeContext}
8. H\u01AF\u1EDANG D\u1EAAN X\u1EEC L\xDD R\xD5 R\xC0NG, D\u1EC4 L\xC0M CHO N\xD4NG D\xC2N (QUAN TR\u1ECCNG):
   - Tr\xECnh b\xE0y ph\u1EA7n actionPlan th\u1EADt c\u1EE5 th\u1EC3, c\xE2u ng\u1EAFn g\u1ECDn, d\u1EC5 hi\u1EC3u v\u1EDBi b\xE0 con n\xF4ng d\xE2n:
     + immediateSteps (2-3 b\u01B0\u1EDBc): Vi\u1EC7c c\u1EA7n l\xE0m NGAY H\xD4M NAY (v\xED d\u1EE5: ng\u1EAFt b\u1ECF l\xE1 b\u1EC7nh cho v\xE0o t\xFAi k\xEDn, th\xE1o/gi\u1EEF m\u1EF1c n\u01B0\u1EDBc ru\u1ED9ng m\u1EA5y cm, ng\u1EEBng b\xF3n \u0111\u1EA1m ngay...).
     + safeCareAndPrevention (2-3 b\u01B0\u1EDBc): Ch\u0103m s\xF3c ph\u1EE5c h\u1ED3i, \u0111i\u1EC1u ch\u1EC9nh ph\xE2n b\xF3n, bi\u1EC7n ph\xE1p sinh h\u1ECDc/IPM an to\xE0n (Trichoderma, Bacillus, Booc-\u0111\xF4, b\u1EABy d\xEDnh...).
     + importantWarnings (1-2 \xFD): \u0110i\u1EC1u tuy\u1EC7t \u0111\u1ED1i tr\xE1nh (kh\xF4ng phun tr\u1ED9n thu\u1ED1c khi ch\u01B0a r\xF5 b\u1EC7nh, kh\xF4ng b\xF3n th\u1EEBa \u0111\u1EA1m l\xFAc s\u01B0\u01A1ng m\xF9...) v\xE0 khi n\xE0o c\u1EA7n mang m\u1EABu t\u1EDBi Tr\u1EA1m B\u1EA3o v\u1EC7 Th\u1EF1c v\u1EADt g\u1EA7n nh\u1EA5t.
   - \u0110\u1ED3ng th\u1EDDi li\u1EC7t k\xEA t\xF3m t\u1EAFt c\xE1c b\u01B0\u1EDBc ch\xEDnh v\xE0o tr\u01B0\u1EDDng recommendations \u0111\u1EC3 t\u01B0\u01A1ng th\xEDch l\u1ECBch s\u1EED kh\xE1m.
   - Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng t\u1EF1 b\u1ECBa \u0111\u1EB7t t\xEAn h\xF3a ch\u1EA5t \u0111\u1ED9c h\u1EA1i hay n\u1ED3ng \u0111\u1ED9 pha ch\u1EBF t\xF9y ti\u1EC7n.
      `.trim();
      const quizLines = [];
      if (quizAnswers && typeof quizAnswers === "object") {
        if (quizAnswers.spreadLevel) quizLines.push(`- M\u1EE9c \u0111\u1ED9 l\xE2y lan ngo\xE0i v\u01B0\u1EDDn/ru\u1ED9ng: ${quizAnswers.spreadLevel}`);
        if (quizAnswers.recentWeather) quizLines.push(`- Th\u1EDDi ti\u1EBFt g\u1EA7n \u0111\xE2y: ${quizAnswers.recentWeather}`);
        if (quizAnswers.extraSymptom)
          quizLines.push(`- D\u1EA5u hi\u1EC7u n\xF4ng d\xE2n quan s\xE1t th\xEAm tr\u1EF1c ti\u1EBFp: ${quizAnswers.extraSymptom}`);
        if (quizAnswers.fertilizerOrWater)
          quizLines.push(`- T\xECnh tr\u1EA1ng ph\xE2n b\xF3n / n\u01B0\u1EDBc t\u01B0\u1EDBi: ${quizAnswers.fertilizerOrWater}`);
      }
      const angleSummary = resolvedExtras.length > 0 ? `Ng\u01B0\u1EDDi d\xF9ng cung c\u1EA5p t\u1ED5ng c\u1ED9ng ${1 + resolvedExtras.length} \u1EA3nh (\u1EA2nh 1: \u1EA2nh ch\xEDnh; ${resolvedExtras.map((e, i) => `\u1EA2nh ${i + 2}: ${e.angleLabel}`).join("; ")}). H\xE3y \u0111\u1ED1i chi\u1EBFu ch\xE9o tri\u1EC7u ch\u1EE9ng tr\xEAn t\u1EA5t c\u1EA3 c\xE1c \u1EA3nh \u0111\u1EC3 t\u0103ng \u0111\u1ED9 ch\xEDnh x\xE1c.` : "Ng\u01B0\u1EDDi d\xF9ng cung c\u1EA5p 1 \u1EA3nh.";
      const userPrompt = `
H\xE3y ph\xE2n t\xEDch t\u1ED5ng h\u1EE3p h\xECnh \u1EA3nh v\xE0 th\xF4ng tin th\u1EF1c \u0111\u1ECBa sau:
- C\xE2y tr\u1ED3ng ng\u01B0\u1EDDi d\xF9ng \u0111\xE3 ch\u1ECDn: ${cropNameVi} (M\xE3: ${cropType})
- B\u1ED9 ph\u1EADn quan s\xE1t ch\xEDnh: ${partNameVi}
- S\u1ED1 l\u01B0\u1EE3ng g\xF3c \u1EA3nh: ${angleSummary}
- Khu v\u1EF1c \u0111\u1ECBa l\xFD tr\u1ECDng t\xE2m: V\xF9ng B\u1EAFc Trung B\u1ED9 Vi\u1EC7t Nam (Ngh\u1EC7 An, H\xE0 T\u0129nh, Qu\u1EA3ng B\xECnh, Qu\u1EA3ng Tr\u1ECB, Th\u1EEBa Thi\xEAn Hu\u1EBF).
${quizLines.length > 0 ? `- Th\xF4ng tin tr\u1EAFc nghi\u1EC7m th\u1EF1c \u0111\u1ECBa do n\xF4ng d\xE2n cung c\u1EA5p:
${quizLines.join("\n")}` : "- Ch\u01B0a c\xF3 th\xEAm th\xF4ng tin tr\u1EAFc nghi\u1EC7m th\u1EF1c \u0111\u1ECBa."}

Vui l\xF2ng k\u1EBFt h\u1EE3p ch\u1EB7t ch\u1EBD h\xECnh \u1EA3nh \u1EDF m\u1ECDi g\xF3c ch\u1EE5p v\xE0 c\xE2u tr\u1EA3 l\u1EDDi th\u1EF1c \u0111\u1ECBa \u0111\u1EC3 ch\u1EA9n \u0111o\xE1n ch\xEDnh x\xE1c nh\u1EA5t, v\xE0 xu\u1EA5t k\u1EBFt qu\u1EA3 theo \u0111\u1ECBnh d\u1EA1ng JSON chu\u1EA9n.
      `.trim();
      let parsedResult = null;
      let lastError = null;
      let permissionOrBillingFailure = false;
      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "H\u1EC7 th\u1ED1ng ph\xE2n t\xEDch \u1EA3nh AI ch\u01B0a s\u1EB5n s\xE0ng do ch\u01B0a \u0111\u01B0\u1EE3c c\u1EA5p c\u1EA5u h\xECnh GEMINI_API_KEY tr\xEAn m\xE1y ch\u1EE7. Vui l\xF2ng th\u1EED l\u1EA1i sau ho\u1EB7c tra c\u1EE9u tr\u1EF1c ti\u1EBFp trong m\u1EE5c S\u1ED5 b\u1EC7nh."
        });
      }
      const imageParts = [
        {
          inlineData: {
            mimeType: mainImage.mimeType,
            data: mainImage.base64
          }
        },
        ...resolvedExtras.map((extra) => ({
          inlineData: {
            mimeType: extra.mimeType,
            data: extra.base64
          }
        }))
      ];
      for (const model of CANDIDATE_MODELS) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: [
                ...imageParts,
                {
                  text: userPrompt
                }
              ],
              config: {
                systemInstruction,
                thinkingConfig: {
                  thinkingLevel: model === "gemini-3.1-flash-lite" ? import_genai.ThinkingLevel.MINIMAL : import_genai.ThinkingLevel.LOW
                },
                responseMimeType: "application/json",
                responseSchema: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    isPlantImage: { type: import_genai.Type.BOOLEAN },
                    cropDetected: { type: import_genai.Type.STRING },
                    selectedCropMatches: { type: import_genai.Type.BOOLEAN },
                    imageQuality: { type: import_genai.Type.STRING },
                    qualityIssues: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                    symptoms: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                    possibleDiagnoses: {
                      type: import_genai.Type.ARRAY,
                      items: {
                        type: import_genai.Type.OBJECT,
                        properties: {
                          diseaseId: { type: import_genai.Type.STRING },
                          diseaseName: { type: import_genai.Type.STRING },
                          evidence: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                          confidenceLevel: { type: import_genai.Type.STRING }
                        },
                        required: ["diseaseId", "diseaseName", "evidence", "confidenceLevel"]
                      }
                    },
                    alternativeCauses: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                    severityAssessment: { type: import_genai.Type.STRING },
                    needsMoreImages: { type: import_genai.Type.BOOLEAN },
                    additionalImageInstructions: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                    recommendations: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                    actionPlan: {
                      type: import_genai.Type.OBJECT,
                      properties: {
                        immediateSteps: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                        safeCareAndPrevention: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
                        importantWarnings: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
                      },
                      required: ["immediateSteps", "safeCareAndPrevention", "importantWarnings"]
                    },
                    expertVerificationRecommended: { type: import_genai.Type.BOOLEAN },
                    disclaimer: { type: import_genai.Type.STRING }
                  },
                  required: [
                    "isPlantImage",
                    "cropDetected",
                    "selectedCropMatches",
                    "imageQuality",
                    "qualityIssues",
                    "symptoms",
                    "possibleDiagnoses",
                    "alternativeCauses",
                    "severityAssessment",
                    "needsMoreImages",
                    "additionalImageInstructions",
                    "recommendations",
                    "actionPlan",
                    "expertVerificationRecommended",
                    "disclaimer"
                  ]
                }
              }
            });
            if (response.text) {
              const cleanJson = response.text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
              parsedResult = JSON.parse(cleanJson);
              break;
            }
          } catch (apiErr) {
            lastError = apiErr;
            if (isPermissionOrBillingError(apiErr)) {
              permissionOrBillingFailure = true;
              console.error("[AgriVision AI] Gemini API permission or billing error:", apiErr?.message || apiErr);
              break;
            }
            const errMsg = String(apiErr?.message || apiErr || "").toLowerCase();
            const isTransient = errMsg.includes("503") || errMsg.includes("unavailable") || errMsg.includes("429");
            console.warn(`[AgriVision AI] Model ${model} (attempt ${attempt + 1}) failed:`, apiErr?.message || apiErr);
            if (isTransient && attempt === 0) {
              await new Promise((r) => setTimeout(r, 1200));
              continue;
            }
            await new Promise((r) => setTimeout(r, 500));
            break;
          }
        }
        if (parsedResult || permissionOrBillingFailure) {
          break;
        }
      }
      if (parsedResult) {
        return res.json(parsedResult);
      }
      if (permissionOrBillingFailure) {
        return res.status(503).json({
          error: "D\u1ECBch v\u1EE5 ph\xE2n t\xEDch \u1EA3nh AI t\u1EA1m th\u1EDDi ch\u01B0a \u0111\u01B0\u1EE3c k\xEDch ho\u1EA1t quy\u1EC1n truy c\u1EADp tr\xEAn m\xE1y ch\u1EE7.",
          details: lastError?.message || String(lastError || "")
        });
      }
      return res.status(502).json({
        error: "Kh\xF4ng th\u1EC3 ph\xE2n t\xEDch h\xECnh \u1EA3nh qua d\u1ECBch v\u1EE5 AI l\xFAc n\xE0y. B\xE1c vui l\xF2ng th\u1EED l\u1EA1i sau \xEDt ph\xFAt.",
        details: lastError?.message || String(lastError || "")
      });
    } catch (error) {
      console.error("Error during Gemini plant diagnosis:", error);
      return res.status(500).json({
        error: "Kh\xF4ng th\u1EC3 ho\xE0n th\xE0nh ch\u1EA9n \u0111o\xE1n \u1EA3nh l\xFAc n\xE0y.",
        details: error.message || String(error)
      });
    }
  });
  app.post("/api/assistant", async (req, res) => {
    try {
      const { message, history = [], diagnosisContext } = req.body || {};
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "N\u1ED9i dung c\xE2u h\u1ECFi l\xE0 b\u1EAFt bu\u1ED9c." });
      }
      const systemInstruction = `
B\u1EA1n l\xE0 "Tr\u1EE3 l\xFD Khoa h\u1ECDc N\xF4ng nghi\u1EC7p AgriVision AI" chuy\xEAn s\xE2u v\u1EC1 c\xE2y tr\u1ED3ng v\xF9ng B\u1EAFc Trung B\u1ED9 (Cam chanh Ngh\u1EC7 An/H\xE0 T\u0129nh, L\xFAa n\u01B0\u1EDBc, C\xE2y L\u1EA1c).
M\u1EE5c ti\xEAu c\u1EE7a b\u1EA1n l\xE0 \u0111\u1ED3ng h\xE0nh c\xF9ng n\xF4ng d\xE2n, khuy\u1EBFn n\xF4ng vi\xEAn v\xE0 nghi\xEAn c\u1EE9u sinh, gi\u1EA3i \u0111\xE1p th\u1EAFc m\u1EAFc khoa h\u1ECDc r\xF5 r\xE0ng, d\u1EC5 hi\u1EC3u nh\u01B0ng chu\u1EA9n x\xE1c.

NGUY\xCAN T\u1EAEC:
1. LU\xD4N PH\xC2N BI\u1EC6T R\xD5 R\xC0NG gi\u1EEFa:
   - [TH\xD4NG TIN \u0110\xC3 X\xC1C TH\u1EF0C]: D\u1EEF li\u1EC7u t\u1EEB t\xE0i li\u1EC7u ki\u1EC3m ch\u1EE9ng n\xF4ng nghi\u1EC7p (Vi\u1EC7n BVTV, Vi\u1EC7n ASIR, FAO, IRRI).
   - [G\u1EE2I \xDD / SUY LU\u1EACN AI]: C\xE1c quan s\xE1t ho\u1EB7c ph\xE1n \u0111o\xE1n c\u1EA7n th\u1EA9m tra th\xEAm t\u1EA1i th\u1EF1c \u0111\u1ECBa.
2. KH\xD4NG t\u1EF1 \xFD k\xEA \u0111\u01A1n h\xF3a ch\u1EA5t \u0111\u1ED9c h\u1EA1i, n\u1ED3ng \u0111\u1ED9 t\xF9y ti\u1EC7n. Lu\xF4n h\u01B0\u1EDBng t\u1EDBi nguy\xEAn t\u1EAFc Qu\u1EA3n l\xFD D\u1ECBch h\u1EA1i T\u1ED5ng h\u1EE3p (IPM) v\xE0 an to\xE0n sinh th\xE1i.
3. N\u1EBFu ng\u01B0\u1EDDi d\xF9ng \u0111ang h\u1ECFi v\u1EC1 m\u1ED9t m\u1EABu ch\u1EA9n \u0111o\xE1n g\u1EA7n nh\u1EA5t, h\xE3y ph\xE2n t\xEDch d\u1EF1a tr\xEAn ng\u1EEF c\u1EA3nh \u0111\u01B0\u1EE3c cung c\u1EA5p.

C\u01A0 S\u1EDE D\u1EEE LI\u1EC6U \u0110\xC3 KI\u1EC2M CH\u1EE8NG:
${REGIONAL_KNOWLEDGE_CONTEXT}
      `.trim();
      let contextPrompt = "";
      if (diagnosisContext) {
        contextPrompt = `
[Ng\u1EEF c\u1EA3nh ch\u1EA9n \u0111o\xE1n hi\u1EC7n t\u1EA1i]:
- C\xE2y tr\u1ED3ng: ${diagnosisContext.crop}
- B\u1ED9 ph\u1EADn: ${diagnosisContext.part || "L\xE1"}
- B\u1EC7nh nghi ng\u1EDD: ${diagnosisContext.suspectedDisease || "Ch\u01B0a x\xE1c \u0111\u1ECBnh"}
- Tri\u1EC7u ch\u1EE9ng ghi nh\u1EADn: ${JSON.stringify(diagnosisContext.symptoms || [])}
- M\u1EE9c \u0111\u1ED9 tin c\u1EADy: ${diagnosisContext.confidenceLevel || "Trung b\xECnh"}

`;
      }
      const conversationPrompt = Array.isArray(history) ? history.slice(-6).map((h) => `${h.sender === "user" ? "Ng\u01B0\u1EDDi d\xF9ng" : "Tr\u1EE3 l\xFD"}: ${h.content}`).join("\n") : "";
      const fullPrompt = `${contextPrompt}${conversationPrompt ? conversationPrompt + "\n" : ""}Ng\u01B0\u1EDDi d\xF9ng: ${message}
Tr\u1EE3 l\xFD:`;
      let replyText = "";
      const ai = getGeminiClient();
      if (ai) {
        for (const model of CANDIDATE_MODELS) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: fullPrompt,
              config: {
                systemInstruction,
                thinkingConfig: {
                  thinkingLevel: model === "gemini-3.1-flash-lite" ? import_genai.ThinkingLevel.MINIMAL : import_genai.ThinkingLevel.LOW
                }
              }
            });
            if (response.text) {
              replyText = response.text;
              break;
            }
          } catch (apiErr) {
            if (isPermissionOrBillingError(apiErr)) {
              console.info("[AgriVision AI] Live Gemini API requires billing setup on Google Cloud. Using regional botanical assistant knowledge.");
              break;
            }
            console.info(`Assistant model ${model} unavailable, trying next candidate...`);
          }
        }
      }
      if (!replyText) {
        replyText = searchRegionalKnowledge(message, diagnosisContext?.crop);
      }
      return res.json({ reply: replyText });
    } catch (error) {
      console.error("Error during AI assistant response:", error);
      return res.status(500).json({
        error: "Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i v\u1EDBi Tr\u1EE3 l\xFD AI n\xF4ng nghi\u1EC7p.",
        details: error.message || String(error)
      });
    }
  });
  app.get("/api/diseases", (_req, res) => {
    res.json({ diseases: DEFAULT_DISEASES });
  });
  app.post("/api/tts", async (req, res) => {
    try {
      const rawText = typeof req.body?.text === "string" ? req.body.text.trim() : "";
      if (!rawText) {
        return res.status(400).json({ error: "N\u1ED9i dung c\u1EA7n \u0111\u1ECDc l\xE0 b\u1EAFt bu\u1ED9c." });
      }
      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: "D\u1ECBch v\u1EE5 gi\u1ECDng \u0111\u1ECDc AI ch\u01B0a s\u1EB5n s\xE0ng tr\xEAn m\xE1y ch\u1EE7."
        });
      }
      const clippedText = rawText.slice(0, 2400);
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash-lite-tts",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: clippedText,
                speechMetadata: {
                  style: "Warm, clear, unhurried, friendly Vietnamese agricultural advisor explaining clearly to a farmer"
                }
              }
            ]
          }
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" }
            }
          }
        }
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(502).json({ error: "Kh\xF4ng t\u1EA1o \u0111\u01B0\u1EE3c \xE2m thanh gi\u1ECDng \u0111\u1ECDc l\xFAc n\xE0y." });
      }
      return res.json({
        audioBase64: base64Audio,
        mimeType: "audio/wav"
      });
    } catch (error) {
      console.error("[AgriVision AI] TTS error:", error?.message || error);
      return res.status(502).json({
        error: "Kh\xF4ng th\u1EC3 t\u1EA1o gi\u1ECDng \u0111\u1ECDc l\xFAc n\xE0y.",
        details: error?.message || String(error)
      });
    }
  });
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      app: "AgriVision AI",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY)
    });
  });
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "API endpoint not found." });
  });
  app.use("/api", (err, _req, res, _next) => {
    console.error("[AgriVision AI] API middleware error:", err);
    const status = typeof err?.status === "number" ? err.status : err?.type === "entity.too.large" ? 413 : 500;
    res.status(status).json({
      error: status === 413 ? "\u1EA2nh g\u1EEDi l\xEAn v\u01B0\u1EE3t qu\xE1 dung l\u01B0\u1EE3ng cho ph\xE9p." : "M\xE1y ch\u1EE7 g\u1EB7p l\u1ED7i khi x\u1EED l\xFD y\xEAu c\u1EA7u.",
      details: err?.message || String(err)
    });
  });
  return app;
}

// server/vercelHandler.ts
var cachedApp = null;
function getApp() {
  if (!cachedApp) {
    cachedApp = createApiApp();
  }
  return cachedApp;
}
function handler(req, res) {
  return new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (!settled) {
        settled = true;
        resolve();
      }
    };
    res.once("finish", done);
    res.once("close", done);
    try {
      const rawUrl = typeof req.url === "string" ? req.url : "/api";
      try {
        const parsed = new URL(rawUrl, "http://localhost");
        const rewrittenPath = parsed.searchParams.get("__vercel_path");
        if (rewrittenPath !== null) {
          parsed.searchParams.delete("__vercel_path");
          const cleanSubPath = rewrittenPath.replace(/^\/+/, "");
          const qs = parsed.searchParams.toString();
          req.url = `/api${cleanSubPath ? `/${cleanSubPath}` : ""}${qs ? `?${qs}` : ""}`;
          req.originalUrl = req.url;
        } else if (parsed.pathname === "/api/index" || parsed.pathname === "/api/index.cjs" || parsed.pathname === "/api/index.ts") {
          const qs = parsed.searchParams.toString();
          req.url = `/api${qs ? `?${qs}` : ""}`;
          req.originalUrl = req.url;
        }
      } catch {
      }
      const app = getApp();
      app(req, res);
    } catch (err) {
      console.error("[AgriVision AI] Serverless handler fatal error:", err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(
          JSON.stringify({
            error: "M\xE1y ch\u1EE7 API g\u1EB7p l\u1ED7i kh\u1EDFi t\u1EA1o.",
            details: err?.message || String(err)
          })
        );
      }
      done();
    }
  });
}
if(module.exports&&typeof module.exports.default==="function"){const h=module.exports.default;h.default=h;module.exports=h;}
