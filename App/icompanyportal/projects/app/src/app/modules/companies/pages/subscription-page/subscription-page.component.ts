import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'company-utils';
import { BehaviorSubject } from 'rxjs';
import { Company, SubscriptionsClient, SubscriptionStatus, SubscriptionLength } from 'companies-api';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './subscription-page.component.html',
  styles: []
})
export class SubscriptionPageComponent implements OnInit {
  isCancelling = false;

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

  constructor(public store: CompanyStore, private subscriptions: SubscriptionsClient) {}

  ngOnInit(): void {}

  onCancel() {
    this.isCancelling = true;
    this.subscriptions
      .cancel(this.company.companyId)
      .pipe(finalize(() => (this.isCancelling = false)))
      .subscribe(() => {
        const company = this.company;
        company.subscription.status = SubscriptionStatus.cancelled;
        this.store.company.next(company);
      });
  }
}
