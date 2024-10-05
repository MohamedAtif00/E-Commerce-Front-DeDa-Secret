import { Injectable } from '@angular/core';
import { development } from '../../../environments/environment';
import { GenericCRUDService } from '../../core/services/genenric-crud.service';
import { GeneralResponse } from '../../core/model/general-response.model';
import { Category, MoveCategoryRequest } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _addCategory = development.localhosts.category.addCategory;
  private _getAllCategories = development.localhosts.category.getAllCategories;
  private _getSingleCategory =
    development.localhosts.category.getSingleCategory;
  private _postMoveCategory = development.localhosts.category.moveCategory;

  constructor(private _http: GenericCRUDService) {}

  AddCategory(name: string) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this._addCategory,
      { name }
    );
  }

  GetAllCategories() {
    return this._http.genericGetAPIData<GeneralResponse<Category[]>>(
      this._getAllCategories
    );
  }

  GetSingleCategory(id: string) {
    return this._http.genericGetAPIData<GeneralResponse<any>>(
      this._getSingleCategory + id
    );
  }

  //
  MoveCategory(request: MoveCategoryRequest) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this._postMoveCategory,
      request
    );
  }
}
