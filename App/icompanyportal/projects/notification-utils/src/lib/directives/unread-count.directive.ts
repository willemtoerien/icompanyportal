import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NotificationStore } from '../services/notification-store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[libUnreadCount]'
})
export class UnreadCountDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private store: NotificationStore, private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.subscription = this.store.unreadCount.subscribe((count) => {
      this.elementRef.nativeElement.innerText = count + '';
      if (count === 0) {
        this.elementRef.nativeElement.classList.add('d-none');
      } else {
        this.elementRef.nativeElement.classList.remove('d-none');
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
