import { SubscriptionPlanType } from './subscription-plan-type';
import { SubscriptionLength } from './subscription-length';

export interface SubscriptionPlan {
  type?: SubscriptionPlanType;
  length?: SubscriptionLength;
  currencyCode?: string;
  amount?: number;
}
