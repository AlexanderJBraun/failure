import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {OrderClass} from '../../../../../models/order';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:OrderClass;

  constructor(private orderService : OrderService) { }

  ngOnInit() 
  {
    this.orderService.getOrders().subscribe(orders =>{
        this.orders = orders;
        console.log(this.orders[1].products);
        
    })
  }

  
}
 