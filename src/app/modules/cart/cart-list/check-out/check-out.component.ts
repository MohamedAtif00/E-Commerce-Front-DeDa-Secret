import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../../../shared/services/order.service';
import {
  Address,
  CreateOrder,
  OrderItem,
} from '../../../../shared/model/order.model';
import { BasketService } from '../../../../shared/services/basket.service';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { City, District } from '../../model/address.model';
import { AddressService } from '../../service/address.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { TranslationService } from '../../../../core/services/translation.service';
import { Coupon } from '../../../../shared/model/coupon.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;

  states: City[] = [];
  filteredStates: City[] = [];

  districts: District[] = [];

  stateSelected: City | undefined;
  citySelected: District | undefined;

  // coupon
  @Input() couon: Coupon | undefined;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private basketService: BasketService,
    private addressService: AddressService,
    private router: Router,
    private translateService: TranslationService
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/), // Re-enabled phone validation
        ],
      ],
      address: this.fb.group({
        state: ['', Validators.required],
        city: ['', Validators.required],
        addressFirstLine: ['', Validators.required],
        addressService: [''],
        buildingNumber: ['', Validators.required],
        floor: ['', Validators.required],
        apartment: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.GetAllCities();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Create Order Items and Add to the order
      let orderItems: OrderItem[] = [];
      let basketItems = this.basketService.getBasketItems();
      basketItems.forEach((e) => {
        let orderItem: OrderItem = {
          ProductId: e.ProductId,
          quantity: e.Quantity,
        };
        orderItems.push(orderItem);
      });

      let state = this.states.find((x) => x.cityId == this.state.value);
      let city = state.districts.find((x) => x.districtId == this.city.value);
      // Create Address Object
      let address: Address = {
        state:
          this.translateService.currentLang() == 'ar'
            ? state.cityOtherName
            : state.cityName || '',
        stateId: this.state.value || '',
        city:
          (this.translateService.currentLang() == 'ar'
            ? city.districtOtherName
            : city.districtName) || '',
        cityId: this.city.value || '',
        firstLine:
          this.contactForm.get('address.addressFirstLine')?.value || '',
        secondLine: this.contactForm.get('address.addressService')?.value || '',
        buildingNumber:
          this.contactForm.get('address.buildingNumber')?.value || '',
        floor: this.contactForm.get('address.floor')?.value || '',
        apartment: this.contactForm.get('address.apartment')?.value || '',
      };

      // Create Order Object
      let order: CreateOrder = {
        CustomerId: null, // Add logic to get customer ID
        OrderItemDTOs: orderItems,
        Address: address,
        CustomerName: this.fullName?.value || '',
        PhoneNumber: this.phoneNumber?.value || '',
        couponCode: this.couon.code,
      };

      // Submit the Order
      this.orderService.AddOrder(order).subscribe((data) => {
        if (data.isSuccess) {
          this.basketService.clearBasket();
          this.router.navigate(['cart', 'success']);
        } else {
          console.log('Order submission failed');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Form Control Accessors for easy access
  get fullName() {
    return this.contactForm.get('fullName');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get state() {
    return this.contactForm.get('address.state');
  }

  get city() {
    return this.contactForm.get('address.city');
  }

  // Fetch all cities (states)
  private GetAllCities() {
    this.addressService.GetAllCities().subscribe((data) => {
      console.log(data);
      this.states = data.data.filter(
        (e: any): e is City => this.isCity(e) && e.dropOffAvailability
      );
    });
  }

  // Type guard to check if the object is a City
  isCity(e: any): e is City {
    return e && typeof e.cityName === 'string' && typeof e.cityId === 'string';
  }

  // Autocomplete state filtering
  filterCountry(event: AutoCompleteCompleteEvent) {
    let query = event.query.toLowerCase();
    this.filteredStates = this.states.filter((state: City) =>
      state.cityName.toLowerCase().includes(query)
    );
  }

  // Handle state selection from dropdown
  StateSelected(e: Event) {
    let value = (e.target as HTMLSelectElement).value;
    this.stateSelected = this.states.find((e) => e.cityId == value);

    // Fetch districts based on selected state
    if (this.stateSelected) {
      this.districts = this.stateSelected.districts;
    }
  }

  // Handle city selection (not yet implemented in detail)
  CitySelected(e: Event) {
    let value = (e.target as HTMLSelectElement).value;
    this.citySelected = this.districts.find((e) => e.districtId == value);
  }
}
