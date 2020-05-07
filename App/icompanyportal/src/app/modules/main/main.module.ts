import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UtilsModule } from '../utils/utils.module';
import { AuthUtilsModule } from '../auth-utils/auth-utils.module';
import { CompanyFavoritesSidebarItemsComponent } from './components/company-favorites-sidebar-items/company-favorites-sidebar-items.component';

@NgModule({
  declarations: [MainLayoutComponent, CompanyFavoritesSidebarItemsComponent],
  imports: [CommonModule, MainRoutingModule, UtilsModule, AuthUtilsModule]
})
export class MainModule {}
