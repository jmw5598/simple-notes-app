import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AccountDetailsDisplayComponent } from './components/account-details-display/account-details-display.component';
import { AccountDetailsFormComponent } from './components/account-details-form/account-details-form.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';

@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountDetailsDisplayComponent,
    AccountDetailsFormComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule 
  ]
})
export class AccountsModule { }
