import { Component } from '@angular/core';
import { CompanyStore } from 'company-utils';

@Component({
  templateUrl: './users-layout.component.html'
})
export class UsersLayoutComponent {
  constructor(public store: CompanyStore) {}
}
