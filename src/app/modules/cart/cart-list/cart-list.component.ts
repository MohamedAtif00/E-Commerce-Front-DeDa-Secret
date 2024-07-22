import { Component, OnInit, signal } from '@angular/core';
import { BasketService } from '../../../shared/services/basket.service';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../../shared/services/product.service';
import { GetAllProducts } from '../../../shared/model/product.model';
import { BasketItem } from '../../../shared/model/basket.model';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  products = signal<GetAllProducts[]>([])

  constructor(private basketService: BasketService, private productService: ProductService) {}

  ngOnInit(): void {
    const basketItems = this.basketService.getBasketItems()
    const productRequests = basketItems.map(item => this.productService.GetSingleProduct(item.ProductId));

    forkJoin(productRequests).subscribe(productData => {
      this.products.set(productData.map(e =>e.value));
      this.products().forEach(product => {
        this.productService.GetProductMasterImage(product.id).subscribe(blob => {
          this.createImageFromBlob(blob).then(imageData => {
            product.masterImage = imageData; // assuming your product model has a masterImage property
          }).catch(error => {
            console.error('Error converting image blob to base64', error);
          });
        });
      });
    });


  }

  private createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result as string);
      }, false);

      reader.addEventListener('error', () => {
        reject(new Error('Failed to read the Blob as a Data URL.'));
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      } else {
        reject(new Error('No Blob provided.'));
      }
    });
  }


  AddOne(id:string)
  {
    let Item: BasketItem = {ProductId:id,Quantity:1,UnitPrice:this.basketService.getBasketItems().find(e => e.ProductId === id).UnitPrice,Total:0}
    this.basketService.addItem(Item);
  }
  
  RemoveOne(id: string) {
      // Remove one item from the basket
      this.basketService.removeOneItem(id);
      
      // Find the item in the basket
      let item = this.basketService.getBasketItems().find(e => e.ProductId === id);
      
      // Check if the item is null or its quantity is zero
      if (item == null || item.Quantity == 0) {
        // Remove the item from the basket
        this.basketService.removeItem(id);
        
        // Remove the item from the products array
        this.products.set(this.products().filter(product => product.id !== id));
      }
  }


   getQuantity(productId: string): number {
    const basketItem = this.basketService.getBasketItems().find(item => item.ProductId === productId);
    return basketItem ? basketItem.Quantity : 0;
  }

  getTotal(productId: string): number {
    const basketItem = this.basketService.getBasketItems().find(item => item.ProductId === productId);
    return basketItem ? basketItem.Total : 0;
  }


  OpenCheck()
  { 

  }
}
