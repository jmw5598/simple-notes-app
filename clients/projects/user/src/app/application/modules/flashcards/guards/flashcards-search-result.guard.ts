import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { DEFAULT_SEARCH_FLASHCARDS_PAGE } from '@sn/user/core/defaults';
import { IPageable, Page, PageableSearch } from '@sn/user/core/models';
import { FlashcardSet } from '@sn/user/shared/models';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { searchFlashcardSets } from '../store/actions';
import { IFlashcardsState } from '../store/reducers';
import { selectSearchFlashcardSetsResult } from '../store/selectors';

import { OverlayLoaderService } from '@sn/shared/components';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsSearchResultGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<IFlashcardsState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const pageable: IPageable = DEFAULT_SEARCH_FLASHCARDS_PAGE;
    const search: PageableSearch = {
      searchTerm: '',
      pageable: pageable
    };
    return this._setSearchFlashcardSetsResultFromStoreOrApi(search).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _setSearchFlashcardSetsResultFromStoreOrApi(search: PageableSearch): Observable<Page<FlashcardSet>> {
    return this._store.select(selectSearchFlashcardSetsResult).pipe(
      tap((page: Page<FlashcardSet>) => {
        if (!page) {
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(searchFlashcardSets({ search: search }));
        }
      }),
      filter((page: Page<FlashcardSet>) => !!page),
      take(1)
    );
  }
}
