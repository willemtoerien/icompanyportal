// tslint:disable: no-string-literal

import { FormGroup } from '@angular/forms';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { finalize, catchError } from 'rxjs/operators';
import { throwError, EMPTY, ObservableInput } from 'rxjs';
import { extractModelState, invalidateForm } from './invoke-form-helpers';

export function invokeForm<T, O extends ObservableInput<T>>(formGroup: FormGroup) {
  formGroup['__isBusy'] = true;
  formGroup['__error'] = undefined;
  return pipeFromArray([
    finalize(() => (formGroup['__isBusy'] = false)),
    catchError<T, O>((error) => {
      if (error.status !== 400 && error.status !== 404) {
        formGroup['__error'] = {
          status: error.status,
          result: error.result,
          message: 'An unexpected server error has occurred.'
        };
        return throwError(error) as any;
      }
      const modelState = extractModelState(error);
      if (!modelState) {
        formGroup['__error'] = error;
        return throwError(error);
      }
      invalidateForm(formGroup, modelState);
      return EMPTY;
    })
  ]);
}
