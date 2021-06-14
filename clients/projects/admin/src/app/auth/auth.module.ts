import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoggingInComponent } from './pages/logging-in/logging-in.component';
import { AppLoadingComponent } from './components/app-loading/app-loading.component';
import { AuthComponent } from './auth.component';
import { AuthMarketingComponent } from './components/auth-marketing/auth-marketing.component';

import { AuthRoutingModule } from './auth-routing.module';

import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    LoggingInComponent,
    AppLoadingComponent,
    AuthComponent,
    AuthMarketingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedComponentsModule,
  ]
})
export class AuthModule { }
