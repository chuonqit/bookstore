import { BehaviorSubject, tap, Observable } from 'rxjs';
import {
  ILogin,
  ILoginResponse,
  IUser,
  IRegister,
  ICartUser,
} from './../models/User.model';
import { ApiService } from './../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null>;
  private cartNumber: BehaviorSubject<number>;
  currentUser: Observable<IUser | null>;
  cartTotal: Observable<number>;

  constructor(private api: ApiService) {
    this.userSubject = new BehaviorSubject<IUser | null>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.currentUser = this.userSubject.asObservable();
    this.cartNumber = new BehaviorSubject<number>(0);
    this.cartTotal = this.cartNumber.asObservable();
  }

  register(payload: IRegister) {
    return this.api.post<IUser>('auth/register', payload);
  }

  add_cart(payload: ICartUser) {
    return this.api
      .post<{ total: number }>('cart/add-to-cart', {
        cart: payload,
      })
      .pipe(
        tap((res) => {
          this.cartNumber.next(res.total);
          console.log(res.total);
        })
      );
  }

  get_cart(user?: string) {
    return this.api.get<ICartUser>(`cart/list-cart/${user}`);
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
