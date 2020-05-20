import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignedInUserResolver, UnauthGuard } from 'auth-utils';

const routes: Routes = [
  {
    path: '',
    resolve: {
      signedInUser: SignedInUserResolver
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/main/main.module').then((x) => x.MainModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((x) => x.AuthModule),
        canActivate: [UnauthGuard]
      },
      {
        path: 'account/token',
        loadChildren: () => import('./modules/account/account.module').then((x) => x.AccountModule)
      },
      {
        path: 'companies/token',
        loadChildren: () => import('./modules/companies/companies.module').then((x) => x.CompaniesModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
