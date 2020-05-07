import { Subject } from 'rxjs';

export class CollectionContext {
  cease = new Subject<void>();
  isLoading = false;
  currentPage = 0;
  error: Error;
  items: any[] = [];
  hasMore = false;

  constructor(public title: string, public pageSize = 20) {}

  stop() {
    this.cease.next();
    this.cease.complete();
  }
}
