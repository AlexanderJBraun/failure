import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  images: any[];


  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) {
       
   
      
      
     }

  ngOnInit() {
    this.images=[]; 
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/1.png', alt:'Description for Image 1', title:'Title 1'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/2.png', alt:'Description for Image 2', title:'Title 2'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/3.png', alt:'Description for Image 3', title:'Title 3'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/4.png', alt:'Description for Image 4', title:'Title 4'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/5.png', alt:'Description for Image 5', title:'Title 5'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/6.png', alt:'Description for Image 6', title:'Title 6'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/7.png', alt:'Description for Image 7', title:'Title 7'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/8.png', alt:'Description for Image 8', title:'Title 8'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/9.png', alt:'Description for Image 9', title:'Title 9'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/img/10.png', alt:'Description for Image 10', title:'Title 10'});
   
  }

}