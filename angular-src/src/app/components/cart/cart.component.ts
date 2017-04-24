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
import {CouponClass} from '../../../../../models/coupon';
import {ProfileService} from '../../services/profile.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
 
})
export class CartComponent implements OnInit {


  cartEntities : CartEntity[];
  subTotalSum: number;
  totalSum: number;
  user:Object;
  role: String;
  email:String;
  order:any;
  coupons: CouponClass[];
  couponDiscount: number = 0;
  couponAmount: string;
  users: UserClass[];
  userDropbox: SelectItem[] = [];
  selectedUser: Object;

  public cart=JSON.parse(localStorage.getItem('my-app.cartItem'));
  

  constructor(private http:Http,
  private authService:AuthService,
  private router:Router, 
  private cartService: CartService,
  private orderService : OrderService,
  private flashMessage: FlashMessagesService,
  private profileService:ProfileService) {   }


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

      let subTotalSum = 0;
      //let subTotal;
      this.cartEntities.forEach(function(entity) {
          subTotalSum += (entity.quantity * entity.product.price);   
      });

      this.cartEntities.forEach(function(entity) {
        entity.subTotal = (entity.product.price * entity.quantity).toFixed(2);
      });


      this.subTotalSum = subTotalSum
      this.couponAmount = ((this.couponDiscount) * subTotalSum).toFixed(2);
      this.totalSum = (subTotalSum - parseFloat(this.couponAmount));
    }


  ngOnInit() {
    this.getProducts();
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.email= profile.user.email;
      this.role = profile.user.role;
    });
      this.getOrderNumber();

      this.authService.getCoupon().subscribe(coupons => {
        this.coupons = coupons;
      });
          this.authService.getUser().subscribe(users => {
        this.users = users;
        console.log(this.users + " 1"); 

      var temp;
      console.log(this.users);
      for(var i = 0; i < this.users.length; i++){
          temp = {label: this.users[i].username, value:this.users[i]};
          this.userDropbox.push(temp);
      }
      });
  }


  sendInvoice()
  {
    if(this.selectedUser != undefined)
    {
      this.user = this.selectedUser;
    }
  // this.cartService.sendInvoice(this.cartEntities, this.user, this.subTotalSum, this.order.orderNumber).subscribe();
      this.profileService.updateSales(this.totalSum).subscribe();
      this.updateInventory();  
      this.storeOrder();  
     this.orderService.updateOrderNumber().subscribe();
     this.router.navigate(['profile']);
     localStorage.removeItem('cart');
    //this.cartService.initCart();
   window.location.reload();
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
    
    
    this.orderService.saveOrder(order,this.user,this.order.orderNumber,this.subTotalSum).subscribe(data =>{
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
    
    this.orderService.getOrderNumber().subscribe(orderNumber=>{
      this.order = orderNumber;
    });
    
  }

    useCoupon(coupon)
    {
      let couponDiscount;
      
           for(var i = 0;i < this.coupons.length;i++)
           {
             if(this.coupons[i].couponCode == coupon && this.coupons[i].isActive == false)
             {
                this.flashMessage.show('Coupon Expired', {
                cssClass: 'alert-danger',
                timeout: 2000});
                break;
             }
            else if(this.coupons[i].couponCode == coupon && this.coupons[i].isActive == true)
            {
              couponDiscount = (this.coupons[i].discount / 100)
              this.couponDiscount = couponDiscount;
              this.calcMax()
                this.flashMessage.show('Coupon Activated', {
                cssClass: 'alert-success',
                timeout: 2000});
              break;
            }
             else if((i + 1)== this.coupons.length && this.coupons[i].couponCode != coupon)
             {
                this.flashMessage.show('Invalid Coupon', {
                cssClass: 'alert-danger',
                timeout: 2000});
             } 
          }

    }
    
}
