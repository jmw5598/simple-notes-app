import { createReducer, on } from '@ngrx/store';
import { KeyboardShortcutAction } from '@sn/core/models';
import * as fromActions from '../actions';

export const toolbarFeatureKey = 'toolbar';

export interface IToolbarState {
  keyboardShortcuts: KeyboardShortcutAction[]
}

export const initialToolbarState: IToolbarState = {
  keyboardShortcuts: null
}

const _toolbarReducer = createReducer(
  initialToolbarState,
  on(fromActions.setKeyboareShortcuts, (state, { shortcuts }) => {
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
  })
);

export function toolbarReducer(state, action) {
  return _toolbarReducer(state, action);
}
