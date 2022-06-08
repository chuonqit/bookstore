import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';
import { IAuthor } from '../models/Auhor.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  list() {
    return this.api.get<IAuthor[]>('authors');
  }

  list_active() {
    return this.api.get<IAuthor[]>('authors/find-authors-active');
  }

  select(id: string) {
    return this.api.get<IAuthor>(`authors/find-author-by-id/${id}`);
  }

  create(payload: IAuthor) {
    return this.api.post<IAuthor>('authors/create-author', payload);
  }

  update(payload: IAuthor) {
    return this.api.put<IAuthor>(
      `authors/update-author/${payload._id}`,
      payload
    );
  }

  update_status(id: string, status: boolean) {
    return this.api.put<IAuthor>(`authors/update-author-status/${id}`, {
      status,
    });
  }

  delete(id: string) {
    return this.api.delete<IAuthor>(`authors/delete-author/${id}`);
  }

  constructor(private api: ApiService) {}
}
