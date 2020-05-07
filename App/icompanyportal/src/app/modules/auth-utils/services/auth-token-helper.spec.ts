import { AuthTokenHelper } from './auth-token-helper';
import { async, TestBed } from '@angular/core/testing';
import { AUTH_TOKEN_KEY } from './auth-token-key';

describe('AuthTokenHelper', () => {
  let helper: AuthTokenHelper;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      providers: [{ provide: AUTH_TOKEN_KEY, useValue: 'testAuthToken' }]
    });

    helper = testBed.inject(AuthTokenHelper);
    helper.autoReload = false;
    localStorage.clear();
  }));

  it('removes from localStorage', () => {
    localStorage.setItem('testAuthToken', '1234');
    helper.value = undefined;
    expect(localStorage.getItem('testAuthToken')).toBeNull();
  });

  it('localStorage set correctly', () => {
    helper.value = '1234';
    expect(localStorage.getItem('testAuthToken')).toBe('1234');
  });
});
