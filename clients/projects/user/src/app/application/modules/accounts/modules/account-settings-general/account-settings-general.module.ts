import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/user/shared/shared.module';

import { NgIconsModule } from '@ng-icons/core';
import { heroPencil } from '@ng-icons/heroicons/outline';

import { AccountSettingsGeneralRoutingModule } from './account-settings-general-routing.module';
import { AccountSettingsGeneralComponent } from './pages/account-settings-general/account-settings-general.component';
import { AccountDetailsDisplayComponent } from './components/account-details-display/account-details-display.component';
import { AccountDetailsFormComponent } from './components/account-details-form/account-details-form.component';
import { SnButtonsModule } from '@sn/button';


@NgModule({
  declarations: [
    AccountSettingsGeneralComponent,
    AccountDetailsDisplayComponent,
    AccountDetailsFormComponent
  ],
  imports: [
    AccountSettingsGeneralRoutingModule,
    CommonModule,
    SharedModule,
    NgIconsModule.withIcons({
      heroPencil,
    }),
    SnButtonsModule,
  ]
})
export class AccountSettingsGeneralModule { }
