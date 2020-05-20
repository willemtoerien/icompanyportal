import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AUTH_TOKEN_KEY, AuthInterceptor } from './modules/auth-utils';
import { NOTIFICATIONS_API_ENDPOINT, NOTIFICATIONS_API_AUTH_TOKEN } from 'notifications-api';
import { USERS_API_ENDPOINT } from 'users-api';
import { COMPANIES_API_ENDPOINT } from 'companies-api';
import { COMPANY_NOT_FOUND_ROUTE } from './modules/company-utils/services/company-not-found-route';
import { UtilsModule, APP_TITLE } from 'utils';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, UtilsModule],
  providers: [
    {
      provide: APP_TITLE,
      useValue: 'iCompanyPortal.com'
    },
    {
      provide: USERS_API_ENDPOINT,
      useValue: environment.apiEndpoints.users
    },
    {
      provide: NOTIFICATIONS_API_ENDPOINT,
      useValue: environment.apiEndpoints.notifications
    },
    {
      provide: NOTIFICATIONS_API_AUTH_TOKEN,
      useValue: () => localStorage.getItem(environment.authToken)
    },
    {
      provide: COMPANIES_API_ENDPOINT,
      useValue: environment.apiEndpoints.companies
    },
    {
      provide: COMPANY_NOT_FOUND_ROUTE,
      useValue: '/companies/not-found'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: AUTH_TOKEN_KEY,
      useValue: environment.authToken
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
