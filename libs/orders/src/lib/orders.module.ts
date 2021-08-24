import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';


const routes:Routes = [
  {path:'cart',component:CartPageComponent},
  {path:'checkout',component:CheckoutPageComponent},
  {path:'success',component:ThankYouComponent}
]

@NgModule({
  imports: [CommonModule,BadgeModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports:[CartIconComponent, CartPageComponent]
})
export class OrdersModule {

  constructor(cartService:CartService){
    cartService.initCartLocalStorage();
  }
}
