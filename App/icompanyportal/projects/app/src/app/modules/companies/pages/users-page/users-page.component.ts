import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CollectionContext } from 'utils';
import { User, UsersClient } from 'users-api';
import { CompanyUsersClient, CompanyUser, CompanyUserPermissionType, CompanyUserPermission, CompaniesClient } from 'companies-api';
import { Router } from '@angular/router';
import { catchError, finalize, flatMap, map, takeUntil } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AuthStore } from 'auth-utils';
import { CompanyStore, PERMISSION_DESCRIPTIONS } from 'company-utils';
import { useCollectionContext } from 'utils';

@Component({
  templateUrl: './users-page.component.html'
})
export class UsersPageComponent implements OnInit, OnDestroy {
  context = new CollectionContext('Company Users');

  users: { [key: number]: User } = {};

  permissions = PERMISSION_DESCRIPTIONS;

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
        useCollectionContext(this.context),
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
        })
      )
      .subscribe();
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

  getName(companyUser: CompanyUser) {
    const user = this.users[companyUser.userId];
    if (!user) {
      return '';
    }
    return user.firstName + ' ' + user.lastName;
  }

  togglePermission(companyUser: CompanyUser, permission: CompanyUserPermission) {
    const toSet = companyUser.companyUserPermissions.filter((x) => x.type === permission.type && x.userId === companyUser.userId)[0];
    this.companyUsersClient
      .setPermission(toSet.companyId, toSet.userId, toSet.type, !toSet.isSet)
      .subscribe(() => (toSet.isSet = !toSet.isSet));
  }

  getPermission(companyUser: CompanyUser, type: CompanyUserPermissionType) {
    const permission = companyUser.companyUserPermissions.filter((x) => x.type === type && x.userId === companyUser.userId)[0];
    return permission ? permission.isSet : false;
  }
}
