import { SignInModalComponent } from './../components/modals/sign-in-modal/sign-in-modal.component';
import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private simpleModalService: SimpleModalService) {
    this.simpleModalService.addModal(SignInModalComponent, {
      data: {},
    });
  }
}
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();
