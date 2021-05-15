import { createAction, createSelector } from '@ngrx/store';
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

export const selectFlashcardSetBuilder = createSelector(
  selectFlashcardsState,
  (state: fromFlashcards.IFlashcardsState) => state.flashcardSetBuilder
);

export const selectCreateFlashcardSetResponseMessage = createSelector(
  selectFlashcardsState,
  (state: fromFlashcards.IFlashcardsState) => state.createFlashcardSetResponseMessage
);

export const selectUpdateFlashcardSetResponseMessage = createSelector(
  selectFlashcardsState,
  (state: fromFlashcards.IFlashcardsState) => state.updateFlashcardSetResponseMessage
);

export const selectDeleteFlashcardSetResponseMessage = createSelector(
  selectFlashcardsState,
  (state: fromFlashcards.IFlashcardsState) => state.deleteFlashcardSetResponseMessage
);
