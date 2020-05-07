import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInPageComponent } from './sign-in-page.component';
import { CommonModule } from '@angular/common';
import { FormsExModule } from 'src/app/modules/forms-ex/forms-ex.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputComponent } from 'src/app/modules/forms-ex/components';
import { UsersClient, USERS_API_ENDPOINT } from 'users-api';
import { AUTH_TOKEN_KEY } from 'src/app/modules/auth-utils/services';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignInPageComponent', () => {
  let fixture: ComponentFixture<SignInPageComponent>;
  let component: SignInPageComponent;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      declarations: [SignInPageComponent],
      imports: [CommonModule, FormsExModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: USERS_API_ENDPOINT,
          useValue: ''
        },
        {
          provide: AUTH_TOKEN_KEY,
          useValue: ''
        }
      ]
    });

    await testBed.compileComponents();
    fixture = testBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('email is required', () => {
    const email = component.form.get('email');
    email.markAsDirty();
    expect(email.errors.required).toBe(true);
  });

  it('email is valid', () => {
    const email = component.form.get('email');
    email.setValue('one');
    email.markAsDirty();
    expect(email.errors.email).toBe(true);
  });

  it('password is required', () => {
    const email = component.form.get('password');
    email.markAsDirty();
    expect(email.errors.required).toBe(true);
  });
});
