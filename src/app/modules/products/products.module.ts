import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './product-detail/comment/comment.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { PageModule } from '../../page/page.module';
import { PaginationComponent } from '@coreui/angular';
import { CardComponent } from '../../shared/components/card/card.component';
import { AppModule } from '../../app.module';
import { FilterGroupComponent } from '../home/filter-group/filter-group.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    RatingModule,
    PaginationComponent,
    CardComponent,
    HomeModule,
  ],
})
export class ProductsModule {}
