import { Title, By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CompanyNameDirective } from './company-name.directive';
import { CompanyStore } from '../services/company-store';
import { CompanyUserPermissionType } from 'companies-api';
import { CheckPermissionsDirective } from './check-permissions.directive';

@Component({
  template: '<span *libCheckPermissions="permissions"></span>'
})
class TestComponent {
  permissions: CompanyUserPermissionType | CompanyUserPermissionType[];
}

describe('CheckPermissionsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let store: CompanyStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, CheckPermissionsDirective]
    });

    await TestBed.compileComponents();
    store = TestBed.inject(CompanyStore);
    fixture = TestBed.createComponent(TestComponent);
  });

  it('user = defined | permissions = array & true > content', () => {
    store.user.next({
      companyUserPermissions: [{ type: CompanyUserPermissionType.editSettings, isSet: true }]
    });
    fixture.componentInstance.permissions = [CompanyUserPermissionType.editSettings];
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).toBeTruthy();
  });

  it('user = defined | permissions = single & true > content', () => {
    store.user.next({
      companyUserPermissions: [{ type: CompanyUserPermissionType.editSettings, isSet: true }]
    });
    fixture.componentInstance.permissions = CompanyUserPermissionType.editSettings;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).toBeTruthy();
  });

  it('user = defined | permissions = array & false > no content', () => {
    store.user.next({
      companyUserPermissions: [{ type: CompanyUserPermissionType.editSettings, isSet: false }]
    });
    fixture.componentInstance.permissions = [CompanyUserPermissionType.editSettings];
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).toBeNull();
  });

  it('user = defined | permissions = single & false > no content', () => {
    store.user.next({
      companyUserPermissions: [{ type: CompanyUserPermissionType.editSettings, isSet: false }]
    });
    fixture.componentInstance.permissions = CompanyUserPermissionType.editSettings;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).toBeNull();
  });

  it('user = undefined | permissions = single > no content', () => {
    store.user.next(undefined);
    fixture.componentInstance.permissions = CompanyUserPermissionType.editSettings;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).toBeNull();
  });
});
