import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  static readonly requiredField = 'This field is required.';
  static readonly invalidEmail = 'This is not a valid email address.';

  private privateIsEnabled: boolean;

  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  description: string;

  @Input()
  labelAsPlaceholder = false;

  @Input()
  set isEnabled(value: boolean) {
    if (!this.control) {
      this.privateIsEnabled = value;
      return;
    }
    if (value) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }

  get isEnabled() {
    if (!this.control) {
      return this.privateIsEnabled;
    }
    return this.control.enabled;
  }

  get hasError() {
    if (!this.control) {
      return false;
    }
    return this.control.errors && (this.control.dirty || this.control.touched);
  }

  get errors() {
    if (!this.control) {
      return [];
    }
    const result: any[] = [];
    const control = this.control;
    // tslint:disable-next-line: forin
    for (const errorName in control.errors) {
      const messages = {
        required: InputComponent.requiredField,
        email: InputComponent.invalidEmail
      };
      const message = messages[errorName] ? messages[errorName] : control.errors[errorName];
      result.push({ errorName, message });
    }
    return result;
  }

  get isRequired() {
    if (!this.control) {
      return false;
    }
    if (!this.control.validator) {
      return false;
    }
    const result = this.control.validator(this.control);
    return result && result.required;
  }

  get control() {
    const control = this.directive.form.get(this.name);
    return control;
  }

  constructor(private directive: FormGroupDirective) {}
}
