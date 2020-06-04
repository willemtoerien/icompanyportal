import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'company-utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent implements OnInit {
  constructor(public store: CompanyStore, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
