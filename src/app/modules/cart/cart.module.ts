import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { CheckOutComponent } from './cart-list/check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CartListComponent, CheckOutComponent, OrderSuccessComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    CartRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    DialogModule,
    ButtonModule,
  ],
})
export class CartModule {}
