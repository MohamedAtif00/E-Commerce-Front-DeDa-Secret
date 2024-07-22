import { Component, Input, OnInit } from '@angular/core';
import { ImageFile } from '../image-uploader-directive.directive';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent implements OnInit{

  range: number = 10;
  @Input() selectOption: string = 'no';



  constructor(private productService:ProductService) { }


  ngOnInit(): void {
      
  }


  GetRange(e:Event) { 
    const value = this.GetValue(e)
    this.range = parseInt(value)  
  }

  SetName(e:Event)
  {
    let value = this.GetValue(e)
    this.productService.Product.name = value;
   }

  SetDescription(e:Event)
  {
    let value = this.GetValue(e)
      this.productService.Product.description = value
   }

  SetPrice(e:Event)
  { 
    let value = this.GetValue(e)

    this.productService.Product.price = parseInt(value)
  }

  SetQuantity(e:Event) { 
    let value = this.GetValue(e)
    this.productService.Product.stockQuantity = parseInt(value)
    console.log(this.productService.Product);
    
  }



  GetValue(e:Event)
  {
    return (e.target as HTMLInputElement).value
   }
}
