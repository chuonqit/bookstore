import { SharedModule } from './../../shared/shared.module';
import { ZorroModule } from './../../zorro/zorro.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryUpdateComponent } from './categories/category-update/category-update.component';
import { BookUpdateComponent } from './books/book-update/book-update.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { AuthorComponent } from './author/author.component';
import { PublisherComponent } from './publisher/publisher.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    BookUpdateComponent,
    BookCreateComponent,
    BookListComponent,
    AuthorComponent,
    PublisherComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
  ],
  imports: [CommonModule, ManagerRoutingModule, ZorroModule, SharedModule],
})
export class ManagerModule {}
