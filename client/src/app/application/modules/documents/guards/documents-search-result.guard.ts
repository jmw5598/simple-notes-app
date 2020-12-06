import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Document } from '@sn/shared/models';
import { IPageable, Page, PageableSearch } from 'src/app/core/models';
import { IDocumentsState } from '../store/reducers';
import { DEFAULT_SEARCH_DOCUMENTS_PAGE } from '@sn/core/defaults';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { selectSearchDocumentsResult } from '../store/selectors';
import { searchDocuments } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class DocumentsSearchResultGuard implements CanActivate {
  constructor(private _store: Store<IDocumentsState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const pageable: IPageable = DEFAULT_SEARCH_DOCUMENTS_PAGE;
    const search: PageableSearch = {
      searchTerm: '',
      pageable: pageable
    };

    return this._setSearchDocumentsResultFromStoreOrApi(search).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSearchDocumentsResultFromStoreOrApi(search: PageableSearch): Observable<Page<Document>> {
    return this._store.select(selectSearchDocumentsResult).pipe(
      tap((page: Page<Document>) => {
        if (!page) {
          this._store.dispatch(searchDocuments({
            search: search
          }))
        }
      }),
      filter((page: Page<Document>) => !!page),
      take(1)
    );
  }  
}
