import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Theme } from '@sn/shared/models';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { getThemes } from '../store/actions';
import { IAccountsState } from '../store/reducers';
import { selectThemes } from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ThemesGuard implements CanActivate {
  constructor(
    private _store: Store<IAccountsState>
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
          this._store.dispatch(getThemes());
        }
      }),
      filter((themes: Theme[]) => !!themes),
      take(1),
    );
  }
}
