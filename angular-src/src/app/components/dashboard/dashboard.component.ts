import { Component, OnInit, Injectable } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ProductClass} from '../../../../../models/Product';
import {CartService } from '../../services/cart.service';

var roles = require('../profile/role');

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
    role :string;
    text:boolean;
    productDate: Date;
    uploadedFiles: any;

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router,
    private cartService:CartService  ) { }

  ngOnInit() {
        this.authService.getProduct().subscribe(products => {
      this.products = products;
    });

      this.role = roles.role1;
      this.productDate = new Date();
  }

  
     onChange($event) : void{
    if($event.target.files[0].size < 1048576){
      this.readThis($event.target);
      this.uploadedFiles.push($event.file);
    };

       if($event.target.files[0].size > 1048576){
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

      if (this.role=="agent" || this.role=="Agent")
      {
         window.alert("Permission Denied")
      }
      else{
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
    }
    

    showDialogToAdd(){
      this.text=false;

      this.plusProduct = true;
      this.product = new PrimeProduct();
      this.displayDialog = true;
    }

    save(product){
      //var products = products;
      
      if(this.plusProduct)
      {
        console.log("in new product");
        this.authService.addProduct(this.product)
            .subscribe(data => {

              if(data.success){
                this.flashMessage.show('Product added ', {cssClass: 'alert-success', timeout: 3000});
               
              } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
              }
        this.ngOnInit();
          });  
      }
      else {
         
        this.editProduct(product);
   

      }
      
   
      this.product=null;
      this.displayDialog=false;
     
      
    }

    delete(id){


       if (this.role=="agent" || this.role=="Agent")
      {
       window.alert('permission denied');

      }
      else
      {
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
    }

    onRowSelect(event){

       if (this.role=="agent" || this.role=="Agent")
      {
        this.text=true;
        document.getElementById('itemCode').setAttribute("disabled","true");
        document.getElementById('description').setAttribute("disabled","true");
        document.getElementById('vendorPrice').setAttribute("disabled","true");
        document.getElementById('inStock').setAttribute("disabled","true");
        document.getElementById('file').setAttribute("disabled","true");
      

      }
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
    

    editProduct(product)
    {
   
      this.cartService.editProduct(product).subscribe(data =>{
        if (data.success == true)
         {
      this.flashMessage.show('Product Saved', {
          cssClass: 'alert-success',
          timeout: 5000});
      } 
              this.authService.getProduct().subscribe(products => {
      this.products = products;
    });

      });
      
  }



}

class PrimeProduct implements ProductClass {
  _id: string;
  itemCode: string;
  itemDescription: string;
  price: number;
  inStock: number;
  image: any;
  vendorPrice: number;
}