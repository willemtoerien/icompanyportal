import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore, AuthTokenHelper } from 'auth-utils';
import { Subject } from 'rxjs';
import { Company, CompaniesClient } from 'companies-api';
import { CompanyStore } from 'company-utils';
import { finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private cease = new Subject<void>();

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
    private store: CompanyStore
  ) {}

  signOut() {
    this.token.value = undefined;
  }

  ngOnInit() {
    this.load();
    this.store.updated.subscribe(() => this.load());
  }

  ngOnDestroy() {
    this.cease.next();
    this.cease.complete();
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
