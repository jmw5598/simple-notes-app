import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Flashcard, FlashcardSet } from '@sn/shared/models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnFlashcardSetViewerControlsService } from './services/flashcard-set-viewer-controls.service';

@Component({
  selector: 'sn-user-flashcard-set-viewer',
  templateUrl: './flashcard-set-viewer.component.html',
  styleUrls: ['./flashcard-set-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFlashcardSetViewerComponent implements OnInit, OnDestroy {
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
    private _controlsService: SnFlashcardSetViewerControlsService
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
