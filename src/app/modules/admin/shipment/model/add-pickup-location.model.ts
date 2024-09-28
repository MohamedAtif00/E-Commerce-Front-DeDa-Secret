export interface Address {
  districtId: string;
  firstLine: string;
}

export interface Contact {
  firstName: string;
  lastName: string;
  phone: string;
  isDefault: boolean; // should be a boolean rather than a string
}

export interface AddPickUpLocationRequest {
  address: Address;
  contacts: Contact[];
  locationName: string;
}
