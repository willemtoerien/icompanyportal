import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit {
  constructor(public store: CompanyStore) {}

  ngOnInit(): void {}
}
