import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[libTimeout]'
})
export class TimeoutDirective implements OnInit {
  @Input()
  libTimeout: number;

  constructor(private el: TemplateRef<HTMLElement>, private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.viewContainer.clear();
    setTimeout(() => this.viewContainer.createEmbeddedView(this.el), this.libTimeout);
  }
}
