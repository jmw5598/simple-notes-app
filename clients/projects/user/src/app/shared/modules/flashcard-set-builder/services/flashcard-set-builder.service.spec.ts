import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Flashcard, FlashcardSet } from '@sn/shared/models';
import { BehaviorSubject } from 'rxjs';

import { SnFlashcardSetBuilderService } from './flashcard-set-builder.service';

import * as flashcardActions from '@sn/user/application/modules/flashcards/store/actions';

describe('SnFlashcardSetBuilderService', () => {
  let service: SnFlashcardSetBuilderService;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  }; 

  const mockFlashcard: Flashcard = {
    id: -1,
    frontContent: 'Test Front Content',
    backContent: 'Test Back Content'
  } as Flashcard

  const mockFlascardSet: FlashcardSet = {
    id: -2,
    title: 'Test Set',
    flashcards: []
  } as FlashcardSet

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    service = TestBed.inject(SnFlashcardSetBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should disptach addFlashcardToFlashcardSetBuilder action when addFlashcard is called with a flashcard', () => {
    spyOn(testStore, 'dispatch');
    service.addFlashcard(mockFlashcard);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.addFlashcardToFlashcardSetBuilder({
        flashcard: mockFlashcard
      })
    );
  });

  it('should dispatch updateFlashcardInFlashcardSet action when updateFlashcard is called with new flashcard values', () => {
    spyOn(testStore, 'dispatch');
    service.updateFlashcard(mockFlashcard);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.updateFlashcardInFlashcardSet({
        flashcard: mockFlashcard
      })
    );
  });

  it('should dispatch setFlashcardBeingEdited when setFlashcardBeingEdited is called with an existing flashcard', () => {
    spyOn(testStore, 'dispatch');
    service.setFlashcardBeingEdited(mockFlashcard);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      flashcardActions.setFlashcardBeingEdited({
        flashcard: mockFlashcard
      })
    );
  });
});
