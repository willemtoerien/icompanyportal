import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CollectionContext } from '../../models/collection-context';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'lib-collection',
  templateUrl: './collection.component.html'
})
export class CollectionComponent implements OnInit {
  @Input()
  context: CollectionContext;

  @Input()
  itemTemplate: TemplateRef<any>;

  @Input()
  searchable: boolean;

  @Input()
  hasCustomSearch: boolean;

  @Output()
  loadMore = new EventEmitter();

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  async init() {
    const $ = (await import('jquery')).default;
    $(window).on('scroll', () => {
      if (
        $(window).scrollTop() >= $('#view-port').height() - $(window).height() &&
        this.context.items &&
        this.context.items.length > 0 &&
        this.context.hasMore &&
        !this.context.isLoading &&
        !this.context.error
      ) {
        this.loadMore.emit();
      }
    });
  }

  onSearch(value: string) {
    this.context.search = value;
    if (!this.hasCustomSearch) {
      this.context.currentPage = 0;
      this.context.items = [];
    }
    this.loadMore.emit();
  }
}
