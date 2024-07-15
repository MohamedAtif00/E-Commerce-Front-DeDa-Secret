import { Component } from '@angular/core';
import { ImageFile } from '../../image-uploader-directive.directive';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrl: './add-images.component.scss'
})
export class AddImagesComponent {




  
  files: ImageFile[] = [];

  onDropFiles(files: ImageFile[]): void {
    this.files = [...this.files, ...files];
  }



}
