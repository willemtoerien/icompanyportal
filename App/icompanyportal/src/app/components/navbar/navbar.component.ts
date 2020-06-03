import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar', { static: true })
  navbar: ElementRef<HTMLButtonElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  async init() {
    const $ = (await import('jquery')).default;
    const q = $(window);
    // tslint:disable-next-line: deprecation
    q.scroll(() => {
      if (q.scrollTop() > 80) {
        $(this.navbar.nativeElement).addClass('navbar-default');
        $(this.navbar.nativeElement).addClass('shadow-lg');
      } else {
        $(this.navbar.nativeElement).removeClass('navbar-default');
        $(this.navbar.nativeElement).removeClass('shadow-lg');
      }
    });
  }
}
