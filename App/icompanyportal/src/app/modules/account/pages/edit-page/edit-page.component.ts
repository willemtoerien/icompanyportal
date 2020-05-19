import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersClient, SaveUserRequest } from 'users-api';
import { FormValidators, invokeForm } from 'forms-ex';
import { AuthStore } from 'src/app/modules/auth-utils/services';
import { UserStatus } from 'src/app/services/api-clients/users-api/user-status';
import { ImageInputData } from 'forms-ex';
import { flatMap } from 'rxjs/operators';

@Component({
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit {
  imageInputData: ImageInputData;

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
      .pipe(flatMap(() => this.users.getAvatarUrl(this.authStore.signedInUser.value.userId)))
      .subscribe((url) => {
        const user = this.authStore.signedInUser.value;
        user.avatarUrl = url;
        this.authStore.signedInUser.next(user);
      });
  }
}
