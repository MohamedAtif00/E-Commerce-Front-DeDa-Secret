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
  private _getAllChildsCategories =
    development.localhosts.category.getallChildsCategories;
  private _getSingleCategory =
    development.localhosts.category.getSingleCategory;
  private _getSingleChildCategory =
    development.localhosts.category.getSingleChildCategory;
  private _postMoveCategory = development.localhosts.category.moveCategory;
  private _deleteCategory = development.localhosts.category.deleteCategory;
  private _deleteChildCategory =
    development.localhosts.category.deleteChildCategory;

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

  GetAllChidlsCategories() {
    return this._http.genericGetAPIData<GeneralResponse<Category[]>>(
      this._getAllChildsCategories
    );
  }

  GetSingleCategory(id: string) {
    return this._http.genericGetAPIData<GeneralResponse<Category>>(
      this._getSingleCategory + id
    );
  }

  GetSingleChildCategory(id: string) {
    return this._http.genericGetAPIData<GeneralResponse<Category>>(
      this._getSingleChildCategory + id
    );
  }

  //
  MoveCategory(request: MoveCategoryRequest) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this._postMoveCategory,
      request
    );
  }

  // Delete
  DeleteCategory(id: string) {
    return this._http.genericDeleteAPIData<GeneralResponse<any>>(
      this._deleteCategory + id
    );
  }

  DeleteChildCategory(id: string) {
    return this._http.genericDeleteAPIData<GeneralResponse<any>>(
      this._deleteChildCategory + id
    );
  }
}
