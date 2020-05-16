import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';

@Component({
  selector: 'app-initial-loading',
  templateUrl: './initial-loading.component.html'
})
export class InitialLoadingComponent implements OnInit {
  isShowing: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isShowing = true;
    this.router.events.subscribe((event) => this.onRouteEvent(event));
  }

  onRouteEvent(e: Event) {
    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      this.isShowing = false;
    }
  }
}
