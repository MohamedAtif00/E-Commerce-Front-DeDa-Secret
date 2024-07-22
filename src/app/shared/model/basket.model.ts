

class Basket
{
    BasketItems: BasketItem[] = []
    totalAmount:number
}
 

class BasketItem
{
    ProductId: string
    Quantity: number
    UnitPrice:number
    Total: number
    
}

export {Basket,BasketItem }