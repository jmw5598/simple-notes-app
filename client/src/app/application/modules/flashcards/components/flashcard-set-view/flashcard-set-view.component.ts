import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Flashcard, FlashcardSet } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { IFlashcardsState } from '../../store/reducers';
import * as flashcardActions from '../../store/actions';
import * as flashcardSelectors from '../../store/selectors';
import { tap } from 'rxjs/operators';
import { FlashcardSetViewerControlsService } from '@sn/shared/components/flashcard-set-viewer/services/flashcard-set-viewer-controls.service';

@Component({
  selector: 'sn-flashcard-set-view',
  templateUrl: './flashcard-set-view.component.html',
  styleUrls: ['./flashcard-set-view.component.scss'],
  providers: [FlashcardSetViewerControlsService]
})
export class FlashcardSetViewComponent implements OnInit {
  public selectedFlashcardSet$: Observable<FlashcardSet>;
  
  constructor(
    private _store: Store<IFlashcardsState>,
  ) { }

  ngOnInit(): void {
    this.selectedFlashcardSet$ = this._store.select(flashcardSelectors.selectSelectedFlashcardSet);
  }
}
