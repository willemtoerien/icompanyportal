import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsClient, Notification } from 'notifications-api';
import { CollectionContext } from 'utils';
import { catchError, finalize, tap, takeUntil } from 'rxjs/operators';
import { throwError, Subscription } from 'rxjs';
import { useCollectionContext } from 'src/app/modules/utils/operators/use-collection-context';
import { NotificationStore } from 'src/app/modules/notification-utils/services';

@Component({
  templateUrl: './notifications-page.component.html'
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  context = new CollectionContext<Notification>('Notifications');

  constructor(private client: NotificationsClient, private store: NotificationStore) {}

  ngOnInit(): void {
    this.subscription = this.client.notified.subscribe((notification) => {
      this.context.items.unshift(notification);
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
    this.context.isLoading = true;
    this.client.getNotifications().pipe(useCollectionContext(this.context)).subscribe();
    this.client.markAllAsRead().subscribe(() => {
      this.store.unreadCount.next(0);
    });
  }
}
