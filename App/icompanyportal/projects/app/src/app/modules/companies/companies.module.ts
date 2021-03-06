import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { SaveCompanyFormComponent } from './components/save-company-form/save-company-form.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { InvitationsPageComponent } from './pages/invitations-page/invitations-page.component';
import { InvitePageComponent } from './pages/invite-page/invite-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { UtilsModule } from 'utils';
import { FormsExModule } from 'forms-ex';
import { UsersLayoutComponent } from './layouts/users-layout/users-layout.component';
import { CompanyUtilsModule } from 'company-utils';
import { ConfirmPageComponent } from './pages/confirm-page/confirm-page.component';
import { ExportPageComponent } from './pages/export-page/export-page.component';
import { ForbiddenPageComponent } from './pages/forbidden-page/forbidden-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SubscriptionPageComponent } from './pages/subscription-page/subscription-page.component';
import { SubscribePageComponent } from './pages/subscribe-page/subscribe-page.component';

@NgModule({
  declarations: [
    CompanyLayoutComponent,
    CompaniesPageComponent,
    SaveCompanyFormComponent,
    CreatePageComponent,
    EditPageComponent,
    SettingsPageComponent,
    UsersPageComponent,
    InvitationsPageComponent,
    InvitePageComponent,
    DeletePageComponent,
    UsersLayoutComponent,
    ConfirmPageComponent,
    ExportPageComponent,
    ForbiddenPageComponent,
    NotFoundPageComponent,
    SubscriptionPageComponent,
    SubscribePageComponent
  ],
  imports: [CommonModule, CompaniesRoutingModule, UtilsModule, FormsExModule, CompanyUtilsModule]
})
export class CompaniesModule {}
