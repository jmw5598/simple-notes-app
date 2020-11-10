import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TopicsService, CalendarEventsService } from '@sn/core/services';
import * as fromDashboard from '../actions/dashboard.actions';
import { Page } from '@sn/core/models';
import { Topic } from '@sn/shared/models';
import { handleHttpError } from '@sn/core/store/actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private _actions: Actions,
    private _topicsService: TopicsService,
    private _calendarEventsService: CalendarEventsService
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
