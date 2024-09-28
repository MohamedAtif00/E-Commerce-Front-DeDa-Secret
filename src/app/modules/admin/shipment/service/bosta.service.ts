import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../../../../core/services/genenric-crud.service';
import { HttpHeaders } from '@angular/common/http';
import { BostaAuthentication } from './bosta-auth.service';
import { bosta } from '../static/bosta-info';
import {
  AddDeliveryRequest,
  AddShipmentResponse,
} from '../model/add-shipment.model';

@Injectable()
export class BostaService {
  private _addDelivery = bosta.addDelivery;

  headers = new HttpHeaders().set('Authorization', this.auth.getToken());

  constructor(
    private _http: GenericCRUDService,
    private auth: BostaAuthentication
  ) {}

  AddDelivery(request: AddDeliveryRequest) {
    return this._http.genericPostAPIData<AddShipmentResponse>(
      this._addDelivery,
      request
    );
  }
}
