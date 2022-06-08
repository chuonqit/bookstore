import { ICategory, IBookCategory } from './../models/Category.model';
import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  list() {
    return this.api.get<ICategory[]>('categories');
  }

  list_active() {
    return this.api.get<ICategory[]>('categories/find-categories-active');
  }

  select_id(id: string) {
    return this.api.get<ICategory>(`categories/find-category-by-id/${id}`);
  }

  select_ascii(ascii: string) {
    return this.api.get<ICategory>(
      `categories/find-category-by-ascii/${ascii}`
    );
  }

  books_by_ascii(ascii: string) {
    return this.api.get<IBookCategory>(`categories/find-all-books/${ascii}`);
  }

  create(payload: ICategory) {
    return this.api.post<ICategory>('categories/create-category', payload);
  }

  update(payload: ICategory) {
    return this.api.put<ICategory>(
      `categories/update-category/${payload._id}`,
      payload
    );
  }

  delete(id: string) {
    return this.api.delete<ICategory>(`categories/delete-category/${id}`);
  }

  update_status(id: string, status: boolean) {
    return this.api.put<ICategory>(`categories/update-status-category/${id}`, {
      status,
    });
  }

  constructor(private api: ApiService) {}
}
