import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsIntegrationsRoutingModule } from './account-settings-integrations-routing.module';
import { AccountSettingsSecurityModule } from '../account-settings-security/account-settings-security.module';
import { AccountSettingsIntegrationsComponent } from './pages/account-settings-integrations/account-settings-integrations.component';

@NgModule({
  declarations: [
    AccountSettingsIntegrationsComponent
  ],
  imports: [
    AccountSettingsIntegrationsRoutingModule,
    CommonModule
  ]
})
export class AccountSettingsIntegrationsModule { }
