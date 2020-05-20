import { NgModule } from '@angular/core';
import { CompanyNameDirective, CompanyLogoDirective } from './directives';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CompanyNameDirective, CompanyLogoDirective],
  imports: [CommonModule],
  exports: [CompanyNameDirective, CompanyLogoDirective]
})
export class CompanyUtilsModule {}
