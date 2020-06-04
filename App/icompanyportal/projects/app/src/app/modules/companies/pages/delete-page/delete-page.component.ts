import { Component, OnInit } from '@angular/core';
import { CompaniesClient } from 'companies-api';
import { Router } from '@angular/router';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './delete-page.component.html'
})
export class DeletePageComponent {
  constructor(private companiesClient: CompaniesClient, public store: CompanyStore, private router: Router) {}

  onDelete() {
    this.companiesClient.delete(this.store.company.value.companyId).subscribe(() => {
      this.store.updated.emit();
      this.router.navigateByUrl('/companies');
    });
  }
}
