import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@gaurav-enterprises/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit,OnDestroy {

  product:any;
  quantity = 1;
  endSubs$:Subject<any> = new Subject();

  constructor(private productService:ProductsService,
    private cartService:CartService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      if(params.productId){
        this._getProduct(params.productId)
      }
    })
  }

  addProductToCart(){
    const cartItem = {
      productId:this.product._id,
      quantity:this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }


  private _getProduct(id:string){
    this.productService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(resProduct=>{
      console.log(resProduct)
      this.product = resProduct;
    })
  }


  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
