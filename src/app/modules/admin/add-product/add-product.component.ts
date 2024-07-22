import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CreateProduct, Product } from '../../../shared/model/product.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit, OnDestroy {


  product: CreateProduct;

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
      
  }


  Create()
  {
    this.productService.CreateProduct().subscribe(product =>
    {
      console.log(product);
      let id = product.value.id;

      forkJoin([this.productService.AddMatserImage(id), this.productService.AddProductImages(id)]).subscribe(data =>
      { 
        console.log(data);
                
      })
     });
   }
    





  ngOnDestroy(): void {
    this.productService.Product = new CreateProduct();
    this.productService.file = null
    this.productService.files = []
  }
}
