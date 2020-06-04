import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectionContext, useCollectionContext } from 'utils';
import { CompanyInvitationsClient, CompanyInvitation, CompanyUserPermissionType } from 'companies-api';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CompanyStore, PERMISSION_DESCRIPTIONS } from 'company-utils';

@Component({
  templateUrl: './invitations-page.component.html'
})
export class InvitationsPageComponent implements OnInit, OnDestroy {
  private original: CompanyInvitation[] = [];
  context = new CollectionContext<CompanyInvitation>('Company Invitations');

  permissions = PERMISSION_DESCRIPTIONS;

  constructor(private companyInvitationsClient: CompanyInvitationsClient, private store: CompanyStore) {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngOnDestroy() {
    this.context.stop();
  }

  loadItems() {
    if (this.context.items.length > 0) {
      if (this.context.search) {
        this.context.items = this.context.items.filter((x) => x.email.includes(this.context.search));
      } else {
        this.context.items = this.original;
      }
      return;
    }
    this.companyInvitationsClient
      .getInvitations(this.store.company.value.companyId)
      .pipe(useCollectionContext(this.context))
      .subscribe((items) => (this.original = items));
  }

  onRemove(invitation: CompanyInvitation) {
    this.companyInvitationsClient.delete(invitation.token).subscribe(() => {
      const index = this.context.items.indexOf(invitation);
      this.context.items.splice(index, 1);
    });
  }

  getPermissionDescription(type: CompanyUserPermissionType) {
    return this.permissions.filter((x) => x.type === type)[0].description;
  }

  getPermissionTypes(invitation: CompanyInvitation) {
    if (invitation.permissions === '') {
      return [];
    }
    const types = invitation.permissions.split(',').map((x) => parseInt(x, 0));
    return types;
  }
}
