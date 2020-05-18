import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersClient } from 'users-api';
import { SignedInUserResolver, AuthStore } from 'auth-utils';
import { Router, ActivatedRoute } from '@angular/router';
import { invokeForm } from 'forms-ex';
import { flatMap } from 'rxjs/operators';
import { FormValidators } from 'src/app/modules/forms-ex/validation';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './sign-up-page.component.html',
  styles: []
})
export class SignUpPageComponent implements OnInit {
  form: FormGroup;

  get email(): string {
    const queryParams = this.activatedRoute.queryParams as BehaviorSubject<any>;
    return queryParams.value.email;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private users: UsersClient,
    private store: AuthStore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        this.email ? this.email : '',
        [Validators.required, Validators.email],
        [FormValidators.isUnique((value) => this.users.isEmailUnique(value))]
      ],
      password: ['', Validators.required]
    });
    if (this.email) {
      this.form.get('email').markAsDirty();
    }
  }

  onSubmit() {
    this.users
      .signUp(location.origin + '/token/account/confirm/email/{0}', this.form.value)
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
