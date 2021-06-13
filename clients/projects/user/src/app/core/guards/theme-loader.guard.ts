import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DEFAULT_THEME_FILE } from '../defaults';
import { IAuthenticationState } from '@sn/user/auth/store/reducers';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUserSettings } from '@sn/user/auth/store/selectors';
import { switchMap } from 'rxjs/operators';

import { DynamicThemeService } from '@sn/core/services';
import { UserSettings } from '@sn/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ThemeLoaderGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(
    private _store: Store<IAuthenticationState>,
    private _dynamicThemeService: DynamicThemeService
  ) { }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
    return this._store.select(selectAuthenticatedUserSettings).pipe(
      switchMap((settings: UserSettings) => {
        if (settings && settings?.theme) {
          this._dynamicThemeService.loadStyle(settings.theme.filename)
        }
        return of(true);
      })
    )
  }

  canDeactivate(
      component: unknown,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot): Observable<boolean> {
    this._dynamicThemeService.loadStyle(DEFAULT_THEME_FILE);
    return of(true);
  }  
}
