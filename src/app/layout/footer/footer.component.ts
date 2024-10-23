import { Component, OnInit, signal } from '@angular/core';
import { AdministrationService } from '../../core/services/administration.service';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/model/category.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  startColor = '#fff'; // Default start color
  middleColor1 = '#fff';
  middleColor2 = '#fff';
  endColor = this.adminService.websiteColor; // Default end color
  websiteColor = signal<string>('');
  websiteColorString = this.websiteColor();

  categories: Category[];

  constructor(
    public adminService: AdministrationService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.websiteColor.set(this.adminService.websiteColor);
    this.categoryService.GetAllChidlsCategories().subscribe((data) => {
      this.categories = data.value;
    });
  }

  GetCustomColor(): { [key: string]: string } {
    const color = this.websiteColor() || '#FBD5D5';
    return {
      'background-color': ` ${color}`,
    };
  }

  GetForPath() {
    this.endColor = this.websiteColor();
  }
}
