import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';


interface FilterOption {
  value: string;
  label: string;
  count: number;
}



@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrl: './filter-group.component.scss'
})
export class FilterGroupComponent implements OnInit{



  filterOptions: FilterOption[] = [
    { value: '10%', label: '10%', count: 9 },
    { value: '20%', label: '20%', count: 10 },
    { value: '30%', label: '30%', count: 7 },
    { value: 'No discount', label: 'No discount', count: 264 }
  ];

  ngOnInit(): void {
      initFlowbite()
  }

}
