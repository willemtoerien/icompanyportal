import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, ActivationStart } from '@angular/router';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input()
  isLight = false;

  @Input()
  brandTemplate: TemplateRef<HTMLElement>;

  @Input()
  sidebarContentTemplate: TemplateRef<HTMLElement>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe((events) => {
      if (events instanceof ActivationStart) {
        $('#sidebar-modal').modal('hide');
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
