import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BreadcrumbItem } from '../../models/breadcrumb-item';

@Component({
  selector: 'lib-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  breadcrumbItems: BreadcrumbItem[] = [];

  @Input()
  set items(value: string[]) {
    this.breadcrumbItems = value.map((x) => BreadcrumbItem.parse(x));
  }

  isActive(item: BreadcrumbItem) {
    return this.breadcrumbItems.length - 1 === this.breadcrumbItems.indexOf(item);
  }
}
