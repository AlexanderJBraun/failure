import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {VendorService} from '../../services/vendor.service';
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
  detailvDialog: boolean;
  selectProdName: any=[{}];
  selectProdPrice: any=[];
  selectProdQuant: any=[{}];
  selectProdSub: any=[];
  selectvProdName: any=[{}];
  selectvProdPrice: any=[];
  selectvProdQuant: any=[{}];
  selectvProdSub: any=[];
  items: MenuItem[];
  items2: MenuItem[];
  value:true;

  vorders: vOrderClass[];
  displayvDialog: boolean;
  vorder: vOrderClass = new PrimevOrder();
  plusvOrder: boolean;
  selectedvOrder: vOrderClass;
  invoiceDate: Date;




  
  
  
  constructor(private orderService : OrderService, private vendorService : VendorService ) { }

  ngOnInit() 
  {
        this.detailDialog=false;
    this.orderService.getOrders().subscribe(orders =>{
        this.orders = orders;
       
    });
    this.vendorService.getOrders().subscribe(orders =>{
        this.vorders = orders;
    });
    this.items=[ 
      {label: 'View details', command: (event) => this.viewProd(this.selectedOrder)}
     
    ];
    
    this.items2=[
      {label: 'View details', command: (event) => this.viewvProd(this.selectedvOrder)}
    ];

    this.invoiceDate = new Date();

  }

  showDialogToAdd(){
    this.disabled = false;
    this.type="date";
    this.plusOrder = true;
    this.order = new PrimeOrder();
    this.displayDialog = true;
  }

  onRowSelect(event){
    this.disabled = true;
    this.type="text";
    this.plusOrder = false;  
    this.order = this.cloneOrder(event.data);
    this.displayDialog = true;
  }

    onRowvSelect(event){
    this.disabled = true;
    this.type="text";
    this.plusOrder = false;  
    this.vorder = this.clonevOrder(event.data);
    this.displayvDialog = true;
  }

  cloneOrder(o: OrderClass): OrderClass{
    let order = new PrimeOrder();
    for(let prop in o){
      order[prop] = o[prop];
    }
    return order;
  }

  clonevOrder(v: vOrderClass): vOrderClass{
    let vorder = new PrimevOrder();
    for(let prop in v){
      vorder[prop]=v[prop];
    }
    return vorder;
  }

 


  findSelectedOrderIndex(): number{
    return this.orders.indexOf(this.selectedOrder);
  }
   findSelectedvOrderIndex(): number{
    return this.vorders.indexOf(this.selectedvOrder);
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
      

      
    }else {
      this.detailDialog = false;
    }
  }

  viewvProd(vorder: vOrderClass){
    this.selectvProdName.splice(0, this.selectvProdName.length);
    this.selectvProdPrice.splice(0, this.selectvProdPrice.length);
    this.selectvProdQuant.splice(0, this.selectvProdQuant.length);
    this.selectvProdSub.splice(0, this.selectvProdSub.length);

    if(!this.detailvDialog){
      this.detailvDialog = true;

      for(var index in vorder.vProducts){
        this.selectvProdName.push(vorder.vProducts[index].name);
        this.selectvProdPrice.push(vorder.vProducts[index].price);
        this.selectvProdQuant.push(vorder.vProducts[index].quantity);
        this.selectvProdSub.push(vorder.vProducts[index].subTotal);
      }
    }else{
      this.detailvDialog=false;
    }
  }
  


  isPaid(id,orderNum)
  {
    if (confirm("Please confirm that order Number: " + orderNum + " is Paid. "  + "( You will not be able to deselect it)"))
  {
    this.orderService.isPaid(id).subscribe();

     window.location.reload();
  }
  }

isDel(id,orderNum)
{
  if (confirm("Please confirm that order Number: " + orderNum + " is Delivered. "  + "( You will not be able to deselect it)"))
  {
  this.orderService.isDelivered(id).subscribe();

   window.location.reload();
  }

}

isRec(id,orderNum,products)
{

  if (confirm("Please confirm that order Number: " + orderNum + " is received. "  + "( You will not be able to deselect it later)"))
  {
    this.vendorService.isReceived(id).subscribe();

  for ( var i in products)
  {
    console.log(products[i].name)
    this.vendorService.incrInventory(products[i].name,products[i].quantity).subscribe();
  }

  window.location.reload();
 

}
 
}
cancelOrder(id,orderNumber,products)
{
  if(confirm("Click Ok to cancel order "+ orderNumber))
  {
    console.log(id);
     var orders = this.orders;
    for ( var i in products)
  {
    console.log(products[i].name);
    this.vendorService.incrInventory(products[i].name,products[i].quantity).subscribe();
  }
      
      this.orderService.deleteUser(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < orders.length;i++){
            if(orders[i].id == id){
              orders.splice(i,1);
            } 
          }
        }
        this.ngOnInit();
      });
    }
  this.displayDialog = false;
  }



//   vcancelOrder(id,orderNumber,products)
// {
//   if(confirm("Click Ok to cancel order "+ orderNumber))
//   {
//     console.log(id);
//      var orders = this.orders;
//     for ( var i in products)
//   {
//     console.log(products[i].name);
//     this.vendorService.incrInventory(products[i].name,products[i].quantity).subscribe();
//   }
      
//       this.orderService.deleteUser(id).subscribe(data => {
//         if(data.n == 1){
//            for(var i = 0;i < orders.length;i++){
//             if(orders[i].id == id){
//               orders.splice(i,1);
//             } 
//           }
//         }
//         this.ngOnInit();
//       });
//     }
//   this.displayDialog = false;
  
// }


}







 

class PrimeOrder implements OrderClass {
  id: string;
  orderNumber: Number;
  date: Date;
  customer: String;
  userId: string;
  products: { name: string; price: number; quantity: number; subTotal: string; };
  Total: String;
  isPaid: boolean;
  


}

class PrimevOrder implements vOrderClass {
   id: string;
  vendorOrderNumber: Number;
  vDate: Date;
  vProducts: { name: string; price: number; quantity: number; subTotal: string; };
  vTotal: String;
  isReceived: Boolean;


}
