export interface OrderClass{
    id: string,
    orderNumber:Number,
    date: Date,
    customer:String,
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