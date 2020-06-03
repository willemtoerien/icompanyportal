import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => this.onRouteEvent(event));
    }
  }

  onRouteEvent(e: Event) {
    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      window.scrollTo(0, 0);
    }
  }
}
