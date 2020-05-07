import { Directive, Input, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APP_TITLE } from '../services/app-title';

@Directive({
  selector: '[appTitle]'
})
export class TitleDirective implements OnInit {
  @Input()
  appTitle: string;

  constructor(private title: Title, @Inject(APP_TITLE) private applicationTitle: string) {}

  ngOnInit() {
    let titleToSet = this.applicationTitle;

    if (this.appTitle) {
      titleToSet = `${this.appTitle} | ${titleToSet}`;
    }

    this.title.setTitle(titleToSet);
  }
}
