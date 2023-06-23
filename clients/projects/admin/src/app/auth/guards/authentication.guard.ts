import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthenticatedStatus } from '@sn/shared/models';
import * as fromAuthentication from '@sn/user/auth/store/reducers/authentication.reducers';
import * as fromAuthenticationSelectors from '@sn/user/auth/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private _store: Store,
    private _router: Router
  ) { } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this._store.select(fromAuthenticationSelectors.selectAuthenticationState)
      .pipe(
        take(1), 
        map((state: fromAuthentication.IAuthenticationState) => {
          if (state.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
            return true;
          }
          this._router.navigate(['/auth', 'login']);
          return false;
        }));
  }
}
