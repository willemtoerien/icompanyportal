import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { UtilsModule } from 'utils';

@NgModule({
  declarations: [NotificationsPageComponent],
  imports: [CommonModule, NotificationsRoutingModule, UtilsModule]
})
export class NotificationsModule {}
