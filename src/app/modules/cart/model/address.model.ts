export interface District {
  zoneId: string;
  zoneName: string;
  zoneOtherName: string;
  districtId: string;
  districtName: string;
  districtOtherName: string;
  pickupAvailability: boolean;
  dropOffAvailability: boolean;
}

export interface City {
  cityId: string;
  cityName: string;
  cityOtherName: string;
  cityCode: string;
  districts: District[];
  pickupAvailability: boolean;
  dropOffAvailability: boolean;
}

export interface AddressResponse {
  success: boolean;
  message: string;
  data: (City | { [key: string]: string })[];
}
