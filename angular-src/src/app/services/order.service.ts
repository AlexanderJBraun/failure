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

return this.http.post('http://localhost:3000/orders/saverorder',data).map(res => res.json());
}

getOrderNumber()
{
  return this.http.get('http://localhost:3000/orders/orderNumber').map(res => res.json());
}
getOrders()
{ 

  return this.http.get('http://localhost:3000/orders/order').map(res => res.json());
 


}


}
