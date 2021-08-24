import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@gaurav-enterprises/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gaurav-enterprises-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {
  users:User[] = [];
  endSubs$:Subject<any> = new Subject();


  constructor(
    private messageService: MessageService,
    private userService:UsersService,
    private confirmationService: ConfirmationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId){
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete user',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).pipe(takeUntil(this.endSubs$)).subscribe(response=>{
          this.messageService.add({severity:'success', summary:'Success', detail:'User is deleted.'});
          this._getUsers();
        },error=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'User not deleted'});
        })
      },
      reject: (type) => {

      }
  });
  }

  updateUser(userId){
    this.router.navigateByUrl(`users/form/${userId}`)
  }


  private _getUsers(){
    this.userService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe(users=>{
      console.log(users)
       this.users = users;
     })
  }

  getCountryName(countryKey: string) {
    if(countryKey){
     return this.userService.getCountry(countryKey);
    }else{
      return null;
    }
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
