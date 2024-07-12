import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentOrderTableComponent } from './recent-order-table/recent-order-table.component';



@NgModule({
  declarations: [
    RecentOrderTableComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    RecentOrderTableComponent
  ]
})
export class TablesModule { }
