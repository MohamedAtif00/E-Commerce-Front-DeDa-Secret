import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/model/category.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from '../filter.service';

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrl: './filter-group.component.scss',
})
export class FilterGroupComponent implements OnInit {
  filterOptions: FilterOption[] = [
    { value: '10%', label: '10%', count: 9 },
    { value: '20%', label: '20%', count: 10 },
    { value: '30%', label: '30%', count: 7 },
    { value: 'No discount', label: 'No discount', count: 264 },
  ];

  categories: Category[] = [];
  selectedCategory: string[] = [];
  constructor(
    private categoryService: CategoryService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.categoryService.GetAllCategories().subscribe({
      next: (data) => {
        this.categories = data.value;
      },
    });
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      // Add the category to the selected categories if checked
      console.log(event.target.value);

      this.selectedCategory.push(event.target.value);
      this.applyFilter();
    } else {
      // Remove the category from selected categories if unchecked
      this.selectedCategory = this.selectedCategory.filter(
        (c) => c !== event.target.value
      );
      this.applyFilter();
    }
  }

  // Method to apply filter based on selected categories
  applyFilter() {
    console.log('Selected Categories:', this.selectedCategory);
    // Implement your logic to filter products based on selected categories
    let newFilter = this.filterService.filter.value;
    newFilter.categoryIds = this.selectedCategory;
    this.filterService.filter.next(newFilter);
  }
}
