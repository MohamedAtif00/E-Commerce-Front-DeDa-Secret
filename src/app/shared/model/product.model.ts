

class Product{
    id:string
    name: string
    description: string
    categoryId: {value:string}
    price: {discount:number,price:number,total:number}
    image: Blob
    stockQuantity:number
}

class CreateProduct
{
    name: string
    description: string
    discount: number
    categoryId:
        {
            value:string
        }
    price: number
    stockQuantity:number
}

class GetAllProducts
{ 
    id: any
    _name: string
    _description: string
    _discount: number
    categoryId:
        {
            value:string
        }
    _price: {_discount:number,_price:number,_total:number}
    _stockQuantity: number
    masterImage:string |null
    
}

class GetSingleProduct
{
    id: any
    _name: string
    _description: string
    _discount: number
    categoryId:
        {
            value:string
        }
    _price: {_discount:number,_price:number,_total:number}
    _stockQuantity: number

 }
 
export { Product,CreateProduct,GetAllProducts,GetSingleProduct}