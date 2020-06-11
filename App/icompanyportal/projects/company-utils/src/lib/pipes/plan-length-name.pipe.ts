import { Pipe, PipeTransform } from '@angular/core';
import { SubscriptionLength } from 'companies-api';
import { getSubscriptionLengthName } from '../helpers/get-subscription-length-name';

@Pipe({
  name: 'planLengthName'
})
export class PlanLengthNamePipe implements PipeTransform {
  transform(value: number | SubscriptionLength): string {
    return getSubscriptionLengthName(value);
  }
}
