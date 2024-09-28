import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentComponent } from './shipment.component';
import { BostaLoginComponent } from './bosta-login/bosta-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BostaInterceptor } from './interceptor/bosta-auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { PickUpAddressComponent } from './components/pickup-address/pickup-address.component';

@NgModule({
  declarations: [
    ShipmentComponent,
    BostaLoginComponent,
    ProfileComponent,
    PickUpAddressComponent,
  ],
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BostaInterceptor,
      multi: true,
    },
  ],
})
export class ShipmentModule {}
