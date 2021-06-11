import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { ViewTodosComponent } from './pages/view-todos/view-todos.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListViewComponent } from './components/todo-list-view/todo-list-view.component';

import { TodosRoutingModule } from './todos-routing.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { TodoListEditComponent } from './components/todo-list-edit/todo-list-edit.component';

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
    ConfirmationPopoverModule
  ]
})
export class TodosModule { }
