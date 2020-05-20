import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { UtilsModule } from 'utils';
import { FormsExModule } from 'forms-ex';

@NgModule({
  declarations: [AuthLayoutComponent, ResetPasswordPageComponent, SignInPageComponent, SignUpPageComponent],
  imports: [CommonModule, AuthRoutingModule, FormsExModule, UtilsModule]
})
export class AuthModule {}
