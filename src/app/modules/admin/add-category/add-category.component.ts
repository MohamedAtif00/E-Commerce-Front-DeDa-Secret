import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrComponent } from '../../../shared/components/toastr/toastr.component';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {


  name: string;

  constructor(private categoryService: CategoryService,private toastrService:ToastrService,private router:Router) { }
  

  CreateCategory()
  {
    
    this.categoryService.AddCategory(this.name).subscribe(
      data => {
        let note = this.toastrService.success(
          'Success Operation',
          'Done successfully :)',
          {
            progressBar: true,
            timeOut: 5000, // Auto-dismiss after 5 seconds
          }
        )

        this.router.navigate(['admin'])
      },
      error => {
        this.toastrService.error('Error occurred', 'Failed to add category', {
          progressBar: true,
          timeOut: 5000, // Auto-dismiss after 5 seconds
        });
      }
    );

  }


}
