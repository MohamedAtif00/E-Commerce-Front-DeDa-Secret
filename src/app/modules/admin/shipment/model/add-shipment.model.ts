// Define Add Shipment Response
export interface State {
  code: number;
  value: string;
}

export interface Data {
  _id: string;
  trackingNumber: string;
  message: string;
  state: State;
}

export interface AddShipmentResponse {
  success: boolean;
  message: string;
  data: Data;
}

//  Define Add Shipment Request

export interface PackageDetails {
  itemsCount: number;
  description: string;
}

export interface Specs {
  packageType: string;
  size: string;
  packageDetails: PackageDetails;
}

export interface Address {
  city: string;
  zoneId?: string;
  districtId: string;
  firstLine: string;
  secondLine: string;
  buildingNumber: string;
  floor: string;
  apartment: string;
}

export interface Receiver {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
}

export interface AddDeliveryRequest {
  type: number;
  specs: Specs;
  notes?: string;
  cod: number;
  dropOffAddress: Address;
  pickupAddress: Address;
  returnAddress?: Address;
  businessReference?: string;
  receiver?: Receiver;
  webhookUrl?: string;
}
