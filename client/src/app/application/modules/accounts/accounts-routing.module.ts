import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsGuard, AccountProfileGuard } from './guards';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';

const routes: Routes = [
  {
    path: 'settings',
    canActivate: [AccountDetailsGuard, AccountProfileGuard],
    component: AccountSettingsComponent,
    children: [
      {
        path: 'general',
        loadChildren: () => import('./modules/account-settings-general/account-settings-general.module').then(m => m.AccountSettingsGeneralModule)
      },
      {
        path: 'security',
        loadChildren: () => import('./modules/account-settings-security/account-settings-security.module').then(m => m.AccountSettingsSecurityModule)
      },
      {
        path: 'toolbar',
        loadChildren: () => import('./modules/account-settings-toolbar/account-settings-toolbar.module').then(m => m.AccountSettingsToolbarModule)
      },
      {
        path: 'integrations',
        loadChildren: () => import('./modules/account-settings-integrations/account-settings-integrations.module').then(m => m.AccountSettingsIntegrationsModule)
      },
      {
        path: '**',
        redirectTo: 'general',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'settings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
