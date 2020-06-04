import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CollectionContext } from 'utils';
import { User, UsersClient } from 'users-api';
import { CompanyUsersClient, CompanyUser, CompanyUserPermissionType, CompanyUserPermission, CompaniesClient } from 'companies-api';
import { Router } from '@angular/router';
import { catchError, finalize, flatMap, map, takeUntil, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AuthStore } from 'auth-utils';
import { CompanyStore, PERMISSION_DESCRIPTIONS } from 'company-utils';
import { useCollectionContext } from 'utils';

@Component({
  templateUrl: './users-page.component.html'
})
export class UsersPageComponent implements OnInit, OnDestroy {
  private original: CompanyUser[] = [];
  context = new CollectionContext<CompanyUser>('Company Users');

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
    if (this.context.items.length > 0) {
      if (this.context.search) {
        this.context.items = this.context.items.filter((x) => this.getName(x).includes(this.context.search));
      } else {
        this.context.items = this.original;
      }
      return;
    }
    this.context.isLoading = true;
    this.companyUsersClient
      .getAll(this.companyStore.company.value.companyId)
      .pipe(
        flatMap((items) => {
          if (items.length > 0) {
            const userIds = items.map((x) => x.userId).join(',');
            return this.usersClient.getUsers(userIds).pipe(
              map((users) => {
                for (const user of users) {
                  const item = items.filter((x) => x.userId === user.userId)[0];
                  item.user = user;
                }
                return items;
              })
            );
          } else {
            return of(items);
          }
        }),
        map((items) => {
          return items.sort((a, b) => (this.getName(a) < this.getName(b) ? -1 : 1));
        }),
        useCollectionContext(this.context)
      )
      .subscribe((items) => (this.original = items));
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
    return companyUser.user.firstName + ' ' + companyUser.user.lastName;
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

  getSrc(companyUser: CompanyUser) {
    return `data:${companyUser.user.avatarContentType};base64,${companyUser.user.avatar}`;
  }

  getHasSrc(companyUser: CompanyUser) {
    return !!companyUser.user.avatar;
  }

  getDefaultSrc(companyUser: CompanyUser) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.getName(companyUser))}`;
  }
}
