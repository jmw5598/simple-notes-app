import { createSelector } from '@ngrx/store';
import * as fromFlashcards from '../reducers/flashcards.reducer';
import * as fromApplication from '../../../../store/index';

export const selectFlashcardsState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.flashcards
);

export const selectSearchFlashcardSetsResult = createSelector(
  selectFlashcardsState,
  (state: fromFlashcards.IFlashcardsState) => state.searchFlashcardSetsResult
);

