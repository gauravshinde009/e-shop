import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@gaurav-enterprises/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import {Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: []
})
export class CategoriesFormComponent implements OnInit {

  form:FormGroup;
  isSubmitted:boolean = false;
  editMode = false;
  currentCategoryId:string = null;
  endSubs$:Subject<any> = new Subject();

  constructor(private formBuilder:FormBuilder,
    private categoriesService:CategoriesService,
    private messageService: MessageService,
    private location:Location,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      icon:['',Validators.required],
      color:['#fff',Validators.required]
    })

    this._checkEditMode();
  }

  get CategoryForm(){
    return this.form.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return
    }
    const category:Category = {
      _id:this.currentCategoryId,
      name:this.CategoryForm.name.value,
      icon:this.CategoryForm.icon.value,
      color:this.CategoryForm.color.value
    }

    if(this.editMode){
      this.__updateCategory(category)
    }else{
      this._addCategory(category)
    }
  }

  private _checkEditMode(){
    this.route.params.subscribe(params=>{
      if(params.id){
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).pipe(takeUntil(this.endSubs$)).subscribe(category=>{
          console.log(category)
          this.CategoryForm.name.setValue(category.name)
          this.CategoryForm.icon.setValue(category.icon)
          this.CategoryForm.color.setValue(category.color)
        })
      }
    })
  }

  navigate(){
    this.location.back();
  }

private __updateCategory(category:Category){
  this.categoriesService.updateCategory(category).pipe(takeUntil(this.endSubs$)).subscribe((response)=>{
    console.log(response)
    this.messageService.add({severity:'success', summary:'Success', detail:'Category is updated'});
    timer(1000).toPromise().then(done=>{
      this.location.back();
    })
  },()=>{
    this.messageService.add({severity:'error', summary:'Error', detail:'Category not updated'});
  })
}

private _addCategory(category:Category){
  this.categoriesService.createCategory(category).pipe(takeUntil(this.endSubs$)).subscribe((category)=>{
    console.log(category)
    this.messageService.add({severity:'success', summary:'Success', detail:`${category.name} is created`});
    timer(2000).toPromise().then(()=>{
      this.location.back();
    })
  },()=>{
    this.messageService.add({severity:'error', summary:'Error', detail:'Category not created'});
  })
}

ngOnDestroy(){
  this.endSubs$.next();
  this.endSubs$.complete();
}
}
