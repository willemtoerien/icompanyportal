import { SubscriptionLength } from 'companies-api';

export function getSubscriptionLengthName(type: SubscriptionLength): string {
  switch (type) {
    case SubscriptionLength.anually:
      return 'Anually';
    case SubscriptionLength.monthly:
      return 'Monthly';
  }
}
