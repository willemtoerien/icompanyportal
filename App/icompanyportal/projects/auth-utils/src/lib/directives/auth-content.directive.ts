import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthTokenHelper } from '../services/auth-token-helper';

@Directive({
  selector: '[libAuthContent]'
})
export class AuthContentDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input()
  libAuthContent = true;

  constructor(private templateRef: TemplateRef<any>, private helper: AuthTokenHelper, private container: ViewContainerRef) {}

  ngOnInit() {
    this.subscription = this.helper.isSet.subscribe((isSet) => {
      this.container.clear();
      if ((isSet && this.libAuthContent) || (!isSet && !this.libAuthContent)) {
        this.container.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
