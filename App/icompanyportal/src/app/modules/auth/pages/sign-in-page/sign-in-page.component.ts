import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersClient } from 'users-api';
import { SignedInUserResolver } from 'auth-utils';
import { Router } from '@angular/router';
import { invokeForm } from 'forms-ex';
import { flatMap } from 'rxjs/operators';
import { AuthStore } from 'src/app/modules/auth-utils/services';

@Component({
  templateUrl: './sign-in-page.component.html'
})
export class SignInPageComponent implements OnInit {
  form: FormGroup;

  constructor(private builder: FormBuilder, private users: UsersClient, private store: AuthStore, private router: Router) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.users
      .signIn(this.form.value)
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
