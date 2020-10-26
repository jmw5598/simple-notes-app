import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { AccountSettingsGeneralRoutingModule } from './account-settings-general-routing.module';
import { AccountSettingsGeneralComponent } from './pages/account-settings-general/account-settings-general.component';
import { AccountDetailsDisplayComponent } from './components/account-details-display/account-details-display.component';
import { AccountDetailsFormComponent } from './components/account-details-form/account-details-form.component';

@NgModule({
  declarations: [
    AccountSettingsGeneralComponent,
    AccountDetailsDisplayComponent,
    AccountDetailsFormComponent
  ],
  imports: [
    AccountSettingsGeneralRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AccountSettingsGeneralModule { }
