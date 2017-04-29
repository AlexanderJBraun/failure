import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ProductClass} from '../../../../../models/product';
import {LocalStorageService} from 'angular-2-local-storage';
import {CartService } from '../../services/cart.service';
import {CartEntity} from './../../../app/cart.entity';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SpinnerModule} from 'primeng/components/spinner/spinner';

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



  constructor(private authService:AuthService, 
  private flashMessage:FlashMessagesService, 
  private localStorageService : LocalStorageService, 
  private cartservice: CartService, 
  private router:Router ) 
  {

    }

  ngOnInit() { 
    this.authService.getProduct().subscribe(products => {
      this.products = products;
    });

    this.cartservice.initCart();
  }

  addCart(product, quant)
  {    
    
    if(!this.authService.loggedIn())
    {
      this.router.navigate(['login']);
    }
    else{
    this.cartservice.getCartEntryByProductId(product._id).then(function(cartEntity: CartEntity){
        
        this.cartservice.addProductToCart(product, quant);
          this.flashMessage.show(product.itemCode + ' '+'added to your cart', {
          cssClass: 'alert-success',
          timeout: 2000});
         
    }.bind(this));
    }
    
  }

  selectProduct(product: ProductClass){
    this.selectedProduct = product;
    this.displayDialog = true;
  }

  onDialogHide(){
    this.selectedProduct=null;
  }

  

}
