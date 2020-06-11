import { NgModule } from '@angular/core';
import { CompanyNameDirective, CompanyLogoDirective } from './directives';
import { CommonModule } from '@angular/common';
import { CheckPermissionsDirective } from './directives/check-permissions.directive';
import { PlanTypeNamePipe } from './pipes/plan-type-name.pipe';

@NgModule({
  declarations: [CompanyNameDirective, CompanyLogoDirective, CheckPermissionsDirective, PlanTypeNamePipe],
  imports: [CommonModule],
  exports: [CompanyNameDirective, CompanyLogoDirective, CheckPermissionsDirective, PlanTypeNamePipe]
})
export class CompanyUtilsModule {}
