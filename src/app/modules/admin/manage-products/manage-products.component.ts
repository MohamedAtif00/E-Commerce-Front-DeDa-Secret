import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';
import { initFlowbite } from 'flowbite';
import { GetAllProducts } from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { PageList } from '../../../core/model/general-response.model';
import { map } from 'rxjs';
import { AdministrationService } from '../../../core/services/administration.service';

interface Products extends GetAllProducts
{ 
  checked:boolean
}


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit{

  Status: string = 'Status';

  options: DropdownOptions;
  sortOption: DropdownOptions;
  actionOption: DropdownOptions;

  dropdown: DropdownInterface;
  sortDropdown: DropdownInterface;
  actionInterface: DropdownInterface;


  actionChecked = false

  search: string = '';
  sortColumn: string = 'default';
  Products: Products[] = [];
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
    lastPages: []
  };

  sorts: string[] = ['name', 'price', 'stockQuantity', 'default'];
  sortSelect: string = 'default';
  pagelist = signal<PageList<any>>(this._pageList);

  constructor(private productService: ProductService,private adminService:AdministrationService) { }

  ngOnInit(): void {
    
    this.GetProductPage(1);
    
  }

  

  

  ngOnDestroy(): void {
    // Cleanup any resources if needed
    if (this.dropdown) {
      this.dropdown.destroy();
    }
    if (this.sortDropdown) {
      this.sortDropdown.destroy();
    }
  }

  AllClicked() {
    this.Status = 'All';
    this.dropdown.hide();
  }

  DropdownListConfiguration() {
    this.initializeDropdown('dropdown', 'dropdownDefaultButton', this.options);

    let buttonList = document.querySelectorAll('[id^=buttonAction]');
    let actionlist = document.querySelectorAll('[id^=action]');
    let object = { buttonList, actionlist }
    
    // Determine the minimum length to avoid out-of-bounds errors
    const minLength = Math.min(object.buttonList.length, object.actionlist.length);

    // Create an array to store the pairs
    let pairs = [];

    for (let i = 0; i < minLength; i++) {
      pairs.push({
        button: object.buttonList[i],
        action: object.actionlist[i]
      });
    }
    pairs.forEach(e =>
    { 
      this.initializeDropdown(e.action.id, e.button.id, this.actionOption);
      console.log(e.action.id);
      console.log(e.button.id);
      
    })
    

    //this.initializeDropdown('action', 'actionButton', this.actionOption);
    this.initializeDropdown('sort', 'sortButtonId', this.sortOption);
  }

  private initializeDropdown(targetId: string, triggerId: string, options: DropdownOptions) {
  let $targetEl: HTMLElement | null;
  let $triggerEl: HTMLElement | null;

  if (targetId === 'action') {
    // Use querySelector for the 'action' dropdown
    $targetEl = document.querySelector(`.${targetId}`) as HTMLElement;
    $triggerEl = document.querySelector(`.${triggerId}`) as HTMLElement;
  } else {
    // Use getElementById for other dropdowns
    $targetEl = document.getElementById(targetId);
    $triggerEl = document.getElementById(triggerId);
  }

  if (targetId === 'action') {
    console.log('trigger', $triggerEl);
    console.log('button', $targetEl);
  }

  if ($targetEl && $triggerEl) {
    // Initialize dropdown with provided options
    new Dropdown($targetEl, $triggerEl, {
      triggerType: 'click',
      delay: 300,
      ...options, // Merge with provided options
      onHide: () => console.log(`${targetId} has been hidden`),
      onShow: () => console.log(`${targetId} has been shown`),
      onToggle: () => console.log(`${targetId} has been toggled`),
    });
  }
}



  private createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read the Blob as a Data URL.'));
      reader.readAsDataURL(image);
    });
  }

  Search(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
    this.GetProductPage(1);
  }

  Sort(e: string) {
    this.sortColumn = e;
    this.sortSelect = e === 'default' ? '' : e;
    this.sortDropdown.hide();
    this.GetProductPage(1);
  }

  OpenAction(e: Event): void {
    //this.DropdownListConfiguration()
  } 


  GetProductPage(page: number) {
    this.productService.GetAllProducts(page, this.search, this.sortSelect).subscribe({
      next: data => {
        this.Products = data.value.items.map((e:GetAllProducts) => ({...e,checked:false }));
        this.pagelist.set(data.value);

        this.Products.forEach(e => {
          this.productService.GetProductMasterImage(e.id).subscribe({
            next: blob => {
              this.createImageFromBlob(blob).then(imageData => {
                e.masterImage = imageData; // Assuming your product model has an imageData property
                this.DropdownListConfiguration();
              }).catch(error => {
                console.error('Error converting image blob to base64', error);
              });
            },
            error: err => console.error('Error fetching master image:', err)
          });
        });
      },
      error: err => console.error('Error fetching products:', err)
    });
  }

  isDropdownOpen: number | null = null;

  toggleDropdown(productId: number) {
    this.isDropdownOpen = this.isDropdownOpen === productId ? null : productId;
  }


  getDropdownClass(index: number): string {
    return `actionButton${index}`;
  }


  toggleAllCheckboxes(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    // Select or deselect all checkboxes
    const checkboxes = document.querySelectorAll('.product-checkbox') as NodeListOf<HTMLInputElement>;
    this.Products.map(e=> e.checked = true)
    checkboxes.forEach(checkbox => checkbox.checked = isChecked);
    if (this.Products.some(e => e.checked === true)) this.actionChecked = !this.actionChecked
    console.log(this.actionChecked);
    console.log(this.Products);
    
    
  }

  CheckProduct(id:number)
  { 
    this.Products.map(e => { if (e.id == id) e.checked = true })
    if (this.Products.some(e => e.checked === true)) this.actionChecked = !this.actionChecked
  }



  DeleteProduct(id:string)
  { 
    this.adminService.DeleteProduct(id).subscribe(data =>
    { 
      console.log(data);
      this.GetProductPage(this._pageList.page);
    })
  }


}
