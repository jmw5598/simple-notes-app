import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsToolbarComponent } from './pages/account-settings-toolbar/account-settings-toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsToolbarComponent 
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
export class AccountSettingsToolbarRoutingModule { }