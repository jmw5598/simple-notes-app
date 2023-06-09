import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FullCalendarModule } from '@fullcalendar/angular';


import { CalendarRoutingModule } from './calendar-routing.module';
import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';
import { CalendarEventDetailsComponent } from './components/calendar-event-details/calendar-event-details.component';
import { CalendarEventUpdateComponent } from './components/calendar-event-update/calendar-event-update.component';
import { CalendarEventViewComponent } from './components/calendar-event-view/calendar-event-view.component';
import { CalendarTodoListViewComponent } from './components/calendar-todo-list-view/calendar-todo-list-view.component';
import { CalendarEventCreateMenuComponent } from './components/calendar-event-create-menu/calendar-event-create-menu.component';

import { NgIconsModule } from '@ng-icons/core';
import { heroXMark, heroMapPin, heroArrowLeft } from '@ng-icons/heroicons/outline';

import { SnButtonsModule } from '@sn/button';
import { SnAlertModule } from '@sn/alert';
import { SnDrawerModule, SnDrawerService } from '@sn/drawer';

import { SnCalendarEventCreateModule } from '@sn/user/shared/modules/calendar-event-create';
import { SnTodoListCreateModule } from '@sn/user/shared/modules/todo-list-create';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ViewCalendarComponent,
        CalendarEventDetailsComponent,
        CalendarEventUpdateComponent,
        CalendarEventViewComponent,
        CalendarTodoListViewComponent,
        CalendarEventCreateMenuComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CalendarRoutingModule,
        FullCalendarModule,
        ConfirmationPopoverModule.forRoot({
            popoverMessage: 'Are you sure?',
            cancelButtonType: 'btn-default btn-sm bg-secondary',
            confirmButtonType: 'btn-primary btn-sm bg-primary text-light'
        }),
        NgIconsModule.withIcons({
            heroXMark,
            heroMapPin,
            heroArrowLeft,
        }),
        SnButtonsModule,
        SnAlertModule,
        SnDrawerModule,
        SnCalendarEventCreateModule,
        SnTodoListCreateModule,
    ],
    providers: [
        SnDrawerService
    ],
})
export class CalendarModule { }
