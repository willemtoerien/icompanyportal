import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersClient } from 'users-api';
import { SignedInUserResolver, AuthStore } from 'auth-utils';
import { Router } from '@angular/router';
import { invokeForm } from 'forms-ex';
import { flatMap } from 'rxjs/operators';
import { FormValidators } from 'src/app/modules/forms-ex/validation';

@Component({
  templateUrl: './sign-up-page.component.html',
  styles: []
})
export class SignUpPageComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder, private users: UsersClient, private store: AuthStore, private router: Router) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [FormValidators.isUnique((value) => this.users.isEmailUnique(value))]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.users
      .signUp(location.host + '/account/confirm/{0}/email', this.form.value)
      .pipe(
        invokeForm(this.form),
        flatMap(() => this.users.getSignedInUser())
      )
      .subscribe((user) => {
        this.store.signedInUser.next(user);
        this.router.navigateByUrl('/');
      });
  }
}
