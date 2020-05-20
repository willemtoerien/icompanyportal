import { AuthTokenHelper } from './auth-token-helper';
import { AuthInterceptor } from './auth.interceptor';
import { async, TestBed } from '@angular/core/testing';
import { COMPANIES_API_ENDPOINT } from 'companies-api';
import { NOTIFICATIONS_API_ENDPOINT } from 'notifications-api';
import { USERS_API_ENDPOINT } from 'users-api';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AUTH_TOKEN_KEY } from './auth-token-key';

describe('AuthInterceptor', () => {
  let helper: AuthTokenHelper;
  let interceptor: AuthInterceptor;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      providers: [
        { provide: AUTH_TOKEN_KEY, useValue: 'testAuthToken' },
        {
          provide: COMPANIES_API_ENDPOINT,
          useValue: 'companies'
        },
        {
          provide: NOTIFICATIONS_API_ENDPOINT,
          useValue: 'notifications'
        },
        {
          provide: USERS_API_ENDPOINT,
          useValue: 'users'
        }
      ]
    });

    helper = testBed.inject(AuthTokenHelper);
    helper.autoReload = false;
    interceptor = testBed.inject(AuthInterceptor);
    localStorage.clear();
  }));

  it('only icompany portal api', () => {
    let result = interceptor.isInternal(new HttpRequest('GET', 'test'));
    expect(result).toBeFalsy();
    result = interceptor.isInternal(new HttpRequest('GET', 'companies'));
    expect(result).toBeTruthy();
  });

  it('auth header is set', () => {
    helper.value = '1234';
    const req = interceptor.setAuthorization(new HttpRequest<any>('GET', 'companies'));
    expect(req.headers.has('Authorization')).toBeTrue();
    expect(req.headers.get('Authorization')).toBe('Bearer 1234');
  });

  it('token is set', () => {
    const res = new HttpResponse({
      headers: new HttpHeaders({
        Authorization: 'Bearer 1234'
      })
    });
    interceptor.setToken(res);
    expect(helper.value).toBe('1234');
  });
});
