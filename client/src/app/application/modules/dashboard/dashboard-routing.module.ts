import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardOverviewComponent 
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