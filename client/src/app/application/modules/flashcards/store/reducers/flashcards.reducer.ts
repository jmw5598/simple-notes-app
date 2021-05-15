import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { ResponseMessage, Page } from '@sn/core/models';
import { FlashcardSet } from '@sn/shared/models';

export const flashcardsFeatureKey = 'flashcards';

export interface IFlashcardsState {
  createFlashcardSetResponseMessage: ResponseMessage,
  updateFlashcardSetResponseMessage: ResponseMessage;
  deleteFlashcardSetResponseMessage: ResponseMessage,
  searchFlashcardSetsResult: Page<FlashcardSet>;
  flashcardSetBuilder: FlashcardSet;
}

export const initialFlashcardSetBuilderState: FlashcardSet = {
  title: '',
  synopsis: '',
  flashcards: [
    // {
    //   id: 1,
    //   backContent: 'Tsting',
    //   frontContent: '## testing'
    // },
    // {
    //   id: 2,
    //   backContent: 'Tsting2',
    //   frontContent: '## testing2'
    // },
    // {
    //   id: 3,
    //   backContent: 'Tsting3',
    //   frontContent: '## testing3'
    // },
  ]
} as FlashcardSet;

export const initialFlashcardsState: IFlashcardsState = {
  createFlashcardSetResponseMessage: null,
  updateFlashcardSetResponseMessage: null,
  deleteFlashcardSetResponseMessage: null,
  searchFlashcardSetsResult: null,
  flashcardSetBuilder: initialFlashcardSetBuilderState
}

const onSetCreateFlashcardSetResponseMessage = (state, { message }: any) => ({
  ...state,
  createFlashcardSetResponseMessage: message
});

const onSetDeleteFlashcardSetResponseMessage = (state, { message }: any) => ({
  ...state,
  deleteFlashcardSetResponseMessage: message
});


// TODO FIX THIS!!!!
const onSearchFlashcardSetsResult = (state, { page }: any) => {
  // console.log("settin flashcard search result in reducer", page);
  return {
  ...state,
  searchFlashcardSetsResult: page
} as IFlashcardsState}

const onAddFlashcardToFlashcardSetBuilder = (state, { flashcard }) => ({
  ...state,
  flashcardSetBuilder: {
    ...state.flashcardSetBuilder,
    flashcards: [
      flashcard,
      ...state.flashcardSetBuilder.flashcards
    ] 
  }
} as IFlashcardsState);

const onRemoveFlashcardFromFlashcardSetBuilder = (state, { flashcard }) => ({
  ...state,
  flashcardSetBuilder: {
    ...state.flashcardSetBuilder,
    flashcards: state.flashcardSetBuilder.flashcards.filter(fc => fc.id !== flashcard.id)
  }
} as IFlashcardsState);

const onSetFlashcardsForFlashcardSetBuilder = (state, { flashcards }) => ({
  ...state,
  flashcardSetBuilder: {
    ...state.flashcardSetBuilder,
    flashcards: [...flashcards]
  }
} as IFlashcardsState);

const onSetFlashcardSetBuilder = (state, { flashcardSetBuilder }) => ({
  ...state,
  flashcardSetBuilder: {
    ...flashcardSetBuilder
  }
});

const onResetFlashcardSetBuilder = (state) => ({
  ...state,
  flashcardSetBuilder: {
    ...initialFlashcardSetBuilderState
  }
});

const _flashcardsReducer = createReducer(
  initialFlashcardsState,
  on(fromActions.setCreateFlashcardSettResponseMessage, onSetCreateFlashcardSetResponseMessage),
  on(fromActions.setDeleteFlashcardSetResponseMessage, onSetDeleteFlashcardSetResponseMessage),
  on(fromActions.searchFlashcardSetsResult, onSearchFlashcardSetsResult),
  on(fromActions.addFlashcardToFlashcardSetBuilder, onAddFlashcardToFlashcardSetBuilder),
  on(fromActions.removeFlashcardFromFlashcardSetBuilder, onRemoveFlashcardFromFlashcardSetBuilder),
  on(fromActions.setFlashcardsForFlashcardSetBuilder, onSetFlashcardsForFlashcardSetBuilder),
  on(fromActions.setFlashcardSetBuilder, onSetFlashcardSetBuilder),
  on(fromActions.resetFlashcardSetBuilder, onResetFlashcardSetBuilder),
);

export function flashcardsReducer(state, action) {
  return _flashcardsReducer(state, action);
}
