import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@env/environment';
import { User } from '../models/user.model';
import * as countriesLib from 'i18n-iso-countries';

declare const require:any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));

   }


  getUser(userId:string):Observable<User>{
    return this.http.get<User>(`${environment.apiURL}users/${userId}`)
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiURL}users`)
  }

  createUser(user:User):Observable<User>{
    return this.http.post<User>(environment.apiURL+'users',user);
  }

  deleteUser(userId:string):Observable<any>{
    return this.http.delete<any>(`${environment.apiURL}users/${userId}`);
  }

  updateUser(user:User):Observable<Object>{
    return this.http.put<User>(`${environment.apiURL}users/${user._id}`,user);
  }

  getCountry(countryKey: string) {
    return countriesLib.getName(countryKey, 'en');
  }

  getCountries(){
    return Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry=>{
      return {
        id:entry[0],
        name:entry[1]
      }
    })
  }

  getUsersCount(){
    return this.http.get(`${environment.apiURL}users/get/count`)
  }

}
