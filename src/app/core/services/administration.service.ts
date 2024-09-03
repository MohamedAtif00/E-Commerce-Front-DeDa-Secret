import { Injectable } from "@angular/core";
import { development } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { WelcomeMessage, AdministrationModel, DailyEarningProfits, RecentOrder, GetAdministration, GetDescription } from '../model/administration.model';
import { GeneralResponse } from "../model/general-response.model";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AdministrationService
{
    heroImage: File;
    welcomeMessage: WelcomeMessage;
    websiteColor: string;


    private _getAdministration = development.localhosts.administration.getAdministration
    private _getDailyEarningProfits = development.localhosts.administration.dailyEarningProfits
    private _getRecentOrder = development.localhosts.administration.getRecentOrder
    private _getDescription = development.localhosts.administration.getDescription
    private _getHero = development.localhosts.administration.getHero
    private _getSpecialProducts = development.localhosts.administration.getSpecialProducts

    private _changeWebsiteColor = development.localhosts.administration.changeWebsiteColor
    private _changeWebsiteLogo = development.localhosts.administration.changeWebsiteLogo
    private _changeWelcomeMessage = development.localhosts.administration.changeWelcomeMessage
    private _changeDescription = development.localhosts.administration.changeDescription
    private _changeHero = development.localhosts.administration.changeHeroImage
    private _addSpecialProduct = development.localhosts.administration.addSpecialProduct
    private _deleteProduct = development.localhosts.administration.deleteProduct
    

    constructor(private _http: HttpClient)
    { 
        this.GetAdministration().subscribe(data =>
        { 
            console.log(data);
            this.websiteColor = data.value.websiteColor
        })
    }

    // Query
    
    GetAdministration()
    {
        return this._http.get<GeneralResponse<GetAdministration>>(this._getAdministration);
    }

    GetDailyEarningProfits()
    { 
        return this._http.get<GeneralResponse<DailyEarningProfits[]>>(this._getDailyEarningProfits);
    }

    GetRecentOrder(id:string)
    { 
        return this._http.get<GeneralResponse<RecentOrder[]>>(this._getRecentOrder+id);
    }

    GetDescription()
    { 
        return this._http.get<GeneralResponse<GetDescription>>(this._getDescription);
    }

    GetHero()
    { 
        return this._http.get(this._getHero, {responseType:'blob'});
    }

    GetSpecialProducts()
    { 
        return this._http.get<GeneralResponse<SpecialProduct[]>>(this._getSpecialProducts);
     }



    // Commands

    ChangeWebsiteColor(color:string)
    {
        return this._http.post<any>(this._changeWebsiteColor, {color})
    }

    SetWebsiteLogo(file:File)
    { 
        let formdata = new FormData().append('logo',file);
        return this._http.post<any>(this._changeWebsiteLogo,formdata)
    }

    SetWelcomeMessage(message:WelcomeMessage)
    { 
        return this._http.post<GeneralResponse<any>>(this._changeWelcomeMessage,message);
    }

    SetDescription(description: WelcomeMessage)
    { 

        return this._http.post(this._changeDescription,description);
    }

    ChangeHero(data:FormData)
    { 
        return this._http.post(this._changeHero,data);
    }

    AddSpecialProduct(id:string)
    { 
        return this._http.get(this._addSpecialProduct+id);
    }

    // DeleteProduct method
    DeleteProduct(id: string): Observable<void> {
        return this._http.delete<void>(`${this._deleteProduct}${id}`);
    }


}


interface SpecialProduct
{ 
    productId:string
}