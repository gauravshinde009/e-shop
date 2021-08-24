import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {UiModule} from '@gaurav-enterprises/ui';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import {ProductsModule} from '@gaurav-enterprises/products';
import { HttpClientModule } from '@angular/common/http';
import {OrdersModule} from '@gaurav-enterprises/orders';
import { ToastModule } from 'primeng/toast';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';

const appRoutes:Routes = [
  {path:'',component:HomePageComponent},
]

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
    BrowserModule,
    AccordionModule,
    BrowserAnimationsModule,
    ProductsModule,
    HttpClientModule,
    ToastModule,
    UiModule,
    OrdersModule,
    RouterModule.forRoot(appRoutes)],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
