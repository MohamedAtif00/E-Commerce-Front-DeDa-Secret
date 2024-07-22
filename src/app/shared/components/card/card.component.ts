import { Component, Input } from '@angular/core';
import { OutCardComponent } from './out-card/out-card.component';
import { InnerCardComponent } from './inner-card/inner-card.component';
import { GetAllProducts, Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [OutCardComponent,InnerCardComponent,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {


  @Input() product:GetAllProducts;


}
