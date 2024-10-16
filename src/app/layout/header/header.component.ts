import { Component, OnInit, Signal, signal } from '@angular/core';
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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  lines: string = '';

  websiteColor = signal<string>('');

  items: MenuItem[] | undefined = [];

  categories: Category[];

  constructor(
    public basketService: BasketService,
    public adminService: AdministrationService,
    public translate: TranslationService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.websiteColor.set(this.adminService.websiteColor);
    this.GetAllCategories();
    this.adminService.GetAdministration().subscribe((data) => {
      this.lines = data.value.marquee_Eng;
    });
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

  // Categories
  GetAllCategories() {
    this.categoryService.GetAllCategories().subscribe((data) => {
      console.log('Categories in headers', data);
      this.categories = data.value;

      this.categories.forEach((category) => {
        // Push top-level categories and recursively process child categories
        const categoryItem = {
          styleClass: 'custome',
          label: category.name,
          items: [],
        };
        this.items.push(this.mapCategoryToItem(category, categoryItem));
        console.log('my categories', this.categories);
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
}
