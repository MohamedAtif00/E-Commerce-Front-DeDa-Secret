import { Component } from '@angular/core';
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-products-group',
  templateUrl: './products-group.component.html',
  styleUrl: './products-group.component.scss'
})
export class ProductsGroupComponent {

  product:Product = {name:'First Product',price:100}


}
