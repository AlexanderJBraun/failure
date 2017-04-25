export interface vOrderClass{
    vendorOrderNumber:Number,
    vDate: Date,
    // customer:String,
    // userId: string,
    vProducts:{
        name:string,
        price:number,
        quantity:number,
        subTotal:string,
    },
    vTotal:String,
    isReceived:Boolean
}