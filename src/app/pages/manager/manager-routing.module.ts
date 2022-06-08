import { AuthorComponent } from './author/author.component';
import { PublisherComponent } from './publisher/publisher.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { CategoryUpdateComponent } from './categories/category-update/category-update.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './../../shared/guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerLayoutComponent } from './../../layout/manager-layout/manager-layout.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { BookUpdateComponent } from './books/book-update/book-update.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: ManagerLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoryListComponent,
      },
      {
        path: 'categories/create-new',
        component: CategoryCreateComponent,
      },
      {
        path: 'categories/update/:id',
        component: CategoryUpdateComponent,
      },
      {
        path: 'books',
        component: BookListComponent,
      },
      {
        path: 'books/create-new',
        component: BookCreateComponent,
      },
      {
        path: 'books/update/:id',
        component: BookUpdateComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/create-new',
        component: UserCreateComponent,
      },
      {
        path: 'users/update/:id',
        component: UserCreateComponent,
      },
      {
        path: 'publisher',
        component: PublisherComponent,
      },
      {
        path: 'author',
        component: AuthorComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AdminGuard],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
