import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, skip } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAuthenticationState } from '@sn/user/auth/store/reducers';
import * as fromAuthentication from '@sn/user/auth/store/reducers';
import * as fromAuthenticationSelectors from '@sn/user/auth/store/selectors';
import * as fromAuthenticationActions from '@sn/user/auth/store/actions';

import { AuthenticatedStatus, AuthenticatedUser } from '@sn/shared/models';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor, OnDestroy {
  private _authenticatedState: fromAuthentication.IAuthenticationState;
  private _authenticatedStateSubscription: Subscription;
  private _isRefreshing = false;
  private _refreshTokenSubject: BehaviorSubject<AuthenticatedUser> = new BehaviorSubject<AuthenticatedUser>(null);

  constructor(private _store: Store<IAuthenticationState>) {
    this._authenticatedStateSubscription = this._store.select(fromAuthenticationSelectors.selectAuthenticationState)
      .subscribe(state => this._authenticatedState = state);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authenticatedState.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
      const accessToken: string = this._authenticatedState.authenticatedUser.accessToken;
      request = this._addAuthorizationHeader(request, accessToken);
    }
    
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('auth/login')) {
        return this._handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private _addAuthorizationHeader(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
    const prefix: string = this._authenticatedState.authenticatedUser.prefix;
    const authorizationHeaderValue: string = `${prefix} ${accessToken}`;
    return request.clone({
      setHeaders: {
        Authorization: authorizationHeaderValue 
      }
    });
  }
  
  private _handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next(null);
      this._store.dispatch(fromAuthenticationActions.refreshToken());
      
      return this._store.select(fromAuthenticationSelectors.selectAuthenticatedUser).pipe(
        skip(1),
        switchMap((user: AuthenticatedUser) => {
          this._isRefreshing = false;
          this._refreshTokenSubject.next(user);
          return next.handle(
            this._addAuthorizationHeader(request, user.accessToken));
        })
      );
    } else {
      return this._refreshTokenSubject.pipe(
        filter((user: AuthenticatedUser) => user != null),
        take(1),
        switchMap((user: AuthenticatedUser) => next.handle(
          this._addAuthorizationHeader(request, user.accessToken))
        ));
    }
  }

  ngOnDestroy() {
    if (this._authenticatedStateSubscription) {
      this._authenticatedStateSubscription.unsubscribe();
    }
  }
}
