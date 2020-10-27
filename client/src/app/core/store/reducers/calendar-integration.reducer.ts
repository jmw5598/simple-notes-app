import { createReducer, on } from '@ngrx/store';
import { initialCalendarIntegrationState } from '../state/calendar-integration.state';
import * as fromActions from '../actions';

const _calendarIntegrationReducer = createReducer(
  initialCalendarIntegrationState,
  on(fromActions.getCalendarIntegrationsGroupedByTypeSuccess, (state, { integrations }) => {
    return {
      ...state,
      calendarIntegrationsGroupedByType: integrations
    }
  })
);

export function calendarIntegrationReducer(state, action) {
  return _calendarIntegrationReducer(state, action);
}
