import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { DatePipe } from '@angular/common';
import { ChangeStateRequest, Order, OrderState } from '../model/order.model';
import { ProductService } from '../../../shared/services/product.service';
import { MenuItem } from 'primeng/api';
import { BostaService } from '../shipment/service/bosta.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  id: string;
  formattedDate: string;
  Order: Order;

  items: MenuItem[] = [
    {
      label: 'Cancel',
      command: () => this.CancelOrder(),
      styleClass: 'cancel-button-class',
    },
  ];

  // Key-value pairs mapping states to their respective classes
  stateStyle = {
    Pending: 'bg-yellow-100 text-yellow-500',
    Accepted: 'bg-green-100 text-green-500',
    Expired: 'bg-red-100 text-red-500',
    Failed: 'bg-gray-100 text-gray-500',
    Cancelled: 'bg-red-200 text-red-600',
    Completed: 'bg-green-200 text-green-600',
    Denied: 'bg-red-300 text-red-700',
    Processing: 'bg-blue-100 text-blue-500',
    Refunded: 'bg-purple-100 text-purple-500',
    Delivered: 'bg-green-300 text-green-700',
    Delivering: 'bg-blue-300 text-blue-700',
    default: 'bg-gray-100 text-gray-500', // Default class if state doesn't match
  };

  stateIcon = {
    Cancelled: 'pi pi-times-circle  text-red-600',
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.GetSingleOrder(this.id);
  }

  GetSingleOrder(id: string) {
    this.orderService.GetSingleOrder(id).subscribe((data) => {
      this.Order = data.value;
      console.log(this.Order);

      this.Order.products.map((e) => {
        this.productService
          .GetProductMasterImage(e.productId)
          .subscribe((data) => {
            this.createImageFromBlob(data).then((data) => {
              e.url = data;
            });
          });
      });

      // console.log(this.formatDate(this.Order.createDate));
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
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

  //Odrer Process
  CancelOrder() {
    let request: ChangeStateRequest = {
      id: this.id,
      state: OrderState.Cancelled,
    };
    this.orderService.CancelOrder(request).subscribe((data) => {
      console.log(data);
    });
  }

  SubmitOrder() {
    // let request: AddDeliveryRequest = {
    //   type: 10,
    //   specs: {
    //     size: 'SMALL',
    //     packageDetails: {
    //       itemsCount: this.Order.products.length,
    //       description: 'Cosmatics',
    //     },
    //   },
    //   notes: null,
    //   cod: 50,
    //   // dropOffAddress: {
    //   //   city: this.Order.address.city,
    //   // }
    // };
  }
}
