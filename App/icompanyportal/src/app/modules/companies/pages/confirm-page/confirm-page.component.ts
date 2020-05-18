import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInvitationsClient, CompanyInvitation } from 'companies-api';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, flatMap } from 'rxjs/operators';
import { UsersClient } from 'users-api';
import { AuthStore, AuthTokenHelper } from 'src/app/modules/auth-utils/services';

@Component({
  templateUrl: './confirm-page.component.html',
  styles: []
})
export class ConfirmPageComponent {
  isBusy = false;
  errorMessage: string;

  get invitation(): CompanyInvitation {
    const data = this.activatedRoute.data as BehaviorSubject<any>;
    return data.value.invitation;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private invitationsClient: CompanyInvitationsClient,
    private usersClient: UsersClient,
    private authTokenHelper: AuthTokenHelper
  ) {}

  respond(accepted: boolean) {
    this.isBusy = true;
    this.errorMessage = undefined;
    this.invitationsClient
      .respond(this.invitation.token, accepted)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'An unexpected error has occurred on the server.';
          return throwError(error);
        }),
        finalize(() => (this.isBusy = false)),
        flatMap(() => this.usersClient.getSignedInUser())
      )
      .subscribe(() => {
        if (this.authTokenHelper.isSet.value) {
          this.router.navigateByUrl(`/companies/${this.invitation.companyId}`);
        } else {
          this.router.navigate(['/auth/sign-up'], {
            queryParams: {
              email: this.invitation.email
            }
          });
        }
      });
  }
}
