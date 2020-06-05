import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleDirective, ModalTogglerDirective, TimeoutDirective } from './directives';
import {
  CardMenuComponent,
  SidebarComponent,
  NavbarComponent,
  CollectionComponent,
  ModalComponent,
  InitialLoadingComponent,
  PageLoadingIndicatorComponent
} from './components';
import { TimeAgoPipe, TimeSpanPipe, TrustResourcePipe } from './pipes';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { ApplicationTitleDirective } from './directives/application-title.directive';

@NgModule({
  declarations: [
    TitleDirective,
    CardMenuComponent,
    SidebarComponent,
    NavbarComponent,
    CollectionComponent,
    ModalComponent,
    ModalTogglerDirective,
    TimeoutDirective,
    TimeAgoPipe,
    TimeSpanPipe,
    TrustResourcePipe,
    InitialLoadingComponent,
    PageLoadingIndicatorComponent,
    BreadcrumbComponent,
    ApplicationTitleDirective
  ],
  imports: [CommonModule, RouterModule],
  providers: [Title],
  exports: [
    TitleDirective,
    CardMenuComponent,
    SidebarComponent,
    NavbarComponent,
    CollectionComponent,
    ModalComponent,
    ModalTogglerDirective,
    TimeoutDirective,
    TimeAgoPipe,
    TimeSpanPipe,
    TrustResourcePipe,
    InitialLoadingComponent,
    PageLoadingIndicatorComponent,
    BreadcrumbComponent,
    ApplicationTitleDirective
  ]
})
export class UtilsModule {}
