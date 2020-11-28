import { createReducer, on } from '@ngrx/store';
import { KeyboardShortcutAction, ResponseMessage } from '@sn/core/models';
import * as fromActions from '../actions';

export const toolbarFeatureKey = 'toolbar';

export interface IToolbarState {
  keyboardShortcuts: KeyboardShortcutAction[],
  keyboardShortcutResponseMessage: ResponseMessage
}

export const initialToolbarState: IToolbarState = {
  keyboardShortcuts: null,
  keyboardShortcutResponseMessage: null
}

const _toolbarReducer = createReducer(
  initialToolbarState,
  on(fromActions.setKeyboareShortcuts, (state, { shortcuts }) => {
    return {
      ...state,
      keyboardShortcuts: shortcuts
    }
  }),
  on(fromActions.createKeyboardShortcutSuccess, (state, { shortcut }) => {
    const shortcuts: KeyboardShortcutAction[] = state.keyboardShortcuts
      .map(a => {
        let existingShortcut: KeyboardShortcutAction = { ...a } as KeyboardShortcutAction;
        if (existingShortcut.id === shortcut.id) existingShortcut = { ...shortcut };
        return existingShortcut;
      });
    return {
      ...state,
      keyboardShortcuts: shortcuts
    }
  }),
  on(fromActions.updateKeyboardShortcutSuccess, (state, { action }) => {
    const shortcuts: KeyboardShortcutAction[] = state.keyboardShortcuts
      .map(a => {
        const existingShortcut: KeyboardShortcutAction = { ...a } as KeyboardShortcutAction;
        if (existingShortcut.id === action.id) existingShortcut.shortcut = action.shortcut;
        return existingShortcut;
      });
    return {
      ...state,
      keyboardShortcuts: shortcuts
    }
  }),
  on(fromActions.deleteKeyboardShortcutSuccess, (state, { action }) => {
    const shortcuts: KeyboardShortcutAction[] = state.keyboardShortcuts
      .map(a => a.id === action.id ? action : a);
    return {
      ...state,
      keyboardShortcuts: shortcuts
    }
  }),
  on(
    fromActions.createKeyboardShortcutResponseMessage,
    fromActions.updateKeyboardShortcutResponseMessage,
    fromActions.deleteKeyboardShortcutResponseMessage,
    fromActions.setKeyboardShortcutResponseMessage,
    (state, { message } ) => {
      return {
        ...state,
        keyboardShortcutResponseMessage: message
      }
    }
  )
);

export function toolbarReducer(state, action) {
  return _toolbarReducer(state, action);
}
