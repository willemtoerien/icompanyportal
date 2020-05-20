import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersClient, ConfirmationTokenType } from 'users-api';
import { BehaviorSubject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AuthStore } from 'auth-utils';

@Component({
  templateUrl: './confirm-page.component.html'
})
export class ConfirmPageComponent implements OnInit {
  invalid = false;

  private get dataValue() {
    return (this.activatedRoute.params as BehaviorSubject<any>).value;
  }

  get type(): ConfirmationTokenType {
    return this.dataValue.type;
  }

  get token() {
    return this.dataValue.token;
  }

  constructor(private activatedRoute: ActivatedRoute, private users: UsersClient, private router: Router, private store: AuthStore) {}

  ngOnInit(): void {
    this.users
      .confirm(this.type, this.token)
      .pipe(flatMap(() => this.users.getSignedInUser()))
      .subscribe(
        (user) => {
          this.store.signedInUser.next(user);
          this.router.navigateByUrl('/account/edit');
        },
        () => (this.invalid = true)
      );
  }
}
