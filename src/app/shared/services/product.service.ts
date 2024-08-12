import { EventEmitter, Injectable, Signal, signal } from "@angular/core";
import { GenericCRUDService } from "../../core/services/genenric-crud.service";
import { development } from "../../../environments/environment";
import { CreateProduct, GetAllProducts, GetSingleProduct } from "../model/product.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GeneralResponse, PageList } from "../../core/model/general-response.model";
import { UploadedFile } from "../../modules/admin/add-product/general-info/add-images/add-images.component";
import { BehaviorSubject, Observable, map } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    Product: CreateProduct = new CreateProduct;
    file = signal<File>(null)
    files: BehaviorSubject<UploadedFile[]> = new BehaviorSubject<UploadedFile[]>([]);
    
    files$ = this.files.asObservable();

    uploudfiles = []



    private _createProduct = development.localhosts.product.addProduct
    private _updateProduct = development.localhosts.product.updateProducts
    private _addMasterImage = development.localhosts.product.addMasterImage
    private _addProductImages = development.localhosts.product.addProductImages

    private _getAllProducts = development.localhosts.product.getAllProductsWithNumber
    private _getSingleProduct = development.localhosts.product.getSingleProduct
    private _getProductMasterImage = development.localhosts.product.getProductMasterImage
    private _getproductImage = development.localhosts.product.getProductImage

    // constructor(private genericService: GenericCRUDService) { }
    constructor(private _http: HttpClient) { }

    CreateNewProduct() {
        console.log('start creating product');
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this._http.post<GeneralResponse<any>>(this._createProduct, this.Product, { headers })
    }

    UpdateProduct(id:string)
    { 
        return this._http.put<GeneralResponse<any>>(this._updateProduct+id,this.Product)
    }


    
    AddMatserImage(id: string) {
        let data = new FormData();
        console.log('add masster image',this.file());
        
        data.append('file', this.file());
        data.append('ProductId', id);
        return this._http.post(this._addMasterImage, data);
    }
    
    AddProductImages(data:FormData,id:string)
    { 
       console.log('start creating product images');
       
        return this._http.post(this._addProductImages+id, data)   

    }





    GetAllProducts(number: number, searchTerm?: string,sortColumn?:string) {
        const url = this._getAllProducts + number + (searchTerm ? `&searchTerm=${searchTerm}` : '')+(sortColumn?`&sortColumn=${sortColumn}`:'');
        return this._http.get<GeneralResponse<PageList<GetAllProducts[]>>>(url);
    }   
    
    GetSingleProduct(id:string)
    {
        return this._http.get<GeneralResponse<GetSingleProduct>>(this._getSingleProduct+id)
    }


    GetProductMasterImage(id:string )
    { 
        return this._http.get(this._getProductMasterImage + id, {responseType:'blob'})
    }

    getProductImage(productId: string, imageId: string): Observable<{ blob: Blob, fileName: string }> {
        return this._http.get(this._getproductImage + imageId + `/${productId}`, {
            observe: 'response',
            responseType: 'blob'
        }).pipe(
            map(response => {
                // Extract file name from Content-Disposition header
                const contentDisposition = response.headers.get('Content-Disposition');
                let fileName = 'default.jpg'; // Default file name

                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch) {
                        fileName = fileNameMatch[1];
                    }
                }

                return {
                    blob: response.body as Blob,
                    fileName
                };
            })
        );
    }



    
}