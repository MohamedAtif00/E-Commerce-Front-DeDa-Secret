import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CreateProduct, Product } from '../../../shared/model/product.model';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit, OnDestroy {
  product: CreateProduct;

  constructor(
    private productService: ProductService,
    public translate: TranslationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productService.files.next([]);
    this.productService.file.set(null);
  }

  Create() {
    if (this.productService.Product) {
      const product = this.productService.Product;

      // Check if the product has any property with null, undefined, or empty value
      if (!this.isProductValid(product)) {
        this.toastr.error('Please fill all the product data');
        return; // Exit the function early if the product is invalid
      }

      this.productService
        .CreateNewProduct()
        .pipe(
          switchMap((product) => {
            console.log(product);

            let id = product.value.id;

            return this.productService.files$.pipe(
              switchMap((files) => {
                // Prepare an array of observables for each file upload
                const uploadObservables = files.map((file) => {
                  const formData = new FormData();
                  formData.append('file', file.file); // Append single file
                  formData.append('name', file.name); // Append name of the file

                  // Return observable for single file upload with error handling
                  return this.productService
                    .AddProductImages(formData, id)
                    .pipe(
                      catchError((error) => {
                        console.error(
                          `Error uploading file ${file.name}:`,
                          error
                        );
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
              catchError((err) => {
                console.error('Error occurred while uploading files', err);
                // Handle any errors that occur in the whole operation here
                return of(null); // Return a default value or empty observable
              })
            );
          })
        )
        .subscribe({
          next: (data) => {
            this.router.navigate(['admin', 'products']);
          },
          error: (err) => {
            console.error('Error occurred while processing', err);
          },
        });
    } else {
      this.toastr.error('Enter All Product Data');
    }
  }

  ngOnDestroy(): void {
    this.productService.Product = new CreateProduct();
    this.productService.file = null;
    this.productService.files.next([]);
  }

  // Utility method to check for null, undefined, or empty string values in an object
  isProductValid(product: any): boolean {
    for (let key in product) {
      if (
        product[key] === null ||
        product[key] === undefined ||
        product[key] === ''
      ) {
        this.toastr.error('Please add ' + key);
        return false; // Return false if any property is null, undefined, or empty
      }
    }
    return true; // Return true if all properties have valid values
  }
}
