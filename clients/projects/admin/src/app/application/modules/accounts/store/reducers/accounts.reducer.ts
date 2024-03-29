import { createReducer, on } from '@ngrx/store';
import { ResponseMessage, Page, Account, RegistrationResult } from '@sn/shared/models';

import * as fromActions from '../actions';

export const accountsFeatureKey = 'accounts'

export interface IAccountsState {
  createAccountResponseMessage: ResponseMessage,
  updateAccountResponseMessage: ResponseMessage,
  deleteAccountResponseMessage: ResponseMessage,
  newAccountRegistrationResult: RegistrationResult,
  searchAccountsResult: Page<Account>
}

export const initialAccountsState: IAccountsState = {
  createAccountResponseMessage: null,
  updateAccountResponseMessage: null,
  deleteAccountResponseMessage: null,
  newAccountRegistrationResult: null,
  searchAccountsResult: null
}

const onSetCreateAccountResponseMessage = (state, { message }) => ({
  ...state,
  newAccountRegistrationResult: message
});

const onSetUpdateAccountResponseMessage = (state, { message }) => ({
  ...state,
  updateAccountResponseMessage: message
});

const onSetDeleteAccountResponseMessage = (state, { message }) => ({
  ...state,
  deleteAccountResponseMessage: message
});

const onSearchAccountsResult = (state, { page }) => ({
  ...state,
  searchAccountsResult: page
});

const _accountsReducer = createReducer(
  initialAccountsState,
  on(fromActions.setCreateAccountResponseMessage, onSetCreateAccountResponseMessage),
  on(fromActions.setUpdateAccountResponseMessage, onSetUpdateAccountResponseMessage),
  on(fromActions.setDeleteAccountResponseMessage, onSetDeleteAccountResponseMessage),
  on(fromActions.searchAccountsResult, onSearchAccountsResult)
);

export function accountsReducer(state, action) {
  return _accountsReducer(state, action);
}
