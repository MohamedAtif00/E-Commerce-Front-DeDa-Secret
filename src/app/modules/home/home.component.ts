import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.cart$.subscribe((data) => {});
  }
}
