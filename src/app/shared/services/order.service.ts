import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../../core/services/genenric-crud.service';
import { development } from '../../../environments/environment';
import { CreateOrder, GetAllOrders } from '../model/order.model';
import { HttpClient } from '@angular/common/http';
import {
  GeneralResponse,
  PageList,
} from '../../core/model/general-response.model';
import { GetAllProducts } from '../model/product.model';
import {
  Order,
  ChangeStateRequest,
} from '../../modules/admin/model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _addOrder = development.localhosts.order.createOrder;
  private _getAllOrders = development.localhosts.order.getAllOrders;
  private _getSingleOrder = development.localhosts.order.getSingleOrder;
  private _getOrderStetes = development.localhosts.order.getOrderStetes;
  private _changeOrderState = development.localhosts.order.changeOrderState;

  constructor(private _http: GenericCRUDService) {}

  AddOrder(order: CreateOrder) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this._addOrder,
      order
    );
  }

  GetAllOrders(
    page: number,
    sortTerm?: string,
    search?: string,
    des: boolean = false
  ) {
    let query =
      this._getAllOrders +
      page +
      (search ? `&searchTerm=${search}` : '') +
      (sortTerm ? `&sortColumn=${sortTerm}` : '') +
      `&des=${des}`;
    console.log(query);

    return this._http.genericGetAPIData<
      GeneralResponse<PageList<GetAllOrders[]>>
    >(query);
  }

  GetSingleOrder(id: string) {
    return this._http.genericGetAPIData<GeneralResponse<Order>>(
      this._getSingleOrder + id
    );
  }

  GetOrderStetes() {
    return this._http.genericGetAPIData<any>(this._getOrderStetes);
  }
  // Add Order



  // Update Order
  CancelOrder(request: ChangeStateRequest) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this._changeOrderState,
      request
    );
  }
}
