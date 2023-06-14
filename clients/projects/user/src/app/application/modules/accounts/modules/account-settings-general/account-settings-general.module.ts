import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroPencil } from '@ng-icons/heroicons/outline';

import { AccountSettingsGeneralRoutingModule } from './account-settings-general-routing.module';
import { AccountSettingsGeneralComponent } from './pages/account-settings-general/account-settings-general.component';
import { AccountDetailsDisplayComponent } from './components/account-details-display/account-details-display.component';
import { AccountDetailsFormComponent } from './components/account-details-form/account-details-form.component';
import { SnButtonsModule } from '@sn/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SnFormModule } from '@sn/form';


@NgModule({
  declarations: [
    AccountSettingsGeneralComponent,
    AccountDetailsDisplayComponent,
    AccountDetailsFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    AccountSettingsGeneralRoutingModule,
    CommonModule,
    NgIconsModule.withIcons({
      heroPencil,
    }),
    SnButtonsModule,
    SnFormModule,
  ]
})
export class AccountSettingsGeneralModule { }
