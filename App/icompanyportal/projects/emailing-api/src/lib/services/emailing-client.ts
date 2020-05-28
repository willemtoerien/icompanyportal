import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMAILING_API_ENDPOINT } from './emailing-api-endpoint';
import { EmailRequest } from '../models/email-request';

@Injectable({
  providedIn: 'root'
})
export class EmailingClient {
  constructor(private http: HttpClient, @Inject(EMAILING_API_ENDPOINT) private endpoint: string) {}

  send(request: EmailRequest) {
    return this.http.post<void>(this.endpoint, request);
  }
}
