import { Component, OnInit, signal } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { AdministrationService } from '../../core/services/administration.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  websiteColor = signal<string>('');

  constructor(
    public basketService: BasketService,
    public adminService: AdministrationService,
    public translate: TranslationService
  ) {}

  ngOnInit(): void {
    this.websiteColor.set(this.adminService.websiteColor);
  }

  megashow() {
    var element = document.getElementById('mega-menu-full-image-dropdown');
    element.classList.remove('hidden');
  }

  bundleMegaShow() {
    var element = document.getElementById(
      'mega-menu-full-image-dropdown-bundle'
    );
    element.classList.remove('hidden');
  }

  SkineCareMegaShow() {
    var element = document.getElementById(
      'mega-menu-full-image-dropdown-skinecare'
    );
    element.classList.remove('hidden');
  }

  SkineCareMegaHide() {
    var element = document.getElementById(
      'mega-menu-full-image-dropdown-skinecare'
    );
    element.classList.add('hidden');
  }

  megahide() {
    var element = document.getElementById('mega-menu-full-image-dropdown');
    element.classList.add('hidden');
  }

  BundleMegaHide() {
    var element = document.getElementById(
      'mega-menu-full-image-dropdown-bundle'
    );
    element.classList.add('hidden');
  }

  // wensite administration

  GetWebsiteColor(): string {
    const color = this.websiteColor() || '#FBD5D5';

    return `from-[${color}]`;
  }

  GetCustomColor(): { [key: string]: string } {
    const color = this.websiteColor() || '#FBD5D5';
    return {
      'background-image': `linear-gradient(to bottom, ${color}, white)`,
    };
  }

  SetLnaguage(lang: string) {
    this.translate.changeLanguage(lang);
  }
}
