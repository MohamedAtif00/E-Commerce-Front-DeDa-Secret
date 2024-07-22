import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BasketService } from '../../../services/basket.service';
import { BasketItem } from '../../../model/basket.model';

@Component({
  selector: 'app-inner-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inner-card.component.html',
  styleUrl: './inner-card.component.scss'
})
export class InnerCardComponent {

  @Input() productName:string;
  @Input() productPrice: number;
  @Input() productImage: string;
  @Input() productId: string;

  constructor(private basketService:BasketService) { }


  clicked()
  {
    console.log('Clicked');
    
  }

  AddToCart()
  { 
    let item: BasketItem = {ProductId:this.productId,Quantity:1,UnitPrice:this.productPrice,Total:this.productPrice} 
    this.basketService.addItem(item);

    this.basketService.cart$.subscribe(data =>
    { 
      console.log('basket info',data);

    })

    
    
  }

}
