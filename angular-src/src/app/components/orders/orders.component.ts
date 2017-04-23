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

  vorders: vOrderClass[];
  vdisplayDialog: boolean;
  vorder: vOrderClass = new PrimeOrder();
  vselectedOrder: vOrderClass;
  vplusOrder: boolean;
  vdisabled: boolean = true;
  vtype: string;
  vdetailDialog: boolean;
  vselectProdName: any=[{}];
  vselectProdPrice: string[];
  vselectProdQuant: string[];
  vselectProdSub: string[];
  vitems: MenuItem[];

  
  
  
  constructor(private orderService : OrderService, private vendorService : VendorService ) { }

  ngOnInit() 
  {
    this.orderService.getOrders().subscribe(orders =>{
        this.orders = orders;

  
        
    });

      this.vendorService.getOrders().subscribe(orders =>{
        this.vorders = orders;
        console.log(this.vorders);
    });

    this.items=[ 
      {label: 'View details', command: (event) => this.viewProd(this.selectedOrder)}
     
    ];
    this.vitems=[
      {label: 'View details', command: (event) => this.vviewProd(this.selectedOrder)}
    ]

    this.detailDialog=false;
  }

  showDialogToAdd(){
    this.disabled = false;
    this.type="date";
    this.plusOrder = true;
    this.order = new PrimeOrder();
    this.displayDialog = true;

    this.vdisabled = false;
    this.vtype="date";
    this.vplusOrder = true;
    this.vorder = new PrimeOrder();
    this.vdisplayDialog = true;

 

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


    this.vdisabled = true;
    this.vtype="text";
    this.vplusOrder = false;  
    this.vorder = this.vcloneOrder(event.data);
    this.vdisplayDialog = true;
 
  }

  cloneOrder(o: OrderClass): OrderClass{
    let order = new PrimeOrder();
    for(let prop in o){
      order[prop] = o[prop];
    }
    return order;
  }

    vcloneOrder(o: vOrderClass): vOrderClass{
    let vorder = new PrimeOrder();
    for(let prop in o){
      vorder[prop] = o[prop];
    }
    return vorder;
  }


  findSelectedOrderIndex(): number{
    return this.orders.indexOf(this.selectedOrder);

     
  }
    vfindSelectedOrderIndex(): number{
    return this.vorders.indexOf(this.vselectedOrder);

     
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
      //console.log(data);
      console.log(this.selectProdName);
      
    }else {
      this.detailDialog = false;
    }
  }
  
    vviewProd(vorder: vOrderClass){
    this.vselectProdName.splice(0,this.vselectProdName.length);
    console.log(vorder.products);
      var data:any = [{}];
    if(!this.detailDialog){
      this.detailDialog=true;
      for(var index in vorder.products)
      {
  

       this.vselectProdName.push(vorder.products[index].name);
        
      }
      //console.log(data);
      console.log(this.vselectProdName);
      
    }else {
      this.detailDialog = false;
    }
  }

  incrementVal(id)
  {
//
    console.log(id);
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

