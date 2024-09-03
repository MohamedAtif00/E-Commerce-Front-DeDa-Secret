import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageList } from '../../../core/model/general-response.model';
import { GetAllProducts } from '../../../shared/model/product.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() page: PageList<GetAllProducts[]> = {
    items: null,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPages: [],
    lastPages: [],
  };
  @Output() goToPage: EventEmitter<number> = new EventEmitter();

  GoToPage(page: number) {
    this.goToPage.emit(page);
  }
}
