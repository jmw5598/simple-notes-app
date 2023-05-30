import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FullCalendarModule } from '@fullcalendar/angular';


import { CalendarRoutingModule } from './calendar-routing.module';
import { ViewCalendarComponent } from './pages/view-calendar/view-calendar.component';
import { SharedModule } from '@sn/user/shared/shared.module';
import { CalendarEventDetailsComponent } from './components/calendar-event-details/calendar-event-details.component';
import { CalendarEventUpdateComponent } from './components/calendar-event-update/calendar-event-update.component';
import { CalendarEventViewComponent } from './components/calendar-event-view/calendar-event-view.component';
import { CalendarEventCreateComponent } from '@sn/user/shared/components';
import { CalendarTodoListViewComponent } from './components/calendar-todo-list-view/calendar-todo-list-view.component';
import { CalendarEventCreateMenuComponent } from './components/calendar-event-create-menu/calendar-event-create-menu.component';

import { SharedComponentsModule, DrawerService } from '@sn/shared/components';

import { NgIconsModule } from '@ng-icons/core';
import { heroXMark, heroMapPin } from '@ng-icons/heroicons/outline';


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
        SharedComponentsModule,
        CommonModule,
        CalendarRoutingModule,
        FullCalendarModule,
        SharedModule,
        ConfirmationPopoverModule.forRoot({
            popoverMessage: 'Are you sure?',
            cancelButtonType: 'btn-default btn-sm bg-secondary',
            confirmButtonType: 'btn-primary btn-sm bg-primary text-light'
        }),
        NgIconsModule.withIcons({
            heroXMark,
            heroMapPin,
        })
    ],
    providers: [
        DrawerService
    ]
})
export class CalendarModule { }
