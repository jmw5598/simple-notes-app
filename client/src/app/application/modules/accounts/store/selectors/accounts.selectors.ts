import { createSelector } from '@ngrx/store';
import * as fromAccounts from '../reducers/accounts.reducers';
import * as fromApplication from '../../../../store/index';

export const selectAccountState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.accounts
);

export const selectAccountDetails = createSelector(
  selectAccountState,
  (state: fromAccounts.IAccountsState) => state.details  
);

export const selectAccountStatus = createSelector(
  selectAccountState,
  (state: fromAccounts.IAccountsState) => state.status
);

export const selectAccountProfile = createSelector(
  selectAccountState,
  (state: fromAccounts.IAccountsState) => state.profile
);
