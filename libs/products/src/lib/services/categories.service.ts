import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }


  getCategory(categoryId:string):Observable<Category>{
    return this.http.get<Category>(`${environment.apiURL}categories/${categoryId}`)
  }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiURL}categories`)
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(environment.apiURL+'categories',category);
  }

  deleteCategory(categoryId:string):Observable<any>{
    return this.http.delete<any>(`${environment.apiURL}categories/${categoryId}`);
  }

  updateCategory(category:Category):Observable<Object>{
    return this.http.put<Category>(`${environment.apiURL}categories/${category._id}`,category);
  }

}
