import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, OrderService } from '@gaurav-enterprises/orders';
import { ProductsService } from '@gaurav-enterprises/products';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit,OnDestroy {

  endSubs$: Subject<any> = new Subject();
  totalPrice: number;
  isCheckout = false;

  constructor(private cartService: CartService,
    private productService:ProductsService,
    private router:Router) {
      this.router.url.includes('checkout')? this.isCheckout=true:this.isCheckout = false;
    }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item:any) => {
          this.productService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product:any) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }

  navigateToCheckout(){
    this.router.navigate(['/checkout'])
  }

}
