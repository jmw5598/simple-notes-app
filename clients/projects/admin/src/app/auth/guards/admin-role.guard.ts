import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthenticatedUser } from '@sn/shared/models';
import { IAuthenticationState } from '../store/reducers';
import * as fromAuthentication from '../store/reducers/authentication.reducers';
import * as fromAuthenticationSelectors from '../store/selectors'
import * as fromAuthenticationActions from '../store/actions'
import { Roles } from '@sn/shared/models';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(
    private _store: Store<IAuthenticationState>,
    private _router: Router
  ) { } 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._store.select(fromAuthenticationSelectors.selectAuthenticatedUser)
      .pipe(
        take(1), 
        map((user: AuthenticatedUser) => {
          if (user?.userDetails?.roles?.includes(Roles.ADMIN)) {
            return true;
          }
          this._handleIncorrectRole();
          this._router.navigate(['/auth', 'login']);
          return false;
        }));
  }

  private _handleIncorrectRole(): void {
    this._store.dispatch(fromAuthenticationActions.logoutUser());
    this._store.dispatch(fromAuthenticationActions.setLoginUserError({
      errorMessage: 'You are not authorized to access this application'
    }));
  }
}
