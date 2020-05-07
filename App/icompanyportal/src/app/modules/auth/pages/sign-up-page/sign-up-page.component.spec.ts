import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsExModule } from 'src/app/modules/forms-ex/forms-ex.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputComponent } from 'src/app/modules/forms-ex/components';
import { UsersClient, USERS_API_ENDPOINT } from 'users-api';
import { AUTH_TOKEN_KEY } from 'src/app/modules/auth-utils/services';
import { RouterTestingModule } from '@angular/router/testing';
import { SignUpPageComponent } from './sign-up-page.component';
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component';

describe('SignUpPageComponent', () => {
  let fixture: ComponentFixture<SignUpPageComponent>;
  let component: SignUpPageComponent;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      declarations: [SignUpPageComponent],
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
    fixture = testBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('firstName is required', () => {
    const email = component.form.get('firstName');
    email.markAsDirty();
    expect(email.errors.required).toBe(true);
  });

  it('lastName is required', () => {
    const email = component.form.get('lastName');
    email.markAsDirty();
    expect(email.errors.required).toBe(true);
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
