import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ProfileService {

  constructor(private http:Http) { }


getYearToDateSales()
{
  return this.http.get('http://localhost:3000/profile/getytds').map(res => res.json());
}

updateSales(sales)
{
  let data = {sales};
  console.log(sales); 
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/profile/updateSales',data, {headers:headers});


}
}
