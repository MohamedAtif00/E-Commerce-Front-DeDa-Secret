import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../../../shared/model/order.model';
import { AddressService } from '../../../../cart/service/address.service';
import { State } from '../../model/add-shipment.model';
import { City, District } from '../../../../cart/model/address.model';

@Component({
  selector: 'app-pickup-locations',
  templateUrl: './pickup-address.component.html',
  styleUrls: ['./pickup-address.component.scss'],
})
export class PickUpAddressComponent implements OnInit {
  addressForm: FormGroup; // Form group for managing the address form
  addresses: Address[] = []; // Array to hold all added addresses

  states: City[] = [];

  districts: District[] = [];

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    // Initialize the form with the address fields
    this.addressForm = this.fb.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      firstLine: ['', Validators.required],
      secondLine: [''], // Optional field
      buildingNumber: ['', Validators.required],
      floor: [''], // Optional field
      apartment: [''], // Optional field
    });
  }

  ngOnInit(): void {
    this.GetAllCities();
  }

  // Function to submit the form and add the address to the list
  onSubmit() {
    if (this.addressForm.valid) {
      console.log(this.addressForm);
      let request: Address = {
        state: this.state.value,
        stateId: this.stateSelected.cityId,
        city: this.city.value,
        cityId: this.citySelected.districtId,
        firstLine: this.firstLine.value,
        secondLine: this.secondLine.value,
        buildingNumber: this.buildingNumber.value,
        floor: this.floor.value,
        apartment: this.apartment.value,
      };

      this.addressService.AddPickupAddress(request).subscribe((data) => {});
      // const newAddress: Address = this.addressForm.value;
      // this.addresses.push(newAddress); // Add the new address to the array
      // this.addressForm.reset(); // Reset the form after submission
    } else {
      console.log('Form is invalid');
    }
  }

  // Function to delete an address by index
  deleteAddress(index: number): void {
    this.addresses.splice(index, 1);
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

  isCity(e: any): e is City {
    return e && typeof e.cityName === 'string' && typeof e.cityId === 'string';
  }

  stateSelected: City;

  citySelected: District;
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

  // Getter methods to access each form control
  get state() {
    return this.addressForm.get('state');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get firstLine() {
    return this.addressForm.get('firstLine');
  }

  get secondLine() {
    return this.addressForm.get('secondLine');
  }

  get buildingNumber() {
    return this.addressForm.get('buildingNumber');
  }

  get floor() {
    return this.addressForm.get('floor');
  }

  get apartment() {
    return this.addressForm.get('apartment');
  }
}
