import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAccountsComponent } from './pages/view-accounts/view-accounts.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
  declarations: [
    ViewAccountsComponent,
    AccountsListComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedComponentsModule
  ]
})
export class AccountsModule { }
