

class   CreateOrder
{ 
    CustomerId: { value: string | null }
    OrderItemDTOs: OrderItem[]
    Address: Address
    CustomerName: string
    PhoneNumber:string
}

class OrderItem
{ 
    ProductId: string
    quantity: number
}

class Address
{ 
    state: string
    city: string
    street:string
}

class GetAllOrders
{ 
    id: string
    state: string
    createdDate: string
    customerName: string
    address: Address
    phoneNumber: string
    totalPrice:number
}




export { CreateOrder,OrderItem,Address,GetAllOrders}