import { Injectable } from '@angular/core';
import { Flashcard, FlashcardSet } from '@sn/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FlashcardSetViewerControlsService {
  private _flashcardSet: FlashcardSet;

  private _currentFlashcard: Flashcard;
  private _currentFlashcardIndex: number;
  private _currentFlashcardSource: BehaviorSubject<Flashcard> = new BehaviorSubject<Flashcard>(null);
  
  private _currentFlashcardFlipped: boolean = false;
  private _currentFlashcardFlippedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._currentFlashcardFlipped);

  constructor() { }

  public setFlashcardSet(flashcardSet: FlashcardSet): void {
    this._flashcardSet = flashcardSet;
    if (this._flashcardSet?.flashcards?.length) {
      this._currentFlashcardIndex = 0;
      this._currentFlashcard = this._flashcardSet.flashcards[this._currentFlashcardIndex];
      this._currentFlashcardSource.next(this._currentFlashcard);
    }
  }

  public onCurrentFlashcardChanges(): Observable<Flashcard> {
    return this._currentFlashcardSource.asObservable();
  }

  public onCurrentFlashcardFlipped(): Observable<boolean> {
    return this._currentFlashcardFlippedSource.asObservable();
  }

  public first(): void {
    if (this._flashcardSet?.flashcards.length) {
      this._resetCurrentFlashcardFlipped();
      this._currentFlashcardIndex = 0;
      this._currentFlashcard = this._flashcardSet.flashcards[this._currentFlashcardIndex];
      this._currentFlashcardSource.next(this._currentFlashcard);
    }
  }

  public previous(): void {
    if (this._flashcardSet?.flashcards.length) {
      this._resetCurrentFlashcardFlipped();
      this._currentFlashcardIndex = this._currentFlashcardIndex !== 0 
        ? --this._currentFlashcardIndex
        : this._flashcardSet?.flashcards.length - 1;
      this._currentFlashcard = this._flashcardSet.flashcards[this._currentFlashcardIndex];
      this._currentFlashcardSource.next(this._currentFlashcard);
    }
  }

  public random(): void {
    if (this._flashcardSet?.flashcards?.length) {
      this._resetCurrentFlashcardFlipped();
      this._currentFlashcardIndex = this._generateNextRandomFlashcardIndex();
      this._currentFlashcard = this._flashcardSet.flashcards[this._currentFlashcardIndex];
      this._currentFlashcardSource.next(this._currentFlashcard);
    }
  }

  public flip(): void {
    if (this._flashcardSet?.flashcards?.length) {
      this._currentFlashcardFlipped = !this._currentFlashcardFlipped;
      this._currentFlashcardFlippedSource.next(this._currentFlashcardFlipped);
    }
  }

  public next(): void {
    if (this._flashcardSet?.flashcards.length) {
      this._resetCurrentFlashcardFlipped();
      this._currentFlashcardIndex = this._currentFlashcardIndex !== this._flashcardSet?.flashcards?.length - 1 
        ? ++this._currentFlashcardIndex : 0;
      this._currentFlashcard = this._flashcardSet.flashcards[this._currentFlashcardIndex];
      this._currentFlashcardSource.next(this._currentFlashcard);
    }
  }

  public last(): void {
    if (this._flashcardSet?.flashcards?.length) {
      this._resetCurrentFlashcardFlipped();
      this._currentFlashcardIndex = this._flashcardSet.flashcards.length - 1;
      this._currentFlashcard = this._flashcardSet.flashcards[this._currentFlashcardIndex];
      this._currentFlashcardSource.next(this._currentFlashcard);
    }
  }

  public shuffle(): void {
    const shuffledFlashcards: Flashcard[] = this._shuffleFlashcards(this._flashcardSet.flashcards);
    this._flashcardSet = {
      ...this._flashcardSet,
      flashcards: shuffledFlashcards
    } as FlashcardSet;
    this.random();
  }
  
  private _resetCurrentFlashcardFlipped(): void {
    this._currentFlashcardFlipped = false;
    this._currentFlashcardFlippedSource.next(this._currentFlashcardFlipped);
  }

  private _generateNextRandomFlashcardIndex(): number {
    const rangeStart: number = 0;
    const rangeEnd: number = this._flashcardSet.flashcards.length - 1;
    let nextFlashcardIndex: number = this._currentFlashcardIndex;
    while (
      nextFlashcardIndex === this._currentFlashcardIndex 
      && this._flashcardSet?.flashcards?.length > 1
    ) {
      nextFlashcardIndex = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    }
    return nextFlashcardIndex;
  }

  private _shuffleFlashcards(flashcards: Flashcard[]): Flashcard[] {
    if (flashcards.length === 0) return flashcards;
    let originalFlashcards = flashcards.map(f => ({...f}));
    let randomIndex = 0;
    let tempItem: Flashcard;
    for (let i = 0, randomIndex = i; i < originalFlashcards.length; i++, randomIndex = i) {
      while (randomIndex === i) {
        randomIndex = Math.floor(Math.random() * originalFlashcards.length);
      }
      tempItem = originalFlashcards[i];
      originalFlashcards[i] = originalFlashcards[randomIndex];
      originalFlashcards[randomIndex] = tempItem;
    }
    return originalFlashcards;
  }
}
