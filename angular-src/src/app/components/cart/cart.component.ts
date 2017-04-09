import { Component, OnInit } from '@angular/core';
import {ProductClass} from '../../../../../models/Product';
import {SumPipe} from './sum.pipe';
import {CartEntity} from './../../../app/cart.entity';
import {CartService } from '../../services/cart.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import {UserClass} from '../../../../../models/user';


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



  public cart=JSON.parse(localStorage.getItem('my-app.cartItem'));
  

  constructor(private http:Http,private authService:AuthService,private router:Router, private cartService: CartService) { }


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
        if(newValue > 0 && newValue <= cartEntry.product.inStock) {
          // set the new value
          cartEntry.quantity = newValue;
          // calculate a new max value
          this.calcMax();
          // save to localStorage
          this.cartService.saveListOfCartEntities(this.cartEntities);
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
   this.updateInventory();

      
    });

  }


  sendInvoice()
  {

    this.cartService.sendInvoice(this.cartEntities, this.user, this.totalSum).subscribe();
    this.updateInventory();    
     this.router.navigate(['profile']);
     
    
  }

  updateInventory()
  {
    for(var index in this.cartEntities)
    {
      var pID = this.cartEntities[index].product._id;
      var temp = this.cartEntities[index].product.inStock;
      var deduct = temp - this.cartEntities[index].quantity;
      console.log(deduct)
    this.cartService.updateInventory(deduct,pID).subscribe();
    //console.log(deduct)
    }
  }

}
