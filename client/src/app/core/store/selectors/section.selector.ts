import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ISectionState } from '../state/section.state';

export const selectSectionState = createFeatureSelector<ISectionState>('sections');

export const selectSelectedSection = createSelector(
  selectSectionState,
  (state: ISectionState) => state.selectedSection
);
