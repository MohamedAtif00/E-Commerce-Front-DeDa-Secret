import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../../../core/services/genenric-crud.service';
import { AddressResponse } from '../model/address.model';
import { development } from '../../../../environments/environment';
import { GeneralResponse } from '../../../core/model/general-response.model';
import { Address } from '../../../shared/model/order.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private _getDestricts = development.localhosts.address.getAllDistricts;
  private _addPickupAddress = development.localhosts.address.addPickupAddress;

  constructor(private _http: GenericCRUDService) {}

  GetAllCities() {
    return this._http.genericGetAPIData<AddressResponse>(this._getDestricts);
  }

  GetAllPickupAddress() {}

  AddPickupAddress(request: Address) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this._addPickupAddress,
      request
    );
  }
}
