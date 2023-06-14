import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { AccountUserCardComponent } from './components/account-user-card/account-user-card.component';
import { SnSectionHeaderModule } from '@sn/section-header';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    AccountUserCardComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SnSectionHeaderModule,
  ]
})
export class AccountsModule { }
