import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Plan } from '@sn/core/models';
import { IAppState } from '@sn/store/reducers';
import { getPlans } from '../store/actions/plans.actions';
import { selectPlans } from '../store/selectors/plans.selectors';

@Injectable({
  providedIn: 'root'
})
export class PlansGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getPlansFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getPlansFromStoreOrApi(): Observable<Plan[]> {
    return this._store.select(selectPlans).pipe(
      tap((plans: Plan[]) => {
        if (!plans) {
          this._store.dispatch(getPlans())
        }
      }),
      filter((plans: Plan[]) => !!plans),
      take(1)
    );
  }
}
