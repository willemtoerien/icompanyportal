import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsExModule } from 'src/app/modules/forms-ex/forms-ex.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InputComponent } from 'src/app/modules/forms-ex/components';
import { UsersClient, USERS_API_ENDPOINT } from 'users-api';
import { AUTH_TOKEN_KEY } from 'src/app/modules/auth-utils/services';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmPageComponent } from './confirm-page.component';
import { By } from '@angular/platform-browser';

describe('ConfirmPageComponent', () => {
  let fixture: ComponentFixture<ConfirmPageComponent>;
  let component: ConfirmPageComponent;
  let mock: HttpTestingController;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      declarations: [ConfirmPageComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
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

    mock = testBed.inject(HttpTestingController);
    await testBed.compileComponents();
    fixture = testBed.createComponent(ConfirmPageComponent);
    component = fixture.componentInstance;
  });

  it('invalid token', () => {
    component.invalid = true;
    fixture.detectChanges();
    const invalid = fixture.debugElement.query(By.css('#is-invalid'));
    expect(invalid).toBeTruthy();
    const busy = fixture.debugElement.query(By.css('#is-busy'));
    expect(busy).toBeFalsy();
  });

  it('busy', () => {
    fixture.detectChanges();
    const invalid = fixture.debugElement.query(By.css('#is-invalid'));
    expect(invalid).toBeFalsy();
    const busy = fixture.debugElement.query(By.css('#is-busy'));
    expect(busy).toBeTruthy();
  });
});
