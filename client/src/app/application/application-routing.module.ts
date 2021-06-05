import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './application.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: 'accounts',
        data: { preload: true },
        loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'topics',
        data: { preload: true },
        loadChildren: () => import('./modules/topics/topics.module').then(m => m.TopicsModule)
      },
      {
        path: 'documents',
        data: { preload: true },
        loadChildren: () => import('./modules/documents/documents.module').then(m => m.DocumentsModule)
      },
      {
        path: 'dashboard',
        data: { preload: true },
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'flashcards',
        data: { preload: true },
        loadChildren: () => import('./modules/flashcards/flashcards.module').then(m => m.FlashcardsModule)
      },
      {
        path: 'todos',
        data: { preload: true },
        loadChildren: () => import('./modules/todos/todos.module').then(m => m.TodosModule)
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