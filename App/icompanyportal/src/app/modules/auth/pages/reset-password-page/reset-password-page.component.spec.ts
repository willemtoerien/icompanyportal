import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsExModule } from 'src/app/modules/forms-ex/forms-ex.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { USERS_API_ENDPOINT } from 'users-api';
import { AUTH_TOKEN_KEY } from 'src/app/modules/auth-utils/services';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordPageComponent } from './reset-password-page.component';
import { By } from '@angular/platform-browser';

describe('ResetPasswordPageComponent', () => {
  let fixture: ComponentFixture<ResetPasswordPageComponent>;
  let component: ResetPasswordPageComponent;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      declarations: [ResetPasswordPageComponent],
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
    fixture = testBed.createComponent(ResetPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('password is required', () => {
    const email = component.form.get('email');
    email.markAsDirty();
    expect(email.errors.required).toBe(true);
  });

  it('emailSent is displayed', () => {
    component.emailSent = true;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('#email-sent'));
    expect(element).toBeTruthy();
  });
});
