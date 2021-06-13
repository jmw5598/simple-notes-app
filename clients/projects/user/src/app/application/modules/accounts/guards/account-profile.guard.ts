import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Profile } from '@sn/shared/models';
import { getAccountProfile } from '../store/actions';
import { selectAccountProfile } from '../store/selectors';
import { IAccountsState } from '../store/reducers';

import { OverlayLoaderService } from '@sn/shared/components';

@Injectable({
  providedIn: 'root'
})
export class AccountProfileGuard implements CanActivate {
  constructor(
    private _store: Store<IAccountsState>,
    private _overlayLoaderService: OverlayLoaderService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getAccountProfileFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getAccountProfileFromStoreOrApi(): Observable<Profile> {
    return this._store.select(selectAccountProfile).pipe(
      tap((profile: Profile) => {
        if (!profile) {
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(getAccountProfile());
        }
      }),
      filter((profile: Profile) => !!profile),
      take(1),
    );
  }
}
