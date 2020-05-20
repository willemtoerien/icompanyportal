import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NotificationsClient } from 'notifications-api';
import { NotificationStore } from './notification-store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnreadCountResolver implements Resolve<number> {
  constructor(private client: NotificationsClient, private store: NotificationStore) {}

  resolve() {
    return this.client.getUnreadCount().pipe(tap((count) => this.store.unreadCount.next(count)));
  }
}
