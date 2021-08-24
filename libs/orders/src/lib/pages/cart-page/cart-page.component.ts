import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import {ProductsService} from '@gaurav-enterprises/products';
import { CartItemDetails } from '@gaurav-enterprises/orders';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit,OnDestroy {

  cartItemsDetails:any[] = [];
  cartCount = 0;
  endSubs$:Subject<any> = new Subject()

  constructor(private router:Router,
    private cartService:CartService,
    private productsService:ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  updateCartItemQuantity(event:any,cartItem:any){
    console.log(event);

    this.cartService.setCartItem({
      productId:cartItem.product._id,
      quantity:event.value
    },true)
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart=>{
      this.cartCount = respCart?.items.length ?? 0;
      this.cartItemsDetails = [];
      respCart.items.forEach((cartItem:any)=>{
        this.productsService.getProduct(cartItem.productId).subscribe((respProduct:any)=>{
          console.log(respProduct)
          this.cartItemsDetails.push({
            product:respProduct,
            quantity:cartItem?.quantity
          })
        })
      })
    })
  }

  backToShop(){
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem:any){
    console.log(cartItem)
    this.cartService.deleteCartItem(cartItem.product._id)
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
