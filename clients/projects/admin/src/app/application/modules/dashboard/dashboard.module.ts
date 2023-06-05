import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SnPaginatorModule } from '@sn/paginator';

@NgModule({
  declarations: [
    DashboardOverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SnPaginatorModule,
  ]
})
export class DashboardModule { }
