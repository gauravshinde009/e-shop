import { Component, OnDestroy, OnInit } from '@angular/core';
import {CategoriesService, Category} from '@gaurav-enterprises/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Location } from '@angular/common'
import { Router } from '@angular/router';


@Component({
  selector: 'admin-categories-list',
  templateUrl:'./categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit,OnDestroy {

  categories:Category[] = [];
  endSubs$:Subject<any> = new Subject();

  constructor(private categoriesService:CategoriesService,
    private messageService: MessageService,
    private location:Location,
    private confirmationService: ConfirmationService,
    private router:Router) { }

  ngOnInit(): void {
    this._getCategories();
  }


  deleteCategory(categoryId:string){

      this.confirmationService.confirm({
          message: 'Do you want to delete this category?',
          header: 'Delete category',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$)).subscribe(response=>{
              this.messageService.add({severity:'success', summary:'Success', detail:'Category is deleted.'});
              this._getCategories();
            },error=>{
              this.messageService.add({severity:'error', summary:'Error', detail:'Category not deleted'});
            })
          },
          reject: (type) => {

          }
      });
  }

  updateCategory(categoryId:string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }


  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(cats=>{
      console.log(cats)
       this.categories = cats;
     })
  }


  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
