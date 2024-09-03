import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product.service';

export class UploadedFile {
  file: File;
  name: string;
  size: string;
  uploadResult: string;
  uploadStatus: number | undefined;
  url?: string; // Store the URL here
}

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {

  files: UploadedFile[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
  this.productService.files.subscribe(async data => {
    this.files = await Promise.all(data.map(async (file) => {
      // Generate URL for each file
      file.url = await this.createObjectURL(file.file);
      
      return file;
    }));

  });
}

  onFilesSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    
    Array.from(selectedFiles).forEach(async file => {
      const url = await this.createObjectURL(file);
      const uploadedFile: UploadedFile = {
        file,
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadResult: 'Ready to upload',
        uploadStatus: undefined,
        url // Set the URL here
      };

      this.AddFiles(uploadedFile);
    });
  }

  AddFiles(uploadedFile: UploadedFile) {
    this.files.push(uploadedFile);
    this.productService.files.next(this.files);
    this.productService.uploudfiles.push(uploadedFile);
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      this.onFilesSelected({ target: { files: event.dataTransfer.files } });
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.productService.files.next([])
    this.productService.files.next(this.files)
    if (this.files.length === 0) {
      
      // this.outputBoxVisible = false;
    }
  }

  SendToService() {
    // Implement your logic to handle the files stored in `this.files` array.
  }

  public async setFiles(fileList: File[]) {
    this.files = await Promise.all(fileList.map(async file => {
      const url = await this.createObjectURL(file);
      return {
        file,
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadResult: 'Ready to upload',
        uploadStatus: undefined,
        url // Set the URL here
      };
    }));
    this.productService.files.next(this.files);
  }

   createObjectURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        resolve(event.target.result); // Resolve the promise with the data URL
      };

      reader.onerror = (event: any) => {
        reject(new Error("File could not be read: " + event.target.error.code));
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    });
  }
}
