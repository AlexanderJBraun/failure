import { Injectable } from '@angular/core';
import {ProductClass} from '../../../../models/product';
import {CartEntity} from './../../app/cart.entity';
import {Http, Headers} from '@angular/http';
import {UserClass} from '../../../../models/user';

@Injectable()
export class CartService {

  roles = require('../components/profile/role');
  cartEntities : CartEntity[];
  private _storage = localStorage;

  constructor(private http:Http) {
    this.initCart();
   }


 initCart () {

      // if we dont have  any cart history, create a empty cart
      if(!this._storage.getItem('cart')) {

          let emptyMap : { [key:string]:number; } = {};
          this.setCart(emptyMap);

      }
  }

    saveListOfCartEntities(listOfCartEntries : CartEntity[]) {
      // reduce all the entities to a map
      let cartMap = listOfCartEntries.reduce(function(map, cartEntry, i) {
          map[cartEntry.product._id] = cartEntry;
          return map;
      }, {});

      // persist the map
      this.setCart(cartMap);

  }

 getCartEntryByProductId(productId) {

    let myCartMap = this.getCart();
    console.log(myCartMap);
    console.log(productId);
    return Promise.resolve(myCartMap[productId]);

  }

  addProductToCart(product: ProductClass, itemQuant: number)
  {
   
   if(itemQuant === undefined)
   {itemQuant = 1;}

    
      let cartMap = this.getCart();

      if(cartMap[product._id ]!= undefined) {

        let cartInstance = cartMap[product._id];
            cartInstance.quantity = cartInstance.quantity + itemQuant;
            cartMap[product._id] = cartInstance;
      }
      else {
          // if not, set default value
          cartMap[product._id] = {
            'product':product,
            'quantity':itemQuant
          }
        }

        this.setCart(cartMap);
  }


    getAllCartEntities()  {
    // get the cart
    let myCartMap = this.getCart();
    let cartEntities : CartEntity[] = [];

    // convert the map to an array
    for (let key in myCartMap) {

      if(myCartMap[key].quantity > myCartMap[key].product.inStock)
      { myCartMap[key].backorder = true;}

      let value = myCartMap[key];
      cartEntities.push(value);
      
    }

    // return the array
    return Promise.resolve(cartEntities);

  }

private getCart() {

     let cartAsString = this._storage.getItem('cart');
     return JSON.parse(cartAsString);

  }

  private setCart(cartMap) : void{

      this._storage.setItem('cart',JSON.stringify(cartMap));

  }

sendInvoice(product, user, totalSum, orderNumber, subTotalSum, couponAmount)
{

let data= {product, user, totalSum, orderNumber, subTotalSum, couponAmount};
let body = JSON.stringify(data);
let headers = new Headers();
headers.append('Content-Type','application/json');
return this.http.post('http://localhost:3000/carts/invoice',body,{headers:headers})
}
  

  updateInventory(deduct,pID)
  {
 
    let data = {pID,deduct}
    return this.http.put('http://localhost:3000/products/updateinventory',data);
  }

  addInventory(add,pID)
  {

    let data = {pID,add}
    return this.http.put('http://localhost:3000/products/addinventory',data);
  }

editProduct(data)
  {
     let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/products/editproduct',data,{headers:headers}).map(res => res.json());  
  }

editUser(data)
  {
     let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/edituser',data,{headers:headers}).map(res => res.json());
  }

editCoupon(data)
  {
    console.log(data);
     let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/coupons/editcoupon',data,{headers:headers}).map(res => res.json());
  }






  

}

