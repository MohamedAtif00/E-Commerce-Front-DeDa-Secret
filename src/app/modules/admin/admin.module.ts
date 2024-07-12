import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WidgetsModule } from '../../partials/content/widgets/widgets.module';
import { EarningChartComponent } from '../../partials/content/widgets/earning-chart/earning-chart.component';
import { AppModule } from '../../app.module';
import { TablesModule } from "../../partials/content/tables/tables.module";


@NgModule({
  declarations: [
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    WidgetsModule,
    TablesModule
],exports:[
 
  ]
})
export class AdminModule { }
