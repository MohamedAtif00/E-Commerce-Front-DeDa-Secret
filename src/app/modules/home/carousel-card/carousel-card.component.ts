import { Component, Input, input } from '@angular/core';
import { GetAllProducts } from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { BasketService } from '../../../shared/services/basket.service';
import { BasketItem } from '../../../shared/model/basket.model';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.scss',
})
export class CarouselCardComponent {
  @Input() product: GetAllProducts;
  masterImage: string;
  secondImage: string;
  @Input() buttonColor: string;
  isLoading: boolean = true; // Add a loading state

  constructor(
    private productService: ProductService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    // Set loading to true before fetching images
    this.isLoading = true;

    this.productService
      .GetProductMasterImage(this.product.id)
      .subscribe((data) => {
        this.masterImage = URL.createObjectURL(data);
      });

    this.productService.GetSingleProduct(this.product.id).subscribe((data) => {
      this.productService
        .getProductImage(this.product.id, data.value.images[0].id)
        .subscribe((image) => {
          this.secondImage = URL.createObjectURL(image.blob);
          this.isLoading = false; // Set loading to false when images are loaded
        });
    });
  }

  GetYellow() {
    return new Array(this.product._totalReviews);
  }

  GetDark() {
    return new Array(
      5 - (this.product._totalReviews ? this.product._totalReviews : 0)
    );
  }

  AddToBasket(product: GetAllProducts) {
    let item: BasketItem = {
      ProductId: product.id,
      Quantity: 1,
      UnitPrice: product._price._price,
      Total: product._price._total,
    };
    this.basketService.addItem(item);
  }
}
