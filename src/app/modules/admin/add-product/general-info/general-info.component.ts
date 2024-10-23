import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  input,
  signal,
} from '@angular/core';
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
  range: number;

  @Input() productName: string;
  @Input() productNameArab: string;
  @Input() ProductDescription: string;
  @Input() productDescriptionArab: string;
  @Input() price: number;
  // @Input() fixedPrice: number;
  percentigeSignal = signal<number>(0);

  @Input() set percentige(value: number) {
    // Update the signal value when input changes
    this.percentigeSignal.set(value);
    if (value > 0 && value) {
      this.selectOption = 'pre';
    }
  }

  @Input() Mode = 'Create';
  @Input() quantity: number;
  @Input() files = signal<UploadedFile[]>([]); // Receive files from parent

  @Input() selectOption: string = this.percentige > 0 ? 'pre' : 'no';
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
    console.log('my percentage', this.percentigeSignal());
    document.addEventListener('DOMNodeInserted', function (event) {
      console.log('A node was inserted!');
    });
  }

  GetRange(e: Event) {
    const value = this.GetValue(e);
    this.percentigeSignal.set(parseInt(value));
    this.productService.Product.discount = this.percentigeSignal();

    this.productService.Product.hasPercentage = true;
  }

  GetFixed(e: Event) {
    const value = this.GetValue(e);
    this.productService.Product.discount = this.percentige;
    this.productService.Product.hasPercentage = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let checkPer = changes['percentige'];
    console.log(changes);

    if (changes['percentige']) {
      console.log('Percentige changed:', changes['percentige'].currentValue);
    }
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
    if (this.descriptionLang == 'en') {
      this.productService.Product.description = e.htmlValue;
    } else {
      this.productService.Product.descriptionArab = e.htmlValue;
    }
    //console.log(e);
  }

  SetPrice(e: Event) {
    let value = this.GetValue(e);

    this.productService.Product.price = parseInt(value);
  }

  setDiscount() {
    this.selectOption == 'no'
      ? (this.productService.Product.hasPercentage = null)
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
