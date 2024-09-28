export interface Profile {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface Country {
  _id: string;
  name: string;
  code: string;
  nameAr: string;
}

export interface BusinessAdminInfo {
  businessId: string;
  businessName: string;
  businessLocationAdded: boolean;
}

export interface UserData {
  _id: string;
  isPhoneVerified: boolean;
  roles: string[];
  profile: Profile;
  country: Country;
  monthlyShipmentVolume: string;
  cities: any[]; // Adjust type if cities structure is known
  logs: any[]; // Adjust type if logs structure is known
  businessAdminInfo: BusinessAdminInfo;
}

export interface ViewUserDataResponse {
  success: boolean;
  message: string;
  data: UserData;
}
