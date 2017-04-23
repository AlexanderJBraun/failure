import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import { VendorService} from '../../services/vendor.service';
import {OrderClass} from '../../../../../models/order';
import {MenuItem} from 'primeng/primeng';  
import {vOrderClass} from '../../../../../models/vOrder';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:OrderClass[];
  displayDialog: boolean;
  order: OrderClass = new PrimeOrder();
  selectedOrder: OrderClass;
  plusOrder: boolean;
  disabled: boolean = true;
  type: string;
  detailDialog: boolean;
  selectProdName: any=[{}];
  selectProdPrice: string[];
  selectProdQuant: string[];
  selectProdSub: string[];
  items: MenuItem[];
  value:true;


  
  
  
  constructor(private orderService : OrderService, private vendorService : VendorService ) { }

  ngOnInit() 
  {
    this.orderService.getOrders().subscribe(orders =>{
        this.orders = orders;

  
        
    });

    this.items=[ 
      {label: 'View details', command: (event) => this.viewProd(this.selectedOrder)}
     
    ];
    
    this.detailDialog=false;
  }

  showDialogToAdd(){
    this.disabled = false;
    this.type="date";
    this.plusOrder = true;
    this.order = new PrimeOrder();
    this.displayDialog = true;
  }

  save(){
    if(this.plusOrder)
    {
      
      
    }
    else
    {

    }
  }

  deleteOrder(){

  }


  onRowSelect(event){
    this.disabled = true;
    this.type="text";
    this.plusOrder = false;  
    this.order = this.cloneOrder(event.data);
    this.displayDialog = true;
  }

  cloneOrder(o: OrderClass): OrderClass{
    let order = new PrimeOrder();
    for(let prop in o){
      order[prop] = o[prop];
    }
    return order;
  }

 


  findSelectedOrderIndex(): number{
    return this.orders.indexOf(this.selectedOrder);

     
  }
 
  
  viewProd(order: OrderClass){
    this.selectProdName.splice(0,this.selectProdName.length);
    console.log(order.products);
      var data:any = [{}];
    if(!this.detailDialog){
      this.detailDialog=true;
      for(var index in order.products)
      {
       this.selectProdName.push(order.products[index].name);
      }
      
      console.log(this.selectProdName);
      
    }else {
      this.detailDialog = false;
    }
  }
  


  isPaid(id)
  {
    console.log(id);
    this.orderService.isPaid(id).subscribe();
  }

isDel(id)
{
  this.orderService.isDelivered(id).subscribe();

}

}
 

class PrimeOrder implements OrderClass {
  orderNumber: Number;
  date: Date;
  customer: String;
  userId: string;
  products: { name: string; price: number; quantity: number; subTotal: string; };
  Total: String;
  isPaid: boolean;
  


}

