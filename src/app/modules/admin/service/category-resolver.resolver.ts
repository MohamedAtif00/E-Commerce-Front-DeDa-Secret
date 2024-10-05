// src/app/resolvers/category.resolver.ts
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../shared/services/category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<any> {
  constructor(private categoriesService: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Fetch data using the service, e.g., get all categories
    return this.categoriesService.GetAllCategories();
  }
}
