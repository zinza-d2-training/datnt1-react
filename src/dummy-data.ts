export interface Province {
  id: number;
  name: string;
}
export interface District {
  id: number;
  name: string;
  provinceId: number;
}
export interface Ward {
  id: number;
  name: string;
  districtId: number;
}

export interface InjectionPoint {
  id: number;
  name: string;
  detailAddress: string;
  wardId: number;
  leader: string;
  numberOfInjectionTables: number;
}

export const provinces: Province[] = [
  {
    id: 1,
    name: 'Hà Nội'
  },
  {
    id: 2,
    name: 'Hồ Chí Minh'
  },
  {
    id: 3,
    name: 'Đà Nẵng'
  }
];

export const districts: District[] = [
  { id: 1, name: 'Quận Đống Đa', provinceId: 1 },
  { id: 2, name: 'Quận Cầu Giấy', provinceId: 1 },
  { id: 3, name: 'Quận 1', provinceId: 2 },
  { id: 4, name: 'Quận 2', provinceId: 2 }
];

export const wards: Ward[] = [
  { id: 1, name: 'Phường Văn Chương', districtId: 1 },
  { id: 2, name: 'Phường Văn Miếu', districtId: 1 },
  { id: 3, name: 'Phường Dịch Vọng', districtId: 2 },
  { id: 4, name: 'Phường Dịch Vọng Hậu', districtId: 2 },
  { id: 5, name: 'Phường Bến Nghé', districtId: 3 },
  { id: 6, name: 'Phường An Phú', districtId: 4 },
  { id: 7, name: 'Phường Bến Thành', districtId: 3 },
  { id: 8, name: 'Phường Bình An', districtId: 4 }
];

const InjectionPoints: InjectionPoint[] = [
  {
    id: 1,
    name: 'Trung tâm Y tế TP Vĩnh Yên',
    detailAddress: 'Số 2- Phạm Văn Đồng',
    wardId: 1,
    leader: 'Nguyễn Văn Thắng',
    numberOfInjectionTables: 2
  },
  {
    id: 2,
    name: 'Trạm y tế Phường Phúc Xá',
    detailAddress: '84 Nghĩa Dũng',
    wardId: 2,
    leader: 'Đỗ Thế Bảo',
    numberOfInjectionTables: 1
  },
  {
    id: 3,
    name: 'Bệnh viện Đa khoa Hồng Ngọc',
    detailAddress: '55 Yên Ninh',
    wardId: 1,
    leader: 'Cao Độc Lập',
    numberOfInjectionTables: 1
  },
  {
    id: 4,
    name: 'Trạm y tế Phường Trúc Bạch',
    detailAddress: '2 Trúc Bạch',
    wardId: 1,
    leader: 'Trần Thị Hồng Tuyết',
    numberOfInjectionTables: 1
  },
  {
    id: 5,
    name: 'Bệnh viện Quân Y 354',
    detailAddress: '120 Đốc Ngữ',
    wardId: 1,
    leader: 'Phạm Minh Đức',
    numberOfInjectionTables: 1
  },
  {
    id: 6,
    name: 'Trạm y tế Phường Vĩnh Phúc',
    detailAddress: 'Tầng 1 nhà K3, khu 7Ha',
    wardId: 1,
    leader: 'Nguyễn Tường Phượng',
    numberOfInjectionTables: 1
  },
  {
    id: 7,
    name: 'Trạm y tế Phường Cống Vị',
    detailAddress: '518 Đội Cấn',
    wardId: 1,
    leader: 'Nguyễn Thị Hồng Thúy',
    numberOfInjectionTables: 1
  },
  {
    id: 8,
    name: 'Trạm y tế Phường Liễu Giai',
    detailAddress: '3 Quần Ngựa',
    wardId: 1,
    leader: 'Trần Trúc Hồ',
    numberOfInjectionTables: 1
  },
  {
    id: 9,
    name: 'Trạm y tế Phường Nguyễn Trung Trực',
    detailAddress: '6 Hàng Bún',
    wardId: 1,
    leader: 'Nguyễn Trọng Điệp',
    numberOfInjectionTables: 1
  },
  {
    id: 10,
    name: 'Trạm y tế Phường Quán Thánh',
    detailAddress: '50 Hàng Bún',
    wardId: 1,
    leader: 'Bạch Thị Ngọc Hoan',
    numberOfInjectionTables: 1
  }
];

// row se map qua

export const rows = InjectionPoints.map((injectionPoint: InjectionPoint) => {
  const ward = wards.filter((ward) => {
    return ward.id === injectionPoint.wardId;
  });

  const district = districts.filter((district) => {
    return district.id === ward[0].districtId;
  });

  const province = provinces.filter((province) => {
    return province.id === district[0].provinceId;
  });

  return {
    id: injectionPoint.id,
    name: injectionPoint.name,
    detailAddress: injectionPoint.detailAddress,
    ward: ward,
    district: district,
    province: province,
    leader: 'Nguyễn Văn Thắng',
    numberOfInjectionTables: 2
  };
});

