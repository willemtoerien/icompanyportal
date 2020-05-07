import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnreadCountDirective } from './directives/unread-count.directive';



@NgModule({
  declarations: [UnreadCountDirective],
  imports: [
    CommonModule
  ],
  exports: [UnreadCountDirective]
})
export class NotificationUtilsModule { }
