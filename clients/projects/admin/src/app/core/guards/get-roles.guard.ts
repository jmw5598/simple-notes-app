import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Role } from '@sn/shared/models';
import { IAppState } from '@sn/admin/store/reducers';
import { Observable, of } from 'rxjs';

import * as fromSelectors from '../store/selectors';
import * as fromActions from '../store/actions';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetRolesGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getRolesFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getRolesFromStoreOrApi(): Observable<Role[]> {
    console.log("checking store for roles");
    return this._store.select(fromSelectors.selectRoles).pipe(
      tap((roles: Role[]) => {
        console.log("checking store roles values");
        if (!roles) {
          console.log("role undefined dispatching");
          this._store.dispatch(fromActions.getAllRoles())
        }
      }),
      filter((roles: Role[]) => !!roles),
      take(1)
    );
  }
}
