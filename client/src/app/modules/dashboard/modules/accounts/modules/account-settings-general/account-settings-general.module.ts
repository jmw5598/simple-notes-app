import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsGeneralRoutingModule } from './account-settings-general-routing.module';
import { AccountSettingsGeneralComponent } from './pages/account-settings-general/account-settings-general.component';

@NgModule({
  declarations: [
    AccountSettingsGeneralComponent
  ],
  imports: [
    AccountSettingsGeneralRoutingModule,
    CommonModule
  ]
})
export class AccountSettingsGeneralModule { }
