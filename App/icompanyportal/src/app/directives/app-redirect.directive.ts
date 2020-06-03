import { Directive, ElementRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appAppRedirect]'
})
export class AppRedirectDirective implements OnInit {
  constructor(private el: ElementRef<HTMLAnchorElement>) {}

  ngOnInit() {
    this.el.nativeElement.href = environment.appEndpoint;
  }
}
