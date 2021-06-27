import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';

import * as fromActions from '../actions';
import { RolesService } from '../../services';
import { ResponseMessage, ResponseStatus } from '@sn/shared/models';

@Injectable()
export class RolesEffects {
  constructor(
    private _actions: Actions,
    private _rolesService: RolesService 
  ) {}

  getRoles$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAllRoles),
    switchMap(() => this._rolesService.findAll()
      .pipe(
        map(roles => fromActions.getAllRolesSuccess({ roles: roles })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getActiveRoles$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAllRoles),
    switchMap(() => this._rolesService.getActiveRoles()
      .pipe(
        map(roles => fromActions.getActiveRolesSuccess({ roles: roles })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createRole$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createRole),
    exhaustMap(({role}) => this._rolesService.save(role)
      .pipe(
        map(result => fromActions.createRoleSuccess({ role: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createRoleSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createRoleSuccess),
    switchMap(({role}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new role!`
      } as ResponseMessage
      return of(fromActions.setCreateRoleResponseMessage({ message: message }))
    })
  ));

  updateRole$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateRole),
    switchMap(({roleId, role}) => this._rolesService.update(roleId, role)
      .pipe(
        map(result => fromActions.updateRoleSuccess({ role: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your role, please try again!`
          } as ResponseMessage;
          return of(fromActions.setUpdatePlanResponseMessage({ message: message }));
        })
      )
    )
  ));

  updateRoleSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateRoleSuccess),
    switchMap(({role}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated role!`
      } as ResponseMessage
      return of(fromActions.setUpdateRoleResponseMessage({ message: message }))
    })
  ));

  deleteRole$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteRole),
    exhaustMap(({roleId}) => this._rolesService.delete(roleId)
      .pipe(
        map(result => fromActions.deleteRoleSuccess({ role: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}