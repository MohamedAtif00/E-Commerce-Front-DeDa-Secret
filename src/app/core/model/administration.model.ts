

export interface WelcomeMessage {
    title_Eng: string
    title_Arb: string
    desc_Eng: string
    desc_Arb:string
}

export class GetDescription
{ 
    title_eng: string
    title_arb: string
    desc_eng: string
    desc_arb:string
}
 
export interface AdministrationModel
{ 
    websiteColor: string
    welcomeMessage:WelcomeMessage
}

export interface DailyEarningProfits
{ 
    day: string
    total:number
}

export interface RecentOrder
{ 
    itemName: string
    priceForUnit: number
    productId: string
    quantity: number
    totalPrice: number
    url?:string
}


export interface GetAdministration
{ 
    title_Eng: string
    title_Arb: string
    desc_Eng: string
    desc_Arb: string
    websiteColor: string
}