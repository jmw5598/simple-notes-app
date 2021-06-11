import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { TopicsService, CalendarEventsService, TodoListsService } from '@sn/user/core/services';
import * as fromDashboard from '../actions/dashboard.actions';
import { Page } from '@sn/user/core/models';
import { Topic } from '@sn/user/shared/models';
import { handleHttpError } from '@sn/user/core/store/actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private _actions: Actions,
    private _topicsService: TopicsService,
    private _calendarEventsService: CalendarEventsService,
    private _todoListsService: TodoListsService
  ) {}

  getRecentTopics$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.getRecentTopics),
    switchMap(() => this._topicsService.searchTopics('')
      .pipe(
        map((page: Page<Topic>) => fromDashboard.getRecentTopicsSuccess({ topics: page.elements })),
        catchError(error => of(handleHttpError({ error: error })))
      )
    )
  ));

  getTodaysEvents$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.getTodaysCalendarEvents),
    switchMap(() => {
      const startDate: Date = this._generateStartDateToday();
      const endDate: Date = this._generateEndDateToday();
      return this._calendarEventsService.findBetweenDates(startDate, endDate)
        .pipe(
          map(events => fromDashboard.getTodaysCalendarEventsSuccess({ events: events })),
          catchError(error => of(handleHttpError({ error: error })))
        );
    })
  ));

  getTodaysTodoLists$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.getTodaysTodoLists),
    switchMap(() => {
      const startDate: Date = this._generateStartDateToday();
      const endDate: Date = this._generateEndDateToday();
      return this._todoListsService.findBetweenDates(startDate, endDate)
        .pipe(
          map(todoLists => fromDashboard.getTodaysTodoListsSuccess({ todoLists: todoLists })),
          catchError(error => of(handleHttpError({ error: error })))
        );
    })
  ));

  getPastDueTodoLists$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.getPastDueTodoLists),
    switchMap(() => {
      const pastDueDate: Date = this._generateStartDateToday();
      return this._todoListsService.getPastDueTodoLists(pastDueDate)
        .pipe(
          map(todoLists => fromDashboard.getPastDueTodoListsSuccess({ todoLists: todoLists })),
          catchError(error => of(handleHttpError({ error: error })))
        );
    })
  ));

  updateTodaysTodoList$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.updateTodaysTodoList),
    exhaustMap(({ todoListId, todoList }) => this._todoListsService.update(todoListId, todoList)
      .pipe(
        map(todoList => fromDashboard.updateTodaysTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError({ error: error })))
      ))
  ));

  updatePastDueTodoList$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.updatePastDueTodoList),
    exhaustMap(({ todoListId, todoList }) => this._todoListsService.update(todoListId, todoList)
      .pipe(
        map(todoList => fromDashboard.updatePastDueTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError({ error: error })))
      ))
  ));

  // TODO on succecss show success toast message?
  // updateTodayAndPastDueTodoListSuccess$ = createEffect(() => this._actions.pipe(
  //   ofType(fromActions.updateTodoListSuccess),
  //   switchMap(({ todoList }) => {
  //     const message: ResponseMessage = {
  //       status: ResponseStatus.SUCCESS,
  //       message: `Successfully updated todo list!`
  //     } as ResponseMessage
  //     return of(fromActions.setUpdateTodoListResponseMessage({ message: message }))
  //   })
  // ));

  private _generateStartDateToday(): Date {
    const today: Date = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    return today;
  }

  private _generateEndDateToday(): Date {
    const todayEnd: Date = this._generateStartDateToday();
    todayEnd.setDate(todayEnd.getDate() + 1);
    return todayEnd;
  }
}
