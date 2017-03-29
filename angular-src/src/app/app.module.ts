import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';
import {DataTableModule,SharedModule, DialogModule, ButtonModule, DataListModule, PanelModule} from "../../node_modules/primeng/primeng";


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from "./components/cart/cart.component";
import { UsersComponent } from './components/users/users.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';


const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard,AdminGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'users', component: UsersComponent}
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
    UsersComponent

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
    DialogModule,
    DataListModule,
    PanelModule,
    SharedModule
  ],
  providers: [ValidateService, AuthService, AuthGuard,AdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
