import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Flashcard, FlashcardSet } from '@sn/shared/models';
import { FlashcardSetBuilderService } from '../../../../services/flashcard-set-builder.service';
import * as flashcardSelectors from '@sn/user/application/modules/flashcards/store/selectors';
import { IFlashcardsState } from '@sn/user/application/modules/flashcards/store/reducers';

@Component({
  selector: 'sn-user-flashcard-set',
  templateUrl: './flashcard-set.component.html',
  styleUrls: ['./flashcard-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashcardSetComponent implements OnInit {
  public flashcardSetBuilder$: Observable<FlashcardSet>;

  constructor(
    private _store: Store<IFlashcardsState>,
    private _flashcardBuilderService: FlashcardSetBuilderService
  ) { }

  ngOnInit(): void {
    this.flashcardSetBuilder$ = this._store.select(flashcardSelectors.selectFlashcardSetBuilder);
  }

  public dropFlashcard(event: CdkDragDrop<Flashcard[]>): void {
    this._flashcardBuilderService.dropFlashcard(event);
  }

  public removeFlashcard(flashcard: Flashcard): void {
    this._flashcardBuilderService.removeFlashcard(flashcard);
  }

  public editFlashcard(flashcard: Flashcard): void {
    this._flashcardBuilderService.setFlashcardBeingEdited(flashcard);
  }
}
