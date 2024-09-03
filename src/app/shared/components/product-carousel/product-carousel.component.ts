import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AdministrationService } from '../../../core/services/administration.service';
import { ProductService } from '../../services/product.service';
import { switchMap, forkJoin } from 'rxjs';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductCarouselComponent  implements OnInit {
  items: string[] = [
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    'https://cdn.shopify.com/s/files/1/0684/4923/9327/files/Body-Cravings-Lip-_-Cheek-Tint-Strawberry-2-Source-Beauty-Egypt_large.png?v=1718112601',
    // Add more image URLs as needed
  ];



  constructor(private adminService:AdministrationService,private productService:ProductService) { }


  ngOnInit(): void {
    this.adminService.GetSpecialProducts().pipe(
      switchMap(data => {
        console.log('start get the product');
        const productRequests = data.value.map(e => 
          this.productService.GetSingleProduct(e.productId).pipe(       
            switchMap(productData =>

              this.productService.GetProductMasterImage(productData.value.id).pipe(
                switchMap(blob => 
                  
                  this.createImageFromBlob(blob).then(image => ({ productData, image }))
                )
              )
            )
          )
        );
        return forkJoin(productRequests);
      })
    ).subscribe(results => {
      this.items = results.map(e=> e.image);
    }, error => {
      console.error('Error fetching products or images', error);
    });
  }

  private createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result as string);
      }, false);

      reader.addEventListener("error", () => {
        reject(new Error("Failed to read the Blob as a Data URL."));
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      } else {
        reject(new Error("No Blob provided."));
      }
    });
  }

}
