import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/user/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview.component';

import { NgIconsModule } from '@ng-icons/core';
import { heroEye, heroEyeSlash, heroCalendarDays, heroClock, heroMapPin, } from '@ng-icons/heroicons/outline';

import { RecentTopicsListComponent } from './components/recent-topics-list/recent-topics-list.component';
import { TodaysCalendarEventsListComponent } from './components/todays-calendar-events-list/todays-calendar-events-list.component';
import { TodaysTodoListsListComponent } from './components/todays-todo-lists-list/todays-todo-lists-list.component';
import { PastDueTodoListsListComponent } from './components/past-due-todo-lists-list/past-due-todo-lists-list.component';
import { TodoListTodosFormComponent } from './components/todo-list-todos-form/todo-list-todos-form.component';
import { TodosFormComponent } from './components/todo-list-todos-form/components/todos-form/todos-form.component';

import { SnCheckboxModule } from '@sn/checkbox';
import { SnEmptyModule } from '@sn/empty';

@NgModule({
    declarations: [
        DashboardOverviewComponent,
        RecentTopicsListComponent,
        TodaysCalendarEventsListComponent,
        TodaysTodoListsListComponent,
        PastDueTodoListsListComponent,
        TodoListTodosFormComponent,
        TodosFormComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        NgIconsModule.withIcons({
            heroEye,
            heroEyeSlash,
            heroCalendarDays,
            heroClock,
            heroMapPin,
        }),
        SnCheckboxModule,
        SnEmptyModule,
    ]
})
export class DashboardModule { }
