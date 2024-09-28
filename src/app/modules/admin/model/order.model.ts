import { Address } from '../../../shared/model/order.model';
import { City, District } from '../../cart/model/address.model';

export interface Order {
  state: string;
  createdDate: string;
  address: Address;
  customerName: string;
  phoneNumber: string;
  total: number;
  products: OrderItem[];
  orderId: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  priceForUnit: number;
  url?: string;
}

export interface ChangeStateRequest {
  id: string;
  state: OrderState;
}

export enum OrderState {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Expired = 'Expired',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Denied = 'Denied',
  Processing = 'Processing',
  Refunded = 'Refunded',
  Delivered = 'Delivered',
  Delivering = 'Delivering',
}
