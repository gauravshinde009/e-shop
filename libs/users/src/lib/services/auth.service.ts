import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLAuth = environment.apiURL+'users';


  constructor(private http:HttpClient,private token:LocalStorageService,private router:Router) { }

  login(email:string,password:string):Observable<User>{
    return this.http.post<User>(`${this.apiURLAuth}/login`,{email:email,password:password})
  }

  logout(){
    this.token.removeToken();
    this.router.navigate(['/login'])
  }

}
