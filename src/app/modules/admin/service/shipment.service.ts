import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../../../core/services/genenric-crud.service';

@Injectable()
export class ShipmentService {
  private _getAllDeliveries = `http://app.bosta.co/api/v2/deliveries/business/{trackingNumber}`;
  constructor(private _http: GenericCRUDService) {}

  AcceptOrder() {}

  GetAllDeliveries() {
    return this._http.genericGetAPIData<any>(this._getAllDeliveries);
  }

  // PickUp Location
}
