import { Component, OnInit } from '@angular/core';
import { CartService } from '@gaurav-enterprises/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor(private cartService:CartService,private messageService:MessageService) { }

  ngOnInit(): void {

    this.cartService.cart$.subscribe(() => {
      console.log('inside')
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!'
      });
    });

  }

}
