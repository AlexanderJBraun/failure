import { Component, OnInit,Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

const roles = require('./role');


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
 
})
export class ProfileComponent implements OnInit {

  user:Object;
  role:String;


  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.role= profile.user.role;
      roles.roleType(this.role);
      //console.log(roles.role1);
      //console.log(roles.showNav());
      
    },
    err => {
      console.log(this.role);
      return false;
    });

 

  }

 


}
