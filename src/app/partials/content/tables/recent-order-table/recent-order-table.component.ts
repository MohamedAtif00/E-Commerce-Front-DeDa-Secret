import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category } from '../../../../shared/model/category.model';
import { AdministrationService } from '../../../../core/services/administration.service';
import { RecentOrder } from '../../../../core/model/administration.model';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-recent-order-table',
  templateUrl: './recent-order-table.component.html',
  styleUrl: './recent-order-table.component.scss',
})
export class RecentOrderTableComponent implements OnInit {
  categories: Category[] = [];
  recentOrders: RecentOrder[] = [];

  constructor(
    private categoryService: CategoryService,
    private administrationService: AdministrationService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.GetAllCategories();
  }

  GetAllCategories() {
    this.categoryService.GetAllChidlsCategories().subscribe((data) => {
      this.categories = data.value;
      this.GetProductsForCategory(this.categories[0].id);
    });
  }

  GetProductsForCategory(id: string) {
    this.administrationService.GetRecentOrder(id).subscribe((data) => {
      console.log(data);
      this.recentOrders = data.value;

      this.recentOrders.map((e) => {
        this.productService
          .GetProductMasterImage(e.productId)
          .subscribe((data) => {
            this.createImageFromBlob(data).then((image) => {
              e.url = image;
            });
          });
      });
    });
  }

  private createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read the Blob as a Data URL.'));
      };
      reader.readAsDataURL(image);
    });
  }
}
