import { createReducer, on } from '@ngrx/store';
import { initialSectionState } from '../state/section.state';
import { Topic, Section } from '@sn/shared/models';
import { Page } from '@sn/core/models';
import * as fromActions from '../actions';

const _sectionReducer = createReducer(
  initialSectionState,
  on(fromActions.updateSectionSuccess, (state, { section }) => {
    const updatedSection: Section = { ...state.selectedSection, ...section }
    return {
      ...state,
      selectedSection: updatedSection
    }
  }),
  on(fromActions.setSelectedSection, (state, { section }) => {
    return {
      ...state,
      selectedSection: section
    }
  }),
  on(fromActions.deleteSectionSuccess, (state, { section }) => {
    const searchSectionsResult: Page<Section> = { ...state.searchSectionsResult };
    return {
      ...state,
      searchSectionsResult: searchSectionsResult
    };
  }),
  on(fromActions.setCreateSectionResponseMessage, (state, { message }) => {
    return {
      ...state,
      createSectionResponseMessage: message
    }
  }),
  on(fromActions.setUpdateSectionResponseMessage, (state, { message }) => {
    return {
      ...state,
      updateSectionResponseMessage: message
    }
  }),
  on(fromActions.setUpdateSectionNotesResponseMessage, (state, { message }) => {
    return {
      ...state,
      updateSectionNotesResponseMessage: message
    }
  }),
  on(fromActions.searchSectionsResult, (state, { page }) => {
    return {
      ...state,
      searchSectionsResult: page
    }
  })
);

export function sectionReducer(state, action) {
  return _sectionReducer(state, action);
}
