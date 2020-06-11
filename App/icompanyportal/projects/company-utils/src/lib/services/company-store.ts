import { Injectable, EventEmitter } from '@angular/core';
import { Company, CompanyUser, CompanyInvitation, SubscriptionPlan } from 'companies-api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyStore {
  company = new BehaviorSubject<Company>(undefined);
  user = new BehaviorSubject<CompanyUser>(undefined);
  invitation = new BehaviorSubject<CompanyInvitation>(undefined);
  subscriptionPlans = new BehaviorSubject<SubscriptionPlan[]>(undefined);

  updated = new EventEmitter<void>();
}
