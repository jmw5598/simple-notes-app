import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AccountsService, AuthenticationService, SettingsService, ThemesService } from '@sn/core/services';
import { of } from 'rxjs';
import { tap, map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromCore from '@sn/user/core/store/actions';
import { updateUserSettingsSuccess } from '@sn/user/auth/store/actions';

import { Theme, UserSettings } from '@sn/shared/models';

@Injectable()
export class AccountsEffects {
  constructor(
    private _actions: Actions,
    private _authenticationService: AuthenticationService,
    private _accountsService: AccountsService,
    private _themesService: ThemesService,
    private _settingsService: SettingsService
  ) {}

  getAccountDetails$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAccountDetails),
    mergeMap(() => this._accountsService.getAccountDetails()
      .pipe(
        map(details => fromActions.getAccountDetailsSuccess({ account: details })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));

  getAccountProfile$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAccountProfile),
    mergeMap(() => this._accountsService.getAccountProfile()
      .pipe(
        map((profile) => fromActions.getAccountProfileSuccess({ profile: profile })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));
  
  updateAccountDetails$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateAccountDetails),
    mergeMap(({ account }) => this._accountsService.updateAccountDetails(account)
      .pipe(
        map(response => fromActions.updateAccountDetailsSuccess({ account: response })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
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
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));

  updateAccountProfileSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateAccountProfileSuccess),
    tap(({ profile }) => {
      this._openNewNotificationSuccess(`We successfully updated your account profile!`);
    })
  ), { dispatch: false });

  getThemes$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getThemes),
    mergeMap(() => this._themesService.findAll()
      .pipe(
        map((themes) => fromActions.getThemesSuccess({ themes: themes })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));

  changeAccountTheme$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.changeAccountTheme),
    switchMap(({theme}) => this._settingsService.changeAccountTheme(theme)
      .pipe(
        map((theme: Theme) => fromActions.changeAccountThemeSuccess({ theme: theme })),
        catchError(error => of(fromCore.handleHttpError({ error: error })))
      )
    )
  ));

  changeAccountThemeSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.changeAccountThemeSuccess),
    switchMap(({theme}) => this._settingsService.changeAccountTheme(theme)
      .pipe(
        map((theme: Theme) => {
          this._authenticationService.setStoredUserSettings({ theme: theme } as UserSettings);
          return updateUserSettingsSuccess({ settings: { theme: theme }});
        })
      )
    )
  ));

  private _openNewNotificationSuccess(message: string): void {
    console.log("Error: ", message);
  }
}
