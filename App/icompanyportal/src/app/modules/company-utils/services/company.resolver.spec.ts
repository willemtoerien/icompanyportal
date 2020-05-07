import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { COMPANY_NOT_FOUND_ROUTE } from './company-not-found-route';
import { CompanyResolver } from './company.resolver';
import { CompanyStore } from '../services';
import { CompaniesClient, CompanyUsersClient, COMPANIES_API_ENDPOINT } from 'companies-api';
import { HttpResponse } from '@angular/common/http';

describe('CompanyResolver', () => {
  let store: CompanyStore;
  let companiesClient: CompaniesClient;
  let companyUsersClient: CompanyUsersClient;
  let resolver: CompanyResolver;
  let mock: HttpTestingController;

  beforeEach(async () => {
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: COMPANIES_API_ENDPOINT,
          useValue: ''
        },
        {
          provide: COMPANY_NOT_FOUND_ROUTE,
          useValue: 'not-found'
        }
      ]
    });

    mock = TestBed.inject(HttpTestingController);
    store = testBed.inject(CompanyStore);
    companiesClient = testBed.inject(CompaniesClient);
    companyUsersClient = testBed.inject(CompanyUsersClient);
    resolver = testBed.inject(CompanyResolver);
  });

  it('undefined companyId cleans the store', async () => {
    const route: any = {
      params: {
        companyId: undefined
      }
    };
    store.company.next({});
    store.user.next({});
    await resolver.resolve(route).toPromise();
    expect(store.company.value).toBeUndefined();
    expect(store.user.value).toBeUndefined();
  });

  it('invalid companyId throws error', async () => {
    const route: any = {
      params: {
        companyId: 'ABC'
      }
    };
    try {
      await resolver.resolve(route).toPromise();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(CompanyResolver.invalidCompanyId);
    }
  });

  it('existing company will not be retrieved again', () => {
    const route: any = {
      params: {
        companyId: 1
      }
    };
    store.company.next({ companyId: 1 });
    resolver.resolve(route).subscribe();
    expect(store.company.value).toBeDefined();
    expect(store.company.value.companyId).toBe(1);
  });

  it('company will be retrieved correctly with a user', () => {
    const route: any = {
      params: {
        companyId: 1
      }
    };
    resolver.resolve(route).subscribe();

    const companyReq = mock.expectOne('/1');
    expect(companyReq.request.method).toBe('GET');
    companyReq.flush({ companyId: 1 });

    const companyUserReq = mock.expectOne('/users/1');
    expect(companyUserReq.request.method).toBe('GET');
    companyUserReq.flush({ userId: 1 });

    expect(store.company.value).toBeDefined();
    expect(store.company.value.companyId).toBe(1);

    expect(store.user.value).toBeDefined();
    expect(store.user.value.userId).toBe(1);
  });

  it('company will be retrieved correctly without a user', () => {
    const route: any = {
      params: {
        companyId: 1
      }
    };
    resolver.resolve(route).subscribe();

    const companyReq = mock.expectOne('/1');
    expect(companyReq.request.method).toBe('GET');
    companyReq.flush({ companyId: 1 });

    const companyUserReq = mock.expectOne('/users/1');
    expect(companyUserReq.request.method).toBe('GET');
    companyUserReq.event(
      new HttpResponse({
        body: undefined
      })
    );

    expect(store.company.value).toBeDefined();
    expect(store.company.value.companyId).toBe(1);

    expect(store.user.value).toBeNull();
  });
});
