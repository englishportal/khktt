import type { DiseaseRecord } from '../types/index.js';
import { EXTENDED_DISEASES } from './extendedDiseases.js';

const CORE_DISEASES: DiseaseRecord[] = [
  // ==========================================
  // 1. CÂY CAM, QUÝT, BƯỞI (10 BỆNH / DỊCH HẠI)
  // ==========================================
  {
    id: 'citrus_greening',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Vàng lá gân xanh (Huanglongbing - HLB)',
    englishName: 'Citrus Greening / Huanglongbing',
    symptoms:
      'Lá xuất hiện các mảng màu vàng loang lổ (blotchy mottle) không đối xứng qua gân chính. Gân lá nổi gồ ghề, đôi khi hóa bần. Lá non mọc thẳng đứng như tai thỏ. Quả nhỏ, méo mó lệch tâm, khi chín màu vàng ở cuống trước, hạt lép màu nâu đen, tép có vị chua đắng.',
    symptomChecklist: [
      'Lá già có đốm vàng loang lổ không đều hai bên gân chính (khác với thiếu kẽm thường đối xứng).',
      'Gân lá sưng nổi gồ ghề, sờ hơi cứng; đọt non mọc thẳng đứng nhỏ hẹp như tai thỏ.',
      'Quả nhỏ, vẹo lệch tâm, đít quả còn xanh trong khi phần cuống ngả vàng trước, hạt bị thui đen.',
      'Quan sát mặt dưới đọt non có thể thấy rầy chổng cánh nhỏ màu nâu xám đậu chéo 45 độ.'
    ],
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    causes:
      'Vi khuẩn nội bào Candidatus Liberibacter asiaticus sống trong mạch libe, truyền lan qua côn trùng môi giới rầy chổng cánh (Diaphorina citri) và qua mắt ghép.',
    favorableConditions:
      'Thời tiết ấm ẩm 25-30°C trong các đợt lộc non cây cam quýt vụ xuân và vụ thu tại Nghệ An (Cam Vinh, Quỳ Hợp), Hà Tĩnh (Hương Sơn, Khe Mây).',
    preventionMethods:
      'Sử dụng cây giống sạch bệnh có chứng nhận từ nhà lưới cách ly. Trồng cây chắn gió (như ổi xen canh) và giữ kiến vàng tự nhiên để xua đuổi rầy chổng cánh.',
    safeManagement:
      'Cắt tỉa hoặc chặt bỏ tiêu hủy triệt để cây nhiễm nặng để cắt nguồn lây. Treo bẫy dính vàng theo dõi rầy chổng cánh, bảo vệ các đợt lộc non bằng dầu khoáng nông nghiệp hoặc chế phẩm sinh học đúng thời điểm.',
    treatmentSteps: {
      immediate: [
        'Đánh dấu cây có triệu chứng lá vàng loang lổ lệch gân và kiểm tra xem có rầy chổng cánh trên đọt non không.',
        'Nếu cây mới chớm 1-2 cành, cắt bỏ ngay cành bệnh; nếu cây đã vàng quá 1/3 tán, cần chặt bỏ cả gốc để tránh lây sang cả vườn.',
        'Tuyệt đối không lấy mắt ghép hoặc cành chiết từ vườn đang có biểu hiện bệnh vàng lá gân xanh.'
      ],
      biologicalAndCare: [
        'Phun dầu khoáng nông nghiệp hoặc chế phẩm sinh học trừ rầy chổng cánh ngay khi cây vừa nhú mầm lộc non 1-2 cm.',
        'Bón phân hữu cơ hoai mục kết hợp chế phẩm Trichoderma và vi lượng (kẽm, magie, bo) giúp bộ rễ khỏe, hạn chế suy cây.',
        'Treo bẫy dính màu vàng xung quanh rìa vườn để phát hiện sớm rầy trưởng thành bay vào.'
      ],
      caution: [
        'Bệnh do vi khuẩn sống trong mạch dẫn nên KHÔNG có thuốc hóa học nào chữa khỏi hoàn toàn cây đã nhiễm nặng.',
        'Không phun phân bón lá đạm cao liên tục khi chưa xử lý rầy, vì ra lộc non nhiều sẽ thu hút rầy chổng cánh bùng phát mạnh hơn.'
      ]
    },
    references: 'Viện Bảo vệ Thực vật Việt Nam; Viện KHKT Nông nghiệp Bắc Trung Bộ (ASIR); USDA-APHIS.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam & Viện ASIR',
    standardCode: 'QCVN 01-165:2014/BNNPTNT',
    reviewDate: '2026-03-01',
    sampleImageUrl: '/images/citrus_leaf_hlb.jpg',
    galleryImages: [
      {
        url: '/images/citrus_leaf_hlb.jpg',
        caption: 'Lá cam bị vàng loang lổ gân xanh mẫu thực địa Bắc Trung Bộ',
        source: 'Viện ASIR (Mẫu kiểm chứng)'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Citrus_greening.JPG/960px-Citrus_greening.JPG',
        caption: 'Vết vàng loang lổ không đối xứng trên lá và quả méo lệch tâm do HLB',
        source: 'USDA / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Citrus_greening_UGA5201066.jpg/960px-Citrus_greening_UGA5201066.jpg',
        caption: 'Biểu hiện vàng gân lá và lá non thu nhỏ, mọc dựng đứng',
        source: 'Bugwood.org / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Asian_citrus_psyllid_D._citri_adult.jpg/960px-Asian_citrus_psyllid_D._citri_adult.jpg',
        caption: 'Rầy chổng cánh (Diaphorina citri) - côn trùng môi giới truyền bệnh HLB',
        source: 'USDA-ARS / Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_canker',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Loét cam quýt (Bacterial Canker)',
    englishName: 'Citrus Bacterial Canker',
    symptoms:
      'Vết bệnh ban đầu là chấm nhỏ trong suốt như giọt dầu, sau phồng lên thành nốt sần tròn màu nâu xám, bề mặt nứt nẻ. Đặc trưng có quầng vàng sáng (halo) bao quanh vết loét trên cả hai mặt lá và vỏ quả.',
    symptomChecklist: [
      'Nốt loét nổi gồ lên ở CẢ HAI MẶT lá (khác với bệnh ghẻ thường chỉ gồ một mặt và làm nhăn lá).',
      'Xung quanh nốt sần màu nâu xám luôn có quầng vàng sáng rõ rệt như viền dầu.',
      'Trên vỏ quả và cành non có vết sùi nứt nẻ, sờ vào thấy thô ráp, dễ làm quả rụng non sau mưa bão.'
    ],
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    causes:
      'Vi khuẩn Xanthomonas citri pv. citri, xâm nhập qua khí khổng tự nhiên và các vết thương do mưa gió va đập hoặc sâu vẽ bùa đục phá.',
    favorableConditions:
      'Mưa to gió lớn kéo dài, bão nhiệt đới vùng Bắc Trung Bộ kết hợp nhiệt độ cao 28-35°C.',
    preventionMethods:
      'Phòng trừ triệt để sâu vẽ bùa để không tạo cửa ngõ cho vi khuẩn xâm nhập. Trồng cây chắn gió quanh vườn cam.',
    safeManagement:
      'Cắt tỉa cành lá bị loét nặng trong ngày nắng ráo đem đốt tiêu hủy. Phun phòng bằng dung dịch Booc-đô 1% hoặc thuốc gốc đồng sinh học, vi khuẩn đối kháng Bacillus subtilis ngay trước và sau đợt mưa bão.',
    treatmentSteps: {
      immediate: [
        'Cắt bỏ cành, lá và quả bị loét nặng vào lúc trời nắng ráo, gom vào bao tải mang ra khỏi vườn tiêu hủy.',
        'Khử trùng kéo cắt cành bằng cồn 70% hoặc nước javel pha loãng khi chuyển từ cây bệnh sang cây khỏe.'
      ],
      biologicalAndCare: [
        'Phun dung dịch Booc-đô 1% hoặc thuốc gốc đồng (Đồng Oxyclorua, Đồng Hydroxit) đúng liều để phủ kín bề mặt lá non và quả nhỏ.',
        'Kiểm soát tốt sâu vẽ bùa ở mỗi đợt lộc non để hạn chế vết thương cơ giới.',
        'Bổ sung phân Kali và Canxi giúp biểu bì lá dày, chống chịu mưa gió tốt hơn.'
      ],
      caution: [
        'Không phun thuốc lúc trời nắng gắt hoặc khi cây đang nở hoa rộ để tránh cháy lá, rụng hoa.',
        'Không tưới phun mưa mạnh trực tiếp lên tán vào buổi chiều tối vì nước bắn sẽ phát tán vi khuẩn khắp vườn.'
      ]
    },
    references: 'Viện Bảo vệ Thực vật (NIPP); FAO Citrus Disease Management Guidelines.',
    verificationStatus: 'verified',
    verifiedBy: 'Phòng Bệnh học Thực vật - Viện BVTV',
    standardCode: 'QCVN 01-19:2010/BNNPTNT',
    reviewDate: '2026-03-01',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Citrus_canker_on_foliage.jpg/500px-Citrus_canker_on_foliage.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Citrus_canker_on_foliage.jpg/500px-Citrus_canker_on_foliage.jpg',
        caption: 'Vết loét sần sùi có quầng vàng sáng đặc trưng trên lá cam',
        source: 'USDA / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Xanthomonas_axonopodis_canker_2_%288232130059%29.jpg/960px-Xanthomonas_axonopodis_canker_2_%288232130059%29.jpg',
        caption: 'Cận cảnh ổ loét nổi gồ, tâm nứt vỡ kèm viền vàng trên lá',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Xanthomonas_axonopodis_canker_1_%288233192838%29.jpg/960px-Xanthomonas_axonopodis_canker_1_%288233192838%29.jpg',
        caption: 'Vết loét vi khuẩn Xanthomonas gây sần sùi vỏ quả có múi',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_scab',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Ghẻ sẹo cam quýt (Citrus Scab)',
    englishName: 'Citrus Scab',
    symptoms:
      'Vết bệnh gồ lên thành các gai u lồi hình nón sừng, màu vàng nâu hoặc xám tro. Phiến lá non bị vặn vẹo biến dạng, nhăn nheo, còi cọc. Trên vỏ quả non xuất hiện các mụn cóc sần sùi nhô cao.',
    symptomChecklist: [
      'Đỉnh mụn ghẻ gồ cao ở một mặt lá, mặt đối diện thường lõm vào (phân biệt với loét sần cả hai mặt).',
      'Lá non bị nhăn nhúm, cong queo, mép lá biến dạng rõ rệt.',
      'Quả non mọc nhiều mụn sùi màu vàng rơm đến nâu xám làm vỏ quả xấu, sần sùi.'
    ],
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    causes: 'Nấm Elsinoë fawcettii (Sphaceloma fawcettii). Bào tử nấm phát tán nhờ giọt nước mưa bắn và gió.',
    favorableConditions:
      'Nhiệt độ mát 20-24°C kèm mưa phùn kéo dài, sương mù, độ ẩm không khí trên 90% vụ Đông Xuân Bắc Trung Bộ.',
    preventionMethods:
      'Tỉa cành tạo tán thông thoáng sau thu hoạch. Không tưới phun mưa lên tán cây vào chiều tối.',
    safeManagement:
      'Phun dung dịch Booc-đô hoặc chế phẩm sinh học Trichoderma / hoạt chất Azoxystrobin, Mancozeb đúng giai đoạn lộc non nhú 1-2 cm và khi rụng 2/3 cánh hoa.',
    treatmentSteps: {
      immediate: [
        'Thu gom và cắt bỏ các cành lá non bị ghẻ nhăn nặng, quả non biến dạng rụng dưới gốc.',
        'Tỉa bớt cành vượt, cành tăm trong tán giúp vườn thông thoáng, nhanh khô sương vào buổi sáng.'
      ],
      biologicalAndCare: [
        'Phun phòng khi lộc non mới nhú dài 1-2 cm và lặp lại lúc cây vừa rụng 2/3 cánh hoa bằng dung dịch Booc-đô hoặc thuốc gốc đồng sinh học.',
        'Luân phiên chế phẩm nấm đối kháng Trichoderma vào đất và vùng tán để giảm nguồn bào tử lưu tồn.'
      ],
      caution: [
        'Bệnh chỉ lây nhiễm trên mô non (lá non và quả non dưới 6-8 tuần tuổi); phun khi lá đã già sẽ không còn tác dụng phục hồi vết ghẻ cũ.',
        'Tránh lạm dụng thuốc gốc đồng quá dày trong giai đoạn quả non lớn nhanh vì dễ gây nám vỏ quả.'
      ]
    },
    references: 'Trung tâm Khuyến nông Quốc gia; USDA-APHIS Sweet Orange Scab Field Guide.',
    verificationStatus: 'verified',
    verifiedBy: 'Trung tâm Khuyến nông Quốc gia & Chi cục BVTV Nghệ An',
    standardCode: 'TCVN 9308:2012',
    reviewDate: '2026-03-01',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg/960px-Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg/960px-Sweet_Orange_Scab_%2820191218-APHIS-DB-0075%29.jpg',
        caption: 'Vết ghẻ sẹo nổi mụn bần sần sùi trên vỏ quả có múi',
        source: 'USDA-APHIS / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Sweet_Orange_Scab_%2820191218-APHIS-DB-0076%29.jpg/960px-Sweet_Orange_Scab_%2820191218-APHIS-DB-0076%29.jpg',
        caption: 'Các mảng sần màu xám nâu liên kết trên bề mặt quả',
        source: 'USDA-APHIS / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Citrus_Nursery_%2820170421-APHIS-DB-0080%29.jpg/960px-Citrus_Nursery_%2820170421-APHIS-DB-0080%29.jpg',
        caption: 'Lá non trong vườn ươm bị ghẻ làm nhăn vặn và biến dạng phiến lá',
        source: 'USDA-APHIS / Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-20T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_black_spot',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Đốm đen cam chanh (Citrus Black Spot)',
    englishName: 'Citrus Black Spot',
    symptoms:
      'Trên vỏ quả xuất hiện các đốm tròn hơi lõm, tâm màu xám nhạt đến nâu sáng có chấm đen nhỏ (ổ bào tử nấm), viền ngoài màu nâu sẫm hoặc đen tuyền, đôi khi có quầng xanh lục hoặc đỏ nâu. Gây rụng quả sớm trước khi thu hoạch.',
    symptomChecklist: [
      'Đốm tròn kích thước 3-10 mm trên vỏ quả, tâm xám trắng hơi lõm, viền đen sẫm rất nét.',
      'Dùng kính lúp thấy các chấm đen li ti ở giữa tâm vết bệnh.',
      'Thường xuất hiện rõ ở phía quả hướng ra ánh nắng mặt trời khi quả bắt đầu già.'
    ],
    affectedPlantParts: ['fruit', 'leaf'],
    causes: 'Nấm Phyllosticta citricarpa (Guignardia citricarpa). Bào tử tồn tại trên lá rụng mục dưới đất và bắn lên quả non đầu mùa mưa.',
    favorableConditions:
      'Nền nhiệt cao 25-32°C xen kẽ mưa ẩm và nắng gắt; vườn nhiều lá rụng khô mục không được thu gom.',
    preventionMethods:
      'Thu gom, ủ hoai mục hoặc phủ phân hữu cơ vi sinh lên lớp lá rụng dưới gốc để chặn bào tử nấm phát tán lên tán.',
    safeManagement:
      'Cắt tỉa cành khô, cành gần mặt đất. Phun phòng bằng thuốc gốc đồng hoặc Azoxystrobin giai đoạn quả non sau khi rụng cánh hoa 4-6 tuần.',
    treatmentSteps: {
      immediate: [
        'Thu gom toàn bộ lá rụng và quả rụng dưới gốc vườn đem ủ với vôi và nấm Trichoderma hoặc tiêu hủy.',
        'Hái bỏ các quả có dấu hiệu đốm đen sớm để tránh lây sang quả bên cạnh.'
      ],
      biologicalAndCare: [
        'Phủ một lớp rơm rạ khô sạch hoặc phân hữu cơ hoai mục có Trichoderma lên mặt liếp để chặn bào tử nấm từ lá rụng bay lên.',
        'Phun bảo vệ quả định kỳ 20-25 ngày/lần trong giai đoạn mùa mưa đầu vụ bằng gốc đồng sinh học hoặc hoạt chất được cấp phép.'
      ],
      caution: [
        'Vết bệnh có thể ủ tiềm ẩn nhiều tháng từ lúc quả còn nhỏ và chỉ bộc lộ khi quả già hoặc gặp nắng nóng.',
        'Không để cỏ dại mọc cao sát tán cam làm giữ ẩm kéo dài quanh vùng gốc.'
      ]
    },
    references: 'EFSA & USDA Citrus Black Spot Compendium; Viện BVTV Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật & USDA Compendium',
    standardCode: 'ISPM / FAO Citrus Phytosanitary Guide',
    reviewDate: '2026-03-05',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Citrus_Black_Spot.jpg/500px-Citrus_Black_Spot.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Citrus_Black_Spot.jpg/500px-Citrus_Black_Spot.jpg',
        caption: 'Vết đốm đen tâm xám hơi lõm viền đen sẫm trên vỏ cam',
        source: 'USDA / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Citrus_Black_Spot_on_Valencia_orange.jpg/500px-Citrus_Black_Spot_on_Valencia_orange.jpg',
        caption: 'Đốm đen nhiều kích cỡ phát triển trên quả cam Valencia sắp chín',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Citrus_Black_Spot_lesions.jpg/500px-Citrus_Black_Spot_lesions.jpg',
        caption: 'Cận cảnh vết đốm cứng và đốm tàn nhang của nấm Phyllosticta citricarpa',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_melanose',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Sẹo mạng nhện / Rỉ sắt nâu (Citrus Melanose)',
    englishName: 'Citrus Melanose',
    symptoms:
      'Trên vỏ quả và lá xuất hiện dày đặc các chấm nhỏ màu nâu sẫm đến đen nổi nhẹ lên bề mặt, sờ tay thấy nhám như giấy ráp. Vết bệnh thường xếp thành dải vệt chảy theo dòng nước mưa trên vỏ quả (vết giọt nước mắt) hoặc mạng nhện.',
    symptomChecklist: [
      'Các chấm nâu nhỏ li ti sờ thấy nhám ráp tay (khác hẳn vết ghẻ u lồi to và vết loét có quầng vàng).',
      'Thường tụ lại thành từng vệt dài giống giọt nước chảy hoặc đường mạng nhện bùn đất trên vỏ quả.',
      'Chủ yếu làm xấu mẫu mã vỏ quả và giảm nhẹ khả năng quang hợp của lá.'
    ],
    affectedPlantParts: ['fruit', 'leaf', 'stem'],
    causes: 'Nấm Diaporthe citri (Phomopsis citri). Bào tử sinh sản mạnh trên các cành khô chết treo trên tán cây.',
    favorableConditions:
      'Mưa ẩm kéo dài sau mùa xuân hè, vườn cam nhiều năm tuổi có nhiều cành khô tăm chưa cắt tỉa.',
    preventionMethods:
      'Cắt tỉa sạch toàn bộ cành khô, cành chết trên tán ngay sau thu hoạch vì đây là nơi nấm trú ngụ chính.',
    safeManagement:
      'Phun thuốc gốc đồng (Booc-đô, Đồng Oxyclorua) sau khi quả non đậu hoàn toàn 3-4 tuần để bảo vệ vỏ quả.',
    treatmentSteps: {
      immediate: [
        'Dùng kéo cắt tỉa sạch toàn bộ cành khô chết, cành bị sâu đục trên tán (nơi nấm sinh bào tử nhiều nhất).'
      ],
      biologicalAndCare: [
        'Phun dung dịch Booc-đô hoặc gốc đồng sinh học bảo vệ vỏ quả non trong giai đoạn 1-3 tháng đầu sau đậu quả.',
        'Bón phân cân đối và tưới ẩm hợp lý để cây giữ tán khỏe, ít phát sinh cành khô chết.'
      ],
      caution: [
        'Nếu chỉ phun thuốc mà không cắt bỏ cành khô chết trên cây thì bệnh vẫn liên tục tái phát sau mỗi trận mưa.'
      ]
    },
    references: 'Cẩm nang bệnh cây có múi - FAO & Viện Cây ăn quả Miền Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật & Viện Cây ăn quả',
    standardCode: 'TCVN 9308:2012',
    reviewDate: '2026-03-05',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Citrus_natsudaidai_Melanose.jpg/960px-Citrus_natsudaidai_Melanose.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Citrus_natsudaidai_Melanose.jpg/960px-Citrus_natsudaidai_Melanose.jpg',
        caption: 'Vết sẹo nâu li ti tạo vệt chảy theo đường nước mưa trên vỏ quả',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/M%C3%A9lanose_de_la_mandarine.jpg/330px-M%C3%A9lanose_de_la_mandarine.jpg',
        caption: 'Mật độ chấm nâu sẫm sờ nhám tay trên vỏ quả quýt',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-02T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_phytophthora_gummosis',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Chảy nhựa thân / Thối gốc nứt vỏ (Phytophthora)',
    englishName: 'Citrus Phytophthora Gummosis & Foot Rot',
    symptoms:
      'Vỏ thân ở vùng gốc hoặc chạc ba cây chuyển màu sẫm ướt, nứt dọc và rỉ ra chất nhựa đặc màu hổ phách đến nâu đen. Khi cạo nhẹ lớp vỏ thấy phần gỗ bên dưới bị thối nâu, có mùi chua đặc trưng. Tán lá trên cành tương ứng bị vàng gân và rụng dần.',
    symptomChecklist: [
      'Gốc thân gần mặt đất hoặc chạc ba cành chính bị nứt vỏ, chảy nhựa nâu sẫm dính bết.',
      'Dùng dao sạch cạo nhẹ lớp vỏ chỗ chảy nhựa thấy phần mô gỗ đổi màu nâu thâm (cây khỏe có màu xanh vàng sáng).',
      'Lá trên cành phía trên vết loét bị vàng dọc gân giữa trước rồi cây chết dần từng bên tán.'
    ],
    affectedPlantParts: ['stem', 'leaf', 'fruit'],
    causes: 'Nấm giả (trứng nấm) Phytophthora palmivora / P. citrophthora tồn tại trong đất ẩm và nước tưới.',
    favorableConditions:
      'Vườn đất thấp trũng đọng nước mùa mưa, trồng cây quá sâu ngập mắt ghép, hoặc dùng phân chuồng chưa hoai sát gốc.',
    preventionMethods:
      'Lên mô cao thoát nước tốt, tuyệt đối không lấp đất quá mắt ghép. Dùng gốc ghép chống chịu tốt như cam ba lá hoặc bưởi chua. Quét vôi gốc cao 40-50 cm đầu mùa mưa.',
    safeManagement:
      'Cạo sạch phần vỏ thối đến phần gỗ lành, quét dung dịch Booc-đô đặc hoặc Metalaxyl / Fosetyl-Al trực tiếp lên vết cạo; tưới gốc chế phẩm nấm đối kháng Trichoderma.',
    treatmentSteps: {
      immediate: [
        'Khơi rãnh thoát nước ngay nếu quanh gốc bị đọng ẩm, gạt bỏ bớt đất và cỏ dại sát gốc cho thông thoáng.',
        'Dùng dao sắc sạch cạo sạch hoàn toàn phần vỏ cây bị thâm thối cho tới khi chạm mô gỗ lành, thu gom vỏ bệnh đem đốt.'
      ],
      biologicalAndCare: [
        'Quét trực tiếp dung dịch thuốc gốc đồng (Booc-đô đậm đặc) hoặc chế phẩm đặc trị nấm Phytophthora lên vết vừa cạo 2 lần cách nhau 7 ngày.',
        'Tưới bổ sung nấm đối kháng Trichoderma vào vùng rễ quanh tán để ức chế nấm đất lây lan.',
        'Khi cây đang yếu không bón phân hóa học nồng độ cao vào gốc.'
      ],
      caution: [
        'Không đắp bùn, đất ẩm hoặc rác rưởi sát cổ rễ cây cam bưởi.',
        'Nếu vết thối đã ăn vòng quanh hết chu vi thân gốc thì cây không thể phục hồi, nên nhổ bỏ xử lý vôi bột trước khi trồng dặm.'
      ]
    },
    references: 'Viện Bảo vệ Thực vật Việt Nam; Bugwood Phytophthora Field Manual.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện BVTV Việt Nam & Viện ASIR',
    standardCode: 'TCVN 9308:2012',
    reviewDate: '2026-03-05',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg/960px-Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg/960px-Lemon_tree_with_phytophtora_02_-_foot_rot_gummosis.jpg',
        caption: 'Gốc cây có múi bị nứt vỏ và rỉ nhựa nâu đen đặc trưng của Phytophthora',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815371984693%29.jpg/960px-Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815371984693%29.jpg',
        caption: 'Vỏ thân bong tróc, mô gỗ thâm nâu và rỉ dịch nhựa',
        source: 'Bugwood.org / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815805881077%29.jpg/960px-Bark_peeling_and_stem_blight_or_stem_canker_of_citrus_%2815805881077%29.jpg',
        caption: 'Vết hoại tử lan rộng theo chiều dọc trên thân cành cam',
        source: 'Bugwood.org / Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-04T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_leafminer',
    cropType: 'citrus',
    vietnameseName: 'Sâu vẽ bùa hại cam chanh (Citrus Leafminer)',
    englishName: 'Citrus Leafminer',
    symptoms:
      'Sâu non đục thành các đường hầm ngoằn ngoèo màu trắng bạc óng ánh dưới lớp biểu bì lá non và chồi non. Lá non bị quăn queo, biến dạng, rìa lá cuốn vào trong nơi sâu làm kén nhộng, tạo điều kiện cho vi khuẩn bệnh loét xâm nhập.',
    symptomChecklist: [
      'Đường rãnh ngoằn ngoèo như nét vẽ màu bạc hoặc trắng mờ trên mặt lá non.',
      'Ở cuối đường hầm thường có nhộng nhỏ làm mép lá cuốn gập lại.',
      'Chủ yếu phá hại mạnh trên lá non mới nhú; lá già bánh tẻ không bị đục thêm.'
    ],
    affectedPlantParts: ['leaf', 'stem'],
    causes: 'Ấu trùng loài bướm đêm nhỏ Phyllocnistis citrella. Ngài cái đẻ trứng trực tiếp lên chồi lá non mới nhú.',
    favorableConditions:
      'Các đợt cây ra lộc tập trung (lộc xuân, lộc hè, lộc thu), thời tiết ấm 24-30°C tại các vườn cam Bắc Trung Bộ.',
    preventionMethods:
      'Điều khiển bón phân và tưới nước để cây ra lộc non ĐỒNG LOẠT trong cả vườn giúp dễ quản lý một lần, cắt đứt nguồn thức ăn liên tục của sâu.',
    safeManagement:
      'Phun dầu khoáng sinh học (SK Enspray) hoặc chế phẩm trừ sâu sinh học Abamectin / Emamectin / Azadirachtin (chiết xuất neem) ngay khi mầm lộc non mới nhú dài 1-2 cm; bảo tồn kiến vàng và ong ký sinh.',
    treatmentSteps: {
      immediate: [
        'Ngắt bỏ và tiêu hủy các ngọn lá non bị cuốn nặng chứa nhộng sâu nếu diện tích vườn nhỏ hoặc cây mới trồng.',
        'Kiểm tra xem trên vết sâu vẽ bùa có kèm chấm loét vi khuẩn quầng vàng hay không để kết hợp phòng loét.'
      ],
      biologicalAndCare: [
        'Khi thấy 10-20% chồi non mới nhú xuất hiện đường đục nhỏ, phun dầu khoáng nông nghiệp hoặc thuốc sinh học Abamectin/Neem vào chiều mát.',
        'Tỉa cành, bón phân đồng bộ để cả vườn bật lộc cùng lúc, rút ngắn thời gian có lá non.'
      ],
      caution: [
        'Khi lá đã xoăn cứng và chuyển sang màu xanh bánh tẻ thì sâu đã hóa nhộng hoặc bay đi, không cần phun thuốc tốn kém.',
        'Không dùng thuốc hóa học phổ rộng tiêu diệt mất ong ký sinh và kiến vàng có lợi trong vườn.'
      ]
    },
    references: 'Cục Bảo vệ Thực vật Việt Nam; USDA Citrus Leafminer Fact Sheet.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'TCVN 9308:2012',
    reviewDate: '2026-03-06',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Phyllocnistis_citrella_pupa.jpg/960px-Phyllocnistis_citrella_pupa.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Phyllocnistis_citrella_pupa.jpg/960px-Phyllocnistis_citrella_pupa.jpg',
        caption: 'Đường hầm ngoằn ngoèo màu bạc trên lá non và nhộng cuộn ở mép lá',
        source: 'USDA / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Phyllocnistis_citrella_pupa1.jpg/960px-Phyllocnistis_citrella_pupa1.jpg',
        caption: 'Phiến lá non bị xoăn biến dạng do ấu trùng sâu vẽ bùa đục dưới biểu bì',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Phyllocnistis_citrella_adult.jpg/960px-Phyllocnistis_citrella_adult.jpg',
        caption: 'Ngài trưởng thành Phyllocnistis citrella chuyên đẻ trứng trên đọt lộc non',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-06T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_sooty_mold_blackfly',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Muội đen & Bọ phấn đen hại cam (Sooty Mold & Blackfly)',
    englishName: 'Citrus Blackfly & Sooty Mold',
    symptoms:
      'Mặt trên lá, cành và vỏ quả bị phủ một lớp phấn màng màu đen như bồ hóng (nấm muội đen), có thể dùng tay lau tróc ra được. Lật mặt dưới lá thấy bọ phấn đen (hoặc rệp sáp, rệp muội) bám dày đặc và các ổ trứng xếp hình xoắn ốc.',
    symptomChecklist: [
      'Mặt trên lá và quả phủ lớp bồ hóng đen kịt, khi lau tay ẩm vào sẽ tróc ra thấy mô lá bên dưới còn xanh.',
      'Mặt dưới lá có nhiều ấu trùng bọ phấn đen hình bầu dục có viền sáp trắng hoặc rệp sáp tiết dịch ngọt.',
      'Thường thấy nhiều kiến đen bò lên cây để bảo vệ rệp và ăn dịch mật ngọt.'
    ],
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    causes: 'Nấm bồ hóng (Capnodium spp.) mọc trên lớp dịch ngọt do bọ phấn đen (Aleurocanthus woglumi), rệp sáp, rệp muội chích hút tiết ra.',
    favorableConditions:
      'Vườn cam rậm rạp, thiếu ánh sáng, ít gió lùa, mật độ côn trùng chích hút và kiến cộng sinh cao.',
    preventionMethods:
      'Tỉa cành tạo tán thông thoáng cho ánh nắng lọt vào trong tán. Dọn cỏ gốc và hạn chế kiến cộng sinh đưa rệp lên cây.',
    safeManagement:
      'Muốn hết muội đen PHẢI trừ bọ phấn/rệp sáp bằng dầu khoáng nông nghiệp hoặc xà phòng sinh học phun kỹ mặt dưới lá; khi hết dịch mật, lớp muội đen tự bong tróc sau vài cơn mưa hoặc khi rửa tán.',
    treatmentSteps: {
      immediate: [
        'Lật mặt dưới lá để xác định đúng loại côn trùng chích hút (bọ phấn, rệp sáp hay rệp muội) đang tiết dịch ngọt.',
        'Cắt bỏ các cành vượt trong tán quá rậm rạp bị muội đen bám dày đặc.'
      ],
      biologicalAndCare: [
        'Phun dầu khoáng nông nghiệp hoặc chế phẩm sinh học trừ bọ phấn/rệp kỹ vào MẶT DƯỚI LÁ, sau 3-5 ngày có thể phun rửa tán bằng nước sạch áp lực vừa.',
        'Diệt kiến cộng sinh quanh gốc để tránh kiến tha rệp phát tán sang cây khác.'
      ],
      caution: [
        'Không phun thuốc trị nấm liên tục mà bỏ qua việc trừ rệp/bọ phấn, vì còn dịch ngọt thì nấm muội đen sẽ mọc lại ngay.'
      ]
    },
    references: 'USDA-ARS Citrus Blackfly Biological Control Guide; Viện BVTV Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'TCVN 9308:2012',
    reviewDate: '2026-03-06',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aleurocanthus_woglumi_5194005.jpg/960px-Aleurocanthus_woglumi_5194005.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aleurocanthus_woglumi_5194005.jpg/960px-Aleurocanthus_woglumi_5194005.jpg',
        caption: 'Ổ trứng xoắn ốc và ấu trùng bọ phấn đen bám mặt dưới lá có múi',
        source: 'USDA-ARS / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Aleurocanthus_woglumi_5194004.jpg/960px-Aleurocanthus_woglumi_5194004.jpg',
        caption: 'Mật độ bọ phấn đen gây hại và tiết dịch mật làm phát sinh nấm muội đen',
        source: 'USDA-ARS / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Sooty_mold_Schefflera_1.JPG/960px-Sooty_mold_Schefflera_1.JPG',
        caption: 'Lớp nấm bồ hóng đen phủ kín mặt trên phiến lá làm giảm quang hợp',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-08T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_green_mold',
    cropType: 'citrus',
    vietnameseName: 'Bệnh Thối mốc xanh quả cam (Citrus Green Mold)',
    englishName: 'Citrus Green Mold',
    symptoms:
      'Vỏ quả xuất hiện vùng nhũn nước mềm nhão, nhanh chóng mọc lớp tơ nấm màu trắng và sinh khối phấn bào tử màu xanh ô-liu (xanh lá cây bụi phấn) ở chính giữa, bao quanh bởi viền tơ trắng rộng. Quả thối mềm nhanh và lây sang các quả sát cạnh khi thu hoạch bảo quản.',
    symptomChecklist: [
      'Đốm mềm nhũn nước trên vỏ quả, ấn nhẹ vào rất mềm và dễ vỡ.',
      'Trung tâm vết thối phủ lớp phấn mịn màu xanh ô-liu, xung quanh luôn có vòng viền trắng rõ.',
      'Bụi bào tử xanh dễ bay mù khi chạm tay, làm lây nhiễm chéo rất nhanh trong sọt hoặc kho bảo quản.'
    ],
    affectedPlantParts: ['fruit'],
    causes: 'Nấm Penicillium digitatum. Xâm nhập qua các vết trầy xước vỏ quả do côn trùng chích hoặc va chạm khi thu hái vận chuyển.',
    favorableConditions:
      'Quả chín gần thu hoạch gặp mưa ẩm, côn trùng (ruồi đục quả, bướm chích hút) gây vết thương, hoặc bảo quản nơi ẩm bí.',
    preventionMethods:
      'Thu hoạch nhẹ tay bằng kéo chuyên dụng (cắt sát cuống), tránh làm trầy xước vỏ quả. Phòng tốt ruồi đục quả trên vườn.',
    safeManagement:
      'Loại bỏ ngay quả thối khỏi cây và khỏi sọt đóng gói. Khử trùng thùng sọt bảo quản và dùng chế phẩm sinh học hoặc nước ấm xử lý sau thu hoạch theo tiêu chuẩn an toàn.',
    treatmentSteps: {
      immediate: [
        'Thu gom quả bị thối mốc trên cây và dưới đất cho vào bao kín tiêu hủy, tránh rung lắc làm phát tán bụi bào tử xanh.',
        'Nếu đang thu hái hoặc trữ quả, tách riêng lập tức quả có vết xước hoặc chớm thối khỏi lô quả lành.'
      ],
      biologicalAndCare: [
        'Phòng trừ ruồi đục quả và bọ xít chích quả giai đoạn quả già để hạn chế vết thương mở đường cho nấm.',
        'Vệ sinh rổ sọt bằng nước sạch pha thuốc khử trùng an toàn trước khi đựng cam thu hoạch.'
      ],
      caution: [
        'Tuyệt đối không dùng hóa chất bảo quản ngoài danh mục cho phép để ngâm quả sau thu hoạch.'
      ]
    },
    references: 'FAO Postharvest Citrus Handling Manual; Viện Cơ điện Nông nghiệp & Công nghệ Sau thu hoạch.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật & Công nghệ Sau thu hoạch',
    standardCode: 'TCVN Bảo quản quả tươi',
    reviewDate: '2026-03-07',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Penicillium_digitatum_75779358.jpg/960px-Penicillium_digitatum_75779358.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Penicillium_digitatum_75779358.jpg/960px-Penicillium_digitatum_75779358.jpg',
        caption: 'Vết nhũn nước kèm tơ nấm trắng và ổ bào tử xanh ô-liu trên vỏ cam',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Penicillium_digitatum_75779438.jpg/960px-Penicillium_digitatum_75779438.jpg',
        caption: 'Bào tử nấm Penicillium digitatum phủ xanh gần hết bề mặt quả',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Penicillium_digitatum_75779475.jpg/960px-Penicillium_digitatum_75779475.jpg',
        caption: 'Giai đoạn quả teo thối mềm, phát tán bào tử mạnh trong môi trường ẩm',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-10T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'citrus_spider_mite_aphid',
    cropType: 'citrus',
    vietnameseName: 'Nhện đỏ & Rệp muội nâu hại cam chanh (Mites & Brown Aphid)',
    englishName: 'Citrus Red Mite & Brown Citrus Aphid',
    symptoms:
      'Nhện đỏ chích hút tạo các chấm trắng bạc lấm tấm dày đặc khiến mặt lá xám xỉn như phủ bụi cám, mất độ bóng và rụng lá khi nắng hạn; trên vỏ quả gây hiện tượng "da cám, da lu". Rệp muội nâu bám thành đám dày đặc ở chồi non làm lá xoăn rũ và truyền bệnh virus Tristeza.',
    symptomChecklist: [
      'Lá chuyển màu xám bạc mờ xỉn, mất độ xanh bóng tự nhiên; soi kính lúp thấy nhện nhỏ màu đỏ/vàng bò lổm ngổm.',
      'Trên vỏ quả bị nhện tấn công chuyển màu xám nâu nhạt sần nhẹ ("da lu / da cám").',
      'Đọt non bị rệp muội nâu đen bám dày đặc quanh cuống lá làm lá xoăn tít.'
    ],
    affectedPlantParts: ['leaf', 'fruit', 'stem'],
    causes: 'Nhện đỏ (Panonychus citri, Tetranychus spp.), nhện rám vàng và rệp muội nâu cam quýt (Toxoptera citricida).',
    favorableConditions:
      'Mùa nắng nóng khô hạn, gió Lào Bắc Trung Bộ (tháng 4 - tháng 8) bùng phát nhện đỏ; đầu các đợt lộc non ẩm ấm bùng phát rệp muội.',
    preventionMethods:
      'Tưới phun mưa rửa tán vào sáng sớm trong mùa khô hạn để giảm mật độ nhện. Bảo vệ thiên địch tự nhiên như bọ rùa và nhện bắt mồi.',
    safeManagement:
      'Phun dầu khoáng nông nghiệp hoặc lưu huỳnh sinh học / hoạt chất sinh học Abamectin khi mật độ nhện trung bình >3-5 con/lá; luân phiên hoạt chất để tránh nhện kháng thuốc.',
    treatmentSteps: {
      immediate: [
        'Soi kỹ mặt trên và mặt dưới lá bằng kính lúp (hoặc quệt tờ giấy trắng vào lá) để kiểm tra mật độ nhện trước khi phun.',
        'Nếu vườn đang khô hạn, tiến hành tưới ẩm vườn và rửa tán nhẹ vào buổi sáng.'
      ],
      biologicalAndCare: [
        'Phun dầu khoáng nông nghiệp kết hợp thuốc trừ nhện sinh học (Abamectin, Matrine hoặc hoạt chất chuyên trị nhện cả trứng và trưởng thành) phun ướt đều 2 mặt lá và chùm quả.',
        'Luân phiên nhóm hoạt chất giữa các lần phun, không phun lặp đi lặp lại một loại thuốc.'
      ],
      caution: [
        'Tuyệt đối không trộn dầu khoáng với thuốc gốc lưu huỳnh hoặc phun khi nhiệt độ vườn vượt quá 34°C vì dễ gây cháy lá, rụng quả.'
      ]
    },
    references: 'Viện Bảo vệ Thực vật Việt Nam; USDA Brown Citrus Aphid & Mite Guide.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'TCVN 9308:2012',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Brown_citrus_aphid_5194050.png/500px-Brown_citrus_aphid_5194050.png',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Brown_citrus_aphid_5194050.png/500px-Brown_citrus_aphid_5194050.png',
        caption: 'Rệp muội nâu (Toxoptera citricida) chích hút đọt non và truyền virus Tristeza',
        source: 'USDA / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Tetranychus_urticae_with_silk_threads.jpg/960px-Tetranychus_urticae_with_silk_threads.jpg',
        caption: 'Nhện hại chích hút diệp lục và giăng tơ mịn trên mặt lá mùa nắng hạn',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Panonychus_ulmi_adult_female.jpg/960px-Panonychus_ulmi_adult_female.jpg',
        caption: 'Cận cảnh hình thái nhện đỏ trưởng thành gây hại làm lá bạc màu',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-12T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },

  // ==========================================
  // 2. CÂY LÚA NƯỚC (12 BỆNH / DỊCH HẠI)
  // ==========================================
  {
    id: 'rice_blast',
    cropType: 'rice',
    vietnameseName: 'Bệnh Đạo ôn lúa (Đạo ôn lá & Cổ bông)',
    englishName: 'Rice Blast',
    symptoms:
      'Trên phiến lá xuất hiện vết bệnh hình mắt én (hình thoi nhọn hai đầu), tâm màu xám tro, viền ngoài màu nâu đậm hoặc đỏ nâu. Nhiều vết liên kết làm lá khô cháy rụi. Trên cổ bông, vết bệnh màu nâu đen lõm vào làm cổ gié gãy gục, hạt lép lửng.',
    symptomChecklist: [
      'Vết bệnh hình thoi nhọn hai đầu như mắt én, tâm xám tro, viền nâu rõ.',
      'Vết cấp tính hình tròn hoặc thoi xanh tái ướt nước lan rất nhanh khi trời âm u sương mù.',
      'Ở giai đoạn trỗ: cổ bông hoặc gié lúa thắt đen màu nâu xám, bông lúa bạc trắng và gãy gục.'
    ],
    affectedPlantParts: ['leaf', 'stem', 'other'],
    causes: 'Nấm Magnaporthe oryzae (Pyricularia oryzae). Bào tử phát tán rất xa theo gió.',
    favorableConditions:
      'Trời âm u, mưa phùn, sương mù nhiều, đêm lạnh ngày ấm (18-26°C), độ ẩm >90%, ruộng bón thừa đạm.',
    preventionMethods:
      'Dùng giống kháng/chống chịu, cấy mật độ hợp lý, bón cân đối N-P-K và bổ sung Silic, Kali giúp lá đứng cứng chắc.',
    safeManagement:
      'Khi thấy vết cấp tính, NGỪNG BÓN ĐẠM ngay lập tức và giữ nước ruộng 3-5 cm. Phun Tricyclazole hoặc Isoprothiolane theo nguyên tắc 4 đúng, phun phòng ngừa đạo ôn cổ bông lúc lúa trỗ thấp thoáng 5% và khi trỗ đều.',
    treatmentSteps: {
      immediate: [
        'Dừng ngay việc bón phân đạm (Urê) và phân bón lá có hàm lượng đạm cao.',
        'Kiểm tra mực nước ruộng: giữ ổn định mực nước nông 3-5 cm, tuyệt đối không để ruộng khô cạn kiệt khi lúa đang bị đạo ôn.'
      ],
      biologicalAndCare: [
        'Phun ngay thuốc đặc trị đạo ôn (như hoạt chất Tricyclazole, Isoprothiolane hoặc chế phẩm sinh học Kasugamycin) khi phát hiện vết cấp tính trên lá.',
        'Nếu lúa sắp trỗ trên ruộng đã có tiền sử đạo ôn lá, bắt buộc phun phòng 1 lần lúc lúa trỗ lác đác 5% và 1 lần sau trỗ xong.'
      ],
      caution: [
        'Bệnh lây lan cực nhanh chỉ trong 3-5 ngày trời âm u sương mù — chậm xử lý dễ gây "cháy ổ" hoặc gãy cổ bông mất trắng.'
      ]
    },
    references: 'Viện Nghiên cứu Lúa Quốc tế (IRRI); Viện Bảo vệ Thực vật Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'IRRI & Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'QCVN 01-36:2010/BNNPTNT',
    reviewDate: '2026-03-01',
    sampleImageUrl: '/images/rice_leaf_blast.jpg',
    galleryImages: [
      {
        url: '/images/rice_leaf_blast.jpg',
        caption: 'Vết bệnh hình mắt én (thoi nhọn hai đầu) điển hình trên lá lúa',
        source: 'Viện ASIR (Mẫu kiểm chứng)'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Rice_blast_Magnaporthe_grisea.jpg/500px-Rice_blast_Magnaporthe_grisea.jpg',
        caption: 'Các vết mắt én tâm xám tro viền nâu đậm liên kết làm cháy khô lá lúa',
        source: 'IRRI / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/J_Sendra_with_Magnaporthe_grisea.jpeg/960px-J_Sendra_with_Magnaporthe_grisea.jpeg',
        caption: 'Hiện tượng cháy chòm đạo ôn trên ruộng lúa ngoài thực địa',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_bacterial_blight',
    cropType: 'rice',
    vietnameseName: 'Bệnh Bạc lá lúa (Cháy bìa lá vi khuẩn)',
    englishName: 'Bacterial Leaf Blight of Rice',
    symptoms:
      'Vết bệnh bắt đầu từ chóp lá hoặc mép lá lan dần xuống dưới với ranh giới gợn sóng lượn sóng rõ rệt. Mô lá chuyển xanh tái ướt nước rồi vàng lục và trắng xám như rơm khô. Sáng sớm có giọt dịch vi khuẩn màu vàng đục ứa trên mặt vết bệnh.',
    symptomChecklist: [
      'Cháy dọc từ chóp hoặc mép hai bên lá lan vào giữa, đường ranh giới vết bệnh GỢN SÓNG.',
      'Vùng lá chết chuyển màu vàng rơm rồi bạc trắng xám.',
      'Sáng sớm còn sương thấy các giọt dịch vi khuẩn nhỏ màu vàng đục đọng trên mép vết bệnh.'
    ],
    affectedPlantParts: ['leaf'],
    causes: 'Vi khuẩn Xanthomonas oryzae pv. oryzae, xâm nhập qua thủy khổng ở mép lá và vết xước lá do gió bão va đập.',
    favorableConditions:
      'Gió mạnh, mưa giông, bão vụ Hè Thu / Mùa (28-34°C), ruộng ngập sâu nước hoặc bón thừa đạm lúc làm đòng.',
    preventionMethods:
      'Chọn giống chống chịu bạc lá trong vụ Hè Thu/Mùa. Không bón thừa đạm đón đòng khi dự báo có mưa bão.',
    safeManagement:
      'Tháo bớt nước khi ruộng bệnh ngập sâu, ngừng bón đạm. Không lội vào ruộng lúc sáng sớm còn ướt sương. Sử dụng chế phẩm sinh học kháng khuẩn hoặc hợp chất gốc đồng/kẽm an toàn theo khuyến cáo BVTV.',
    treatmentSteps: {
      immediate: [
        'Ngừng bón phân đạm và tuyệt đối không phun phân bón lá kích sinh trưởng.',
        'Rút bớt nước nếu ruộng đang ngập úng, giữ mực nước thấp vừa phải; tránh lội thăm ruộng lúc lá còn ướt sương buổi sáng.'
      ],
      biologicalAndCare: [
        'Phun ngay thuốc đặc trị vi khuẩn hoặc chế phẩm sinh học kháng khuẩn (Oxolinic acid, Bronopol, hoặc vi sinh đối kháng) sau các trận mưa giông gió lớn khi bệnh vừa chớm ở mép lá.',
        'Bổ sung nhẹ phân Kali để tăng độ cứng cây, giúp bộ lá còn lại phục hồi.'
      ],
      caution: [
        'Thuốc trị nấm (như đạo ôn, khô vằn) KHÔNG diệt được vi khuẩn bạc lá — cần nhận diện đúng vết cháy gợn sóng từ mép lá.'
      ]
    },
    references: 'Viện Bảo vệ Thực vật (VAAS); Chi cục Trồng trọt & BVTV Hà Tĩnh, Nghệ An.',
    verificationStatus: 'verified',
    verifiedBy: 'VAAS & Chi cục BVTV Hà Tĩnh',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
    reviewDate: '2026-03-01',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Bacterial_blight_of_rice.jpeg/960px-Bacterial_blight_of_rice.jpeg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Bacterial_blight_of_rice.jpeg/960px-Bacterial_blight_of_rice.jpeg',
        caption: 'Lá lúa cháy bạc từ chóp và mép lá với đường ranh giới gợn sóng đặc trưng',
        source: 'IRRI / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Xanthomonas-disease.jpg/500px-Xanthomonas-disease.jpg',
        caption: 'Vết cháy bìa lá lan dọc gân lá trên giống lúa nhiễm nặng',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-12T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_sheath_blight',
    cropType: 'rice',
    vietnameseName: 'Bệnh Khô vằn lúa (Đốm vằn da hổ)',
    englishName: 'Rice Sheath Blight',
    symptoms:
      'Vết bệnh xuất hiện đầu tiên ở bẹ lá sát mặt nước ruộng, dạng vệt loang lổ như da hổ (vân mây), rìa màu nâu đậm, tâm màu xám trắng. Bệnh lan dần lên các bẹ trên và phiến lá đòng, làm lúa đổ ngã và hạt lép.',
    symptomChecklist: [
      'Khởi phát từ bẹ lá sát mặt nước thành vết loang vân mây giống da hổ.',
      'Tâm vết bệnh màu xám lục đến trắng xám, viền ngoài nâu sẫm uốn lượn.',
      'Trên bề mặt vết bệnh ẩm ướt có thể thấy sợi nấm trắng và hạch nấm tròn màu nâu nổi trên mặt nước.'
    ],
    affectedPlantParts: ['stem', 'leaf'],
    causes: 'Nấm Rhizoctonia solani. Hạch nấm tồn tại rất lâu trong đất và nổi trên mặt nước ruộng để bám vào bẹ lúa.',
    favorableConditions:
      'Nhiệt độ nóng ẩm 28-32°C, cấy/gieo sạ quá dày, ruộng rậm rạp thiếu nắng và bón thừa đạm giai đoạn làm đòng.',
    preventionMethods:
      'Cày bừa kỹ, vớt sạch rác rơm rạ và bọt hạch nấm dồn về góc ruộng khi làm đất. Gieo cấy mật độ vừa phải (hiệu ứng hàng biên).',
    safeManagement:
      'Rút cạn nước phơi ruộng nứt chân chim nhẹ để hạ ẩm độ gốc lúa. Phun Validamycin hoặc Hexaconazole / Azoxystrobin hướng thẳng vòi xuống phần gốc bẹ lúa.',
    treatmentSteps: {
      immediate: [
        'Tạm thời tháo rút bớt nước mặt ruộng để hạ độ ẩm vùng gốc và bẹ lúa, ngừng bón phân đạm.',
        'Vạch gốc khóm lúa kiểm tra chiều cao vết bệnh: nếu đã bò lên quá 1/3 thân cây cần xử lý ngay.'
      ],
      biologicalAndCare: [
        'Phun chế phẩm sinh học Validamycin hoặc hoạt chất đặc trị nấm khô vằn, chỉnh béc phun hướng thẳng vào phần THÂN BẸ sát gốc (không chỉ phun lướt trên ngọn lá).',
        'Vụ sau vớt sạch bọt rơm rạ dạt ở góc bờ ruộng trước khi cấy để giảm nguồn hạch nấm.'
      ],
      caution: [
        'Phun thuốc không trúng vùng gốc bẹ nơi nấm đang bám thì hiệu quả phòng trừ sẽ rất thấp.'
      ]
    },
    references: 'Viện Khoa học Nông nghiệp Việt Nam (VAAS); IRRI Sheath Blight Protocol.',
    verificationStatus: 'verified',
    verifiedBy: 'Hội đồng Khoa học VAAS',
    standardCode: 'QCVN 01-37:2010/BNNPTNT',
    reviewDate: '2026-03-01',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/RiceSheathArk.jpg/330px-RiceSheathArk.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/RiceSheathArk.jpg/330px-RiceSheathArk.jpg',
        caption: 'Vết bệnh vằn da hổ đặc trưng trên bẹ thân cây lúa sát gốc',
        source: 'University of Arkansas / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Culture_of_soil_fungus_Thanatephorus_cucumeris_%28anamorphic_Rhizoctonia_solani%29.jpg/960px-Culture_of_soil_fungus_Thanatephorus_cucumeris_%28anamorphic_Rhizoctonia_solani%29.jpg',
        caption: 'Hệ sợi nấm và các hạch nấm nâu Rhizoctonia solani gây bệnh khô vằn',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-14T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_brown_spot',
    cropType: 'rice',
    vietnameseName: 'Bệnh Đốm nâu lúa (Tiêm lửa)',
    englishName: 'Rice Brown Spot',
    symptoms:
      'Các đốm tròn hoặc bầu dục nhỏ màu nâu sẫm rải rác khắp phiến lá, kích thước như hạt mè (vừng), khác với hình mắt én nhọn hai đầu của bệnh đạo ôn. Tâm vết lớn có thể chuyển xám nhạt với viền vàng nhẹ. Hạt lúa bị nhiễm chuyển màu nâu đen.',
    symptomChecklist: [
      'Đốm tròn/bầu dục đầu tù giống hạt vừng (KHÔNG nhọn hai đầu như bệnh đạo ôn).',
      'Màu nâu sẫm đồng đều, xung quanh có thể có quầng vàng mờ hẹp.',
      'Thường xảy ra đồng thời với biểu hiện lá lúa còi cọc vàng úa trên đất cát, đất chua phèn nghèo dinh dưỡng.'
    ],
    affectedPlantParts: ['leaf', 'fruit'],
    causes: 'Nấm Bipolaris oryzae (Cochliobolus miyabeanus), bùng phát mạnh khi cây lúa thiếu Kali, Silic hoặc đất chua phèn.',
    favorableConditions:
      'Đất cát pha nghèo hữu cơ vùng duyên hải miền Trung (Quảng Bình, Quảng Trị, Hà Tĩnh), đất phèn nhẹ hoặc ruộng thiếu nước kéo dài.',
    preventionMethods:
      'Xử lý ngâm ủ giống sạch bệnh, bón lót vôi khử chua, phân chuồng hoai mục và bón đủ Kali, Silic ngay từ đầu vụ.',
    safeManagement:
      'Giữ nước tưới ổn định không để ruộng nứt nẻ; bón bổ sung Kali và phân bón lá vi lượng để cây khỏe tự kháng bệnh trước khi cần dùng thuốc nấm.',
    treatmentSteps: {
      immediate: [
        'Cấp nước ẩm đều cho ruộng nếu đất đang bị khô hạn nứt nẻ hoặc phơi nắng quá mức.',
        'Kiểm tra lại lịch bón phân xem ruộng có đang bị thiếu Lân, Kali hoặc bị ngộ độc phèn hay không.'
      ],
      biologicalAndCare: [
        'Bón bổ sung phân Kali và phân bón giàu Silic/vi lượng giúp cây phục hồi bộ rễ và lá mới.',
        'Nếu tỷ lệ đốm bệnh vượt 20% diện tích lá ở giai đoạn đòng trỗ, có thể phun bổ trợ thuốc trừ nấm phổ rộng được phép sử dụng.'
      ],
      caution: [
        'Không nhầm đốm nâu hạt vừng với đạo ôn để tránh xử lý sai (cắt phân khi cây thực chất đang đói dinh dưỡng sẽ làm đốm nâu nặng hơn).'
      ]
    },
    references: 'Viện KHKT Nông nghiệp Bắc Trung Bộ (ASIR); IRRI Rice Brown Spot Guide.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện ASIR & IRRI',
    standardCode: 'IRRI SES Standard',
    reviewDate: '2026-03-02',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Bipolaris_oryzae.jpg/500px-Bipolaris_oryzae.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Bipolaris_oryzae.jpg/500px-Bipolaris_oryzae.jpg',
        caption: 'Các đốm tròn bầu dục màu nâu sẫm giống hạt mè trên phiến lá lúa',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Cochliobolus_miyabeanus.jpg/960px-Cochliobolus_miyabeanus.jpg',
        caption: 'Vết đốm nâu có viền vàng nhạt lan dày trên lá lúa già',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Bipolaris_oryzae_173160073.jpg/960px-Bipolaris_oryzae_173160073.jpg',
        caption: 'Bào tử nấm Bipolaris oryzae dưới kính hiển vi kiểm chứng',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-18T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_false_smut',
    cropType: 'rice',
    vietnameseName: 'Bệnh Hoa cúc / Than đen hạt lúa (False Smut)',
    englishName: 'Rice False Smut',
    symptoms:
      'Chỉ biểu hiện rõ khi lúa vào chắc: từng hạt lúa riêng lẻ trên bông biến thành khối u tròn to gấp 2-3 lần hạt bình thường. Ban đầu khối u bọc màng trắng rồi vỡ ra khối phấn nhung màu vàng cam rực rỡ, sau chuyển sang màu xanh đen đậm.',
    symptomChecklist: [
      'Hạt lúa phồng to thành cục tròn mềm phủ lớp bột nhung màu vàng cam rực rỡ rồi chuyển xanh đen.',
      'Bụi phấn bào tử bám bẩn ra các hạt lúa lành xung quanh.',
      'Thường xuất hiện rải rác trên ruộng lúa tốt bời bời, bón dư đạm cuối vụ.'
    ],
    affectedPlantParts: ['fruit'],
    causes: 'Nấm Ustilaginoidea virens (Villosiclava virens). Xâm nhập vào hoa lúa giai đoạn đòng sắp trỗ.',
    favorableConditions:
      'Thời tiết mưa phùn âm u kéo dài đúng lúc lúa trỗ phơi màu (24-30°C), ẩm độ >90%, bón thừa phân đạm muộn.',
    preventionMethods:
      'Không lấy giống từ ruộng bị bệnh hoa cúc. Bón phân cân đối, dứt đạm sớm trước khi lúa làm đòng hoàn toàn.',
    safeManagement:
      'Ngắt nhẹ các bông có hạt hóa đen cho vào túi nilon kín mang ra khỏi ruộng (tránh giũ rơi bột nấm xuống đất cho vụ sau). Vụ tới cần phun phòng ở giai đoạn trước khi lúa trỗ 5-7 ngày (đòng già ôm bắp).',
    treatmentSteps: {
      immediate: [
        'Khi phát hiện hạt hóa khối phấn vàng cam/đen trên bông lúc lúa sắp gặt, dùng túi nilon chụp nhẹ từ trên xuống ngắt bỏ mang đi tiêu hủy (không bóp vỡ tại ruộng).'
      ],
      biologicalAndCare: [
        'Vụ sau xử lý hạt giống sạch trước khi gieo và cày vùi sâu rơm rạ kết hợp vôi bột để tiêu diệt hạch nấm lưu tồn.',
        'Nếu khu vực thường xuyên bị bệnh hoa cúc, phun phòng nấm lúc lúa đang làm đòng già (trước trỗ 5-7 ngày).'
      ],
      caution: [
        'Khi hạt đã biến thành khối bột vàng đen ngoài bông lúa thì mọi thuốc phun đều KHÔNG chữa được hạt đó nữa; hạt nhiễm bệnh có thể chứa độc tố nấm, không dùng làm thức ăn chăn nuôi.'
      ]
    },
    references: 'Viện Nghiên cứu Lúa Quốc tế (IRRI); Viện Bảo vệ Thực vật Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'IRRI Diagnostic Reference',
    reviewDate: '2026-03-07',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Rice_false_smut.jpg/960px-Rice_false_smut.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Rice_false_smut.jpg/960px-Rice_false_smut.jpg',
        caption: 'Hạt lúa biến thành khối u phấn nhung màu vàng cam đến xanh đen',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/U.Virens.jpg/960px-U.Virens.jpg',
        caption: 'Nhiều hạt trên bông lúa bị biến dạng do nấm bệnh hoa cúc',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Ustilaginoidea_virens_20151031-2.jpg/960px-Ustilaginoidea_virens_20151031-2.jpg',
        caption: 'Khối bào tử Ustilaginoidea virens giai đoạn chín chuyển màu đen sẫm',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-05T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_bacterial_leaf_streak',
    cropType: 'rice',
    vietnameseName: 'Bệnh Sọc trong vi khuẩn hại lúa (Bacterial Leaf Streak)',
    englishName: 'Rice Bacterial Leaf Streak',
    symptoms:
      'Trên phiến lá xuất hiện các vệt sọc rất mảnh, hẹp chạy dọc giữa hai gân lá chính. Ban đầu sọc có màu xanh đậm trong mờ như thấm nước khi soi ngược ánh sáng, sau chuyển vàng cam rồi nâu khô. Sáng sớm có nhiều giọt dịch vi khuẩn nhỏ li ti dọc theo sọc.',
    symptomChecklist: [
      'Vệt sọc hẹp chạy thẳng theo gân lá (khác với bạc lá cháy lan thành mảng gợn sóng từ mép lá).',
      'Giơ lá ngược lên ánh nắng thấy các vệt sọc trong mờ như thấm nước.',
      'Khi nắng lên, giọt dịch vi khuẩn khô lại thành hạt cườm nhỏ màu vàng cam bám trên mặt lá.'
    ],
    affectedPlantParts: ['leaf'],
    causes: 'Vi khuẩn Xanthomonas oryzae pv. oryzicola, xâm nhập qua khí khổng trên toàn mặt lá.',
    favorableConditions:
      'Mùa Hè Thu / Mùa gió mạnh mưa giông làm lá cọ xát, nhiệt độ cao 28-34°C, ẩm độ bão hòa và bón thừa đạm.',
    preventionMethods:
      'Sử dụng hạt giống sạch bệnh (xử lý nước nóng 54°C hoặc thuốc xử lý hạt). Không gieo sạ quá dày.',
    safeManagement:
      'Ngừng bón phân đạm ngay, rút nước ruộng hợp lý và sử dụng chế phẩm kháng khuẩn sinh học tương tự quy trình phòng trừ bạc lá.',
    treatmentSteps: {
      immediate: [
        'Dừng bón đạm và phân bón lá đạm cao ngay khi thấy sọc trong trên lá.',
        'Hạn chế đi lại làm xây xát lá lúa vào sáng sớm khi còn ướt sương.'
      ],
      biologicalAndCare: [
        'Phun chế phẩm kháng khuẩn sinh học hoặc hoạt chất đặc trị vi khuẩn ngay khi bệnh mới chớm 5-10% số lá.',
        'Bổ sung nhẹ phân Kali để lá đứng cứng và mau phục hồi.'
      ],
      caution: [
        'Rất dễ nhầm với bệnh đạo ôn giai đoạn đầu hoặc thiếu chất; hãy soi lá ngược sáng tìm vệt trong mờ và hạt cườm dịch khuẩn.'
      ]
    },
    references: 'IRRI Bacterial Leaf Streak Compendium; Viện Bảo vệ Thực vật Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'IRRI & Viện BVTV Việt Nam',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
    reviewDate: '2026-03-07',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Cruz_Xoc_penya.jpg/500px-Cruz_Xoc_penya.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Cruz_Xoc_penya.jpg/500px-Cruz_Xoc_penya.jpg',
        caption: 'Các vệt sọc mảnh chạy dọc giữa gân lá trong mờ như thấm nước',
        source: 'IRRI / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Xoc_dia.jpg/500px-Xoc_dia.jpg',
        caption: 'Sọc vàng cam liên kết dọc phiến lá kèm dịch vi khuẩn khô',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/9H-XOC_%2851816944053%29.jpg/960px-9H-XOC_%2851816944053%29.jpg',
        caption: 'Quan sát vệt sọc trong mờ trên phiến lá lúa dưới ánh sáng',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-08T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_bakanae',
    cropType: 'rice',
    vietnameseName: 'Bệnh Lúa von (Cây cao vống thối gốc - Bakanae)',
    englishName: 'Rice Bakanae Disease',
    symptoms:
      'Cây lúa bệnh mọc vống cao vọt hơn hẳn khóm lúa khỏe xung quanh (gấp 1.5 lần), thân mảnh, lá màu xanh nhạt vàng úa. Các đốt thân phía trên mọc ra rễ phụ tua tủa, phần gốc thân bị thối khô và phủ lớp phấn nấm màu trắng hồng nhạt.',
    symptomChecklist: [
      'Cây lúa vọt cao bất thường vượt hẳn lên khỏi mặt ruộng nhưng thân ốm yếu, lá xanh vàng nhợt.',
      'Rễ phụ mọc ra nhiều từ các đốt thân ở trên cao.',
      'Gốc thân gần mặt nước thối mục và thường có lớp tơ phấn màu trắng phớt hồng.'
    ],
    affectedPlantParts: ['stem', 'leaf'],
    causes: 'Nấm Fusarium fujikuroi (Gibberella fujikuroi). Nấm tiết chất kích thích sinh trưởng Gibberellin làm cây vống cao rồi chết rụi.',
    favorableConditions:
      'Hạt giống nhiễm bào tử nấm không được xử lý kỹ khi ngâm ủ; thời tiết ấm 28-35°C.',
    preventionMethods:
      'Chọn giống xác nhận sạch bệnh, xử lý hạt giống kỹ bằng nước muối 15% vớt bỏ hạt lửng và ngâm thuốc trừ nấm trước khi ủ.',
    safeManagement:
      'Nhổ bỏ ngay toàn bộ khóm lúa von mang ra khỏi ruộng tiêu hủy trước khi nấm phát tán phấn hồng sang bông lúa khỏe bên cạnh.',
    treatmentSteps: {
      immediate: [
        'Nhổ bỏ tận gốc toàn bộ các khóm lúa mọc vọt cao bất thường trên ruộng, bỏ vào bao mang ra khỏi bờ ruộng tiêu hủy.'
      ],
      biologicalAndCare: [
        'Tuyệt đối không để lúa trên ruộng có nhiều lúa von làm hạt giống cho vụ sau.',
        'Vụ sau phải xử lý hạt giống bằng nước nóng 54°C trong 15 phút hoặc chế phẩm xử lý giống trước khi ngâm ủ.'
      ],
      caution: [
        'Không chờ đến khi lúa trỗ mới nhổ vì lớp phấn bào tử màu hồng ở gốc cây von sẽ bay vào bám lên hạt lúa khỏe và lây sang cả vụ sau.'
      ]
    },
    references: 'JIRCAS Bakanae Research; Viện Lúa ĐBSCL & Viện BVTV Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'JIRCAS & Viện Bảo vệ Thực vật',
    standardCode: 'IRRI Seed Health Standard',
    reviewDate: '2026-03-07',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Bakanae_Disease_sporulation_JIRCAS.jpg/960px-Bakanae_Disease_sporulation_JIRCAS.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Bakanae_Disease_sporulation_JIRCAS.jpg/960px-Bakanae_Disease_sporulation_JIRCAS.jpg',
        caption: 'Lớp phấn bào tử nấm màu trắng hồng phát triển trên bẹ thân lúa von',
        source: 'JIRCAS / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Gibberella_fujikuroi.jpg/960px-Gibberella_fujikuroi.jpg',
        caption: 'Nấm Gibberella fujikuroi (Fusarium fujikuroi) gây vọt thân và thối gốc lúa',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-09T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_tungro',
    cropType: 'rice',
    vietnameseName: 'Bệnh Vàng lùn / Tungro & Rầy xanh đuôi đen hại lúa',
    englishName: 'Rice Tungro Virus & Green Leafhopper',
    symptoms:
      'Khóm lúa bị lùn thấp còi cọc rõ rệt, đẻ nhánh ít. Lá non và lá bánh tẻ chuyển sang màu vàng da cam rực từ chóp lá lan dần xuống, đôi khi hơi xoắn nhẹ. Quan sát trên ruộng thấy rầy xanh đuôi đen bay rộ.',
    symptomChecklist: [
      'Bụi lúa lùn thấp hẳn xuống so với khóm bên cạnh.',
      'Lá chuyển màu vàng cam sáng từ chóp xuống dưới (khác với vàng lá do thiếu nước hoặc nghẹt rễ thường vàng lá già dưới gốc trước).',
      'Thấy nhiều rầy xanh có chấm đen ở chóp cánh (rầy xanh đuôi đen) bám hút nhựa trên lá.'
    ],
    affectedPlantParts: ['leaf', 'stem'],
    causes: 'Phức hợp virus Tungro (hoặc virus Lùn xoắn lá/Vàng lùn) do côn trùng môi giới rầy xanh đuôi đen (Nephotettix virescens) và rầy nâu truyền lan.',
    favorableConditions:
      'Gieo cấy không đồng loạt (lúa nhiều trà đan xen), ruộng có nhiều cỏ dại bờ mương làm nơi trú ngụ cho rầy truyền virus.',
    preventionMethods:
      'Áp dụng gieo sạ đồng loạt, "né rầy" theo lịch khuyến cáo của Chi cục BVTV địa phương; làm sạch cỏ lồng vực, cỏ gạo quanh bờ ruộng.',
    safeManagement:
      'Nhổ vùi ngay các khóm lúa bị vàng lùn còi cọc xuống bùn nếu tỷ lệ thấp, đồng thời trừ rầy xanh/rầy nâu kịp thời để không truyền virus sang ruộng lân cận.',
    treatmentSteps: {
      immediate: [
        'Kiểm tra xem ruộng có rầy xanh đuôi đen hoặc rầy nâu đang chích hút truyền bệnh không.',
        'Nếu ruộng chỉ nhiễm rải rác vài khóm, nhổ vùi sâu xuống bùn ngay lập tức.'
      ],
      biologicalAndCare: [
        'Phun chế phẩm trừ rầy môi giới theo khuyến cáo nếu mật độ rầy cao để chặn lây lan virus.',
        'Báo Trạm Khuyến nông/BVTV xã để kiểm tra diện rộng nếu nhiều ruộng xuất hiện triệu chứng lùn vàng đồng loạt.'
      ],
      caution: [
        'Bệnh do VIRUS không có thuốc chữa khỏi cây đã nhiễm — tuyệt đối không mua phân kích thích hay thuốc nấm phun vào cây đã vàng lùn vì chỉ tốn tiền.'
      ]
    },
    references: 'IRRI Rice Tungro Diagnostic Manual; Cục Bảo vệ Thực vật Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'IRRI & Cục BVTV Việt Nam',
    standardCode: 'Quy trình phòng chống Vàng lùn - Lùn xoắn lá',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Rice_plants_affected_by_tungro_disease1.jpg/960px-Rice_plants_affected_by_tungro_disease1.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Rice_plants_affected_by_tungro_disease1.jpg/960px-Rice_plants_affected_by_tungro_disease1.jpg',
        caption: 'Khóm lúa còi cọc, lá chuyển màu vàng cam rực do nhiễm virus Tungro',
        source: 'IRRI / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Green_leafhopper_%28Nephotettix_virescens%29_UGA5190052.jpg/500px-Green_leafhopper_%28Nephotettix_virescens%29_UGA5190052.jpg',
        caption: 'Rầy xanh đuôi đen (Nephotettix virescens) - côn trùng chính truyền bệnh Tungro',
        source: 'Bugwood.org / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Fmicb-09-03235-g008.jpg/960px-Fmicb-09-03235-g008.jpg',
        caption: 'So sánh cây lúa nhiễm bệnh lùn vàng và khóm lúa khỏe đối chứng',
        source: 'Frontiers / Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-11T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_brown_planthopper',
    cropType: 'rice',
    vietnameseName: 'Rầy nâu hại lúa & Cháy rầy (Brown Planthopper)',
    englishName: 'Rice Brown Planthopper (Hopperburn)',
    symptoms:
      'Rầy nâu trưởng thành và rầy cám màu nâu sống tụ tập dày đặc ở phần gốc thân lúa sát mặt nước, chích hút nhựa cây. Khi mật độ cao, khóm lúa vàng héo khô rụi nhanh chóng tạo thành các vệt tròn "cháy rầy" lan rộng giữa ruộng.',
    symptomChecklist: [
      'Vạch gốc khóm lúa thấy rất nhiều rầy nhỏ màu nâu bám sát bẹ thân trên mặt nước hoặc nhảy rào rào xuống nước.',
      'Thân lúa sát gốc có vết đen nhũn hoặc lớp muội đen do mật ngọt của rầy tiết ra.',
      'Ruộng lúa xuất hiện từng chòm hình tròn héo cháy vàng nâu ("cháy rầy").'
    ],
    affectedPlantParts: ['stem', 'leaf'],
    causes: 'Rầy nâu (Nilaparvata lugens), sinh sản cực nhanh và truyền bệnh virus vàng lùn - lùn xoắn lá.',
    favorableConditions:
      'Ruộng gieo sạ dày, bón thừa đạm, phun thuốc trừ sâu phổ rộng quá sớm làm chết hết thiên địch (nhện, bọ xít mù xanh).',
    preventionMethods:
      'Công nghệ sinh thái "bờ hoa" thu hút thiên địch; không phun thuốc trừ sâu hóa học trong 40 ngày đầu sau sạ để bảo vệ nhện bắt mồi.',
    safeManagement:
      'Dâng mực nước ruộng lên ngập một phần gốc nếu cây còn nhỏ (hoặc vạch hàng lúa), phun thuốc đặc trị rầy (như Pymetrozine, Dinotefuran hoặc nấm xanh Metarhizium) hướng thẳng vòi xuống GỐC LÚA.',
    treatmentSteps: {
      immediate: [
        'Vạch gốc 5-10 khóm lúa ở nhiều điểm để đếm mật độ rầy non (rầy cám tuổi 1-2 là lúc dễ diệt nhất).',
        'Nếu ruộng chuẩn bị vào giai đoạn chín sắp thu hoạch bị cháy rầy chòm, giữ nước và thu hoạch sớm tránh đổ ngã.'
      ],
      biologicalAndCare: [
        'Khi rầy cám nở rộ (mật độ >1.500 con/m² hoặc >20 con/khóm), phun thuốc đặc trị rầy hoặc chế phẩm nấm xanh Metarhizium; phải rẽ hàng và chĩa vòi phun xuống GỐC LÚA.',
        'Dâng mực nước ruộng khoảng 5-7 cm trong lúc phun để dồn rầy leo lên cao dễ tiếp xúc thuốc.'
      ],
      caution: [
        'Phun lướt trên ngọn lá không tới gốc sẽ không diệt được rầy nâu mà còn làm rầy kháng thuốc mạnh hơn.'
      ]
    },
    references: 'Viện Bảo vệ Thực vật Việt Nam; IRRI & CSIRO Rice Planthopper Manual.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện BVTV Việt Nam & IRRI',
    standardCode: 'QCVN 01-38:2010/BNNPTNT (Điều tra dịch hại lúa)',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg/960px-Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg/960px-Nilaparvata_lugens_-_Brown_planthopper_-_UGA5190055.jpg',
        caption: 'Rầy nâu Nilaparvata lugens bám chích hút nhựa ở phần bẹ gốc lúa',
        source: 'Bugwood.org / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Rice_damage_caused_by_planthoppers_in_Ikaruga_-_Sep_24%2C_2020.jpg/500px-Rice_damage_caused_by_planthoppers_in_Ikaruga_-_Sep_24%2C_2020.jpg',
        caption: 'Hiện tượng "cháy rầy" thành từng chòm vàng héo rụi trên ruộng lúa',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-12T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_yellow_stem_borer',
    cropType: 'rice',
    vietnameseName: 'Sâu đục thân lúa 2 chấm (Yellow Stem Borer)',
    englishName: 'Rice Yellow Stem Borer',
    symptoms:
      'Giai đoạn đẻ nhánh: sâu non đục vào bên trong nõn thân làm dảnh lúa giữa bị héo vàng gọi là "dảnh héo" (dùng tay rút nhẹ nõn thấy tuột ra và gốc nõn thối có sâu). Giai đoạn trỗ bông: gây hiện tượng "bông bạc" dựng đứng, hạt lép trắng hoàn toàn.',
    symptomChecklist: [
      'Cây lúa bị héo nõn giữa trong khi các lá bẹ ngoài vẫn còn xanh ("dảnh héo").',
      'Rút nhẹ nõn héo hoặc bông bạc thấy tuột rất dễ và có lỗ đục tròn nhỏ trên thân kèm phân sâu.',
      'Thấy bướm ngài màu vàng rơm có 2 chấm đen rõ trên cánh trước đậu trên lá lúa.'
    ],
    affectedPlantParts: ['stem', 'other'],
    causes: 'Sâu non của loài ngài bướm hai chấm Scirpophaga incertulas. Ngài cái đẻ ổ trứng có lớp lông màu vàng nâu trên mặt lá gần chóp.',
    favorableConditions:
      'Giao mùa vụ Xuân sang Hè Thu, ruộng cấy xanh tốt rậm rạp, vùng có nhiều ruộng gieo cấy lệch trà.',
    preventionMethods:
      'Cày ải ngâm dầm gốc rạ sau thu hoạch để diệt nhộng sâu nằm trong gốc rạ. Dùng bẫy đèn theo dõi cao điểm bướm ra.',
    safeManagement:
      'Ngắt ổ trứng màu vàng nâu ở gần chóp lá khi thăm đồng. Khi mật độ ổ trứng cao vào lúc lúa làm đòng - trỗ thấp thoáng, phun chế phẩm sinh học Bt / Emamectin đúng cao điểm sâu non mới nở trước khi chui vào thân.',
    treatmentSteps: {
      immediate: [
        'Đi dọc bờ ruộng ngắt tiêu hủy các ổ trứng có lông vàng nâu bám trên phiến lá và nhổ dảnh héo có sâu.',
        'Xác định giai đoạn cây lúa: nếu lúa đang làm đòng đến trỗ thấp thoáng là thời điểm nhạy cảm nhất gây bông bạc.'
      ],
      biologicalAndCare: [
        'Phun chế phẩm trừ sâu sinh học hoặc hoạt chất có tính lưu dẫn cao đúng thời điểm bướm nở rộ 5-7 ngày (khi sâu non mới nở đang bò tìm chỗ đục vào thân).',
        'Vụ sau cắt sát gốc rạ và cày vùi ngập nước diệt nhộng.'
      ],
      caution: [
        'Khi bông đã trỗ ra và hóa bạc trắng thì sâu đã đục đứt cuống bông bên trong thân — lúc này phun thuốc không cứu lại được bông bạc nữa.'
      ]
    },
    references: 'Cục Bảo vệ Thực vật Việt Nam; IRRI Stem Borer Management.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'QCVN 01-38:2010/BNNPTNT',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Rice_yellow_stem_borer.jpg/960px-Rice_yellow_stem_borer.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Rice_yellow_stem_borer.jpg/960px-Rice_yellow_stem_borer.jpg',
        caption: 'Bướm sâu đục thân 2 chấm với hai chấm đen đặc trưng trên cánh vàng rơm',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Scirpophaga_incertulas_-_moth.jpg/960px-Scirpophaga_incertulas_-_moth.jpg',
        caption: 'Ngài trưởng thành Scirpophaga incertulas đậu trên tán lá lúa tìm nơi đẻ trứng',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-13T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_leaf_folder',
    cropType: 'rice',
    vietnameseName: 'Sâu cuốn lá nhỏ hại lúa (Rice Leaffolder)',
    englishName: 'Rice Leaffolder',
    symptoms:
      'Sâu non nhả tơ dính hai mép lá lúa cuộn tròn lại thành ống dài, ẩn bên trong gặm sạch phần diệp lục xanh chỉ chừa lại lớp biểu bì trắng mỏng. Cả ruộng nhìn từ xa có màu trắng xám xơ xác khi mật độ sâu cao.',
    symptomChecklist: [
      'Lá lúa bị cuộn dọc thành ống tròn bằng tơ mịn.',
      'Bên trong ống lá có sâu nhỏ màu xanh lục nhạt kèm phân sâu; phần lá bị ăn chỉ còn vệt trắng mờ.',
      'Bướm nhỏ màu vàng nâu viền cánh đen bay lượn rợp mặt ruộng khi chạm vào tán lúa.'
    ],
    affectedPlantParts: ['leaf'],
    causes: 'Sâu non loài bướm Cnaphalocrocis medinalis.',
    favorableConditions:
      'Ruộng bón thừa phân đạm lá xanh non mượt, thời tiết mát có mưa xen nắng, giai đoạn lúa đẻ nhánh rộ đến làm đòng.',
    preventionMethods:
      'Bón phân cân đối không để lá lúa quá xanh rậm; bảo vệ ong mắt đỏ và bọ xít ăn thịt trên ruộng (không phun thuốc trừ sâu quá sớm).',
    safeManagement:
      'Giai đoạn lúa đẻ nhánh dưới 40 ngày nếu lá bị cuốn nhẹ có thể tự bù được không cần phun. Chỉ phun thuốc sinh học (Bt, Abamectin, Emamectin) khi sâu non tuổi 1-2 nở rộ đạt ngưỡng (>20 con/m² giai đoạn làm đòng - bảo vệ 3 lá đòng).',
    treatmentSteps: {
      immediate: [
        'Mở thử 10 ống lá cuốn để kiểm tra xem bên trong còn sâu non sống hay sâu đã hóa nhộng/bỏ đi.',
        'Đếm mật độ sâu trên 1 m² và xác định lúa đang ở giai đoạn đẻ nhánh hay làm đòng.'
      ],
      biologicalAndCare: [
        'Nếu lúa ở giai đoạn làm đòng - trỗ (cần bảo vệ bộ lá đòng) và có nhiều sâu non tuổi nhỏ 1-2, phun chế phẩm sinh học Bt hoặc Emamectin vào sáng sớm hoặc chiều mát.',
        'Nếu lúa còn non dưới 35 ngày và mật độ thấp, giữ nước cân đối để cây tự ra lá mới, tiết kiệm tiền thuốc.'
      ],
      caution: [
        'Không phun thuốc khi sâu đã thành bướm bay rộ hoặc đã làm nhộng trong bao lá; tránh lạm dụng thuốc làm bùng phát rầy nâu cuối vụ.'
      ]
    },
    references: 'Cục Bảo vệ Thực vật Việt Nam; Chương trình IPM 3 Giảm 3 Tăng.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'Quy trình IPM Lúa Quốc gia',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Rice_Leaf_Roller.JPG/500px-Rice_Leaf_Roller.JPG',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Rice_Leaf_Roller.JPG/500px-Rice_Leaf_Roller.JPG',
        caption: 'Ngài bướm sâu cuốn lá nhỏ Cnaphalocrocis medinalis trên lá lúa',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Cnaphalocrocis_medinalis.jpg/960px-Cnaphalocrocis_medinalis.jpg',
        caption: 'Đặc điểm vạch nâu sẫm trên cánh bướm sâu cuốn lá nhỏ hại lúa',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Cnaphalocrocis_medinalis_2.jpg/960px-Cnaphalocrocis_medinalis_2.jpg',
        caption: 'Cận cảnh hình thái ngài trưởng thành đẻ trứng mặt trên lá lúa',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-14T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'rice_golden_apple_snail',
    cropType: 'rice',
    vietnameseName: 'Ốc bươu vàng hại lúa non (Golden Apple Snail)',
    englishName: 'Golden Apple Snail in Rice',
    symptoms:
      'Ốc bươu vàng cắn ngang thân mạ và lúa mới sạ/cấy dưới mặt nước vào ban đêm và sáng sớm, tạo ra các khoảng trống mất cây loang lổ trên mặt ruộng. Trên bờ cỏ, cọc tre hoặc thân lúa nhô khỏi mặt nước có các chùm trứng màu hồng cánh sen rực rỡ.',
    symptomChecklist: [
      'Ruộng lúa mới gieo cấy bị khuyết từng khoảng lớn, thấy thân mạ đứt ngang nổi lềnh bềnh trên mặt nước.',
      'Chùm trứng màu hồng cánh sen tươi bám trên thân lúa, cọc tre hoặc cỏ bờ ruộng.',
      'Chiều mát hoặc sáng sớm thấy nhiều ốc vỏ vàng nâu bò dưới lớp nước nông.'
    ],
    affectedPlantParts: ['stem', 'leaf'],
    causes: 'Ốc bươu vàng (Pomacea canaliculata), loài ngoại lai sinh sản cực nhanh và phàm ăn mạ non.',
    favorableConditions:
      'Ruộng mới gieo sạ hoặc mới cấy 1-20 ngày bị ngập nước sâu liên tục sau mưa.',
    preventionMethods:
      'Đặt lưới chắn ở cống dẫn nước vào ruộng để ngăn ốc theo nước tràn vào. Làm rãnh thoát nước quanh ruộng và thả vịt chạy đồng bắt ốc con trước khi cấy.',
    safeManagement:
      'Rút nước ruộng nông xăm xắp bùn để ốc không di chuyển được; cắm cọc tre dọc bờ thu hút ốc đẻ trứng rồi thu gom tiêu hủy trứng hồng hàng ngày; bắt tay vào sáng sớm hoặc chiều mát.',
    treatmentSteps: {
      immediate: [
        'Tháo rút nước ruộng chỉ để xâm xấp mặt bùn hoặc khơi rãnh dồn ốc tập trung xuống rãnh để nhặt tay.',
        'Đập nát hoặc gom toàn bộ các ổ trứng màu hồng cánh sen bám trên cỏ bờ và thân cây cho gà vịt ăn.'
      ],
      biologicalAndCare: [
        'Cắm cành đu đủ, lá khoai mì hoặc vỏ mít rải dọc rãnh ruộng để dẫn dụ ốc tụ lại rồi bắt bỏ thủ công.',
        'Dặm bổ sung mạ ở các khoảng trống, đặt lưới chắn mắt nhỏ tại cửa lấy nước đầu ruộng.'
      ],
      caution: [
        'Hạn chế rải bừa bãi hóa chất diệt ốc nồng độ cao xuống ruộng ngập nước vì dễ làm chết cá, cua đồng và gây ngộ độc rễ mạ non.'
      ]
    },
    references: 'Cục Bảo vệ Thực vật Việt Nam; FAO Golden Apple Snail Management.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'TCVN Phòng trừ Ốc bươu vàng',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg/960px-A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg/960px-A_golden_apple_snail_%28Pomacea_canaliculata%29_freshly_collected_from_rice_fields_in_rural_Hunan%2C_China.jpg',
        caption: 'Ốc bươu vàng trưởng thành thu tại ruộng lúa gây cắn đứt mạ non',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Eggs_of_Golden_apple_snails_%28Pomacea_canaliculata%29_collected_in_rice_paddies%2C_Hunan_Province%2C_China._Photo_by_Linda_Wong.jpg/960px-Eggs_of_Golden_apple_snails_%28Pomacea_canaliculata%29_collected_in_rice_paddies%2C_Hunan_Province%2C_China._Photo_by_Linda_Wong.jpg',
        caption: 'Ổ trứng màu hồng cánh sen đặc trưng của ốc bươu vàng bám trên thân lúa',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-15T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },

  // ==========================================
  // 3. CÂY LẠC / ĐẬU PHỘNG (10 BỆNH / DỊCH HẠI)
  // ==========================================
  {
    id: 'peanut_leaf_spot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Đốm nâu sớm lá lạc (Early Leaf Spot)',
    englishName: 'Peanut Early Leaf Spot',
    symptoms:
      'Xuất hiện sớm từ 30-45 ngày sau gieo: các đốm tròn màu nâu nhạt đến nâu đỏ trên mặt trên lá, xung quanh có quầng vàng sáng rất rõ nét. Bệnh nặng làm lá vàng sớm và rụng hàng loạt từ gốc lên.',
    symptomChecklist: [
      'Vết đốm hình tròn màu nâu đỏ hoặc nâu sáng ở mặt trên lá.',
      'Đặc trưng có VIỀN QUẦNG VÀNG SÁNG rộng bao quanh vết đốm.',
      'Thường xuất hiện sớm từ giai đoạn lạc ra hoa đến đâm tia.'
    ],
    affectedPlantParts: ['leaf', 'stem'],
    causes: 'Nấm Passalora arachidicola (Cercospora arachidicola). Bào tử lưu tồn trong tàn dư thân lá lạc vụ trước.',
    favorableConditions:
      'Thời tiết ấm 24-28°C, mưa ẩm kéo dài hoặc sương mù đêm nhiều trong vụ Xuân vùng Bắc Trung Bộ.',
    preventionMethods:
      'Luân canh lạc với lúa nước hoặc ngô ít nhất 2 vụ. Thu gom đốt tàn dư thân lá lạc sau thu hoạch. Chọn giống chống chịu khá như L14, L26.',
    safeManagement:
      'Bón vôi bột lúc gieo và đâm tia giúp cây cứng khỏe. Khi bệnh mới xuất hiện ở lá gốc, phun chế phẩm sinh học hoặc hoạt chất trừ nấm được cấp phép theo nguyên tắc 4 đúng.',
    treatmentSteps: {
      immediate: [
        'Kiểm tra các lá già tầng gốc xem tỷ lệ đốm nâu có vượt 10-15% số lá hay không.',
        'Khơi rãnh thoát nước nếu ruộng lạc bị úng ẩm sau mưa.'
      ],
      biologicalAndCare: [
        'Phun chế phẩm sinh học hoặc thuốc trừ nấm (như Azoxystrobin, Difenoconazole hoặc gốc đồng sinh học) kịp thời khi bệnh bắt đầu leo lên tầng lá giữa.',
        'Bón bổ sung vôi bột và Kali giai đoạn đâm tia để tăng sức đề kháng thành tế bào lá.'
      ],
      caution: [
        'Không chờ đến khi lá gốc rụng trụi hết mới phun thuốc vì lúc đó củ lạc sẽ bị lép nặng không chắc hạt.'
      ]
    },
    references: 'Viện Khoa học Nông nghiệp Bắc Trung Bộ (ASIR); MycoKeys Passalora Monograph.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện ASIR & Viện Di truyền Nông nghiệp',
    standardCode: 'Quy trình thâm canh Lạc Nghệ An',
    reviewDate: '2026-03-02',
    sampleImageUrl: '/images/peanut_leaf_spot.jpg',
    galleryImages: [
      {
        url: '/images/peanut_leaf_spot.jpg',
        caption: 'Vết đốm lá trên cây lạc mẫu thực địa Bắc Trung Bộ',
        source: 'Viện ASIR (Mẫu kiểm chứng)'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Passalora_arachidicola_%2810.3897-mycokeys.81.67850%29_Figure_16.jpg/960px-Passalora_arachidicola_%2810.3897-mycokeys.81.67850%29_Figure_16.jpg',
        caption: 'Vết đốm nâu sớm Passalora arachidicola với quầng vàng rõ ở mặt trên lá lạc',
        source: 'MycoKeys / Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-11T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_late_leaf_spot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Đốm đen muộn lá lạc (Late Leaf Spot)',
    englishName: 'Peanut Late Leaf Spot',
    symptoms:
      'Xuất hiện muộn hơn (từ 50 ngày trở đi) nhưng tàn phá rất nhanh: đốm tròn màu nâu sẫm đến đen tuyền trên cả hai mặt lá (rất rõ ở mặt dưới lá), quầng vàng mờ hoặc không có. Bệnh làm rụng trụi toàn bộ tán lá chỉ trong thời gian ngắn trước thu hoạch.',
    symptomChecklist: [
      'Đốm tròn màu ĐEN TUYỀN hoặc nâu đen sẫm, thường nhỏ hơn đốm sớm nhưng dày đặc.',
      'Quầng vàng bên ngoài mờ nhạt hoặc gần như không có.',
      'Mặt dưới lá sờ hơi gồ do khối bào tử nấm màu đen mọc dày đặc.'
    ],
    affectedPlantParts: ['leaf', 'stem'],
    causes: 'Nấm Nothopassalora personata (Cercosporidium personatum). Lây lan cực nhanh cuối vụ qua gió và giọt mưa bắn.',
    favorableConditions:
      'Ẩm độ không khí cao kéo dài giai đoạn lạc vào chắc củ đến sắp thu hoạch (25-30°C).',
    preventionMethods:
      'Vệ sinh sạch đồng ruộng, luân canh với cây trồng khác họ đậu, gieo mật độ hợp lý tránh giao tán quá rậm.',
    safeManagement:
      'Theo dõi ruộng từ ngày 45 sau gieo; phun phòng trừ ngay khi phát hiện đốm đen rải rác ở lá tầng dưới để giữ xanh bộ lá nuôi củ chắc.',
    treatmentSteps: {
      immediate: [
        'Soi mặt dưới các lá gần gốc để phân biệt đốm đen sẫm không quầng vàng với đốm nâu sớm.',
        'Nếu cây đã đến sát kỳ thu hoạch (<10 ngày) và rụng lá nặng thì tiến hành thu hoạch kịp thời, không phun thuốc hóa học.'
      ],
      biologicalAndCare: [
        'Giai đoạn lạc đang tạo củ (50-80 ngày sau gieo), phun phòng bằng thuốc đặc trị nấm đốm lá hoặc gốc đồng/lưu huỳnh an toàn, chú ý phun phủ cả mặt dưới lá.',
        'Thu gom sạch thân lá lạc sau nhổ để cắt nguồn nấm cho vụ sau.'
      ],
      caution: [
        'Bệnh đốm đen gây rụng lá nhanh gấp đôi đốm sớm; cần tuân thủ đúng thời gian cách ly thuốc trước khi nhổ củ.'
      ]
    },
    references: 'ICRISAT Peanut Disease Compendium; MycoKeys Late Leaf Spot Study.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật & ICRISAT',
    standardCode: 'ICRISAT Peanut Compendium',
    reviewDate: '2026-03-05',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg/960px-Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg/960px-Leaf_spot_symptoms_%2810.3897-mycokeys.81.67850%29_Figure_14.jpg',
        caption: 'Triệu chứng đốm đen sẫm tập trung dày làm vàng khô lá lạc',
        source: 'MycoKeys / Wikimedia Commons'
      },
      {
        url: '/images/peanut_leaf_spot.jpg',
        caption: 'Đối chiếu phân biệt đốm đen dày đặc với đốm nâu trên lá lạc thực địa',
        source: 'Viện ASIR (Mẫu kiểm chứng)'
      }
    ],
    createdAt: '2026-02-02T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_rust',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Gỉ sắt lạc (Peanut Rust)',
    englishName: 'Peanut Rust',
    symptoms:
      'Mặt dưới lá xuất hiện vô số nốt mụn nhỏ li ti màu vàng cam đến nâu đỏ gỉ sắt (ổ bào tử hạ). Khi vỡ ra giải phóng lớp bột mịn màu gỉ sắt bám vào ngón tay. Khác với bệnh đốm lá, lá bị gỉ sắt không rụng ngay mà khô quăn giòn bám dính trên thân.',
    symptomChecklist: [
      'Mặt dưới lá nổi dày đặc các mụn nhỏ màu vàng cam - nâu gỉ sắt (nhiều khi cả mặt trên cũng có chấm vàng nhỏ tương ứng).',
      'Miết nhẹ ngón tay vào mặt dưới lá thấy dính bụi bột màu nâu đỏ như gỉ sắt.',
      'Lá bị nặng khô cháy giòn nhưng vẫn bám trên cành, không rụng hàng loạt như bệnh đốm lá.'
    ],
    affectedPlantParts: ['leaf', 'stem'],
    causes: 'Nấm Puccinia arachidis. Bào tử phát tán rất xa theo gió.',
    favorableConditions:
      'Nhiệt độ 20-26°C kèm sương ướt đọng trên mặt lá kéo dài >6 giờ trong vụ Xuân và Thu Đông.',
    preventionMethods:
      'Lên luống cao, gieo mật độ hợp lý tạo luống thông thoáng mau khô sương; luân canh với cây khác họ đậu.',
    safeManagement:
      'Phun dung dịch lưu huỳnh hữu cơ, Hexaconazole hoặc Azoxystrobin sớm khi mụn gỉ mới xuất hiện ở tầng lá dưới, tập trung phun kỹ vào mặt dưới lá.',
    treatmentSteps: {
      immediate: [
        'Lật mặt dưới lá ở các bụi lạc tầng thấp kiểm tra các ổ mụn màu nâu cam.',
        'Nếu thấy bệnh mới chớm 5% lá, tiến hành phun kiểm soát sớm vì bào tử gỉ sắt bay theo gió rất nhanh.'
      ],
      biologicalAndCare: [
        'Phun chế phẩm lưu huỳnh hoặc hoạt chất đặc trị gỉ sắt chú ý ngửa béc phun ướt đều MẶT DƯỚI LÁ.',
        'Bổ sung phân Kali giúp lá dày và giảm thiệt hại lép củ.'
      ],
      caution: [
        'Tránh để bệnh gỉ sắt đi kèm với đốm lá muộn vì hai bệnh cộng hưởng sẽ làm mất năng suất củ tới 50-70%.'
      ]
    },
    references: 'ICRISAT Peanut Disease Compendium; Viện Bảo vệ Thực vật Việt Nam.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện BVTV & ICRISAT',
    standardCode: 'ICRISAT Groundnut Rust Compendium',
    reviewDate: '2026-03-02',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Puccinia_arachidis.jpg/330px-Puccinia_arachidis.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Puccinia_arachidis.jpg/330px-Puccinia_arachidis.jpg',
        caption: 'Các ổ bào tử màu nâu gỉ sắt dày đặc trên lá lạc',
        source: 'ICRISAT / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Puccinia_arachidis2.jpg/330px-Puccinia_arachidis2.jpg',
        caption: 'Triệu chứng gỉ sắt lan rộng làm lá khô quăn nhưng vẫn dính trên cành',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Puccinia_arachidis1.jpg/330px-Puccinia_arachidis1.jpg',
        caption: 'Cận cảnh các mụn bào tử nấm Puccinia arachidis mặt dưới lá',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-16T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_stem_rot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Thối trắng thân / Héo rũ gốc mốc trắng lạc',
    englishName: 'Peanut Stem Rot / Southern Blight / White Mold',
    symptoms:
      'Phần gốc thân sát mặt đất bị thối mục mềm nhũn, xuất hiện mạng sợi nấm màu trắng tinh như bông tuyết bao phủ xung quanh gốc và đất. Trên tơ nấm hình thành nhiều hạt hạch nấm tròn nhỏ như hạt cải, ban đầu trắng sau chuyển vàng nâu. Cây lạc héo rũ nhanh khi lá vẫn xanh.',
    symptomChecklist: [
      'Cổ thân sát mặt đất có lớp tơ nấm màu TRẮNG TINH như sợi bông bọc quanh.',
      'Trên đám tơ trắng có nhiều hạt tròn li ti giống hạt cải màu trắng, vàng đến nâu sẫm.',
      'Cả khóm lạc hoặc từng nhánh bị héo rũ cụp xuống nhanh chóng dù lá chưa chuyển vàng.'
    ],
    affectedPlantParts: ['stem', 'fruit', 'other'],
    causes: 'Nấm đất Sclerotium rolfsii (Athelia rolfsii). Hạch nấm tồn tại nhiều năm trong đất cát pha.',
    favorableConditions:
      'Nhiệt độ nóng ẩm 28-35°C, mưa rào xen kẽ nắng gắt, đất cát pha thịt nhẹ giữ ẩm ở Nghệ An, Hà Tĩnh.',
    preventionMethods:
      'Cày sâu lật đất chôn vùi hạch nấm; lên luống cao thoát nước tốt; bón nhiều vôi bột (30-40 kg/sào) nâng pH đất và bón Trichoderma.',
    safeManagement:
      'Nhổ nhẹ cây bệnh cùng ít đất quanh gốc cho thẳng vào túi kín mang tiêu hủy (tránh làm rơi hạch nấm ra ruộng). Rắc vôi bột và tưới nấm đối kháng Trichoderma vào gốc các khóm lân cận.',
    treatmentSteps: {
      immediate: [
        'Dùng xẻng hoặc tay nhẹ nhàng bứng cây bệnh cùng phần đất chứa tơ trắng cho gọn vào túi nilon buộc kín mang ra khỏi ruộng.',
        'Rắc ngay một ít vôi bột vào hố vừa nhổ để sát khuẩn chỗ hạch nấm.'
      ],
      biologicalAndCare: [
        'Hòa chế phẩm nấm đối kháng Trichoderma harzianum hoặc Bacillus subtilis tưới đẫm vào vùng gốc các hàng lạc lân cận.',
        'Khơi thông rãnh thoát nước, không để gốc lạc ẩm bí kéo dài.'
      ],
      caution: [
        'Không kéo lê cây bệnh trên mặt ruộng hoặc ném xuống mương nước vì hạch nấm rơi rụng sẽ lây lan thành ổ dịch nhiều năm liền.'
      ]
    },
    references: 'Đại học Nông Lâm Huế; USDA-ARS Peanut Stem Rot Field Guide.',
    verificationStatus: 'verified',
    verifiedBy: 'ĐH Nông Lâm Huế & Viện ASIR',
    standardCode: 'Đề tài Bệnh héo rũ cây đậu đỗ miền Trung',
    reviewDate: '2026-03-03',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg/500px-White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg/500px-White-mycelial-growth-of-Sclerotium-rolfsii-on-crown-of-peanut-plant-with-sclerotia-forming-on-infected-tissue.jpg',
        caption: 'Mạng sợi nấm trắng như bông và hạch nấm hình thành ở vùng cổ gốc cây lạc',
        source: 'USDA-ARS / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Athelia.jpg/500px-Athelia.jpg',
        caption: 'Thân gốc bị mục thối với lớp tơ nấm trắng và hạch màu vàng nâu',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Athelia_rolfsii_sclerotia.jpg/330px-Athelia_rolfsii_sclerotia.jpg',
        caption: 'Cận cảnh các hạch nấm Athelia rolfsii tròn đều như hạt cải',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-01-22T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_bacterial_wilt',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Héo xanh vi khuẩn lạc (Bacterial Wilt)',
    englishName: 'Peanut Bacterial Wilt',
    symptoms:
      'Cây lạc đang xanh tốt bỗng héo rũ đột ngột ban ngày, tối có thể tươi lại 1-2 hôm rồi chết héo hẳn trong khi lá vẫn giữ màu xanh xỉn (KHÔNG có tơ nấm trắng ở gốc). Cách thử chuẩn: cắt ngang đoạn gốc thân thả vào cốc nước sạch thấy dòng dịch vi khuẩn trắng đục chảy thành sợi xuống đáy.',
    symptomChecklist: [
      'Cây héo rũ đột ngột khi lá vẫn còn màu xanh, phần gốc thân KHÔNG có mốc trắng.',
      'Chẻ dọc thân gần gốc thấy bó mạch dẫn bên trong chuyển màu nâu đen.',
      'Cắt đoạn thân gốc nhúng vào ly nước sạch sau 3-5 phút thấy có sợi khói dịch vi khuẩn màu trắng sữa chảy xuống.'
    ],
    affectedPlantParts: ['stem', 'leaf'],
    causes: 'Vi khuẩn đất Ralstonia solanacearum xâm nhập qua vết thương rễ do tuyến trùng hoặc xới đất làm đứt rễ.',
    favorableConditions:
      'Nhiệt độ đất cao 30-35°C, đất ẩm ướt đọng nước sau mưa hoặc trồng lạc liên tục nhiều năm không luân canh với lúa nước.',
    preventionMethods:
      'LUÂN CANH với lúa nước là biện pháp hiệu quả nhất để diệt vi khuẩn trong đất. Sử dụng giống lạc kháng héo xanh như L14, Sen Nghệ An. Bón vôi bột khi làm đất.',
    safeManagement:
      'Nhổ bỏ ngay cây héo xanh, rắc vôi bột khử hốc đất, tránh xới xáo làm đứt rễ lân cận và kiểm soát tuyến trùng đất bằng Trichoderma/chế phẩm sinh học.',
    treatmentSteps: {
      immediate: [
        'Làm phép thử cắt gốc nhúng vào cốc nước trong: nếu thấy dòng dịch trắng đục chảy xuống thì chắc chắn là héo xanh vi khuẩn.',
        'Nhổ bỏ ngay cây bệnh, rắc vôi bột vào hố nhổ; tuyệt đối KHÔNG dẫn nước tưới rãnh từ ruộng bệnh sang ruộng khỏe.'
      ],
      biologicalAndCare: [
        'Tránh làm cỏ xới xáo sâu sát gốc khi ruộng đang có cây héo xanh để không gây đứt rễ mở đường cho vi khuẩn.',
        'Vụ sau luân canh trồng lúa nước hoặc ngô, kết hợp bón vôi và phân chuồng hoai mục có Trichoderma.'
      ],
      caution: [
        'Cây lạc đã nhiễm héo xanh vi khuẩn tắc nghẽn mạch dẫn không thể cứu sống bằng thuốc phun lá; thuốc nấm (Validamycin, Metalaxyl...) không diệt được Ralstonia.'
      ]
    },
    references: 'ICRISAT Bacterial Wilt Guide; Viện Khoa học Nông nghiệp Bắc Trung Bộ.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật & Viện ASIR',
    standardCode: 'TCVN Canh tác Lạc bền vững',
    reviewDate: '2026-03-06',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Ralstonia_solanacearum_symptoms.jpg/960px-Ralstonia_solanacearum_symptoms.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Ralstonia_solanacearum_symptoms.jpg/960px-Ralstonia_solanacearum_symptoms.jpg',
        caption: 'Biểu hiện cây héo rũ đột ngột khi lá vẫn còn màu xanh đặc trưng của bệnh héo xanh',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Tomato_Bacterial_wilt_%28Pathogen_Ralstonia_solanacearum%29_%2812091835495%29.jpg/960px-Tomato_Bacterial_wilt_%28Pathogen_Ralstonia_solanacearum%29_%2812091835495%29.jpg',
        caption: 'Kiểm tra dòng dịch vi khuẩn Ralstonia solanacearum trắng đục chảy ra từ mặt cắt thân',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-04T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_rhizoctonia_pod_rot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Khô vằn & Thối khô vỏ củ lạc (Rhizoctonia Pod Rot)',
    englishName: 'Peanut Rhizoctonia Limb and Pod Rot',
    symptoms:
      'Thân nhánh sát mặt đất xuất hiện vết thối khô màu nâu sẫm đến nâu gỉ sắt có ranh giới rõ, làm từng cành chết khô. Dưới đất, vỏ củ lạc chuyển màu nâu đen thối khô giòn, hạt bên trong bị teo hoặc thối hỏng.',
    symptomChecklist: [
      'Các cành nhánh nằm sát mặt đất bị thối nâu sẫm thành từng đoạn rõ rệt (không có lớp bông trắng dày như mốc trắng).',
      'Nhổ khóm lạc lên thấy vỏ củ có mảng thối khô màu nâu gỉ hoặc đen sẫm, cuống củ mục dễ đứt sót lại dưới đất.'
    ],
    affectedPlantParts: ['stem', 'fruit'],
    causes: 'Nấm đất Rhizoctonia solani (Thanatephorus cucumeris) sống hoại sinh trên xác bã thực vật trong đất.',
    favorableConditions:
      'Đất ẩm bí sau mưa lớn kết hợp nhiệt độ cao giai đoạn lạc hình thành tia và phát triển củ.',
    preventionMethods:
      'Luân canh hợp lý, cày phơi ải đất trước khi trồng, không gieo lạc quá dày và không vun đất quá cao lấp kín nhiều cành lá.',
    safeManagement:
      'Bón lót Trichoderma và vôi bột khử đất; giữ ruộng thoát nước tốt và phun Validamycin / Azoxystrobin hướng vào gốc cành khi phát hiện sớm.',
    treatmentSteps: {
      immediate: [
        'Khơi rãnh thoát nước nhanh nếu ruộng lạc bị ứ ẩm lâu ngày.',
        'Nhổ kiểm tra thử vài khóm ở vùng trũng xem vỏ củ và cành sát đất có bị vết nâu khô không.'
      ],
      biologicalAndCare: [
        'Tưới nấm đối kháng Trichoderma vào vùng gốc luống kết hợp rắc nhẹ vôi bột vùng đất ẩm.',
        'Nếu diện tích cành sát đất bị khô vằn tăng nhanh, phun thuốc đặc trị Validamycin hoặc Azoxystrobin xuống vùng gốc cành.'
      ],
      caution: [
        'Tránh vun luống lấp đất chôn vùi lá xanh của cây lạc vào đất ẩm vì lá mục sẽ làm nấm Rhizoctonia phát triển mạnh xuống củ.'
      ]
    },
    references: 'USDA-ARS Peanut Pod & Limb Rot Guide; Viện Bảo vệ Thực vật.',
    verificationStatus: 'verified',
    verifiedBy: 'USDA-ARS & Viện BVTV Việt Nam',
    standardCode: 'ICRISAT Soilborne Disease Guide',
    reviewDate: '2026-03-06',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg/500px-Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg/500px-Rhizoctonia-solani-infected-pods-which-cause-a-dry-russet-brown-rot.jpg',
        caption: 'Vỏ củ lạc bị thối khô màu nâu gỉ sẫm do nấm Rhizoctonia solani',
        source: 'USDA-ARS / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Thanatephorus_cucumeris_infected_peanuts.jpg/330px-Thanatephorus_cucumeris_infected_peanuts.jpg',
        caption: 'Củ và phần gốc lạc bị nấm Thanatephorus cucumeris tấn công trong đất ẩm',
        source: 'USDA / Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-07T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_crown_rot',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Thối đen cổ rễ cây lạc con (Aspergillus Crown Rot)',
    englishName: 'Peanut Aspergillus Crown Rot',
    symptoms:
      'Gây hại nặng trên cây lạc con 10-30 ngày sau mọc: cây con héo rũ chết ngang cổ rễ sát mặt đất. Phần cổ rễ và hạt giống còn sót bị thối mềm và phủ kín lớp bào tử nấm màu ĐEN KỊT như muội than.',
    symptomChecklist: [
      'Cây lạc con héo gục nhanh chóng khi mới mọc được 1-4 tuần.',
      'Nhổ cây con lên thấy phần cổ rễ sát mặt đất mục nát và bám đầy bụi phấn MÀU ĐEN KỊT.'
    ],
    affectedPlantParts: ['stem', 'other'],
    causes: 'Nấm Aspergillus niger lây từ hạt giống nhiễm bệnh hoặc tồn tại trong đất khô nóng.',
    favorableConditions:
      'Thời tiết nắng nóng khô hạn ngay sau khi gieo hạt, hạt giống bị sứt vỏ lụa trước khi trồng hoặc gieo quá sâu.',
    preventionMethods:
      'Chỉ bóc vỏ củ lấy hạt làm giống ngay sát ngày gieo (không bóc trước lâu ngày làm trầy vỏ lụa); trộn xử lý hạt giống trước khi gieo và tưới đủ ẩm sau gieo.',
    safeManagement:
      'Nhổ bỏ cây con chết đen, không trồng dặm trực tiếp vào hốc cũ mà chưa rắc vôi/Trichoderma; xử lý hạt giống sạch bằng chế phẩm sinh học vụ tới.',
    treatmentSteps: {
      immediate: [
        'Nhổ bỏ các cây con héo chết đen cổ rễ, rắc vôi hoặc tưới Trichoderma vào hố trước khi trồng dặm cây mới.'
      ],
      biologicalAndCare: [
        'Đảm bảo đất đủ ẩm mát trong 2 tuần đầu sau gieo; tránh để đất quá khô nóng rồi mới tưới dập.',
        'Vụ sau chỉ bóc vỏ lạc giống 1-2 ngày trước khi gieo và áo hạt giống bằng chế phẩm sinh học bảo vệ rễ.'
      ],
      caution: [
        'Tuyệt đối không dùng hạt lạc bị nứt vỡ vỏ lụa, đổi màu đen mốc để làm giống gieo.'
      ]
    },
    references: 'ICRISAT Peanut Crown Rot Compendium; Viện Bảo vệ Thực vật.',
    verificationStatus: 'verified',
    verifiedBy: 'ICRISAT & Viện Bảo vệ Thực vật',
    standardCode: 'ICRISAT Seed & Seedling Manual',
    reviewDate: '2026-03-07',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aspergillus_niger_01.jpg/960px-Aspergillus_niger_01.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Aspergillus_niger_01.jpg/960px-Aspergillus_niger_01.jpg',
        caption: 'Lớp nấm mốc đen kịt đặc trưng của Aspergillus niger gây thối cổ rễ lạc con',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Aspergillus_niger_Micrograph.jpg/330px-Aspergillus_niger_Micrograph.jpg',
        caption: 'Cấu trúc đầu bào tử nấm Aspergillus niger dưới kính hiển vi kiểm chứng',
        source: 'CDC / Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-09T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_aflatoxin_mold',
    cropType: 'peanut',
    vietnameseName: 'Bệnh Mốc vàng hạt lạc & Độc tố Aflatoxin (Aspergillus flavus)',
    englishName: 'Peanut Yellow Mold & Aflatoxin Contamination',
    symptoms:
      'Trên vỏ và nhân hạt lạc bị tổn thương hoặc thu hoạch ẩm ướt xuất hiện lớp mốc mịn màu VÀNG XANH LỤC (vàng chanh chuyển lục). Nhân hạt biến màu đắng, mềm và nhiễm độc tố Aflatoxin cực độc đối với người và gia súc.',
    symptomChecklist: [
      'Nhân hạt lạc có lớp phấn mốc màu vàng xanh lục (vàng chanh đến xanh rêu) đặc trưng.',
      'Hạt có mùi mốc hăng, vị đắng gắt, thường xuất hiện trên củ bị sâu đất đục hoặc phơi sấy không kịp lúc mưa.',
      'Độc tố Aflatoxin KHÔNG mất đi khi rang hoặc luộc ở nhiệt độ nấu ăn thông thường.'
    ],
    affectedPlantParts: ['fruit'],
    causes: 'Nấm Aspergillus flavus và Aspergillus parasiticus xâm nhập vào củ ngoài đồng lúc khô hạn cuối vụ hoặc trong quá trình thu hoạch phơi bảo quản ẩm.',
    favorableConditions:
      'Khô hạn kéo dài 3-4 tuần trước khi nhổ lạc (làm nứt vỏ củ) hoặc gặp mưa dầm không phơi khô kịp độ ẩm xuống dưới 9% sau thu hoạch.',
    preventionMethods:
      'Tưới giữ ẩm nhẹ giai đoạn củ vào chắc tránh khô hạn nứt đất; nhổ lạc đúng độ chín, loại sạch củ vỡ dập thối và phơi thật khô ngay trên bạt sạch (độ ẩm hạt <9%).',
    safeManagement:
      'Phòng trừ sâu sùng đất, mối hại củ dưới đất. Khi bảo quản phải đựng trong bao kín lót túi PE nơi khô thoáng, không để trực tiếp xuống nền xi măng ẩm.',
    treatmentSteps: {
      immediate: [
        'Nhặt loại bỏ ngay toàn bộ củ lạc lép, nứt vỏ, sâu đục hoặc chớm có mốc vàng xanh lục khỏi lô lạc lành; tuyệt đối KHÔNG ăn hay ép dầu lạc đã mốc.',
        'Trải mỏng lạc sạch lên bạt phơi nắng hoặc sấy khô ngay sau khi nhổ.'
      ],
      biologicalAndCare: [
        'Bảo quản lạc khô (độ ẩm dưới 9%) trong bao kín kê trên giá cao cách mặt đất tối thiểu 20 cm.',
        'Ngoài đồng cần bón đủ vôi bột và giữ ẩm giai đoạn cuối vụ để vỏ củ chắc, hạn chế nứt vỏ và côn trùng cắn củ.'
      ],
      caution: [
        'Tuyệt đối KHÔNG tận dụng lạc mốc vàng xanh để ăn, làm bơ lạc hay cho lợn gà ăn vì Aflatoxin gây ngộ độc gan cực kỳ nguy hiểm.'
      ]
    },
    references: 'FAO Aflatoxin Prevention Guidelines; Cục An toàn Thực phẩm & Viện BVTV.',
    verificationStatus: 'verified',
    verifiedBy: 'FAO & Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'Codex / FAO Aflatoxin Prevention Code',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Aspergillus_flavus_01.jpg/960px-Aspergillus_flavus_01.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Aspergillus_flavus_01.jpg/960px-Aspergillus_flavus_01.jpg',
        caption: 'Lớp phấn nấm mốc màu vàng lục Aspergillus flavus sinh độc tố Aflatoxin',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Aspergillus_flavus.jpg/960px-Aspergillus_flavus.jpg',
        caption: 'Tản nấm mốc vàng xanh đặc trưng của Aspergillus flavus phát triển ở độ ẩm cao',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-10T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_aphid',
    cropType: 'peanut',
    vietnameseName: 'Rệp muội đen hại lạc (Groundnut Aphid)',
    englishName: 'Peanut / Cowpea Aphid',
    symptoms:
      'Đàn rệp nhỏ màu đen bóng bám dày đặc quanh ngọn non, cuống hoa và mặt dưới lá non để chích hút nhựa cây. Ngọn lạc bị quăn rũ, còi cọc, mặt lá dính dịch ngọt dễ sinh nấm muội đen. Đặc biệt rệp muội truyền bệnh virus khảm lá làm cây lạc lùn xoăn ngọn.',
    symptomChecklist: [
      'Từng đám rệp nhỏ màu đen bóng (hoặc xanh đen) bám kín đọt non và cuống chồi.',
      'Lá non bị xoăn lại, cây chậm lớn, hoa rụng nhiều.',
      'Thường thấy kiến bò qua lại trên ngọn lạc và có bọ rùa đỏ tự nhiên tìm ăn rệp.'
    ],
    affectedPlantParts: ['leaf', 'stem'],
    causes: 'Rệp muội đen Aphis craccivora. Sinh sản vô tính cực nhanh trong điều kiện thời tiết khô ấm.',
    favorableConditions:
      'Thời tiết nắng ấm ít mưa kéo dài giai đoạn cây lạc từ 20-45 ngày (chuẩn bị và đang ra hoa rộ).',
    preventionMethods:
      'Làm sạch cỏ dại họ đậu quanh bờ ruộng, gieo trồng đồng loạt, bảo vệ thiên địch tự nhiên như bọ rùa, ruồi ăn rệp.',
    safeManagement:
      'Nếu ruộng có nhiều bọ rùa thì hạn chế phun thuốc. Khi mật độ rệp cao làm xoăn ngọn (>20% cây nhiễm), phun dầu khoáng sinh học, nước xà phòng sinh học hoặc hoạt chất trừ rệp nhẹ theo đúng hướng dẫn.',
    treatmentSteps: {
      immediate: [
        'Kiểm tra xem trên ngọn có rệp bám dày không và đếm xem đã có nhiều bọ rùa đỏ ăn rệp tự nhiên chưa.',
        'Nếu chỉ mới xuất hiện ở vài bụi rìa bờ, có thể ngắt ngọn hoặc tuốt bỏ tiêu hủy ngay.'
      ],
      biologicalAndCare: [
        'Phun dầu khoáng sinh học hoặc chế phẩm trừ rệp an toàn (Imidacloprid / Pymetrozine / chế phẩm thảo mộc tỏi ớt neem) vào chiều mát, phun ướt đọt và mặt dưới lá.',
        'Tưới giữ ẩm ruộng lạc khi trời hanh khô kéo dài để hạn chế rệp bùng phát.'
      ],
      caution: [
        'Không dùng thuốc trừ sâu phổ rộng liều cao vì sẽ giết hết bọ rùa và ong ký sinh khiến rệp bùng phát trở lại nhanh hơn.'
      ]
    },
    references: 'CSIRO Entomology; Viện Khoa học Nông nghiệp Bắc Trung Bộ.',
    verificationStatus: 'verified',
    verifiedBy: 'CSIRO & Viện Bảo vệ Thực vật',
    standardCode: 'ICRISAT Peanut IPM Guidelines',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg/960px-CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg/960px-CSIRO_ScienceImage_7331_Aphids_on_cotton_7.jpg',
        caption: 'Đàn rệp muội tập trung dày đặc chích hút nhựa trên đọt và mặt dưới lá',
        source: 'CSIRO / Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Aphis_gossypii04.jpg/960px-Aphis_gossypii04.jpg',
        caption: 'Cận cảnh rệp muội chích hút làm lá non xoăn rũ',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Aphis_craccivora_apeterous_vipera_3rd_antennal.jpg/330px-Aphis_craccivora_apeterous_vipera_3rd_antennal.jpg',
        caption: 'Đặc điểm nhận dạng rệp muội đen Aphis craccivora hại cây họ đậu',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-11T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  },
  {
    id: 'peanut_armyworm_cutworm',
    cropType: 'peanut',
    vietnameseName: 'Sâu khoang & Sâu xanh ăn lá hại lạc (Armyworm & Pod Borer)',
    englishName: 'Peanut Tobacco Cutworm (Spodoptera litura)',
    symptoms:
      'Sâu non mới nở sống tập trung gặm mặt dưới lá tạo thành mảng màng trắng xơ xác ("lủng lỗ mạng"). Sâu tuổi lớn (có các khoang tam giác đen đặc trưng dọc hai bên lưng) phân tán ăn khuyết toàn bộ phiến lá chỉ chừa gân, làm trơ trụi ruộng lạc chỉ sau vài đêm.',
    symptomChecklist: [
      'Lá non bị ăn mất phần xanh chỉ còn màng mỏng trắng xơ (sâu mới nở tập trung hàng chục con một lá).',
      'Sâu tuổi lớn dài 3-4 cm màu nâu xám hoặc xanh đen có các vết tam giác đen rõ dọc hai bên thân.',
      'Ban ngày nắng sâu thường chui xuống dưới gốc rơm rạ hoặc kẽ đất ẩm, chiều tối mới bò lên cắn phá mạnh.'
    ],
    affectedPlantParts: ['leaf', 'stem'],
    causes: 'Sâu khoang (Spodoptera litura) và sâu xanh (Helicoverpa armigera).',
    favorableConditions:
      'Giai đoạn lạc phát triển thân lá xanh rậm từ 30-75 ngày sau gieo, thời tiết ấm ẩm xen kẽ nắng.',
    preventionMethods:
      'Cày ải đất phơi nắng diệt nhộng sau thu hoạch; bắt ổ trứng có lớp lông màu vàng rơm mặt dưới lá và ngắt lá có sâu non mới nở sống tụ tập.',
    safeManagement:
      'Phun chế phẩm vi khuẩn Bt, nấm xanh/virus NPV hoặc thuốc sinh học Emamectin vào CHIỀU MÁT hoặc TỐI khi sâu bò lên ăn lá.',
    treatmentSteps: {
      immediate: [
        'Đi thăm đồng tìm các lá lạc bị gặm màng trắng xơ để bắt tiêu hủy ngay cả ổ sâu non đang tụ tập trước khi chúng tản ra cả ruộng.',
        'Bới nhẹ gốc đất dưới các khóm lạc bị cắn khuyết để kiểm tra sâu tuổi lớn trốn ban ngày.'
      ],
      biologicalAndCare: [
        'Phun chế phẩm trừ sâu sinh học (Bt, NPV, Emamectin benzoate hoặc Indoxacarb) vào lúc CHIỀU TỐI khi sâu bắt đầu bò lên tán ăn lá.'
      ],
      caution: [
        'Phun thuốc vào giữa trưa nắng khi sâu đang trốn dưới kẽ đất sẽ kém hiệu quả; sâu khoang tuổi 4-5 rất khó diệt nên phải phát hiện sớm từ tuổi 1-2.'
      ]
    },
    references: 'Viện Bảo vệ Thực vật Việt Nam; ICRISAT Defoliator Management.',
    verificationStatus: 'verified',
    verifiedBy: 'Viện Bảo vệ Thực vật Việt Nam',
    standardCode: 'TCVN IPM Cây Lạc',
    reviewDate: '2026-03-08',
    sampleImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Spodoptera_litura_3.jpg/960px-Spodoptera_litura_3.jpg',
    galleryImages: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Spodoptera_litura_3.jpg/960px-Spodoptera_litura_3.jpg',
        caption: 'Sâu khoang Spodoptera litura với các khoang tam giác đen đặc trưng dọc lưng',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Spodoptera_litura_late_instar_caterpillar.jpg/960px-Spodoptera_litura_late_instar_caterpillar.jpg',
        caption: 'Sâu khoang tuổi lớn gặm khuyết phiến lá và ăn trụi tán cây',
        source: 'Wikimedia Commons'
      },
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Helicoverpa_armigera.jpg/500px-Helicoverpa_armigera.jpg',
        caption: 'Sâu xanh Helicoverpa armigera thường xuất hiện cùng sâu khoang ăn nụ hoa và lá non',
        source: 'Wikimedia Commons'
      }
    ],
    createdAt: '2026-02-12T00:00:00.000Z',
    updatedAt: '2026-03-10T00:00:00.000Z'
  }
];

export const DEFAULT_DISEASES: DiseaseRecord[] = [...CORE_DISEASES, ...EXTENDED_DISEASES];
