import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyLayoutComponent } from './layouts/company-layout/company-layout.component';
import { CompanyResolver, CompanyInvitationResolver } from '../company-utils/services';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { InvitationsPageComponent } from './pages/invitations-page/invitations-page.component';
import { InvitePageComponent } from './pages/invite-page/invite-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { UsersLayoutComponent } from './layouts/users-layout/users-layout.component';
import { ConfirmPageComponent } from './pages/confirm-page/confirm-page.component';

const routes: Routes = [
  {
    path: '',
    component: CompaniesPageComponent
  },
  {
    path: 'create',
    component: CreatePageComponent,
    resolve: {
      company: CompanyResolver
    }
  },
  {
    path: 'value/:token',
    component: ConfirmPageComponent,
    resolve: {
      invitation: CompanyInvitationResolver
    }
  },
  {
    path: 'not-found'
  },
  {
    path: ':companyId',
    component: CompanyLayoutComponent,
    resolve: {
      company: CompanyResolver
    },
    children: [
      {
        path: 'settings',
        children: [
          {
            path: '',
            component: SettingsPageComponent
          },
          {
            path: 'edit',
            component: EditPageComponent
          },
          {
            path: 'delete',
            component: DeletePageComponent
          },
          {
            path: 'users',
            component: UsersLayoutComponent,
            children: [
              {
                path: '',
                component: UsersPageComponent
              },
              {
                path: 'invitations',
                component: InvitationsPageComponent
              },
              {
                path: 'invitations/invite',
                component: InvitePageComponent
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {}
