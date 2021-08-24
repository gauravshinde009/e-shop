import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import {CartService} from '@gaurav-enterprises/orders';
import { CartItem } from 'libs/orders/src/lib/models/cart.model';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {

  @Input()product!: Product;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

  addProductToCart(){
    const cartItem:CartItem = {
      productId:this.product._id,
      quantity:1
    }
    this.cartService.setCartItem(cartItem);
  }

}
