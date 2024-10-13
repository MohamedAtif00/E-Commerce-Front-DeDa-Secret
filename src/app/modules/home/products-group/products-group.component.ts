import { Component, OnInit } from '@angular/core';
import { GetAllProducts, Product } from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { PageList } from '../../../core/model/general-response.model';
import { FilterService } from '../filter.service';
import AOS from 'aos';

@Component({
  selector: 'app-products-group',
  templateUrl: './products-group.component.html',
  styleUrl: './products-group.component.scss',
})
export class ProductsGroupComponent implements OnInit {
  // product: Product = { name: 'First Product', price: 100, image: '' }

  Products: GetAllProducts[] = [];
  page: PageList<GetAllProducts[]>;

  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.GetAllProducts(1);

    this.filterService.filter.subscribe((data) => {
      console.log('changed');
      this.GetAllProducts(1);
    });
  }

  GetAllProducts(page: number) {
    this.productService.GetAllProducts(page).subscribe((data) => {
      console.log(data);
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
}
