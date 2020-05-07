import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { ResetPasswordRequest } from './reset-password-request';
import { SignInRequest } from './sign-in-request';
import { SignUpRequest } from './sign-up-request';
import { SaveUserRequest } from './save-user-request';
import { ConfirmationTokenType } from './confirmation-token-type';
import { USERS_API_ENDPOINT } from './users-api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class UsersClient {
  constructor(private http: HttpClient, @Inject(USERS_API_ENDPOINT) private endpoint: string) {}

  doesUserExist(userId: number) {
    return this.http.get<boolean>(`${this.endpoint}/${userId}/exists`);
  }

  isEmailUnique(email: string) {
    return this.http.get<boolean>(`${this.endpoint}/${encodeURIComponent(email)}/is-unique`);
  }

  getSignedInUser() {
    return this.http.get<User>(`${this.endpoint}`);
  }

  getUser(userId: number) {
    return this.http.get<User>(`${this.endpoint}/${userId}`);
  }

  getUsers(userIds: string) {
    return this.http.get<User[]>(`${this.endpoint}/users/${userIds}`);
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(`${this.endpoint}/by-email/${encodeURIComponent(email)}`);
  }

  resetPassword(responseUrl: string, request: ResetPasswordRequest) {
    return this.http.put<void>(`${this.endpoint}/reset-password/${encodeURIComponent(responseUrl)}`, request);
  }

  signIn(request: SignInRequest) {
    return this.http.put<void>(`${this.endpoint}/sign-in`, request);
  }

  signUp(responseUrl: string, request: SignUpRequest) {
    return this.http.post<void>(`${this.endpoint}/${encodeURIComponent(responseUrl)}`, request);
  }

  save(responseUrl: string, request: SaveUserRequest) {
    return this.http.put<void>(`${this.endpoint}/${encodeURIComponent(responseUrl)}`, request);
  }

  confirm(type: ConfirmationTokenType, value: string) {
    return this.http.put<void>(`${this.endpoint}/confirm/${type}/${value}`, undefined);
  }

  resendEmailConfirmationToken(responseUrl: string) {
    return this.http.post<void>(`${this.endpoint}/resend-email-confirmation/${encodeURIComponent(responseUrl)}`, undefined);
  }

  delete() {
    return this.http.delete<void>(this.endpoint);
  }
}
