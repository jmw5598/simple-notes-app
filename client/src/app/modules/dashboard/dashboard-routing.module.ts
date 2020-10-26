import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'topics',
        loadChildren: () => import('./modules/topics/topics.module').then(m => m.TopicsModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./modules/documents/documents.module').then(m => m.DocumentsModule)
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