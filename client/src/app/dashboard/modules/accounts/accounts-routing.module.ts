import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsGuard, AccountProfileGuard } from '@sn/core/guards';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';

const routes: Routes = [
  {
    path: 'details',
    canActivate: [AccountDetailsGuard, AccountProfileGuard],
    component: AccountDetailsComponent
  },
  {
    path: 'settings',
    canActivate: [], // TODO need guards to get settings, need to create ngrx state also
    component: AccountSettingsComponent
  },
  {
    path: '**',
    redirectTo: 'details',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
