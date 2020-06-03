import { Directive, Input, Inject, OnInit, PLATFORM_ID, Optional } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { APP_TITLE } from '../services/app-title';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Request } from 'express';

@Directive({
  selector: '[libTitle]'
})
export class TitleDirective implements OnInit {
  @Input()
  libTitle: string;

  @Input()
  libTitleIsCustom = false;

  @Input()
  libTitleDescription: string;

  @Input()
  libTitleImg: string;

  constructor(
    private title: Title,
    @Inject(APP_TITLE) private applicationTitle: string,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: string,
    @Optional() @Inject(REQUEST) private request: Request,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setTitle();
    this.setDescription();
    this.setImg();
    this.setUrl();
  }

  private setTitle() {
    let titleToSet = this.libTitleIsCustom ? '' : ` | ${this.applicationTitle}`;

    if (this.libTitle) {
      titleToSet = `${this.libTitle}${titleToSet}`;
    }

    this.title.setTitle(titleToSet);
  }

  private setDescription() {
    const content = this.libTitleDescription
      ? this.libTitleDescription
      : 'Consectetur do ullamco nostrud culpa amet reprehenderit deserunt sit quis commodo aliqua Lorem.';
    this.meta.updateTag({
      name: 'description',
      content
    });
    this.meta.updateTag({
      name: 'og:description',
      content
    });
  }

  private setImg() {
    if (this.libTitleImg) {
      this.meta.updateTag({
        property: 'og:image',
        content: this.libTitleImg
      });
    }
  }

  private setUrl() {
    const content = isPlatformBrowser(this.platformId)
      ? window.location.href
      : `${this.request.protocol}://${this.request.get('host')}/` + this.activatedRoute.snapshot.url.join('/');
    this.meta.updateTag({
      property: 'og:url',
      content
    });
  }
}
