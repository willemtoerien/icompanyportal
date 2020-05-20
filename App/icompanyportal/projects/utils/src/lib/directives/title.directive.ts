import { Directive, Input, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APP_TITLE } from '../services/app-title';

@Directive({
  selector: '[libTitle]'
})
export class TitleDirective implements OnInit {
  @Input()
  libTitle: string;

  constructor(private title: Title, @Inject(APP_TITLE) private applicationTitle: string) {}

  ngOnInit() {
    let titleToSet = this.applicationTitle;

    if (this.libTitle) {
      titleToSet = `${this.libTitle} | ${titleToSet}`;
    }

    this.title.setTitle(titleToSet);
  }
}
