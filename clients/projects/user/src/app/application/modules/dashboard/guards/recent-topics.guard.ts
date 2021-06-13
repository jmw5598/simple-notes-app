import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Topic } from '@sn/shared/models';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { getRecentTopics } from '../store/actions';
import { IDashboardState } from '../store/reducers';
import { selectRecentTopics } from '../store/selectors';

import { OverlayLoaderService } from '@sn/shared/components';

@Injectable({
  providedIn: 'root'
})
export class RecentTopicsGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<IDashboardState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getRecentTopicsFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getRecentTopicsFromStoreOrApi(): Observable<Topic[]> {
    return this._store.select(selectRecentTopics).pipe(
      tap((topics: Topic[]) => {
        if (!topics) {
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(getRecentTopics());
        }
      }),
      filter((topics: Topic[]) => !!topics),
      take(1)
    );
  }
}
