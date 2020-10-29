import { createSelector } from '@ngrx/store';
import * as  fromCalendarIntegrations from '../reducers/calendar-integrations.reducers';
import * as fromApplication from '../../../../../../store/index';

export const selectCalendarIntegrationState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.calendarIntegrations
);

export const selectCalendarIntegrationsGroupedByType = createSelector(
  selectCalendarIntegrationState,
  (state: fromCalendarIntegrations.ICalendarIntegrationsState) => state.calendarIntegrationsGroupedByType
);
