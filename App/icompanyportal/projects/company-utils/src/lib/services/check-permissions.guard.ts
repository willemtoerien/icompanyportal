import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyStore } from './company-store';
import { COMPANY_FORBIDDEN_ROUTE } from './company-forbidden-route';
import { CompanyUserPermissionType } from 'companies-api';
import { CompanyResolver } from './company.resolver';

@Injectable({
  providedIn: 'root'
})
export class CheckPermissionsGuard implements CanActivate {
  constructor(
    private store: CompanyStore,
    private router: Router,
    @Inject(COMPANY_FORBIDDEN_ROUTE) private forbiddenRoute: string,
    private resolver: CompanyResolver
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.store.company.value) {
      await this.resolver.resolve(next).toPromise();
    }

    const user = this.store.user.value;
    if (!user) {
      return this.router.createUrlTree(this.forbiddenRoute.split('/'));
    }

    const permissions = next.data.permissions as CompanyUserPermissionType[];
    for (const permission of permissions) {
      if (!user.companyUserPermissions.filter((x) => x.type === permission && x.isSet)[0]) {
        return this.router.createUrlTree(this.forbiddenRoute.split('/'));
      }
    }

    return true;
  }
}
