import { createReducer, on } from '@ngrx/store';
import { initialAccountState } from '../state/account.state';

import { 
  getAccountDetailsSuccess, 
  getAccountProfileSuccess, 
  registerNewAccountResult, 
  passwordRequestResetResult, 
  passwordResetResult, 
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
  on(registerNewAccountResult, (state, { result }) => {
    return {
      ...state,
      registrationResult: result 
    }
  }),
  on(passwordRequestResetResult, (state, { result }) => {
    return {
      ...state,
      passwordRequestResetResult: result 
    }
  }),
  on(passwordResetResult, (state, { result }) => {
    return {
      ...state,
      passwordResetResult: result
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
