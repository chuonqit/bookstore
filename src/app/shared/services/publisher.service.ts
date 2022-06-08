import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';
import { IPublisher } from '../models/Publisher.model';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  list() {
    return this.api.get<IPublisher[]>('publishers');
  }

  list_active() {
    return this.api.get<IPublisher[]>('publishers/find-publishers-active');
  }

  select(id: string) {
    return this.api.get<IPublisher>(`publishers/find-publisher-by-id/${id}`);
  }

  create(payload: IPublisher) {
    return this.api.post<IPublisher>('publishers/create-publisher', payload);
  }

  update(payload: IPublisher) {
    return this.api.put<IPublisher>(
      `publishers/update-publisher/${payload._id}`,
      payload
    );
  }

  update_status(id: string, status: boolean) {
    return this.api.put<IPublisher>(
      `publishers/update-publisher-status/${id}`,
      {
        status,
      }
    );
  }

  delete(id: string) {
    return this.api.delete<IPublisher>(`publishers/delete-publisher/${id}`);
  }

  constructor(private api: ApiService) {}
}
