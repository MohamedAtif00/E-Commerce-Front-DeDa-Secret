import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../model/coupon.model';
import { development } from '../../../environments/environment';
import { GenericCRUDService } from '../../core/services/genenric-crud.service';
import { GeneralResponse } from '../../core/model/general-response.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private _addCoupon = development.localhosts.coupon.addCoupon;
  private _getAllCoupons = development.localhosts.coupon.getAllCoupons;
  private _getCoupon = development.localhosts.coupon.getCouponByCode;

  constructor(private http: GenericCRUDService) {}

  getCoupons(): Observable<GeneralResponse<Coupon[]>> {
    return this.http.genericGetAPIData<GeneralResponse<Coupon[]>>(
      this._getAllCoupons
    );
  }

  GetCouponByCode(code: string) {
    return this.http.genericGetAPIData<GeneralResponse<Coupon>>(
      this._getCoupon + code
    );
  }

  addCoupon(coupon: Coupon): Observable<GeneralResponse<Coupon>> {
    return this.http.genericPostAPIData<GeneralResponse<Coupon>>(
      this._addCoupon,
      coupon
    );
  }
}
