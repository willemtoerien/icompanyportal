import { SubscriptionStatus } from 'companies-api';

export function getSubscriptionStatusName(status: SubscriptionStatus): string {
  switch (status) {
    case SubscriptionStatus.active:
      return 'Active';
    case SubscriptionStatus.cancelled:
      return 'Cancelled';
    case SubscriptionStatus.expired:
      return 'Expired';
  }
}
