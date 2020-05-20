import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {
  get email(): string {
    const queryParams = this.activatedRoute.queryParams as BehaviorSubject<any>;
    return queryParams.value.email;
  }

  constructor(private activatedRoute: ActivatedRoute) {}
}
