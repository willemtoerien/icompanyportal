import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthTokenHelper } from './auth-token-helper';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private authTokenHelper: AuthTokenHelper, private router: Router) {}

  canActivate() {
    if (this.authTokenHelper.isSet.value) {
      return this.router.createUrlTree(['/']);
    }
    return !this.authTokenHelper.isSet.value;
  }
}
