import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthenticationService } from '@sn/core/services';
import { AuthenticatedStatus } from '@sn/core/enums';
import { IAppState } from '../store/state/app.state';
import * as fromAuthenticationState from '@sn/modules/auth/store/state';
import * as fromAuthenticationSelectors from '@sn/modules/auth/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private _store: Store<IAppState>,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._store.select(fromAuthenticationSelectors.selectAuthenticationState)
      .pipe(
        take(1), 
        map((state: fromAuthenticationState.IAuthenticationState) => {
          if (state.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
            return true;
          }
          this._router.navigate(['/auth', 'login']);
          return false;
        }));
  }
}
