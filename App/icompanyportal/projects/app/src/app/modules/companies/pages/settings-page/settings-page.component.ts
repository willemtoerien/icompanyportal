import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent implements OnInit {
  constructor(public store: CompanyStore) {}

  ngOnInit(): void {}
}
