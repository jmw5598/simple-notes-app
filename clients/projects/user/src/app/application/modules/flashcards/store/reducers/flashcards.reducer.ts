import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { ResponseMessage, Page } from '@sn/user/core/models';
import { Flashcard, FlashcardSet } from '@sn/user/shared/models';

export const flashcardsFeatureKey = 'flashcards';

export interface IFlashcardsState {
  createFlashcardSetResponseMessage: ResponseMessage,
  updateFlashcardSetResponseMessage: ResponseMessage;
  deleteFlashcardSetResponseMessage: ResponseMessage,
  searchFlashcardSetsResult: Page<FlashcardSet>;
  flashcardSetBuilder: FlashcardSet;
  flashcardBeingEdited: Flashcard;
  selectedFlashcardSet: FlashcardSet;
}

export const initialFlashcardSetBuilderState: FlashcardSet = {
  title: '',
  synopsis: '',
  flashcards: []
} as FlashcardSet;

export const initialFlashcardsState: IFlashcardsState = {
  createFlashcardSetResponseMessage: null,
  updateFlashcardSetResponseMessage: null,
  deleteFlashcardSetResponseMessage: null,
  searchFlashcardSetsResult: null,
  flashcardSetBuilder: initialFlashcardSetBuilderState,
  flashcardBeingEdited: null,
  selectedFlashcardSet: null
}

const onSetCreateFlashcardSetResponseMessage = (state, { message }: any) => ({
  ...state,
  createFlashcardSetResponseMessage: message
});

const onSetUpdateFlashcardSetResponseMessage = (state, { message }: any) => ({
  ...state,
  updateFlashcardSetResponseMessage: message
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
    ...(flashcardSetBuilder || initialFlashcardSetBuilderState)
  }
});

const onResetFlashcardSetBuilder = (state) => ({
  ...state,
  flashcardSetBuilder: {
    ...initialFlashcardSetBuilderState
  }
});

const onSetFlashcardBeingEdited = (state, { flashcard }) => ({
  ...state,
  flashcardBeingEdited: flashcard
});

const onUpdateFlashcardInFlashcardSet = (state, { flashcard }) => ({
  ...state,
  flashcardSetBuilder: {
    ...state.flashcardSetBuilder,
    flashcards: state.flashcardSetBuilder.flashcards
      .map(fc => {
        if (fc.id === flashcard.id) {
          return flashcard
        }
        return fc;
      })
  }
} as IFlashcardsState);

const onSetSelectedFlashcardSet = (state, { flashcardSet }) => ({
  ...state,
  selectedFlashcardSet: flashcardSet
});

const _flashcardsReducer = createReducer(
  initialFlashcardsState,
  on(fromActions.setCreateFlashcardSettResponseMessage, onSetCreateFlashcardSetResponseMessage),
  on(fromActions.setUpdateFlashcardSetResponseMessage, onSetUpdateFlashcardSetResponseMessage),
  on(fromActions.setDeleteFlashcardSetResponseMessage, onSetDeleteFlashcardSetResponseMessage),
  on(fromActions.searchFlashcardSetsResult, onSearchFlashcardSetsResult),
  on(fromActions.addFlashcardToFlashcardSetBuilder, onAddFlashcardToFlashcardSetBuilder),
  on(fromActions.removeFlashcardFromFlashcardSetBuilder, onRemoveFlashcardFromFlashcardSetBuilder),
  on(fromActions.setFlashcardsForFlashcardSetBuilder, onSetFlashcardsForFlashcardSetBuilder),
  on(fromActions.setFlashcardSetBuilder, onSetFlashcardSetBuilder),
  on(fromActions.resetFlashcardSetBuilder, onResetFlashcardSetBuilder),
  on(fromActions.setFlashcardBeingEdited, onSetFlashcardBeingEdited),
  on(fromActions.updateFlashcardInFlashcardSet, onUpdateFlashcardInFlashcardSet),
  on(fromActions.setSelectedFlashcardSet, onSetSelectedFlashcardSet),
);

export function flashcardsReducer(state, action) {
  return _flashcardsReducer(state, action);
}
