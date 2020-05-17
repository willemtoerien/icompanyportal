import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from '../auth-utils';
import { UnreadCountResolver } from '../notification-utils/services';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    resolve: {
      unreadCount: UnreadCountResolver
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'notifications'
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then((x) => x.NotificationsModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then((x) => x.AccountModule)
      },
      {
        path: 'companies',
        loadChildren: () => import('../companies/companies.module').then((x) => x.CompaniesModule)
      }
    ]
  },
  {
    path: 'token',
    children: [
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then((x) => x.AccountModule)
      },
      {
        path: 'companies',
        loadChildren: () => import('../companies/companies.module').then((x) => x.CompaniesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
