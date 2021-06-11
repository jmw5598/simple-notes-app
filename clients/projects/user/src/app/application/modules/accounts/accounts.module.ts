import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/user/shared/shared.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { AccountUserCardComponent } from './components/account-user-card/account-user-card.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    AccountUserCardComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    TabsModule.forRoot()
  ]
})
export class AccountsModule { }
