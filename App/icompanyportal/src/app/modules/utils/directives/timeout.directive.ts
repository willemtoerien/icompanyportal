import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTimeout]'
})
export class TimeoutDirective implements OnInit {
  @Input()
  appTimeout: number;

  constructor(private el: TemplateRef<HTMLElement>, private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainer.clear();
    setTimeout(() => this.viewContainer.createEmbeddedView(this.el), this.appTimeout);
  }
}
