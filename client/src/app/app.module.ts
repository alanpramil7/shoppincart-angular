import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminloginComponent } from './components/auth/admin/adminlogin/adminlogin.component';
import { AdminregisterComponent } from './components/auth/admin/adminregister/adminregister.component';
import { UserregisterComponent } from './components/auth/user/userregister/userregister.component';
import { UserloginComponent } from './components/auth/user/userlogin/userlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';
import { CartpageComponent } from './components/cartpage/cartpage.component';
import { QuantifierComponent } from './components/quantifier/quantifier.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    AdminloginComponent,
    AdminregisterComponent,
    UserregisterComponent,
    UserloginComponent,
    AdminpageComponent,
    UserpageComponent,
    NewproductComponent,
    UpdateproductComponent,
    CartpageComponent,
    QuantifierComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 1000,
    }),
    ToastModule,
  ],
  providers: [ProductService, MessageService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
