import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

export interface SelectOption {
  text: string | number;
  value?: any;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  description: string;

  @Input()
  isEnabled = true;

  @Input()
  options: SelectOption[] = [];

  get control() {
    return this.directive.form.get(this.name);
  }

  constructor(private directive: FormGroupDirective) {}

  isSelected(option: SelectOption) {
    // tslint:disable-next-line: triple-equals
    return option.value == this.control.value;
  }

  select(value) {
    this.control.setValue(value);
  }
}
