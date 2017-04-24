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
  selectProdPrice: any=[];
  selectProdQuant: any=[{}];
  selectProdSub: any=[];
  items: MenuItem[];
  value:true;


  
  
  
  constructor(private orderService : OrderService, private vendorService : VendorService ) { }

  ngOnInit() 
  {
        this.detailDialog=false;
    this.orderService.getOrders().subscribe(orders =>{
        this.orders = orders;

  
        
    });

    this.items=[ 
      {label: 'View details', command: (event) => this.viewProd(this.selectedOrder)}
     
    ];
    

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
    this.selectProdPrice.splice(0, this.selectProdPrice.length);
    this.selectProdQuant.splice(0, this.selectProdQuant.length);
    this.selectProdSub.splice(0, this.selectProdSub.length);
    console.log(order.products);
      // var data:any = [{}];
    if(!this.detailDialog){
      this.detailDialog=true;
      for(var index in order.products)
      {
       this.selectProdName.push(order.products[index].name);
       this.selectProdPrice.push(order.products[index].price); 
       this.selectProdQuant.push(order.products[index].quantity);
       this.selectProdSub.push(order.products[index].subTotal);
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

