import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';
import {DataTableModule,GrowlModule, InputTextModule, DropdownModule, DataGridModule ,DataListModule, InputMaskModule, SharedModule, DialogModule, ButtonModule, PanelModule, SliderModule, SpinnerModule, ContextMenuModule, MenuItem, CheckboxModule} from "../../node_modules/primeng/primeng";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from "./components/cart/cart.component";
import { UsersComponent } from './components/users/users.component';
import { VendorComponent} from './components/vendor/vendor.component';
import { OrdersComponent} from './components/orders/orders.component';
import { CouponComponent } from "./components/coupon/coupon.component";
import { LandingComponent} from './components/landing/landing.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {CartService} from './services/cart.service';
import {OrderService} from './services/order.service';
import {VendorService} from './services/vendor.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import { SumPipe } from './components/cart/sum.pipe';


const appRoutes: Routes =  [
  {path:'home', component: HomeComponent},
  {path:'', component: LandingComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
  {path: 'users', component: UsersComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'vendor', component: VendorComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'orders', component: OrdersComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'coupon', component: CouponComponent,canActivate:[AuthGuard,AdminGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CartComponent,
    UsersComponent,
    LandingComponent,
    SumPipe,
    VendorComponent,
    OrdersComponent,
    CouponComponent
    

  ],
  exports: [
    HomeComponent
  ],

  imports: [
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    DataTableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    PanelModule,
    SliderModule,
    SharedModule,
    DataListModule,
    SpinnerModule,
    ContextMenuModule,
    DropdownModule,
    InputMaskModule,
    GrowlModule,
    DataGridModule,
    BrowserAnimationsModule,
    CheckboxModule
  ],
  providers: 
  [ValidateService, 
  AuthService, 
  AuthGuard,
  AdminGuard,
  CartService,
  VendorService,
  OrderService],
  bootstrap: [AppComponent, ],
})
export class AppModule { }
