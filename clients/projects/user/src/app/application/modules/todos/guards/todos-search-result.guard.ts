import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '@sn/user/application/store';
import { DEFAULT_SEARCH_TODOS_PAGE } from '@sn/user/core/defaults';
import { IPageable, Page, PageableSearch } from '@sn/shared/models';
import { TodoList } from '@sn/shared/models';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as fromSelectors from '../store/selectors';
import * as fromActions from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class TodosSearchResultGuard implements CanActivate {
  constructor(
    private _store: Store<IApplicationState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const pageable: IPageable = DEFAULT_SEARCH_TODOS_PAGE;
    const search: PageableSearch = {
      searchTerm: '',
      pageable: pageable
    };
    return this._setSearchTodosResultFromStoreOrApi(search).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSearchTodosResultFromStoreOrApi(search: PageableSearch): Observable<Page<TodoList>> {
    return this._store.select(fromSelectors.selectSearchTodoListsResult).pipe(
      tap((page: Page<TodoList>) => {
        if (!page) {
          this._store.dispatch(fromActions.searchTodoLists({
            search: search
          }))
        }
      }),
      filter((page: Page<TodoList>) => !!page),
      take(1),
    );
  } 
}
