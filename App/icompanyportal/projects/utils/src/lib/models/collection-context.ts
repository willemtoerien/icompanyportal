import { Subject } from 'rxjs';

export class CollectionContext<T = any> {
  cease = new Subject<void>();
  isLoading = false;
  currentPage = 0;
  error: Error;
  items: T[] = [];
  hasMore = false;
  search: string;

  constructor(public title: string, public pageSize = 20) {}

  stop() {
    this.cease.next();
    this.cease.complete();
  }
}
