import { createReducer, on } from '@ngrx/store';
import { initialAccountState } from '../state/account.state';

import { 
  getAccountDetailsSuccess, 
  getAccountProfileSuccess,
  updateAccountDetailsSuccess,
  updateAccountProfileSuccess
} from '../actions/account.actions';

const _accountReducer = createReducer(
  initialAccountState,
  on(getAccountDetailsSuccess, (state, { account }) => {
    return {
      ...state,
      details: account
    }
  }),
  on(getAccountProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      profile: profile 
    }
  }),
  on(updateAccountDetailsSuccess, (state, { account }) => {
    return {
      ...state,
      details: account
    }
  }),
  on(updateAccountProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      profile: profile
    }
  })
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
