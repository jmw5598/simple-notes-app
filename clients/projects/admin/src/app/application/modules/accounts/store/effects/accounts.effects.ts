import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountsService } from '@sn/core/services';

@Injectable()
export class AccountsEffects {
  constructor(
    private _actions: Actions,
    private _accountsService: AccountsService 
  ) {}
}
