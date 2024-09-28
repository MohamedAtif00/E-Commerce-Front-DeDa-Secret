import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { GetSingleProduct } from '../../../shared/model/product.model';
import { CategoryService } from '../../../shared/services/category.service';
import { BasketService } from '../../../shared/services/basket.service';
import { BasketItem } from '../../../shared/model/basket.model';
import {
  initFlowbite,
  Modal,
  ModalOptions,
  ModalInterface,
  InstanceOptions,
} from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Address,
  CreateOrder,
  OrderItem,
} from '../../../shared/model/order.model';
import { OrderService } from '../../../shared/services/order.service';
import { City, District } from '../../cart/model/address.model';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AddressService } from '../../cart/service/address.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: GetSingleProduct = {
    id: '',
    _name: '',
    _description: '',
    _discount: 0,
    categoryId: '',
    _price: { _discount: 0, _price: 0, _total: 0 },
    _stockQuantity: 0,
    images: [],
    masterImage: null,
  };

  productImages: string[] = [];
  productImageUrl: string | ArrayBuffer | null = null;

  category: string;

  states: City[] = [];
  filteredStates: City[] = [];

  districts: District[] = [];

  stateSelected: City | undefined;
  citySelected: District | undefined;

  // Buying
  quantity: number = 1;
  total: number = this.product._price._total;

  // Modal
  $modalElement: HTMLElement;
  modal: ModalInterface;
  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private cartService: BasketService,
    private fb: FormBuilder,
    private addressService: AddressService
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required /*, Validators.pattern(/^[0-9]{10}$/)*/],
      ],
      address: this.fb.group({
        state: ['', Validators.required],
        city: ['', Validators.required],
        addressFirstLine: ['', Validators.required],
        addressSecondLine: [''], // Optional
        buildingNumber: ['', Validators.required],
        floor: ['', Validators.required],
        apartment: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.GetAllCities();
    this.InitModal();
    let id = this.route.snapshot.params['id'];
    this.productService.GetSingleProduct(id).subscribe((data) => {
      this.product = data.value;
      this.total = this.product._price._total;

      this.product.images.forEach((e) => {
        this.productService
          .getProductImage(this.product.id, e.id)
          .subscribe((image) => {
            this.createImageFromBlob(image.blob).then((thImage) => {
              this.productImages.push(thImage);
            });
          });
      });
      this.categoryService
        .GetSingleCategory(this.product.categoryId)
        .subscribe((category) => {
          this.category = category.value._name;
        });
    });

    this.productService.GetProductMasterImage(id).subscribe((masterImage) => {
      this.createImageFromBlob(masterImage).then((image) => {
        this.productImageUrl = image;
      });
    });
  }

  // Init Modal
  InitModal() {
    this.$modalElement = document.querySelector('#default-modal');

    const modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        // Handle modal hide
      },
      onShow: () => {
        // Handle modal show
      },
      onToggle: () => {
        // Handle modal toggle
      },
    };

    const instanceOptions: InstanceOptions = {
      id: 'modalEl',
      override: true,
    };

    this.modal = new Modal(this.$modalElement, modalOptions, instanceOptions);
  }

  ShowModal() {
    this.modal.show();
  }

  HideModal() {
    this.modal.hide();
  }

  // Modal Configuration
  onSubmit() {
    this.submitted = true; // Mark as submitted
    if (this.contactForm.valid) {
      // Create Order Items and Adding to the order
      let orderItems: OrderItem[] = [];

      let orderItem: OrderItem = {
        ProductId: this.product.id,
        quantity: this.quantity,
      };
      orderItems.push(orderItem); // Add order item to the list

      // Create Address Object
      let address: Address = {
        state: this.state.value,
        stateId: this.states.find((x) => x.cityOtherName == address.state)
          .cityId,
        city: this.city.value,
        cityId: this.states
          .find((x) => x.cityId == address.stateId)
          .districts.find((x) => x.districtOtherName == address.city)
          .districtId,
        firstLine: this.contactForm.get('address.addressFirstLine')?.value,
        secondLine: this.contactForm.get('address.addressSecondLine')?.value,
        buildingNumber: this.contactForm.get('address.buildingNumber')?.value,
        floor: this.contactForm.get('address.floor')?.value,
        apartment: this.contactForm.get('address.apartment')?.value,
      };

      let order: CreateOrder = {
        CustomerId: null,
        OrderItemDTOs: orderItems,
        Address: address,
        CustomerName: this.fullName.value,
        PhoneNumber: this.phoneNumber.value,
      };

      this.modal.hide();
      this.orderService.AddOrder(order).subscribe({
        next: (data) => {
          this.router.navigate(['cart', 'success']);
        },
        error: () => {
          // Handle error
        },
      });
    } else {
      console.log('Form is invalid');
      let errors = this.contactForm.errors;
      console.log(errors);
    }
  }

  get fullName() {
    return this.contactForm.get('fullName');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get street() {
    return this.contactForm.get('address.street');
  }

  get state() {
    return this.contactForm.get('address.state');
  }

  get city() {
    return this.contactForm.get('address.city');
  }

  // Set Quantity
  AddOne() {
    this.quantity++;
    this.total += this.product._price._total;
  }

  RemoveOne() {
    if (this.quantity >= 2) {
      this.quantity--;
      this.total -= this.product._price._total;
    } else {
      this.quantity;
    }
  }

  // Add To Cart
  AddToCart() {
    let item: BasketItem = {
      ProductId: this.product.id,
      Quantity: this.quantity,
      UnitPrice: this.product._price._total,
      Total: this.quantity * this.product._price._total,
    };
    this.cartService.addItem(item);
  }

  BuyNow() {
    this.ShowModal();
  }

  // Create Image From Blob
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

  MakeMasterImage(image: string) {
    let index = this.productImages.indexOf(image);
    if (index > -1) {
      this.productImages.splice(index, 1);
    }
    this.productImages.push(this.productImageUrl?.toString());
    this.productImageUrl = image;
  }

  // Fetch all cities (states)
  private GetAllCities() {
    this.addressService.GetAllCities().subscribe((data) => {
      console.log(data);
      this.states = data.data.filter(
        (e: any): e is City => this.isCity(e) && e.dropOffAvailability
      );
    });
  }

  // Type guard to check if the object is a City
  isCity(e: any): e is City {
    return e && typeof e.cityName === 'string' && typeof e.cityId === 'string';
  }

  // Autocomplete state filtering
  filterCountry(event: AutoCompleteCompleteEvent) {
    let query = event.query.toLowerCase();
    this.filteredStates = this.states.filter((state: City) =>
      state.cityName.toLowerCase().includes(query)
    );
  }

  // Handle state selection from dropdown
  StateSelected(e: Event) {
    let value = (e.target as HTMLSelectElement).value;
    this.stateSelected = this.states.find((e) => e.cityId == value);

    // Fetch districts based on selected state
    if (this.stateSelected) {
      this.districts = this.stateSelected.districts;
    }
  }

  // Handle city selection (not yet implemented in detail)
  CitySelected(e: Event) {
    let value = (e.target as HTMLSelectElement).value;
    this.citySelected = this.districts.find((e) => e.districtId == value);
  }
}
