import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMPANIES_API_ENDPOINT } from './companies-api-endpoint';
import { Subscription } from '../models/subscription';
import { SubscriptionRequest } from '../models/subscription-request';
import { SubscriptionLength } from '../models/subscription-length';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansClient {
  constructor(private http: HttpClient, @Inject(COMPANIES_API_ENDPOINT) private endpoint: string) {}

  get(currencyCode: string) {
    return this.http.get<Subscription>(`${this.endpoint}/subscription-plans/${currencyCode}`);
  }
}
