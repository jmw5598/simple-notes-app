import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import * as fromActions from '../actions';

import { PlansService } from '@sn/core/services';
import { ResponseMessage, ResponseStatus } from '@sn/shared/models';

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

  getActivePlans$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getActivePlans),
    switchMap(() => this._plansService.getActivePlans()
      .pipe(
        map(plans => fromActions.getActivePlansSuccess({ plans: plans }))
      )  
    )
  ));

  createPlan$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createPlan),
    exhaustMap(({plan}) => this._plansService.save(plan)
      .pipe(
        map(result => fromActions.createPlanSuccess({ plan: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createPlanSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createPlanSuccess),
    switchMap(({plan}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new plan!`
      } as ResponseMessage
      return of(fromActions.setCreatePlanResponseMessage({ message: message }))
    })
  ));

  updatePlan$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updatePlan),
    switchMap(({planId, plan}) => this._plansService.update(planId, plan)
      .pipe(
        map(result => fromActions.updatePlanSuccess({ plan: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your plan, please try again!`
          } as ResponseMessage;
          return of(fromActions.setUpdatePlanResponseMessage({ message: message }));
        })
      )
    )
  ));

  updatePlanSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updatePlanSuccess),
    switchMap(({plan}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated plan!`
      } as ResponseMessage
      return of(fromActions.setUpdatePlanResponseMessage({ message: message }))
    })
  ));

  deletePlan$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deletePlan),
    exhaustMap(({planId}) => this._plansService.delete(planId)
      .pipe(
        map(result => fromActions.deletePlanSuccess({ plan: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  undeletePlan$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.undeletePlan),
    exhaustMap(({planId}) => this._plansService.undelete(planId)
      .pipe(
        map(result => fromActions.undeletePlanSuccess({ plan: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}
