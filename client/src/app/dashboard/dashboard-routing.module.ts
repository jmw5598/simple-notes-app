import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsRoutingModule } from './accounts/accounts-routing.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
      },
      {
        path: 'topics',
        loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule)
      },
      {
        path: '**',
        redirectTo: 'topics',
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
export class DashboardRoutingModule { }