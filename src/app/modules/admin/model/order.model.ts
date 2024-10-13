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
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  priceForUnit: number;
  url?: string;
}

export interface UpdateOrder {
  orderId: string;
  state?: OrderState;
  trackingNumber?: string;
  address?: Address;
}

export interface ChangeStateRequest {
  id: string;
  state: OrderState;
}

export enum OrderState {
  Pending = 'Pending',
  PickupRequested = 'PickupRequested',
  WaitingForRoute = 'WaitingForRoute',
  RouteAssigned = 'RouteAssigned',
  PickedUpFromBusiness = 'PickedUpFromBusiness',
  PickingUpFromConsignee = 'PickingUpFromConsignee',
  PickedUpFromConsignee = 'PickedUpFromConsignee',
  ReceivedAtWarehouse = 'ReceivedAtWarehouse',
  Fulfilled = 'Fulfilled',
  InTransitBetweenHubs = 'InTransitBetweenHubs',
  PickingUp = 'PickingUp',
  PickedUp = 'PickedUp',
  PendingCustomerSignature = 'PendingCustomerSignature',
  DebriefedSuccessfully = 'DebriefedSuccessfully',
  Delivered = 'Delivered',
  ReturnedToBusiness = 'ReturnedToBusiness',
  Exception = 'Exception',
  Terminated = 'Terminated',
  CanceledUncoveredArea = 'CanceledUncoveredArea',
  CollectionFailed = 'CollectionFailed',
  ReturnedToStock = 'ReturnedToStock',
  Lost = 'Lost',
  Damaged = 'Damaged',
  Investigation = 'Investigation',
  AwaitingYourAction = 'AwaitingYourAction',
  Archived = 'Archived',
  OnHold = 'OnHold',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
  Delivering = 'Delivering',
}
