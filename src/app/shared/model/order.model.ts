class CreateOrder {
  CustomerId: { value: string | null };
  OrderItemDTOs: OrderItem[];
  Address: Address;
  CustomerName: string;
  PhoneNumber: string;
}

class OrderItem {
  ProductId: string;
  quantity: number;
}

class Address {
  state: string; // The state or region
  stateId: string;
  city: string; // The city
  cityId: string;
  firstLine: string; // First line of the address (could be building/house number and street)
  secondLine?: string; // Optional field for additional address details (service or other)
  buildingNumber: string; // Building number (specific to the address)
  floor: string; // Floor number (if applicable)
  apartment: string; // Apartment or unit number (if applicable)

  constructor(
    state: string,
    city: string,
    street: string,
    addressFirstLine: string,
    buildingNumber: string,
    floor: string,
    apartment: string,
    addressService?: string // Optional field
  ) {
    this.state = state;
    this.city = city;
    this.firstLine = addressFirstLine;
    this.buildingNumber = buildingNumber;
    this.floor = floor;
    this.apartment = apartment;
    this.secondLine = addressService;
  }
}

class GetAllOrders {
  id: string;
  state: string;
  createdDate: string;
  customerName: string;
  address: Address;
  phoneNumber: string;
  totalPrice: number;
}

export { CreateOrder, OrderItem, Address, GetAllOrders };
