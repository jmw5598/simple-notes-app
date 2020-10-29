import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { AccountsService, AuthenticationService } from '@sn/core/services';
import { AuthenticatedUser } from '@sn/core/models';
import * as fromActions from '../actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private _actions: Actions,
    private _authenticationService: AuthenticationService,
    private _accountsService: AccountsService,
    private _router: Router
  ) { }

  loginUser$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.loginUser),
    mergeMap(({ credentials }) => this._authenticationService.authenticateUser(credentials)
      .pipe(
        map(user => fromActions.loginUserSuccess({ user: user })),
        catchError(error => of(fromActions.loginUserError({ error: error })))
      )
    )
  ));

  logoutUser$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.logoutUser),
    tap(() => {
      this._authenticationService.logoutUser();
      this._router.navigate(['/auth', 'login']);
    })
  ), { dispatch: false });

  refreshToken$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.refreshToken),
    mergeMap(() => {
      const authenticatedUser: AuthenticatedUser = this._authenticationService.getStoredAuthenticatedUser();
      const accessToken: string = authenticatedUser.accessToken;
      const refreshToken: string = authenticatedUser.refreshToken;
      return this._authenticationService.refreshToken(accessToken, refreshToken)
        .pipe(
          map(user => fromActions.refreshTokenSuccess({ user: user })),
          catchError(error => of(fromActions.logoutUser()))
        )
    })
  ));

  registerNewAccount$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.registerNewAccount),
    mergeMap(({ registration }) => this._accountsService.registerNewAccount(registration)
      .pipe(
        map(result => fromActions.registerNewAccountResult({ result: result })),
        catchError(error => of(fromActions.registerNewAccountResult({ result: {
          status: 'ERROR',
          message: error.error.message
        }})))
      )
    )
  ));

  passwordReqeust$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.passwordRequestReset),
    mergeMap(({ request }) => this._accountsService.passwordRequestReset(request)
      .pipe(
        map(response => fromActions.passwordRequestResetResult({ result: response })),
        // catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  passwordReset$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.passwordReset),
    mergeMap(({ request }) => this._accountsService.passwordReset(request)
      .pipe(
        map(response => fromActions.passwordResetResult({ result: response })),
        // catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));
}

