import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {




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
