import { createSelector } from '@ngrx/store';
import * as fromAccounts from '../reducers/accounts.reducer';
import * as fromApplication from '../../../../store/index';

export const selectAccountsState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.accounts
);

export const selectSearchAccountsResult = createSelector(
  selectAccountsState,
  (state: fromAccounts.IAccountsState) => state.searchAccountsResult
);
