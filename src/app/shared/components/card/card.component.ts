import { Component, Input } from '@angular/core';
import { OutCardComponent } from './out-card/out-card.component';
import { InnerCardComponent } from './inner-card/inner-card.component';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [OutCardComponent,InnerCardComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {


  @Input() Produtc:Product;


}
