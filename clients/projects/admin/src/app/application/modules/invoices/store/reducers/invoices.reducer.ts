import { createReducer, on } from '@ngrx/store';

export const invoicesFeatureKey = 'invoices';

export interface IInvoicesState {

}

const initialInvoicesState: IInvoicesState = {

}

const _invoicesReducer = createReducer(
  initialInvoicesState
);

export function invoicesReducer(state, action) {
  return _invoicesReducer(state, action);
}
