import { Pipe, PipeTransform } from '@angular/core';
import { SubscriptionStatus } from 'companies-api';
import { getSubscriptionStatusName } from '../helpers/get-subscription-status-name';

@Pipe({
  name: 'subscriptionStatusName'
})
export class SubscriptionStatusNamePipe implements PipeTransform {
  transform(value: number | SubscriptionStatus): unknown {
    return getSubscriptionStatusName(value);
  }
}
