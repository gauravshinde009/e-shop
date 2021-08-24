import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '@gaurav-enterprises/orders';
import { UsersService } from '@gaurav-enterprises/users';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ORDER_STATUS } from '../../order.constants';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {

  countries:any[] = [];
  endSubs$:Subject<any> = new Subject();
  checkoutFormGroup:FormGroup;
  isSubmitted = false;
  orderItems = [];
  userId:any = '6123f96d9288004378a2f90d'

  constructor(private route:Router,
    private usersService:UsersService,
    private formBuilder:FormBuilder,
    private cartService:CartService,
    private orderService:OrderService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initUserForm(){
    this.checkoutFormGroup = this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      street:['',Validators.required],
      apartment:['',Validators.required],
      zip:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
    })
  }

  private _getCartItems(){
    const cart:any = this.cartService.getCart();
    this.orderItems = cart.items.map((item:any)=>{
      return {
        product:item.productId,
        quantity:item.quantity
      }
    })

    console.log(this.orderItems)
  }

  private _getCountries(){
    this.countries = this.usersService.getCountries();
  }

  get checkoutForm(){
    return this.checkoutFormGroup.controls;
  }

  placeOrder(){
    this.isSubmitted = true;
    if(this.checkoutFormGroup.invalid){
      return
    }
    const order:Order = {
      orderItems:this.orderItems,
      shippingAddress1:this.checkoutForm.street.value,
      shippingAddress2:this.checkoutForm.apartment.value,
      city:this.checkoutForm.city.value,
      zip:this.checkoutForm.zip.value,
      country:this.checkoutForm.country.value,
      phone:this.checkoutForm.phone.value,
      status:0,
      user:this.userId,
      dateOrdered:`${Date.now()}`
    }

    this.orderService.createOrder(order).subscribe(()=>{
      //redirect to thank you page
      //to payment page
      this.cartService.emptyCart();
      this.route.navigate(['/success']);
    },error=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Unable to place the order'});
    });
  }

  backToCart(){
    this.route.navigate(['/cart'])
  }

}
