import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsSearchResultGuard } from './guards/accounts-search-result.guard';
import { ViewAccountsComponent } from './pages/view-accounts/view-accounts.component';

const routes: Routes = [
  {
    path: 'view',
    canActivate: [AccountsSearchResultGuard],
    component: ViewAccountsComponent
  },
  {
    path: '**',
    redirectTo: 'view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
