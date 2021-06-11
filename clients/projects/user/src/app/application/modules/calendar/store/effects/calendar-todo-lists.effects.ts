import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TodoListsService } from '@sn/user/core/services';
import { handleHttpError } from '@sn/user/core/store/actions/http-error.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { ResponseMessage } from '@sn/user/core/models';
import { ResponseStatus } from '@sn/user/core/enums';

@Injectable()
export class CalendarTodoListsEffects {
  constructor(
    private _actions: Actions,
    private _todoListsService: TodoListsService
  ) {}
  
  getCalendarTodoListsBetweenDates$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getCalendarTodoListsBetweenDates),
    switchMap(({startDate, endDate}) => this._todoListsService.findBetweenDates(startDate, endDate)
      .pipe(
        map(todoLists => fromActions.setCurrentCalendarTodoLists({ todoLists: todoLists })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createCalendarTodoList$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createCalendarTodoList),
    switchMap(({todoList}) => this._todoListsService.save(todoList)
      .pipe(
        map((todoList) => fromActions.createCalendarTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createCalendarTodoListSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createCalendarTodoListSuccess),
    map(({todoList}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create your todo list!`
      } as ResponseMessage;
      return fromActions.setCreateCalendarTodoListResponseMessage({ message: message })
    })
  ));

  updateCalendarTodoList$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateCalendarTodoList),
    switchMap(({id, todoList}) => this._todoListsService.update(id, todoList)
      .pipe(
        map((todoList) => fromActions.updateCalendarTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateCalendarTodoListSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateCalendarTodoListSuccess),
    map(({todoList}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated your todo list!`
      } as ResponseMessage;
      return fromActions.setUpdateCalendarTodoListResponseMessage({ message: message })
    }) 
  ));

  deleteCalendarTodoList$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteCalendarTodoList),
    switchMap(({id}) => this._todoListsService.delete(id)
      .pipe(
        map((todoList) => fromActions.deleteCalendarTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteCalendarTodoListSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteCalendarTodoListSuccess),
    map(({todoList}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully deleted your todo list!`
      } as ResponseMessage;
      return fromActions.setDeleteCalendarTodoListResponseMessage({ message: message })
    })    
  ));
}
