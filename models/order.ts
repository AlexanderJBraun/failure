export interface OrderClass{
    orderNumber:Number,
    date: Date,
    custome:String,
    userId: string,
    products:{
        name:string,
        price:number,
        quantity:number,
        subTotal:string,
    },
    Total:String,
    isPaid:Boolean
}