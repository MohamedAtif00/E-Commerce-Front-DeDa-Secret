import { Injectable } from "@angular/core";
import { GenericCRUDService } from "../../core/services/genenric-crud.service";
import { development } from "../../../environments/environment";
import { CreateProduct, GetAllProducts, GetSingleProduct } from "../model/product.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GeneralResponse, PageList } from "../../core/model/general-response.model";


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    Product: CreateProduct = new CreateProduct;
    file: File;
    files: File[] = [];


    private _createProduct = development.localhosts.product.addProduct
    private _addMasterImage = development.localhosts.product.addMasterImage
    private _addProductImages = development.localhosts.product.addProductImages
    private _getAllProducts = development.localhosts.product.getAllProductsWithNumber
    private _getSingleProduct = development.localhosts.product.getSingleProduct
    private _getProductMasterImage  = development.localhosts.product.getProductMasterImage

    // constructor(private genericService: GenericCRUDService) { }
    constructor(private _http: HttpClient) { }

    CreateProduct() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        this.Product.discount = 0
        return this._http.post<GeneralResponse<any>>(this._createProduct, this.Product, { headers })
    }
    
    AddMatserImage(id: string) {
        let data = new FormData();
        data.append('file', this.file);
        data.append('ProductId', id);
        return this._http.post(this._addMasterImage, data);
    }
    
    AddProductImages(productId:string)
    { 
        let data = new FormData();
        this.files.forEach(e => data.append('files', e))
        data.append('productId',productId);

        return this._http.post(this._addProductImages, data)

    }


    GetAllProducts(number:number)
    {
        return this._http.get<GeneralResponse<PageList<GetAllProducts[]>>>(this._getAllProducts+number)        
    }
    
    GetSingleProduct(id:string)
    {
        return this._http.get<GeneralResponse<GetAllProducts>>(this._getSingleProduct+id)
    }


    GetProductMasterImage(id:string )
    { 
        return this._http.get(this._getProductMasterImage + id, {responseType:'blob'})
    }


    
}