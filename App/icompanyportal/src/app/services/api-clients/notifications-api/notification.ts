export interface Notification {
  notificationId?: number;
  userId?: number;
  redirectPath?: string;
  subject?: string;
  body?: string;
  createdAt?: string;
  readAt?: string;
}
