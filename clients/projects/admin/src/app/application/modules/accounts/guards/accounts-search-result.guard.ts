import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { DEFAULT_SEARCH_ACCOUNTS_PAGE } from '@sn/admin/core/defaults';
import { OverlayLoaderService } from '@sn/shared/components';
import { Account, IPageable, Page, PageableSearch } from '@sn/shared/models';
import { IAccountsState } from '../store/reducers';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as accountsSelectors from '../store/selectors';
import * as accountsActions from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AccountsSearchResultGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<IAccountsState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const pageable: IPageable = DEFAULT_SEARCH_ACCOUNTS_PAGE;
    const search: PageableSearch = {
      searchTerm: '',
      pageable: pageable
    };
    return this._getSearchResultFromStoreOrApi(search).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getSearchResultFromStoreOrApi(search: PageableSearch): Observable<Page<Account>> {
    return this._store.select(accountsSelectors.selectSearchAccountsResult).pipe(
      tap((page: Page<Account>) => {
        if (!page) {
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(accountsActions.searchAccounts({
            search: search
          }))
        }
      }),
      filter((page: Page<Account>) => !!page),
      take(1)
    );
  }
}
