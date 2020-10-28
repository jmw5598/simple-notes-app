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
  }),
  on(fromActions.refreshCalendarIntegrationSuccess, (state, { integration }) => {
    // TODO find an update the integration
    return {
      ...state
    }
  }),
  on(fromActions.inactiveCalendarIntegrationSucess, (state, { integration }) => {
    // TODO find and remove the integration
    return {
      ...state
    }
  })
);

export function calendarIntegrationReducer(state, action) {
  return _calendarIntegrationReducer(state, action);
}
