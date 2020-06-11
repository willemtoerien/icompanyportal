import { SubscriptionLength } from './subscription-length';
import { SubscriptionPlanType } from './subscription-plan-type';
import { SubscriptionStatus } from './subscription-status';
import { SubscriptionPlan } from './subscription-plan';

export interface Subscription {
  companyId?: number;
  type?: SubscriptionPlanType;
  length?: SubscriptionLength;
  currencyCode?: string;
  subscribedOn?: string;
  expiresOn?: string;
  status?: SubscriptionStatus;
  subscriptionPlan?: SubscriptionPlan;
}
