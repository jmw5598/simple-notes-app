import { createReducer, on } from '@ngrx/store';
import { DEFAULT_KEYBOARD_SHORTCUTS } from '@sn/shared/defaults';
import * as fromActions from '../actions';

export const toolbarFeatureKey = 'toolbar';

export interface IToolbarState {
  keyboardShortcuts: any[]
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
  })
);

export function toolbarReducer(state, action) {
  return _toolbarReducer(state, action);
}
