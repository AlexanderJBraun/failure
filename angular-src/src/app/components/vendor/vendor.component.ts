import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {VendorClass} from '../../../../../models/vendor';
import {LocalStorageService} from 'angular-2-local-storage';
import {CartService } from '../../services/cart.service';
import {CartEntity} from './../../../app/cart.entity';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service'
import {SpinnerModule} from 'primeng/components/spinner/spinner';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {    
  //  itemCode: string;
  //  itemDescription: String;
  //  price: Number;
    displayDialog: boolean;
    vendor: VendorClass = new PrimeVendor();
    selectedVendor: VendorClass;
    plusVendor: boolean;
    vendors: VendorClass[];
    quant:any=[];
    show:boolean = false;
    showVendor:boolean = false;

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
        this.authService.getVendor().subscribe(vendors => {
      this.vendors = vendors;
    });
  }

    showDialogToAdd(){
      this.plusVendor = true;
      this.vendor = new PrimeVendor();
      this.displayDialog = true;
    }

    save(){
      var vendors = vendors;
      
      if(this.plusVendor)
      {
        this.authService.addVendor(this.vendor)
            .subscribe(data => {

              if(data.success){
                this.flashMessage.show('Vendor added ', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/vendors']);
              } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
              }
        this.ngOnInit();
          });  
      }
      else {
        this.authService.save(this.vendor);
        
      }
        
      this.vendor=null;
      this.displayDialog=false;

      
    }

    delete(id){
      var vendors = this.vendors;

      this.authService.deleteVendor(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < vendors.length;i++){
            if(vendors[i]._id == id){
              vendors.splice(i,1);
            }
          }
        }
      });
      this.vendor=null;
      this.displayDialog=false;
    }

    onRowSelect(event){
      this.plusVendor = false;
      this.vendor = this.cloneVendor(event.data);
      this.displayDialog=true;
    }

    cloneVendor(p: VendorClass): VendorClass{
      let vendor = new PrimeVendor();
      for(let prop in p){
        vendor[prop] = p[prop];
      }
      return vendor;
    }

    findSelectedVendorIndex(): number{
      return this.vendors.indexOf(this.selectedVendor);
    }
    



}

class PrimeVendor implements VendorClass {
  _id: string;
  itemCode: string;
  itemDescription: string;
  price: number;
}