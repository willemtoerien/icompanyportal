import { NgModule } from '@angular/core';
import { AuthContentDirective } from './directives/auth-content.directive';

@NgModule({
  declarations: [AuthContentDirective],
  imports: [],
  exports: [AuthContentDirective]
})
export class AuthUtilsModule {}
