import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentTopicsGuard } from './guards/recent-topics.guard';
import { TodaysEventsGuard } from './guards/todays-events.guard';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';
import { PastDueTodoListsGuard } from './guards/past-due-todo-lists.guard';
import { TodaysTodoListsGuard } from './guards/todays-todo-lists.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [
      RecentTopicsGuard,
      TodaysEventsGuard,
      TodaysTodoListsGuard,
      PastDueTodoListsGuard
    ],
    component: DashboardOverviewComponent 
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
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