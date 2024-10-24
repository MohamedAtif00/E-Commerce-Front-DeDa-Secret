import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { GeneralInfoComponent } from './add-product/general-info/general-info.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdministrationComponent } from './administration/administration.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { CategoryResolver } from './service/category-resolver.resolver';
import { ManageCouponComponent } from './manage-coupon/manage-coupon.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'products', component: ManageProductsComponent },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    children: [{ path: '', component: GeneralInfoComponent }],
  },
  { path: 'orders', component: ManageOrdersComponent },
  { path: 'order-details/:id', component: OrderDetailsComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
    children: [{ path: '', component: GeneralInfoComponent }],
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    resolve: { categoriesData: CategoryResolver },
  },
  { path: 'administration', component: AdministrationComponent },
  { path: 'contact', component: ManageContactComponent },
  {
    path: 'shipment',
    loadChildren: () =>
      import('./shipment/shipment.module').then((x) => x.ShipmentModule),
  },
  { path: 'coupon', component: ManageCouponComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
