import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {OrderClass} from '../../../../models/order';

@Injectable()
export class OrderService {

  constructor(private http:Http) { }

  saveOrder(order,userID,orderNumber,totalSum, subTotalSum, couponAmount)
{
console.log("in order service");
  let data = {order,userID,orderNumber,totalSum, subTotalSum, couponAmount};
console.log(data);

return this.http.post('http://localhost:3000/orders/saverorder',data).map(res => res.json());
}

getOrderNumber()
{
  return this.http.get('http://localhost:3000/orders/orderNumber').map(res => res.json());
}
getOrders()
{ 

  return this.http.get('http://localhost:3000/orders/orders').map(res => res.json());

}

updateOrderNumber()
{
  console.log("in update order number services")
  return this.http.get('http://localhost:3000/orders/updateOrderNumber').map(res => res.json());
}

isPaid(id)
{
  let data = {id};
  return this.http.post('http://localhost:3000/orders/isPaid',data).map(res => res.json());
}

isDelivered(id)
{
  let data = {id};
  return this.http.post('http://localhost:3000/orders/isDelivered',data).map(res => res.json());
}


}
 