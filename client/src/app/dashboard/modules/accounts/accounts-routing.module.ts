import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsGuard, AccountProfileGuard } from '@sn/core/guards';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';

const routes: Routes = [
  {
    path: 'details',
    canActivate: [AccountDetailsGuard, AccountProfileGuard],
    component: AccountDetailsComponent
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
