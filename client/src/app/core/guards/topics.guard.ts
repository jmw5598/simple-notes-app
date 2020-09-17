import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Topic } from '@sn/shared/models';
import { IAppState } from '../store/state/app.state';
import { getAllTopics } from '../store/actions/topic.actions';
import { selectTopics } from '../store/selectors/topic.selector';

@Injectable({
  providedIn: 'root'
})
export class TopicsGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getPlansFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getPlansFromStoreOrApi(): Observable<Topic[]> {
    return this._store.select(selectTopics).pipe(
      tap((plans: Topic[]) => {
        if (!plans) {
          this._store.dispatch(getAllTopics())
        }
      }),
      filter((plans: Topic[]) => !!plans),
      take(1)
    );
  }
}
