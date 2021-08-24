import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {JwtModule,JWT_OPTIONS} from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';


export const usersRoutes: Route[] = [];

const routes:Routes = [
{
  path:'login',
  component:LoginComponent
}
]
@NgModule({
  imports: [CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    JwtModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  declarations: [
    LoginComponent
  ],
  providers:[
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ]
})
export class UsersModule {}
