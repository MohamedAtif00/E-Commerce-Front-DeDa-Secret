import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../../../../core/services/genenric-crud.service';
import { HttpHeaders } from '@angular/common/http';
import { BostaAuthentication } from './bosta-auth.service';
import { bosta } from '../static/bosta-info';
import {
  AddDeliveryRequest,
  AddShipmentResponse,
} from '../model/add-shipment.model';
import {
  Delivery,
  GetAllDeliviesResponse,
} from '../model/all-deliveries.model';
import { Observable } from 'rxjs';
import { GetShippingFeeResponse } from '../model/get-total-fee.model';

@Injectable({
  providedIn: 'root',
})
export class BostaService {
  private _addDelivery = bosta.addDelivery;
  private _getAllDeliveries = bosta.getAllDeliveries;
  private _getShippingFee = bosta.getShippingFee;

  headers = new HttpHeaders().set('Authorization', this.auth.getToken());

  constructor(
    private _http: GenericCRUDService,
    private auth: BostaAuthentication
  ) {}

  AddDelivery(request: AddDeliveryRequest) {
    return this._http.genericPostAPIData<AddShipmentResponse>(
      this._addDelivery,
      request,
      { headers: this.headers }
    );
  }

  GetAllDeliveries(trackingNumber?: string) {
    return this._http.genericPostAPIData<GetAllDeliviesResponse>(
      this._getAllDeliveries,
      trackingNumber ? { trackingNumbers: trackingNumber } : null,
      {
        headers: this.headers,
      }
    );
  }

  GetShippingFee(
    dropOffCity: string,
    pickupCity: string,
    cod: number,
    size: string = 'Normal'
  ): Observable<any> {
    // Build the query parameters dynamically
    const params = new URLSearchParams({
      dropOffCity,
      pickupCity,
      cod: cod.toString(),
      size,
    }).toString();

    // Make the HTTP GET request
    return this._http.genericGetAPIData<GetShippingFeeResponse>(
      `${this._getShippingFee}?${params}`,
      {
        headers: this.headers,
      }
    );
  }
}
