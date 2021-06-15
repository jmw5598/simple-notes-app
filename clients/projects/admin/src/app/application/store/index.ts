import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAccounts from '../modules/accounts/store/reducers';
import * as fromDashboard from '../modules/dashboard/store/reducers';
import * as fromInvoices from '../modules/invoices/store/reducers';

export const applicationFeatureKey: string = 'application';

export interface IApplicationState {
  [fromAccounts.accountsFeatureKey]: fromAccounts.IAccountsState,
  [fromDashboard.dashboardFeatureKey]: fromDashboard.IDashboardState,
  [fromInvoices.invoicesFeatureKey]: fromInvoices.IInvoicesState
}

export const applicationReducer = new InjectionToken<ActionReducerMap<IApplicationState>>(applicationFeatureKey, {
  factory: () => ({
    [fromAccounts.accountsFeatureKey]: fromAccounts.accountsReducer,
    [fromDashboard.dashboardFeatureKey]: fromDashboard.dashboardReducer,
    [fromInvoices.invoicesFeatureKey]: fromInvoices.invoicesReducer
  })
});

export const selectApplicationState = createFeatureSelector<IApplicationState>(applicationFeatureKey);