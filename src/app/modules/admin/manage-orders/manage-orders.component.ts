import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { Dropdown } from 'flowbite'
import type { DropdownOptions, DropdownInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { development } from '../../../../environments/environment';
import { GetAllOrders } from '../../../shared/model/order.model';
import { PageList } from '../../../core/model/general-response.model';


class orders
{ 
  
}



@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss'
})
export class ManageOrdersComponent implements OnInit{

  orders: GetAllOrders[];
  page: PageList<GetAllOrders[]>;

  constructor(private orderService:OrderService) { }


  ngOnInit(): void {
     this.DropDownMenuConfiguration()
    this.GetAllOrders(1);
  }

  GetAllOrders(id:number)
  { 
    this.orderService.GetAllOrders(id).subscribe(data =>
    { 
      console.log(data);
      this.orders = data.value.items
      this.page = data.value
    })
  }

  GoToPage(page:number)
  { 
    this.GetAllOrders(page);
  }





  DropDownMenuConfiguration()
  { 
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
        delay: 300
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'dropdownMenu',
      override: true
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
}
