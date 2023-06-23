import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorActions, PlansActions } from '../actions';
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
    ofType(PlansActions.getPlans),
    switchMap(() => this._plansService.findAll()
      .pipe(
        map(plans => PlansActions.getPlansSuccess({ plans: plans })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));

  getActivePlans$ = createEffect(() => this._actions.pipe(
    ofType(PlansActions.getActivePlans),
    switchMap(() => this._plansService.getActivePlans()
      .pipe(
        map(plans => PlansActions.getActivePlansSuccess({ plans: plans }))
      )  
    )
  ));

  createPlan$ = createEffect(() => this._actions.pipe(
    ofType(PlansActions.createPlan),
    exhaustMap(({plan}) => this._plansService.save(plan)
      .pipe(
        map(result => PlansActions.createPlanSuccess({ plan: result })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));

  createPlanSuccess$ = createEffect(() => this._actions.pipe(
    ofType(PlansActions.createPlanSuccess),
    switchMap(({plan}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new plan!`
      } as ResponseMessage
      return of(PlansActions.setCreatePlanResponseMessage({ message: message }))
    })
  ));

  updatePlan$ = createEffect(() => this._actions.pipe(
    ofType(PlansActions.updatePlan),
    switchMap(({planId, plan}) => this._plansService.update(planId, plan)
      .pipe(
        map(result => PlansActions.updatePlanSuccess({ plan: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your plan, please try again!`
          } as ResponseMessage;
          return of(PlansActions.setUpdatePlanResponseMessage({ message: message }));
        })
      )
    )
  ));

  updatePlanSuccess$ = createEffect(() => this._actions.pipe(
    ofType(PlansActions.updatePlanSuccess),
    switchMap(({plan}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated plan!`
      } as ResponseMessage
      return of(PlansActions.setUpdatePlanResponseMessage({ message: message }))
    })
  ));

  deletePlan$ = createEffect(() => this._actions.pipe(
    ofType(PlansActions.deletePlan),
    exhaustMap(({planId}) => this._plansService.delete(planId)
      .pipe(
        map(result => PlansActions.deletePlanSuccess({ plan: result })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));

  undeletePlan$ = createEffect(() => this._actions.pipe(
    ofType(PlansActions.undeletePlan),
    exhaustMap(({planId}) => this._plansService.undelete(planId)
      .pipe(
        map(result => PlansActions.undeletePlanSuccess({ plan: result })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));
}
