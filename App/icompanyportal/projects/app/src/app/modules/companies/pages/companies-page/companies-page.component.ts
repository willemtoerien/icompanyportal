import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionContext, useCollectionContext } from 'utils';
import { CompaniesClient, CompanyUsersClient } from 'companies-api';
import { catchError, finalize, tap, takeUntil } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './companies-page.component.html'
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  context = new CollectionContext('Companies', 5);

  constructor(private companiesClient: CompaniesClient, private companyStore: CompanyStore) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngOnDestroy() {
    this.context.stop();
  }

  loadItems() {
    this.companiesClient
      .getCompanies(this.context.currentPage, this.context.pageSize, this.context.search)
      .pipe(useCollectionContext(this.context))
      .subscribe();
  }

  toggleFavorite(companyId: number) {
    this.companiesClient.setFavorite(companyId).subscribe(() => this.companyStore.updated.emit());
  }
}
