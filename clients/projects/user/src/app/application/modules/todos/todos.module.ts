import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/user/shared/shared.module';
import { ViewTodosComponent } from './pages/view-todos/view-todos.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListViewComponent } from './components/todo-list-view/todo-list-view.component';

import { TodosRoutingModule } from './todos-routing.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { TodoListEditComponent } from './components/todo-list-edit/todo-list-edit.component';

import { NgIconsModule } from '@ng-icons/core';
import { 
    heroEye,
    heroTrash,
    heroPencil,
    heroClock,
    heroDocument,
    heroCalendarDays } from '@ng-icons/heroicons/outline';
import { SnButtonsModule } from '@sn/button';
import { SnEmptyModule } from '@sn/empty';
import { SnDrawerModule } from '@sn/drawer';
import { SnPaginatorModule } from '@sn/paginator';
import { SnDebounceSearchModule } from '@sn/debounce-search';

@NgModule({
  declarations: [
    ViewTodosComponent,
    TodoListComponent,
    TodoListViewComponent,
    TodoListEditComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    ConfirmationPopoverModule,
    NgIconsModule.withIcons({
      heroEye,
      heroTrash,
      heroPencil,
      heroClock,
      heroDocument,
      heroCalendarDays,
    }),
    SnButtonsModule,
    SnEmptyModule,
    SnDrawerModule,
    SnPaginatorModule,
    SnDebounceSearchModule,
  ]
})
export class TodosModule { }
