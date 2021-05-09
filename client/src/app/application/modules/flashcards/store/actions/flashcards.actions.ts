import { createAction, props } from '@ngrx/store';
import { Page, PageableSearch, ResponseMessage } from '@sn/core/models';
import { FlashcardSet } from '@sn/shared/models';

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

export const searchFlashcardSets = createAction(
  '[Flashcards] Search Flashcard Sets',
  props<{ search: PageableSearch }>()
);

export const searchFlashcardSetsResult = createAction(
  '[Flashcards] Search Flashcard Sets',
  props<{ page: Page<FlashcardSet> }>()
);
