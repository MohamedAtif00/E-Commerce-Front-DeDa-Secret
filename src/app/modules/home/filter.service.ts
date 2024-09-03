import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';

export interface Filter {
  sortColumn?: string;
  searchTerm?: string;
  startPrice?: number;
  endPrice?: number;
  categoryIds?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filter: BehaviorSubject<Filter> = new BehaviorSubject<Filter>({
    sortColumn: null,
    searchTerm: null,
    startPrice: null,
    endPrice: null,
    categoryIds: null,
  });
}
