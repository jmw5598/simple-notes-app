import { createReducer, on } from '@ngrx/store';
import { Section } from '@sn/shared/models';
import { Page, ResponseMessage } from '@sn/shared/models';
import * as fromActions from '../actions';

export const sectionsFeatureKey = 'sections';

export interface ISectionsState {
  selectedSection: Section,
  createSectionResponseMessage: ResponseMessage,
  updateSectionResponseMessage: ResponseMessage,
  updateSectionNotesResponseMessage: ResponseMessage,
  searchSectionsResult: Page<Section>
};

export const initialSectionState: ISectionsState = {
  selectedSection: null,
  createSectionResponseMessage: null,
  updateSectionResponseMessage: null,
  updateSectionNotesResponseMessage: null,
  searchSectionsResult: null
};

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
    const page: Page<Section> = { ...state.searchSectionsResult } as Page<Section>;
    page.elements = page.elements.filter(s => s.id !== section.id);
    return {
      ...state,
      searchSectionsResult: page
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
