import { Component, OnInit, Input, TemplateRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, ActivationStart } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngOnInit();
    }
  }

  async init() {
    const $ = (await import('jquery')).default;
    await import('popper.js');
    await import('bootstrap');
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
