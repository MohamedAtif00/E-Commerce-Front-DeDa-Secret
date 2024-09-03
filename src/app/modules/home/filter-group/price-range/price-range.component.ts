import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Filter, FilterService } from '../../filter.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrl: './price-range.component.scss',
})
export class PriceRangeComponent {
  minPrice: number = null;
  maxPrice: number = null;

  private debounceTimeout: any;

  constructor(private filterService: FilterService) {}

  // Method to handle the price range change
  handlePriceChange(min: number, max: number) {
    console.log('Min Price:', min, 'Max Price:', max);
    const filter = this.filterService.filter.value;

    let updatedFilter: Filter = { ...filter, startPrice: min };
    updatedFilter.endPrice = max;
    // Implement logic to filter products based on the price range
    this.filterService.filter.next(updatedFilter);
  }

  // Debounced method to handle price changes
  debouncedHandlePriceChange(min: number, max: number) {
    // Clear the previous timeout if it exists
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Set a new timeout
    this.debounceTimeout = setTimeout(() => {
      this.handlePriceChange(min, max);
    }, 300); // Adjust the debounce delay as needed
  }

  // Event handler for custom event 'price-change'
  // onPriceChange(event: any) {
  //   const { min, max } = event.detail;
  //   const updatedMin = min === this.minPrice ? null : min;
  //   const updatedMax = max === this.maxPrice ? null : max;
  //   this.debouncedHandlePriceChange(updatedMin, updatedMax);
  // }

  onMinPriceChange(event: any) {
    const customEvent = event as CustomEvent;
    console.log(customEvent.detail);

    const min = customEvent.detail.min;
    const updatedMax = this.maxPrice;
    this.debouncedHandlePriceChange(min, updatedMax);
  }

  onMaxPriceChange(event: any) {
    const customEvent = event as CustomEvent;
    const max = customEvent.detail.max;
    const updatedMin = this.minPrice;
    this.debouncedHandlePriceChange(updatedMin, max);
  }
}
