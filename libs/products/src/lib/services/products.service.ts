import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'environments/environment';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }


  getProduct(productId:string):Observable<Product>{
    return this.http.get<Product>(`${environment.apiURL}products/${productId}`)
  }

  getProducts(categoriesFilter?:string[]):Observable<Product[]>{
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories',categoriesFilter.join(','))
    }
    return this.http.get<Product[]>(`${environment.apiURL}products`,{params:params})
  }

  createProduct(product:FormData):Observable<Product>{
    return this.http.post<Product>(environment.apiURL+'products',product);
  }

  deleteProduct(productId:string):Observable<any>{
    return this.http.delete<any>(`${environment.apiURL}products/${productId}`);
  }

  updateProduct(product:FormData,id:string):Observable<Object>{
    console.log(id)
    return this.http.put<Product>(`${environment.apiURL}products/${id}`,product);
  }

  getProductsCount(){
    return this.http.get(`${environment.apiURL}products/get/count`)
  }

  getFeaturedProducts(count:number):Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiURL}products/get/featured/${count}`)
  }

}
