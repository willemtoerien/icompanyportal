import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Company, CompaniesClient } from 'companies-api';
import { finalize, takeUntil } from 'rxjs/operators';
import { CompanyStore } from 'company-utils';

@Component({
  selector: 'app-company-favorites-sidebar-items',
  templateUrl: './company-favorites-sidebar-items.component.html',
  styles: []
})
export class CompanyFavoritesSidebarItemsComponent implements OnInit, OnDestroy {
  private cease = new Subject<void>();

  isLoading = false;
  companies: Company[] = [];

  constructor(private companiesClient: CompaniesClient, private store: CompanyStore) {}

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
