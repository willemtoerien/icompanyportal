import { catchError } from 'rxjs/operators';
import { throwError, EMPTY, ObservableInput } from 'rxjs';
import { Router } from '@angular/router';

export function notFound<T, O extends ObservableInput<T>>(action: () => void) {
  return catchError<T, O>((error) => {
    if (error.status !== 404) {
      return throwError(error) as any;
    }
    action();
    return EMPTY;
  });
}
