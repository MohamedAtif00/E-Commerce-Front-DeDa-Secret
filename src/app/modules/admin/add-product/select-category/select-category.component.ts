import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
  signal,
} from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category } from '../../../../shared/model/category.model';
import { Subject } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';
import { TranslationService } from '../../../../core/services/translation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
})
export class SelectCategoryComponent implements OnInit {
  categories: Category[];
  @Input() selectedCategory = signal<any>(null);
  constructor(
    private categoryService: CategoryService,
    public productService: ProductService,
    public translate: TranslationService
  ) {}

  ngOnInit(): void {
    console.log('category name ', this.selectedCategory?.name);
    this.categoryService.GetAllChidlsCategories().subscribe((data) => {
      this.categories = data.value;
      console.log('all categeory', this.categories);
    });

    let selector = document.getElementById('category');
  }

  selected(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.productService.Product.categoryId = value;
  }
}
