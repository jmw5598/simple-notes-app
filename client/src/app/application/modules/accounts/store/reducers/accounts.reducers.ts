import { createReducer, on } from '@ngrx/store';
import { AccountStatus } from '@sn/core/enums';
import { Account, Profile } from '@sn/core/models';
import * as fromActions from '../actions/accounts.actions';

export const accountFeatureKey = 'accounts';

export interface IAccountsState {
  details: Account,
  status: AccountStatus,
  profile: Profile
}

export const initialAccountState: IAccountsState = {
  details: null,
  status: AccountStatus.INACTIVE,
  profile: null
}

const _accountReducer = createReducer(
  initialAccountState,
  on(fromActions.getAccountDetailsSuccess, (state, { account }) => {
    return {
      ...state,
      details: account
    }
  }),
  on(fromActions.getAccountProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      profile: profile 
    }
  }),
  on(fromActions.updateAccountDetailsSuccess, (state, { account }) => {
    return {
      ...state,
      details: account
    }
  }),
  on(fromActions.updateAccountProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      profile: profile
    }
  })
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
