import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMPANIES_API_ENDPOINT } from './companies-api-endpoint';
import { CompanyInvitation } from './company-invitation';
import { CompanyInvitationRequest } from './company-invitation-request';

@Injectable({
  providedIn: 'root'
})
export class CompanyInvitationsClient {
  constructor(private http: HttpClient, @Inject(COMPANIES_API_ENDPOINT) private endpoint: string) {}

  getInvitations(companyId: number) {
    return this.http.get<CompanyInvitation[]>(`${this.endpoint}/invitations/${companyId}/all`);
  }

  get(token: string) {
    return this.http.get<CompanyInvitation>(`${this.endpoint}/invitations/${token}`);
  }

  invite(companyId: number, responseUrl: string, request: CompanyInvitationRequest) {
    return this.http.post<void>(`${this.endpoint}/invitations/${companyId}/${encodeURIComponent(responseUrl)}`, request);
  }

  respond(token: string, accepted: boolean) {
    return this.http.put<void>(`${this.endpoint}/invitations/${token}/${accepted}`, undefined);
  }

  activate(email: string, userId: number) {
    return this.http.put<void>(`${this.endpoint}/invitations/${encodeURIComponent(email)}/${userId}/activate`, undefined);
  }

  delete(token: string) {
    return this.http.delete<void>(`${this.endpoint}/invitations/${token}`);
  }
}
