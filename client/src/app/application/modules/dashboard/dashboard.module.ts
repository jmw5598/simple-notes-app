import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';

import { 
  TopicCreateComponent, 
  TopicSearchComponent, 
  CalendarEventCreateComponent } from '@sn/shared/components';

@NgModule({
  declarations: [
    DashboardOverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  entryComponents: [
    TopicCreateComponent,
    TopicSearchComponent,
    CalendarEventCreateComponent
  ]
})
export class DashboardModule { }
