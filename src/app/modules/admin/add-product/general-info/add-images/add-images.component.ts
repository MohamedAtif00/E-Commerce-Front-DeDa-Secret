import { Component } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product.service';

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  uploadResult: string;
  uploadStatus: number | undefined;
}

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent {

  outputBoxVisible = false;
  files: UploadedFile[] = [];

  constructor(private productService: ProductService) {}

  onFilesSelected(event: any) {
    this.outputBoxVisible = true;

    const selectedFiles: FileList = event.target.files;

    Array.from(selectedFiles).forEach(file => {
      const uploadedFile: UploadedFile = {
        file,
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadResult: 'Ready to upload',
        uploadStatus: undefined
      };

      this.files.push(uploadedFile);
      this.productService.files.push(uploadedFile.file);
    });
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
    if (this.files.length === 0) {
      this.outputBoxVisible = false;
    }
  }

  SendToService() {
    // Implement your logic to handle the files stored in `this.files` array.
    // This could be some local processing or further actions based on your requirements.
  }
}
