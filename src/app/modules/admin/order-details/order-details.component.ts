import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { DatePipe } from '@angular/common';
import { ChangeStateRequest, Order, OrderState } from '../model/order.model';
import { ProductService } from '../../../shared/services/product.service';
import { MenuItem } from 'primeng/api';
import { AddressService } from '../../cart/service/address.service';
import { Address } from '../../../shared/model/order.model';
import { AddDeliveryRequest } from '../shipment/model/add-shipment.model';
import { BostaService } from '../shipment/service/bosta.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelExportService } from '../service/excel-export.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  id: string;
  formattedDate: string;
  Order: Order;
  pickupAddress: Address;
  firstName: string;
  lastName: string;
  email: string;

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
    private addressService: AddressService,
    private bostaService: BostaService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private excelService: ExcelExportService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.addressService.GetActivePickupAddress().subscribe((data) => {
      console.log('Admin pickup address', data);
      this.pickupAddress = data.value;
      let name = data.value?.shipmentInformation.fullName as string;
      this.firstName = name?.split(' ')[0];
      this.lastName = name?.split(' ')[1];
      this.email = data.value?.shipmentInformation.email;
    });
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
    let request: AddDeliveryRequest;
    if (this.Order) {
      request = {
        type: 10,
        specs: {
          packageType: 'Parcel',
          size: 'SMALL',
          packageDetails: {
            itemsCount: this.Order.products.length,
            description: 'Cosmatics',
          },
        },
        notes: 'no notes',
        cod: this.Order.total,
        dropOffAddress: {
          city: this.Order.address?.state,
          districtId: this.Order.address?.cityId,
          firstLine: this.Order.address?.firstLine,
          secondLine: this.Order.address?.secondLine,
          buildingNumber: this.Order.address?.buildingNumber.toString(),
          floor: this.Order.address?.floor.toString(),
          apartment: this.Order.address?.apartment,
        },
        pickupAddress: {
          city: this.pickupAddress?.state,
          districtId: this.pickupAddress?.cityId,
          firstLine: this.pickupAddress?.firstLine,
          secondLine: this.pickupAddress?.secondLine,
          buildingNumber: this.pickupAddress?.buildingNumber.toString(),
          floor: this.pickupAddress?.floor.toString(),
          apartment: this.pickupAddress?.apartment,
        },
        returnAddress: {
          city: this.pickupAddress?.state,
          districtId: this.pickupAddress?.cityId,
          firstLine: this.pickupAddress?.firstLine,
          secondLine: this.pickupAddress?.secondLine,
          buildingNumber: this.pickupAddress?.buildingNumber.toString(),
          floor: this.pickupAddress?.floor.toString(),
          apartment: this.pickupAddress?.apartment,
        },
        receiver: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: '01022474089',
        },
      };
    }

    console.log(request);

    this.bostaService.AddDelivery(request).subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.toastrService.success('Delivery Added');
      } else {
        console.log(data);
      }
    });
  }

  // Flattening Order and OrderItem for Excel export
  exportOrderToExcel(): void {
    const exportData = this.flattenOrderData(this.Order);
    this.excelService.exportAsExcelFile(exportData, 'OrderDetails');
  }

  flattenOrderData(order: Order): any[] {
    const flattenedOrder = [
      {
        'Order ID': order.orderId,
        'Customer Name': order.customerName,
        'Phone Number': order.phoneNumber,
        'Order State': order.state,
        'Order Date': order.createdDate,
        Total: order.total,
        Address: `${order.address.firstLine}, ${
          order.address.secondLine || ''
        }, ${order.address.city}, ${order.address.state}`,
        'Building Number': order.address.buildingNumber,
        Floor: order.address.floor,
        Apartment: order.address.apartment,
        'Shipment Info': JSON.stringify(order.address.shipmentInformation),
      },
    ];

    const flattenedProducts = order.products.map((product) => ({
      'Product ID': product.productId,
      'Product Name': product.productName,
      Quantity: product.quantity,
      'Price per Unit': product.priceForUnit,
      'Total Price': product.total,
    }));

    return [...flattenedOrder, ...flattenedProducts];
  }

  // Method to print the order using HTML table
  printOrderAsHtmlTable(): void {
    const printContent = document.getElementById('orderTable')!.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();

    // Restore the original page content after printing
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to ensure that the application works as expected after print
  }
}
