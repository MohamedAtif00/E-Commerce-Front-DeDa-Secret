import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import Glide from '@glidejs/glide';
import { Carousel } from '../../../shared/model/carsoul.model';
import { ProductService } from '../../../shared/services/product.service';
import { GetAllProducts } from '../../../shared/model/product.model';
import { NgxGlideComponent } from 'ngx-glide';
import AOS from 'aos';
import { AdministrationService } from '../../../core/services/administration.service';
@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselHomeComponent implements OnInit {
  @Input() carsoul: Carousel;
  products: GetAllProducts[] = []; // Initialize as an empty array
  buttonColor: string;
  slideToShow: number = 5; // Default value
  @ViewChild(NgxGlideComponent, { static: false }) ngxGlide: NgxGlideComponent;

  constructor(
    private productService: ProductService,
    private adminService: AdministrationService
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.updateSlidesToShow(window.innerWidth); // Set initial number of slides based on screen size
    this.adminService.GetAdministration().subscribe((data) => {
      this.buttonColor = data.value.websiteColor;
    });
    this.productService.GetSpecialProducts(this.carsoul.id.value).subscribe({
      next: (data) => {
        this.products = data.value; // Set the products array
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSlidesToShow(event.target.innerWidth);
  }

  updateSlidesToShow(width: number): void {
    if (width < 640) {
      this.slideToShow = 2; // Small screens (e.g., mobile)
    } else if (width >= 640 && width < 768) {
      this.slideToShow = 3; // Medium screens (e.g., tablets)
    } else if (width >= 768 && width < 1024) {
      this.slideToShow = 4; // Larger tablets or small laptops
    } else if (width >= 1024 && width < 1440) {
      this.slideToShow = 5; // Laptops/desktops
    } else {
      this.slideToShow = 5; // Large desktops
    }
  }
}
