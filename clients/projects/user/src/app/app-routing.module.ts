import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '@sn/user/auth/guards';
import { ThemeLoaderGuard } from '@sn/user/core/guards';
import { OnDemandPreloadStrategy } from '@sn/core/framing';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthenticationGuard, ThemeLoaderGuard],
    canDeactivate: [ThemeLoaderGuard],
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
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: OnDemandPreloadStrategy })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
