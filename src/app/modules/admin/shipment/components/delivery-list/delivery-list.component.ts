import { Component } from '@angular/core';
import { Delivery } from '../../model/all-deliveries.model';
import { BostaService } from '../../service/bosta.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.scss',
})
export class DeliveryListComponent {
  deliveries: Delivery[] = []; // To store deliveries from the API

  constructor(private bostaService: BostaService) {}

  ngOnInit(): void {
    this.GetAllDeliveries();
  }

  GetAllDeliveries() {
    this.bostaService.GetAllDeliveries().subscribe((data) => {
      console.log(data);
      this.deliveries = data.data.deliveries;
    });
  }
}
