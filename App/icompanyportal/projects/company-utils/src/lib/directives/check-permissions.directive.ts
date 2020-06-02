import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { CompanyUserPermissionType } from 'companies-api';
import { Subscription } from 'rxjs';
import { CompanyStore } from '../services/company-store';

@Directive({
  selector: '[libCheckPermissions]'
})
export class CheckPermissionsDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input()
  libCheckPermissions: CompanyUserPermissionType | CompanyUserPermissionType[];

  constructor(private templateRef: TemplateRef<any>, private container: ViewContainerRef, private store: CompanyStore) {}

  ngOnInit() {
    this.subscription = this.store.user.subscribe((user) => {
      let allow = true;
      if (user) {
        if (Array.isArray(this.libCheckPermissions)) {
          for (const permission of this.libCheckPermissions) {
            allow = allow && user.companyUserPermissions.filter((x) => x.type === permission)[0].isSet;
          }
        } else {
          allow = user.companyUserPermissions.filter((x) => x.type === this.libCheckPermissions)[0].isSet;
        }
      } else {
        allow = false;
      }

      this.container.clear();
      if (allow) {
        this.container.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
