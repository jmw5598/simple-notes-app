import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResponseMessage } from '@sn/shared/models';
import { TodoList } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICalendarEventsState } from '../../store/reducers';

import * as calendarActions from '../../store/actions';
import * as calendarSelectors from '../../store/selectors';
import { buildTodoListFormGroup } from '@sn/user/shared/forms';

import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-user-calendar-todo-list-view',
  templateUrl: './calendar-todo-list-view.component.html',
  styleUrls: ['./calendar-todo-list-view.component.scss']
})
export class CalendarTodoListViewComponent implements OnInit {
  public form: UntypedFormGroup;
  public data$: Observable<TodoList>;
  public responseMessage$: Observable<ResponseMessage>;
  public data: any;
  public calendarEventView: string;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _drawerService: DrawerService, 
    private _store: Store<ICalendarEventsState>
  ) {
    this.calendarEventView = 'display';
    this.form = buildTodoListFormGroup(this._formBuilder);
  }

  ngOnInit(): void {
    this._initializeForm();
    this._listenForDrawerServiceDataChanges();
    this._listenForUpdateCalendarTodoListResponseMessages();
  }

  public onEdit(): void {
    if (this.calendarEventView.toLowerCase() === 'display') {
      this.calendarEventView = 'edit';
    } else {
      this.calendarEventView = 'display';
    }
  }

  public onDelete(): void {
    this._store.dispatch(calendarActions.deleteCalendarTodoList({ id: this.data.id || -1 }))
    this._drawerService.close();  // TODO Select delete response message and close if successful!
  }

  public onUpdate(formValue: any): void {
    formValue?.todos?.forEach(todo => todo.id = todo?.id < 0 ? null : todo.id);
    const todoList: TodoList = { ...formValue } as TodoList;
    this._store.dispatch(calendarActions.updateCalendarTodoList({ 
      id: todoList.id, todoList: todoList 
    }));
  }

  public onCancel(): void {
    this._drawerService.close();
  }

  private _initializeForm(): void {
    this.form = buildTodoListFormGroup(this._formBuilder);
  }

  private _listenForDrawerServiceDataChanges(): void {
    this.data$ = this._drawerService.onDataChange()
      .pipe(tap(data => this.data = data
    ));
  }

  private _listenForUpdateCalendarTodoListResponseMessages(): void {
    this.responseMessage$ = this._store.select(calendarSelectors.selectUpdateCalendarTodoListResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => this._store.dispatch(
              calendarActions.setUpdateCalendarTodoListResponseMessage({ message: null })), 3000);
          }
        })
      );
  }
}
