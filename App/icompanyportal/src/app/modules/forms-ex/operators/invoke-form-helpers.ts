// tslint:disable: no-string-literal

import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { IMap } from 'utils';

export function extractModelState(error: any): IMap<string[]> {
  if (error.error && typeof error.error !== 'string') {
    if (error.error.errors) {
      return error.error.errors;
    } else {
      return error.error;
    }
  }
}

export function invalidateForm(formGroup: FormGroup, modelState: IMap<string[]>) {
  // tslint:disable-next-line: forin
  for (const entryKey in modelState) {
    if (entryKey === '') {
      return throwError(new Error(modelState[entryKey][0]));
    }
    const entry = modelState[entryKey];
    const key = entryKey[0].toLowerCase() + entryKey.substring(1);
    const control = formGroup.get(key);
    if (!control) {
      console.error(`Validation failed:` + JSON.stringify(entry[0]));
      continue;
    }
    control.setErrors({
      server: entry[0]
    });
    control.markAsDirty();
  }
}
