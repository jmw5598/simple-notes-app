import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IFlashcardsState } from '@sn/user/application/modules/flashcards/store/reducers';
import { Flashcard } from '@sn/shared/models';

import * as flashcardActions from '@sn/user/application/modules/flashcards/store/actions';
import * as flashcardSelectors from '@sn/user/application/modules/flashcards/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class SnFlashcardSetBuilderService {
  constructor(
    private _store: Store<IFlashcardsState>
  ) { }

  public addFlashcard(flashcard: Flashcard): void {
    this._store.dispatch(flashcardActions.addFlashcardToFlashcardSetBuilder({
      flashcard: flashcard
    }));
  }

  public updateFlashcard(flashcard: Flashcard): void {
    this._store.dispatch(flashcardActions.updateFlashcardInFlashcardSet({
      flashcard: flashcard
    }));
  }

  public setFlashcardBeingEdited(flashcard: Flashcard): void {
    this._store.dispatch(flashcardActions.setFlashcardBeingEdited({
      flashcard: flashcard
    }));
  }

  public onFlashcardBeingEditedChanges(): Observable<Flashcard> {
    return this._store.select(flashcardSelectors.selectFlashcardBeingEdited);
  }

  public removeFlashcard(flashcard: Flashcard): void {
    this._store.dispatch(flashcardActions.removeFlashcardFromFlashcardSetBuilder({
      flashcard: flashcard
    }));
  }
  
  public dropFlashcard(event: CdkDragDrop<Flashcard[]>): void {
    if (event.previousContainer === event.container) {
      this.moveFlashcard(event);
    }
  }

  private moveFlashcard(event: CdkDragDrop<Flashcard[]>): void {
    const containerFlashcards = event.container.data.map(flashcard => ({ ...flashcard }));
    moveItemInArray(
      containerFlashcards,
      event.previousIndex,
      event.currentIndex
    );
    this.updateFlashcards(containerFlashcards);
  }

  private updateFlashcards(flashcards: Flashcard[]): void {
    this._store.dispatch(flashcardActions.setFlashcardsForFlashcardSetBuilder({
      flashcards: flashcards
    }));
  }
}
