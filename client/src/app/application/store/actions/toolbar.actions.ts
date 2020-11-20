import { createAction, props } from '@ngrx/store';

export const getKeyboardShortcuts = createAction(
  '[Toolbar] Get Keyboard Shortcuts'
);

export const setKeyboareShortcuts = createAction(
  '[Toolbar] Set Keyboard Shortcuts',
  props<{ shortcuts: any[] }>()
);
