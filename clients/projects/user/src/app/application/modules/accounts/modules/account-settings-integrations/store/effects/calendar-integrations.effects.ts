import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CalendarIntegrationsService } from '@sn/core/services';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';
import * as fromCore from '@sn/user/core/store/actions';
import { inactiveCalendarIntegrationSucess, refreshCalendarIntegrationSuccess } from '../actions';

@Injectable()
export class CalendarIntegrationsEffects {
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
    switchMap(() => this._calendarIntegrationsService.findAllGroupedByType()
      .pipe(
        map(integrations => fromActions.getCalendarIntegrationsGroupedByTypeSuccess({ integrations: integrations })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));

  refreshCalendarIntegration$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.refreshCalendarIntegration),
    switchMap(({id, integration}) => this._calendarIntegrationsService.update(id, integration)
      .pipe(
        map(integration => refreshCalendarIntegrationSuccess({ integration: integration })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));

  inactiveCalendarIntegration$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.inactiveCalendarIntegration),
    switchMap(({id}) => this._calendarIntegrationsService.delete(id)
      .pipe(
        map(integration => inactiveCalendarIntegrationSucess({ integration: integration })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));
}