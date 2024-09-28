import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentComponent } from './shipment.component';
import { BostaLoginComponent } from './bosta-login/bosta-login.component';
import { BostaGuard } from './guard/bosta-guard.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { PickUpAddressComponent } from './components/pickup-address/pickup-address.component';

const routes: Routes = [
  {
    path: '',
    component: ShipmentComponent,
    canActivate: [BostaGuard],
    children: [{ path: 'pickupaddress', component: PickUpAddressComponent }],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [BostaGuard] },
  { path: 'login', component: BostaLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentRoutingModule {}
