import { OptionPickerComponent } from './../components/option-picker/option-picker.component';
import { RadialOptionsComponent } from './../components/radial-options/radial-options.component';
import { SignInModalComponent } from './../components/modals/sign-in-modal/sign-in-modal.component';
import { ModalBackgroundComponent } from './../components/modals/modal-background/modal-background.component';
import { DatatableComponent } from './../components/datatable/datatable.component';
import { BreadcrumbsComponent } from './../components/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './../components/header/header.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from 'src/pages/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    BreadcrumbsComponent,
    DatatableComponent,
    ModalBackgroundComponent,
    SignInModalComponent,
    RadialOptionsComponent,
    OptionPickerComponent,
    // FormsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    SimpleModalModule.forRoot({ container: 'main-app-body' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
