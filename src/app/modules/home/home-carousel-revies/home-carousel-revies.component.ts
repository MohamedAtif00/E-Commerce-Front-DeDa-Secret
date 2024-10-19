import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Review } from '../../../shared/model/review.model';
import { NgxGlideComponent } from 'ngx-glide';

@Component({
  selector: 'app-home-carousel-revies',
  templateUrl: './home-carousel-revies.component.html',
  styleUrl: './home-carousel-revies.component.scss',
})
export class HomeCarouselReviesComponent implements OnInit {
  reviews: Review[];

  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.GetAllReviews().subscribe((data) => {
      console.log('Reviews', data);
      this.reviews = data.value;
    });
  }

  getRating(review: Review) {
    return new Array(review.rating);
  }

  getUnRating(review: Review) {
    return new Array(5 - review.rating);
  }
}
