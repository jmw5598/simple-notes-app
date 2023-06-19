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

import { SnLoadingSpinnerModule } from 'projects/@sn/loading-spinner/src/public-api';
import { SnButtonsModule } from '@sn/button';
import { SnFormModule } from '@sn/form';
import { SnLinkModule } from '@sn/link';
import { SnCheckboxModule } from '@sn/checkbox';

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
    SnLoadingSpinnerModule,
    SnButtonsModule,
    SnFormModule,
    SnLinkModule,
    SnCheckboxModule,
  ]
})
export class AuthModule { }
