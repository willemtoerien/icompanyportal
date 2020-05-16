import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { NotifyRequest } from './notify-request';
import { Notification } from './notification';
import { NOTIFICATIONS_API_ENDPOINT } from './notifications-api-endpoint';
import { NOTIFICATIONS_API_AUTH_TOKEN, NotificationsApiAuthToken } from './notifications-api-auth-token';

@Injectable({
  providedIn: 'root'
})
export class NotificationsClient {
  private hub: HubConnection;

  notified = new EventEmitter<Notification>();
  unreadCountUpdated = new EventEmitter<number>();

  constructor(
    private http: HttpClient,
    @Inject(NOTIFICATIONS_API_ENDPOINT)
    private endpoint: string,
    @Inject(NOTIFICATIONS_API_AUTH_TOKEN)
    private authToken: NotificationsApiAuthToken
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
    return new Observable((x) => {
      try {
        const builder = new HubConnectionBuilder().withUrl(this.endpoint + '/hub', {
          accessTokenFactory: () => this.authToken()
        });
        this.hub = builder.build();
        this.hub.on('notification', (item) => {
          this.notified.emit(item);
          this.getUnreadCount().subscribe((count) => this.unreadCountUpdated.emit(count));
        });
        this.hub
          .start()
          .then(() => x.next())
          .catch((e) => x.error(e));
      } catch (error) {
        x.error(error);
      } finally {
        x.complete();
      }
      return () => this.hub.stop();
    });
  }
}
