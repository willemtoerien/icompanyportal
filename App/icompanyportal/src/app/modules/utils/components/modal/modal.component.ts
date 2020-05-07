import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterViewInit {
  private answer = false;

  @Input()
  identity: string;

  @Input()
  modalTitle: string;

  @Input()
  submitText = 'Okay';

  @Input()
  closeText = 'Cancel';

  @Input()
  colorContext = 'primary';

  @Input()
  customFooter: TemplateRef<any>;

  @Output()
  answered = new EventEmitter<boolean>();

  constructor() {}

  ngAfterViewInit() {
    $(`#${this.identity}`).on('hidden.bs.modal', () => {
      this.answered.emit(this.answer);
    });
  }

  onSubmit() {
    this.answer = true;
    $(`#${this.identity}`).modal('hide');
  }
}
