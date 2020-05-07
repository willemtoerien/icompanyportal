import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appModalToggler]'
})
export class ModalTogglerDirective implements OnInit {
  @Input()
  appModalToggler: string;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.el.nativeElement.setAttribute('data-toggle', 'modal');
    this.el.nativeElement.setAttribute('data-target', `#${this.appModalToggler}`);
  }
}
