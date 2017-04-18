import { Injectable } from '@angular/core';
import {ProductClass} from '../../../../models/product';
import {CartEntity} from './../../app/cart.entity';
import {Http, Headers} from '@angular/http';
import {UserClass} from '../../../../models/user';
@Injectable()
export class VendorService {

  roles = require('../components/profile/role');
 
  private _vendorstorage = localStorage;

  constructor(private http:Http) {
    this.initCart();
   }


 initCart () {

      // if we dont have  any cart history, create a empty cart
      if(!this._vendorstorage.getItem('vendor')) {

          let emptyMap : { [key:string]:number; } = {};
          this.setCart(emptyMap);

      }
  }

    saveListOfCartEntities(listOfCartEntries : CartEntity[]) {
      // reduce all the entities to a map
      let vendorMap = listOfCartEntries.reduce(function(map, cartEntry, i) {
          map[cartEntry.product._id] = cartEntry;
          return map;
      }, {});

      // persist the map
      this.setCart(vendorMap);

  }

 getCartEntryByProductId(productId) {

    let myvendorMap = this.getCart();
    console.log(myvendorMap);
    console.log(productId);
    return Promise.resolve(myvendorMap[productId]);

  }

  addProductToVendor(product: ProductClass, itemQuant: number)
  {
   
   if(itemQuant === undefined)
   {itemQuant = 1;}

    
      let vendorMap = this.getCart();

      if(vendorMap[product._id ]!= undefined) {

        let vendorInstance = vendorMap[product._id];
            vendorInstance.quantity = vendorInstance.quantity + itemQuant;
            vendorMap[product._id] = vendorInstance;
      }
      else {
          // if not, set default value
          vendorMap[product._id] = {
            'product':product,
            'quantity':itemQuant
          }
        }

        this.setCart(vendorMap);
  }


    getAllCartEntities()  {
    // get the cart
    let myvendorMap = this.getCart();
    let cartEntities : CartEntity[] = [];

    // convert the map to an array
    for (let key in myvendorMap) {
      let value = myvendorMap[key];
      cartEntities.push(value);
    }

    // return the array
    return Promise.resolve(cartEntities);

  }

private getCart() {

     let vendorAsString = this._vendorstorage.getItem('vendor');
     return JSON.parse(vendorAsString);

  }

  private setCart(vendorMap) : void{

      this._vendorstorage.setItem('vendor',JSON.stringify(vendorMap));

  }

sendVendorInvoice(user, product, totalSum, orderNumber)
{

let data= {user, product, totalSum, orderNumber};
let body = JSON.stringify(data);
let headers = new Headers();
headers.append('Content-Type','application/json');
return this.http.post('http://localhost:3000/vendor/invoice',body,{headers:headers})
}
  

  addInventory(add,pID)
  {
    console.log("in update Inv");
    let data = {pID,add}
    return this.http.put('http://localhost:3000/products/addinventory',data);
  }


saveOrder(order,userID,orderNumber,totalSum)
{
console.log("in order service");
  let data = {order,userID,orderNumber,totalSum};
console.log(data);

return this.http.post('http://localhost:3000/vendorOrder/saveorder',data).map(res => res.json());
}

getOrderNumber()
{
  return this.http.get('http://localhost:3000/vendorOrder/orderNumber').map(res => res.json());
}
getOrders()
{ 

  return this.http.get('http://localhost:3000/vendorOrder/orders').map(res => res.json());

}

updateOrderNumber(){
  console.log("in update order number services")
  return this.http.get('http://localhost:3000/vendorOrder/updateOrderNumber').map(res => res.json());
}




  

}

