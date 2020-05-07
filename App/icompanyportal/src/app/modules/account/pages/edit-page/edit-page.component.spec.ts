import { AuthStore, AUTH_TOKEN_KEY } from 'src/app/modules/auth-utils/services';
import { EditPageComponent } from './edit-page.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { Title, By } from '@angular/platform-browser';
import { TitleDirective } from 'utils';
import { USERS_API_ENDPOINT } from 'users-api';
import { UserStatus } from 'src/app/services/api-clients/users-api/user-status';

describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;
  let authStore: AuthStore;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormBuilder,
        Title,
        TitleDirective,
        {
          provide: USERS_API_ENDPOINT,
          useValue: ''
        },
        {
          provide: AUTH_TOKEN_KEY,
          useValue: ''
        }
      ],
      declarations: [EditPageComponent]
    });

    authStore = testBed.inject(AuthStore);
    authStore.signedInUser.next({
      userId: 1,
      status: UserStatus.pendingEmailConfirmation
    });
    await testBed.compileComponents();
    fixture = TestBed.createComponent(EditPageComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saved notified', () => {
    let element = fixture.debugElement.query(By.css('#saved'));
    expect(element).toBeFalsy();
    fixture.componentInstance.isSaved = true;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('#saved'));
    expect(element).toBeTruthy();
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

  it('passwords match', () => {
    fixture.detectChanges();
    const email = component.form.get('password');
    const confirm = component.form.get('confirmPassword');
    email.setValue('1234');
    confirm.setValue('abcd');
    expect(email.errors.unmatched).toBeTruthy();
    expect(confirm.errors.unmatched).toBeTruthy();
  });

  it('email unconfirmed', () => {
    fixture.detectChanges();
    const confirmed = fixture.debugElement.query(By.css('#confirmed'));
    const unconfirmed = fixture.debugElement.query(By.css('#unconfirmed'));
    expect(unconfirmed).toBeTruthy();
    expect(confirmed).toBeFalsy();
  });

  it('email confirmed', () => {
    authStore.signedInUser.next({
      userId: 1,
      status: UserStatus.active
    });
    fixture.detectChanges();
    const confirmed = fixture.debugElement.query(By.css('#confirmed'));
    const unconfirmed = fixture.debugElement.query(By.css('#unconfirmed'));
    expect(unconfirmed).toBeFalsy();
    expect(confirmed).toBeTruthy();
  });
});
