import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@gaurav-enterprises/users';
import { MessageService } from 'primeng/api';
import {Location } from '@angular/common'
import { timer } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gaurav-enterprises-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit,OnDestroy {

  form:FormGroup;
  isSubmitted:boolean = false;
  editMode = false;
  currentUserId:string = null;
  countries = [];
  endSubs$:Subject<any> = new Subject();


  constructor(
    private formBuilder:FormBuilder,
    private usersService:UsersService,
    private messageService: MessageService,
    private location:Location,
    private userService:UsersService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._checkEditMode();
  }

  private _initUserForm(){
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      password:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      isAdmin:['',Validators.required],
      street:['',Validators.required],
      apartment:['',Validators.required],
      zip:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
    })
  }

  get UserForm(){
    return this.form.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return
    }
    const user:User = {
      _id:this.currentUserId,
      name:this.UserForm.name.value,
      email:this.UserForm.email.value,
      password:this.UserForm.password.value,
      phone:this.UserForm.phone.value,
      isAdmin:this.UserForm.isAdmin.value,
      street:this.UserForm.street.value,
      apartment:this.UserForm.apartment.value,
      zip:this.UserForm.zip.value,
      city:this.UserForm.city.value,
      country:this.UserForm.country.value,
    }

    if(this.editMode){
      this.__updateUser(user)
    }else{
      this._addUser(user)
    }
  }

  private _checkEditMode(){
    this.route.params.subscribe(params=>{
      if(params.id){
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).pipe(takeUntil(this.endSubs$)).subscribe(user=>{
          // console.log(user)
          this.UserForm.name.setValue(user.name)
          this.UserForm.password.setValue(user.password)
          this.UserForm.email.setValue(user.email)
          this.UserForm.phone.setValue(user.phone)
          this.UserForm.token.setValue(user.token)
          this.UserForm.isAdmin.setValue(user.isAdmin)
          this.UserForm.street.setValue(user.street)
          this.UserForm.apartment.setValue(user.apartment)
          this.UserForm.zip.setValue(user.zip)
          this.UserForm.city.setValue(user.city)
          this.UserForm.country.setValue(user.country)

          this.UserForm.password.setValidators([])
          this.UserForm.password.updateValueAndValidity();
        })
      }
    })
  }

  navigate(){
    this.location.back();
  }

private __updateUser(user:User){
  this.usersService.updateUser(user).pipe(takeUntil(this.endSubs$)).subscribe((response)=>{
    console.log(response)
    this.messageService.add({severity:'success', summary:'Success', detail:'User is updated'});
    timer(1000).toPromise().then(done=>{
      this.location.back();
    })
  },()=>{
    this.messageService.add({severity:'error', summary:'Error', detail:'User not updated'});
  })
}

private _addUser(user:User){
  this.usersService.createUser(user).pipe(takeUntil(this.endSubs$)).subscribe((user)=>{
    console.log(user)
    this.messageService.add({severity:'success', summary:'Success', detail:`${user.name} is created`});
    timer(2000).toPromise().then(()=>{
      this.location.back();
    })
  },()=>{
    this.messageService.add({severity:'error', summary:'Error', detail:'User not created'});
  })
}

private _getCountries(){
  this.countries = this.userService.getCountries();
}

ngOnDestroy(){
  this.endSubs$.next();
  this.endSubs$.complete();
}

}
