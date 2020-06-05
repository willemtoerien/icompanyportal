import { TitleDirective } from './title.directive';
import { Title, By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { APP_TITLE } from '../services/app-title';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationTitleDirective } from './application-title.directive';

@Component({
  template: '<div libApplicationTitle></div>'
})
class TestComponent {}

describe('ApplicationTitleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestComponent, ApplicationTitleDirective],
      providers: [
        Title,
        {
          provide: APP_TITLE,
          useValue: 'icompanyportal.com'
        }
      ]
    });

    await testBed.compileComponents();
    fixture = testBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should set inner text', () => {
    fixture.detectChanges();
    const div: HTMLDivElement = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(div.innerText).toBe('icompanyportal.com');
  });
});
