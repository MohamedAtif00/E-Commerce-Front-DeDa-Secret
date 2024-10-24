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
  private _getAllPickupAddresses =
    development.localhosts.address.getAllPickupAddress;
  private _getActivePickupAddress =
    development.localhosts.address.getActivePickupAddress;

  constructor(private _http: GenericCRUDService) {}

  GetAllCities() {
    return this._http.genericGetAPIData<AddressResponse>(this._getDestricts);
  }

  GetAllPickupAddress() {
    return this._http.genericGetAPIData<GeneralResponse<Address[]>>(
      this._getAllPickupAddresses
    );
  }

  GetActivePickupAddress() {
    return this._http.genericGetAPIData<GeneralResponse<Address>>(
      this._getActivePickupAddress
    );
  }

  // Add
  AddPickupAddress(request: Address) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this._addPickupAddress,
      request
    );
  }
}
