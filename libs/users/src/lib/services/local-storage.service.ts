import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(data:string){
    localStorage.setItem('jwtToken',data)
  }

  getToken():string{
    return localStorage.getItem('jwtToken') || ''
  }

  removeToken(){
    return localStorage.removeItem('jwtToken')
  }
}
