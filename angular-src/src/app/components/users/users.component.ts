import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {UserClass} from '../../../../../models/User';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';            //api
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {    
    username: String;
    firstName: String;
    lastName: String;
    businessName: String;
    phoneNum: Number;
    mobileNum: Number;
    faxNum: Number;
    region: String;
    address: String;
    city: String;
    state: String;
    zip: Number;
    password: String;
    email: String;
    displayDialog: boolean;
    user: UserClass = new PrimeUser();
    selectedUser: UserClass;
    plusUser: boolean;
    users: UserClass[];

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
        this.authService.getUser().subscribe(users => {
      this.users = users;
    });
  }

    

    delete(id){
      var users = this.users;

      this.authService.deleteUser(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < users.length;i++){
            if(users[i]._id == id){
              users.splice(i,1);
            }
          }
        }
      });
    }

    showDialogToAdd(){
      this.plusUser = true;
      this.user = new PrimeUser();
      this.displayDialog = true;
    }


    save(){
      //var users = users;
      if(this.plusUser)
      {
        this.authService.addUser(this.user).subscribe(data => {

          if(data.success){
        this.flashMessage.show('User registered ', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/users']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      
      }
      this.ngOnInit();
            });
      }
      else{
        this.authService.save(this.user);
      }
        
      this.user=null;
      this.displayDialog=false;
    }

    deleteUser(id){
      var users = this.users;

      this.authService.deleteUser(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < users.length;i++){
            if(users[i]._id == id){
              users.splice(i,1);
            }
          }
        }
      });
      this.user=null;
      this.displayDialog=false;
    }

    onRowSelect(event){
      this.plusUser = false;
      this.user = this.cloneUser(event.data);
      this.displayDialog=true;
    }

    cloneUser(u: UserClass): UserClass{
      let user = new PrimeUser();
      for(let prop in u){
        user[prop] = u[prop];
      }
      return user;
    }

    findSelectedUserIndex(): number{
      return this.users.indexOf(this.selectedUser);
    }



}

class PrimeUser implements UserClass {  
_id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  phoneNum: number;
  mobileNum: number;
  faxNum: number;
  region: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  email: string;
  username: string;
  password: string;
  role: string;


}