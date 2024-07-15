import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WidgetsModule } from '../../partials/content/widgets/widgets.module';
import { TablesModule } from "../../partials/content/tables/tables.module";
import { ProductRowComponent } from './manage-products/product-row/product-row.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SelectImageComponent } from './add-product/select-image/select-image.component';
import { GeneralInfoComponent } from './add-product/general-info/general-info.component';
import { NavigationComponent } from './add-product/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { ImageUploaderDirectiveDirective } from './add-product/image-uploader-directive.directive';
import { AddImagesComponent } from './add-product/general-info/add-images/add-images.component';


@NgModule({
  declarations: [
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminDashboardComponent,
    ProductRowComponent,
    OrderDetailsComponent,
    AddProductComponent,
    SelectImageComponent,
    GeneralInfoComponent,
    NavigationComponent,
    ImageUploaderDirectiveDirective,
    AddImagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    WidgetsModule,
    TablesModule
],exports:[
 
  ]
})
export class AdminModule { }
