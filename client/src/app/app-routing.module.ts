import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminregisterComponent } from './components/auth/admin/adminregister/adminregister.component';
import { AdminloginComponent } from './components/auth/admin/adminlogin/adminlogin.component';
import { UserloginComponent } from './components/auth/user/userlogin/userlogin.component';
import { UserregisterComponent } from './components/auth/user/userregister/userregister.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';
import { CartpageComponent } from './components/cartpage/cartpage.component';

const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' }, //default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/admin', component: AdminregisterComponent },
  { path: 'login/admin', component: AdminloginComponent },
  { path: 'login/user', component: UserloginComponent },
  { path: 'register/user', component: UserregisterComponent },
  { path: 'adminpage', component: AdminpageComponent },
  { path: 'userpage', component: UserpageComponent },
  { path: 'newproduct', component: NewproductComponent },
  { path: 'update/:productId', component: UpdateproductComponent },
  { path: 'cartpage', component: CartpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
