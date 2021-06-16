import { createAction, props } from '@ngrx/store';
import {
  Page,
  PageableSearch,
  ResponseMessage,
  Account } from '@sn/shared/models';

export const createAccount = createAction(
  '[Accounts] Create Account',
  props<{ account: Account }>()
);

export const createAccountSuccess = createAction(
  '[Accounts] Create Account Success',
  props<{ account: Account }>()
);

export const setCreateAccountResponseMessage = createAction(
  '[Accounts] Set Create Account Response Message',
  props<{ message: ResponseMessage }>()
);

export const updateAccount = createAction(
  '[Accounts] Update Account',
  props<{ account: Account }>()
);

export const updateAccountSuccess = createAction(
  '[Accounts] Update Account Success',
  props<{ account: Account }>()
);

export const setUpdateAccountResponseMessage = createAction(
  '[Accounts] Set Update Account Response Message',
  props<{ message: ResponseMessage }>()
);

export const deleteAccount = createAction(
  '[Accounts] Delete Account',
  props<{ accountId: number }>()
);

export const deleteAccountSuccess = createAction(
  '[Accounts] Delete Account Success',
  props<{ account: Account }>()
);

export const setDeleteAccountResponseMessage = createAction(
  '[Accounts] Set Delete Account Response Message',
  props<{ message: ResponseMessage }>()
);

export const searchAccounts = createAction(
  '[Topic] Search Topic',
  props<{ search: PageableSearch }>()
);

export const searchAccountsResult = createAction(
  '[Topic] Search Topic Result',
  props<{ page: Page<Account> }>()
);
