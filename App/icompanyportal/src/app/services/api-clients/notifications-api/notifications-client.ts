import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HubConnectionBuilder, HubConnection, LogLevel, HttpTransportType } from '@aspnet/signalr';
import { NotifyRequest } from './notify-request';
import { Notification } from './notification';
import { NOTIFICATIONS_API_ENDPOINT } from './notifications-api-endpoint';
import { NOTIFICATIONS_API_AUTH_TOKEN, NotificationsApiAuthToken } from './notifications-api-auth-token';
import { NotificationStore } from 'src/app/modules/notification-utils/services/notification-store';

@Injectable({
  providedIn: 'root'
})
export class NotificationsClient {
  private hub: HubConnection;

  notified = new EventEmitter<Notification>();

  constructor(
    private http: HttpClient,
    @Inject(NOTIFICATIONS_API_ENDPOINT)
    private endpoint: string,
    @Inject(NOTIFICATIONS_API_AUTH_TOKEN)
    private authToken: NotificationsApiAuthToken,
    private store: NotificationStore
  ) {}

  getNotifications() {
    return this.http.get<Notification[]>(`${this.endpoint}`);
  }

  getUnreadCount() {
    return this.http.get<number>(`${this.endpoint}/count`);
  }

  notify(userId: number, request: NotifyRequest) {
    return this.http.post<number>(`${this.endpoint}/${userId}`, request);
  }

  markAllAsRead() {
    return this.http.put<void>(`${this.endpoint}`, undefined);
  }

  listen() {
    const ob = new Observable<void>((x) => {
      try {
        this.hub = new HubConnectionBuilder()
          .withUrl(this.endpoint + '/hub', {
            accessTokenFactory: () => this.authToken()
          })
          .configureLogging(LogLevel.Debug)
          .build();
        this.hub.on('notification', (item) => {
          this.notified.emit(item);
          this.getUnreadCount().subscribe((count) => this.store.unreadCount.next(count));
        });
        this.hub
          .start()
          .then(() => x.next())
          .catch((e) => x.error(e));
      } catch (error) {
        x.error(error);
      }
      return () => {
        this.hub.stop();
      };
    });

    return ob;
  }
}
