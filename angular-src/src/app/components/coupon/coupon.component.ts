import { Component, OnInit,Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {CouponClass} from '../../../../../models/coupon';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';            //api
import {DataTableModule,SharedModule, SelectItem, Message} from 'primeng/primeng';

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
    test: boolean = false;

  constructor( 
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() { }


    showDialogToAdd(){
  
      this.plusCoupon = true;
      this.coupon = new PrimeCoupon();
      this.displayDialog = true;
      
    }

}

class PrimeCoupon implements CouponClass {
  couponCode: string;
  description: string;
  discount: number;
  isActive: boolean;
}