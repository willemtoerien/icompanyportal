import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CollectionContext } from '../../models/collection-context';

@Component({
  selector: 'lib-collection',
  templateUrl: './collection.component.html'
})
export class CollectionComponent {
  @Input()
  context: CollectionContext;

  @Input()
  itemTemplate: TemplateRef<any>;

  @Output()
  loadMore = new EventEmitter();
}
