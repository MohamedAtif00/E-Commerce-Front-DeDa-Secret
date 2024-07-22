import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{



  constructor(public basketService:BasketService) { }


  ngOnInit(): void {
      
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


}
