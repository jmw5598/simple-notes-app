import { createReducer, on } from '@ngrx/store';
import { deleteSectionSuccess, setSelectedSection } from '../actions/section.actions';
import { initialSectionState } from '../state/section.state';
import { Section } from '@sn/shared/models';
import { selectSelectedSection } from '../selectors';

const _sectionReducer = createReducer(
  initialSectionState,
  on(setSelectedSection, (state, { section }) => {
    return {
      ...state,
      selectedSection: section
    }
  })
);

export function sectionReducer(state, action) {
  return _sectionReducer(state, action);
}
