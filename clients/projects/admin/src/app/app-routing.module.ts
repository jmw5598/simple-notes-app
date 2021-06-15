import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnDemandPreloadStrategy } from '@sn/core/framing';
import { AuthenticationGuard } from '@sn/user/auth/guards';
import { AdminRoleGuard } from './auth/guards/admin-role.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [
      AuthenticationGuard,
      AdminRoleGuard
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
