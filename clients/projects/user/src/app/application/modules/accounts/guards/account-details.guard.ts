import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Account } from '@sn/shared/models';

import { IAccountsState } from '../store/reducers';
import { getAccountDetails } from '../store/actions';
import { selectAccountDetails } from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsGuard implements CanActivate {
  constructor(
    private _store: Store<IAccountsState>
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._getAccountDetailsFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getAccountDetailsFromStoreOrApi(): Observable<Account> {
    return this._store.select(selectAccountDetails).pipe(
      tap((details: Account) => {
        if (!details) {
          this._store.dispatch(getAccountDetails());
        }
      }),
      filter((details: Account) => !!details),
      take(1),
    );
  }
}
