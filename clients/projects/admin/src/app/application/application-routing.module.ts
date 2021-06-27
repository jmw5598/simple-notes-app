import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { GetRolesGuard } from '../core/guards';
import { ApplicationComponent } from './application.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    canActivate: [
      AdminRoleGuard,
      GetRolesGuard
    ],
    children: [
      {
        path: 'dashboard',
        data: { preload: true },
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'accounts',
        data: { preload: true },
        loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule)
      },
      {
        path: 'invoices',
        data: { preload: true },
        loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule)
      },
      {
        path: 'settings',
        data: { preload: true },
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApplicationRoutingModule { }
