import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';



export interface ImageFile {
  file: File;
  url: string;
}

enum DropColor {
  Default = '#C6E4F1', // Default color
  Over = '#ACADAD', // Color to be used once the file is "over" the drop box
}

@Directive({
  selector: '[appImageUploaderDirective]'
})
export class ImageUploaderDirectiveDirective {

  @Output() dropFiles: EventEmitter<ImageFile[]> = new EventEmitter();
  @HostBinding('style.background') backgroundColor = DropColor.Default;

  @HostListener('dragover', ['$event']) public dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.Over;
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.Default;
  }


  @HostListener('drop', ['$event']) public drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.Default;

    let fileList = event.dataTransfer.files;
    let files: ImageFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const url = window.URL.createObjectURL(file);
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.dropFiles.emit(files);
    }
  }
}
