import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { searchSections } from '@sn/core/store/actions';
import { selectSearchSectionsResult } from '@sn/core/store/selectors';
import { Section } from '@sn/shared/models'
import { Page, PageRequest, PageableSearch, IPageable } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SectionsSearchResultGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const topicId: number = +next.paramMap.get('topicId');
    const pageable: IPageable = PageRequest.from(1, 10, 'updatedAt', 'DESC');
    const search: PageableSearch = {
      searchTerm: '',
      pageable: pageable
    };

    return this._setSearchSectionsResultFromStoreOrApi(topicId, search).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSearchSectionsResultFromStoreOrApi(topicId: number, search: PageableSearch): Observable<Page<Section>> {
    return this._store.select(selectSearchSectionsResult).pipe(
      tap((page: Page<Section>) => {
        if (!page) {
          this._store.dispatch(searchSections({
            topicId: topicId,
            search: search
          }))
        }
      }),
      filter((page: Page<Section>) => !!page),
      take(1),
    );
  }  
  
}
