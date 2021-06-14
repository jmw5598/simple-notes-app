import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';

import { PlansService } from '@sn/core/services';

@Injectable()
export class PlansEffects {
  constructor(
    private _actions: Actions,
    private _plansService: PlansService
  ) {}

  getPlans$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getPlans),
    switchMap(() => this._plansService.findAll()
      .pipe(
        map(plans => fromActions.getPlansSuccess({ plans: plans })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}
