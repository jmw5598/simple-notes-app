import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnDemandPreloadStrategy } from '@sn/core/framing';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    data: { breadcrumb: 'Dashboard' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: OnDemandPreloadStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
