import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ProductClass} from '../../../../../models/product';
import {LocalStorageService} from 'angular-2-local-storage';
import {CartService } from '../../services/cart.service';
import {CartEntity} from './../../../app/cart.entity';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {VendorService } from '../../services/vendor.service';
import {SpinnerModule} from 'primeng/components/spinner/spinner';
import {UserClass} from '../../../../../models/user';


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
    product: ProductClass = new PrimeProduct();
    selectedProduct: ProductClass;
    plusProduct: boolean;
    products: ProductClass[];
    quant:any=[];
    show:boolean = false;
    showProduct:boolean = true;
    cartEntities : CartEntity[];
    totalSum: string;
    order:any;
    user: Object;
    email: string;

  constructor(    
    private vendorService: VendorService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getOrderNumber();
        this.authService.getProduct().subscribe(products => {
      this.products = products;
    });
    this.getProducts();


    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.email= profile.user.email; 
    });

  
  }


     onChange($event) : void{
    if($event.target.files[0].size < 1048576){
      this.readThis($event.target);
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


    showDialogToAdd(){
      this.plusProduct = true;
      this.product = new PrimeProduct();
      this.displayDialog = true;
    }

    save(){
      var products = products;
      
      if(this.plusProduct)
      {
        this.authService.addProduct(this.product)
            .subscribe(data => {

              if(data.success){
                this.flashMessage.show('Product added ', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/vendor']);
              } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
              }
        //this.ngOnInit();
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
    
updateInventory()
  {
    for(var index in this.cartEntities)
    {
      var pID = this.cartEntities[index].product._id;
      var temp = this.cartEntities[index].product.inStock;
      var add = temp + this.cartEntities[index].quantity;
      console.log(add)
    this.vendorService.addInventory(add,pID).subscribe();
    //console.log(deduct)
    }
  } 


  addCart(product, quant)
  {
    console.log(product._id);
    this.vendorService.getCartEntryByProductId(product._id).then(function(cartEntity: CartEntity){
        
        this.vendorService.addProductToVendor(product, quant);
          this.flashMessage.show(product.itemCode + ' '+'added to your cart', {
          cssClass: 'alert-success',
          timeout: 2000});
         //this.router.navigate(['cart']);
    
    this.ngOnInit();
    }.bind(this));

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
          this.vendorService.saveListOfCartEntities(this.cartEntities);
        }
    }

     calcMax () {

      let totalSum = 0;
      //let subTotal;
      this.cartEntities.forEach(function(entity) {
          totalSum += (entity.quantity * entity.product.vendorPrice);
      });

      this.cartEntities.forEach(function(entity) {   
        entity.subTotal = (entity.product.vendorPrice * entity.quantity).toFixed(2);
      });

      console.log(this.totalSum);
      this.totalSum = totalSum.toFixed(2);

    }

  sendInvoice()
  {

    //this.vendorService.sendVendorInvoice(this.user, this.cartEntities, this.totalSum, this.order.orderNumber).subscribe();
    this.updateInventory();    
    this.storeOrder(); 
    this.vendorService.updateOrderNumber().subscribe();
     this.router.navigate(['profile']);
     localStorage.removeItem('vendor');
    
  }

getProducts() {
        
        this.vendorService.getAllCartEntities().then(function(result) {

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
        this.vendorService.saveListOfCartEntities(this.cartEntities);
    }


  storeOrder()
  {
    console.log(this.cartEntities);
    var order=[];
     
      for(var index in this.cartEntities)
      {
        var product ={
         "name":this.cartEntities[index].product.itemCode,
         "price":this.cartEntities[index].product.vendorPrice,
         "quantity":this.cartEntities[index].quantity,
         "subTotal": this.cartEntities[index].subTotal
        }

        order.push(product);
      }

      console.log(this.order);
    
    
    this.vendorService.saveOrder(order,this.user,this.order.vendorOrderNumber,this.totalSum).subscribe(data =>{
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
    
    this.vendorService.getOrderNumber().subscribe(vendorOrderNumber=>{
      this.order = vendorOrderNumber;
      
      
    })
    console.log( this.order);
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