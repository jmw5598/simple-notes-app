import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DEFAULT_SEARCH_TOPICS_PAGE } from '@sn/core//defaults';
import { Topic } from '@sn/shared/models';
import { Page, PageRequest, PageableSearch, IPageable } from '@sn/core/models';
import { IApplicationState } from '../../../store/index';
import { searchTopics } from '../store/actions';
import { selectSearchTopicsResult } from '../store/selectors';
import { OverlayLoaderService } from '@sn/shared/components';

@Injectable({
  providedIn: 'root'
})
export class TopicsSearchResultGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<IApplicationState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const pageable: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
    const search: PageableSearch = {
      searchTerm: '',
      pageable: pageable
    };
    // Maybe check if loading first? Will need to add getter to service.
    this._overlayLoaderService.setLoadingState(true);
    return this._setSearchTopicsResultFromStoreOrApi(search).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSearchTopicsResultFromStoreOrApi(search: PageableSearch): Observable<Page<Topic>> {
    return this._store.select(selectSearchTopicsResult).pipe(
      tap((page: Page<Topic>) => {
        if (!page) {
          this._store.dispatch(searchTopics({
            search: search
          }))
        }
      }),
      filter((page: Page<Topic>) => !!page),
      take(1),
    );
  }    
}
