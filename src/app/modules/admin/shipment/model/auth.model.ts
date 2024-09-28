export interface BostaLoginRequest {
  email: string;
  password: string;
}

// export interface BostaLoginResponse {
//   success: boolean;
//   token: string;
// }

export interface BusinessAdminInfo {
  businessId: string;
  businessName: string;
}

export interface Email {
  verified: boolean;
  address: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface User {
  _id: string;
  emails: Email[];
  profile: Profile;
  roles: string[];
  isPhoneVerified: boolean;
  isFirstOrderCreated: boolean;
  businessAdminInfo: BusinessAdminInfo;
}

export interface LoginData {
  token: string;
  refreshToken: string;
  user: User;
}

export interface BostaLoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface SendInformation {
  email: string;
  fullName: string;
  token: string;
}
