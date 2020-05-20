import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ImageInputData } from '../../models/image-input-data';

@Component({
  selector: 'lib-image-input',
  templateUrl: './image-input.component.html'
})
export class ImageInputComponent {
  @Input()
  name: string;

  @Input()
  label: string;

  @Input()
  description: string;

  @Input()
  src: string;

  @Input()
  canRemove: boolean;

  @Output()
  imageChanged = new EventEmitter<ImageInputData>();

  @Output()
  deleted = new EventEmitter<void>();

  onChange(event: Event) {
    const files: Blob[] = (event.target as any).files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (progressEvent) => {
      const result = (progressEvent.target as any).result;
      this.src = result;
      const values: string[] = result.split(';base64,');
      values[0] = values[0].replace('data:', '');
      this.imageChanged.emit({
        src: result,
        contentType: values[0],
        data: values[1]
      });
    };
    reader.readAsDataURL(file);
  }
}
