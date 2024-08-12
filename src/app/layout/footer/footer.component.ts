import { Component, OnInit, signal } from '@angular/core';
import { AdministrationService } from '../../core/services/administration.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  startColor = '#fff';  // Default start color
  middleColor1 = '#fff'
  middleColor2 = '#fff'
  endColor = this.adminService.websiteColor; // Default end color
  websiteColor = signal<string>('');

  constructor(public adminService:AdministrationService) { }

  ngOnInit(): void {
    this.websiteColor.set(this.adminService.websiteColor);
    console.log('end-color',this.endColor);
    
  }

  GetCustomColor(): { [key: string]: string } {
  const color = this.websiteColor() || '#FBD5D5';
  return {
    'background-color': ` ${color}`
  };
  }
  
  GetForPath()
  { 
    this.endColor = this.websiteColor();

  }

}
