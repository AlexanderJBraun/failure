import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {UserClass} from '../../../../../models/User';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';            //api
import {DataTableModule,SharedModule, SelectItem, Message} from 'primeng/primeng';
import {CartService} from '../../services/cart.service';

var roles = require('../profile/role');

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
    detailDialog: boolean;
    user: UserClass = new PrimeUser();
    selectedUser: UserClass;
    plusUser: boolean;
    users: UserClass[];
    roles: SelectItem[];
    states: SelectItem[];
    regions: SelectItem[];
    msgs: Message[]=[];
    items: MenuItem[];
    selectUserEmail:string;
    selectUserAddr:string;
    selectUserCity:string;
    selectUserState:string;
    selectUserZip:string;
    selectUserRole: string;
    role :string;
    disabled: boolean=true;
    text: string;

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private cartService:CartService,
    private router: Router) {
        this.roles=[
          {label: 'User', value:'User'},
          {label: 'Admin', value:'Admin'},
          {label: 'Agent', value:'Agent'}
        ];
       

        this.states=[];
        this.states.push({label:'Alabama',value:'AL'});
        this.states.push({label:'Alaska',value:'AK'});
        this.states.push({label:'Arizona',value:'AZ'});
        this.states.push({label:'Arkansas',value:'AR'});
        this.states.push({label:'California',value:'CA'});
        this.states.push({label:'Colorado',value:'CO'});
        this.states.push({label:'Connecticut',value:'CT'});
        this.states.push({label:'Delaware',value:'DE'});
        this.states.push({label:'Florida',value:'FL'});
        this.states.push({label:'Georgia',value:'GA'});
        this.states.push({label:'Hawaii',value:'HI'});
        this.states.push({label:'Idaho',value:'ID'});
        this.states.push({label:'Illinois',value:'IL'});
        this.states.push({label:'Indiana',value:'IN'});
        this.states.push({label:'Iowa',value:'IA'});
        this.states.push({label:'Kansas',value:'KS'});
        this.states.push({label:'Kentucky',value:'KY'});
        this.states.push({label:'Louisiana',value:'LA'});
        this.states.push({label:'Maine',value:'ME'});
        this.states.push({label:'Maryland',value:'MD'});
        this.states.push({label:'Massachusetts',value:'MA'});
        this.states.push({label:'Michigan',value:'MI'});
        this.states.push({label:'Minnesota',value:'MN'});
        this.states.push({label:'Mississippi',value:'MS'});
        this.states.push({label:'Missouri',value:'MO'});
        this.states.push({label:'Montana',value:'MT'});
        this.states.push({label:'Nebraska',value:'NE'});
        this.states.push({label:'Nevada',value:'NV'});
        this.states.push({label:'New Hampshire',value:'NH'});
        this.states.push({label:'New Jersey',value:'NJ'});
        this.states.push({label:'New Mexico',value:'NM'});
        this.states.push({label:'New York',value:'NY'});
        this.states.push({label:'North Carolina',value:'NC'});
        this.states.push({label:'North Dakota',value:'ND'});
        this.states.push({label:'Ohio',value:'OH'});
        this.states.push({label:'Oklahoma',value:'OK'});
        this.states.push({label:'Oregon',value:'OR'});
        this.states.push({label:'Pennsylvania',value:'PA'});
        this.states.push({label:'Rhode Island',value:'RI'});
        this.states.push({label:'South Carolina',value:'SC'});
        this.states.push({label:'South Dakota',value:'SD'});
        this.states.push({label:'Tennessee',value:'TN'});
        this.states.push({label:'Texas',value:'TX'});
        this.states.push({label:'Utah',value:'UT'});
        this.states.push({label:'Vermont',value:'VT'});
        this.states.push({label:'Virginia',value:'VA'});
        this.states.push({label:'Washington',value:'WA'});
        this.states.push({label:'West Virginia',value:'WV'});
        this.states.push({label:'Wisconsin',value:'WI'});
        this.states.push({label:'Wyoming',value:'WY'});
        this.states.push({label:'District of Columbia',value:'DC'});

        this.regions = [];
        this.regions.push({label: 'All regions', value: null});
        this.regions.push({label: 'South-East', value:'SE'});
        this.regions.push({label: 'Mid-West', value:'MW'});
     }

  ngOnInit() {
        this.authService.getUser().subscribe(users => {
      this.users = users;
    });

    this.items=[
      {label: 'View details', command: (event) => this.viewUser(this.selectedUser)}
     
    ];
     this.role = roles.role1;

     this.disabled = !this.disabled;
     this.detailDialog=false;
    
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
      this.disabled= false;
      document.getElementById("saveUser").setAttribute("disabled", "disabled");
      this.plusUser = true;
      this.user = new PrimeUser();
      this.displayDialog = true;
      console.log(this.disabled);
    }


    save(){
      //var users = users;
      if(this.plusUser)
      {
        
        var emailChecker=this.checkEmail(this.user.email);
        var usernameChecker=this.checkUsername(this.user.username);
              if(emailChecker === true && usernameChecker === true){
        
                                this.authService.addUser(this.user).subscribe(data => {
                                if(data.success){
                              this.flashMessage.show('User registered ', {cssClass: 'alert-success', timeout: 3000});
                              this.router.navigate(['/users']);
                                 this.user=null;
                                 this.displayDialog=false;
                              } else {             
                              
                              }
                              this.ngOnInit();
                                    });          
              } else if(emailChecker === false){
                  this.msgs = [];
                  this.msgs.push({severity: 'error', summary: 'Registration Error', detail:'Invalid email'});
              } else if(usernameChecker === false){
                  this.msgs = [];
                  this.msgs.push({severity: 'error', summary: 'Registration Error', detail:'Duplicate Username'});
              }             
          
          
      }
      else{
        this.editUser(this.user);
      }
        
   
    }

    deleteUser(id){
          if (this.role=="agent" || this.role=="Agent")
      {
        window.alert("Permission Denied")
      }
      else{
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
    }

    onRowSelect(event){

      this.disabled = false;
      if (this.role==="agent" || this.role==="Agent")
      {
        this.disabled= this.disabled;
      }else{
        this.disabled= !this.disabled;
      }


      this.plusUser = false;
      this.user = this.cloneUser(event.data);
      this.displayDialog=true;
      this.disabled = !this.disabled;
      document.getElementById("saveUser").removeAttribute("disabled");
      
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

    checkEmail(email)
    {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  
    checkEmpty(){
      if(this.user.email && this.user.username && this.user.password && this.user.role){
        document.getElementById("saveUser").removeAttribute("disabled"); 
      }
      // console.log(this.user.email);
      //   console.log(this.user.username);
      //   console.log(this.user.password);
      //   console.log(this.user.role);
    }

    checkUsername(username){
          for(var i = 0;i < this.users.length;i++)
           {
             if(this.users[i].username == username)
             {
                return false;
             }
           } 
           return true;
    }

    viewUser(user: UserClass){

      console.log(this.detailDialog);
      if(!this.detailDialog){
        this.detailDialog = true;
        console.log(user.email);
        this.selectUserEmail = user.email; 
        this.selectUserRole = user.role;
        if(user.address == undefined
        && user.city == undefined
        && user.state == undefined
        && user.zip == undefined){
            this.detailDialog = false;
            this.selectUserAddr == null;
            this.selectUserCity == null;
            this.selectUserState == null;
            this.selectUserZip == null;
        }else {
          this.selectUserAddr = user.address;
          this.selectUserCity = user.city;
          this.selectUserState = user.state;
          this.selectUserZip = user.zip.toString();
        }
      }else {
        this.detailDialog=false;
      }
    }
    
    editUser(user){
      
    var emailChecker=this.checkEmail(user.email);
    var usernameChecker = true;

    if (user.username != this.user.username){
      usernameChecker=this.checkUsername(user.username);
    }

      if(emailChecker === true && usernameChecker === true){

            this.cartService.editUser(user).subscribe(data =>{
              if (data.success == true)
              {
                this.flashMessage.show('User Saved', {
                cssClass: 'alert-success',
                timeout: 5000});
              } 
              this.authService.getUser().subscribe(users => {
            this.users = users;
            });
          });
                this.user=null;
                this.displayDialog=false;
        }
          else if(emailChecker === false){
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Registration Error', detail:'Invalid email'});
        } else if(usernameChecker === false){
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Registration Error', detail:'Duplicate Username'});
        }
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