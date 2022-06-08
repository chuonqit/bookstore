import { Observable, map } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router$: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.currentUser.pipe(
      map((currentUser) => {
        if (!currentUser?.isAdmin) {
          this.router$.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}
