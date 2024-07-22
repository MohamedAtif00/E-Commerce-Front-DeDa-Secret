import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category } from '../../../../shared/model/category.model';
import { Subject } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss'
})
export class SelectCategoryComponent implements OnInit{


  categories: Category[];


  constructor(private categoryService:CategoryService,public productService:ProductService) { }

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe(data => { 
      console.log(data.result.value);
      
      this.categories = data.result.value
    })
  }

  selected(e:Event)
  {
    let value = (e.target as HTMLInputElement).value
    this.productService.Product.categoryId = {value:value}
    
   }

}
