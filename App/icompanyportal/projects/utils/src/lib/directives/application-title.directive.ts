import { Directive, ElementRef, OnInit, Inject } from '@angular/core';
import { APP_TITLE } from '../services/app-title';

@Directive({
  selector: '[libApplicationTitle]'
})
export class ApplicationTitleDirective implements OnInit {
  constructor(private el: ElementRef<HTMLElement>, @Inject(APP_TITLE) private appTitle: string) {}

  ngOnInit() {
    this.el.nativeElement.innerText = this.appTitle;
  }
}
