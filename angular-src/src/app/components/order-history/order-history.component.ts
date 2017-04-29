import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';
import {OrderClass} from '../../../../../models/order';


var roles = require('./../profile/role');

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {


  userId= roles.userId;
  userOrders:OrderClass;


  constructor(private authService:AuthService,private orderService : OrderService) {
      console.log(this.userId);
       this.orderService.getOrdersByUser(this.userId).subscribe(orders =>{
        this.userOrders = orders;
        console.log(this.userOrders);

        
    });
   }

  ngOnInit() {
  
 
  }

} 
 