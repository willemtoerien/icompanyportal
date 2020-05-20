import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UtilsModule } from '../utils/utils.module';
import { AuthUtilsModule } from '../auth-utils/auth-utils.module';
import { CompanyFavoritesSidebarItemsComponent } from './components/company-favorites-sidebar-items/company-favorites-sidebar-items.component';
import { NotificationUtilsModule } from '../notification-utils/notification-utils.module';
import { CompanyUtilsModule } from '../company-utils/company-utils.module';

@NgModule({
  declarations: [MainLayoutComponent, CompanyFavoritesSidebarItemsComponent],
  imports: [CommonModule, MainRoutingModule, UtilsModule, AuthUtilsModule, NotificationUtilsModule, CompanyUtilsModule]
})
export class MainModule {}
