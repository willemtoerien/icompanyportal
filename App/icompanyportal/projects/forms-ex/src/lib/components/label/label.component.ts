import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'lib-label',
  templateUrl: './label.component.html',
  styles: []
})
export class LabelComponent {
  @Input()
  label: string;

  @Input()
  description: string;

  @Input()
  labelAsPlaceholder = false;

  @Input()
  value: string;

  constructor() {}
}
