import { Component, OnInit } from '@angular/core';
import { UsersClient } from 'users-api';
import { AuthTokenHelper } from 'src/app/modules/auth-utils/services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './delete-page.component.html',
  styles: []
})
export class DeletePageComponent {
  constructor(private usersClient: UsersClient, private authTokenHelper: AuthTokenHelper) {}

  onDelete() {
    this.usersClient.delete().subscribe(() => {
      this.authTokenHelper.value = undefined;
    });
  }
}