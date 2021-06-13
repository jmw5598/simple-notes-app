import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { TodoList } from '@sn/shared/models';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { ITodosState } from '../../todos/store/reducers';
import { getPastDueTodoLists } from '../store/actions';
import { selectPastDueTodoLists } from '../store/selectors';

import { OverlayLoaderService } from '@sn/shared/components';

@Injectable({
  providedIn: 'root'
})
export class PastDueTodoListsGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<ITodosState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getPastDueTodoListsFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getPastDueTodoListsFromStoreOrApi(): Observable<TodoList[]> {
    return this._store.select(selectPastDueTodoLists).pipe(
      tap((todoLists: TodoList[]) => {
        if (!todoLists) {
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(getPastDueTodoLists());
        }
      }),
      filter((todoLists: TodoList[]) => !!todoLists),
      take(1)
    )
  }
}
