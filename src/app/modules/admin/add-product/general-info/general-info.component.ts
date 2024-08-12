import { Component, Input, OnInit, signal } from '@angular/core';
import { ImageFile } from '../image-uploader-directive.directive';
import { ProductService } from '../../../../shared/services/product.service';
import { UploadedFile } from './add-images/add-images.component';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent implements OnInit{

  range: number = 10;
  @Input() selectOption: string = 'no';

  @Input() productName: string;
  @Input() ProductDescription: string;
  @Input() price: number; 
  @Input() fixedPrice: number;
  @Input() percentige: number;
  @Input() quantity: number;
  @Input() files = signal<UploadedFile[]>([]); // Receive files from parent


  constructor(private productService: ProductService) { 
     // Example file initialization
    
  } 


  ngOnInit(): void {
      console.log('recieved images',this.files);
      
  }


  GetRange(e:Event) { 
    const value = this.GetValue(e)
    this.productService.Product.discount = parseInt(value)  
    this.productService.Product.hasPercentage = true;
  }

  GetFixed(e: Event) { 
    const value = this.GetValue(e)
    this.productService.Product.discount = parseInt(value) 
    this.productService.Product.hasPercentage = false;
    console.log(this.productService.Product.discount);
    
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

  setDiscount()
  { 
     this.selectOption == 'no'?
      this.productService.Product.hasPercentage = null :
      this.selectOption == 'fixd' ?
        this.productService.Product.hasPercentage = false :
      this.productService.Product.hasPercentage = true
    
      
    
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
