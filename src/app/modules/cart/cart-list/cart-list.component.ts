import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketService } from '../../../shared/services/basket.service';
import { Subscription, forkJoin } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import { GetSingleProduct, Image } from '../../../shared/model/product.model';
import { BasketItem } from '../../../shared/model/basket.model';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    public translate: TranslateService
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
          console.log('step 3');
          console.log(product.id);

          console.log('Here');

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
}
