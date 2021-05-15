import { createAction, props } from '@ngrx/store';
import { Page, PageableSearch, ResponseMessage } from '@sn/core/models';
import { Flashcard, FlashcardSet } from '@sn/shared/models';

export const createFlashcardSet = createAction(
  '[Flashcards] Create Flashcard Set',
  props<{ flashcardSet: FlashcardSet }>()
);

export const createFlashcardSetSuccess = createAction(
  '[Flashcards] Create Flashcard Set Success',
  props<{ flashcardSet: FlashcardSet }>()
);

export const setCreateFlashcardSettResponseMessage = createAction(
  '[Flashcards] Set Create Flashcard Set Response Message ',
  props<{ message: ResponseMessage }>()
);

export const deleteFlashcardSet = createAction(
  '[Flashcards] Delete Flashcard Set',
  props<{ flashcardSetId: number }>()
);

export const deleteFlashcardSetSuccess = createAction(
  '[Flashcards] Delete Flashcard Set Success',
  props<{ flashcardSet: FlashcardSet }>()
);

export const setDeleteFlashcardSetResponseMessage = createAction(
  '[Flashcards] Set Delete Flashcard Set Response Message',
  props<{ message: ResponseMessage }>()
);

export const updateFlashcardSet = createAction(
  '[Flashcards] Update Flashcard Set',
  props<{ flashcardSetId: number, flashcardSet: FlashcardSet }>()
);

export const updateFlashcardSetSuccess = createAction(
  '[Flashcards] Update Flashcard Set Success',
  props<{ flashcardSet: FlashcardSet }>()
);

export const setUpdateFlashcardSetResponseMessage = createAction(
  '[Flashcards] Set Update Flashcard Set Response Message',
  props<{ message: ResponseMessage }>()
);

export const getFlashcardSetById = createAction(
  '[Flashcards] Get Flashcard Set By Id',
  props<{ flashcardSetId: number }>()
);

export const getFlashcardSetByIdSuccess = createAction(
  '[Flashcards] Get Flashcard Set By Id',
  props<{ flashcardSet: FlashcardSet }>()
);

export const searchFlashcardSets = createAction(
  '[Flashcards] Search Flashcard Sets',
  props<{ search: PageableSearch }>()
);

export const searchFlashcardSetsResult = createAction(
  '[Flashcards] Search Flashcard Sets',
  props<{ page: Page<FlashcardSet> }>()
);

export const setFlashcardSetBuilder = createAction(
  '[Flashcards] Set Flashcard Set Builder',
  props<{ flashcardSetBuilder: FlashcardSet }>()
);

export const resetFlashcardSetBuilder = createAction(
  '[Flashcards] Reset Flashcard Set Builder'
);

export const addFlashcardToFlashcardSetBuilder = createAction(
  '[Flashcards] Add Flashcard to Flashcard Set Builder',
  props<{ flashcard: Flashcard }>()
);

export const removeFlashcardFromFlashcardSetBuilder = createAction(
  '[Flashcards] Remove Flashcard from Flashcard Set Builder',
  props<{ flashcard: Flashcard }>()
);

export const setFlashcardsForFlashcardSetBuilder = createAction(
  '[Flashcards] Set Flashcards for Flashcard Set Builder',
  props<{ flashcards: Flashcard[] }>()
);
