import { Component, Input, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { initFlowbite } from 'flowbite';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrl: './select-image.component.scss',
})
export class SelectImageComponent implements OnInit {
  backgroundImage: SafeStyle | null = null;
  base64String: string | null = null;
  @Input() imageUrl: string | null = null;
  file = signal<File>(null);

  constructor(
    private _sanitizer: DomSanitizer,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.file = signal<File>(null);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.productService.file.set(file);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          this.base64String = result;
          this.imageUrl = result; // Directly use the Base64 string as the image URL
          this.backgroundImage = this._sanitizer.bypassSecurityTrustStyle(
            `url(${result})`
          );
        }
      };

      reader.readAsDataURL(file);
    }
  }

  private convertBlobToImageUrl(blob: Blob | File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        this.base64String = result;
        this.imageUrl = result; // Directly use the Base64 string as the image URL
        this.backgroundImage = this._sanitizer.bypassSecurityTrustStyle(
          `url(${result})`
        );
      }
    };
    reader.readAsDataURL(blob);
  }
}
