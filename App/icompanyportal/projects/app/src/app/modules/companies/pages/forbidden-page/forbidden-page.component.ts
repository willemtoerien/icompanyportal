import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './forbidden-page.component.html',
  styles: []
})
export class ForbiddenPageComponent implements OnInit {
  get pageRoute() {
    return (this.activatedRoute.queryParams as BehaviorSubject<any>).value.pageRoute;
  }

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}
