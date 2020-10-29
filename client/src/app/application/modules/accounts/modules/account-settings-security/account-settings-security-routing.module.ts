import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsSecurityComponent } from './pages/account-settings-security/account-settings-security.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsSecurityComponent
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
export class AccountSettingsSecurityRoutingModule { }