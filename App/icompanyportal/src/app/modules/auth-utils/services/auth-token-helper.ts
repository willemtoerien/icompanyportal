import { BehaviorSubject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { AUTH_TOKEN_KEY } from './auth-token-key';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenHelper {
  autoReload = true;

  isSet = new BehaviorSubject<boolean>(!!localStorage.getItem(this.key));

  constructor(@Inject(AUTH_TOKEN_KEY) private key: string) {}

  get value() {
    return localStorage.getItem(this.key);
  }

  set value(val: string) {
    if (val === this.value) {
      return;
    }
    if (!val) {
      localStorage.removeItem(this.key);
      if (this.autoReload) {
        location.reload();
      }
    } else {
      localStorage.setItem(this.key, val);
    }
    this.isSet.next(!!val);
  }
}
