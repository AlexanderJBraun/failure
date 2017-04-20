import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {OrderClass} from '../../../../models/order';

@Injectable()
export class OrderService {

  constructor(private http:Http) { }

  saveOrder(order,userID,orderNumber,totalSum)
{
console.log("in order service");
  let data = {order,userID,orderNumber,totalSum};
console.log(data);

return this.http.post('orders/saverorder',data).map(res => res.json());
}

getOrderNumber()
{
  return this.http.get('orders/orderNumber').map(res => res.json());
}
getOrders()
{ 

  return this.http.get('orders/orders').map(res => res.json());

}

updateOrderNumber(){
  console.log("in update order number services")
  return this.http.get('orders/updateOrderNumber').map(res => res.json());
}


}
 