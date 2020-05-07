import { Injectable, EventEmitter } from '@angular/core';
import { Company, CompanyUser, CompanyInvitation } from 'companies-api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyStore {
  company = new BehaviorSubject<Company>(undefined);
  user = new BehaviorSubject<CompanyUser>(undefined);
  invitation = new BehaviorSubject<CompanyInvitation>(undefined);

  updated = new EventEmitter<void>();
}
