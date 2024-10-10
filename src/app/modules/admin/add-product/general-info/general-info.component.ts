import { Component, Input, OnInit, input, signal } from '@angular/core';
import { ImageFile } from '../image-uploader-directive.directive';
import { ProductService } from '../../../../shared/services/product.service';
import { UploadedFile } from './add-images/add-images.component';
import { TranslationService } from '../../../../core/services/translation.service';
import { EditorInitEvent, EditorTextChangeEvent } from 'primeng/editor';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit {
  range: number = 10;
  @Input() selectOption: string = 'no';

  @Input() productName: string;
  @Input() productNameArab: string;
  @Input() ProductDescription: string;
  @Input() productDescriptionArab: string;
  @Input() price: number;
  @Input() fixedPrice: number;
  @Input() percentige: number;
  @Input() quantity: number;
  @Input() files = signal<UploadedFile[]>([]); // Receive files from parent

  // name
  nameLang = 'en';

  // description
  descriptionLang = 'en';

  constructor(
    private productService: ProductService,
    public translate: TranslationService
  ) {
    // Example file initialization
  }

  ngOnInit(): void {
    document.addEventListener('DOMNodeInserted', function (event) {
      console.log('A node was inserted!');
    });
  }

  GetRange(e: Event) {
    const value = this.GetValue(e);
    this.range = parseInt(value);
    this.productService.Product.discount = parseInt(value);

    this.productService.Product.hasPercentage = true;
  }

  GetFixed(e: Event) {
    const value = this.GetValue(e);
    this.productService.Product.discount = parseInt(value);
    this.productService.Product.hasPercentage = false;
  }

  SetName(e: Event) {
    if (this.nameLang == 'en') {
      let value = this.GetValue(e);
      this.productName = value;
      this.productService.Product.name = value;
    } else {
      let value = this.GetValue(e);
      this.productNameArab = value;
      this.productService.Product.nameArab = value;
    }
  }

  SetDescription(e: EditorTextChangeEvent) {
    // let value = this.GetValue(e);
    this.productService.Product.description = e.htmlValue;
    this.productService.Product.descriptionArab = e.htmlValue;
    //console.log(e);
  }

  SetPrice(e: Event) {
    let value = this.GetValue(e);

    this.productService.Product.price = parseInt(value);
  }

  setDiscount() {
    this.selectOption == 'no'
      ? (this.productService.Product.hasPercentage = null)
      : this.selectOption == 'fixd'
      ? (this.productService.Product.hasPercentage = false)
      : (this.productService.Product.hasPercentage = true);
  }

  SetQuantity(e: Event) {
    let value = this.GetValue(e);
    this.productService.Product.stockQuantity = parseInt(value);
  }

  GetValue(e: Event) {
    return (e.target as HTMLInputElement).value;
  }

  SetNameLang(lang: string) {
    this.nameLang = lang;
  }

  SetDescriptionLangLang(lang: string) {
    this.descriptionLang = lang;
  }

  init(e: EditorInitEvent) {
    console.log(e.editor.container);
  }
}
