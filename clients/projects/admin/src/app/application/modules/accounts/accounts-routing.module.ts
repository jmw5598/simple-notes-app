import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAccountsComponent } from './pages/view-accounts/view-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAccountsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
