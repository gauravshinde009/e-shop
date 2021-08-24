import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, UsersModule } from "@gaurav-enterprises/users";
import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { OrdersDetailComponent } from "./pages/orders/orders-detail/orders-detail.component";
import { OrdersListComponent } from "./pages/orders/orders-list/orders-list.component";
import { ProductsFormComponent } from "./pages/products/products-form/products-form.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { UserFormComponent } from "./pages/users/user-form/user-form.component";
import { UserListComponent } from "./pages/users/user-list/user-list.component";
import { ShellComponent } from "./shared/shell/shell.component";


const routes:Routes = [
  {path:'',component:ShellComponent,
children:[
  {path:'',component:DashboardComponent},
  {path:'categories',component:CategoriesListComponent,canActivate:[AuthGuard]},
  {path:'categories/form',component:CategoriesFormComponent,canActivate:[AuthGuard]},
  {path:'categories/form/:id',component:CategoriesFormComponent,canActivate:[AuthGuard]},
  {path:'products',component:ProductsListComponent,canActivate:[AuthGuard]},
  {path:'products/form',component:ProductsFormComponent,canActivate:[AuthGuard]},
  {path:'products/form/:id',component:ProductsFormComponent,canActivate:[AuthGuard]},
  {path:'users',component:UserListComponent,canActivate:[AuthGuard]},
  {path:'users/form',component:UserFormComponent,canActivate:[AuthGuard]},
  {path:'users/form/:id',component:UserFormComponent,canActivate:[AuthGuard]},
  {path:'orders',component:OrdersListComponent,canActivate:[AuthGuard]},
  {path:'orders/:id',component:OrdersDetailComponent,canActivate:[AuthGuard]},
]},
{
  path:'**',redirectTo:'',pathMatch:'full'
}
]

@NgModule({
  imports:[
    UsersModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
  ],
  exports:[RouterModule],
  declarations:[],
  providers:[]
})
export class AppRoutingModule{

}
