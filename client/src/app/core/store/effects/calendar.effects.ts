import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CalendarEventsService } from '../../services/calendar-events.service';
import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';

@Injectable()
export class CalendarEffects {
  constructor(
    private _actions: Actions,
    private _calendarEventsService: CalendarEventsService
  ) {}

  getCalendarEventsBetweenDates$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getCalendarEventsBetweenDates),
    mergeMap(({startDate, endDate}) => this._calendarEventsService.findBetweenDates(startDate, endDate)
      .pipe(
        map(events => fromActions.setCurrentCalendarEvents({ events: events })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}