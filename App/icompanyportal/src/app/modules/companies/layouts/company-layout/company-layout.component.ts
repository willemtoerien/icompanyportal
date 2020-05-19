import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'src/app/modules/company-utils/services';
import { CompaniesClient } from 'companies-api';

@Component({
  templateUrl: './company-layout.component.html',
  styles: []
})
export class CompanyLayoutComponent implements OnInit {
  constructor(public store: CompanyStore, private companiesClient: CompaniesClient) {}

  ngOnInit(): void {}

  toggleFavorite() {
    this.companiesClient.setFavorite(this.store.company.value.companyId).subscribe(() => this.store.updated.emit());
  }
}
