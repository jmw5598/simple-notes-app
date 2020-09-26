import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { searchTopics } from '@sn/core/store/actions';
import { selectSearchTopicsResult } from '@sn/core/store/selectors';
import { Topic } from '@sn/shared/models'
import { Page, PageRequest, PageableSearch, IPageable } from '../models';
import { DEFAULT_SEARCH_TOPICS_PAGE } from '../defaults';


@Injectable({
  providedIn: 'root'
})
export class TopicsSearchResultGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const pageable: IPageable = DEFAULT_SEARCH_TOPICS_PAGE;
    const search: PageableSearch = {
      searchTerm: '',
      pageable: pageable
    };

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
