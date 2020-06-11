import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Company, SubscriptionsClient, SubscriptionPlansClient, SubscriptionPlanType, SubscriptionLength } from 'companies-api';
import { CompanyStore } from 'company-utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectOption } from 'forms-ex';
import { getSubscriptionPlanTypeName } from 'projects/company-utils/src/public-api';

@Component({
  templateUrl: './subscribe-page.component.html',
  styles: []
})
export class SubscribePageComponent implements OnInit {
  form: FormGroup;

  get company() {
    return (this.store.company as BehaviorSubject<Company>).value;
  }

  get types(): SelectOption[] {
    return [
      { text: getSubscriptionPlanTypeName(SubscriptionPlanType.basic), value: SubscriptionPlanType.basic },
      { text: getSubscriptionPlanTypeName(SubscriptionPlanType.plus), value: SubscriptionPlanType.plus },
      { text: getSubscriptionPlanTypeName(SubscriptionPlanType.professional), value: SubscriptionPlanType.professional },
      { text: getSubscriptionPlanTypeName(SubscriptionPlanType.enterprise), value: SubscriptionPlanType.enterprise }
    ];
  }

  get lengths(): SelectOption[] {
    return [
      { text: 'Monthly', value: SubscriptionLength.monthly },
      { text: 'Anually', value: SubscriptionLength.anually }
    ];
  }

  constructor(
    public store: CompanyStore,
    private builder: FormBuilder,
    private subscriptions: SubscriptionsClient,
    private plans: SubscriptionPlansClient
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      type: [this.company.subscription ? this.company.subscription.type : SubscriptionPlanType.basic],
      length: [this.company.subscription ? this.company.subscription.length : SubscriptionLength.monthly]
    });
  }

  onSubmit() {}
}
