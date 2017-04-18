import { Component, OnInit } from '@angular/core';
import {ProductClass} from '../../../../../models/Product';
import {SumPipe} from './sum.pipe';
import {CartEntity} from './../../../app/cart.entity';
import {CartService } from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import {UserClass} from '../../../../../models/user';
import {FlashMessagesService} from 'angular2-flash-messages';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
 
})
export class CartComponent implements OnInit {

  cartEntities : CartEntity[];
  totalSum: string;
  user:Object;
  email:String;
  order:any;


  public cart=JSON.parse(localStorage.getItem('my-app.cartItem'));
  

  constructor(private http:Http,
  private authService:AuthService,
  private router:Router, 
  private cartService: CartService,
  private orderService : OrderService,
  private flashMessage: FlashMessagesService) {   }


      getProducts() {
        
     
        this.cartService.getAllCartEntities().then(function(result) {

            this.cartEntities = result;
            this.calcMax();

          }.bind(this), function(err) {
              alert("something went wrong while fetching the products");
          });


    }

      removeByProductId(productId:String) {

        // Filter out all cartEntities with given productId,  finally the new stuff from es6 can be used.
        this.cartEntities = this.cartEntities.filter(entry => entry.product._id != productId);

        // recalculate max value
        this.calcMax();

        //save to localStorage
        this.cartService.saveListOfCartEntities(this.cartEntities);
    }


       changeQuantity (productId:String, valueChange:number) {

        // find the CartEntity we are searching for and perform the action
        let cartEntry = this.cartEntities.find(entry => entry.product._id === productId);

        let newValue = cartEntry.quantity + valueChange;

          console.log(newValue,cartEntry.product.inStock);
        // just verify that the user wont do a action that is not permited. ie reduce to 0 or over max
        if(newValue > 0) {
          // set the new value
          cartEntry.quantity = newValue;
          // calculate a new max value
          this.calcMax();
          // save to localStorage
          this.cartService.saveListOfCartEntities(this.cartEntities);

          if(cartEntry.quantity > cartEntry.product.inStock)
          {cartEntry.backorder = true;}

          else
          cartEntry.backorder = false;
        }

    }



     calcMax () {

      let totalSum = 0;
      //let subTotal;
      this.cartEntities.forEach(function(entity) {
          totalSum += (entity.quantity * entity.product.price);
      });

      this.cartEntities.forEach(function(entity) {
       
        entity.subTotal = (entity.product.price * entity.quantity).toFixed(2);

      });

      this.cartEntities.forEach(function(entity){
        entity.subTotal = (entity.quantity * entity.product.price).toFixed(2); 
      });

      console.log(this.totalSum);
      this.totalSum = totalSum.toFixed(2);

    }


  ngOnInit() {
    this.getProducts();
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.email= profile.user.email;
  
      
    });
      this.getOrderNumber()

  }


  sendInvoice()
  {
    
    this.cartService.sendInvoice(this.cartEntities, this.user, this.totalSum, this.order.orderNumber).subscribe();
    this.updateInventory();  
    this.storeOrder();  
    this.orderService.updateOrderNumber().subscribe();
     this.router.navigate(['profile']);
     localStorage.removeItem('cart');
     
    this.cartService.initCart();
  }

  updateInventory()
  {
    for(var index in this.cartEntities)
    {
      var pID = this.cartEntities[index].product._id;
      var temp = this.cartEntities[index].product.inStock;
      var deduct = temp - this.cartEntities[index].quantity;
    
    this.cartService.updateInventory(deduct,pID).subscribe()
    
    }
  }

  storeOrder()
  {
 
 
    
    console.log(this.cartEntities);
    var order=[];
    
     
      for(var index in this.cartEntities)
      {
        var product ={
         "name":this.cartEntities[index].product.itemCode,
         "price":this.cartEntities[index].product.price,
         "quantity":this.cartEntities[index].quantity,
         "subTotal": this.cartEntities[index].subTotal
        }

        order.push(product);
      }

      console.log(this.order);
    
    
    this.orderService.saveOrder(order,this.user,this.order.orderNumber,this.totalSum).subscribe(data =>{
      if (data.success == true)
      {
      this.flashMessage.show('ORDER STORED', {
          cssClass: 'alert-success',
          timeout: 5000});
      } 
    });
  }

  getOrderNumber()
  {
    console.log("dfasffsdafsdag")
    this.orderService.getOrderNumber().subscribe(orderNumber=>{
      this.order = orderNumber;
      
    })
    
  }

  
}
