import { Component, OnInit } from '@angular/core';
import { Carousel } from '../../../../shared/model/carsoul.model';
import { Product } from '../../../../shared/model/product.model';
import { AdministrationService } from '../../../../core/services/administration.service';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';

@Component({
  selector: 'app-add-carsoul',
  templateUrl: './add-carsoul.component.html',
  styleUrl: './add-carsoul.component.scss',
})
export class AddCarsoulComponent implements OnInit {
  carousels: Carousel[] = [];
  carsoulName: string;
  newProduct: Product;

  constructor(
    private adminService: AdministrationService,
    private toastr: ToastrService
  ) {
    this.adminService.getCarousels().subscribe((carousels) => {
      this.carousels = carousels;
    });
  }

  ngOnInit(): void {
    this.adminService.GetAdministration().subscribe((data) => {
      console.log(data);

      this.carousels = data.value.groups;
    });
  }

  // addProductToCarousel() {
  //   if (this.newProduct.name) {
  //     this.newCarousel.products.push({ ...this.newProduct });
  //     this.newProduct = { id: '', name: '' };
  //   }
  // }

  addCarousel() {
    this.adminService.addCarousel(this.carsoulName).subscribe((data) => {
      if (data.isSuccess) {
        console.log(data);
        this.toastr.success('Carsoul Added');
      } else {
        console.log(data.errors[0]);
      }
    });

    // if (this.newCarousel.name && this.newCarousel.products.length > 0) {
    //   this.newCarousel.id = this.carousels.length + 1;
    //   this.adminService.addCarousel({ ...this.newCarousel });
    //   this.newCarousel = { id: 0, name: '', products: [] };
    // }
  }

  deleteCarousel(id: string) {
    // this.adminService.deleteCarousel(id);
    this.adminService.DeleteCarousel(id).subscribe((data) => {
      if (data.isSuccess) {
        this.toastr.success('Carousel has been Deleted');
      } else {
        this.toastr.error(data.errors[0]);
      }
    });
  }
}
