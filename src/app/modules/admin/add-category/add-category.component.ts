import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  name: string;

  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    public translate: TranslationService,
    private router: Router
  ) {}

  CreateCategory() {
    this.categoryService.AddCategory(this.name).subscribe(
      (data) => {
        if (data.isSuccess) {
          this.toastrService.success(
            'Success Operation',
            'Done successfully :)',
            {
              progressBar: true,
              timeOut: 5000, // Auto-dismiss after 5 seconds
            }
          );

          this.router.navigate(['admin']);
        } else {
          this.toastrService.error(data.errors[0]);
        }
      },
      (error) => {
        this.toastrService.error('Error occurred', 'Failed to add category', {
          progressBar: true,
          timeOut: 5000, // Auto-dismiss after 5 seconds
        });
      }
    );
  }
}
