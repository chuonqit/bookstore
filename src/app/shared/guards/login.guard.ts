import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router$: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authService.currentUser.pipe(
      map((currentUser) => {
        if (!currentUser) {
          this.router$.navigateByUrl('/');
          return false;
        } else if (
          route.routeConfig?.path == 'login' ||
          route.routeConfig?.path == 'register'
        ) {
          this.router$.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}
