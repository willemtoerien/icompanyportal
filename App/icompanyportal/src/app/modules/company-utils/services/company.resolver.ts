import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { tap, flatMap, map, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { notFound, formatString } from 'utils';
import { Company, CompaniesClient, CompanyUsersClient } from 'companies-api';
import { CompanyStore } from './company-store';
import { COMPANY_NOT_FOUND_ROUTE } from './company-not-found-route';

@Injectable({
  providedIn: 'root'
})
export class CompanyResolver implements Resolve<Company> {
  static readonly invalidCompanyId = `The company id '%companyId%' is invalid.`;

  constructor(
    private store: CompanyStore,
    private companiesClient: CompaniesClient,
    private companyUsersClient: CompanyUsersClient,
    private router: Router,
    @Inject(COMPANY_NOT_FOUND_ROUTE) private notFoundRoute: string
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    if (!route.params.companyId) {
      // The route is create, so clear the store.
      this.store.user.next(undefined);
      this.store.company.next(undefined);
      return of(undefined);
    }
    const companyId = parseInt(route.params.companyId, 0);
    if (isNaN(companyId)) {
      // Later we will make use of uniqueName. For now, throw an error.
      throw new Error(formatString(CompanyResolver.invalidCompanyId, { companyId: route.params.companyId }));
    }
    if (this.store.company.value && this.store.company.value.companyId === companyId) {
      // Don't fetch a company already in the store.
      // NOTE: Use "of" because the router will freeze if not.
      return of(this.store.company.value);
    }

    return this.companiesClient.get(companyId).pipe(
      notFound(() =>
        this.router.navigateByUrl(this.notFoundRoute, {
          queryParams: {
            companyId
          }
        })
      ),
      tap((company) => this.store.company.next(company)),
      flatMap((company) => {
        return this.companyUsersClient.get(companyId).pipe(
          catchError(() => {
            this.store.user.next(undefined);
            return EMPTY;
          }),
          map((companyUser) => {
            this.store.user.next(companyUser);
            return company;
          })
        );
      })
    );
  }
}
