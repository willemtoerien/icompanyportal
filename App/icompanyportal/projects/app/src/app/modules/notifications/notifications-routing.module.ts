import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
