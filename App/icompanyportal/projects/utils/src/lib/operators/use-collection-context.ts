import { CollectionContext } from '../models/collection-context';
import { ObservableInput, throwError, Observable, MonoTypeOperatorFunction } from 'rxjs';
import { pipeFromArray, pipe } from 'rxjs/internal/util/pipe';
import { finalize, takeUntil, catchError, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

export function useCollectionContext<T>(context: CollectionContext<T>): MonoTypeOperatorFunction<T[]> {
  context.error = undefined;
  context.isLoading = true;
  return pipeFromArray([
    finalize(() => {
      context.currentPage++;
      context.isLoading = false;
    }),
    takeUntil(context.cease),
    debounceTime(200),
    distinctUntilChanged(),
    catchError((error) => {
      context.error = error;
      return throwError(error);
    }),
    tap((items: T[]) => {
      context.hasMore = items.length === context.pageSize;
      for (const item of items) {
        context.items.push(item);
      }
    })
  ]) as any;
}
