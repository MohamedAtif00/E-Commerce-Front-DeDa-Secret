import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductService } from '../../../../shared/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<any> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const productId = route.paramMap.get('id'); // Assuming 'id' is passed as route parameter

    if (productId) {
      // Fetch the product data using the product ID
      return this.productService.GetSingleProduct(productId).pipe(
        catchError((error) => {
          console.error('Error loading product data', error);
          return of(null); // Return null or handle the error gracefully
        })
      );
    } else {
      return of(null); // Return null if no product ID is found in the route
    }
  }
}
