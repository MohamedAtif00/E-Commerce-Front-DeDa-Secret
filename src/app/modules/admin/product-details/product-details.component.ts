import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CreateProduct, GetSingleProduct } from '../../../shared/model/product.model';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/model/category.model';
import { Subscription, catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  uploadResult: string;
  uploadStatus: number | undefined;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: GetSingleProduct;
  createdProduct: CreateProduct;
  masterImage: string;
  category: Category;
  productImages = signal<UploadedFile[]>([]); // To hold product images as UploadedFile[]
   private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.productService.files.next([]);
    this.productService.file.set(null);
    this.productImages.set([]);
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.GetProduct(id);
    });
  }

  ngOnDestroy(): void {
    this.productService.files.next([]);
    this.productService.file.set(null);
    this.subscriptions.unsubscribe();
  }

  GetProduct(id: string): void {
    this.productService.GetSingleProduct(id).pipe(
      switchMap(productData => {
        this.product = productData.value;
        this.productService.Product = {
          name: this.product._name??'',
          description: this.product._description,
          discount: this.product._discount,
          categoryId: this.product.categoryId,
          price: this.product._price._price,
          stockQuantity: this.product._stockQuantity,
          hasPercentage: false
        };

        console.log(productData);
        

        // Create observables for master image, category, and other images
        const masterImage$ = this.productService.GetProductMasterImage(this.product.id).pipe(
          tap(e => console.log('Master image fetched')),
          catchError(error => {
            console.error('Error fetching master image:', error);
            return of(null); // Return a default value if master image fetch fails
          })
        );

        const category$ = this.categoryService.GetSingleCategory(this.product.categoryId).pipe(
          catchError(error => {
            console.error('Error fetching category:', error);
            return of({ value: null }); // Return a default value if category fetch fails
          })
        );

        const imageRequests$ = this.product.images
          .filter(image => !image.isMaster) // Filter out master image
          .map(image => this.productService.getProductImage(this.product.id, image.id).pipe(
            catchError(error => {
              console.error(`Error fetching image ${image.id}:`, error);
              return of(null); // Return a default value if image fetch fails
            })
          ));

        return forkJoin([masterImage$, category$, ...imageRequests$]);
      }),
      map(([masterImageBlob, categoryData, ...productImageBlobs]) => {
        // Process master image
        const masterImageUrl = masterImageBlob ? this.convertBlobToImageUrl(masterImageBlob) : '';
        this.productService.file.set(new File([masterImageBlob],'image'));

        // Process product images
        const uploadedFiles = productImageBlobs.filter(blob => blob).map((blob, index) => {
          const file = new File([blob.blob], blob.fileName);
          return {
            file: file,
            name: blob.fileName??'',
            size: `KB`,
            uploadResult: 'Ready to upload',
            uploadStatus: undefined,
            url: this.createObjectURL(file)
          };
        });

        return {
          masterImageUrl,
          category: categoryData?.value ?? {},
          uploadedFiles
        };
      }),
      catchError(err => {
        console.error('Error occurred while fetching product details:', err);
        return of({ masterImageUrl: '', category: {}, uploadedFiles: [] }); // Return default values if an error occurs
      })
    ).subscribe({
      next: async ({ masterImageUrl, category, uploadedFiles }) => {
        // Handle masterImageUrl which might be a string or a promise
        if (typeof masterImageUrl === 'string') {
          this.masterImage = masterImageUrl;
        } else {
          try {
            this.masterImage = await masterImageUrl;
          } catch (error) {
            console.error('Error resolving master image URL:', error);
            this.masterImage = ''; // Fallback to default value if there's an error
          }
        }

        // Update component state
        this.category = category;
        this.productImages.set(uploadedFiles);
        this.productService.files.next(this.productImages());
        // console.log('Length', this.productImages().length);
        // console.log(this.product);
        // console.log(this.category);

      },
      error: (err) => {
        console.error('Error occurred while processing product details:', err);
      }
    });
  }

  private createObjectURL(file: Blob | File): string {
    return URL.createObjectURL(file);
  }

  private convertBlobToImageUrl(blob: Blob | File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read Blob'));
      };
      reader.readAsDataURL(blob);
    });
  }

  UpdateProduct(): void {
    console.log('Start Information');
    console.log('Master image:', this.productService.file);
    console.log('Images:', this.productService.files.value.length);

    const updateProductSubscription = this.productService.UpdateProduct(this.product.id).pipe(
      switchMap(product => {
        console.log('Product updated:', product);
        const id = product.value.id;

        return this.productService.files$.pipe(
          switchMap(files => {
            if (files.length === 0) {
              return of(null); // No files to upload, proceed to master image upload
            }

            // Create an array of observables for each file upload
            const uploadObservables = files.map(file => {
              const formData = new FormData();
              formData.append('file', file.file); // Append the file
              formData.append('name', file.name); // Append the file name

              return this.productService.AddProductImages(formData, id).pipe(
                catchError(error => {
                  console.error(`Error uploading file ${file.name}:`, error);
                  return of(null); // Handle errors gracefully
                })
              );
            });

            // Wait for all file uploads to complete
            return forkJoin(uploadObservables).pipe(
              switchMap(() => {
                console.log('Files uploaded, now uploading master image');
                // Proceed to master image upload after files have been uploaded
                if (this.productService.file()) {
                  const masterImageFormData = new FormData();
                  masterImageFormData.append('file', this.productService.file());

                  return this.productService.AddMatserImage(id); // Ensure correct method name
                } else {
                  return of(null); // No master image to upload
                }
              })
            );
          }),
          catchError(err => {
            console.error('Error occurred while uploading files:', err);
            return of(null); // Handle any errors in the entire process
          })
        );
      })
    ).subscribe({
      next: data => {
        console.log('Upload successful:', data);
        this.router.navigate(['admin', 'products']);
      },
      error: err => {
        console.error('Error occurred while processing:', err);
      }
    });

    // Add subscription to the subscriptions object
    this.subscriptions.add(updateProductSubscription);
  }



}