export const labels = [
  '21/9',
  '22/9',
  '23/9',
  '24/9',
  '25/9',
  '26/9',
  '27/9',
  '28/9',
  '29/9',
  '30/9',
  '1/10',
  '2/10',
  '3/10',
  '4/10',
  '5/10',
  '6/10',
  '7/10',
  '8/10',
  '9/10',
  '10/10',
  '11/10',
  '12/10',
  '13/10',
  '14/10',
  '15/10',
  '16/10',
  '17/10',
  '18/10',
  '19/10',
  '20/10',
  '21/10'
];

export const priorityGroup = [
  {
    id: 1,
    name: '1. Người làm việc trong các cơ sở y tế, ngành y tế (công lập và tư nhân)'
  },
  {
    id: 2,
    name: '2. Người tham gia phòng chống dịch (Thành viên Ban chỉ đạo phòng, chống dịch các cấp, người làm việc ở các khu cách ly, làm nhiệm vụ truy vết, điều tra dịch tễ, tổ Covid dựa vào cộng đồng, tình nguyện viên, phóng viên…)'
  },
  { id: 3, name: '3. Lực lượng Quân đội' },
  { id: 4, name: '4. Lực lượng Công an' },
  {
    id: 5,
    name: '5. Nhân viên, cán bộ ngoại giao của Việt Nam và thân nhân được cử đi nước ngoài; người làm việc trong các cơ quan Ngoại giao, Lãnh sự, các tổ chức quốc tế hoạt động tại Việt Nam'
  },
  { id: 6, name: '6. Hải quan, cán bộ làm công tác xuất nhập cảnh' },
  {
    id: 7,
    name: '7. Người cung cấp dịch vụ thiết yếu: hàng không, vận tải, du lịch; cung cấp dịch vụ điện, nước'
  },
  {
    id: 8,
    name: '8. Giáo viên, người làm việc, học sinh, sinh viên tại các cơ sở giáo dục, đào tạo; lực lượng bác sỹ trẻ; người làm việc tại các cơ quan, đơn vị hành chính; các tổ chức hành nghề luật sư, công chứng, đấu giá… thường xuyên tiếp xúc với nhiều người'
  },
  { id: 9, name: '9. Người mắc các bệnh mạn tính; Người trên 65 tuổi' },
  { id: 10, name: '10. Người sinh sống tại các vùng có dịch' },
  { id: 11, name: '11. Người nghèo, các đối tượng chính sách xã hội' },
  {
    id: 12,
    name: '12. Người được cơ quan nhà nước có thẩm quyền cử đi công tác, học tập, lao động ở nước ngoài hoặc có nhu cầu xuất cảnh để công tác, học tập và lao động ở nước ngoài; chuyên gia nước ngoài làm việc tại Việt Nam'
  },
  {
    id: 13,
    name: '13. Các đối tượng là người lao động, thân nhân người lao động đang làm việc tại các doanh nghiệp (bao gồm cả doanh nghiệp trong khu công nghiệp, khu chế xuất, doanh nghiệp kinh doanh vận tải, tín dụng, du lịch…), cơ sở kinh doanh dịch vụ thiết yếu như các cơ sở lưu trú, ăn uống, ngân hàng, chăm sóc sức khỏe, dược, vật tư y tế… cơ sở bán lẻ, bán buôn, chợ, công trình xây dựng, người dân ở vùng, khu du lịch'
  },
  { id: 14, name: '14. Các chức sắc, chức việc các tôn giáo' },
  { id: 15, name: '15. Người lao động tự do' },
  {
    id: 16,
    name: '16. Các đối tượng khác theo Quyết định của Bộ trưởng Bộ Y tế hoặc Chủ tịch Ủy ban nhân dân tỉnh, thành phố và đề xuất của các đơn vị viện trợ vắc xin cho Bộ Y tế'
  }
];

export const injectionSession = [
  { id: 1, name: 'Buổi sáng' },
  { id: 2, name: 'Buổi chiều' },
  { id: 3, name: 'Cả ngày' }
];

interface InjectionInfo {
  injectionNumber: number;
  injectionTime: string;
  vaccineName: string;
  lotNumber: string;
  injectionPointId: number;
}

export const injectionInfo: InjectionInfo[] = [
  {
    injectionNumber: 1,
    injectionTime: '08/09/2021 - 16:56',
    vaccineName: 'COVID-19 Vaccine AstraZeneca',
    lotNumber: 'NJ0342',
    injectionPointId: 1
  },
  {
    injectionNumber: 2,
    injectionTime: '08/09/2021 - 16:56',
    vaccineName: 'COVID-19 Vaccine AstraZeneca',
    lotNumber: 'NJ0342',
    injectionPointId: 2
  }
];

export const injectionInforRows = injectionInfo.map(
  (injection: InjectionInfo) => {
    const injectionPoint = InjectionPoints.filter(
      (injectionPoint: InjectionPoint) => {
        return injection.injectionPointId == injectionPoint.id;
      }
    );

    return {
      injectionNumber: injection.injectionNumber,
      injectionTime: injection.injectionTime,
      vaccineName: injection.vaccineName,
      lotNumber: injection.lotNumber,
      injectionPointName: injectionPoint[0].name
    };
  }
);

export const registerResult = [
  {
    numericalOder: 1,
    fullname: 'Nguyễn Văn A',
    birthday: '6/10/1994',
    gender: 'Nam',
    identificationCode: '030012345678',
    status: 'Đăng ký thành công'
  }
];
