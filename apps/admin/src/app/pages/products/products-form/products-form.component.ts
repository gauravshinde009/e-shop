import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Product, ProductsService } from '@gaurav-enterprises/products';
import { MessageService } from 'primeng/api';
import {Location} from '@angular/common';
import { timer } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit,OnDestroy {
editMode = false;
form:FormGroup;
isSubmitted = false;
categories = [];
imageDisplay:string | ArrayBuffer;
currentProductId:string;
endSubs$:Subject<any> = new Subject();


  constructor(private formBuilder:FormBuilder,
    private productService:ProductsService,
    private categoryService:CategoriesService,
    private messageService: MessageService,
    private location:Location,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode()
  }


  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return
    }

    let productFormData = new FormData()
    Object.keys(this.ProductForm).map((key)=>{
      console.log(key)
      console.log(this.ProductForm[key].value)
      productFormData.append(key,this.ProductForm[key].value)
    console.log(productFormData.get(key))

    })

    if(this.editMode){
      this._updateProduct(productFormData)
    }else{
      this._addProduct(productFormData)
    }
  }


  navigate(){
    this.location.back();
  }

  get ProductForm(){
    return this.form.controls;
  }

  onImageUpload(event){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image:file})
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = ()=>{
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }


  private _updateProduct(productFormData:FormData){
    console.log(productFormData)
    this.productService.updateProduct(productFormData,this.currentProductId).pipe(takeUntil(this.endSubs$)).subscribe((response)=>{
      console.log(response)
      this.messageService.add({severity:'success', summary:'Success', detail:'Product is updated'});
      timer(1000).toPromise().then(done=>{
        this.location.back();
      })
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Category not updated'});
    })
  }

  private _checkEditMode(){
    this.route.params.subscribe(params=>{
      if(params.id){
        this.editMode = true;
        this.currentProductId = params.id;
        this.productService.getProduct(params.id).pipe(takeUntil(this.endSubs$)).subscribe((product:Product)=>{
          console.log(product)
          this.ProductForm.name.setValue(product.name);
          this.ProductForm.category.setValue(product.category._id);
          this.ProductForm.brand.setValue(product.brand);
          this.ProductForm.price.setValue(+(product.price));
          this.ProductForm.countInStock.setValue(+(product.countInStock));
          this.ProductForm.isFeatured.setValue(product.isFeatured);
          this.ProductForm.description.setValue(product.description);
          this.ProductForm.richDescription.setValue(product.richDescription);
          this.ProductForm.image.setValue(product.image);
          this.ProductForm.image.setValidators([])
          this.ProductForm.image.updateValueAndValidity();
          this.imageDisplay = product.image
        })
      }
    })
  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories=>{
      this.categories = categories;
    })
  }

  private _addProduct(productData:FormData){
    console.log(productData)
    this.productService.createProduct(productData).pipe(takeUntil(this.endSubs$)).subscribe((product)=>{
      console.log(product)
      this.messageService.add({severity:'success', summary:'Success', detail:`${product.name} is created`});
      timer(2000).toPromise().then(()=>{
        this.location.back();
      })
    },()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Product not created'});
    })
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      brand:['',Validators.required],
      price:['',Validators.required],
      category:['',Validators.required],
      countInStock:['',Validators.required],
      description:[''],
      richDescription:[''],
      image:['',Validators.required],
      isFeatured:[false],
    })
  }


  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
