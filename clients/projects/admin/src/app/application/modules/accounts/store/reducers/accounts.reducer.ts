import { createReducer, on } from '@ngrx/store';

export const accountsFeatureKey = 'accounts'

export interface IAccountsState {

}

export const initialAccountsState: IAccountsState = {

}

const _accountsReducer = createReducer(
  initialAccountsState
);

export function accountsReducer(state, action) {
  return _accountsReducer(state, action);
}
