import { Component, OnInit } from '@angular/core';
import { CompanyStore } from 'src/app/modules/company-utils/services';

@Component({
  templateUrl: './company-layout.component.html',
  styles: []
})
export class CompanyLayoutComponent implements OnInit {
  constructor(public store: CompanyStore) {}

  ngOnInit(): void {}
}
