import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';
import {OrderClass} from '../../../../../models/order';
import {MenuItem} from 'primeng/primeng';  


var roles = require('./../profile/role');


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  region: string;
  userId= roles.userId;
  userOrders:OrderClass[];
  displayDialog: boolean;
  userOrder: OrderClass = new PrimeUserOrder();
  selectedUserOrder: OrderClass;
  detailDialog: boolean;
  selectProdName: any=[{}];
  selectProdPrice: any=[];
  selectProdQuant: any=[];
  selectProdSub: any=[];
  items: MenuItem[];
  exportDate: Date;
  


  constructor(private authService:AuthService,private orderService : OrderService) {
      console.log(this.userId);
       
   }

  ngOnInit() {
        this.detailDialog = false;

        this.orderService.getOrdersByUser(this.userId).subscribe(orders =>{
        this.userOrders = orders;
        console.log(this.userOrders);      
    });

        this.items=[
          {label: 'View details', command: (event) => this.viewProd(this.selectedUserOrder)}
        ];

        this.authService.getProfile().subscribe(profile => {
        this.region = profile.user.region;
     

    },
    err => {
      
      return false;
    });
        console.log(this.region);


        this.exportDate = new Date();
  }

   onRowSelect(event){
     this.displayDialog = true;
     this.userOrder = this.cloneUserOrder(event.data);
   }

   cloneUserOrder(uo: OrderClass): OrderClass{
     let userOrder = new PrimeUserOrder();
     for(let prop in uo){
       userOrder[prop] = uo[prop];
     }
     return userOrder;
   }

   findSelectedUserOrderIndex(): number{
     return this.userOrders.indexOf(this.selectedUserOrder);
   }

   viewProd(userOrder: OrderClass){
     this.selectProdName.splice(0,this.selectProdName.length);
    this.selectProdPrice.splice(0, this.selectProdPrice.length);
    this.selectProdQuant.splice(0, this.selectProdQuant.length);
    this.selectProdSub.splice(0, this.selectProdSub.length);

    if(!this.detailDialog){
      this.detailDialog = true;
      for(var index in userOrder.products){
        this.selectProdName.push(userOrder.products[index].name);
        this.selectProdPrice.push(userOrder.products[index].price); 
        this.selectProdQuant.push(userOrder.products[index].quantity);
        this.selectProdSub.push(userOrder.products[index].subTotal);
      }
    }else {
      this.detailDialog = false;
    }
   }
} 
 
class PrimeUserOrder implements OrderClass {
  orderNumber: Number;
  date: Date;
  customer: String;
  userId: string;
  products: { name: string; price: number; quantity: number; subTotal: string; };
  Total: String;
  isPaid: Boolean;


 }