import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentOrderTableComponent } from './recent-order-table/recent-order-table.component';
import { ProductOrderTableComponent } from './product-order-table/product-order-table.component';



@NgModule({
  declarations: [
    RecentOrderTableComponent,
    ProductOrderTableComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    RecentOrderTableComponent,
    ProductOrderTableComponent
  ]
})
export class TablesModule { }
