import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input()
  isLight = false;

  @Input()
  brandTemplate: TemplateRef<HTMLElement>;

  @Input()
  sidebarContentTemplate: TemplateRef<HTMLElement>;
}
