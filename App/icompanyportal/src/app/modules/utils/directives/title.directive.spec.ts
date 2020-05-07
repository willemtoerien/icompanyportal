import { TitleDirective } from './title.directive';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { APP_TITLE } from '../services/app-title';

@Component({
  template: '<div [appTitle]="title"></div>'
})
class TestComponent {
  title: string;
}

describe('TitleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let title: Title;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      declarations: [TestComponent, TitleDirective],
      providers: [
        Title,
        {
          provide: APP_TITLE,
          useValue: 'icompanyportal.com'
        }
      ]
    });

    title = testBed.inject(Title);
    await testBed.compileComponents();
    fixture = testBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should set undefined value', () => {
    fixture.detectChanges();
    expect(title.getTitle()).toBe('icompanyportal.com');
  });

  it('should set defined value', () => {
    component.title = 'test';
    fixture.detectChanges();
    expect(title.getTitle()).toBe('test | icompanyportal.com');
  });
});
