import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyInvitationsClient, CompanyUserPermissionType, CompanyInvitationRequest } from 'companies-api';
import { invokeForm } from 'forms-ex';
import { CompanyStore, PERMISSION_DESCRIPTIONS } from 'company-utils';

@Component({
  templateUrl: './invite-page.component.html'
})
export class InvitePageComponent implements OnInit {
  isSent = false;

  form: FormGroup;

  permissions = PERMISSION_DESCRIPTIONS;

  permissionsValue: CompanyUserPermissionType[] = [];

  constructor(private builder: FormBuilder, private invitationsClient: CompanyInvitationsClient, private companiesStore: CompanyStore) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.isSent = false;
    const request: CompanyInvitationRequest = this.form.value;
    request.permissions = this.permissionsValue;
    this.invitationsClient
      .invite(this.companiesStore.company.value.companyId, location.origin + '/token/companies/value/{0}', request)
      .pipe(invokeForm(this.form))
      .subscribe(() => (this.isSent = true));
  }

  togglePermission(permission: CompanyUserPermissionType) {
    const index = this.permissionsValue.indexOf(permission);
    if (index >= 0) {
      this.permissionsValue.splice(index, 1);
    } else {
      this.permissionsValue.push(permission);
    }
  }

  getPermission(permission: CompanyUserPermissionType) {
    return this.permissionsValue.indexOf(permission) >= 0;
  }
}
