import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { AuthenticationService } from '@sn/core/services';
import { AuthenticatedUser } from '@sn/shared/models';
import { AuthenticationActions } from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private _actions: Actions,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { }

  loginUser$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.loginUser),
    mergeMap(({ credentials }) => this._authenticationService.authenticateUser(credentials)
      .pipe(
        map(user => AuthenticationActions.loginUserSuccess({ user: user })),
        catchError(error => of(AuthenticationActions.loginUserError({ error: error.error })))
      )
    )
  ));

  logoutUser$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.logoutUser),
    tap(() => {
      this._authenticationService.logoutUser();
      this._router.navigate(['/auth', 'login']);
    })
  ), { dispatch: false });

  refreshToken$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.refreshToken),
    mergeMap(() => {
      const authenticatedUser: AuthenticatedUser = this._authenticationService.getStoredAuthenticatedUser();
      const accessToken: string = authenticatedUser.accessToken;
      const refreshToken: string = authenticatedUser.refreshToken;
      return this._authenticationService.refreshToken(accessToken, refreshToken)
        .pipe(
          map(user => AuthenticationActions.refreshTokenSuccess({ user: user })),
          catchError(error => of(AuthenticationActions.logoutUser()))
        )
    })
  ));
}

