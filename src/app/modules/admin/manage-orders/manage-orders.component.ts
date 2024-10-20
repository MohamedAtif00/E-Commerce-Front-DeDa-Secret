import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { development } from '../../../../environments/environment';
import { GetAllOrders } from '../../../shared/model/order.model';
import { PageList } from '../../../core/model/general-response.model';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { ShipmentService } from '../service/shipment.service';
import { BostaService } from '../shipment/service/bosta.service';

class orders {}

class OrderStetes {
  name: string;
  value: number;
}

enum states {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Denied = 'Denied',
}

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss',
})
export class ManageOrdersComponent implements OnInit {
  orders: GetAllOrders[];
  page: PageList<GetAllOrders[]>;
  search: string;
  sort: string;
  sortDescending: boolean = false; // Added property for sort direction

  // Stetes For dropdown list
  states: OrderStetes[] = [];
  chooseState = Object.values(states);
  constructor(
    private orderService: OrderService,
    private router: Router,
    public translation: TranslationService,
    private shipmentService: ShipmentService,
    private bostaService: BostaService
  ) {}

  ngOnInit(): void {
    this.DropDownMenuConfiguration();
    this.GetAllOrders(1);
    this.GetOrderStetes();
  }

  GetAllOrders(
    page: number,
    sortColumn?: string,
    search?: string,
    des: boolean = false
  ) {
    this.orderService
      .GetAllOrders(page, sortColumn, search, des)
      .subscribe((data) => {
        this.orders = data.value.items;
        this.orders.forEach((order) => {
          if (order.trackingNumber) {
            this.bostaService
              .GetAllDeliveries(order.trackingNumber)
              .subscribe((data) => {
                console.log('single delivery', data.data.deliveries);
                order.state = data.data.deliveries[0].state.value;
              });
          }
        });

        this.page = data.value;
      });
  }

  GoToPage(page: number) {
    this.GetAllOrders(page, this.sort, this.search);
  }

  Search(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    this.search = inputElement.value as string;
    this.GetAllOrders(1, this.sort, this.search);
  }

  Sort(sortTerm: string) {
    // Toggle sort direction if clicking the same term
    if (sortTerm === this.sort) {
      this.sortDescending = !this.sortDescending;
    } else {
      this.sortDescending = false; // Default to ascending for new sort terms
      this.sort = sortTerm;
    }
    this.GetAllOrders(1, this.sort, this.search, this.sortDescending);
  }

  DropDownMenuConfiguration() {
    // set the dropdown menu element
    const $targetEl: HTMLElement = document.getElementById('dropdownMenu');

    // set the element that trigger the dropdown menu on click
    const $triggerEl: HTMLElement = document.getElementById('dropdownButton');

    // options with default values
    const options: DropdownOptions = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'dropdownMenu',
      override: true,
    };

    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     * instanceOptions: optional
     */
    const dropdown: DropdownInterface = new Dropdown(
      $targetEl,
      $triggerEl,
      options,
      instanceOptions
    );
  }

  GetOrderStetes() {
    this.orderService.GetOrderStetes().subscribe((data) => {
      this.states = data;
    });
  }

  Reconfig() {
    this.DropDownMenuConfiguration();
  }

  ChangeState(e: Event) {
    let value = (e.target as HTMLSelectElement).value;

    if (value == states.Accepted) {
    }
  }
}
