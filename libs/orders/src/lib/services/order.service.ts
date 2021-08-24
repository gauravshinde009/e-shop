import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getOrder(orderId:string):Observable<Order>{
    return this.http.get<Order>(`${environment.apiURL}orders/${orderId}`)
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.apiURL}orders`)
  }

  createOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(environment.apiURL+'orders',order);
  }

  deleteOrder(orderId:string):Observable<any>{
    return this.http.delete<any>(`${environment.apiURL}orders/${orderId}`);
  }

  updateOrder(status:{status:string},orderId:string):Observable<Object>{
    return this.http.put<Order>(`${environment.apiURL}orders/${orderId}`,status);
  }

  orderCount(){
    return this.http.get(`${environment.apiURL}orders/get/count`);
  }

  getTotalSalesCount(){
    return this.http.get(`${environment.apiURL}orders/get/totalsales`);
  }
}
