import { Component, OnInit, signal } from '@angular/core';
import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';
import { initFlowbite } from 'flowbite';
import { GetAllProducts } from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { PageList } from '../../../core/model/general-response.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  Status: string = 'Status';
  options: DropdownOptions;
  dropdown: DropdownInterface;

  Products: GetAllProducts[] = [];
  // pageList: PageList<GetAllProducts[]>;
  image: string = '';


  
  _pageList: PageList<any> = {
    items: [],
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPages: [],
    lastPages:[]
  };

  pagelist = signal(this._pageList)


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    //initFlowbite();
    this.DropdownListConfiguratioon();
    this.GetProductPage(1);
  }

  AllClicked() {
    this.Status = 'All';
    console.log(this.dropdown.isVisible());
    this.dropdown.hide();
  }

  // GetAllProducts() {
  //   this.productService.GetAllProducts(1).subscribe(data => {
  //     console.log(data);
  //     this.Products = data.value.items;
  //     this.pagelist.set(data.value)
  //     this.Products.forEach(e => {
  //       this.productService.GetProductMasterImage(e.id).subscribe(blob => {
  //         this.createImageFromBlob(blob).then(imageData => {
  //           e.masterImage = imageData; // assuming your product model has an imageData property
  //         }).catch(error => {
  //           console.error('Error converting image blob to base64', error);
  //         });
  //       });
  //     });
  //     console.log(this.pagelist().nextPages);
      
  //   });
  // }


  DropdownListConfiguratioon() {
    const $targetEl: HTMLElement = document.getElementById('dropdown');
    const $triggerEl: HTMLElement = document.getElementById('dropdownDefaultButton');

    this.options = {
      triggerType: 'click',
      delay: 300,
      onHide: () => {
        console.log('dropdown has been hidden');
      },
      onShow: () => {
        console.log('dropdown has been shown');
      },
      onToggle: () => {
        console.log('dropdown has been toggled');
      },
    };

    this.dropdown = new Dropdown(
      $targetEl,
      $triggerEl,
      this.options,
    );
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


  GetProductPage(page: number)
  { 
    this.productService.GetAllProducts(page).subscribe(data => {
      console.log(data);
      this.Products = data.value.items;
      this.pagelist.set(data.value)
      this.Products.forEach(e => {
        this.productService.GetProductMasterImage(e.id).subscribe(blob => {
          this.createImageFromBlob(blob).then(imageData => {
            e.masterImage = imageData; // assuming your product model has an imageData property
          }).catch(error => {
            console.error('Error converting image blob to base64', error);
          });
        });
      });
      console.log(this.pagelist().nextPages);
      
    });
  }
}
