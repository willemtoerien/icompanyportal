import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyNameDirective } from './directives/company-name.directive';
import { CompanyLogoDirective } from './directives/company-logo.directive';



@NgModule({
  declarations: [CompanyNameDirective, CompanyLogoDirective],
  imports: [
    CommonModule
  ],
  exports: [CompanyNameDirective, CompanyLogoDirective]
})
export class CompanyUtilsModule { }
