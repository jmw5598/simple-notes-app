import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgIconsModule } from '@ng-icons/core';
import { heroTrash, heroPencil } from '@ng-icons/heroicons/outline';

import { SnAlertModule } from '@sn/alert';
import { SnCheckboxModule } from '@sn/checkbox';
import { SnEmptyModule } from '@sn/empty';
import { SnButtonsModule } from '@sn/button';
import { SnSectionHeaderModule } from '@sn/section-header';
import { SnFormModule } from '@sn/form';

import { AccountAddressFormComponent } from './components/account-address-form/account-address-form.component';
import { AccountCreateComponent } from './components/account-create/account-create.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountProfileFormComponent } from './components/account-profile-form/account-profile-form.component';
import { AccountUserFormComponent } from './components/account-user-form/account-user-form.component';

@NgModule({
  declarations: [
    AccountAddressFormComponent,
    AccountCreateComponent,
    AccountFormComponent,
    AccountProfileFormComponent,
    AccountUserFormComponent,
    AccountsTableComponent,
  ],
  imports: [
    CommonModule,
    ConfirmationPopoverModule,
    FormsModule,
    ReactiveFormsModule,
    SnAlertModule,
    SnCheckboxModule,
    SnEmptyModule,
    SnButtonsModule,
    SnSectionHeaderModule,
    SnFormModule,
    NgIconsModule.withIcons({
      heroTrash,
      heroPencil,
    }),
  ],
  exports: [
    AccountAddressFormComponent,
    AccountCreateComponent,
    AccountFormComponent,
    AccountProfileFormComponent,
    AccountUserFormComponent,
    AccountsTableComponent,
  ]
})
export class SnAccountCreateModule { }
