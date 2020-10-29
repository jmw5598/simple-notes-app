import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsIntegrationsRoutingModule } from './account-settings-integrations-routing.module';
import { AccountSettingsIntegrationsComponent } from './pages/account-settings-integrations/account-settings-integrations.component';
import { CalendarIntegrationComponent } from './components/calendar-integration/calendar-integration.component';

@NgModule({
  declarations: [
    AccountSettingsIntegrationsComponent,
    CalendarIntegrationComponent
  ],
  imports: [
    AccountSettingsIntegrationsRoutingModule,
    CommonModule
  ]
})
export class AccountSettingsIntegrationsModule { }
