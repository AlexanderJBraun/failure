import { Component, OnInit } from '@angular/core';
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

  

}
