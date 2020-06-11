import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMPANIES_API_ENDPOINT } from './companies-api-endpoint';
import { Subscription } from '../models/subscription';
import { SubscriptionRequest } from '../models/subscription-request';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsClient {
  constructor(private http: HttpClient, @Inject(COMPANIES_API_ENDPOINT) private endpoint: string) {}

  get(companyId: number) {
    return this.http.get<Subscription>(`${this.endpoint}/subscriptions/${companyId}`);
  }

  subscribe(companyId: number, request: SubscriptionRequest) {
    return this.http.post<void>(`${this.endpoint}/subscriptions/${companyId}`, request);
  }

  cancel(companyId: number) {
    return this.http.delete<void>(`${this.endpoint}/subscriptions/${companyId}`);
  }
}
