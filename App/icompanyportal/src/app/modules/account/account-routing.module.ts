import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { ConfirmPageComponent } from './pages/confirm-page/confirm-page.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPageComponent
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
    path: 'confirm/:type/:token',
    component: ConfirmPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
