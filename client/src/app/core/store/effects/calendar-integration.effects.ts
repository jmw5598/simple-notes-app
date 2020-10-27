import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CalendarIntegrationsService } from '../../services/calendar-integrations.service';
import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { createCalendarEventSuccess, deleteCalendarEventSuccess, setCreateCalendarEventResponseMessage, setDeleteCalendarEventResponseMessage, setUpdateCalendarEventResponseMessage, updateCalendarEventSuccess } from '../actions';
import { ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';

@Injectable()
export class CalendarIntegrationEffects {
  constructor(
    private _actions: Actions,
    private _calendarIntegrationsService: CalendarIntegrationsService
  ) {}

  authorizeGoogleCalendarIntegration$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.authorizeGoogleCalendarIntegration),
    switchMap(() => this._calendarIntegrationsService.authorizeGoogleCalendarIntegration())
  ), { dispatch: false });
}