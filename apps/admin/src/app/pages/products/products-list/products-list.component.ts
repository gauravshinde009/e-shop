import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@gaurav-enterprises/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gaurav-enterprises-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: []
})
export class ProductsListComponent implements OnInit,OnDestroy {
products = [];
endSubs$:Subject<any> = new Subject();


  constructor(private productService:ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router) { }

  ngOnInit(): void {
    this._getProducts()
  }

  deleteProduct(productId:string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).pipe(takeUntil(this.endSubs$)).subscribe(response=>{
          this.messageService.add({severity:'success', summary:'Success', detail:'Product is deleted.'});
          this._getProducts();
        },error=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Product not deleted'});
        })
      },
      reject: (type) => {

      }
  });
  }

  updateProduct(productId:string){
    this.router.navigateByUrl(`products/form/${productId}`)
  }


  private _getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(products=>{
     console.log(products)
      this.products = products;
    })
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
