import { Title, By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CompanyNameDirective } from './company-name.directive';
import { CompanyStore } from '../services/company-store';

@Component({
  template: '<span [libCompanyName]></span>'
})
class TestComponent {}

describe('CompanyNameDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let store: CompanyStore;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      declarations: [TestComponent, CompanyNameDirective],
      providers: []
    });

    store = testBed.inject(CompanyStore);
    await testBed.compileComponents();
    fixture = testBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('company name will be set', () => {
    fixture.detectChanges();
    let span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.innerText).toBeFalsy();
    store.company.next({
      name: 'Name1'
    });
    fixture.detectChanges();
    span = fixture.debugElement.query(By.css('span'));
    expect(span.nativeElement.innerText).toBe('Name1');
  });
});
