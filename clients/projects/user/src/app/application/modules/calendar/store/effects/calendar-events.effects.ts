import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CalendarEventsService } from '@sn/core/services';
import { handleHttpError } from '@sn/user/core/store/actions/http-error.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { ResponseMessage, ResponseStatus } from '@sn/shared/models';

@Injectable()
export class CalendarEventsEffects {
  constructor(
    private _actions: Actions,
    private _calendarEventsService: CalendarEventsService
  ) {}

  getCalendarEventsBetweenDates$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getCalendarEventsBetweenDates),
    switchMap(({startDate, endDate}) => this._calendarEventsService.findBetweenDates(startDate, endDate)
      .pipe(
        map(events => fromActions.setCurrentCalendarEvents({ events: events })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createCalendarEvent$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createCalendarEvent),
    switchMap(({event}) => this._calendarEventsService.save(event)
      .pipe(
        map((event) => fromActions.createCalendarEventSuccess({ event: event })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createCalendarEventSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createCalendarEventSuccess),
    map(({event}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create your calendar event!`
      } as ResponseMessage;
      return fromActions.setCreateCalendarEventResponseMessage({ message: message })
    })
  ));

  updateCalendarEvent$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateCalendarEvent),
    switchMap(({id, event}) => this._calendarEventsService.update(id, event)
      .pipe(
        map((event) => fromActions.updateCalendarEventSuccess({ event: event })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateCalendarEventSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateCalendarEventSuccess),
    map(({event}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated your calendar event!`
      } as ResponseMessage;
      return fromActions.setUpdateCalendarEventResponseMessage({ message: message })
    }) 
  ));

  deleteCalendarEvent$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteCalendarEvent),
    switchMap(({id}) => this._calendarEventsService.delete(id)
      .pipe(
        map((event) => fromActions.deleteCalendarEventSuccess({ event: event })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteCalendarEventSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteCalendarEventSuccess),
    map(({event}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully deleted your calendar event!`
      } as ResponseMessage;
      return fromActions.setDeleteCalendarEventResponseMessage({ message: message })
    })    
  ));
}
