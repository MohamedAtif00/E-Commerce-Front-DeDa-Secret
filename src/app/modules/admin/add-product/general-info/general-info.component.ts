import { Component, Input, OnInit } from '@angular/core';
import { ImageFile } from '../image-uploader-directive.directive';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss'
})
export class GeneralInfoComponent implements OnInit{

  range: number = 10;
  @Input() selectOption: string = 'no';


  ngOnInit(): void {
      
  }


  GetRange(e:Event) { 
    const value = (e.target as HTMLInputElement).value 
    this.range = parseInt(value)  
  }


}
