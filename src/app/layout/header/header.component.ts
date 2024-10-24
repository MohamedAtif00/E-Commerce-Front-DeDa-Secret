import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { AdministrationService } from '../../core/services/administration.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/model/category.model';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { style } from '@angular/animations';
import { data } from 'jquery';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { development } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() lines: string = '';

  @Input() websiteColor = '';

  items: MenuItem[] | undefined = [];

  categories: Category[];

  logo = development.localhosts.administration.getLogo;
  constructor(
    public basketService: BasketService,
    public adminService: AdministrationService,
    public translate: TranslationService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.websiteColor = this.adminService.websiteColor;
  }

  ngOnInit(): void {
    initFlowbite();
    this.GetAllCategories();
    // this.adminService.GetAdministration().subscribe((data) => {
    //   this.lines = data.value.marquee_Eng;
    // });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeDrawer(); // Close the drawer on route change
      }
    });
  }

  closeDrawer(): void {
    const drawer = document.getElementById('drawer-navigation');
    if (drawer) {
      drawer.classList.add('-translate-x-full'); // Apply the CSS class to close
    }
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
    const color = this.websiteColor || '#FBD5D5';

    return `from-[${color}]`;
  }

  GetCustomColor(): { [key: string]: string } {
    const color = this.websiteColor || '#FBD5D5';
    return {
      'background-image': `linear-gradient(to bottom, ${color}, white)`,
    };
  }

  SetLnaguage(lang: string) {
    this.translate.changeLanguage(lang);
  }

  // Categories
  GetAllCategories() {
    this.categoryService.GetAllCategories().subscribe((data) => {
      this.categories = data.value;

      this.categories.forEach((category) => {
        // Push top-level categories and recursively process child categories
        const categoryItem = {
          styleClass: 'custome',
          label: category.name,
          items: [],
        };
        this.items.push(this.mapCategoryToItem(category, categoryItem));
      });
    });
  }

  // Recursive method to map categories and their child categories
  mapCategoryToItem(category: any, parentItem: any) {
    if (category.childsCategories && category.childsCategories.length > 0) {
      category.childsCategories.forEach((childCategory) => {
        const childItem = {
          label: childCategory.name,
          items: [],
        };
        parentItem.items.push(this.mapCategoryToItem(childCategory, childItem));
      });
    }
    return parentItem;
  }

  // toggleDrawer(): void {
  //  const drawer = document.getElementById('drawer-navigation');
  //  if (drawer) {
  //    if (drawer.style.transform === 'translateX(0)') {
  //      // If the drawer is open, close it
  //      drawer.style.transform = 'translateX(-100%)'; // Move the drawer out of view
  //    } else {
  //      // If the drawer is closed, open it
  //      drawer.style.transform = 'translateX(0)'; // Move the drawer into view
  //    }
  //  }

  // }
}
