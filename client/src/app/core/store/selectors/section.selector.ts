import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ISectionState } from '../state/section.state';

export const selectSectionState = createFeatureSelector<ISectionState>('sections');

export const selectSelectedSection = createSelector(
  selectSectionState,
  (state: ISectionState) => state.selectedSection
);

export const selectCreateSectionResponseMessage = createSelector(
  selectSectionState,
  (state: ISectionState) => state.createSectionResponseMessage
);

export const selectUpdateSectionResponseMessage = createSelector(
  selectSectionState,
  (state: ISectionState) => state.updateSectionResponseMessage
);

export const selectUpdateSectionNotesResponseMessage = createSelector(
  selectSectionState,
  (state: ISectionState) => state.updateSectionNotesResponseMessage
);

export const selectSearchSectionsResult = createSelector(
  selectSectionState,
  (state: ISectionState) => state.searchSectionsResult
);
