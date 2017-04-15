export interface OrderClass{
    orderNumber:string,
    userId: string,
    products:{
        name:string,
        quantity:number,
        price:number,
        subTotal:number
    }
}