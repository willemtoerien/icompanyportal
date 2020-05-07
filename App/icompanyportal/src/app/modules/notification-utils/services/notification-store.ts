import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationStore {
  unreadCount = new BehaviorSubject<number>(0);
}
