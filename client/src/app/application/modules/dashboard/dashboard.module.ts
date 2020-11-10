import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';

import { 
  TopicCreateComponent, 
  TopicSearchComponent, 
  CalendarEventCreateComponent } from '@sn/shared/components';
import { RecentTopicsListComponent } from './components/recent-topics-list/recent-topics-list.component';
import { TodaysCalendarEventsListComponent } from './components/todays-calendar-events-list/todays-calendar-events-list.component';

@NgModule({
  declarations: [
    DashboardOverviewComponent,
    RecentTopicsListComponent,
    TodaysCalendarEventsListComponent
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
