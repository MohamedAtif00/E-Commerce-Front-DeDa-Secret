import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasketService } from '../../../services/basket.service';
import { BasketItem } from '../../../model/basket.model';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inner-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inner-card.component.html',
  styleUrl: './inner-card.component.scss',
})
export class InnerCardComponent {
  @Input() productName: string;
  @Input() productPrice: number;
  @Input() productImage: string;
  @Input() productId: string;

  constructor(
    private basketService: BasketService,
    private toastrService: ToastrService
  ) {}

  clicked() {}

  AddToCart() {
    try {
      let item: BasketItem = {
        ProductId: this.productId,
        Quantity: 1,
        UnitPrice: this.productPrice,
        Total: this.productPrice,
      };
      this.basketService.addItem(item);

      this.toastrService.success(
        'product added',
        `${this.productName} Added successfully`,
        {
          enableHtml: true,
          closeButton: true,
        }
      );

      this.basketService.cart$.subscribe((data) => {});
    } catch (e) {}
  }
}
