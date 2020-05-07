import { Observable, of } from 'rxjs';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export class FormValidators {
  static isUnique(call: (value) => Observable<boolean>, errorMessage?: string, originalValue?): AsyncValidatorFn {
    return (control) => {
      if (!control.value) {
        return of(null);
      }
      if (originalValue && originalValue.toLowerCase() === control.value.toLowerCase()) {
        return of(null);
      }
      if (!errorMessage) {
        errorMessage = `The field provided is not unique`;
      }
      return call(control.value).pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((isUnique) => {
          const error = {
            isUnique: errorMessage
          };
          return isUnique ? null : error;
        })
      );
    };
  }

  static compare(comparisonControlName: string, errorMessage?: string): ValidatorFn {
    return (control) => {
      if (!errorMessage) {
        errorMessage = `Does not match with ${comparisonControlName}.`;
      }
      if (!control.parent) {
        return null;
      }
      const otherControl = control.parent.get(comparisonControlName);
      if (otherControl.value.toLowerCase() !== control.value.toLowerCase()) {
        return {
          unmatched: errorMessage
        };
      }
      return null;
    };
  }
}
