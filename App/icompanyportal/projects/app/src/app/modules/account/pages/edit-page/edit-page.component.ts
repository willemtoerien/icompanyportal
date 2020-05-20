import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersClient, SaveUserRequest } from 'users-api';
import { FormValidators, invokeForm } from 'forms-ex';
import { AuthStore } from 'auth-utils';
import { UserStatus } from 'users-api';
import { ImageInputData } from 'forms-ex';
import { flatMap } from 'rxjs/operators';

@Component({
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit {
  imageInputData: ImageInputData;

  form: FormGroup;

  isSaved = false;

  get userName() {
    return `${this.authStore.signedInUser.value.firstName} ${this.authStore.signedInUser.value.lastName}`;
  }

  get src() {
    const user = this.authStore.signedInUser.value;
    return `data:${user.avatarContentType};base64,${user.avatar}`;
  }

  get hasSrc() {
    return !!this.authStore.signedInUser.value.avatar;
  }

  get defaultSrc() {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.userName)}`;
  }

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
    const request: SaveUserRequest = this.form.value;
    if (this.imageInputData) {
      request.avatar = this.imageInputData.data;
      request.avatarContentType = this.imageInputData.contentType;
    }
    this.users
      .save(location.origin + '/token/account/confirm/email/{0}', request)
      .pipe(
        invokeForm(this.form),
        flatMap(() => this.users.getSignedInUser())
      )
      .subscribe((user) => {
        this.authStore.signedInUser.next(user);
      });
  }

  onResend(event: Event) {
    event.preventDefault();
    this.users.resendEmailConfirmationToken(location.origin + '/token/account/confirm/email/{0}').subscribe();
  }

  onImageChanged(data: ImageInputData) {
    this.imageInputData = data;
  }

  onDeleteAvatar() {
    this.users
      .deleteAvatar()
      .pipe(flatMap(() => this.users.getSignedInUser()))
      .subscribe((user) => {
        this.authStore.signedInUser.next(user);
      });
  }
}
