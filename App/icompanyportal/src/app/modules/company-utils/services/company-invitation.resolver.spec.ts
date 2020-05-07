import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyStore, CompanyInvitationResolver } from '../services';
import { COMPANIES_API_ENDPOINT, CompanyInvitationsClient, CompanyInvitation } from 'companies-api';
import { HttpResponse } from '@angular/common/http';

describe('CompanyInvitationResolver', () => {
  let store: CompanyStore;
  let invitationsClient: CompanyInvitationsClient;
  let resolver: CompanyInvitationResolver;
  let mock: HttpTestingController;

  beforeEach(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: COMPANIES_API_ENDPOINT,
          useValue: ''
        }
      ]
    });

    mock = TestBed.inject(HttpTestingController);
    store = testBed.inject(CompanyStore);
    invitationsClient = testBed.inject(CompanyInvitationsClient);
    resolver = testBed.inject(CompanyInvitationResolver);
  });

  it('undefined token cleans the store', () => {
    const route: any = {
      params: {
        token: 'token'
      }
    };
    resolver.resolve(route).subscribe();
    expect(store.invitation.value).toBeUndefined();
  });

  it('invalid token sent clean the store', () => {
    const route: any = {
      params: {
        token: 'token'
      }
    };
    resolver.resolve(route).subscribe();

    const req = mock.expectOne('/invitations/token');
    expect(req.request.method).toBe('GET');
    req.event(
      new HttpResponse({
        body: undefined
      })
    );

    expect(store.invitation.value).toBeDefined();
  });

  it('valid token sent', () => {
    const route: any = {
      params: {
        token: 'token'
      }
    };
    resolver.resolve(route).subscribe();

    const req = mock.expectOne('/invitations/token');
    expect(req.request.method).toBe('GET');
    const result: CompanyInvitation = {
      companyId: 1
    };
    req.flush(result);

    expect(store.invitation.value).toBeDefined();
    expect(store.invitation.value.companyId).toBe(1);
  });
});
