import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BostaAuthentication } from '../service/bosta-auth.service';

@Injectable({
  providedIn: 'root',
})
export class BostaGuard implements CanActivate {
  constructor(
    private authService: BostaAuthentication,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow rou te access if user is authenticated
    } else {
      this.router.navigate(['admin', 'shipment', 'login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
