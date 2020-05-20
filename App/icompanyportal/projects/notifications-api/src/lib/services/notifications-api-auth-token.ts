import { InjectionToken } from '@angular/core';

export type NotificationsApiAuthToken = () => string;

export const NOTIFICATIONS_API_AUTH_TOKEN = new InjectionToken<
  NotificationsApiAuthToken
>('Notifications API Auth Token');
