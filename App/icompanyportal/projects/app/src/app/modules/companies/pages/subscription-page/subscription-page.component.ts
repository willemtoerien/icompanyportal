import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'company-utils';
import { BehaviorSubject } from 'rxjs';
import { Company } from 'companies-api';

@Component({
  templateUrl: './subscription-page.component.html',
  styles: []
})
export class SubscriptionPageComponent implements OnInit {
  get company() {
    return (this.store.company as BehaviorSubject<Company>).value;
  }

  constructor(public store: CompanyStore) {}

  ngOnInit(): void {}
}
