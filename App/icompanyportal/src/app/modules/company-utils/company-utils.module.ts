import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyNameDirective } from './directives/company-name.directive';



@NgModule({
  declarations: [CompanyNameDirective],
  imports: [
    CommonModule
  ],
  exports: [CompanyNameDirective]
})
export class CompanyUtilsModule { }
