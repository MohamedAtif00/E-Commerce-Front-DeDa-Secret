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
import { AdminLoginComponent } from '../admin/admin-login/admin-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceRangeComponent } from './filter-group/price-range/price-range.component';
import { CarouselCardComponent } from './carousel-card/carousel-card.component';

import { CarouselModule } from 'ngx-carousel-ease';
import { HomeCarouselReviesComponent } from './home-carousel-revies/home-carousel-revies.component';
import { GallaryComponent } from './gallary/gallary.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    HomeComponent,
    CarouselHomeComponent,
    HeroComponent,
    AboutComponent,
    ProductsGroupComponent,
    FilterGroupComponent,
    PaginationComponent,
    AdminLoginComponent,
    PriceRangeComponent,
    CarouselCardComponent,
    HomeCarouselReviesComponent,
    GallaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ProductCarouselComponent,
    CardComponent,
    ReactiveFormsModule,
    CarouselModule,
    ProgressSpinnerModule,
  ],
  exports: [PaginationComponent, FilterGroupComponent],
})
export class HomeModule {}
