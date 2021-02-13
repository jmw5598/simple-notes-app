import { createReducer, on } from '@ngrx/store';
import { AccountStatus } from '@sn/core/enums';
import { Account, Profile, Theme } from '@sn/core/models';
import { from } from 'rxjs';
import * as fromActions from '../actions/accounts.actions';

export const accountFeatureKey = 'accounts';

export interface IAccountsState {
  details: Account,
  status: AccountStatus,
  profile: Profile,
  themes: Theme[]
}

export const initialAccountState: IAccountsState = {
  details: null,
  status: AccountStatus.INACTIVE,
  profile: null,
  themes: null
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
  }),
  on(fromActions.getThemesSuccess, (state, { themes }) => {
    return {
      ...state,
      themes: themes
    }
  }),
  on(fromActions.changeAccountThemeSuccess, (state, { theme }) => {
    // TODO What to handle here???
    return {
      ...state
    };
  })
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
