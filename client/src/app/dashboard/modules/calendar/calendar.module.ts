import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { DrawerService } from '@sn/shared/components';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { CalendarRoutingModule } from './calendar-routing.module';
import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';
import { CalendarEventAddModalComponent } from './components/calendar-event-add-modal/calendar-event-add-modal.component';
import { SharedModule } from '@sn/shared/shared.module';
import { CalendarEventDetailsComponent } from './components/calendar-event-details/calendar-event-details.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    ViewCalendarComponent,
    CalendarEventAddModalComponent,
    CalendarEventDetailsComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    ModalModule.forChild(),
    SharedModule,
    TimepickerModule,
    DatepickerModule
  ],
  providers: [
    DrawerService
  ],
  entryComponents: [
    CalendarEventAddModalComponent,
    CalendarEventDetailsComponent
  ]
})
export class CalendarModule { }
