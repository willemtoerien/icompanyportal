import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMPANIES_API_ENDPOINT } from './companies-api-endpoint';
import { CompanyUser } from '../models/company-user';
import { NotifyRequest } from 'notifications-api';
import { CompanyUserPermissionType } from '../models/company-user-permission-type';

@Injectable({
  providedIn: 'root'
})
export class CompanyUsersClient {
  constructor(private http: HttpClient, @Inject(COMPANIES_API_ENDPOINT) private endpoint: string) {}

  getAll(companyId: number) {
    return this.http.get<CompanyUser[]>(`${this.endpoint}/users/${companyId}/all`);
  }

  get(companyId: number) {
    return this.http.get<CompanyUser>(`${this.endpoint}/users/${companyId}`);
  }

  setPermission(companyId: number, userId: number, permissionType: CompanyUserPermissionType, isSet: boolean) {
    return this.http.put<void>(`${this.endpoint}/users/${companyId}/${userId}/${permissionType}/${isSet}`, undefined);
  }

  notify(companyId: number, request: NotifyRequest) {
    return this.http.post<void>(`${this.endpoint}/users/${companyId}/notify`, request);
  }

  delete(companyId: number, userId: number) {
    return this.http.delete<void>(`${this.endpoint}/users/${companyId}/${userId}`);
  }
}
