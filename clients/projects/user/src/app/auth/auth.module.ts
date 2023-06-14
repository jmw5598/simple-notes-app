import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthMarketingComponent } from './components/auth-marketing/auth-marketing.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegistrationAccountFormComponent } from './components/registration-account-form/registration-account-form.component';
import { RegistrationAddressFormComponent } from './components/registration-address-form/registration-address-form.component';
import { RegistrationProfileFormComponent } from './components/registration-profile-form/registration-profile-form.component';
import { RegistrationResultComponent } from './components/registration-result/registration-result.component';
import { RegistrationUserFormComponent } from './components/registration-user-form/registration-user-form.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordRequestComponent } from './pages/password-request/password-request.component';
import { LoggingInComponent } from './pages/logging-in/logging-in.component';
import { AppLoadingComponent } from './components/app-loading/app-loading.component';

import { SnButtonsModule } from '@sn/button';
import { SnAlertModule } from '@sn/alert';
import { SnLoadingSpinnerModule } from '@sn/loading-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { SnCheckboxModule } from '@sn/checkbox';
import { SnFormModule } from '@sn/form';

@NgModule({
  declarations: [
    AuthComponent,
    AuthMarketingComponent,
    LoginComponent,
    RegisterComponent,
    RegistrationAccountFormComponent,
    RegistrationAddressFormComponent,
    RegistrationProfileFormComponent,
    RegistrationResultComponent,
    RegistrationUserFormComponent,
    LogoutComponent,
    PasswordResetComponent,
    PasswordRequestComponent,
    LoggingInComponent,
    AppLoadingComponent,
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SnButtonsModule,
    SnAlertModule,
    SnLoadingSpinnerModule,
    SnCheckboxModule,
    SnFormModule,
  ]
})
export class AuthModule { }
