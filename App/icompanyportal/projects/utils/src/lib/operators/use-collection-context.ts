import { CollectionContext } from '../models/collection-context';
import { ObservableInput, throwError, Observable } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { finalize, takeUntil, catchError, tap } from 'rxjs/operators';

export function useCollectionContext<T>(context: CollectionContext<T>, addItems = true) {
  const operators: any[] = [
    finalize(() => (context.isLoading = false)),
    takeUntil(context.cease),
    catchError((error) => {
      context.error = error;
      return throwError(error);
    })
  ];
  if (addItems) {
    operators.push(
      tap((items: T[]) => {
        for (const item of items) {
          context.items.push(item);
        }
      })
    );
  }
  return pipeFromArray<Observable<T[]>, Observable<T[]>>(operators);
}
