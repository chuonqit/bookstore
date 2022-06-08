import { BehaviorSubject, tap, Observable } from 'rxjs';
import {
  ILogin,
  ILoginResponse,
  IUser,
  IRegister,
} from './../models/User.model';
import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null>;
  currentUser: Observable<IUser | null>;

  constructor(private api: ApiService) {
    this.userSubject = new BehaviorSubject<IUser | null>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.currentUser = this.userSubject.asObservable();
  }

  get currentUserValue(): IUser | null {
    return this.userSubject.value;
  }

  register(payload: IRegister) {
    return this.api.post<IUser>('auth/register', payload);
  }

  login(payload: ILogin) {
    return this.api.post<ILoginResponse>('auth/login', payload).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userSubject.next(response.user);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.currentUser = this.userSubject.asObservable();
  }
}
