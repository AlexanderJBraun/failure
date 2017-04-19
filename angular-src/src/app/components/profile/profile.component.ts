import { Component, OnInit,Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

var roles = require('./role');


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  
 
})
export class ProfileComponent implements OnInit {

  user:Object;
  role:String;
  email:String;


  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.role= profile.user.role;
      this.email= profile.user.email;
      roles.roleType(this.role);
      roles.setEmail(this.email);
      console.log(roles.role1);
      console.log(roles.email1);

      //console.log(roles.showNav());
      
    },
    err => {
      console.log(this.role);
      return false;
    });

 

  }

  toProduct()
  {
    this.router.navigateByUrl('/dashboard');
  }

 


}
