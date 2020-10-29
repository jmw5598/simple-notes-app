import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsSecurityRoutingModule } from './account-settings-security-routing.module';
import { AccountSettingsSecurityComponent } from './pages/account-settings-security/account-settings-security.component';

@NgModule({
  declarations: [
    AccountSettingsSecurityComponent
  ],
  imports: [
    AccountSettingsSecurityRoutingModule,
    CommonModule
  ]
})
export class AccountSettingsSecurityModule { }
