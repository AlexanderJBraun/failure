import { Component, OnInit,Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {CouponClass} from '../../../../../models/coupon';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';            //api
import {DataTableModule,SharedModule, SelectItem, Message} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/components/spinner/spinner';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
 
})
export class CouponComponent implements OnInit {
    state: String;
    zip: Number;
    password: String;
    email: String;
    displayDialog: boolean;
    plusCoupon : boolean;
    coupon: CouponClass = new PrimeCoupon();
    coupons: CouponClass[];

  constructor( 
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit() {
           this.authService.getCoupon().subscribe(coupons => {
      this.coupons = coupons;
           });
   }


    showDialogToAdd(){
  
      this.plusCoupon = true;
      this.coupon = new PrimeCoupon();
      this.displayDialog = true;
      
    }

    save(coupon){
      if(this.plusCoupon)
      {
        this.authService.addCoupon(this.coupon)
            .subscribe(data => {

              if(data.success){
                this.flashMessage.show('Coupon added ', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/coupon']);
              } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
              }
        this.ngOnInit();
          });  
      }
      else {
        this.editCoupon(coupon);
      }
        
      this.coupon=null;
      this.displayDialog=false;
    }

    deleteCoupon(id){
      var coupons = this.coupons;

      this.authService.deleteCoupon(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < coupons.length;i++){
            if(coupons[i]._id == id){
              coupons.splice(i,1);
            }
          }
        }
      });
            this.displayDialog=false;
    }

    onRowSelect(event){
      this.plusCoupon = false;
      this.coupon = this.cloneCoupon(event.data);
      this.displayDialog=true;
    }

    cloneCoupon(p: CouponClass): CouponClass{
      let coupon = new PrimeCoupon();
      for(let prop in p){
        coupon[prop] = p[prop];
      }
      return coupon;
    }

    editCoupon(coupon)
    {
      console.log("in edit coupon.ts")
      this.cartService.editCoupon(this.coupon).subscribe(data =>{
        if (data.success == true)
         {
      this.flashMessage.show('Product Saved', {
          cssClass: 'alert-success',
          timeout: 5000});
      } 
      this.authService.getCoupon().subscribe(coupons => {
      this.coupons = coupons;
    });

      });
      
  }




}

class PrimeCoupon implements CouponClass {
  _id: string;
  couponCode: string;
  description: string;
  discount: number;
  isActive: boolean = true;
}