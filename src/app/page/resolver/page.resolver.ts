import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdministrationService } from '../../core/services/administration.service';

@Injectable({
  providedIn: 'root',
})
export class PageResolver implements Resolve<any> {
  constructor(private adminService: AdministrationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.adminService.GetAdministration();
  }
}
