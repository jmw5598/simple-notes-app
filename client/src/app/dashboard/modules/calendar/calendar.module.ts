import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DrawerService } from '@sn/shared/components';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { CalendarRoutingModule } from './calendar-routing.module';
import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';
import { CalendarEventCreateComponent } from './components/calendar-event-create/calendar-event-create.component';
import { SharedModule } from '@sn/shared/shared.module';
import { CalendarEventDetailsComponent } from './components/calendar-event-details/calendar-event-details.component';
import { CalendarEventUpdateComponent } from './components/calendar-event-update/calendar-event-update.component';
import { CalendarEventViewComponent } from './components/calendar-event-view/calendar-event-view.component';
import { CalendarEventFormComponent } from './components/calendar-event-form/calendar-event-form.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    ViewCalendarComponent,
    CalendarEventCreateComponent,
    CalendarEventDetailsComponent,
    CalendarEventUpdateComponent,
    CalendarEventViewComponent,
    CalendarEventFormComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    ModalModule.forChild(),
    SharedModule,
    TimepickerModule,
    BsDatepickerModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      popoverMessage: 'Are you sure?',
      cancelButtonType: 'btn-default btn-sm bg-secondary',
      confirmButtonType: 'btn-primary btn-sm bg-primary text-light'
    })
  ],
  providers: [
    DrawerService
  ],
  entryComponents: [
    CalendarEventCreateComponent,
    CalendarEventViewComponent
  ]
})
export class CalendarModule { }
