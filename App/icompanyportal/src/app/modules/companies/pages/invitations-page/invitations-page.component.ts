import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionContext } from 'utils';
import { CompanyInvitationsClient, CompanyInvitation } from 'companies-api';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './invitations-page.component.html',
  styles: []
})
export class InvitationsPageComponent implements OnInit, OnDestroy {
  context = new CollectionContext('Company Invitations');

  constructor(private companyInvitationsClient: CompanyInvitationsClient, private store: CompanyStore) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngOnDestroy() {
    this.context.stop();
  }

  loadItems() {
    this.context.isLoading = true;
    this.companyInvitationsClient
      .getInvitations(this.store.company.value.companyId)
      .pipe(
        catchError((error) => {
          this.context.error = error;
          return throwError(error);
        }),
        finalize(() => (this.context.isLoading = false)),
        takeUntil(this.context.cease)
      )
      .subscribe((items) => {
        for (const item of items) {
          this.context.items.push(item);
        }
      });
  }

  onRemove(invitation: CompanyInvitation) {
    this.companyInvitationsClient.delete(invitation.token).subscribe(() => {
      const index = this.context.items.indexOf(invitation);
      this.context.items.splice(index, 1);
    });
  }
}
