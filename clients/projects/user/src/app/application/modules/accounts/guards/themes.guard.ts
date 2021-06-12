import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Theme } from '@sn/user/core/models';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { getThemes } from '../store/actions';
import { IAccountsState } from '../store/reducers';
import { selectThemes } from '../store/selectors';

import { OverlayLoaderService } from '@sn/shared/components';

@Injectable({
  providedIn: 'root'
})
export class ThemesGuard implements CanActivate {
  constructor(
    private _store: Store<IAccountsState>,
    private _overlayLoaderService: OverlayLoaderService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getThemesFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }
  
  private _getThemesFromStoreOrApi(): Observable<Theme[]> {
    return this._store.select(selectThemes).pipe(
      tap((themes: Theme[]) => {
        if (!themes) {
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(getThemes());
        }
      }),
      filter((themes: Theme[]) => !!themes),
      take(1),
    );
  }
}
