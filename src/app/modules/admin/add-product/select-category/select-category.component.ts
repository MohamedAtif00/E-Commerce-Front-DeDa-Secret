import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category } from '../../../../shared/model/category.model';
import { Subject } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
})
export class SelectCategoryComponent implements OnInit {
  categories: Category[];
  @Input() selectedCategory: Category;
  constructor(
    private categoryService: CategoryService,
    public productService: ProductService,
    public translate: TranslationService
  ) {}

  ngOnInit(): void {
    this.categoryService.GetAllChidlsCategories().subscribe((data) => {
      this.categories = data.value;
    });

    let selector = document.getElementById('category');
  }

  selected(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.productService.Product.categoryId = value;
  }
}
