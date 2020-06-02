import { NgModule } from '@angular/core';
import { CompanyNameDirective, CompanyLogoDirective } from './directives';
import { CommonModule } from '@angular/common';
import { CheckPermissionsDirective } from './directives/check-permissions.directive';

@NgModule({
  declarations: [CompanyNameDirective, CompanyLogoDirective, CheckPermissionsDirective],
  imports: [CommonModule],
  exports: [CompanyNameDirective, CompanyLogoDirective, CheckPermissionsDirective]
})
export class CompanyUtilsModule {}
