import { Component, OnInit } from '@angular/core';
import { CompaniesClient } from 'companies-api';
import { Router } from '@angular/router';
import { CompanyStore } from 'src/app/modules/company-utils/services';

@Component({
  templateUrl: './delete-page.component.html',
  styles: []
})
export class DeletePageComponent {
  constructor(private companiesClient: CompaniesClient, private companiesStore: CompanyStore, private router: Router) {}

  onDelete() {
    this.companiesClient.delete(this.companiesStore.company.value.companyId).subscribe(() => {
      this.companiesStore.updated.emit();
      this.router.navigateByUrl('/companies');
    });
  }
}