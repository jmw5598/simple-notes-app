import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { OverlayLoaderService } from '@sn/shared/components';
import { TodoList } from '@sn/shared/models';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { ITodosState } from '../../todos/store/reducers';
import { getTodaysTodoLists } from '../store/actions';
import { selectTodaysTodoLists } from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class TodaysTodoListsGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<ITodosState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getTodaysTodoListsFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getTodaysTodoListsFromStoreOrApi(): Observable<TodoList[]> {
    console.log('getting todays todo lists from store');
    return this._store.select(selectTodaysTodoLists).pipe(
      tap((todoLists: TodoList[]) => {
        if (!todoLists) {
          console.log("todolists is null");
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(getTodaysTodoLists());
        } else {
          console.log("todolist is not null")
        }
      }),
      filter((todoLists: TodoList[]) => !!todoLists),
      take(1)
    )
  }
}
