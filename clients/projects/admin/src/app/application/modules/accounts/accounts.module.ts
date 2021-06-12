import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAccountsComponent } from './pages/view-accounts/view-accounts.component';

import { AccountsRoutingModule } from './accounts-routing.module';

@NgModule({
  declarations: [
    ViewAccountsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
