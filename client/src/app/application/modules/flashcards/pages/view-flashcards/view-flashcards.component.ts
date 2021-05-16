import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DEFAULT_SEARCH_FLASHCARDS_PAGE } from '@sn/core/defaults';
import { IPageable, Page } from '@sn/core/models';
import { fadeAnimation } from '@sn/shared/animations';
import { AbstractPageOverlayLoader, DrawerLocation, DrawerService, DrawerSize, FlashcardSetCreateComponent, OverlayLoaderService } from '@sn/shared/components';
import { FlashcardSet } from '@sn/shared/models';
import { Observable, of, Subject } from 'rxjs';

import { IFlashcardsState } from '../../store/reducers';
import * as flashcardsActions from '../../store/actions';
import * as flashcardsSelectors from '../../store/selectors';
import { FlashcardSetViewComponent } from '../../components/flashcard-set-view/flashcard-set-view.component';
import { FlashcardSetUpdateComponent } from '../../components/flashcard-set-update/flashcard-set-update.component';
import { OverlayContentService } from '@sn/shared/components/overlay-content/overlay-content.service';

@Component({
  selector: 'sn-view-flashcards',
  templateUrl: './view-flashcards.component.html',
  styleUrls: ['./view-flashcards.component.scss'],
  providers: [OverlayContentService],
  animations: [fadeAnimation]
})
export class ViewFlashcardsComponent extends AbstractPageOverlayLoader implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  private readonly DEFAULT_PAGE: IPageable = DEFAULT_SEARCH_FLASHCARDS_PAGE;
  public DrawerLocation = DrawerLocation;
  public isSearching: boolean = false;

  public searchFlashcardSetsResult$: Observable<Page<FlashcardSet>>;

  constructor(
    private _store: Store<IFlashcardsState>,
    private _drawerService: DrawerService,
    protected _overlayLoaderService: OverlayLoaderService,
    private _overlayContentService: OverlayContentService
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
    this.searchFlashcardSetsResult$ = this._store.select(flashcardsSelectors.selectSearchFlashcardSetsResult);
  }

  public onCreate(): void {
    this._drawerService.show(FlashcardSetCreateComponent, {
      size: DrawerSize.LARGE
    });
  }

  public onDelete(flashcardSetId: number): void {
    //TODO handle delete repsone message and rerun search
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
      size: DrawerSize.LARGE,
      data: document 
    });
  }

  public onGoToPage(pageable: IPageable): void {
  
  }

  public onSearchFlashcards(): void {

  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
