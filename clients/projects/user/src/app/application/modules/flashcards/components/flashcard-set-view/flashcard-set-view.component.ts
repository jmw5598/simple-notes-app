import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FlashcardSet } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { IFlashcardsState } from '../../store/reducers';
import * as flashcardActions from '../../store/actions';
import * as flashcardSelectors from '../../store/selectors';
import { SnFlashcardSetViewerControlsService } from '@sn/user/shared/modules/flashcard-set-viewer';

@Component({
  selector: 'sn-user-flashcard-set-view',
  templateUrl: './flashcard-set-view.component.html',
  styleUrls: ['./flashcard-set-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnFlashcardSetViewerControlsService]
})
export class FlashcardSetViewComponent implements OnInit, OnDestroy {
  public selectedFlashcardSet$: Observable<FlashcardSet>;

  constructor(
    private _store: Store<IFlashcardsState>,
  ) { }

  ngOnInit(): void {
    this.selectedFlashcardSet$ = this._store.select(flashcardSelectors.selectSelectedFlashcardSet);
  }

  ngOnDestroy(): void {
    this._store.dispatch(flashcardActions.setSelectedFlashcardSet({ flashcardSet: null }));
  }
}
