

export interface Order
{ 
    state: string
    createdDate: string
    address: Address
    customerName: string
    phoneNumber: string
    total: number
    products: OrderItem[]
    orderId: string
    
}

export interface Address
{ 
    state: string
    city: string
    street:string
}

export interface OrderItem
{ 
    productId: string
    productName:string
    quantity: number
    total: number
    priceForUnit: number
    url?:string
}

