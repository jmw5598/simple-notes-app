import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import { heroDocument } from '@ng-icons/heroicons/outline';

import { SnAlertModule } from '@sn/alert';
import { SnEmptyModule } from '@sn/empty';
import { SnDrawerModule } from '@sn/drawer';
import { SnPaginatorModule } from '@sn/paginator';
import { SnDebounceSearchModule } from '@sn/debounce-search';
import { SnToolbarModule } from '@sn/toolbar';
import { SnSectionHeaderModule } from '@sn/section-header';
import { SnButtonsModule } from '@sn/button';

import { SnAccountCreateModule } from '@sn/admin/shared/modules/account-create';

import { ViewAccountsComponent } from './pages/view-accounts/view-accounts.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

import { AccountsRoutingModule } from './accounts-routing.module';
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
    CommonModule,
    AccountsRoutingModule,
    NgIconsModule.withIcons({ heroDocument }),
    SnAlertModule,
    SnEmptyModule,
    SnDrawerModule,
    SnPaginatorModule,
    SnDebounceSearchModule,
    SnToolbarModule,
    SnAccountCreateModule,
    SnSectionHeaderModule,
    SnButtonsModule,
  ]
})
export class AccountsModule { }
