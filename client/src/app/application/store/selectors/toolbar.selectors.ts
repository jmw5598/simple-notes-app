import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromToolbar from '../reducers';
import * as fromApplication from '../index';

export const selectToolbarState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.toolbar
);

export const selectKeyboardShortcuts = createSelector(
  selectToolbarState,
  (state: fromToolbar.IToolbarState) => state.keyboardShortcuts
);
