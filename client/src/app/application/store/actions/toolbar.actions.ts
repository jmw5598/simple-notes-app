import { createAction, props } from '@ngrx/store';
import { KeyboardShortcutAction, ResponseMessage } from '@sn/core/models';

export const getKeyboardShortcuts = createAction(
  '[Toolbar] Get Keyboard Shortcuts'
);

export const setKeyboareShortcuts = createAction(
  '[Toolbar] Set Keyboard Shortcuts',
  props<{ shortcuts: KeyboardShortcutAction[] }>()
);

export const createKeyboardShortcut = createAction(
  '[Toolbar] Create Keyboard Shortcut',
  props<{ actionId: number, shortcut: string }>()
);

export const createKeyboardShortcutSuccess = createAction(
  '[Toolbar] Create Keyboard Shortcut Success',
  props<{ shortcut: KeyboardShortcutAction }>()
);

export const createKeyboardShortcutResponseMessage = createAction(
  '[Toolbar] Create Keyboard Shortcut Response Message',
  props<{ message: ResponseMessage }>()
);

export const updateKeyboardShortcut = createAction(
  '[Toolbar] Update Keyboard Shortcut',
  props<{ actionId: number, shortcutId: number, shortcut: string }>()
);

export const updateKeyboardShortcutSuccess = createAction(
  '[Toolbar] Update Keyboard Shortcut Success',
  props<{ action: KeyboardShortcutAction }>()
);

export const updateKeyboardShortcutResponseMessage = createAction(
  '[Toolbar] Update Keyboard Shortcut Response Message',
  props<{ message: ResponseMessage }>()
);

export const deleteKeyboardShortcut = createAction(
  '[Toolbar] Delete Keyboard Shortcut',
  props<{ shortcutId: number }>()
);

export const deleteKeyboardShortcutSuccess = createAction(
  '[Toolbar] Delete Keyboard Shortcut Success',
  props<{ action: KeyboardShortcutAction }>()
);

export const deleteKeyboardShortcutResponseMessage = createAction(
  '[Toolbar] Delete Keyboard Shortcut Response Message',
  props<{ message: ResponseMessage }>()
);

export const setKeyboardShortcutResponseMessage = createAction(
  '[Toolbar] Set Keyboard Shortcut Response Message',
  props<{ message: ResponseMessage }>()
);
