import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { AccountCreateComponent } from './components/account-create/account-create.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountUserFormComponent } from './components/account-user-form/account-user-form.component';
import { AccountProfileFormComponent } from './components/account-profile-form/account-profile-form.component';
import { AccountAddressFormComponent } from './components/account-address-form/account-address-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
  declarations: [
    AccountsTableComponent,
    AccountCreateComponent,
    AccountFormComponent,
    AccountUserFormComponent,
    AccountProfileFormComponent,
    AccountAddressFormComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    ConfirmationPopoverModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AccountsTableComponent,
    AccountCreateComponent,
    AccountFormComponent,
    AccountProfileFormComponent,
    AccountUserFormComponent
  ]
})
export class SharedModule { }
