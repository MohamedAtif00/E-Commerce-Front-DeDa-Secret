import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
  selector: 'app-product-order-table',
  templateUrl: './product-order-table.component.html',
  styleUrl: './product-order-table.component.scss'
})
export class ProductOrderTableComponent implements OnInit{


  constructor(private orderService:OrderService) { }


  ngOnInit(): void {
      
  }

  

}
