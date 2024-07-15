import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { GeneralInfoComponent } from './add-product/general-info/general-info.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'products', component: ManageProductsComponent },
  { path: 'orders', component: ManageOrdersComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  {
    path: 'add-product', component: AddProductComponent, children: [
      {path:'',component:GeneralInfoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
