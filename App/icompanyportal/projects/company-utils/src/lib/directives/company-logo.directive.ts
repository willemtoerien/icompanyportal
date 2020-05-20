import { Directive, Input, ElementRef } from '@angular/core';
import { Company } from 'companies-api';

@Directive({
  selector: '[libCompanyLogo]'
})
export class CompanyLogoDirective {
  @Input()
  set libCompanyLogo(value: Company) {
    if (value.logo) {
      this.elementRef.nativeElement.src = `data:${value.logoContentType};base64,${value.logo}`;
    } else {
      this.elementRef.nativeElement.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(value.name)}`;
    }
  }

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}
}
