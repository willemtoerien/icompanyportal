import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Company,
  SubscriptionsClient,
  SubscriptionPlansClient,
  SubscriptionPlanType,
  SubscriptionLength,
  SubscriptionRequest
} from 'companies-api';
import { CompanyStore } from 'company-utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectOption, invokeForm } from 'forms-ex';
import { getSubscriptionPlanTypeName } from 'projects/company-utils/src/public-api';
import { Router, ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { getSubscriptionLengthName } from 'company-utils';

@Component({
  templateUrl: './subscribe-page.component.html',
  styles: []
})
export class SubscribePageComponent implements OnInit {
  currencyCode = 'USD';
  form: FormGroup;
  amount: number | undefined;

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
      { text: getSubscriptionLengthName(SubscriptionLength.monthly), value: SubscriptionLength.monthly },
      { text: getSubscriptionLengthName(SubscriptionLength.anually), value: SubscriptionLength.anually }
    ];
  }

  constructor(
    public store: CompanyStore,
    private builder: FormBuilder,
    private subscriptions: SubscriptionsClient,
    private plans: SubscriptionPlansClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      type: [this.company.subscription ? this.company.subscription.type : SubscriptionPlanType.basic],
      length: [this.company.subscription ? this.company.subscription.length : SubscriptionLength.monthly]
    });

    this.form.valueChanges.subscribe((value) => {
      this.amount = undefined;
      this.plans.getAmount(this.currencyCode, value.type, value.length).subscribe((amount) => (this.amount = amount));
    });
  }

  onSubmit() {
    const request: SubscriptionRequest = this.form.value;
    request.currencyCode = this.currencyCode;
    this.subscriptions
      .subscribe(this.company.companyId, request)
      .pipe(
        invokeForm(this.form),
        flatMap(() => this.subscriptions.get(this.company.companyId))
      )
      .subscribe((subscription) => {
        const company = this.company;
        company.subscription = subscription;
        this.store.company.next(company);
        this.router.navigate(['../'], {
          relativeTo: this.activatedRoute
        });
      });
  }
}
