import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnDemandPreloadStrategy } from '@sn/core/framing';
import { AuthenticationGuard } from './auth/guards';
import { PlansGuard } from './core/guards';
import { AdminRoleGuard } from './auth/guards/admin-role.guard';
import { GetRolesGuard } from './core/guards/get-roles.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [
      AuthenticationGuard,
      AdminRoleGuard,
      PlansGuard,
      GetRolesGuard,
    ],
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    data: { breadcrumb: 'Dashboard' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: OnDemandPreloadStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
