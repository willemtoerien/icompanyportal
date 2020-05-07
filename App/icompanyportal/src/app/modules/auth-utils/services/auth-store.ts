import { Injectable } from '@angular/core';
import { User } from 'users-api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  signedInUser = new BehaviorSubject<User>(undefined);
}
