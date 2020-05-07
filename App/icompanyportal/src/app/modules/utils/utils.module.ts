import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleDirective } from './directives/title.directive';
import { CardMenuComponent } from './components/card-menu/card-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalTogglerDirective } from './directives/modal-toggler.directive';
import { TimeoutDirective } from './directives/timeout.directive';
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
    TimeoutDirective
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
    TimeoutDirective
  ]
})
export class UtilsModule {}