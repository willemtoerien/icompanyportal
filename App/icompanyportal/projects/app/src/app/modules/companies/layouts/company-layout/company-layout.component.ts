import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'company-utils';
import { CompaniesClient, Company, SubscriptionStatus } from 'companies-api';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './company-layout.component.html'
})
export class CompanyLayoutComponent implements OnInit {
  get company() {
    return (this.store.company as BehaviorSubject<Company>).value;
  }

  get context(): string {
    switch (this.company.subscription.status) {
      case SubscriptionStatus.active:
        return 'primary';
      case SubscriptionStatus.cancelled:
        return 'warning';
      case SubscriptionStatus.expired:
        return 'danger';
    }
  }

  constructor(public store: CompanyStore, private companiesClient: CompaniesClient) {}

  ngOnInit(): void {}

  toggleFavorite() {
    this.companiesClient.setFavorite(this.store.company.value.companyId).subscribe(() => this.store.updated.emit());
  }
}
