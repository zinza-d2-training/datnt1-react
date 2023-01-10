// import { InjectionPoint } from 'components/InjectionPoint';
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
  districtId: number;
  provinceId: number;
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
    districtId: 1,
    provinceId: 1,
    leader: 'Nguyễn Văn Thắng',
    numberOfInjectionTables: 2
  },
  {
    id: 2,
    name: 'Trạm y tế Phường Phúc Xá',
    detailAddress: '84 Nghĩa Dũng',
    wardId: 2,
    districtId: 2,
    provinceId: 2,
    leader: 'Đỗ Thế Bảo',
    numberOfInjectionTables: 1
  },
  {
    id: 3,
    name: 'Bệnh viện Đa khoa Hồng Ngọc',
    detailAddress: '55 Yên Ninh',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Cao Độc Lập',
    numberOfInjectionTables: 1
  },
  {
    id: 4,
    name: 'Trạm y tế Phường Trúc Bạch',
    detailAddress: '2 Trúc Bạch',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Trần Thị Hồng Tuyết',
    numberOfInjectionTables: 1
  },
  {
    id: 5,
    name: 'Bệnh viện Quân Y 354',
    detailAddress: '120 Đốc Ngữ',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Phạm Minh Đức',
    numberOfInjectionTables: 1
  },
  {
    id: 6,
    name: 'Trạm y tế Phường Vĩnh Phúc',
    detailAddress: 'Tầng 1 nhà K3, khu 7Ha',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguyễn Tường Phượng',
    numberOfInjectionTables: 1
  },
  {
    id: 7,
    name: 'Trạm y tế Phường Cống Vị',
    detailAddress: '518 Đội Cấn',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguyễn Thị Hồng Thúy',
    numberOfInjectionTables: 1
  },
  {
    id: 8,
    name: 'Trạm y tế Phường Liễu Giai',
    detailAddress: '3 Quần Ngựa',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Trần Trúc Hồ',
    numberOfInjectionTables: 1
  },
  {
    id: 9,
    name: 'Trạm y tế Phường Nguyễn Trung Trực',
    detailAddress: '6 Hàng Bún',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Nguyễn Trọng Điệp',
    numberOfInjectionTables: 1
  },
  {
    id: 10,
    name: 'Trạm y tế Phường Quán Thánh',
    detailAddress: '50 Hàng Bún',
    wardId: 1,
    districtId: 1,
    provinceId: 1,
    leader: 'Bạch Thị Ngọc Hoan',
    numberOfInjectionTables: 1
  }
];

// row se map qua

export const rows = InjectionPoints.map((injectionPoint: InjectionPoint) => {
  return {
    id: injectionPoint.id,
    name: injectionPoint.name,
    detailAddress: injectionPoint.detailAddress,
    ward: wards.filter((ward) => {
      return ward.id === injectionPoint.wardId;
    }),
    district: districts.filter((district) => {
      return district.id === injectionPoint.districtId;
    }),
    province: provinces.filter((province) => {
      return province.id === injectionPoint.provinceId;
    }),
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
