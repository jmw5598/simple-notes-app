import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CalendarEventsService } from '../../services/calendar-events.service';
import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { createCalendarEventSuccess, deleteCalendarEventSuccess, setCreateCalendarEventResponseMessage, setDeleteCalendarEventResponseMessage, setUpdateCalendarEventResponseMessage, updateCalendarEventSuccess } from '../actions';
import { ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';

@Injectable()
export class CalendarEffects {
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
        map((event) => createCalendarEventSuccess({ event: event })),
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
      return setCreateCalendarEventResponseMessage({ message: message })
    })
  ));

  updateCalendarEvent$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateCalendarEvent),
    switchMap(({id, event}) => this._calendarEventsService.update(id, event)
      .pipe(
        map((event) => updateCalendarEventSuccess({ event: event })),
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
      return setUpdateCalendarEventResponseMessage({ message: message })
    }) 
  ));

  deleteCalendarEvent$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteCalendarEvent),
    switchMap(({id}) => this._calendarEventsService.delete(id)
      .pipe(
        map((event) => deleteCalendarEventSuccess({ event: event })),
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
      return setDeleteCalendarEventResponseMessage({ message: message })
    })    
  ));
}
