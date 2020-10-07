import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AccountsService } from '@sn/core/services';
import { of } from 'rxjs';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions';

@Injectable()
export class AccountEffects {
  constructor(
    private _actions: Actions,
    private _accountsService: AccountsService
  ) {}

  getAccountDetails$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAccountDetails),
    mergeMap(() => this._accountsService.getAccountDetails()
      .pipe(
        map(details => fromActions.getAccountDetailsSuccess({ account: details })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  getAccountProfile$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAccountProfile),
    mergeMap(() => this._accountsService.getAccountProfile()
      .pipe(
        map((profile) => fromActions.getAccountProfileSuccess({ profile: profile })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
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
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  passwordReset$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.passwordReset),
    mergeMap(({ request }) => this._accountsService.passwordReset(request)
      .pipe(
        map(response => fromActions.passwordResetResult({ result: response })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  updateAccountDetails$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateAccountDetails),
    mergeMap(({ account }) => this._accountsService.updateAccountDetails(account)
      .pipe(
        map(response => fromActions.updateAccountDetailsSuccess({ account: response })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  updateAccountDetailsSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateAccountDetailsSuccess),
    tap(({ account }) => {
      this._openNewNotificationSuccess(`We successfully updated your account details!`);
    })
  ), { dispatch: false });

  updateAccountProfile$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateAccountProfile),
    mergeMap(({ profile })=> this._accountsService.updateAccountProfile(profile)
      .pipe(
        map(response => fromActions.updateAccountProfileSuccess({ profile: response })),
        catchError(error => of(fromActions.handleHttpError({ error: error })))
      )
    )
  ));

  updateAccountProfileSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateAccountProfileSuccess),
    tap(({ profile }) => {
      this._openNewNotificationSuccess(`We successfully updated your account profile!`);
    })
  ), { dispatch: false });

  private _openNewNotificationSuccess(message: string): void {
    console.log("Error: ", message);
  }
}
