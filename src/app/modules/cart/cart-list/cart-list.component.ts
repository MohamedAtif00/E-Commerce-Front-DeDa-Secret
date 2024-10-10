import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketService } from '../../../shared/services/basket.service';
import { Subscription, forkJoin } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import {
  GetSingleProduct,
  Image,
  Product,
} from '../../../shared/model/product.model';
import { BasketItem } from '../../../shared/model/basket.model';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CouponService } from '../../../shared/services/coupon.service';
import { ToastrService } from 'ngx-toastr';
import { Coupon } from '../../../shared/model/coupon.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  products: GetSingleProduct[] = [];

  originalPrice: number = 0;
  total: number = 0;
  saving: number = 0;

  basketItems: BasketItem[] = [];
  productRequest: Subscription = new Subscription();

  // Coupon
  couponCode: string = '';
  coupon: Coupon;

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    public translate: TranslateService,
    private sanitizer: DomSanitizer,
    private couponService: CouponService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.basketItems = this.basketService.getBasketItems();
    this.calculateTotals();

    const productRequests = this.basketItems.map((item) =>
      this.productService.GetSingleProduct(item.ProductId)
    );
    this.productRequest = forkJoin(productRequests).subscribe({
      next: (productData) => {
        console.log('step 1');
        console.log(productData);

        this.products = productData.map((e) => e.value);
        console.log(this.products);

        console.log('step 2');

        this.products.forEach((product) => {
          this.saving =
            product._price._discount != 0
              ? this.saving + this.getSaving(product)
              : this.saving + 0;

          // Start Get Images
          this.productService.GetProductMasterImage(product.id).subscribe({
            next: (blob) => {
              console.log('start blob conversion');

              this.createImageFromBlob(blob).then((image) => {
                product.masterImage = {
                  id: product.id,
                  isMaster: true,
                  path: '',
                  created: '',
                  productId: product.id,
                  name: product._name,
                  url: image,
                };
                console.log('Completed');
              });
            },
            error: (error) => {
              console.error(
                `Error fetching image for product ${product.id}:`,
                error
              );
              // Optionally, set a default image or handle the error gracefully
              //product.masterImage.url = 'path/to/default-image.jpg'; // Replace with your default image path
            },
          });
        });
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.productRequest.unsubscribe();
  }

  calculateTotals(): void {
    this.originalPrice = this.basketItems.reduce(
      (total, item) => total + item.UnitPrice * item.Quantity,
      0
    );
    this.total = this.basketItems.reduce(
      (total, item) => total + item.Total,
      0
    );
  }

  createObjectURL(file: Blob | File): string {
    return URL.createObjectURL(file);
  }

  AddOne(id: string): void {
    const existingItem = this.basketItems.find((e) => e.ProductId === id);
    if (existingItem) {
      this.basketService.addItem({
        ProductId: id,
        Quantity: 1,
        UnitPrice: existingItem.UnitPrice,
        Total: existingItem.UnitPrice,
      });
      this.updateBasketItems();
    }
  }

  RemoveOne(id: string): void {
    this.basketService.removeOneItem(id);
    this.updateBasketItems();
  }

  Remove(product: GetSingleProduct): void {
    this.basketService.removeItem(product.id);
    this.updateBasketItems();
  }

  private updateBasketItems(): void {
    this.basketItems = this.basketService.getBasketItems();
    this.calculateTotals();
    this.products = this.products.filter((product) =>
      this.basketItems.some((item) => item.ProductId === product.id)
    );
  }

  getQuantity(productId: string): number {
    const basketItem = this.basketItems.find(
      (item) => item.ProductId === productId
    );
    return basketItem ? basketItem.Quantity : 0;
  }

  getTotal(productId: string): number {
    const basketItem = this.basketItems.find(
      (item) => item.ProductId === productId
    );
    return basketItem ? basketItem.Total : 0;
  }

  openCheck(): void {
    // Implement functionality if needed
  }

  // Create Image From Blob
  private createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          resolve(reader.result as string);
        },
        false
      );

      reader.addEventListener(
        'error',
        () => {
          reject(new Error('Failed to read the Blob as a Data URL.'));
        },
        false
      );

      if (image) {
        reader.readAsDataURL(image);
      } else {
        reject(new Error('No Blob provided.'));
      }
    });
  }
  //

  getTruncatedDescription(description: string, maxLength: number): SafeHtml {
    // Strip HTML tags to ensure accurate length calculation
    const strippedDescription = description.replace(/<[^>]+>/g, '');

    // Check if description exceeds maxLength and truncate
    if (strippedDescription.length > maxLength) {
      const truncated = strippedDescription.slice(0, maxLength) + '...';

      // Return safe HTML
      return this.sanitizer.bypassSecurityTrustHtml(truncated);
    }

    // Return full description if it's within the length limit
    return this.sanitizer.bypassSecurityTrustHtml(strippedDescription);
  }

  getSaving(product: GetSingleProduct): number {
    const price = product._price._price; // Get the original price
    const discountPercentage = product._price._discount; // Get the discount percentage

    // Calculate savings based on the discount percentage
    const savings = (price * discountPercentage) / 100;

    return savings;
  }

  ApplyCode() {
    if (this.couponCode) {
      this.couponService.GetCouponByCode(this.couponCode).subscribe((data) => {
        if (data.isSuccess) {
          if (data.successMessage) this.toastr.error(data.successMessage);
          this.coupon = data.value;
        } else {
          this.toastr.error(data.errors[0]);
        }
      });
    }
  }
}
