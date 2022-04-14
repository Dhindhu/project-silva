import { ApiService } from './../../../services/api.service';
import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent extends SimpleModalComponent<{}, boolean> {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private simpleModalService: SimpleModalService
  ) {
    super();
  }
  uid?: string | undefined;
  state = false;
  email = 'example@gmail.com';
  accessLevel: any;
  toggleState() {
    this.state = !this.state;
  }
  get user() {
    return 1;
  }

  setAccessLevel(event: any) {
    console.log(event);
    this.accessLevel = event;
  }
  async signIn() {
    this.apiService.accessLevel = this.accessLevel.level;
    this.apiService.email = this.email;

    this.closer();
  }

  async useGoogle() {}

  closer = () => {
    this.close();
  };
  ngOnInit() {}
}
