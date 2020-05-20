import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { USERS_API_ENDPOINT } from 'users-api';
import { NOTIFICATIONS_API_ENDPOINT } from 'notifications-api';
import { AuthTokenHelper } from './auth-token-helper';
import { COMPANIES_API_ENDPOINT } from 'companies-api';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authTokenHelper: AuthTokenHelper,
    @Inject(USERS_API_ENDPOINT) private usersEndpoint: string,
    @Inject(NOTIFICATIONS_API_ENDPOINT) private notificationsEndpoint: string,
    @Inject(COMPANIES_API_ENDPOINT) private companiesEndpoint: string
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isInternal(req)) {
      return next.handle(req);
    }

    req = this.setAuthorization(req);

    return next.handle(req).pipe(
      map((event) => {
        this.setToken(event);
        return event;
      })
    );
  }

  isInternal(req: HttpRequest<any>) {
    const endpoints = [this.usersEndpoint, this.notificationsEndpoint, this.companiesEndpoint];
    for (const endpoint of endpoints) {
      if (req.url.startsWith(endpoint)) {
        return true;
      }
    }
    return false;
  }

  setAuthorization(req: HttpRequest<any>): HttpRequest<any> {
    if (this.authTokenHelper.isSet.value) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authTokenHelper.value}`
        }
      });
    }
    return req;
  }

  setToken(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      if (event.headers.has('Authorization')) {
        this.authTokenHelper.value = event.headers.get('Authorization').split(' ')[1];
      }
    }
  }
}
