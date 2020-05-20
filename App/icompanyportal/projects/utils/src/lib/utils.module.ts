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
    PageLoadingIndicatorComponent
  ],
  imports: [CommonModule],
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
    PageLoadingIndicatorComponent
  ]
})
export class UtilsModule {}
