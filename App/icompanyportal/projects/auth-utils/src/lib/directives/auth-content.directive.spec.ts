import { AuthContentDirective } from './auth-content.directive';
import { AUTH_TOKEN_KEY } from 'auth-utils';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AuthTokenHelper } from '../services/auth-token-helper';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div *appAuthContent="authContent">Test</div>'
})
class TestComponent {
  authContent = true;
}

describe('AuthContent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let helper: AuthTokenHelper;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      declarations: [AuthContentDirective, TestComponent],
      providers: [
        {
          provide: AUTH_TOKEN_KEY,
          useValue: 'testAuthToken'
        }
      ]
    });

    await testBed.compileComponents();
    helper = testBed.inject(AuthTokenHelper);
    helper.autoReload = false;
    fixture = testBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('authContent = true | isSet = false > no content', () => {
    component.authContent = true;
    helper.value = undefined;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('div'));
    expect(element).toBeFalsy();
  });

  it('authContent = true | isSet = true > content', () => {
    component.authContent = true;
    helper.value = '1234';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('div'));
    expect(element).toBeTruthy();
  });

  it('authContent = false | isSet = false > content', () => {
    component.authContent = false;
    helper.value = undefined;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('div'));
    expect(element).toBeTruthy();
  });

  it('authContent = false | isSet = true > no content', () => {
    component.authContent = false;
    helper.value = '1234';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('div'));
    expect(element).toBeFalsy();
  });
});
