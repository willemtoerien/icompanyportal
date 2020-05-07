import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'src/app/modules/company-utils/services';

@Component({
  templateUrl: './edit-page.component.html',
  styles: []
})
export class EditPageComponent implements OnInit {
  constructor(public store: CompanyStore) {}

  ngOnInit(): void {}
}
