// Main response interface
export interface GetAllDeliviesResponse {
  success: boolean;
  message: string;
  data: DeliveryData;
}

// Data interface
export interface DeliveryData {
  deliveries: Delivery[];
  count: number;
  page: number;
  limit: number;
}

// Delivery interface
export interface Delivery {
  _id: string;
  type: DeliveryType;
  specs: Specs;
  pickupAddress: Address;
  dropOffAddress: Address;
  trackingNumber: string;
  state: DeliveryState;
  sender: Person;
  receiver: Receiver;
  holder: Person;
  cod: number;
  creationSrc: string;
  isFulfillmentOrder: boolean;
  isBostaFulfillmentOrder: boolean;
  allowToOpenPackage: boolean;
  callsNumber: number;
  smsNumber: number;
  attemptsCount: number;
  createdAt: string;
  updatedAt: string;
  creationTimestamp: number;
  numberOfAttempts: number;
  isPudoOrder: boolean;
}

// Sub-interfaces for nested objects
export interface DeliveryType {
  code: number;
  value: string;
}

export interface Specs {
  size: string;
  weight: number;
  packageDetails: PackageDetails;
  packageType: string;
}

export interface PackageDetails {
  itemsCount: number;
  description: string;
}

export interface Address {
  country: Country;
  city: City;
  zone: Zone;
  district: District;
  firstLine: string;
  buildingNumber: string;
  floor: string;
  apartment: string;
  geoLocation?: any; // null in your response, but you can adjust it if needed
}

export interface Country {
  _id: string;
  name: string;
  code: string;
}

export interface City {
  _id: string;
  name: string;
  sector: number;
  nameAr: string;
}

export interface Zone {
  _id: string;
  name: string;
  nameAr: string;
}

export interface District {
  _id: string;
  name: string;
  nameAr: string;
  fmCode: string;
}

export interface DeliveryState {
  value: string;
  code: number;
  deliveryTime?: any; // null in your response, adjust if needed
}

export interface Person {
  _id: string;
  phone: string;
  name: string;
  type?: string; // Sender specific
  subAccountId?: any; // Sender specific, null in your response
  role?: string; // Holder specific
}

export interface Receiver {
  _id: string;
  phone: string;
  firstName: string;
  lastName: string;
  fullName: string;
  secondPhone?: any; // null in your response, adjust if needed
}
