import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const expectedRole = route.data.expectedRole;
    // const userRole = this.authService.getUserRole();

    // if (userRole === expectedRole) {
    //   return true;
    // } else {
    //   this.router.navigate(['/unauthorized']);
       return false;
    // }
  }
}
