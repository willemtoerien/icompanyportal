import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyInvitationsClient } from 'companies-api';
import { invokeForm } from 'forms-ex';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './invite-page.component.html'
})
export class InvitePageComponent implements OnInit {
  isSent = false;

  form: FormGroup;

  constructor(private builder: FormBuilder, private invitationsClient: CompanyInvitationsClient, private companiesStore: CompanyStore) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.isSent = false;
    this.invitationsClient
      .invite(this.companiesStore.company.value.companyId, location.origin + '/token/companies/value/{0}', this.form.value)
      .pipe(invokeForm(this.form))
      .subscribe(() => (this.isSent = true));
  }
}
