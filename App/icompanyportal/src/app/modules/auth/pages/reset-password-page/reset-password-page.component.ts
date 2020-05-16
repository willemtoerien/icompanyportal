import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersClient } from 'users-api';
import { SignedInUserResolver } from 'auth-utils';
import { Router } from '@angular/router';
import { invokeForm } from 'forms-ex';
import { flatMap } from 'rxjs/operators';

@Component({
  templateUrl: './reset-password-page.component.html',
  styles: []
})
export class ResetPasswordPageComponent implements OnInit {
  form: FormGroup;
  emailSent = false;

  constructor(private builder: FormBuilder, private users: UsersClient, private resolver: SignedInUserResolver) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', Validators.required, Validators.email]
    });
  }

  onSubmit() {
    this.users
      .resetPassword(location.host + '/account/confirm/{0}/reset-password', this.form.value)
      .pipe(
        invokeForm(this.form),
        flatMap(() => {
          return this.resolver.resolve();
        })
      )
      .subscribe(() => {
        this.emailSent = true;
      });
  }
}
