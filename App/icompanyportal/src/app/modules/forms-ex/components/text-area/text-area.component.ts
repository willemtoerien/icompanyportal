import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html'
})
export class TextAreaComponent implements AfterViewInit {
  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  description: string;

  @Input()
  rows = 3;

  @Input()
  isEnabled = true;

  @Input()
  labelAsPlaceholder: boolean;

  @ViewChild('input', { static: true })
  inputElement: ElementRef<HTMLInputElement>;

  get control() {
    return this.directive.form.get(this.name);
  }

  constructor(private directive: FormGroupDirective) {}

  ngAfterViewInit() {
    if (this.labelAsPlaceholder) {
      this.inputElement.nativeElement.placeholder = this.label;
    }
  }
}
