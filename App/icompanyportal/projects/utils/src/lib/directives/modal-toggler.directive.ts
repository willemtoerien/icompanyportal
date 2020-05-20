import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[libModalToggler]'
})
export class ModalTogglerDirective implements OnInit {
  @Input()
  libModalToggler: string;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.el.nativeElement.setAttribute('data-toggle', 'modal');
    this.el.nativeElement.setAttribute('data-target', `#${this.libModalToggler}`);
  }
}
