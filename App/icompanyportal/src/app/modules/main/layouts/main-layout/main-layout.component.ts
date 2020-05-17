import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore, AuthTokenHelper } from 'auth-utils';
import { Subject, Subscription } from 'rxjs';
import { Company, CompaniesClient } from 'companies-api';
import { CompanyStore } from 'company-utils';
import { finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationsClient } from 'notifications-api';

@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private cease = new Subject<void>();
  private notificationsSubscription: Subscription;

  isLoading = false;
  companies: Company[] = [];

  get userName() {
    return `${this.usersStore.signedInUser.value.firstName} ${this.usersStore.signedInUser.value.lastName}`;
  }

  get src() {
    return `https://ui-avatars.com/api/?name=${this.userName}`;
  }

  constructor(
    public usersStore: AuthStore,
    private token: AuthTokenHelper,
    private companiesClient: CompaniesClient,
    private store: CompanyStore,
    private notificationsClient: NotificationsClient
  ) {}

  signOut() {
    this.token.value = undefined;
  }

  ngOnInit() {
    this.notificationsSubscription = this.notificationsClient.listen().subscribe();
    this.load();
    this.store.updated.subscribe(() => this.load());
  }

  ngOnDestroy() {
    this.cease.next();
    this.cease.complete();
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
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
