import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';
import { ProductsGroupComponent } from './products-group/products-group.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { FilterGroupComponent } from './filter-group/filter-group.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    HomeComponent,
    CarouselHomeComponent,
    HeroComponent,
    AboutComponent,
    ProductsGroupComponent,
    FilterGroupComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductCarouselComponent,
    CardComponent
  ]
})
export class HomeModule { }
