import { NgModule } from '@angular/core';
import { CompanyNameDirective, CompanyLogoDirective } from './directives';
import { CommonModule } from '@angular/common';
import { CheckPermissionsDirective } from './directives/check-permissions.directive';
import { PlanTypeNamePipe } from './pipes/plan-type-name.pipe';
import { PlanLengthNamePipe } from './pipes/plan-length-name.pipe';
import { SubscriptionStatusNamePipe } from './pipes/subscription-status-name.pipe';

@NgModule({
  declarations: [CompanyNameDirective, CompanyLogoDirective, CheckPermissionsDirective, PlanTypeNamePipe, PlanLengthNamePipe, SubscriptionStatusNamePipe],
  imports: [CommonModule],
  exports: [CompanyNameDirective, CompanyLogoDirective, CheckPermissionsDirective, PlanTypeNamePipe, PlanLengthNamePipe, SubscriptionStatusNamePipe]
})
export class CompanyUtilsModule {}
