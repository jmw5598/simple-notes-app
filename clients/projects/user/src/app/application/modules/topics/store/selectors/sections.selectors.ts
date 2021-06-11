import { createSelector } from '@ngrx/store';
import * as fromSections from '../reducers/sections.reducers';
import * as fromApplication from '../../../../store/index';

export const selectSectionState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.sections
);

export const selectSelectedSection = createSelector(
  selectSectionState,
  (state: fromSections.ISectionsState) => state.selectedSection
);

export const selectCreateSectionResponseMessage = createSelector(
  selectSectionState,
  (state: fromSections.ISectionsState) => state.createSectionResponseMessage
);

export const selectUpdateSectionResponseMessage = createSelector(
  selectSectionState,
  (state: fromSections.ISectionsState) => state.updateSectionResponseMessage
);

export const selectUpdateSectionNotesResponseMessage = createSelector(
  selectSectionState,
  (state: fromSections.ISectionsState) => state.updateSectionNotesResponseMessage
);

export const selectSearchSectionsResult = createSelector(
  selectSectionState,
  (state: fromSections.ISectionsState) => state.searchSectionsResult
);
