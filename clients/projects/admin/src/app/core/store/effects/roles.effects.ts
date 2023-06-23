import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorActions, RolesActions } from '../actions';
import { of } from 'rxjs';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';

import { RolesService } from '../../services';
import { ResponseMessage, ResponseStatus } from '@sn/shared/models';

@Injectable()
export class RolesEffects {
  constructor(
    private _actions: Actions,
    private _rolesService: RolesService 
  ) {}

  getRoles$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.getAllRoles),
    switchMap(() => this._rolesService.findAll()
      .pipe(
        map(roles => RolesActions.getAllRolesSuccess({ roles: roles })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));

  getActiveRoles$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.getAllRoles),
    switchMap(() => this._rolesService.getActiveRoles()
      .pipe(
        map(roles => RolesActions.getActiveRolesSuccess({ roles: roles })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));

  createRole$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.createRole),
    exhaustMap(({role}) => this._rolesService.save(role)
      .pipe(
        map(result => RolesActions.createRoleSuccess({ role: result })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));

  createRoleSuccess$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.createRoleSuccess),
    switchMap(({role}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new role!`
      } as ResponseMessage
      return of(RolesActions.setCreateRoleResponseMessage({ message: message }))
    })
  ));

  updateRole$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.updateRole),
    switchMap(({roleId, role}) => this._rolesService.update(roleId, role)
      .pipe(
        map(result => RolesActions.updateRoleSuccess({ role: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your role, please try again!`
          } as ResponseMessage;
          return of(RolesActions.setUpdateRoleResponseMessage({ message: message }));
        })
      )
    )
  ));

  updateRoleSuccess$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.updateRoleSuccess),
    switchMap(({role}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated role!`
      } as ResponseMessage
      return of(RolesActions.setUpdateRoleResponseMessage({ message: message }))
    })
  ));

  deleteRole$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.deleteRole),
    exhaustMap(({roleId}) => this._rolesService.delete(roleId)
      .pipe(
        map(result => RolesActions.deleteRoleSuccess({ role: result })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));

  undeleteRole$ = createEffect(() => this._actions.pipe(
    ofType(RolesActions.undeleteRole),
    exhaustMap(({roleId}) => this._rolesService.undelete(roleId)
      .pipe(
        map(result => RolesActions.undeleteRoleSuccess({ role: result })),
        catchError(error => of(HttpErrorActions.handleHttpError(error)))
      )
    )
  ));
}