import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketService } from '../../../shared/services/basket.service';
import { Subscription, forkJoin, map, of } from 'rxjs';
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
          const basketItem = this.basketItems.find(
            (item) => item.ProductId === product.id
          );
          const quantity = basketItem ? basketItem.Quantity : 0; // Get the quantity from the basket

          // Calculate total saving based on the fixed discount and quantity
          this.saving += this.getSaving(product) * quantity;

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
    // calc Orignal Price
    let items: BasketItem[] = [];
    let productObservables = this.basketItems.map((item) => {
      // Check if the item hasn't been processed already
      if (!items.find((x) => x.ProductId === item.ProductId)) {
        // Add item to the processed list
        items.push(item);
        // Return the observable that fetches the product details
        return this.productService.GetSingleProduct(item.ProductId).pipe(
          // Map the observable to return the total price for this product
          map((data) => data.value._price._price * item.Quantity)
        );
      }
      return of(0); // Return 0 if the item has already been processed
    });

    // Use forkJoin to wait for all product observables to complete
    forkJoin(productObservables).subscribe((productPrices) => {
      // Sum up the total price
      this.originalPrice = productPrices.reduce(
        (total, price) => total + price,
        0
      );
    });

    ///////////////////////////////////////

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
      this.productService
        .GetSingleProduct(existingItem.ProductId)
        .subscribe((data) => {
          this.saving += this.getSaving(data.value);
        });
      this.updateBasketItems();
    }
  }

  RemoveOne(id: string): void {
    this.basketService.removeOneItem(id);
    this.productService.GetSingleProduct(id).subscribe((data) => {
      this.saving = this.saving - this.getSaving(data.value);
    });
    this.updateBasketItems();
  }

  Remove(product: GetSingleProduct): void {
    // Find the corresponding basket item to get the quantity
    const basketItem = this.basketItems.find(
      (item) => item.ProductId === product.id
    );

    if (basketItem) {
      const quantity = basketItem.Quantity;
      const savingsToRemove = this.getSaving(product) * quantity;

      // Subtract the saving for this product
      this.saving -= savingsToRemove;

      // Remove the product from the basket
      this.basketService.removeItem(product.id);
      this.updateBasketItems();
    }
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
    const originalPrice = product._price._price; // Get the original price
    const discountAmount = product._price._discount; // Assuming _discount is a fixed amount

    // Check if there's a valid discount amount
    if (discountAmount && discountAmount > 0) {
      // Return the fixed discount amount directly
      return discountAmount;
    } else {
      // No discount, so no savings
      return 0;
    }
  }

  ApplyCode() {
    if (this.couponCode) {
      this.couponService.GetCouponByCode(this.couponCode).subscribe((data) => {
        if (data.isSuccess) {
          if (data.successMessage) {
            this.toastr.error(data.successMessage);
          } else {
            this.coupon = data.value; // Coupon successfully applied
            this.toastr.success('Discount applied');

            // Now apply the discount to the total
            this.calculateDiscount();
          }
        } else {
          this.toastr.error(data.errors[0]);
        }
      });
    }
  }

  calculateDiscount(): void {
    if (this.coupon) {
      if (this.coupon.discount) {
        // Apply percentage discount
        this.saving = (this.total * this.coupon.discount) / 100;
      } else if (this.coupon.discount) {
        // Apply fixed discount amount
        this.saving = this.coupon.discount;
      }

      // Ensure the savings do not exceed the total
      this.saving = Math.min(this.saving, this.total);

      // Subtract the saving from the total to get the final total
      this.total = this.total - this.saving;
    }
  }
}
