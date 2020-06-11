import { SubscriptionPlanType } from './subscription-plan-type';
import { SubscriptionLength } from './subscription-length';

export interface SubscriptionRequest {
  type?: SubscriptionPlanType;
  length?: SubscriptionLength;
  currencyCode?: string;
}
