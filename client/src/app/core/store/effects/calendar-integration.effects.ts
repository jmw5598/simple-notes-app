import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CalendarIntegrationsService } from '../../services/calendar-integrations.service';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import { ResponseMessage } from '../../models';
import { ResponseStatus } from '../../enums';

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

  getCalendarIntegrations$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getCalendarIntegrationsGroupedByType),
    switchMap(() => this._calendarIntegrationsService.findAll()
      .pipe(
        map(integrations => fromActions.getCalendarIntegrationsGroupedByTypeSuccess({ integrations: integrations })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));
}