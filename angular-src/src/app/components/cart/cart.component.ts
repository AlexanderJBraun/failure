import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart=JSON.parse(localStorage.getItem('my-app.cartItem'));
  

  constructor() { }

  ngOnInit() {
    console.log(this.cart[1]);
  }

}
