import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CollectionContext } from 'utils';
import { User, UsersClient } from 'users-api';
import { CompanyUsersClient, CompanyUser } from 'companies-api';
import { Router } from '@angular/router';
import { catchError, finalize, flatMap, map, takeUntil } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AuthStore } from 'src/app/modules/auth-utils/services';
import { CompanyStore } from 'src/app/modules/company-utils/services';

@Component({
  templateUrl: './users-page.component.html',
  styles: []
})
export class UsersPageComponent implements OnInit, OnDestroy {
  context = new CollectionContext('Company Users');

  users: { [key: number]: User } = {};

  constructor(
    private companyUsersClient: CompanyUsersClient,
    private usersClient: UsersClient,
    private companyStore: CompanyStore,
    private router: Router,
    private authStore: AuthStore
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngOnDestroy() {
    this.context.stop();
  }

  loadItems() {
    this.context.isLoading = true;
    this.companyUsersClient
      .getAll(this.companyStore.company.value.companyId)
      .pipe(
        catchError((error) => {
          this.context.error = error;
          return throwError(error);
        }),
        finalize(() => (this.context.isLoading = false)),
        flatMap((items) => {
          if (items.length > 0) {
            const userIds = items.map((x) => x.userId).join(',');
            return this.usersClient.getUsers(userIds).pipe(
              map((users) => {
                for (const user of users) {
                  this.users[user.userId] = user;
                }
                return items;
              })
            );
          } else {
            return of(items);
          }
        }),
        takeUntil(this.context.cease)
      )
      .subscribe((items) => {
        for (const item of items) {
          this.context.items.push(item);
        }
      });
  }

  onRemove(companyUser: CompanyUser) {
    this.companyUsersClient.delete(companyUser.companyId, companyUser.userId).subscribe(() => {
      const index = this.context.items.indexOf(companyUser);
      this.context.items.splice(index, 1);
      this.companyStore.updated.emit();
      if (this.authStore.signedInUser.value.userId === companyUser.userId) {
        this.router.navigateByUrl('/companies');
      }
    });
  }
}
