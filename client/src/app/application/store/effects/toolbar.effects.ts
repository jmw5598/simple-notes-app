import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettingsService } from '@sn/core/services';
import { of } from 'rxjs';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import * as fromToolbar from '../actions/toolbar.actions';
import * as fromHttp from '../actions/http-error.actions';
import { KeyboardShortcutAction } from '../../../core/models/keyboard-shortcut-action.model';
import { ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';

@Injectable()
export class ToolbarEffects {
  constructor(
    private _actions: Actions,
    private _settingsService: SettingsService
  ) {}

  getKeyboardShortcuts$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.getKeyboardShortcuts),
    switchMap(() => this._settingsService.getKeyboardShortcuts()
      .pipe(
        map((shortcuts: KeyboardShortcutAction[]) => fromToolbar.setKeyboareShortcuts({ shortcuts: shortcuts })),
        catchError(error => of(fromHttp.handleHttpError({ error: error })))
      )
    )
  ));

  createKeyboardShortcut$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.createKeyboardShortcut),
    exhaustMap(({actionId, shortcut}) => this._settingsService.createKeyboardShortcut(actionId, shortcut)
      .pipe(
        map((shortcut: KeyboardShortcutAction) => fromToolbar.createKeyboardShortcutSuccess({shortcut: shortcut})),
        catchError(error => {
          const message: ResponseMessage = {
            message: `Error creating your shortcut! Please try again`,
            status: ResponseStatus.ERROR
          }
          return of(fromToolbar.createKeyboardShortcutResponseMessage({ message: message }))
        })
      )
    )
  ));

  createKeyboardShortcutSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.createKeyboardShortcutSuccess),
    switchMap(() => {
      const message: ResponseMessage = {
        message: `Successfully created your shortcut!`,
        status: ResponseStatus.SUCCESS
      }
      return of(fromToolbar.createKeyboardShortcutResponseMessage({ message: message }))
    })
  ))

  updateKeyboardShortcut$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.updateKeyboardShortcut),
    switchMap(({actionId, shortcutId, shortcut}) => this._settingsService.updateKeyboardShortcut(actionId, shortcutId, shortcut)
      .pipe(
        map((shortcut: KeyboardShortcutAction) => fromToolbar.updateKeyboardShortcutSuccess({ action: shortcut })),
        catchError(error => {
          const message: ResponseMessage = {
            message: `Error updating your shortcut! Please try again`,
            status: ResponseStatus.ERROR
          }
          return of(fromToolbar.updateKeyboardShortcutResponseMessage({ message: message }))
        })
      )
    )
  ))

  updateKeyboardShortcutSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.updateKeyboardShortcutSuccess),
    switchMap(() => {
      const message: ResponseMessage = {
        message: `Successfully updated your shortcut!`,
        status: ResponseStatus.SUCCESS
      }
      return of(fromToolbar.updateKeyboardShortcutResponseMessage({ message: message }))
    })
  ))

  deleteKeyboardShortcut$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.deleteKeyboardShortcut),
    exhaustMap(({shortcutId}) => this._settingsService.deleteKeyboardShortcut(shortcutId)
      .pipe(
        map((shortcut: KeyboardShortcutAction) => fromToolbar.deleteKeyboardShortcutSuccess({ action: shortcut })),
        catchError(error => {
          const message: ResponseMessage = {
            message: `Error deleting your shortcut! Please try again`,
            status: ResponseStatus.ERROR
          }
          return of(fromToolbar.deleteKeyboardShortcutResponseMessage({ message: message }))
        })
      )
    )
  ));

  deleteKeyboardShortcutSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.deleteKeyboardShortcutSuccess),
    switchMap(() => {
      const message: ResponseMessage = {
        message: `Successfully deleted your shortcut!`,
        status: ResponseStatus.SUCCESS
      }
      return of(fromToolbar.deleteKeyboardShortcutResponseMessage({ message: message }))
    })
  ))
}
