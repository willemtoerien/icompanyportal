import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CompanyInvitation, CompanyInvitationsClient } from 'companies-api';
import { CompanyStore } from './company-store';

@Injectable({
  providedIn: 'root'
})
export class CompanyInvitationResolver implements Resolve<CompanyInvitation> {
  constructor(private client: CompanyInvitationsClient, private store: CompanyStore) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.store.invitation.next(undefined);
    const token = route.params.token;
    if (!token) {
      return of(undefined);
    }

    return this.client.get(token).pipe(
      catchError(() => EMPTY),
      tap((invitation) => this.store.invitation.next(invitation))
    );
  }
}
