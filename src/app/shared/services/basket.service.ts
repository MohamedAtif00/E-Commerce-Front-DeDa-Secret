import { Injectable, signal } from "@angular/core";
import { GenericCRUDService } from "../../core/services/genenric-crud.service";
import { Product } from "../model/product.model";
import { ProductService } from "./product.service";
import { Basket, BasketItem } from "../model/basket.model";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";


export const mockItems: any[] = [

];






@Injectable(
    {
        providedIn: 'root'
    }
)
export class BasketService
{   
    private basketKey = 'basketItems';
  private cartSubject = new BehaviorSubject<Basket>(this.getInitialBasket());
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private getInitialBasket(): Basket {
    const basket = localStorage.getItem(this.basketKey);
    return basket ? JSON.parse(basket) : new Basket();
  }

  private updateLocalStorage(basket: Basket): void {
    localStorage.setItem(this.basketKey, JSON.stringify(basket));
    this.cartSubject.next(basket);
  }

  addItem(product: BasketItem): void {
    const basket = this.getInitialBasket();
    const index = basket.BasketItems.findIndex(item => item.ProductId === product.ProductId);
    if (index === -1) {
      product.Total = product.Quantity * product.UnitPrice;
      basket.BasketItems.push(product);
    } else {
      basket.BasketItems[index].Quantity += product.Quantity;
      basket.BasketItems[index].Total = basket.BasketItems[index].Quantity * basket.BasketItems[index].UnitPrice;
    }
    basket.totalAmount = this.calculateTotalAmount(basket.BasketItems);
    this.updateLocalStorage(basket);
  }

  removeOneItem(productId: string): void {
    const basket = this.getInitialBasket();
    const index = basket.BasketItems.findIndex(item => item.ProductId === productId);
    if (index !== -1) {
      if (basket.BasketItems[index].Quantity > 1) {
        basket.BasketItems[index].Quantity -= 1;
        basket.BasketItems[index].Total = basket.BasketItems[index].Quantity * basket.BasketItems[index].UnitPrice;
      } else {
        basket.BasketItems.splice(index, 1);
      }
      basket.totalAmount = this.calculateTotalAmount(basket.BasketItems);
      this.updateLocalStorage(basket);
    }
  }

  removeItem(productId: string): void {
    const basket = this.getInitialBasket();
    const index = basket.BasketItems.findIndex(item => item.ProductId === productId);
    if (index !== -1) {
      basket.BasketItems.splice(index, 1);
      basket.totalAmount = this.calculateTotalAmount(basket.BasketItems);
      this.updateLocalStorage(basket);
    }
  }

  clearBasket(): void {
        localStorage.removeItem(this.basketKey);
        this.cartSubject.next(new Basket());
    }


  private calculateTotalAmount(items: BasketItem[]): number {
    return items.reduce((acc, item) => acc + item.Total, 0);
  }

  getBasketItems(): BasketItem[] {
    return this.getInitialBasket().BasketItems;
  }
}





