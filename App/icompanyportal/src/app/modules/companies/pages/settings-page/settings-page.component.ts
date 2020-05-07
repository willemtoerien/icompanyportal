import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'src/app/modules/company-utils/services';

@Component({
  templateUrl: './settings-page.component.html',
  styles: []
})
export class SettingsPageComponent implements OnInit {
  constructor(public store: CompanyStore) {}

  ngOnInit(): void {}
}
