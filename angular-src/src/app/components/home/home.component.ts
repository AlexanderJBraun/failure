/*import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ProductClass} from '../../../../../models/product';
import {LocalStorageService} from 'angular-2-local-storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
     products: ProductClass[];
    recentItem ="None";
    public cart =[];
    quant:any=[];
    selectedProduct: ProductClass;
    displayDialog: boolean;

    


  constructor(private authService:AuthService, private localStorageService : LocalStorageService) 
  {
   
  
    this.authService.getProduct().subscribe(products => {
      this.products = products;
    });
    }

  ngOnInit() {
   
  }

  addCart(name,num)
  {
    this.recentItem=name;
    var iQ= name + " " + this.quant[num];
    this.cart.push(name);
    this.cart.push(this.quant[num]);
    this.localStorageService.set('cartItem',this.cart);
    console.log(this.cart);
    
   
   // console.log(num);
  
    
    
  }

  selectProduct(product: ProductClass){
    this.selectedProduct = product;
    this.displayDialog = true;
  }

  onDialogHide(){
    this.selectedProduct=null;
  }

  

}*/

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ProductClass} from '../../../../../models/product';
import {LocalStorageService} from 'angular-2-local-storage';
import {CartService } from '../../services/cart.service';
import {CartEntity} from './../../../app/cart.entity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    products: ProductClass[];
    product: ProductClass;
    recentItem ="None";
    public cart =[];
    quant:any=[];
    selectedProduct: ProductClass;
    displayDialog: boolean;

    


  constructor(private authService:AuthService, private localStorageService : LocalStorageService, private cartservice: CartService, private router:Router ) 
  {
   
  
    this.authService.getProduct().subscribe(products => {
      this.products = products;
    });
    }

  ngOnInit() {
   
  }

  addCart(product:ProductClass)
  {
    console.log(product._id);
    this.cartservice.getCartEntryByProductId(product._id).then(function(cartEntity: CartEntity){
        
        this.cartservice.addProductToCart(product);
         this.router.navigate(['cart']);

    }.bind(this));
    
    //this.recentItem=name;
    //var iQ= name + " " + this.quant[num];
    //this.cart.push(name);
    //this.cart.push(this.quant[num]);
    //this.localStorageService.set('cartItem',this.cart);
    //console.log(this.cart);
    
   
   // console.log(num);
  
    
    
  }

  selectProduct(product: ProductClass){
    this.selectedProduct = product;
    this.displayDialog = true;
  }

  onDialogHide(){
    this.selectedProduct=null;
  }

  

}
