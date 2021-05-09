import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { ResponseMessage, Page } from '@sn/core/models';
import { FlashcardSet } from '@sn/shared/models';

export const flashcardsFeatureKey = 'flashcards';

export interface IFlashcardsState {
  createFlashcardSetResponseMessage: ResponseMessage,
  searchFlashcardSetsResult: Page<FlashcardSet>;
}

export const initialFlashcardsState: IFlashcardsState = {
  createFlashcardSetResponseMessage: null,
  searchFlashcardSetsResult: null
}

const onSetCreateFlashcardSetResponseMessage = (state, { message }: any) => ({
  ...state,
  createFlashcardSetResponseMessage: message
});

const onSearchFlashcardSetsResult = (state, { page }: any) => {
  console.log("settin flashcard search result in reducer", page);
  return {
  ...state,
  searchFlashcardSetsResult: page
} as IFlashcardsState}

const _flashcardsReducer = createReducer(
  initialFlashcardsState,
  on(fromActions.setCreateFlashcardSettResponseMessage, onSetCreateFlashcardSetResponseMessage),
  on(fromActions.searchFlashcardSetsResult, onSearchFlashcardSetsResult),
);

export function flashcardsReducer(state, action) {
  return _flashcardsReducer(state, action);
}
