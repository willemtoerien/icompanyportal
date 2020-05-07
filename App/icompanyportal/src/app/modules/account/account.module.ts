import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { DeletePageComponent } from './pages/delete-page/delete-page.component';
import { UtilsModule } from 'utils';
import { ConfirmPageComponent } from './pages/confirm-page/confirm-page.component';
import { FormsExModule } from '../forms-ex/forms-ex.module';

@NgModule({
  declarations: [AccountPageComponent, EditPageComponent, DeletePageComponent, ConfirmPageComponent],
  imports: [CommonModule, AccountRoutingModule, UtilsModule, FormsExModule]
})
export class AccountModule {}
