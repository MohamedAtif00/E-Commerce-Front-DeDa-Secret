import { Injectable } from "@angular/core";
import { development } from "../../../environments/environment";
import { GenericCRUDService } from "../../core/services/genenric-crud.service";
import { CategoryProfits } from "./model/categoriesProfits.model";
import { GeneralResponse } from "../../core/model/general-response.model";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AdministrationService
{ 
    private _getCategoriesProfits = development.localhosts.administration.categoriesProfits


    categoriesProfitsDays: BehaviorSubject<number> = new BehaviorSubject<number>(7);

    categoryProfits: BehaviorSubject<CategoryProfits[]> = new BehaviorSubject<CategoryProfits[]>([]);

    constructor(private _http:GenericCRUDService) { }

    // Query
    GetCategoriesProfits()
    { 
        return this._http.genericGetAPIData<GeneralResponse<CategoryProfits[]>>(this._getCategoriesProfits+this.categoriesProfitsDays.value)
    }





}