import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsClient, Notification } from 'notifications-api';
import { CollectionContext } from 'utils';
import { catchError, finalize, tap, takeUntil } from 'rxjs/operators';
import { throwError, Subscription } from 'rxjs';
import { useCollectionContext } from 'utils';
import { NotificationStore } from 'notification-utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './notifications-page.component.html'
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  context = new CollectionContext<Notification>('Notifications', 5);

  constructor(private client: NotificationsClient, private store: NotificationStore, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.client.notified.subscribe((notification) => {
      this.context.items.unshift(notification);
      this.client.markAllAsRead().subscribe();
    });
    this.loadItems();
  }

  ngOnDestroy() {
    this.context.stop();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadItems() {
    this.client
      .getNotifications(this.context.currentPage, this.context.pageSize, this.context.search)
      .pipe(useCollectionContext(this.context))
      .subscribe();
    this.client.markAllAsRead().subscribe(() => {
      this.store.unreadCount.next(0);
    });
  }
}
