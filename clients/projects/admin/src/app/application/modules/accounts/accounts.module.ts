import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SharedModule } from '@sn/admin/shared/shared.module';

import { ViewAccountsComponent } from './pages/view-accounts/view-accounts.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedComponentsModule } from '@sn/shared/components';
import { AccountUpdateComponent } from './components/account-update/account-update.component';
import { AccountUpdateToolbarComponent } from './components/account-update-toolbar/account-update-toolbar.component';

@NgModule({
  declarations: [
    ViewAccountsComponent,
    AccountsListComponent,
    AccountUpdateComponent,
    AccountUpdateToolbarComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    AccountsRoutingModule,
    SharedComponentsModule,
    TooltipModule
  ]
})
export class AccountsModule { }
