import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User, UsersClient } from 'users-api';
import { AuthStore } from './auth-store';
import { AuthTokenHelper } from './auth-token-helper';

@Injectable({
  providedIn: 'root'
})
export class SignedInUserResolver implements Resolve<User> {
  constructor(private authTokenHelper: AuthTokenHelper, private store: AuthStore, private client: UsersClient) {}

  resolve(): Observable<User> {
    if (!this.authTokenHelper.isSet.value) {
      return of(undefined);
    }

    if (this.store.signedInUser.value) {
      return of(this.store.signedInUser.value);
    }

    return this.client.getSignedInUser().pipe(
      tap((user) => {
        this.store.signedInUser.next(user);
        // undefined is returned if the user is not signed in.
        if (!user) {
          this.authTokenHelper.value = undefined;
        }
      })
    );
  }
}
