import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageList } from '../../../core/model/general-response.model';
import { GetAllProducts } from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { FilterService } from '../../home/filter.service';
import { Category } from '../../../shared/model/category.model';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  Products: GetAllProducts[] = [];
  page: PageList<GetAllProducts[]>;
  category: Category;

  categoryId: string[];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private filterService: FilterService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      console.log('Category id', data['id']);
      let id = data['id'];

      this.categoryService.GetSingleCategory(id).subscribe((data) => {
        console.log('category', data);

        this.category = data.value;
      });
      this.applyFilter([id]);
      this.GetAllProducts(1);
    });

    this.filterService.filter.subscribe((data) => {
      console.log(data);
      this.GetAllProducts(1);
    });
  }

  GetAllProducts(page: number) {
    this.productService.GetAllProducts(page).subscribe((data) => {
      console.log('All products', data);
      this.Products = data.value.items;
      this.page = data.value;
      this.Products.forEach((e) => {
        this.productService.GetProductMasterImage(e.id).subscribe((blob) => {
          this.createImageFromBlob(blob)
            .then((imageData) => {
              e.masterImage = imageData; // assuming your product model has an imageData property
            })
            .catch((error) => {
              console.error('Error converting image blob to base64', error);
            });
        });
      });
    });
  }

  private createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          resolve(reader.result as string);
        },
        false
      );

      reader.addEventListener(
        'error',
        () => {
          reject(new Error('Failed to read the Blob as a Data URL.'));
        },
        false
      );

      if (image) {
        reader.readAsDataURL(image);
      } else {
        reject(new Error('No Blob provided.'));
      }
    });
  }

  GoToPage(page: number) {
    this.GetAllProducts(page);
  }

  applyFilter(selectedCategory: string[]) {
    console.log('Selected Categories:', selectedCategory);
    // Implement your logic to filter products based on selected categories
    let newFilter = this.filterService.filter.value;
    newFilter.categoryIds = selectedCategory;
    this.filterService.filter.next(newFilter);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    let newFilter = this.filterService.filter.value;
    newFilter.categoryIds = null;
    this.filterService.filter.next(newFilter);
  }
}
