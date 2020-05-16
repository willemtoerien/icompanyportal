import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';

@Component({
  selector: 'app-page-loading-indicator',
  templateUrl: './page-loading-indicator.component.html',
  styles: []
})
export class PageLoadingIndicatorComponent implements OnInit {
  isLoading: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => this.onRouteEvent(event));
  }

  onRouteEvent(e: Event) {
    if (e instanceof NavigationStart) {
      this.isLoading = true;
    } else if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      this.isLoading = false;
    }
  }
}
