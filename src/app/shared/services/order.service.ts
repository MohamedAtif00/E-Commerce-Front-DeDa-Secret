import { Injectable } from "@angular/core";
import { GenericCRUDService } from "../../core/services/genenric-crud.service";
import { development } from "../../../environments/environment";
import { CreateOrder, GetAllOrders } from "../model/order.model";
import { HttpClient } from "@angular/common/http";
import { GeneralResponse, PageList } from "../../core/model/general-response.model";
import { GetAllProducts } from "../model/product.model";


@Injectable({
    providedIn:'root'
})
export class OrderService
{


    private _addOrder = development.localhosts.order.createOrder
    private _getAllOrders = development.localhosts.order.getAllOrders

    constructor(private _http:GenericCRUDService) { }


    AddOrder(order:CreateOrder)
    { 
        return this._http.genericPostAPIData<GeneralResponse<any>>(this._addOrder,order);
    }

    GetAllOrders(id:number)
    { 
        return this._http.genericGetAPIData<GeneralResponse<PageList<GetAllOrders[]>>>(this._getAllOrders+id);
    }

}