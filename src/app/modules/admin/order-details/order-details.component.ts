import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { DatePipe } from '@angular/common';
import { Order } from '../model/order.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{

  id: string;
  formattedDate: string;
  Order: Order;


  constructor(private route: ActivatedRoute,
    private productService:ProductService,
    private orderService: OrderService,
    private datePipe:DatePipe) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    console.log(this.id);
    this.GetSingleOrder(this.id)
  }


  GetSingleOrder(id:string)
  { 
    this.orderService.GetSingleOrder(id).subscribe(data =>
    { 
      this.Order = data.value
      console.log(this.Order);
      
      console.log('the Date', this.Order.createdDate);
      
      this.Order.products.map(e =>
      { 
        this.productService.GetProductMasterImage(e.productId).subscribe(data =>
        { 
          this.createImageFromBlob(data).then(data =>
          { 
            e.url = data
          })
        })
      })
      
      // console.log(this.formatDate(this.Order.createDate));
    })
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
}
