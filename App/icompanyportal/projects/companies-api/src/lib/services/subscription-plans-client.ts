import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMPANIES_API_ENDPOINT } from './companies-api-endpoint';
import { Subscription } from '../models/subscription';
import { SubscriptionRequest } from '../models/subscription-request';
import { SubscriptionLength } from '../models/subscription-length';
import { SubscriptionPlanType } from '../models/subscription-plan-type';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansClient {
  constructor(private http: HttpClient, @Inject(COMPANIES_API_ENDPOINT) private endpoint: string) {}

  get(currencyCode: string) {
    return this.http.get<Subscription>(`${this.endpoint}/subscription-plans/${currencyCode}`);
  }

  getAmount(currencyCode: string, type: SubscriptionPlanType, length: SubscriptionLength) {
    return this.http.get<number>(`${this.endpoint}/subscription-plans/${currencyCode}/${type}/${length}`);
  }
}
