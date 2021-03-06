import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore, AuthTokenHelper } from 'auth-utils';
import { Subject, Subscription } from 'rxjs';
import { Company, CompaniesClient } from 'companies-api';
import { CompanyStore } from 'company-utils';
import { finalize, takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NotificationsClient } from 'notifications-api';
import { NotificationStore } from 'notification-utils';

@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private cease = new Subject<void>();
  private notificationsSubscription: Subscription;
  private notificationsCountSubscription: Subscription;

  isLoading = false;
  companies: Company[] = [];

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

  constructor(
    public authStore: AuthStore,
    private token: AuthTokenHelper,
    private companiesClient: CompaniesClient,
    private store: CompanyStore,
    private notificationsClient: NotificationsClient,
    private notificationStore: NotificationStore,
    private router: Router
  ) {}

  signOut() {
    this.token.value = undefined;
  }

  ngOnInit() {
    this.notificationsSubscription = this.notificationsClient.listen().subscribe();
    this.load();
    this.store.updated.subscribe(() => this.load());
    this.notificationsCountSubscription = this.notificationsClient.countChanged.subscribe((count) =>
      this.notificationStore.unreadCount.next(count)
    );
  }

  ngOnDestroy() {
    this.cease.next();
    this.cease.complete();
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
    if (this.notificationsCountSubscription) {
      this.notificationsCountSubscription.unsubscribe();
    }
  }

  load() {
    this.isLoading = true;
    this.companies = [];
    this.companiesClient
      .getFavorites()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.cease)
      )
      .subscribe((companies) => (this.companies = companies));
  }

  viewRoute(companyId: number) {
    return `/companies/${companyId}`;
  }
}
