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
import { UtilsModule } from '../utils/utils.module';
import { FormsExModule } from '../forms-ex/forms-ex.module';
import { UsersLayoutComponent } from './layouts/users-layout/users-layout.component';

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
    UsersLayoutComponent
  ],
  imports: [CommonModule, CompaniesRoutingModule, UtilsModule, FormsExModule]
})
export class CompaniesModule {}
