import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { ActionReducerMap, FeatureSlice, provideState } from '@ngrx/store';

import { OnDemandPreloadStrategy } from '@sn/core/framing';
import { AuthenticationGuard } from './auth/guards';
import { AuthenticationEffects, authenticationFeature } from './auth/store';

export const appRoutes: Routes = [
  {
    path: 'auth',
    providers: [
      provideState(authenticationFeature),
      provideEffects(AuthenticationEffects),
    ],
    loadChildren: () => import('./auth/auth.routes').then(r => r.authRoutes)
  },
  // {
  //   path: '',
  //   canActivate: [AuthenticationGuard],
  //   loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
  //   data: { breadcrumb: 'Dashboard' }
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { preloadingStrategy: OnDemandPreloadStrategy })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
