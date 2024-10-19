import { Component, Input } from '@angular/core';
import { GetAllProducts } from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.scss',
})
export class CarouselCardComponent {
  @Input() product: GetAllProducts;
  masterImage: string;
  secondImage: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService
      .GetProductMasterImage(this.product.id)
      .subscribe((data) => {
        this.masterImage = URL.createObjectURL(data);
      });

    this.productService.GetSingleProduct(this.product.id).subscribe((data) => {
      this.productService
        .getProductImage(this.product.id, data.value.images[0].id)
        .subscribe((image) => {
          this.secondImage = URL.createObjectURL(image.blob);
        });
    });
  }
}
