import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

export const CART_KEY = "Cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$:BehaviorSubject<any> = new BehaviorSubject(this.getCart());

  constructor() { }


  initCartLocalStorage(){
    const cart = this.getCart();
    if(!cart){
      const initialCart = {
        items:[]
      }
      localStorage.setItem(CART_KEY,JSON.stringify(initialCart))
    }
  }

  getCart(){
    let cartJSON = localStorage.getItem('Cart') as string;
    const cart:any = JSON.parse(cartJSON);
    return cart;
  }


  emptyCart(){
    const initialCart = {
      items:[]
    }
    localStorage.setItem(CART_KEY,JSON.stringify(initialCart))
    this.cart$.next(initialCart)
  }


  setCartItem(cartItem:CartItem,updateCartItem?:any):Cart{
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item:any)=>item.productId === cartItem.productId)

    if(cartItemExist){
      cart.items.map((item:any)=>{
        if(item.productId === cartItemExist.productId){

          if(updateCartItem){
            item.quantity = cartItem.quantity
          }else{
            item.quantity = item.quantity + cartItem.quantity;
          }
          return item;
        }
      })
    }else{
      cart.items.push(cartItem);
    }
    localStorage.setItem(CART_KEY,JSON.stringify(cart))
    this.cart$.next(cart)
    return cart;
  }


  deleteCartItem(productId:string){
    const cart = this.getCart();
    const newCart = cart.items.filter((item:any)=>item.productId !== productId);
    cart.items = newCart;
    const cartJson = JSON.stringify(cart);

    console.log(cartJson)
    localStorage.setItem(CART_KEY,cartJson)
    this.cart$.next(cart)
  }
}
