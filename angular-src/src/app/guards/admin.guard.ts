import {Injectable,OnInit} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

const roles = require('../components/profile/role');



@Injectable()
export class AdminGuard implements  OnInit,CanActivate{


  constructor(private authService:AuthService, private router:Router){ }

   

ngOnInit(){

}
 

canActivate(){



if(roles.role1==="Admin" || roles.role1==="admin" || roles.role1 =='Agent' || roles.role1 =='agent' || roles.role1 =='User' || roles.role1 =='user'  )
    {
      
      return true;
      
    } else  
    {
      this.router.navigate(['/profile']);
      return false;
    }
    
  }
  
}

  
