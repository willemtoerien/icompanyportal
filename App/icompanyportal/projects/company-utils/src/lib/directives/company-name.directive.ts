import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { CompanyStore } from '../services/company-store';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[libCompanyName]'
})
export class CompanyNameDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private elementRef: ElementRef<HTMLElement>, private store: CompanyStore) {}

  ngOnInit() {
    this.subscription = this.store.company.subscribe((company) => {
      this.elementRef.nativeElement.innerText = company ? company.name : '';
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
