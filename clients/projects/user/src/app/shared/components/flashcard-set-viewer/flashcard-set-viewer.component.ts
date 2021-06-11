import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Flashcard, FlashcardSet } from '@sn/user/shared/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlashcardSetViewerControlsService } from './services/flashcard-set-viewer-controls.service';

@Component({
  selector: 'sn-flashcard-set-viewer',
  templateUrl: './flashcard-set-viewer.component.html',
  styleUrls: ['./flashcard-set-viewer.component.scss']
})
export class FlashcardSetViewerComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  public currentFlashcard$: Observable<Flashcard>;
  public isCurrentFlashcardFlipped: boolean;
  private _flashcardSet: FlashcardSet;

  @Input()
  public set flashcardSet(flashcardSet: FlashcardSet) {
    this._flashcardSet = flashcardSet;
    this._controlsService.setFlashcardSet(this.flashcardSet);
  }

  public get flashcardSet(): FlashcardSet {
    return this._flashcardSet;
  }

  constructor(
    private _controlsService: FlashcardSetViewerControlsService
  ) { }

  ngOnInit(): void {
    this.currentFlashcard$ = this._controlsService.onCurrentFlashcardChanges();
    this._controlsService.onCurrentFlashcardFlipped()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(isCurrentFlashcardFlipped => this.isCurrentFlashcardFlipped = isCurrentFlashcardFlipped);
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
