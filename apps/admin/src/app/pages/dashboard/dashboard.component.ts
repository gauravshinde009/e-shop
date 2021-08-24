import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '@gaurav-enterprises/orders';
import { ProductsService } from '@gaurav-enterprises/products';
import { UsersService } from '@gaurav-enterprises/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit,OnDestroy {

  orderCount = 0;
  productsCount = 0;
  usersCount = 0;
  totalSales = 0;
  endSubs$:Subject<any> = new Subject();


  constructor(private orderService:OrderService,
    private productsService:ProductsService,
    private userService:UsersService) { }

  ngOnInit(): void {
    this._getOrderCount();
    this._getProductsCount()
    this._getUserCount();
    this._getTotalSales();
  }


  private _getOrderCount(){
    this.orderService.orderCount().pipe(takeUntil(this.endSubs$)).subscribe((data:any)=>{
      console.log(data);
      this.orderCount = data.orderCount;
    })
  }

  private _getProductsCount(){
    this.productsService.getProductsCount().pipe(takeUntil(this.endSubs$)).subscribe((data:any)=>{
      console.log(data)
      this.productsCount = data.productCount;
    })
  }


  private _getUserCount(){
    this.userService.getUsersCount().pipe(takeUntil(this.endSubs$)).subscribe((data:any)=>{
      this.usersCount = data.userCount
    })
  }

  private _getTotalSales(){
    this.orderService.getTotalSalesCount().pipe(takeUntil(this.endSubs$)).subscribe((data:any)=>{
      this.totalSales = data.totalsales;
    })
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
