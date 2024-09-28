export enum OrderTypeCode {
  Deliver = 10,
  CashCollection = 15,
  Exchange = 30,
  CustomerReturnPickup = 25,
  SignAndReturn = 35,
}

export enum PackageType {
  Parcel = 'Parcel',
  Document = 'Document',
  Bulky = 'Bulky',
}

export interface PackageDetails {
  itemsCount: number;
  description: string;
}

export interface Specs {
  packageType: PackageType;
  size: 'small';
  packageDetails: PackageDetails;
}

export interface AddDeliveryModel {
  type: number;
  specs: Specs;
  notes: string;
  cod: number; // Cash on Delivery
}
