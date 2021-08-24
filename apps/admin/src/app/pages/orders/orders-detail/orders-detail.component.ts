import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService,ORDER_STATUS } from '@gaurav-enterprises/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit,OnDestroy {
order:Order | any;
orderStatuses = [];
selectedStatus:any;
endSubs$:Subject<any> = new Subject();


  constructor(private orderService:OrderService,
    private messageService: MessageService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this._mapOrderStatus()
    this._getOrder();
  }

  private _getOrder(){
    this.route.params.subscribe(params=>{
      if(params.id){
        this.orderService.getOrder(params.id).pipe(takeUntil(this.endSubs$)).subscribe(order=>{
          console.log(order)
          this.order = order;
          this.selectedStatus = order.status;
        })
      }
    })
  }

  private _mapOrderStatus(){
   this.orderStatuses =  Object.keys(ORDER_STATUS).map((key)=>{
      return {
        id:key,
        name:ORDER_STATUS[key].label
      }
    })
    console.log(this.orderStatuses)
  }

  onStatusChanges(event){
    this.orderService.updateOrder({status:event.value},this.order._id).pipe(takeUntil(this.endSubs$)).subscribe((order)=>{
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:'Order status is updated.'
      });
    },error=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Order status is not updated'});
    })
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
