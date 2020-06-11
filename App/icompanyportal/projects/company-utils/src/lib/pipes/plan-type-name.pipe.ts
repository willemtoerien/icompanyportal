import { Pipe, PipeTransform } from '@angular/core';
import { SubscriptionPlanType } from 'companies-api';
import { getSubscriptionPlanTypeName } from '../helpers/get-subscription-plan-type-name';
@Pipe({
  name: 'planTypeName'
})
export class PlanTypeNamePipe implements PipeTransform {
  transform(value: number | SubscriptionPlanType): string {
    return getSubscriptionPlanTypeName(value);
  }
}
