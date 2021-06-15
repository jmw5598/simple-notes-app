import { createReducer, on } from '@ngrx/store';

export const dashboardFeatureKey = 'dashboard';

export interface IDashboardState {
  
}

export const initialDashboardState: IDashboardState = {

}

const _dashboardReducer = createReducer(
  initialDashboardState
);

export function dashboardReducer(state, action) {
  return _dashboardReducer(state, action);
}
