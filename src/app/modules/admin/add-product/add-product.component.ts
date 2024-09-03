import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CreateProduct, Product } from '../../../shared/model/product.model';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-add-product',
  templateUrl:'./add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit, OnDestroy {


  product: CreateProduct;

  constructor(
    private productService: ProductService,
    public translate:TranslationService,
    private router: Router) { }


  ngOnInit(): void {
      this.productService.files.next([])
  }




  Create() {
    
  this.productService.CreateNewProduct().pipe(
    switchMap(product => {
      const id = product.value.id;
      
      return this.productService.files$.pipe(
        switchMap(files => {
          // Prepare an array of observables for each file upload
          const uploadObservables = files.map(file => {
            const formData = new FormData();
            formData.append('file', file.file); // Append single file
            formData.append('name', file.name); // Append name of the file
            
            // Return observable for single file upload with error handling
            return this.productService.AddProductImages(formData, id).pipe(
              catchError(error => {
                console.error(`Error uploading file ${file.name}:`, error);
                // Return a default value or empty observable in case of an error
                return of(null);
              })
            );
          });

          // Wait for all file uploads to complete
          return forkJoin(uploadObservables);
        }),
        switchMap(() => {
          
          // After all files have been uploaded, send a request to add master image
          return this.productService.AddMatserImage(id);
        }),
        catchError(err => {
          console.error('Error occurred while uploading files', err);
          // Handle any errors that occur in the whole operation here
          return of(null); // Return a default value or empty observable
        })
      );
    })
  ).subscribe({
    next: (data) => {
      this.router.navigate(['admin','products']);
    },
    error: (err) => {
      console.error('Error occurred while processing', err);
    }
  });
}




  ngOnDestroy(): void {
    this.productService.Product = new CreateProduct();
    this.productService.file = null
    this.productService.files.next([])
  }
}
