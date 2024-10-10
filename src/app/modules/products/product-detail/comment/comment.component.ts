import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import {
  GetSingleProduct,
  Product,
} from '../../../../shared/model/product.model';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Review } from '../../../../shared/model/review.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  modalVisible: boolean;
  rating: number;
  @Input() review: Review;
  comment: string;
  @Input() product: GetSingleProduct;
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // ShowDialog() {
  //   this.modalVisible = !this.modalVisible;
  // }

  Submite() {
    this.productService
      .AddComment({
        ProductId: this.product.id,
        rating: this.rating,
        comment: this.comment,
      })
      .pipe(
        catchError((error) => {
          this.toastr.error('Try again later!');
          throw error;
        })
      )
      .subscribe((data) => {
        if (data.isSuccess) {
          this.toastr.success('Review Sent');
        } else {
          this.toastr.error('Please try again later!');
        }
      });
  }

  getRating() {
    return new Array(this.review.rating);
  }

  getUnRating() {
    return new Array(5 - this.review.rating);
  }
}
