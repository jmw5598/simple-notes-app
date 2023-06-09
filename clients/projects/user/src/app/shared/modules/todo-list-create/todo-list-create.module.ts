import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgIconsModule } from '@ng-icons/core';
import { heroCalendarDays, heroXMark, heroArrowsPointingOut } from '@ng-icons/heroicons/outline';

import { SnAlertModule } from '@sn/alert';
import { SnButtonsModule } from '@sn/button';
import { SnCheckboxModule } from '@sn/checkbox';
import { SnEmptyModule } from '@sn/empty';

import { SnTodoListCreateComponent } from './components/todo-list-create/todo-list-create.component';
import { SnTodoListDetailsComponent } from './components/todo-list-details/todo-list-details.component';
import { SnTodoListFormComponent } from './components/todo-list-form/todo-list-form.component';
import { SnTodoListProgressComponent } from './components/todo-list-progress/todo-list-progress.component';
import { SnTodoListUpdateComponent } from './components/todo-list-update/todo-list-update.component';

@NgModule({
  declarations: [
    SnTodoListCreateComponent,
    SnTodoListDetailsComponent,
    SnTodoListFormComponent,
    SnTodoListProgressComponent,
    SnTodoListUpdateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    DpDatePickerModule,
    NgIconsModule.withIcons({
      heroCalendarDays,
      heroXMark,
      heroArrowsPointingOut,
    }),
    ConfirmationPopoverModule,
    SnAlertModule,
    SnButtonsModule,
    SnCheckboxModule,
    SnEmptyModule,
  ],
  exports: [
    SnTodoListCreateComponent,
    SnTodoListDetailsComponent,
    SnTodoListFormComponent,
    SnTodoListProgressComponent,
    SnTodoListUpdateComponent,
  ]
})
export class SnTodoListCreateModule { }
