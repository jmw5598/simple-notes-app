import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { handleHttpError } from '@sn/admin/core/store/actions';
import { AccountsService } from '@sn/core/services';
import { PageableSearch, RegistrationResult, ResponseMessage, ResponseStatus } from '@sn/shared/models';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions';

@Injectable()
export class AccountsEffects {
  constructor(
    private _actions: Actions,
    private _accountsService: AccountsService 
  ) {}

  searchAccounts$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.searchAccounts),
    switchMap(({search}) => {
      const searchs: PageableSearch = search
      console.log("serarchin gaccounts in effect");
      return this._accountsService.searchAccounts(searchs.searchTerm, searchs.pageable)
        .pipe(
          map(result => fromActions.searchAccountsResult({ page: result })),
          catchError(error => of(handleHttpError(error)))
        )
      }
    )
  ));

  registerNewAccount$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createAccount),
    mergeMap(({ registration }) => this._accountsService.registerNewAccount(registration)
      .pipe(
        map(result => fromActions.createAccountSuccess({ result: result })),
        catchError(error => of(handleHttpError({ error: error })))
      ))
    )
  );

  registerNewAccountResult$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createAccountSuccess),
    mergeMap(({ result }) => {
      const message: ResponseMessage = {
        status: result.status === 'SUCCESS' ? ResponseStatus.SUCCESS : ResponseStatus.ERROR,
        message: `Successfully create new account`
      };
      return of(fromActions.setCreateAccountResponseMessage({ message: message }))
    }))
  );
}
