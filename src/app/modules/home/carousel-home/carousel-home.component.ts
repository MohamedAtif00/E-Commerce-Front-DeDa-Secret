import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import Glide from '@glidejs/glide';
import { Carousel } from '../../../shared/model/carsoul.model';
import { ProductService } from '../../../shared/services/product.service';
import { GetAllProducts } from '../../../shared/model/product.model';
import { NgxGlideComponent } from 'ngx-glide';
import AOS from 'aos';
@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselHomeComponent implements OnInit {
  @Input() carsoul: Carousel;
  products: GetAllProducts[] = []; // Initialize as an empty array

  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    AOS.init();
    this.productService.GetSpecialProducts(this.carsoul.id.value).subscribe({
      next: (data) => {
        this.products = data.value; // Set the products array
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
