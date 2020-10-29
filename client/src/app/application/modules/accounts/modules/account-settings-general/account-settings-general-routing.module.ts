import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsGeneralComponent } from './pages/account-settings-general/account-settings-general.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsGeneralComponent
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
export class AccountSettingsGeneralRoutingModule { }