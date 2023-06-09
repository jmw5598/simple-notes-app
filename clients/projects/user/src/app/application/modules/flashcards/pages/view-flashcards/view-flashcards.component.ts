import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DEFAULT_SEARCH_FLASHCARDS_PAGE } from '@sn/user/core/defaults';

import { fadeAnimation } from '@sn/shared/animations';
import { SnFlashcardSetCreateComponent } from '@sn/user/shared/modules/flashcard-set-create';
import { Observable, of, Subject } from 'rxjs';

import { IFlashcardsState } from '../../store/reducers';
import * as flashcardsActions from '../../store/actions';
import * as flashcardsSelectors from '../../store/selectors';
import { FlashcardSetViewComponent } from '../../components/flashcard-set-view/flashcard-set-view.component';
import { FlashcardSetUpdateComponent } from '../../components/flashcard-set-update/flashcard-set-update.component';
import { takeUntil, tap } from 'rxjs/operators';

import { IPageable, Page, PageableSearch, FlashcardSet } from '@sn/shared/models';

import { SnDrawerLocation, SnDrawerService, SnDrawerSize } from '@sn/drawer';
import { SnOverlayContentService } from '@sn/overlay-content';

@Component({
  selector: 'sn-user-view-flashcards',
  templateUrl: './view-flashcards.component.html',
  styleUrls: ['./view-flashcards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnOverlayContentService],
  animations: [fadeAnimation]
})
export class ViewFlashcardsComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_FLASHCARDS_PAGE;
  public DrawerLocation = SnDrawerLocation;
  public isSearching: boolean = false;

  public searchFlashcardSetsResult$: Observable<Page<FlashcardSet>>;
  public searchTerm: string = '';

  constructor(
    private _store: Store<IFlashcardsState>,
    private _drawerService: SnDrawerService,
    private _overlayContentService: SnOverlayContentService
  ) { }

  ngOnInit(): void {
    this.searchFlashcardSetsResult$ = this._store.select(flashcardsSelectors.selectSearchFlashcardSetsResult)
      .pipe(tap(() => this.isSearching = false));
    this._listenForDeleteFlashcardSetResponseMessage();
  }

  public onCreate(): void {
    this._drawerService.show(SnFlashcardSetCreateComponent, {
      size: SnDrawerSize.LARGE
    });
  }

  public onDelete(flashcardSetId: number): void {
    this._store.dispatch(flashcardsActions.deleteFlashcardSet({ flashcardSetId: flashcardSetId }));
  }

  public onView(flashcardSet: FlashcardSet): void {
    this._store.dispatch(flashcardsActions.getFlashcardSetById({ flashcardSetId: flashcardSet.id }));
    this._overlayContentService.show(FlashcardSetViewComponent, {
      closeOnOverlayClick: false,
      data: flashcardSet
    });
  }

  public onEdit(flashcardSet: FlashcardSet): void {
    this._store.dispatch(flashcardsActions.getFlashcardSetById({ flashcardSetId: flashcardSet.id }));
    this._drawerService.show(FlashcardSetUpdateComponent, {
      size: SnDrawerSize.LARGE,
      data: document 
    });
  }

  public onGoToPage(pageable: IPageable): void {
    const documentSearch: PageableSearch = {
      searchTerm: '', //this.searchTerm || '',
      pageable: pageable
    };
    this._store.dispatch(flashcardsActions.searchFlashcardSets({ search: documentSearch }));
  }

  public onSearchFlashcards(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.isSearching = true;
    const search: PageableSearch = {
      searchTerm: searchTerm,
      pageable: this.DEFAULT_PAGE
    };
    this._store.dispatch(flashcardsActions.searchFlashcardSets({ search: search }));
  }

  public _listenForDeleteFlashcardSetResponseMessage(): void {
    this._store.select(flashcardsSelectors.selectDeleteFlashcardSetResponseMessage)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(message => {
        this.onSearchFlashcards(this.searchTerm);
      })
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
