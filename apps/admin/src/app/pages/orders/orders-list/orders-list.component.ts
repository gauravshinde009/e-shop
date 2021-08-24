import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Order,ORDER_STATUS} from '@gaurav-enterprises/orders';
import { OrderService} from '@gaurav-enterprises/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-order-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

orders:Order[] = [];
orderStatus = ORDER_STATUS;
endSubs$:Subject<any> = new Subject();


  constructor(private orderService:OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router:Router) { }

  ngOnInit(): void {
    this._getOrders();
  }

  deleteOrder(orderId){
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(response=>{
          this.messageService.add({severity:'success', summary:'Success', detail:'Order is deleted.'});
          this._getOrders();
        },error=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Order not deleted'});
        })
      },
      reject: (type) => {

      }
  });
  }

  showOrder(orderId){
    this.router.navigateByUrl(`orders/${orderId}`)
  }


  private _getOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.endSubs$)).subscribe((orders)=>{
      console.log(orders)
      this.orders = orders;
    })
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
