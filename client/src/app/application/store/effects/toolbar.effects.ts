import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettingsService } from '@sn/core/services';
import { of } from 'rxjs';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import * as fromToolbar from '../actions/toolbar.actions';
import * as fromHttp from '../actions/http-error.actions';
import { KeyboardShortcutAction } from '../../../core/models/keyboard-shortcut-action.model';

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
        catchError(error => of(fromHttp.handleHttpError({ error: error })))
      )
    )
  ));

  updateKeyboardShortcut$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.updateKeyboardShortcut),
    switchMap(({shortcutId, shortcut}) => this._settingsService.updateKeyboardShortcut(shortcutId, shortcut)
      .pipe(
        map((shortcut: KeyboardShortcutAction) => fromToolbar.updateKeyboardShortcutSuccess({ action: shortcut })),
        catchError(error => of(fromHttp.handleHttpError({ error: error })))
      )
    )
  ))

  deleteKeyboardShortcut$ = createEffect(() => this._actions.pipe(
    ofType(fromToolbar.deleteKeyboardShortcut),
    exhaustMap(({shortcutId}) => this._settingsService.deleteKeyboardShortcut(shortcutId)
      .pipe(
        map((shortcut: KeyboardShortcutAction) => fromToolbar.deleteKeyboardShortcutSuccess({ action: shortcut })),
        catchError(error => of(fromHttp.handleHttpError({ error: error })))
      )
    )
  ));
}
