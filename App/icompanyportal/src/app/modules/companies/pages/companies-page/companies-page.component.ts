import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionContext } from 'utils';
import { CompaniesClient, CompanyUsersClient } from 'companies-api';
import { catchError, finalize, tap, takeUntil } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './companies-page.component.html',
  styles: []
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  context = new CollectionContext('Companies');

  constructor(private companiesClient: CompaniesClient, private companyStore: CompanyStore) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngOnDestroy() {
    this.context.stop();
  }

  loadItems() {
    this.context.isLoading = true;
    this.companiesClient
      .getCompanies(this.context.pageSize, this.context.currentPage++)
      .pipe(
        catchError((error) => {
          this.context.error = error;
          return throwError(error);
        }),
        finalize(() => (this.context.isLoading = false)),
        tap((items) => {
          this.context.hasMore = items.length >= this.context.pageSize;
          for (const item of items) {
            this.context.items.push(item);
          }
        }),
        takeUntil(this.context.cease)
      )
      .subscribe();
  }

  toggleFavorite(companyId: number) {
    this.companiesClient.setFavorite(companyId).subscribe(() => this.companyStore.updated.emit());
  }
}
