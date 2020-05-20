import { AuthTokenHelper } from './auth-token-helper';
import { async, TestBed } from '@angular/core/testing';
import { USERS_API_ENDPOINT, UsersClient } from 'users-api';
import { AUTH_TOKEN_KEY } from './auth-token-key';
import { AuthStore } from './auth-store';
import { SignedInUserResolver } from './signed-in-user.resolver';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SignedInUserResolver', () => {
  let helper: AuthTokenHelper;
  let store: AuthStore;
  let resolver: SignedInUserResolver;
  let mock: HttpTestingController;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AUTH_TOKEN_KEY, useValue: 'testAuthToken' },
        {
          provide: USERS_API_ENDPOINT,
          useValue: ''
        }
      ]
    });

    helper = testBed.inject(AuthTokenHelper);
    store = testBed.inject(AuthStore);
    mock = TestBed.inject(HttpTestingController);
    resolver = testBed.inject(SignedInUserResolver);
    helper.autoReload = false;
    localStorage.clear();
  }));

  it('undefined is returned if no token is present', () => {
    resolver.resolve().subscribe();
    expect(store.signedInUser.value).toBeUndefined();
  });

  it('return signed in user', () => {
    store.signedInUser.next(undefined);
    helper.value = '1234';
    resolver.resolve().subscribe();
    const req = mock.expectOne('');
    expect(req.request.method).toBe('GET');
    req.flush({
      userId: 1
    });

    expect(store.signedInUser.value).toBeTruthy();
  });
});
