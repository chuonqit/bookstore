import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZorroModule } from './../../zorro/zorro.module';
import { SharedModule } from './../../shared/shared.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './category/sub-category/sub-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './shopping-cart/checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './search/search.component';
import { DetailButtonComponent } from './detail/detail-button/detail-button.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailComponent,
    CategoryComponent,
    SubCategoryComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    DetailButtonComponent,
  ],
  imports: [CommonModule, CustomerRoutingModule, SharedModule, ZorroModule],
})
export class CustomerModule {}
