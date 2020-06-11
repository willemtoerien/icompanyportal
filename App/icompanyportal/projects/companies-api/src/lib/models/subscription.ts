import { SubscriptionLength } from './subscription-length';
import { SubscriptionPlanType } from './subscription-plan-type';
import { SubscriptionStatus } from './subscription-status';

export interface Subscription {
  companyId?: number;
  type?: SubscriptionPlanType;
  length?: SubscriptionLength;
  currencyCode?: string;
  subscribedOn?: string;
  expiresOn?: string;
  status?: SubscriptionStatus;
}
