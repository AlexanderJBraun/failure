import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {ProductClass} from '../../../../models/product';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  product: any;
  customer: any;

  constructor(private http:Http) { }

  registerUser(user){
    console.log("firstLine of registeruser function");
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
      .map(res => res.json());
      
      
  }


  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProduct(){
    console.log("in getProduct");
      return this.http.get('http://localhost:3000/products/products')
          .map(res => res.json());
  }

 getUser(){
      return this.http.get('http://localhost:3000/users/users')
          .map(res => res.json());
  }


  addProduct(product){
    let headers = new Headers();
    console.log(product);
    console.log("in add product 0");
    headers.append('Content-Type','application/json');
    console.log("in add product 01");
    return this.http.post('http://localhost:3000/products/newProduct', product,{headers: headers})
      .map(res => res.json());
  }

  addUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/newUser',  user,{headers: headers})
      .map(res => res.json());
  }
  
   deleteUser(id){
    return this.http.delete('http://localhost:3000/users/user/'+id)
      .map(res => res.json());
  }


  deleteProduct(id){
    return this.http.delete('http://localhost:3000/products/product/'+id)
      .map(res => res.json());
  }
    delete(id){
    return this.http.delete('http://localhost:3000/products/product'+id)
      .map(res => res.json());
  }

    save(product){
      return this.http.put('http://localhost:3000/products/products', product)
      .map(res => res.json());
  }

    getVendor(){
    console.log("in getVendor");
      return this.http.get('http://localhost:3000/vendors/vendors')
          .map(res => res.json());
  }

  deleteVendor(id){
    return this.http.delete('http://localhost:3000/vendors/vendor/'+id)
      .map(res => res.json());
  }

  addVendor(vendor){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/vendors/newVendor',  vendor,{headers: headers})
      .map(res => res.json());
  }
}
