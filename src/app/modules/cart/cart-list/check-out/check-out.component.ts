import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../../../shared/services/order.service';
import { Address, CreateOrder, OrderItem } from '../../../../shared/model/order.model';
import { BasketService } from '../../../../shared/services/basket.service';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit{

  contactForm: FormGroup;
  submitted = false

  constructor(private fb: FormBuilder,
    private orderService: OrderService,
    private basketService: BasketService,
    private router:Router
  ) {
      this.contactForm = this.fb.group({
        fullName: ['', Validators.required],
        phoneNumber: ['', [Validators.required/*, Validators.pattern(/^[0-9]{10}$/)*/]],
        address: this.fb.group({
          streetName: ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required]
        })
      });
    }

  ngOnInit(): void {
      initFlowbite()
    }

  onSubmit() {
      console.log(this.contactForm);
      
      if (this.contactForm.valid) {
        // Create Order Items and Adding to the odrer
        let orderItems: OrderItem[] = []
        let basketItems = this.basketService.getBasketItems();
        basketItems.forEach(e => {
          let orderItem: OrderItem = { ProductId: e.ProductId, quantity: e.Quantity }
          orderItems.push(orderItem)
        })
      
        // Create Address Object
        let address: Address = { state: this.state.value, city: this.city.value, street:this.streetName.value}


        let order: CreateOrder = {
          CustomerId: null, OrderItemDTOs: orderItems,
          Address: address,
          CustomerName: this.fullName.value,
          PhoneNumber: this.phoneNumber.value
        }
        
        
        this.orderService.AddOrder(order).subscribe(data =>
        { 
          console.log(data);
          if (data.isSuccess)
          { 
            this.basketService.clearBasket()
            this.router.navigate([''])
          }
        })
      } else {
        console.log('Form is invalid');
      }
    }

  
  
  
  get fullName() {
    return this.contactForm.get('fullName');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get streetName() {
    return this.contactForm.get('address.streetName');
  }

  get state() {
    return this.contactForm.get('address.state');
  }

  get city() {
    return this.contactForm.get('address.city');
  }
}
