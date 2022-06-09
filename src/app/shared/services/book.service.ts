import { IBook, IHomeData } from './../models/Books.model';
import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  create(payload: IBook) {
    return this.api.post<IBook>('books/create-book', payload);
  }

  search(keyword: string) {
    return this.api.post<IBook[]>('books/search-books', { keyword });
  }

  list() {
    return this.api.get<IBook[]>('books');
  }

  list_active() {
    return this.api.get<IBook[]>('books/find-books-active');
  }

  list_home() {
    return this.api.get<IHomeData>('books/find-books-home');
  }

  select_id(id: string) {
    return this.api.get<IBook>(`books/find-book-by-id/${id}`);
  }

  select_ascii(ascii: string) {
    return this.api.get<IBook>(`books/find-book-by-ascii/${ascii}`);
  }

  update(payload: IBook) {
    return this.api.put<IBook>(`books/update-book/${payload._id}`, payload);
  }

  delete(id: string) {
    return this.api.delete<IBook>(`books/delete-book/${id}`);
  }

  update_status(id: string, status: boolean) {
    return this.api.put<IBook>(`books/update-status-book/${id}`, {
      status,
    });
  }

  update_featured(id: string, featured: boolean) {
    return this.api.put<IBook>(`books/update-featured-book/${id}`, {
      featured,
    });
  }

  update_pin(id: string, pin: boolean) {
    return this.api.put<IBook>(`books/update-pin-book/${id}`, {
      pin,
    });
  }

  constructor(private api: ApiService) {}
}
