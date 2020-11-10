import { createReducer, on } from '@ngrx/store';
import { CalendarEvent } from '@sn/core/models';
import { Topic } from '@sn/shared/models';

import * as fromActions from '../actions';

export const dashboardFeatureKey = 'dashboard';

export interface IDashboardState {
  todaysEvents: CalendarEvent[];
  recentTopics: Topic[];
}

export const initialDashboardState: IDashboardState = {
  todaysEvents: null,
  recentTopics: null
}

const _dashboardReducer = createReducer(
  initialDashboardState,
  on(fromActions.getRecentTopicsSuccess, (state, { topics }) => {
    console.log(topics);
    return {
      ...state,
      recentTopics: topics
    }
  }),
  on(fromActions.getTodaysCalendarEventsSuccess, (state, { events }) => {
    console.log(events);
    return {
      ...state,
      todaysEvents: events
    }
  })
);

export function dashboardReducer(state, action) {
  return _dashboardReducer(state, action);
}
