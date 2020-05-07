import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersClient } from 'users-api';
import { FormValidators, invokeForm } from 'forms-ex';
import { AuthStore } from 'src/app/modules/auth-utils/services';
import { UserStatus } from 'src/app/services/api-clients/users-api/user-status';

@Component({
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit {
  form: FormGroup;

  isSaved = false;

  constructor(private builder: FormBuilder, private users: UsersClient, public authStore: AuthStore) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: new FormControl(this.authStore.signedInUser.value.email, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
        asyncValidators: FormValidators.isUnique(
          (x) => this.users.isEmailUnique(x),
          'The email you provided is already in use.',
          this.authStore.signedInUser.value.email
        )
      }),
      password: ['', FormValidators.compare('confirmPassword')],
      confirmPassword: ['', FormValidators.compare('password')],
      firstName: [this.authStore.signedInUser.value.firstName, Validators.required],
      lastName: [this.authStore.signedInUser.value.lastName, Validators.required]
    });
  }

  onSubmit() {
    const originalEmail = this.authStore.signedInUser.value.email;
    this.users
      .save(location.host + '/confirm/0/{0}', this.form.value)
      .pipe(invokeForm(this.form))
      .subscribe(() => {
        if (originalEmail.toLowerCase() !== this.authStore.signedInUser.value.email.toLowerCase()) {
          this.authStore.signedInUser.value.status = UserStatus.pendingEmailConfirmation;
        }
        this.authStore.signedInUser.value.email = this.form.value.email;
        this.authStore.signedInUser.value.firstName = this.form.value.firstName;
        this.authStore.signedInUser.value.lastName = this.form.value.lastName;
      });
  }

  onResend(event: Event) {
    event.preventDefault();
    this.users.resendEmailConfirmationToken('/confirm/0/{0}').subscribe();
  }
}
