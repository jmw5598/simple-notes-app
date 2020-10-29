import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarIntegrationsGroupedByTypeGuard } from '@sn/core/guards';
import { AccountSettingsIntegrationsComponent } from './pages/account-settings-integrations/account-settings-integrations.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [CalendarIntegrationsGroupedByTypeGuard],
    component: AccountSettingsIntegrationsComponent
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
export class AccountSettingsIntegrationsRoutingModule { }