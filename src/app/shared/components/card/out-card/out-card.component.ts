import { Component, Input } from '@angular/core';
import { InnerCardComponent } from '../inner-card/inner-card.component';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-out-card',
  standalone: true,
  imports: [InnerCardComponent],
  templateUrl: './out-card.component.html',
  styleUrl: './out-card.component.scss'
})
export class OutCardComponent {

  @Input() Proudct:Product;


}
