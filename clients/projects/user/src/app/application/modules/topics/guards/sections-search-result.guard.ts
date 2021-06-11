import { AfterViewInit, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DEFAULT_SEARCH_SECTIONS_PAGE } from '@sn/user/core/defaults';
import { Section } from '@sn/user/shared/models'
import { Page, PageRequest, PageableSearch, IPageable } from '@sn/user/core/models';
import { searchSections } from '../store/actions';
import { selectSearchSectionsResult } from '../store/selectors';
import { ITopicsState } from '../store/reducers';
import { OverlayLoaderService } from '@sn/user/shared/components';

@Injectable({
  providedIn: 'root'
})
export class SectionsSearchResultGuard implements CanActivate {
  constructor(
    private _store: Store<ITopicsState>,
    private _overlayLoaderService: OverlayLoaderService
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const topicId: number = +next.paramMap.get('topicId');
    const pageable: IPageable = DEFAULT_SEARCH_SECTIONS_PAGE;
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
          this._overlayLoaderService.setLoadingState(true);
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
