import { createSelector } from '@ngrx/store';
import * as fromDashboard from '../reducers/dashboard.reducers';
import * as fromApplication from '../../../../store/index';

export const selectDashboardState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.dashboard
);

export const selectTodaysEvents = createSelector(
  selectDashboardState,
  (state: fromDashboard.IDashboardState) => state.todaysEvents
);

export const selectRecentTopics = createSelector(
  selectDashboardState,
  (state: fromDashboard.IDashboardState) => state.recentTopics
);

export const selectPastDueTodoLists = createSelector(
  selectDashboardState,
  (state: fromDashboard.IDashboardState) => state.pastDueTodoLists
);

export const selectTodaysTodoLists = createSelector(
  selectDashboardState,
  (state: fromDashboard.IDashboardState) => state.todaysTodoLists
);
