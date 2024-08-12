import { Component, OnInit, signal } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { AdministrationService } from '../../core/services/administration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  websiteColor = signal<string>('');

  constructor(public basketService:BasketService,public adminService:AdministrationService) { }


  ngOnInit(): void {
    this.websiteColor.set(this.adminService.websiteColor);
  }


  megashow()
  {
    var element = document.getElementById('mega-menu-full-image-dropdown');
    element.classList.remove('hidden');
  }

  bundleMegaShow()
  {
    var element = document.getElementById('mega-menu-full-image-dropdown-bundle');
    element.classList.remove('hidden');
  }

  megahide()
  {
    var element = document.getElementById('mega-menu-full-image-dropdown');
    element.classList.add('hidden');
  }

  BundleMegaHide()
  {
    var element = document.getElementById('mega-menu-full-image-dropdown-bundle');
    element.classList.add('hidden');
  }

  // wensite administration

 GetWebsiteColor(): string {
   const color = this.websiteColor() || '#FBD5D5';
   console.log(`from-[${color}]`);
   console.log(this.adminService.websiteColor);
   
  return `from-[${color}]`;
}

  GetCustomColor(): { [key: string]: string } {
  const color = this.websiteColor() || '#FBD5D5';
  return {
    'background-image': `linear-gradient(to bottom, ${color}, white)`
  };
}



}
