import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMPANIES_API_ENDPOINT } from './companies-api-endpoint';
import { Company } from '../models/company';
import { SaveCompanyRequest } from '../models/save-company-request';

@Injectable({
  providedIn: 'root'
})
export class CompaniesClient {
  constructor(private http: HttpClient, @Inject(COMPANIES_API_ENDPOINT) private endpoint: string) {}

  isUniqueNameUnique(uniqueName: string) {
    return this.http.get<boolean>(`${this.endpoint}/${uniqueName}/is-unique`);
  }

  getCompanies(pageSize: number, page: number, search = '') {
    return this.http.get<Company[]>(`${this.endpoint}/${pageSize}/${page}?search=${encodeURIComponent(search)}`);
  }

  getFavorites() {
    return this.http.get<Company[]>(`${this.endpoint}/favorites`);
  }

  getCompany(companyId: number) {
    return this.http.get<Company>(`${this.endpoint}/${companyId}`);
  }

  export(companyId: number) {
    return this.http.get<Blob>(`${this.endpoint}/${companyId}/export`, { responseType: 'blob' as 'json' });
  }

  create(request: SaveCompanyRequest) {
    return this.http.post<number>(this.endpoint, request);
  }

  save(companyId: number, request: SaveCompanyRequest) {
    return this.http.put<void>(`${this.endpoint}/${companyId}`, request);
  }

  setFavorite(companyId: number, value?: boolean) {
    if (value) {
      return this.http.put<void>(`${this.endpoint}/${companyId}/favorite/${value}`, undefined);
    } else {
      return this.http.put<void>(`${this.endpoint}/${companyId}/favorite`, undefined);
    }
  }

  delete(companyId: number) {
    return this.http.delete<void>(`${this.endpoint}/${companyId}`);
  }

  deleteLogo(companyId: number) {
    return this.http.delete<void>(`${this.endpoint}/${companyId}/logo`);
  }
}
