import { TitleDirective } from './title.directive';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { APP_TITLE } from '../services/app-title';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: '<div [libTitle]="title"></div>'
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
      imports: [RouterTestingModule],
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

  it('should set defined value', () => {
    component.title = 'test';
    fixture.detectChanges();
    expect(title.getTitle()).toBe('test | icompanyportal.com');
  });
});
