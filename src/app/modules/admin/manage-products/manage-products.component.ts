import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { Dropdown } from 'flowbite';
import { DropdownOptions, DropdownInterface } from 'flowbite';

import {
  GetAllProducts,
  GetSingleProduct,
} from '../../../shared/model/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { PageList } from '../../../core/model/general-response.model';
import { AdministrationService } from '../../../core/services/administration.service';
import { ModalService } from '../../../shared/services/modal.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { Carousel } from '../../../shared/model/carsoul.model';
import { FilterService } from '../../home/filter.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { development } from '../../../../environments/environment';

interface Products extends GetAllProducts {
  checked: boolean;
}

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageProductsComponent implements OnInit, AfterViewInit {
  Status: string = 'Status';

  options: DropdownOptions;
  mainActionOption: DropdownOptions;
  sortOption: DropdownOptions;
  actionOption: DropdownOptions;

  dropdown: DropdownInterface;
  sortDropdown: DropdownInterface;
  actionInterface: DropdownInterface;

  actionChecked = false;

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
    lastPages: [],
  };

  sorts: string[] = ['name', 'price', 'stockQuantity', 'default'];
  sortSelect: string = 'default';
  pagelist = signal<PageList<any>>(this._pageList);

  // Add to carsoul
  addedProduct: GetAllProducts;
  showModal: boolean;
  carsouls: Carousel[];

  getProductMasterImage = development.localhosts.product.getProductMasterImage;
  constructor(
    private productService: ProductService,
    private adminService: AdministrationService,
    private modalService: ModalService,
    public translation: TranslationService,
    private router: Router,
    private filter: FilterService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    await this.GetProductPage(1);
    this.modalService.InitModal('#popup-modal');
    this.adminService.GetAdministration().subscribe((data) => {
      this.carsouls = data.value.groups;
    });
  }

  ngAfterViewInit(): void {}

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
    this.initializeDropdown(
      'mainActionDropdown',
      'mainActionButton',
      this.mainActionOption
    );

    let buttonList = document.querySelectorAll('[id^=buttonAction]');
    let actionlist = document.querySelectorAll('[id^=action]');
    let object = { buttonList, actionlist };

    // Determine the minimum length to avoid out-of-bounds errors
    const minLength = Math.min(
      object.buttonList.length,
      object.actionlist.length
    );

    // Create an array to store the pairs
    let pairs = [];

    for (let i = 0; i < minLength; i++) {
      pairs.push({
        button: object.buttonList[i],
        action: object.actionlist[i],
      });
    }
    pairs.forEach((e) => {
      this.initializeDropdown(e.action.id, e.button.id, this.actionOption);
    });

    //this.initializeDropdown('action', 'actionButton', this.actionOption);
    this.initializeDropdown('sort', 'sortButtonId', this.sortOption);
  }

  private initializeDropdown(
    targetId: string,
    triggerId: string,
    options: DropdownOptions
  ) {
    let $targetEl: HTMLElement | null;
    let $triggerEl: HTMLElement | null;

    $targetEl = document.getElementById(targetId);
    $triggerEl = document.getElementById(triggerId);

    if ($targetEl && $triggerEl) {
      // Initialize dropdown with provided options
      return new Dropdown($targetEl, $triggerEl, {
        triggerType: 'click',
        delay: 300,
        ...options, // Merge with provided options
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      });
    }

    return null;
  }

  private async createImageFromBlob(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(new Error('Failed to read the Blob as a Data URL.'));
      reader.readAsDataURL(image);
    });
  }

  Search(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
    this.filter.filter.next({ searchTerm: this.search });
    this.GetProductPage(1);
  }

  Sort(e: string) {
    this.sortColumn = e;
    this.sortSelect = e === 'default' ? '' : e;

    // Ensure subscription is triggered only once using `take(1)`
    this.filter.filter.pipe(take(1)).subscribe((data) => {
      console.log(this.sortSelect);
      let asend: boolean;
      if (data.asend == null) asend = false;
      else asend = !data.asend;

      data.sortColumn = this.sortSelect;
      data.asend = asend;
      this.filter.filter.next(data);

      this.GetProductPage(1);
      this.sortDropdown.toggle();
    });
  }

  OpenAction(e: Event): void {
    //this.DropdownListConfiguration()
  }

  async GetProductPage(page: number): Promise<void> {
    try {
      // Fetching products data
      const data = await this.productService
        .GetAllProducts(page, this.search, this.sortSelect)
        .toPromise();
      this.Products = data.value.items.map((e: GetAllProducts) => ({
        ...e,
        checked: false,
        obsMasterImage: signal<string>(''),
      }));
      this.pagelist.set(data.value);

      // Fetching and processing master images for each product
      for (let e of this.Products) {
        try {
          const blob = await this.productService
            .GetProductMasterImage(e.id)
            .toPromise(); // Use toPromise or firstValueFrom
          const imageData = await this.createImageFromBlob(blob); // Await the promise from createImageFromBlob
          e.masterImage = imageData;
          // Check if obsMasterImage is defined before calling update
          if (e.obsMasterImage) {
            e.obsMasterImage.update((i) => imageData);
          } else {
            //console.warn(`obsMasterImage is not defined for product ${e.id}`);
          }

          this.DropdownListConfiguration();
        } catch (err) {
          // Log the error and continue with the next product
          console.error(
            `Error fetching or converting master image for product ${e.id}:`,
            err
          );
        }
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
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
    const checkboxes = document.querySelectorAll(
      '.product-checkbox'
    ) as NodeListOf<HTMLInputElement>;
    if (this.Products.some((e) => !e.checked)) {
      this.Products.map((e) => (e.checked = true));
      checkboxes.forEach((checkbox) => (checkbox.checked = isChecked));
      if (this.Products.some((e) => e.checked === true))
        this.actionChecked = true;
      else this.actionChecked = false;
    } else {
      this.Products.map((e) => (e.checked = false));
      checkboxes.forEach((checkbox) => (checkbox.checked = isChecked));
      if (this.Products.some((e) => e.checked === true))
        this.actionChecked = true;
      else this.actionChecked = false;
    }

    this.DropdownListConfiguration();
    //this.DropdownListConfiguration();
  }

  CheckProduct(id: string) {
    // Mark the product as checked
    this.Products.forEach((e) => {
      if (e.id === id) {
        e.checked = !e.checked;
      }
    });

    // Update the actionChecked flag
    this.actionChecked = this.Products.some((e) => e.checked === true);
    this.DropdownListConfiguration();
  }

  DeleteProduct() {
    this.adminService.DeleteProduct(this.product.id).subscribe((data) => {
      this.modalService.hide;
      this.CloseModal();
      this.GetProductPage(this._pageList.page);
    });
  }

  AddSpecialProduct(product: GetAllProducts) {
    this.addedProduct = product;
    this.showModal = true;
  }

  AddProductToCarsoul(id: string) {
    console.log(id);
    console.log(this.addedProduct.id);

    this.productService
      .AddProductToCarsoul(this.addedProduct.id, id)
      .subscribe((data) => {
        if (data.isSuccess) {
          this.toastr.success('product Succesfully Added');
        } else {
          this.toastr.error(data.errors[0]);
        }
      });
  }

  product: Products;
  title: string;

  ShowModal(id: string) {
    this.product = this.Products.find((e) => e.id == id);
    this.title = 'Are you sure Delete this product?';
    this.modalService.open.next(this.product);
  }

  CloseModal() {
    this.modalService.CloseModal();
  }

  getEmptyStars(totalReview: number): number {
    return 5 - totalReview;
  }

  GetYellow(total: number) {
    return new Array(total);
  }

  GetDark(total: number) {
    return new Array(5 - (total ? total : 0));
  }
}
