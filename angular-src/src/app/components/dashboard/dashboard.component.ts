import { Component, OnInit, Injectable } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ProductClass} from '../../../../../models/Product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {    
   // itemCode: string;
   // itemDescription: string;
  //  price: number;
  //  inStock: number;
    displayDialog: boolean;
    product: ProductClass = new PrimeProduct();
    selectedProduct: ProductClass;
    plusProduct: boolean;
    products: ProductClass[];
    uploadField = document.getElementById("file");

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
        this.authService.getProduct().subscribe(products => {
      this.products = products;
    });
  }


     onChange($event) : void{


    if($event.target.files[0].size < 100000){
      this.readThis($event.target);
    };

       if($event.target.files[0].size > 100000){
       alert("File is too big!");
       $event.target.files[0] = null;
    };
     }
      
      readThis(inputValue: any): void {
      var file:File = inputValue.files[0];
      var myReader:FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.product.image = myReader.result;
      }
      myReader.readAsDataURL(file);
    }

     
    deleteProduct(id){
      var products = this.products;

      this.authService.deleteProduct(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < products.length;i++){
            if(products[i]._id == id){
              products.splice(i,1);
            }
          }
        }
      });
    }
    

    showDialogToAdd(){
      this.plusProduct = true;
      this.product = new PrimeProduct();
      this.displayDialog = true;
    }

    save(){
      //var products = products;
      
      if(this.plusProduct)
      {
        this.authService.addProduct(this.product)
            .subscribe(data => {

              if(data.success){
                this.flashMessage.show('Product added ', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/products']);
              } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
              }
        this.ngOnInit();
          });  
      }
      else {
        this.authService.save(this.product);
        
      }
        
      this.product=null;
      this.displayDialog=false;

      
    }

    delete(id){
      var products = this.products;

      this.authService.deleteProduct(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < products.length;i++){
            if(products[i]._id == id){
              products.splice(i,1);
            }
          }
        }
      });
      this.product=null;
      this.displayDialog=false;
    }

    onRowSelect(event){
      this.plusProduct = false;
      this.product = this.cloneProduct(event.data);
      this.displayDialog=true;
    }

    cloneProduct(p: ProductClass): ProductClass{
      let product = new PrimeProduct();
      for(let prop in p){
        product[prop] = p[prop];
      }
      return product;
    }

    findSelectedProductIndex(): number{
      return this.products.indexOf(this.selectedProduct);
    }
    



}

class PrimeProduct implements ProductClass {
  _id: string;
  itemCode: string;
  itemDescription: string;
  price: number;
  inStock: number;
  image: any;
}