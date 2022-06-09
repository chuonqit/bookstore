import { LoginGuard } from './../../shared/guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CategoryComponent } from './category/category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './shopping-cart/checkout/checkout.component';
import { SubCategoryComponent } from './category/sub-category/sub-category.component';
import { CustomerLayoutComponent } from './../../layout/customer-layout/customer-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products/:nameAscii',
        component: DetailComponent,
      },
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: 'categories/:nameAscii',
        component: SubCategoryComponent,
      },
      {
        path: 'shopping-cart',
        canActivate: [LoginGuard],
        component: ShoppingCartComponent,
      },
      {
        path: 'shopping-cart/checkout',
        canActivate: [LoginGuard],
        component: CheckoutComponent,
      },
      {
        path: 'login',
        canActivate: [LoginGuard],
        component: LoginComponent,
      },
      {
        path: 'register',
        canActivate: [LoginGuard],
        component: RegisterComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
