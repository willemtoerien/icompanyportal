import { SubscriptionPlanType } from 'companies-api';

export function getSubscriptionPlanTypeName(type: SubscriptionPlanType): string {
  switch (type) {
    case SubscriptionPlanType.basic:
      return 'Basic';
    case SubscriptionPlanType.plus:
      return 'Plus';
    case SubscriptionPlanType.professional:
      return 'Professional';
    case SubscriptionPlanType.enterprise:
      return 'Enterprise';
  }
}
