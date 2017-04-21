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
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/test3.jpg', alt:'Description for Image 1', title:'Title 1'});
    this.images.push({source:'https://s3.amazonaws.com/ctres2428.com/images/test3.jpg', alt:'Description for Image 2', title:'Title 2'});
   
  }

}