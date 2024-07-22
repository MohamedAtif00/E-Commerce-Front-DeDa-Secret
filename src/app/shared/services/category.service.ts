import { Injectable } from "@angular/core";
import { development } from "../../../environments/environment";
import { GenericCRUDService } from "../../core/services/genenric-crud.service";
import { GeneralResponse } from "../../core/model/general-response.model";
import { Category } from "../model/category.model";


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private _addCategory = development.localhosts.category.addCategory
    private _getAllCategories = development.localhosts.category.getAllCategories


    constructor(private CRUDService:GenericCRUDService) { }


    AddCategory(name:string)
    {
        return this.CRUDService.genericPostAPIData<GeneralResponse<any>>(this._addCategory, {name});
    }

    GetAllCategories()
    {
        return this.CRUDService.genericGetAPIData<any>(this._getAllCategories)
    }

 }