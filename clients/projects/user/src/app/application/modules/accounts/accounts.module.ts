import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/user/shared/shared.module';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { AccountUserCardComponent } from './components/account-user-card/account-user-card.component';

import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    AccountUserCardComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
  ]
})
export class AccountsModule { }
